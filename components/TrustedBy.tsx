"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import VelocityMarquee from "./fx/VelocityMarquee";

const ROW_A = ["Students", "Creators", "Developers", "Entrepreneurs", "Drivers"];
const ROW_B = ["Professionals", "Athletes", "Travelers", "Small Business Owners", "Productivity Enthusiasts"];

const METRICS = [
  { value: 10000, suffix: "+", label: "Hours Optimized" },
  { value: 500000, suffix: "+", label: "Decisions Improved" },
  { value: 10, suffix: "", label: "Intelligence Platforms" },
  { value: 1, suffix: "", label: "Unified Ecosystem" },
];

function Metric({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="glass rounded-2xl px-6 py-8 text-center">
      <div className="font-display text-3xl md:text-4xl text-ivory tabular-nums">
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.1em] text-mute">{label}</div>
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section className="relative py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-2xl md:text-4xl tracking-tight text-ivory">
            Trusted by ambitious people everywhere.
          </h2>
          <p className="mt-3 text-mute max-w-xl mx-auto">
            Designed for students, professionals, creators, entrepreneurs, drivers, and people
            who want to live smarter.
          </p>
        </motion.div>
      </div>

      {/* scroll-reactive: speeds up, skews and reverses with the visitor's scroll; draggable */}
      <div className="mb-16 select-none">
        <VelocityMarquee texts={[ROW_A.join("  ·  "), ROW_B.join("  ·  ")]} />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRICS.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
