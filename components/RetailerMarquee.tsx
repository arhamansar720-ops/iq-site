"use client";

import { motion } from "framer-motion";

const ROW_A = ["Amazon", "Target", "Walmart", "Best Buy", "Sephora", "Nike", "Wayfair"];
const ROW_B = ["Nordstrom", "Ulta Beauty", "Home Depot", "Macy's", "Etsy", "Walgreens", "Adidas"];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />
      <div className={`flex gap-3 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="group flex items-center gap-2.5 rounded-full border border-line px-5 py-2.5 whitespace-nowrap transition-colors duration-300 hover:border-[#22C55E]/40 hover:bg-white/[0.03]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mute transition-colors duration-300 group-hover:bg-[#22C55E]" />
            <span className="text-sm text-ivory/70 transition-colors duration-300 group-hover:text-ivory">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RetailerMarquee() {
  return (
    <section className="relative py-14 md:py-20 border-t border-line overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-xs uppercase tracking-[0.14em] text-mute mb-8"
      >
        Works automatically at 30,000+ stores, including
      </motion.p>
      <div className="flex flex-col gap-3">
        <Row items={ROW_A} />
        <Row items={ROW_B} reverse />
      </div>
    </section>
  );
}
