export type ProductVariant = "habits" | "drive" | "commute" | "receipts" | "life" | "finance";

export type Product = {
  slug: string;
  index: number;
  name: string;
  category: string;
  status: "live" | "soon";
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  stats: { label: string; value: string }[];
  variant: ProductVariant;
};

export const PRODUCTS: Product[] = [
  {
    slug: "iqhabits",
    index: 1,
    name: "IQHabits",
    category: "Health Intelligence",
    status: "live",
    tagline: "Optimize your health, every single day.",
    description:
      "Optimize your health with AI-powered nutrition, fitness, sleep, and wellness insights.",
    longDescription:
      "IQHabits learns how you eat, move, and sleep, then turns that into a single, honest score you can act on. Instead of another tracker full of charts nobody reads, it tells you the one thing to change today — and why it matters.",
    features: [
      "Calorie tracking",
      "Nutrition intelligence",
      "Workout analysis",
      "Sleep optimization",
      "Personalized recommendations",
    ],
    stats: [
      { label: "Health IQ", value: "84" },
      { label: "Avg. sleep gain", value: "+47m" },
      { label: "Habit streak", value: "12d" },
    ],
    variant: "habits",
  },
  {
    slug: "iqdrive",
    index: 2,
    name: "IQDrive",
    category: "Driving Intelligence",
    status: "live",
    tagline: "Become a smarter, safer driver.",
    description:
      "Become a smarter and safer driver through intelligent coaching and analytics.",
    longDescription:
      "IQDrive watches the things that actually matter — braking, acceleration, cornering — and coaches you toward a measurably safer driving style. Weekly reports show real progress, not just raw data.",
    features: [
      "Driving score",
      "Safety insights",
      "Driving reports",
      "Weekly analytics",
      "AI coaching",
    ],
    stats: [
      { label: "Driving IQ", value: "92" },
      { label: "Hard brakes", value: "-31%" },
      { label: "Trips coached", value: "214" },
    ],
    variant: "drive",
  },
  {
    slug: "iqcommute",
    index: 3,
    name: "IQCommute",
    category: "Transportation Intelligence",
    status: "live",
    tagline: "Win back your commute.",
    description:
      "Save time, fuel, and money through intelligent commute optimization.",
    longDescription:
      "IQCommute studies your route, predicts traffic before it happens, and rebuilds your commute around what actually saves you time and fuel — not just the shortest line on a map.",
    features: [
      "Route intelligence",
      "Traffic prediction",
      "Fuel optimization",
      "Cost analysis",
      "Personalized commute insights",
    ],
    stats: [
      { label: "Commute IQ", value: "88" },
      { label: "Time saved", value: "18m/day" },
      { label: "Fuel saved", value: "$4.20/wk" },
    ],
    variant: "commute",
  },
  {
    slug: "iqreceipts",
    index: 4,
    name: "IQReceipts",
    category: "Spending Intelligence",
    status: "live",
    tagline: "Every receipt, finally meaningful.",
    description: "Transform every receipt into meaningful financial insight.",
    longDescription:
      "IQReceipts scans, categorizes, and explains your spending automatically — surfacing subscriptions you forgot about and patterns you didn't know you had, without a single spreadsheet.",
    features: [
      "Receipt scanning",
      "Spending analytics",
      "Expense categorization",
      "Budget awareness",
      "Subscription detection",
    ],
    stats: [
      { label: "Spending IQ", value: "79" },
      { label: "Subscriptions found", value: "6" },
      { label: "Avg. monthly save", value: "$112" },
    ],
    variant: "receipts",
  },
  {
    slug: "iqlife",
    index: 5,
    name: "IQLife",
    category: "Life Intelligence",
    status: "live",
    tagline: "Your personal operating system.",
    description:
      "IQLife connects every IQ product and transforms data into intelligent decisions.",
    longDescription:
      "IQLife is the flagship of the ecosystem — the layer that takes signals from IQHabits, IQDrive, IQCommute, and IQReceipts, and turns them into one adaptive daily plan. This is where everything you do becomes everything you need to know.",
    features: [
      "Unified dashboard",
      "Daily planning",
      "Adaptive scheduling",
      "Personal intelligence engine",
      "Cross-platform insights",
    ],
    stats: [
      { label: "Life IQ", value: "91" },
      { label: "Products connected", value: "4" },
      { label: "Decisions surfaced/day", value: "23" },
    ],
    variant: "life",
  },
  {
    slug: "iqfinance",
    index: 6,
    name: "IQFinance",
    category: "Financial Intelligence",
    status: "soon",
    tagline: "Launching soon.",
    description:
      "Financial Intelligence — the next platform in the ecosystem, connecting every decision you make about money to the rest of your IQ.",
    longDescription:
      "IQFinance is the missing piece between what you spend and what you should do about it. It connects directly to IQReceipts and IQLife, turning raw transactions into a real financial IQ score.",
    features: [
      "Net worth tracking",
      "Spending-to-savings bridge",
      "Goal-based planning",
      "Connected to IQReceipts",
      "Connected to IQLife",
    ],
    stats: [
      { label: "Status", value: "Soon" },
      { label: "Waitlist", value: "Open" },
      { label: "Connects to", value: "2 products" },
    ],
    variant: "finance",
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
