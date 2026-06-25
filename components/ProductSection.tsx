"use client";

import { motion } from "framer-motion";
import ProductMockup from "./ProductMockup";

type Variant = "habits" | "drive" | "commute" | "receipts";

type Props = {
  index: number;
  name: string;
  category: string;
  description: string;
  features: string[];
  variant: Variant;
  reverse?: boolean;
};

export default function ProductSection({ index, name, category, description, features, variant, reverse }: Props) {
  return (
    <div className="py-20 md:py-28 border-t border-line first:border-t-0">
      <div
        className={`mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
        >
          <ProductMockup variant={variant} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="text-xs font-mono text-signal mb-4">{String(index).padStart(2, "0")} — {category}</div>
          <h3 className="font-display text-3xl md:text-5xl tracking-tight text-ivory mb-5">{name}</h3>
          <p className="text-mute text-base md:text-lg max-w-md mb-8">{description}</p>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-ivory/90">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-signal shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
