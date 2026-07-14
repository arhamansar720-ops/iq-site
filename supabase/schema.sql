-- IQ accounts schema: profiles, subscriptions, entitlements
-- Run once in the Supabase SQL editor (Project -> SQL Editor -> New query).

-- 1. PROFILES — 1:1 with auth.users
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- 2. SUBSCRIPTIONS — current plan per user (one row per user)
create table public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan_id text not null default 'free'
    check (plan_id in ('free', 'plus', 'one')),
  max_products int not null generated always as (
    case plan_id
      when 'free' then 1
      when 'plus' then 3
      when 'one'  then 999   -- sentinel for "all"; clients map 999 <-> "all"
    end
  ) stored,
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "subscriptions_select_own" on public.subscriptions
  for select using (auth.uid() = user_id);
create policy "subscriptions_update_own" on public.subscriptions
  for update using (auth.uid() = user_id);
create policy "subscriptions_insert_own" on public.subscriptions
  for insert with check (auth.uid() = user_id);

-- 3. ENTITLEMENTS — which product slugs a user has connected
create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_slug text not null
    check (product_slug in (
      'iqhabits','iqdrive','iqcommute','iqreceipts',
      'iqlife','iqfinance','iqvalet','iqrx','iqsavings'
    )),
  connected_at timestamptz not null default now(),
  unique (user_id, product_slug)
);

alter table public.entitlements enable row level security;

create policy "entitlements_select_own" on public.entitlements
  for select using (auth.uid() = user_id);
create policy "entitlements_insert_own" on public.entitlements
  for insert with check (auth.uid() = user_id);
create policy "entitlements_delete_own" on public.entitlements
  for delete using (auth.uid() = user_id);

-- 4. CAP ENFORCEMENT — DB trigger is the source of truth, not app code.
-- Every client (website + 8 apps) hits this automatically through the
-- REST API, so a stale client can never bypass the plan's product cap.
create or replace function public.enforce_entitlement_cap()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  cap int;
  current_count int;
begin
  select max_products into cap from public.subscriptions where user_id = new.user_id;
  if cap is null then
    cap := 1; -- no subscription row yet => treat as free tier
  end if;

  select count(*) into current_count from public.entitlements where user_id = new.user_id;

  if current_count >= cap then
    raise exception 'entitlement cap exceeded: plan allows % products', cap
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

create trigger trg_enforce_entitlement_cap
  before insert on public.entitlements
  for each row execute function public.enforce_entitlement_cap();

-- 5. AUTO-CREATE profile + free subscription the moment someone signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', ''));

  insert into public.subscriptions (user_id, plan_id)
  values (new.id, 'free');

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 6. complete_signup — atomic RPC used by the website's signup flow.
-- Sets the chosen plan and inserts the chosen product entitlements in one
-- statement, so a dropped connection mid-signup can't leave a half-set-up
-- account (e.g. plan set to "plus" but zero products connected).
create or replace function public.complete_signup(
  p_plan_id text,
  p_product_slugs text[]
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  slug text;
begin
  update public.subscriptions
  set plan_id = p_plan_id, updated_at = now()
  where user_id = auth.uid();

  foreach slug in array p_product_slugs loop
    insert into public.entitlements (user_id, product_slug)
    values (auth.uid(), slug)
    on conflict (user_id, product_slug) do nothing;
  end loop;
end;
$$;

-- 7. change_plan — atomic RPC used when a signed-in user switches plans.
-- Truncates existing entitlements down to the new cap (oldest-connected
-- first) so downgrading never leaves the account over its new limit.
create or replace function public.change_plan(p_plan_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  new_cap int;
begin
  update public.subscriptions
  set plan_id = p_plan_id, updated_at = now()
  where user_id = auth.uid();

  select max_products into new_cap from public.subscriptions where user_id = auth.uid();

  delete from public.entitlements
  where id in (
    select id from public.entitlements
    where user_id = auth.uid()
    order by connected_at desc
    offset new_cap
  );
end;
$$;

-- 8. account_overview — one read for profile + subscription + entitlements,
-- used by both the website's sign-in flow and (eventually) the apps.
create view public.account_overview
with (security_invoker = true) as
select
  p.id as user_id,
  p.name,
  p.email,
  s.plan_id,
  s.max_products,
  coalesce(
    array_agg(e.product_slug) filter (where e.product_slug is not null),
    '{}'
  ) as product_slugs
from public.profiles p
join public.subscriptions s on s.user_id = p.id
left join public.entitlements e on e.user_id = p.id
group by p.id, p.name, p.email, s.plan_id, s.max_products;

-- MIGRATION — if this schema was already deployed before 'iqsavings' was
-- added to the product lineup, run this once to widen the existing
-- check constraint (safe to skip on a fresh install, the table above
-- already includes 'iqsavings').
alter table public.entitlements
  drop constraint if exists entitlements_product_slug_check;
alter table public.entitlements
  add constraint entitlements_product_slug_check
  check (product_slug in (
    'iqhabits','iqdrive','iqcommute','iqreceipts',
    'iqlife','iqfinance','iqvalet','iqrx','iqsavings'
  ));
