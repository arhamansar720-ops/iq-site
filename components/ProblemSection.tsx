"use client";

import { motion } from "framer-motion";

export default function ProblemSection({ headline, body }: { headline: string; body: string }) {
  return (
    <section className="relative py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-3xl px-6 md:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-balance text-3xl md:text-5xl tracking-tight text-ivory mb-6"
        >
          {headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-balance text-mute text-base md:text-lg leading-relaxed"
        >
          {body}
        </motion.p>
      </div>
    </section>
  );
}
