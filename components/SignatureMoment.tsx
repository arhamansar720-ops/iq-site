"use client";

import { motion } from "framer-motion";
import ProductMockup from "./ProductMockup";
import type { ProductVariant } from "@/lib/products";

export default function SignatureMoment({
  eyebrow,
  title,
  body,
  stat,
  variant,
}: {
  eyebrow: string;
  title: string;
  body: string;
  stat: { value: string; label: string };
  variant: ProductVariant;
}) {
  return (
    <section className="relative py-28 md:py-40 border-t border-line overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 mb-7 text-xs text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
            {eyebrow}
          </div>
          <h2 className="font-display text-balance text-3xl md:text-5xl tracking-tight text-ivory mb-6">{title}</h2>
          <p className="text-mute text-base md:text-lg leading-relaxed mb-8 max-w-md">{body}</p>
          <div className="inline-flex items-baseline gap-3 rounded-2xl glass px-6 py-4">
            <span className="font-display text-3xl text-ivory">{stat.value}</span>
            <span className="text-xs text-mute uppercase tracking-[0.08em]">{stat.label}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
          <ProductMockup variant={variant} />
        </motion.div>
      </div>
    </section>
  );
}
