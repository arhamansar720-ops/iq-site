import Stripe from "stripe";

// Server-only — never import this from a "use client" component. The
// secret key must only ever live in Vercel's environment variables, never
// in code or in the browser.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-06-24.dahlia",
});

export const STRIPE_PRICE_IDS: Record<"plus" | "one", string | undefined> = {
  plus: process.env.STRIPE_PRICE_PLUS,
  one: process.env.STRIPE_PRICE_ONE,
};
