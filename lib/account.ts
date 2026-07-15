import { supabase } from "./supabase";
import { getPlan, type Plan } from "./plans";

export type Account = { name: string; email: string; plan: Plan; products: string[] };

export type SignUpResult =
  | { status: "confirmed"; account: Account }
  | { status: "check-email"; email: string };

function friendlyError(message: string) {
  if (message.includes("entitlement cap exceeded")) {
    return "Your plan doesn't allow that many products. Remove one first, or upgrade your plan.";
  }
  if (message.includes("Invalid login credentials")) {
    return "That email and password don't match an account.";
  }
  return message;
}

// If Supabase email confirmation is enabled, signUp() returns no session —
// there's nothing to complete_signup() with yet. Stash the chosen plan here
// and finish the job the first time this email successfully signs in.
const PENDING_SIGNUP_KEY = "iq_pending_signup";

type PendingSignup = { email: string; planId: string; productSlugs: string[] };

function stashPendingSignup(payload: PendingSignup) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PENDING_SIGNUP_KEY, JSON.stringify(payload));
}

function readPendingSignup(email: string): PendingSignup | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(PENDING_SIGNUP_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PendingSignup;
    return parsed.email.toLowerCase() === email.toLowerCase() ? parsed : null;
  } catch {
    return null;
  }
}

function clearPendingSignup() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PENDING_SIGNUP_KEY);
}

async function loadAccount(): Promise<Account | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("account_overview")
    .select("name, email, plan_id, product_slugs")
    .eq("user_id", user.id)
    .single();

  if (error || !data) return null;

  const plan = getPlan(data.plan_id) ?? getPlan("free")!;
  return { name: data.name, email: data.email, plan, products: data.product_slugs ?? [] };
}

export async function getAccount(): Promise<Account | null> {
  return loadAccount();
}

export async function signUp(
  email: string,
  password: string,
  name: string,
  planId: string,
  productSlugs: string[]
): Promise<SignUpResult> {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (signUpError) throw new Error(friendlyError(signUpError.message));

  // No session means the project has email confirmation enabled — there's
  // no authenticated request to run complete_signup() with yet. Save the
  // chosen plan/products and finish the job on the first real sign-in.
  if (!signUpData.session) {
    stashPendingSignup({ email, planId, productSlugs });
    return { status: "check-email", email };
  }

  // complete_signup always lands the account on the free plan now — a paid
  // planId here just tells the caller (SignupFlow) to immediately kick off
  // Stripe Checkout right after this resolves. See apply_stripe_subscription
  // in schema.sql for why plan_id can no longer be set from the client.
  const { error: rpcError } = await supabase.rpc("complete_signup", {
    p_product_slugs: planId === "free" ? productSlugs : [],
  });
  if (rpcError) throw new Error(friendlyError(rpcError.message));

  const account = await loadAccount();
  if (!account) throw new Error("Account created, but couldn't load it back. Try signing in.");
  return { status: "confirmed", account };
}

export async function signIn(email: string, password: string): Promise<Account> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(friendlyError(error.message));

  const pending = readPendingSignup(email);
  if (pending) {
    const { error: rpcError } = await supabase.rpc("complete_signup", {
      p_product_slugs: pending.planId === "free" ? pending.productSlugs : [],
    });
    if (!rpcError) {
      clearPendingSignup();
      if (pending.planId === "plus" || pending.planId === "one") {
        // They picked a paid plan before confirming their email — now that
        // they're actually signed in, send them to Stripe to finish paying.
        try {
          const { url } = await startCheckout(pending.planId, pending.productSlugs);
          window.location.href = url;
          return new Promise<Account>(() => {}); // navigating away
        } catch {
          // Checkout couldn't start (e.g. Stripe not configured yet) — they
          // land on their free-plan account and can retry from "Change plan".
        }
      }
    }
    // If rpcError is set (e.g. already completed by an earlier sign-in),
    // fall through — the account load below still tells us the real state.
  }

  const account = await loadAccount();
  if (!account) throw new Error("Signed in, but couldn't load your account.");
  return account;
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

// Downgrade/cancel only — the server rejects anything but 'free' here.
// Upgrading to a paid plan goes through startCheckout() instead, since it
// has to actually be paid for.
export async function changePlan(planId: string): Promise<Account> {
  const { error } = await supabase.rpc("change_plan", { p_plan_id: planId });
  if (error) throw new Error(friendlyError(error.message));

  const account = await loadAccount();
  if (!account) throw new Error("Couldn't reload your account after changing plans.");
  return account;
}

// Redirects to Stripe Checkout for a paid plan. Call this right after
// complete_signup() for a new paid signup, or any time an existing
// free-plan user wants to upgrade.
export async function startCheckout(
  planId: "plus" | "one",
  productSlugs: string[]
): Promise<{ url: string }> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("Not signed in.");

  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
    body: JSON.stringify({ planId, productSlugs }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Couldn't start checkout.");
  return data;
}

// Free-plan-only: swap the single connected product for a different one,
// at most once every 6 months (enforced server-side in switch_free_product,
// not just in this UI — see schema.sql for why).
export async function switchFreeProduct(newSlug: string): Promise<Account> {
  const { error } = await supabase.rpc("switch_free_product", { p_new_slug: newSlug });
  if (error) throw new Error(friendlyError(error.message));

  const account = await loadAccount();
  if (!account) throw new Error("Couldn't reload your account after switching products.");
  return account;
}

export async function setProducts(slugs: string[]): Promise<Account> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const current = await loadAccount();
  const currentSlugs = current?.products ?? [];

  const toRemove = currentSlugs.filter((s) => !slugs.includes(s));
  const toAdd = slugs.filter((s) => !currentSlugs.includes(s));

  if (toRemove.length > 0) {
    const { error } = await supabase
      .from("entitlements")
      .delete()
      .eq("user_id", user.id)
      .in("product_slug", toRemove);
    if (error) throw new Error(friendlyError(error.message));
  }

  for (const slug of toAdd) {
    const { error } = await supabase.from("entitlements").insert({ user_id: user.id, product_slug: slug });
    if (error) throw new Error(friendlyError(error.message));
  }

  const account = await loadAccount();
  if (!account) throw new Error("Couldn't reload your account after saving products.");
  return account;
}
