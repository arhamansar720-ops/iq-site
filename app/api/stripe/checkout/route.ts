import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { stripe, STRIPE_PRICE_IDS } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Creates a Stripe Checkout session for the signed-in user and returns the
// URL to redirect them to. The product slugs they picked ride along in
// session metadata so the webhook can grant the right entitlements once
// payment actually clears — nothing is unlocked here, only requested.
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const accessToken = authHeader.slice("Bearer ".length);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key",
    { global: { headers: { Authorization: authHeader } } }
  );
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(accessToken);
  if (userError || !user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const planId = body?.planId as string | undefined;
  const productSlugs = (body?.productSlugs as string[] | undefined) ?? [];

  if (planId !== "plus" && planId !== "one") {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }
  const priceId = STRIPE_PRICE_IDS[planId];
  if (!priceId) {
    return NextResponse.json(
      { error: `No Stripe price configured for plan "${planId}" — set STRIPE_PRICE_${planId.toUpperCase()} in the environment.` },
      { status: 500 }
    );
  }

  // Reuse an existing Stripe customer for this user if we already have one
  // (e.g. they're upgrading again after a past cancellation), otherwise let
  // Checkout create one.
  const { data: sub } = await supabaseAdmin
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://iq-site-five.vercel.app";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    customer: sub?.stripe_customer_id || undefined,
    customer_email: sub?.stripe_customer_id ? undefined : user.email,
    client_reference_id: user.id,
    metadata: {
      supabase_user_id: user.id,
      plan_id: planId,
      product_slugs: JSON.stringify(productSlugs),
    },
    subscription_data: {
      metadata: { supabase_user_id: user.id, plan_id: planId },
    },
    success_url: `${origin}/signin?checkout=success`,
    cancel_url: `${origin}/signin?checkout=cancelled`,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Stripe didn't return a checkout URL." }, { status: 500 });
  }
  return NextResponse.json({ url: session.url });
}
