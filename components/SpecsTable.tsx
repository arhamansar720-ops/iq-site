"use client";

import { motion } from "framer-motion";

export default function SpecsTable({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <section className="relative py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl md:text-4xl tracking-tight text-ivory text-center mb-14"
        >
          Specs
        </motion.h2>
        <div className="rounded-3xl glass overflow-hidden divide-y divide-line">
          {specs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex items-center justify-between px-6 py-4"
            >
              <span className="text-sm text-mute">{s.label}</span>
              <span className="text-sm text-ivory text-right">{s.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
