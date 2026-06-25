"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  score: number;
  delay?: number;
  className?: string;
  drift?: number;
};

export default function InstrumentCard({ label, score, delay = 0, className = "", drift = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, score, {
      duration: 1.4,
      delay: delay + 0.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, score, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ animationDelay: `${drift * 0.15}s` }}
      className={`animate-float relative w-[156px] rounded-2xl glass px-4 py-3.5 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-signal/10 to-transparent animate-scan" />
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] uppercase tracking-[0.12em] text-mute">{label}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
      </div>
      <div className="font-mono text-3xl tabular-nums text-ivory">{display}</div>
      <div className="mt-2 h-1 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-signal2 to-signal"
          style={{ width: inView ? `${score}%` : "0%", transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)", transitionDelay: `${delay + 0.3}s` }}
        />
      </div>
    </motion.div>
  );
}
