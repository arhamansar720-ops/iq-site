"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import MagnetWrap from "./fx/MagnetWrap";

const NODES = [
  { id: "habits", label: "IQHabits", x: 16, y: 12 },
  { id: "nutrition", label: "IQNutrition", x: 37, y: 13 },
  { id: "drive", label: "IQDrive", x: 18, y: 42 },
  { id: "commute", label: "IQCommute", x: 18, y: 72 },
  { id: "receipts", label: "IQReceipts", x: 18, y: 96 },
  { id: "savings", label: "IQSavings", x: 34, y: 78 },
  { id: "finance", label: "IQFinance", x: 50, y: 96 },
  { id: "valet", label: "IQValet", x: 50, y: 30 },
  { id: "rx", label: "IQrX", x: 50, y: 62 },
  { id: "life", label: "IQLife", x: 76, y: 50 },
];

const LINKS: [string, string][] = [
  ["habits", "life"],
  ["nutrition", "habits"],
  ["nutrition", "life"],
  ["drive", "life"],
  ["commute", "life"],
  ["receipts", "finance"],
  ["receipts", "savings"],
  ["savings", "finance"],
  ["finance", "life"],
  ["valet", "drive"],
  ["valet", "commute"],
  ["rx", "life"],
];

function pos(id: string) {
  const n = NODES.find((n) => n.id === id)!;
  return { x: n.x, y: n.y };
}

function linkPath(a: string, b: string) {
  const pa = pos(a);
  const pb = pos(b);
  const midX = (pa.x + pb.x) / 2;
  return `M ${pa.x} ${pa.y} Q ${midX} ${pa.y}, ${midX} ${(pa.y + pb.y) / 2} T ${pb.x} ${pb.y}`;
}

export default function Ecosystem() {
  const [active, setActive] = useState<string | null>(null);
  const touches = (a: string, b: string) => active !== null && (a === active || b === active);
  const linked = (id: string) =>
    active !== null && (id === active || LINKS.some(([a, b]) => (a === active && b === id) || (b === active && a === id)));

  return (
    <section id="ecosystem" className="relative py-28 md:py-36 border-t border-line overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-ivory">Smarter together.</h2>
          <p className="mt-4 mx-auto max-w-lg text-mute text-base md:text-lg">
            Every IQ product becomes more powerful when connected.
          </p>
          <p className="mt-2 text-xs text-mute/70 hidden md:block">Hover a product to trace its connections.</p>
        </motion.div>

        <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] md:aspect-[16/10]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            {LINKS.map(([a, b], i) => {
              const d = linkPath(a, b);
              const hot = touches(a, b);
              const dim = active !== null && !hot;
              return (
                <g key={`${a}-${b}`} className="transition-opacity duration-300" style={{ opacity: dim ? 0.25 : 1 }}>
                  <path
                    d={d}
                    fill="none"
                    stroke={hot ? "rgba(174,189,242,0.75)" : "rgba(255,255,255,0.1)"}
                    strokeWidth={hot ? 0.6 : 0.4}
                    className="transition-[stroke,stroke-width] duration-300"
                  />
                  {/* CSS offset-path animation: runs off the main thread instead of 12 JS loops */}
                  <circle
                    r={hot ? 1.2 : 0.9}
                    fill="#aebdf2"
                    className="eco-pulse"
                    style={{
                      offsetPath: `path('${d}')`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: hot ? "1.4s" : "3s",
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {NODES.map((n) => (
            <motion.div
              key={n.id}
              onPointerEnter={() => setActive(n.id)}
              onPointerLeave={() => setActive((cur) => (cur === n.id ? null : cur))}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="absolute cursor-default outline-none"
              // centering lives in framer's own transform so it composes with the scale-in
              style={{ left: `${n.x}%`, top: `${n.y}%`, x: "-50%", y: "-50%" }}
            >
              <MagnetWrap strength={4}>
                <div
                  className={`rounded-full glass px-2.5 py-1.5 md:px-3.5 md:py-2 text-[10px] md:text-xs whitespace-nowrap transition-[border-color,color,box-shadow,opacity] duration-300 ${
                    linked(n.id)
                      ? "border-signal/50 text-ivory shadow-[0_0_24px_-4px_rgba(174,189,242,0.55)]"
                      : active !== null
                        ? "text-mute opacity-60"
                        : "text-ivory"
                  }`}
                >
                  <span className={`inline-block h-1.5 w-1.5 rounded-full mr-2 ${n.id === "life" || linked(n.id) ? "bg-signal" : "bg-mute"}`} />
                  {n.label}
                </div>
              </MagnetWrap>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
