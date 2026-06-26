"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ROW_A = ["Students", "Creators", "Developers", "Entrepreneurs", "Drivers"];
const ROW_B = ["Professionals", "Athletes", "Travelers", "Small Business Owners", "Productivity Enthusiasts"];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />
      <div className={`flex gap-4 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="group flex items-center gap-2.5 rounded-full border border-line px-5 py-2.5 whitespace-nowrap hover:border-signal/40 hover:bg-white/5 transition-colors duration-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mute group-hover:bg-signal transition-colors" />
            <span className="text-sm text-mute group-hover:text-ivory transition-colors">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const METRICS = [
  { value: 10000, suffix: "+", label: "Hours Optimized" },
  { value: 500000, suffix: "+", label: "Decisions Improved" },
  { value: 6, suffix: "", label: "Intelligence Platforms" },
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

      <div className="flex flex-col gap-4 mb-16">
        <MarqueeRow items={ROW_A} />
        <MarqueeRow items={ROW_B} reverse />
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
