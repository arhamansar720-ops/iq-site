"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeatureAccordion({
  features,
  details,
}: {
  features: string[];
  details: string[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className="space-y-4">
      {features.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.li
            key={f}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-2xl glass overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-4 px-6 py-4 text-left"
            >
              <span className="font-mono text-xs text-signal shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-ivory/95">{f}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className={`shrink-0 text-mute transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 pl-[2.85rem] text-sm text-mute leading-relaxed">
                    {details[i]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
