"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export default function IntegrationBlock({
  title,
  body,
  links,
}: {
  title: string;
  body: string;
  links: string[];
}) {
  const linked = links
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="relative py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-4xl px-6 md:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl md:text-4xl tracking-tight text-ivory mb-6"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-mute text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {body}
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {linked.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ivory/90 hover:border-signal/40 hover:bg-white/5 transition-colors duration-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              {p.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
