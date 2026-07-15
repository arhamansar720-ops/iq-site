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
  -- set only by the Stripe webhook (service role) — never by the client,
  -- since plan_id is what actually unlocks paid features.
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  -- free-tier "switch your one app" cooldown; null = never switched, so
  -- always allowed the first time.
  last_free_switch_at timestamptz,
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

-- Direct inserts/deletes are only allowed for paid plans. Free-plan users
-- have exactly one product and can only change it through the
-- switch_free_product() RPC, which enforces the 6-month cooldown — without
-- this plan_id check, a free user could bypass that cooldown entirely by
-- calling supabase.from('entitlements').insert/delete() directly from the
-- browser console, same class of bug as the plan_id-spoofing issue fixed
-- in complete_signup/change_plan below.
create policy "entitlements_insert_own" on public.entitlements
  for insert with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.subscriptions s
      where s.user_id = auth.uid() and s.plan_id <> 'free'
    )
  );
create policy "entitlements_delete_own" on public.entitlements
  for delete using (
    auth.uid() = user_id
    and exists (
      select 1 from public.subscriptions s
      where s.user_id = auth.uid() and s.plan_id <> 'free'
    )
  );

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
-- Every account starts on the free plan, full stop — plan_id is NOT a
-- client-supplied argument. Paid plans are only ever set by
-- apply_stripe_subscription() below, called from the Stripe webhook after
-- a real payment clears. (The old version took p_plan_id straight from the
-- client, which meant anyone could call complete_signup('one', [...]) from
-- the browser console and get every product for free — that hole is why
-- this function's signature changed.)
drop function if exists public.complete_signup(text, text[]);
create or replace function public.complete_signup(
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
  set plan_id = 'free', updated_at = now()
  where user_id = auth.uid();

  foreach slug in array p_product_slugs loop
    insert into public.entitlements (user_id, product_slug)
    values (auth.uid(), slug)
    on conflict (user_id, product_slug) do nothing;
  end loop;
end;
$$;

-- 7. change_plan — client-callable RPC, but now downgrade-only (to free).
-- Upgrading to a paid plan has to go through Stripe Checkout so it's
-- actually paid for; this RPC remains for cancellation, which needs no
-- payment. Truncates entitlements down to the free cap (oldest first).
create or replace function public.change_plan(p_plan_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  new_cap int;
begin
  if p_plan_id <> 'free' then
    raise exception 'Upgrading plans requires checkout — call the /api/stripe/checkout route, not change_plan() directly.';
  end if;

  update public.subscriptions
  set plan_id = 'free', updated_at = now()
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

-- 7a. apply_stripe_subscription — sets a paid plan after a real Stripe
-- payment clears. Only the Stripe webhook (using the service_role key,
-- which bypasses RLS and function-execute grants entirely) should ever
-- call this — it's explicitly revoked from anon/authenticated below so the
-- browser client can never call it directly.
create or replace function public.apply_stripe_subscription(
  p_user_id uuid,
  p_plan_id text,
  p_stripe_customer_id text,
  p_stripe_subscription_id text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_plan_id not in ('plus', 'one') then
    raise exception 'apply_stripe_subscription is only for paid plans; use change_plan for free.';
  end if;

  update public.subscriptions
  set plan_id = p_plan_id,
      stripe_customer_id = p_stripe_customer_id,
      stripe_subscription_id = p_stripe_subscription_id,
      updated_at = now()
  where user_id = p_user_id;
end;
$$;

revoke execute on function public.apply_stripe_subscription(uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.apply_stripe_subscription(uuid, text, text, text) to service_role;

-- 7b. cancel_stripe_subscription — mirror of apply_stripe_subscription for
-- the webhook's `customer.subscription.deleted` event (payment lapsed,
-- cancelled, etc). Drops the account back to free and prunes entitlements
-- to the free cap, same as change_plan, but keyed by Stripe customer ID
-- since there's no authenticated request driving this — it's a server
-- push, not a user action.
create or replace function public.cancel_stripe_subscription(p_stripe_customer_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_user uuid;
begin
  select user_id into target_user
  from public.subscriptions
  where stripe_customer_id = p_stripe_customer_id;

  if target_user is null then
    return;
  end if;

  update public.subscriptions
  set plan_id = 'free', updated_at = now()
  where user_id = target_user;

  delete from public.entitlements
  where id in (
    select id from public.entitlements
    where user_id = target_user
    order by connected_at desc
    offset 1
  );
end;
$$;

revoke execute on function public.cancel_stripe_subscription(text) from public, anon, authenticated;
grant execute on function public.cancel_stripe_subscription(text) to service_role;

-- 7c. switch_free_product — lets a free-plan user swap their one connected
-- product for a different one, at most once every 6 months. Rejects the
-- swap (rather than silently no-op-ing) if the cooldown hasn't elapsed or
-- the account isn't actually on the free plan, so the client can show a
-- real error instead of guessing.
create or replace function public.switch_free_product(p_new_slug text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_plan text;
  last_switch timestamptz;
begin
  select plan_id, last_free_switch_at into current_plan, last_switch
  from public.subscriptions
  where user_id = auth.uid();

  if current_plan <> 'free' then
    raise exception 'switch_free_product is only for free-plan accounts; paid plans manage products directly.';
  end if;

  if last_switch is not null and now() - last_switch < interval '6 months' then
    raise exception 'You can only switch your free product once every 6 months. Next switch available %.',
      to_char(last_switch + interval '6 months', 'YYYY-MM-DD');
  end if;

  delete from public.entitlements where user_id = auth.uid();

  insert into public.entitlements (user_id, product_slug)
  values (auth.uid(), p_new_slug);

  update public.subscriptions
  set last_free_switch_at = now(), updated_at = now()
  where user_id = auth.uid();
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
