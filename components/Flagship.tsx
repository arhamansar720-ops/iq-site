"use client";

import { motion } from "framer-motion";
import ProductMockup from "./ProductMockup";

const FEATURES = [
  "Unified dashboard",
  "Daily planning",
  "Adaptive scheduling",
  "Personal intelligence engine",
  "Cross-platform insights",
];

export default function Flagship() {
  return (
    <section className="relative py-28 md:py-40 border-t border-line overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 mb-7 text-xs text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
            Flagship — Life Intelligence
          </div>
          <h2 className="font-display text-balance text-4xl md:text-6xl lg:text-7xl tracking-tight text-ivory">
            IQLife
          </h2>
          <p className="mt-6 mx-auto max-w-xl text-balance text-mute text-base md:text-lg">
            Your personal operating system. IQLife connects every IQ product and transforms
            data into intelligent decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.ul
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4 order-2 md:order-1"
          >
            {FEATURES.map((f, i) => (
              <li
                key={f}
                className="flex items-center gap-4 rounded-2xl glass px-5 py-4 text-ivory/95"
              >
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                {f}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2"
          >
            <ProductMockup variant="life" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
