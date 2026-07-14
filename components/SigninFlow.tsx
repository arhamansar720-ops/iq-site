"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PLANS } from "@/lib/plans";
import { PRODUCTS } from "@/lib/products";
import * as accountApi from "@/lib/account";
import type { Account } from "@/lib/account";

type View = "overview" | "plan" | "products";

export default function SigninFlow() {
  const [account, setAccount] = useState<Account | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [view, setView] = useState<View>("overview");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [draftSelected, setDraftSelected] = useState<string[]>([]);

  const liveProducts = useMemo(() => PRODUCTS.filter((p) => p.status === "live"), []);

  useEffect(() => {
    accountApi
      .getAccount()
      .then(setAccount)
      .finally(() => setCheckingSession(false));
  }, []);

  async function signIn() {
    if (!form.email.trim() || !form.password) {
      setError("Enter your email and password to sign in.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const acc = await accountApi.signIn(form.email, form.password);
      setAccount(acc);
      setView("overview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong signing in.");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await accountApi.signOut();
    setAccount(null);
    setForm({ email: "", password: "" });
    setView("overview");
  }

  async function changePlan(planId: string) {
    setError(null);
    setLoading(true);
    try {
      const acc = await accountApi.changePlan(planId);
      setAccount(acc);
      setView("overview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't change your plan.");
    } finally {
      setLoading(false);
    }
  }

  function startEditProducts() {
    if (!account) return;
    setDraftSelected(account.products);
    setError(null);
    setView("products");
  }

  function toggleDraftProduct(slug: string) {
    if (!account) return;
    const max = account.plan.maxProducts === "all" ? PRODUCTS.length : account.plan.maxProducts;
    setDraftSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= max) return prev;
      return [...prev, slug];
    });
  }

  async function saveProducts() {
    setError(null);
    setLoading(true);
    try {
      const acc = await accountApi.setProducts(draftSelected);
      setAccount(acc);
      setView("overview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save your products.");
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return <main className="relative min-h-screen pt-32 pb-24 bg-radial-glow" />;
  }

  if (!account) {
    return (
      <main className="relative min-h-screen pt-32 pb-24 bg-radial-glow">
        <div className="mx-auto max-w-md px-6 md:px-10">
          <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ivory mb-3">Sign in</h1>
          <p className="text-mute mb-8">Manage your plan, products, and account details.</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.08em] text-mute mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && signIn()}
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
                onKeyDown={(e) => e.key === "Enter" && signIn()}
                className="w-full rounded-xl bg-white/5 border border-line px-4 py-3 text-ivory placeholder:text-mute/60 focus:outline-none focus:border-signal/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-sm text-signal mb-4">{error}</p>}

          <button
            onClick={signIn}
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-full bg-ivory text-void text-sm font-medium px-6 py-3.5 hover:bg-signal transition-colors duration-300 mb-6 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-sm text-mute">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-ivory hover:text-signal transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-32 pb-24 bg-radial-glow">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <AnimatePresence mode="wait">
          {view === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 mb-7 text-xs text-mute">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
                Signed in
              </div>
              <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ivory mb-1">
                Welcome back, {account.name || account.email}.
              </h1>
              <p className="text-mute mb-10">{account.email}</p>

              <div className="flex items-center justify-between rounded-2xl glass px-6 py-5 mb-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.08em] text-mute mb-1">Current plan</div>
                  <div className="font-display text-xl text-ivory">
                    {account.plan.name}
                    <span className="text-sm text-mute ml-2">
                      {account.plan.price}
                      {account.plan.period}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setError(null);
                    setView("plan");
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-line text-ivory text-sm font-medium px-5 py-2.5 hover:bg-white/5 transition-colors duration-300 shrink-0"
                >
                  Change plan
                </button>
              </div>

              <div className="rounded-2xl glass px-6 py-5 mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs uppercase tracking-[0.08em] text-mute">Connected products</div>
                  {account.plan.maxProducts !== "all" && (
                    <button
                      onClick={startEditProducts}
                      className="text-sm text-ivory hover:text-signal transition-colors"
                    >
                      Manage
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {(account.plan.maxProducts === "all"
                    ? PRODUCTS
                    : PRODUCTS.filter((p) => account.products.includes(p.slug))
                  ).map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="flex items-center justify-between rounded-xl px-4 py-3 -mx-4 hover:bg-white/5 transition-colors duration-300"
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
              </div>

              <button
                onClick={signOut}
                className="inline-flex items-center justify-center rounded-full border border-line text-ivory text-sm font-medium px-6 py-3.5 hover:bg-white/5 transition-colors duration-300"
              >
                Sign out
              </button>
            </motion.div>
          )}

          {view === "plan" && (
            <motion.div key="plan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ivory mb-3">Change your plan</h1>
              <p className="text-mute mb-8">Switching plans updates how many products you can connect.</p>
              {error && <p className="text-sm text-signal mb-4">{error}</p>}
              <div className="space-y-3 mb-8">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => changePlan(p.id)}
                    disabled={loading}
                    className={`w-full flex items-center justify-between rounded-2xl glass px-6 py-5 text-left hover:border-signal/40 transition-colors duration-300 disabled:opacity-60 ${
                      p.id === account.plan.id ? "border-signal/50" : ""
                    }`}
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
              <button
                onClick={() => setView("overview")}
                className="inline-flex items-center justify-center rounded-full border border-line text-ivory text-sm font-medium px-6 py-3.5 hover:bg-white/5 transition-colors duration-300"
              >
                Cancel
              </button>
            </motion.div>
          )}

          {view === "products" && (
            <motion.div key="products" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ivory mb-3">Manage products</h1>
              <p className="text-mute mb-8">
                {account.plan.name} includes {account.plan.maxProducts}{" "}
                {account.plan.maxProducts === 1 ? "product" : "products"}.
              </p>
              {error && <p className="text-sm text-signal mb-4">{error}</p>}

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {liveProducts.map((p) => {
                  const isChosen = draftSelected.includes(p.slug);
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => toggleDraftProduct(p.slug)}
                      className={`flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left transition-colors duration-300 glass ${
                        isChosen ? "border-signal/50" : "hover:border-signal/30"
                      }`}
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

              <div className="flex gap-3">
                <button
                  onClick={() => setView("overview")}
                  className="inline-flex items-center justify-center rounded-full border border-line text-ivory text-sm font-medium px-6 py-3.5 hover:bg-white/5 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProducts}
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-ivory text-void text-sm font-medium px-6 py-3.5 hover:bg-signal transition-colors duration-300 disabled:opacity-60"
                >
                  {loading ? "Saving…" : "Save"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
