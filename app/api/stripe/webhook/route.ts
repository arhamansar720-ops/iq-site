import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

// This is the only place a paid plan_id ever gets set — see the comment on
// complete_signup/apply_stripe_subscription in schema.sql. The signature
// check below is what makes that trustworthy: without it, anyone could
// POST a fake "payment succeeded" event here and grant themselves a plan
// for free, so don't relax it even for local testing (use the Stripe CLI's
// `stripe listen --forward-to` instead, which signs requests the same way
// production does).
export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      const planId = session.metadata?.plan_id;
      const productSlugs: string[] = session.metadata?.product_slugs
        ? JSON.parse(session.metadata.product_slugs)
        : [];
      const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : session.subscription?.id;

      if (!userId || (planId !== "plus" && planId !== "one") || !customerId || !subscriptionId) {
        console.error("checkout.session.completed missing required metadata", session.id);
        break;
      }

      const { error: applyError } = await supabaseAdmin.rpc("apply_stripe_subscription", {
        p_user_id: userId,
        p_plan_id: planId,
        p_stripe_customer_id: customerId,
        p_stripe_subscription_id: subscriptionId,
      });
      if (applyError) {
        console.error("apply_stripe_subscription failed", applyError);
        break;
      }

      for (const slug of productSlugs) {
        const { error: entError } = await supabaseAdmin
          .from("entitlements")
          .insert({ user_id: userId, product_slug: slug })
          .select();
        // Ignore cap/conflict errors here rather than failing the whole
        // webhook — the user is already correctly on the paid plan; a
        // product they can't have (bad slug, over cap) just doesn't get
        // added, and they can add it from the account page instead.
        if (entError) console.warn("entitlement insert skipped", slug, entError.message);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
      const { error } = await supabaseAdmin.rpc("cancel_stripe_subscription", {
        p_stripe_customer_id: customerId,
      });
      if (error) console.error("cancel_stripe_subscription failed", error);
      break;
    }

    default:
      // Other events (invoice.paid, subscription.updated for plan changes
      // made in Stripe's customer portal, etc.) aren't handled yet — this
      // covers the two events the signup/cancel flows actually need.
      break;
  }

  return NextResponse.json({ received: true });
}
