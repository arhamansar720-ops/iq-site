"use client";

import { motion } from "framer-motion";

const NODES = [
  { id: "habits", label: "IQHabits", x: 18, y: 12 },
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

export default function Ecosystem() {
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
        </motion.div>

        <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] md:aspect-[16/10]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            {LINKS.map(([a, b], i) => {
              const pa = pos(a);
              const pb = pos(b);
              const midX = (pa.x + pb.x) / 2;
              return (
                <g key={`${a}-${b}`}>
                  <path
                    d={`M ${pa.x} ${pa.y} Q ${midX} ${pa.y}, ${midX} ${(pa.y + pb.y) / 2} T ${pb.x} ${pb.y}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.4"
                  />
                  <motion.circle
                    r="0.9"
                    fill="#aebdf2"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                    style={{
                      offsetPath: `path('M ${pa.x} ${pa.y} Q ${midX} ${pa.y}, ${midX} ${(pa.y + pb.y) / 2} T ${pb.x} ${pb.y}')`,
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {NODES.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full glass px-2.5 py-1.5 md:px-3.5 md:py-2 text-[10px] md:text-xs text-ivory whitespace-nowrap"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <span className={`inline-block h-1.5 w-1.5 rounded-full mr-2 ${n.id === "life" ? "bg-signal" : "bg-mute"}`} />
              {n.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
