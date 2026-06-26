"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PLANS, getPlan, type Plan } from "@/lib/plans";
import { PRODUCTS } from "@/lib/products";

type Step = "plan" | "products" | "account" | "done";

export default function SignupFlow({ initialPlanId }: { initialPlanId?: string }) {
  const initialPlan = getPlan(initialPlanId);
  const [plan, setPlan] = useState<Plan | undefined>(initialPlan);
  const [step, setStep] = useState<Step>(initialPlan ? "products" : "plan");
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const liveProducts = useMemo(() => PRODUCTS.filter((p) => p.status === "live"), []);
  const allIncluded = plan?.maxProducts === "all";

  function toggleProduct(slug: string) {
    if (!plan || plan.maxProducts === "all") return;
    const max = plan.maxProducts;
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= max) return prev;
      return [...prev, slug];
    });
  }

  function choosePlan(p: Plan) {
    setPlan(p);
    setSelected([]);
    setStep("products");
  }

  function continueFromProducts() {
    if (!plan) return;
    if (plan.maxProducts !== "all" && selected.length !== plan.maxProducts) {
      setError(`Select exactly ${plan.maxProducts} product${plan.maxProducts === 1 ? "" : "s"} to continue.`);
      return;
    }
    setError(null);
    setStep("account");
  }

  function createAccount() {
    if (!form.name.trim() || !form.email.trim() || form.password.length < 8) {
      setError("Enter your name, a valid email, and a password of at least 8 characters.");
      return;
    }
    setError(null);
    setStep("done");
  }

  const chosenProducts = allIncluded ? PRODUCTS : PRODUCTS.filter((p) => selected.includes(p.slug));

  return (
    <main className="relative min-h-screen pt-32 pb-24 bg-radial-glow">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        {/* progress */}
        <div className="flex items-center gap-2 mb-10">
          {(["plan", "products", "account", "done"] as Step[]).map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${
                ["plan", "products", "account", "done"].indexOf(step) >= i ? "bg-signal" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1 — plan */}
          {step === "plan" && (
            <motion.div key="plan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ivory mb-3">Choose your plan</h1>
              <p className="text-mute mb-8">You can change this any time.</p>
              <div className="space-y-3">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => choosePlan(p)}
                    className="w-full flex items-center justify-between rounded-2xl glass px-6 py-5 text-left hover:border-signal/40 transition-colors duration-300"
                  >
                    <div>
                      <div className="font-display text-lg text-ivory">{p.name}</div>
                      <div className="text-sm text-mute">{p.description}</div>
                    </div>
                    <div className="font-display text-xl text-ivory whitespace-nowrap ml-4">
                      {p.price}
                      <span className="text-sm text-mute">{p.period}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 — products */}
          {step === "products" && plan && (
            <motion.div key="products" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ivory mb-3">
                {allIncluded ? "Every product is included" : `Choose ${plan.maxProducts} product${plan.maxProducts === 1 ? "" : "s"}`}
              </h1>
              <p className="text-mute mb-8">
                {allIncluded
                  ? `${plan.name} unlocks the full ecosystem, unified by IQLife.`
                  : `${plan.name} includes access to ${plan.maxProducts} of the products below.`}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {(allIncluded ? PRODUCTS : liveProducts).map((p) => {
                  const isChosen = allIncluded || selected.includes(p.slug);
                  const disabled = allIncluded;
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleProduct(p.slug)}
                      className={`flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left transition-colors duration-300 glass ${
                        isChosen ? "border-signal/50" : ""
                      } ${disabled ? "cursor-default" : "hover:border-signal/30"}`}
                    >
                      <div>
                        <div className="text-sm text-ivory">{p.name}</div>
                        <div className="text-[11px] text-mute">{p.category}</div>
                      </div>
                      <span
                        className={`h-4 w-4 rounded-full border shrink-0 flex items-center justify-center ${
                          isChosen ? "bg-signal border-signal" : "border-line"
                        }`}
                      >
                        {isChosen && (
                          <svg width="9" height="9" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#050506" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {error && <p className="text-sm text-signal mb-4">{error}</p>}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("plan")}
                  className="inline-flex items-center justify-center rounded-full border border-line text-ivory text-sm font-medium px-6 py-3.5 hover:bg-white/5 transition-colors duration-300"
                >
                  Back
                </button>
                <button
                  onClick={continueFromProducts}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-ivory text-void text-sm font-medium px-6 py-3.5 hover:bg-signal transition-colors duration-300"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — account */}
          {step === "account" && plan && (
            <motion.div key="account" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ivory mb-3">Create your account</h1>
              <p className="text-mute mb-8">
                {plan.name} — {chosenProducts.map((p) => p.name).join(", ")}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.08em] text-mute mb-2">Full name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-line px-4 py-3 text-ivory placeholder:text-mute/60 focus:outline-none focus:border-signal/50"
                    placeholder="Jordan Avery"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.08em] text-mute mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-line px-4 py-3 text-ivory placeholder:text-mute/60 focus:outline-none focus:border-signal/50"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.08em] text-mute mb-2">Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-xl bg-white/5 border border-line px-4 py-3 text-ivory placeholder:text-mute/60 focus:outline-none focus:border-signal/50"
                    placeholder="At least 8 characters"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-signal mb-4">{error}</p>}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("products")}
                  className="inline-flex items-center justify-center rounded-full border border-line text-ivory text-sm font-medium px-6 py-3.5 hover:bg-white/5 transition-colors duration-300"
                >
                  Back
                </button>
                <button
                  onClick={createAccount}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-ivory text-void text-sm font-medium px-6 py-3.5 hover:bg-signal transition-colors duration-300"
                >
                  Create account
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 — done */}
          {step === "done" && plan && (
            <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 mb-7 text-xs text-mute">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
                Account created
              </div>
              <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ivory mb-3">
                Welcome to IQ, {form.name.split(" ")[0]}.
              </h1>
              <p className="text-mute mb-10">
                Your {plan.name} plan is active for {form.email}. Here's what's included:
              </p>

              <div className="space-y-3 mb-10">
                {chosenProducts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="flex items-center justify-between rounded-2xl glass px-6 py-4 hover:border-signal/40 transition-colors duration-300"
                  >
                    <div>
                      <div className="text-sm text-ivory">{p.name}</div>
                      <div className="text-[11px] text-mute">{p.category}</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-mute">
                      <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>

              <div className="rounded-2xl border border-line px-6 py-5 text-sm text-mute">
                Mobile apps for iOS and Android are in development. We'll email{" "}
                <span className="text-ivory">{form.email}</span> a download link the moment they're ready —
                no need to check back here.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
