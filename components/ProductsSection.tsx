"use client";

import { motion } from "framer-motion";
import ProductSection from "./ProductSection";
import Flagship from "./Flagship";
import FinanceTeaser from "./FinanceTeaser";

const PRODUCTS: {
  index: number;
  name: string;
  category: string;
  description: string;
  features: string[];
  variant: "habits" | "drive" | "commute" | "receipts";
  reverse?: boolean;
}[] = [
  {
    index: 1,
    name: "IQHabits",
    category: "Health Intelligence",
    description: "Optimize your health with AI-powered nutrition, fitness, sleep, and wellness insights.",
    features: ["Calorie tracking", "Nutrition intelligence", "Workout analysis", "Sleep optimization", "Personalized recommendations"],
    variant: "habits",
  },
  {
    index: 2,
    name: "IQDrive",
    category: "Driving Intelligence",
    description: "Become a smarter and safer driver through intelligent coaching and analytics.",
    features: ["Driving score", "Safety insights", "Driving reports", "Weekly analytics", "AI coaching"],
    variant: "drive",
    reverse: true,
  },
  {
    index: 3,
    name: "IQCommute",
    category: "Transportation Intelligence",
    description: "Save time, fuel, and money through intelligent commute optimization.",
    features: ["Route intelligence", "Traffic prediction", "Fuel optimization", "Cost analysis", "Personalized commute insights"],
    variant: "commute",
  },
  {
    index: 4,
    name: "IQReceipts",
    category: "Spending Intelligence",
    description: "Transform every receipt into meaningful financial insight.",
    features: ["Receipt scanning", "Spending analytics", "Expense categorization", "Budget awareness", "Subscription detection"],
    variant: "receipts",
    reverse: true,
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="relative">
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-28 md:pt-36 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 mb-7 text-xs text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
            The IQ family
          </div>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-ivory">
            One ecosystem. Six intelligences.
          </h2>
        </motion.div>
      </div>

      {PRODUCTS.map((p) => (
        <ProductSection key={p.name} {...p} />
      ))}

      <FinanceTeaser />
      <Flagship />
    </section>
  );
}
