"use client";

import { motion } from "framer-motion";
import ProductMockup from "./ProductMockup";

export default function FinanceTeaser() {
  return (
    <div className="py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
        >
          <ProductMockup variant="finance" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 mb-6 text-xs text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
            Launching Soon
          </div>
          <h3 className="font-display text-3xl md:text-5xl tracking-tight text-ivory mb-5">IQFinance</h3>
          <p className="text-mute text-base md:text-lg max-w-md">
            Financial Intelligence — the next platform in the ecosystem, connecting every
            decision you make about money to the rest of your IQ.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
