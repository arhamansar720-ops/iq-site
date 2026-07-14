"use client";

import { motion } from "framer-motion";

function TagIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path
        d="M8.6 1.5H3.4a1.9 1.9 0 00-1.9 1.9v5.2c0 .5.2 1 .56 1.34l6.1 6.1a1.9 1.9 0 002.69 0l4.5-4.5a1.9 1.9 0 000-2.69l-6.1-6.1A1.9 1.9 0 008.6 1.5z"
        stroke="#22C55E"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="5.6" cy="5.6" r="1.15" fill="#22C55E" />
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 4.5l4.5 4.5 2.5-2.5 6 6" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 12h4v-4" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
      <rect x="2.5" y="6" width="9" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.15" />
      <path d="M4.5 6V4.2a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
    </svg>
  );
}

const COPY = {
  coupon: {
    url: "checkout.nrdstrm.com/cart",
    icon: <TagIcon />,
    title: "3 codes found",
    subtitle: "Testing at checkout…",
    rowLabel: "Best code applied",
    rowValue: "−$18.40",
    cta: "View savings",
  },
  priceProtection: {
    url: "orders.nrdstrm.com/order/48213",
    icon: <TrendDownIcon />,
    title: "Price dropped $12.30",
    subtitle: "Detected 6 days after purchase",
    rowLabel: "Refund request drafted",
    rowValue: "Ready to send",
    cta: "Review & send",
  },
};

function PageContent({ mode }: { mode: "coupon" | "priceProtection" }) {
  if (mode === "priceProtection") {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <div className="h-2.5 w-32 rounded-full bg-black/15" />
          <div className="h-6 w-20 rounded-full bg-[#22C55E]/15 flex items-center justify-center">
            <div className="h-1.5 w-10 rounded-full bg-[#1a9d4a]/50" />
          </div>
        </div>
        <div className="rounded-xl bg-black/[0.035] border border-black/[0.06] p-4 mb-4">
          <div className="flex gap-3.5">
            <div
              className="h-14 w-14 rounded-lg shrink-0"
              style={{ background: "linear-gradient(135deg, #d7ddf5 0%, #aebdf2 45%, #7d8fd9 100%)" }}
            />
            <div className="flex-1 pt-0.5">
              <div className="h-2.5 w-3/4 rounded-full bg-black/20 mb-2.5" />
              <div className="h-2 w-1/3 rounded-full bg-black/10 mb-3" />
              <div className="h-2.5 w-16 rounded-full bg-black/25" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-1 mb-2">
          <div className="h-2 w-20 rounded-full bg-black/10" />
          <div className="h-2 w-14 rounded-full bg-black/10" />
        </div>
        <div className="flex items-center justify-between px-1 mb-5">
          <div className="h-2 w-24 rounded-full bg-black/10" />
          <div className="h-2.5 w-16 rounded-full bg-black/20" />
        </div>
        <div className="h-px w-full bg-black/[0.08] mb-5" />
        <div className="h-10 w-full rounded-full bg-black flex items-center justify-center">
          <div className="h-2 w-24 rounded-full bg-white/70" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-1.5 mb-6">
        <div className="h-2 w-2 rounded-full bg-black/15" />
        <div className="h-2.5 w-20 rounded-full bg-black/15" />
      </div>
      <div
        className="h-32 w-full rounded-xl mb-5 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #eef0fb 0%, #dbe0f7 40%, #aebdf2 100%)" }}
      >
        <div className="absolute -right-6 -bottom-8 h-28 w-28 rounded-full bg-white/25 blur-2xl" />
      </div>
      <div className="h-2.5 w-2/3 rounded-full bg-black/20 mb-2.5" />
      <div className="flex items-center gap-2 mb-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#d8b13a">
            <path d="M5 0l1.4 3.2 3.5.3-2.6 2.3.8 3.4L5 7.4 1.9 9.2l.8-3.4L.1 3.5l3.5-.3L5 0z" />
          </svg>
        ))}
        <div className="h-2 w-10 rounded-full bg-black/10 ml-1" />
      </div>
      <div className="flex items-baseline gap-2 mb-6">
        <div className="h-3.5 w-16 rounded-full bg-black/25" />
        <div className="h-2 w-10 rounded-full bg-black/10" />
      </div>
      <div className="h-10 w-full rounded-full bg-black flex items-center justify-center">
        <div className="h-2 w-20 rounded-full bg-white/70" />
      </div>
    </>
  );
}

export default function BrowserMockup({ mode = "coupon" }: { mode?: "coupon" | "priceProtection" }) {
  const copy = COPY[mode];

  return (
    <div className="relative rounded-[28px] glass p-5 md:p-7 w-full max-w-[560px] mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />

      <div className="relative" style={{ perspective: "1600px" }}>
        <motion.div
          className="relative animate-float"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotateY: 6, rotateX: 2, opacity: 0 }}
          whileInView={{ rotateY: 14, rotateX: 4, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Browser window */}
          <div className="relative rounded-[20px] border border-white/[0.12] bg-[#0c0c0e] shadow-[0_8px_16px_rgba(0,0,0,0.3),0_30px_70px_rgba(0,0,0,0.55)] overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            {/* Chrome bar */}
            <div className="flex items-center gap-[7px] px-4 py-3 border-b border-white/[0.08] bg-white/[0.025]">
              <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
              <div className="ml-3 flex-1 flex items-center justify-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-[11px] text-white/45 tracking-tight">
                <span className="text-white/30">
                  <LockIcon />
                </span>
                {copy.url}
              </div>
              <div className="h-5 w-5 rounded-md bg-white/[0.06] flex items-center justify-center">
                <span className="text-white/70 scale-90">
                  <TagIcon />
                </span>
              </div>
            </div>

            {/* Page content */}
            <div className="relative h-[300px] md:h-[340px] bg-[#f4f3ef] px-6 py-6">
              <PageContent mode={mode} />

              {/* IQSavings popup, docked top-right — matches the real extension banner */}
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-5 right-5 w-[228px] rounded-[20px] border border-white/[0.08] bg-[#121212] p-4 shadow-[0_4px_10px_rgba(0,0,0,0.3),0_20px_48px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="h-6 w-6 rounded-[8px] bg-[#22C55E]/15 flex items-center justify-center shrink-0">
                    {copy.icon}
                  </div>
                  <div className="text-[13px] font-semibold text-white leading-tight tracking-tight">{copy.title}</div>
                </div>
                <div className="text-[11px] text-white/45 mb-3 pl-[34px] leading-snug">{copy.subtitle}</div>
                <div className="flex items-center justify-between rounded-xl bg-[#22C55E]/[0.13] px-3 py-2.5 mb-2">
                  <span className="text-[11px] text-white/65">{copy.rowLabel}</span>
                  <span className="text-[12px] font-bold text-[#22C55E] tabular-nums">{copy.rowValue}</span>
                </div>
                <div className="h-9 w-full rounded-[13px] bg-[#22C55E] flex items-center justify-center text-[12px] font-bold text-[#0B0B0B] tracking-tight">
                  {copy.cta}
                </div>
              </motion.div>
            </div>
          </div>

          {/* soft top-down light wash, matching the radial-glow behind it */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-signal/20 to-transparent pointer-events-none rounded-t-[20px]" />
        </motion.div>
      </div>
    </div>
  );
}
