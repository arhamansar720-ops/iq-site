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

  const { error: rpcError } = await supabase.rpc("complete_signup", {
    p_plan_id: planId,
    p_product_slugs: productSlugs,
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
      p_plan_id: pending.planId,
      p_product_slugs: pending.productSlugs,
    });
    if (!rpcError) clearPendingSignup();
    // If this errors (e.g. already completed by an earlier sign-in), fall
    // through — the account load below still tells us the real state.
  }

  const account = await loadAccount();
  if (!account) throw new Error("Signed in, but couldn't load your account.");
  return account;
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function changePlan(planId: string): Promise<Account> {
  const { error } = await supabase.rpc("change_plan", { p_plan_id: planId });
  if (error) throw new Error(friendlyError(error.message));

  const account = await loadAccount();
  if (!account) throw new Error("Couldn't reload your account after changing plans.");
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
