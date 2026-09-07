-- IQReceipts-web schema — additive only, run in the same Supabase project
-- as schema.sql (Project -> SQL Editor -> New query). Never touches
-- profiles/subscriptions/entitlements or their RPCs; access to this data
-- is gated separately by iqreceipts-web's own middleware checking for an
-- entitlements row with product_slug = 'iqreceipts'.

-- 1. RECEIPTS
create table public.receipts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  merchant_name text not null default '',
  total_amount numeric not null default 0,
  tax_amount numeric not null default 0,
  currency text not null default 'USD',
  category text not null default 'other'
    check (category in (
      'food_dining','groceries','transportation','shopping',
      'bills_utilities','entertainment','travel','health','business','other'
    )),
  purchase_date date not null default current_date,
  is_recurring boolean not null default false,
  notes text not null default '',
  extracted_text text not null default '',
  image_path text,
  is_tax_deductible boolean not null default false,
  source_url text not null default '',
  created_at timestamptz not null default now()
);

alter table public.receipts enable row level security;

create policy "receipts_select_own" on public.receipts
  for select using (auth.uid() = user_id);
create policy "receipts_insert_own" on public.receipts
  for insert with check (auth.uid() = user_id);
create policy "receipts_update_own" on public.receipts
  for update using (auth.uid() = user_id);
create policy "receipts_delete_own" on public.receipts
  for delete using (auth.uid() = user_id);

create index receipts_user_date_idx on public.receipts (user_id, purchase_date desc);

-- 2. RECEIPT LINE ITEMS
create table public.receipt_line_items (
  id uuid primary key default gen_random_uuid(),
  receipt_id uuid not null references public.receipts(id) on delete cascade,
  name text not null default '',
  quantity numeric not null default 1,
  unit_price numeric not null default 0,
  sort_order int not null default 0
);

alter table public.receipt_line_items enable row level security;

-- No direct user_id column here — ownership is proven by joining through
-- the parent receipt, which already enforces auth.uid() = user_id.
create policy "receipt_line_items_select_own" on public.receipt_line_items
  for select using (
    exists (select 1 from public.receipts r where r.id = receipt_id and r.user_id = auth.uid())
  );
create policy "receipt_line_items_insert_own" on public.receipt_line_items
  for insert with check (
    exists (select 1 from public.receipts r where r.id = receipt_id and r.user_id = auth.uid())
  );
create policy "receipt_line_items_update_own" on public.receipt_line_items
  for update using (
    exists (select 1 from public.receipts r where r.id = receipt_id and r.user_id = auth.uid())
  );
create policy "receipt_line_items_delete_own" on public.receipt_line_items
  for delete using (
    exists (select 1 from public.receipts r where r.id = receipt_id and r.user_id = auth.uid())
  );

create index receipt_line_items_receipt_idx on public.receipt_line_items (receipt_id);

-- 3. BUDGETS — one per category per user (enforced by unique constraint,
-- not just the UI, unlike the original SwiftData version)
create table public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null
    check (category in (
      'food_dining','groceries','transportation','shopping',
      'bills_utilities','entertainment','travel','health','business','other'
    )),
  monthly_limit numeric not null default 0,
  unique (user_id, category)
);

alter table public.budgets enable row level security;

create policy "budgets_select_own" on public.budgets
  for select using (auth.uid() = user_id);
create policy "budgets_insert_own" on public.budgets
  for insert with check (auth.uid() = user_id);
create policy "budgets_update_own" on public.budgets
  for update using (auth.uid() = user_id);
create policy "budgets_delete_own" on public.budgets
  for delete using (auth.uid() = user_id);

-- 4. MILEAGE LOGS
create table public.mileage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null default current_date,
  miles numeric not null default 0,
  purpose text not null default '',
  start_location text not null default '',
  end_location text not null default '',
  created_at timestamptz not null default now()
);

alter table public.mileage_logs enable row level security;

create policy "mileage_logs_select_own" on public.mileage_logs
  for select using (auth.uid() = user_id);
create policy "mileage_logs_insert_own" on public.mileage_logs
  for insert with check (auth.uid() = user_id);
create policy "mileage_logs_update_own" on public.mileage_logs
  for update using (auth.uid() = user_id);
create policy "mileage_logs_delete_own" on public.mileage_logs
  for delete using (auth.uid() = user_id);

-- 5. TAX CONTRACTORS (1099 vendors)
create table public.tax_contractors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default '',
  total_paid numeric not null default 0,
  tax_year int not null default extract(year from current_date),
  notes text not null default '',
  created_at timestamptz not null default now()
);

alter table public.tax_contractors enable row level security;

create policy "tax_contractors_select_own" on public.tax_contractors
  for select using (auth.uid() = user_id);
create policy "tax_contractors_insert_own" on public.tax_contractors
  for insert with check (auth.uid() = user_id);
create policy "tax_contractors_update_own" on public.tax_contractors
  for update using (auth.uid() = user_id);
create policy "tax_contractors_delete_own" on public.tax_contractors
  for delete using (auth.uid() = user_id);

-- 6. STORAGE — receipt images, path convention {user_id}/{receipt_id}.jpg
insert into storage.buckets (id, name, public)
values ('receipt-images', 'receipt-images', false)
on conflict (id) do nothing;

create policy "receipt_images_select_own" on storage.objects
  for select using (
    bucket_id = 'receipt-images' and auth.uid()::text = (storage.foldername(name))[1]
  );
create policy "receipt_images_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'receipt-images' and auth.uid()::text = (storage.foldername(name))[1]
  );
create policy "receipt_images_delete_own" on storage.objects
  for delete using (
    bucket_id = 'receipt-images' and auth.uid()::text = (storage.foldername(name))[1]
  );
