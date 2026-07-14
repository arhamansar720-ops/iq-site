"use client";

import { motion } from "framer-motion";
import { PRODUCTS, type ProductVariant } from "@/lib/products";

const ACCENT = "#22C55E";

function Icon({ name }: { name: string }) {
  const common = { width: 15, height: 15, viewBox: "0 0 16 16", fill: "none" as const };
  switch (name) {
    case "heart":
      return (
        <svg {...common}>
          <path d="M8 13.5s-5.5-3.3-5.5-7.2A3.1 3.1 0 018 4.3a3.1 3.1 0 015.5 2c0 3.9-5.5 7.2-5.5 7.2z" stroke={ACCENT} strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      );
    case "car":
      return (
        <svg {...common}>
          <path d="M2.5 10.5V8.8l1.3-3A1.4 1.4 0 015.1 5h5.8a1.4 1.4 0 011.3.9l1.3 3v1.6" stroke={ACCENT} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="1.8" y="10.5" width="12.4" height="2.6" rx="1" stroke={ACCENT} strokeWidth="1.3" />
          <circle cx="4.6" cy="13.1" r="1" fill={ACCENT} />
          <circle cx="11.4" cy="13.1" r="1" fill={ACCENT} />
        </svg>
      );
    case "route":
      return (
        <svg {...common}>
          <circle cx="3.2" cy="4" r="1.6" stroke={ACCENT} strokeWidth="1.3" />
          <circle cx="12.8" cy="12" r="1.6" stroke={ACCENT} strokeWidth="1.3" />
          <path d="M4.6 5.2c2 1 3.4 1 5-.4s3.4-.9 5 1" stroke={ACCENT} strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1.2 1.6" />
        </svg>
      );
    case "receipt":
      return (
        <svg {...common}>
          <path d="M4 1.8h8v12.4l-1.5-1-1.5 1-1.5-1-1.5 1-1.5-1-1.5 1V1.8z" stroke={ACCENT} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M5.6 4.6h4.8M5.6 6.6h4.8M5.6 8.6h3" stroke={ACCENT} strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M8.6 1.5L3.2 8.8h3.6l-.9 5.7 5.9-7.8H8.2l.4-5.2z" stroke={ACCENT} strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );
    case "dollar":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6.2" stroke={ACCENT} strokeWidth="1.3" />
          <path d="M8 4.6v6.8M9.8 6.1c0-.7-.8-1.2-1.8-1.2s-1.8.5-1.8 1.2c0 1.9 3.6 1 3.6 2.9 0 .7-.8 1.2-1.8 1.2s-1.8-.5-1.8-1.2" stroke={ACCENT} strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case "key":
      return (
        <svg {...common}>
          <circle cx="4.6" cy="8" r="2.6" stroke={ACCENT} strokeWidth="1.3" />
          <path d="M7 8h7M11 8v2.2M13.2 8v1.6" stroke={ACCENT} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "pill":
      return (
        <svg {...common}>
          <rect x="2.2" y="6.6" width="11.6" height="4.8" rx="2.4" transform="rotate(-30 8 9)" stroke={ACCENT} strokeWidth="1.2" />
          <path d="M7.3 6.2l1.4 5.6" stroke={ACCENT} strokeWidth="1.1" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6" stroke={ACCENT} strokeWidth="1.3" />
        </svg>
      );
  }
}

const APP_META: Record<
  Exclude<ProductVariant, "savings">,
  { icon: string; rows: { icon: string; title: string; sub: string; value: string }[]; ring: { value: string; label: string; pct: number } }
> = {
  habits: {
    icon: "heart",
    ring: { value: "84", label: "HEALTH IQ", pct: 0.72 },
    rows: [
      { icon: "bolt", title: "Chicken bowl, no rice", sub: "Logged in 3s", value: "612 cal" },
      { icon: "heart", title: "Sleep", sub: "8h 12m · Deep 2h 04m", value: "+47m" },
      { icon: "bolt", title: "Evening run", sub: "5.2 km · 27 min", value: "412 cal" },
    ],
  },
  drive: {
    icon: "car",
    ring: { value: "92", label: "DRIVING IQ", pct: 0.85 },
    rows: [
      { icon: "car", title: "Home → Downtown", sub: "18 min · Smooth", value: "A" },
      { icon: "bolt", title: "Hard brakes", sub: "vs. last week", value: "-31%" },
      { icon: "car", title: "Weekly digest", sub: "214 trips coached", value: "↗" },
    ],
  },
  commute: {
    icon: "route",
    ring: { value: "88", label: "COMMUTE IQ", pct: 0.78 },
    rows: [
      { icon: "route", title: "7:55am departure", sub: "vs. 7:40am route", value: "-12m" },
      { icon: "bolt", title: "Fuel saved", sub: "this week", value: "$4.20" },
      { icon: "route", title: "Time saved", sub: "avg. per day", value: "18m" },
    ],
  },
  receipts: {
    icon: "receipt",
    ring: { value: "79", label: "SPENDING IQ", pct: 0.65 },
    rows: [
      { icon: "receipt", title: "Netflix", sub: "Subscription detected", value: "$15.49" },
      { icon: "bolt", title: "Subscriptions found", sub: "this month", value: "6" },
      { icon: "receipt", title: "Avg. monthly save", sub: "from cancellations", value: "$112" },
    ],
  },
  life: {
    icon: "bolt",
    ring: { value: "91", label: "LIFE IQ", pct: 0.9 },
    rows: [
      { icon: "bolt", title: "Next step", sub: "Reply to two emails", value: "1" },
      { icon: "heart", title: "Momentum", sub: "not a streak", value: "12d" },
      { icon: "bolt", title: "Products connected", sub: "feeding your plan", value: "4" },
    ],
  },
  finance: {
    icon: "dollar",
    ring: { value: "79", label: "FINANCIAL IQ", pct: 0.65 },
    rows: [
      { icon: "dollar", title: "Net worth", sub: "assets − liabilities", value: "Live" },
      { icon: "dollar", title: "Bank connection", sub: "via Plaid", value: "✓" },
      { icon: "receipt", title: "Connected to", sub: "IQReceipts data", value: "✓" },
    ],
  },
  valet: {
    icon: "key",
    ring: { value: "90", label: "VALET IQ", pct: 0.82 },
    rows: [
      { icon: "key", title: "Nearest valet", sub: "0.2 mi away", value: "4m" },
      { icon: "car", title: "Trip tracked live", sub: "key handoff → return", value: "Live" },
      { icon: "key", title: "Trips tracked", sub: "all time", value: "38" },
    ],
  },
  rx: {
    icon: "pill",
    ring: { value: "87", label: "ADHERENCE IQ", pct: 0.8 },
    rows: [
      { icon: "pill", title: "Morning", sub: "2 prescriptions", value: "Taken" },
      { icon: "bolt", title: "Delivery", sub: "out for delivery", value: "38m" },
      { icon: "pill", title: "Prescriptions tracked", sub: "all active", value: "5" },
    ],
  },
};

function ProgressRing({ pct, value, label }: { pct: number; value: string; label: string }) {
  const size = 108;
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={ACCENT}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="47%" textAnchor="middle" fill="#f3f2ee" fontSize="26" fontWeight="800" fontFamily="var(--font-grotesk)">
        {value}
      </text>
      <text x="50%" y="63%" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" letterSpacing="0.5" fontFamily="var(--font-body)">
        {label}
      </text>
    </svg>
  );
}

