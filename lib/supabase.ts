import { createClient } from "@supabase/supabase-js";

// Falls back to a placeholder project so builds and static prerendering don't
// crash when Supabase env vars aren't configured yet (e.g. a fresh Vercel
// deploy). Auth calls will fail at runtime until real env vars are set.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"
);
