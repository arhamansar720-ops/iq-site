"use client";

import { motion } from "framer-motion";
import InstrumentCard from "./InstrumentCard";

const CARDS = [
  { label: "Health IQ", score: 84, top: "8%", left: "4%", delay: 0.1, drift: 1 },
  { label: "Driving IQ", score: 92, top: "2%", left: "62%", delay: 0.25, drift: 3 },
  { label: "Spending IQ", score: 79, top: "58%", left: "1%", delay: 0.4, drift: 5 },
  { label: "Commute IQ", score: 88, top: "66%", left: "72%", delay: 0.2, drift: 2 },
  { label: "Life IQ", score: 91, top: "30%", left: "82%", delay: 0.55, drift: 4 },
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden bg-radial-glow">
      {/* ambient particles */}
      <div className="absolute inset-0 noise opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-signal/40"
            style={{
              top: `${(i * 13.7) % 100}%`,
              left: `${(i * 29.3) % 100}%`,
              width: i % 5 === 0 ? 3 : 1.5,
              height: i % 5 === 0 ? 3 : 1.5,
              opacity: 0.15 + (i % 4) * 0.08,
              animation: `float ${5 + (i % 6)}s ease-in-out infinite`,
              animationDelay: `${(i % 7) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* floating instrument cards — desktop only, decorative layer */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {CARDS.map((c) => (
          <div key={c.label} className="absolute" style={{ top: c.top, left: c.left }}>
            <InstrumentCard label={c.label} score={c.score} delay={c.delay} drift={c.drift} />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10 text-center pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-balance text-[2.25rem] leading-[1.15] sm:text-6xl sm:leading-[1.05] md:text-7xl lg:text-[5.25rem] tracking-tight text-ivory"
        >
          Intelligence for everyday life.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22 }}
          className="mt-7 mx-auto max-w-xl text-balance text-base md:text-lg text-mute"
        >
          A family of AI-powered products designed to help you drive smarter, spend smarter,
          live healthier, and make better decisions every day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#products"
            className="inline-flex items-center justify-center rounded-full bg-ivory text-void text-sm font-medium px-7 py-3.5 hover:bg-signal transition-colors duration-300 w-full sm:w-auto"
          >
            Explore Products
          </a>
          <a
            href="#ecosystem"
            className="inline-flex items-center justify-center rounded-full border border-line text-ivory text-sm font-medium px-7 py-3.5 hover:border-signal/50 hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto"
          >
            View Ecosystem
          </a>
        </motion.div>

        {/* mobile/tablet instrument strip */}
        <div className="lg:hidden mt-14 flex gap-3 overflow-x-auto scrollbar-none pb-2 -mx-6 px-6">
          {CARDS.map((c, i) => (
            <div key={c.label} className="shrink-0">
              <InstrumentCard label={c.label} score={c.score} delay={i * 0.08} drift={i} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-void to-transparent pointer-events-none" />
    </section>
  );
}
