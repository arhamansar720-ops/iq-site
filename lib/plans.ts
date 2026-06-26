export type Plan = {
  id: "free" | "plus" | "one";
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
  maxProducts: number | "all";
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "",
    description: "Basic access to get started with one IQ product.",
    features: ["1 IQ product", "Core insights", "Weekly summary", "Community support"],
    cta: "Get Started",
    highlight: false,
    maxProducts: 1,
  },
  {
    id: "plus",
    name: "IQ+",
    price: "$9.99",
    period: "/month",
    description: "Premium features across your favorite products.",
    features: ["3 IQ products", "Advanced insights", "Daily coaching", "Priority support", "Custom alerts"],
    cta: "Start IQ+",
    highlight: true,
    maxProducts: 3,
  },
  {
    id: "one",
    name: "IQ One",
    price: "$19.99",
    period: "/month",
    description: "Access to the complete ecosystem, unified by IQLife.",
    features: ["Every IQ product", "IQLife included", "Cross-platform insights", "Early access", "Dedicated support"],
    cta: "Start IQ One",
    highlight: false,
    maxProducts: "all",
  },
];

export function getPlan(id: string | null | undefined) {
  return PLANS.find((p) => p.id === id);
}
