-- Minimal first-party OAuth2 authorization-server tables, shared by any IQ
-- family app that wants to expose itself as a Guideflow Connector (today:
-- iqreceipts-web, iqfinance-web). Additive only, run in the same Supabase
-- project as schema.sql. Not a general-purpose OAuth provider — each app
-- has exactly one registered client (Guideflow), enforced in its own
-- app/api/oauth/authorize + token routes, not in this schema.
--
-- Codes and tokens are stored as sha256 hashes, never the raw value —
-- these only ever need fast equality lookups (never decryption, unlike
-- Guideflow's own connector tokens which it must send back to Google/
-- Microsoft), so hashing is strictly stronger than encryption here.

create table public.oauth_authorization_codes (
  id uuid primary key default gen_random_uuid(),
  code_hash text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id text not null,
  redirect_uri text not null,
  expires_at timestamptz not null,
  used boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.oauth_authorization_codes enable row level security;
-- No policies — service-role only, same trust boundary as plaid_items.

create index oauth_codes_expires_idx on public.oauth_authorization_codes (expires_at);

create table public.oauth_tokens (
  id uuid primary key default gen_random_uuid(),
  access_token_hash text not null unique,
  refresh_token_hash text unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id text not null,
  access_token_expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.oauth_tokens enable row level security;
-- No policies — service-role only.

create index oauth_tokens_user_idx on public.oauth_tokens (user_id);