export default function IllustratedPhoneMockup({ variant }: { variant: Exclude<ProductVariant, "savings"> }) {
  const product = PRODUCTS.find((p) => p.variant === variant);
  const meta = APP_META[variant];
  if (!product || !meta) return null;

  return (
    <div className="relative rounded-[28px] glass p-5 md:p-7 w-full max-w-[420px] aspect-[4/5] mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
      <div className="relative h-full flex items-center justify-center" style={{ perspective: "1600px" }}>
        <div className="relative h-full max-h-[480px] aspect-[9/19.5] animate-float">
          <motion.div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ rotateY: -6, rotateX: 1, opacity: 0 }}
            whileInView={{ rotateY: -24, rotateX: 3, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="absolute top-0 right-0 bottom-0 w-3 rounded-r-[2.6rem]"
              style={{
                background:
                  "linear-gradient(180deg, #d8deff 0%, #aebdf2 10%, #7d8fd9 22%, #232329 55%, #0c0c0e 100%)",
              }}
            />
            <div className="absolute inset-0 rounded-[2.6rem] border-[3px] border-white/15 bg-black shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[3.2%] rounded-full bg-black z-10 ring-1 ring-white/10" />

              {/* Illustrated screen content — no real screenshot dependency */}
              <div className="absolute inset-0 bg-[#050506] px-[7%] pt-[13%] pb-[6%] flex flex-col">
                <div className="flex items-center gap-2 mb-[6%]">
                  <div className="h-[9%] aspect-square rounded-[22%] bg-[#22C55E]/15 flex items-center justify-center shrink-0">
                    <Icon name={meta.icon} />
                  </div>
                  <div className="text-[11px] font-bold text-ivory tracking-tight truncate">{product.name}</div>
                </div>

                <div className="flex items-center justify-center mb-[6%]">
                  <ProgressRing pct={meta.ring.pct} value={meta.ring.value} label={meta.ring.label} />
                </div>

                <div className="flex flex-col gap-[6%]">
                  {meta.rows.map((row, i) => (
                    <div key={i} className="flex items-center gap-2.5 rounded-[14%] bg-white/[0.04] border border-white/[0.06] px-[6%] py-[5%]">
                      <div className="h-[9%] aspect-square rounded-full bg-[#22C55E]/12 flex items-center justify-center shrink-0">
                        <Icon name={row.icon} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-semibold text-ivory truncate leading-tight">{row.title}</div>
                        <div className="text-[7.5px] text-mute truncate leading-tight mt-[2px]">{row.sub}</div>
                      </div>
                      <div className="text-[9px] font-bold text-[#22C55E] shrink-0">{row.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-signal/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
