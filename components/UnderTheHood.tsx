"use client";

import { motion } from "framer-motion";

export default function UnderTheHood({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <section className="relative py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl md:text-4xl tracking-tight text-ivory text-center mb-14"
        >
          {title}
        </motion.h2>
        <div className="space-y-4">
          {bullets.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4 rounded-2xl glass px-6 py-4"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-signal shrink-0" />
              <p className="text-sm text-ivory/90 leading-relaxed">{b}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
