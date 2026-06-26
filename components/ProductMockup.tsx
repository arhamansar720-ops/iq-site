"use client";

import { motion } from "framer-motion";

type Variant = "habits" | "drive" | "commute" | "receipts" | "life" | "finance";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[28px] glass p-5 md:p-7 w-full max-w-[420px] aspect-[4/5] mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
      <div className="relative h-full flex flex-col">{children}</div>
    </div>
  );
}

function Bar({ h, active }: { h: number; active?: boolean }) {
  return (
    <div className="flex-1 rounded-t-sm bg-white/10 relative overflow-hidden" style={{ height: `${h}%` }}>
      {active && <div className="absolute inset-0 bg-gradient-to-t from-signal2 to-signal" />}
    </div>
  );
}

export default function ProductMockup({ variant }: { variant: Variant }) {
  if (variant === "habits") {
    const rings = [
      { pct: 0.82, color: "#aebdf2" },
      { pct: 0.64, color: "#7d8fd9" },
      { pct: 0.45, color: "#f3f2ee" },
    ];
    return (
      <Frame>
        <div className="text-[11px] uppercase tracking-[0.12em] text-mute">Today</div>
        <div className="flex-1 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-44 h-44">
            {rings.map((r, i) => {
              const radius = 80 - i * 22;
              const c = 2 * Math.PI * radius;
              return (
                <g key={i}>
                  <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke={r.color}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={c}
                    initial={{ strokeDashoffset: c }}
                    whileInView={{ strokeDashoffset: c * (1 - r.pct) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    transform="rotate(-90 100 100)"
                  />
                </g>
              );
            })}
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {["Nutrition", "Sleep", "Activity"].map((l) => (
            <div key={l} className="text-[10px] text-mute">{l}</div>
          ))}
        </div>
      </Frame>
    );
  }

  if (variant === "drive") {
    return (
      <Frame>
        <div className="text-[11px] uppercase tracking-[0.12em] text-mute">Driving Score</div>
        <div className="flex-1 flex items-center justify-center">
          <svg viewBox="0 0 200 120" className="w-56">
            <path d="M20 110 A 80 80 0 0 1 180 110" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
            <motion.path
              d="M20 110 A 80 80 0 0 1 180 110"
              fill="none"
              stroke="#aebdf2"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="251"
              initial={{ strokeDashoffset: 251 }}
              whileInView={{ strokeDashoffset: 251 - 251 * 0.92 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <text x="100" y="95" textAnchor="middle" fill="#f3f2ee" fontSize="34" fontFamily="var(--font-mono)">92</text>
          </svg>
        </div>
        <div className="space-y-2">
          {["Braking", "Acceleration", "Cornering"].map((l, i) => (
            <div key={l} className="flex items-center gap-3 text-xs">
              <span className="w-20 text-mute">{l}</span>
              <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full bg-signal"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${70 + i * 10}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </Frame>
    );
  }

  if (variant === "commute") {
    return (
      <Frame>
        <div className="text-[11px] uppercase tracking-[0.12em] text-mute">Route Intelligence</div>
        <div className="flex-1 relative">
          <svg viewBox="0 0 300 220" className="w-full h-full">
            <motion.path
              d="M20 200 C 80 120, 120 180, 160 90 S 260 60 280 20"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="3"
              strokeDasharray="6 6"
            />
            <motion.path
              d="M20 200 C 80 120, 120 180, 160 90 S 260 60 280 20"
              fill="none"
              stroke="#aebdf2"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <circle cx="20" cy="200" r="5" fill="#f3f2ee" />
            <circle cx="280" cy="20" r="5" fill="#aebdf2" />
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-line">
          {[["18m", "Saved"], ["$4.20", "Fuel"], ["2", "Alerts"]].map(([v, l]) => (
            <div key={l}>
              <div className="font-mono text-sm text-ivory">{v}</div>
              <div className="text-[10px] text-mute">{l}</div>
            </div>
          ))}
        </div>
      </Frame>
    );
  }

  if (variant === "receipts") {
    return (
      <Frame>
        <div className="text-[11px] uppercase tracking-[0.12em] text-mute">This Month</div>
        <div className="flex-1 flex items-end gap-2 px-2">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <Bar key={i} h={h} active={i === 5} />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {["Groceries", "Subscriptions", "Transit"].map((l, i) => (
            <div key={l} className="flex items-center justify-between text-xs">
              <span className="text-mute">{l}</span>
              <span className="font-mono text-ivory">${(120 - i * 34).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </Frame>
    );
  }

  if (variant === "life") {
    return (
      <Frame>
        <div className="text-[11px] uppercase tracking-[0.12em] text-mute">Today's Plan</div>
        <div className="flex-1 grid grid-cols-2 gap-2 mt-2">
          {[
            { l: "Health", v: 84 },
            { l: "Drive", v: 92 },
            { l: "Spend", v: 79 },
            { l: "Commute", v: 88 },
          ].map((m) => (
            <div key={m.l} className="rounded-xl border border-line p-3 flex flex-col justify-between">
              <span className="text-[10px] text-mute uppercase tracking-wide">{m.l}</span>
              <span className="font-mono text-xl text-ivory">{m.v}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-line p-3">
          <div className="text-[10px] text-mute uppercase tracking-wide mb-1">Life IQ</div>
          <div className="font-mono text-2xl text-ivory">91</div>
        </div>
      </Frame>
    );
  }

  // finance — teaser, intentionally obscured
  return (
    <Frame>
      <div className="text-[11px] uppercase tracking-[0.12em] text-mute">IQFinance</div>
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <div className="font-display text-2xl text-ivory/30 blur-[6px] select-none">$48,120</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-signal animate-pulseDot" />
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-mute">Launching soon</div>
    </Frame>
  );
}
