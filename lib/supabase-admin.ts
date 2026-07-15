import { createClient } from "@supabase/supabase-js";

// Server-only — this uses the SERVICE ROLE key, which bypasses row-level
// security entirely. Never import this from a "use client" component, and
// never expose SUPABASE_SERVICE_ROLE_KEY with a NEXT_PUBLIC_ prefix. This
// client exists specifically for the Stripe webhook, which needs to write
// to another user's subscription row with no session driving the request.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key",
  { auth: { autoRefreshToken: false, persistSession: false } }
);
