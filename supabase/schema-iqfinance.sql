-- IQFinance-web schema — additive only, run in the same Supabase project
-- as schema.sql and schema-iqreceipts.sql (Project -> SQL Editor -> New
-- query). Never touches profiles/subscriptions/entitlements or their RPCs;
-- access to this data is gated separately by iqfinance-web's own
-- middleware checking for an entitlements row with product_slug = 'iqfinance'.

-- 1. PLAID ITEMS — service-role only, zero client RLS policies (same trust
-- boundary as subscriptions.stripe_customer_id in schema.sql). The browser
-- never reads or writes this table directly; only the Next.js API routes
-- using the service-role client touch it, and access_token_enc is always
-- AES-256-GCM ciphertext (see lib/crypto.ts in iqfinance-web), never a raw
-- Plaid token. Created before `accounts` since that table has a FK into it.
create table public.plaid_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plaid_item_id text not null unique,
  access_token_enc text not null,
  institution_id text,
  institution_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.plaid_items enable row level security;
-- Deliberately no policies — RLS enabled with zero grants means even the
-- `authenticated`/`anon` roles get nothing; only service_role (which
-- bypasses RLS entirely) can touch this table.

create index plaid_items_user_idx on public.plaid_items (user_id);

-- 2. ACCOUNTS
create table public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default '',
  type text not null default 'checking'
    check (type in ('checking', 'savings', 'investment', 'credit_card', 'loan')),
  balance numeric not null default 0,
  bank_brand_name text,
  last4 text,
  -- Set only for Plaid-linked accounts (nullable — manually-added accounts
  -- have neither). plaid_item_id points at the encrypted-token row that can
  -- actually refresh this account's balance; never store the token here.
  plaid_account_id text,
  plaid_item_id uuid references public.plaid_items(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.accounts enable row level security;

create policy "accounts_select_own" on public.accounts
  for select using (auth.uid() = user_id);
create policy "accounts_insert_own" on public.accounts
  for insert with check (auth.uid() = user_id);
create policy "accounts_update_own" on public.accounts
  for update using (auth.uid() = user_id);
create policy "accounts_delete_own" on public.accounts
  for delete using (auth.uid() = user_id);

create index accounts_user_idx on public.accounts (user_id);

-- 3. FINANCIAL GOALS
create table public.financial_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default '',
  target_amount numeric not null default 0,
  current_saved numeric not null default 0,
  target_date date not null default (current_date + interval '1 year'),
  created_at timestamptz not null default now()
);

alter table public.financial_goals enable row level security;

create policy "financial_goals_select_own" on public.financial_goals
  for select using (auth.uid() = user_id);
create policy "financial_goals_insert_own" on public.financial_goals
  for insert with check (auth.uid() = user_id);
create policy "financial_goals_update_own" on public.financial_goals
  for update using (auth.uid() = user_id);
create policy "financial_goals_delete_own" on public.financial_goals
  for delete using (auth.uid() = user_id);

-- 4. CROSS-APP VIEW — IQReceipts' category spend, read-only, for IQFinance's
-- Home dashboard. Replaces the same-device App Group sync the iOS apps used
-- (IQReceipts writes to a shared UserDefaults suite; IQFinance reads it) —
-- this is the literal web equivalent. security_invoker means the view runs
-- with the querying user's own RLS policies applied (the same
-- auth.uid() = user_id check on receipts), not the view owner's — so a user
-- can never see another user's spend through this view even though it
-- wasn't granted to them explicitly. Requires schema-iqreceipts.sql to have
-- been run first (depends on public.receipts).
create view public.iqreceipts_category_spending_v
with (security_invoker = true) as
select
  user_id,
  category,
  date_trunc('month', purchase_date)::date as month,
  sum(total_amount) as monthly_amount
from public.receipts
group by user_id, category, date_trunc('month', purchase_date);
