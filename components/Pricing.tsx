"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PLANS } from "@/lib/plans";

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-28 md:py-36 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-ivory">Choose your intelligence.</h2>
          <p className="mt-4 text-mute text-base md:text-lg">Start free. Upgrade when you're ready for the whole ecosystem.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.highlight ? "glass border-signal/30 md:-translate-y-3" : "glass"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal text-void text-[11px] font-medium px-3 py-1">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl text-ivory mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-display text-4xl text-ivory">{plan.price}</span>
                <span className="text-mute text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-mute mb-7">{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-ivory/90">
                    <span className="h-1 w-1 rounded-full bg-signal shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/signup?plan=${plan.id}`}
                className={`inline-flex items-center justify-center rounded-full text-sm font-medium px-6 py-3.5 transition-colors duration-300 ${
                  plan.highlight
                    ? "bg-ivory text-void hover:bg-signal"
                    : "border border-line text-ivory hover:border-signal/50 hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
