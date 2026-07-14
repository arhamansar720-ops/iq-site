"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

const VALUES = [
  {
    title: "Intelligence, not noise",
    body: "Every product distills mountains of data into one number and one next step. We measure success by decisions improved, not dashboards opened.",
  },
  {
    title: "One ecosystem",
    body: "Health, driving, commuting, and spending aren't separate problems. IQ treats them as one connected picture of your life, surfaced through IQLife.",
  },
  {
    title: "Quiet confidence",
    body: "The product should feel inevitable, not loud. We design for restraint — large whitespace, minimal copy, and motion that earns its place.",
  },
];

export default function AboutContent() {
  return (
    <main>
      <section className="relative min-h-[70svh] flex items-center overflow-hidden bg-radial-glow pt-24">
        <div className="absolute inset-0 noise opacity-30 pointer-events-none" />
        <div className="relative z-10 w-full mx-auto max-w-4xl px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 mb-7 text-xs text-mute"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
            About IQ
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-balance text-4xl md:text-6xl lg:text-7xl tracking-tight text-ivory mb-7"
          >
            Intelligence for everyday life.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-balance text-mute text-base md:text-lg"
          >
            IQ builds AI-powered intelligence systems that help people make smarter decisions
            across every area of life. Every product improves a different area of life — and
            together, they work as one intelligent ecosystem.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none" />
      </section>

      <section className="relative py-24 md:py-32 border-t border-line">
        <div className="mx-auto max-w-5xl px-6 md:px-10 grid md:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-3xl glass p-7"
            >
              <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-xl text-ivory mt-4 mb-3">{v.title}</h3>
              <p className="text-sm text-mute leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative py-24 md:py-32 border-t border-line">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl md:text-4xl tracking-tight text-ivory text-center mb-14"
          >
            The ecosystem so far.
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="rounded-2xl glass px-5 py-4 flex items-center justify-between hover:border-signal/40 transition-colors duration-300"
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
      </section>
    </main>
  );
}
