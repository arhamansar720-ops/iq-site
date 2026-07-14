"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export default function ProductTeaserGrid() {
  return (
    <section id="products" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 mb-7 text-xs text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
            The IQ family
          </div>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-ivory">
            One ecosystem. Nine intelligences.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            >
              <Link
                href={`/products/${p.slug}`}
                className="group relative flex flex-col h-full rounded-3xl glass p-7 transition-colors duration-300 hover:border-signal/40"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-signal">{String(p.index).padStart(2, "0")}</span>
                  {p.status === "soon" ? (
                    <span className="text-[10px] uppercase tracking-[0.1em] text-mute border border-line rounded-full px-2.5 py-1">
                      Soon
                    </span>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
                  )}
                </div>

                <h3 className="font-display text-2xl text-ivory mb-1.5">{p.name}</h3>
                <p className="text-xs uppercase tracking-[0.08em] text-mute mb-4">{p.category}</p>
                <p className="text-sm text-mute leading-relaxed mb-8 flex-1">{p.description}</p>

                <span className="inline-flex items-center gap-2 text-sm text-ivory/90 group-hover:text-signal transition-colors duration-300">
                  Explore {p.name}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
