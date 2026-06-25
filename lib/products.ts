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
  featureDetails: string[];
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
    featureDetails: [
      "Log meals in seconds with AI-assisted estimation — no manual macro entry required. IQHabits learns your usual meals and gets faster over time.",
      "Goes beyond calories to flag nutrient gaps, sodium spikes, and patterns tied to how you actually feel day to day.",
      "Automatically reads workout intensity and recovery load, then adjusts your weekly targets so you're not training on empty.",
      "Tracks sleep stages and surfaces the one habit — caffeine timing, screen time, workout window — most likely hurting your rest.",
      "Every recommendation is ranked by impact, so you always know the single highest-leverage change to make today.",
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
    featureDetails: [
      "A single 0–100 score built from braking, acceleration, cornering, and speed consistency — the same signal insurers care about, but built for you.",
      "Pinpoints exactly which trips and which moments dragged your score down, instead of vague 'drive safer' advice.",
      "Clean, shareable reports for every trip — useful for tracking improvement or for proving safe driving to insurers and fleets.",
      "A weekly digest that shows trend lines, not just snapshots, so you can see whether coaching is actually working.",
      "Short, specific coaching nudges delivered after each trip — never generic, always tied to what just happened on the road.",
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
    featureDetails: [
      "Compares every viable route against your actual driving history, not just live map data, to pick the one that works for you.",
      "Forecasts congestion before it hits using historical patterns, so you leave at the right time instead of reacting to a traffic jam.",
      "Suggests route and speed adjustments that meaningfully cut fuel use, with savings shown in real dollars, not just percentages.",
      "Breaks down what your commute actually costs — fuel, time, tolls — so you can see the true price of your daily route.",
      "Surfaces patterns specific to you: which days run long, which routes you avoid for a reason, and where there's room to improve.",
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
    featureDetails: [
      "Snap a photo or forward an email receipt — line items are extracted automatically, no manual entry.",
      "Turns raw transactions into clear monthly trends, so you can see where money actually goes instead of guessing.",
      "Every purchase is sorted into a category automatically, and corrected categorization gets smarter the more you use it.",
      "Gentle, real-time nudges when you're approaching a budget limit — before the month ends, not after.",
      "Finds recurring charges you've forgotten about, including price increases on subscriptions you already have.",
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
    featureDetails: [
      "Every IQ score — health, driving, commute, spending — in one view, instead of four separate apps to check.",
      "Builds your day around what actually matters today: a recovery day after poor sleep, a buffer before a long commute, a lighter spend day after a big purchase.",
      "Your plan shifts in real time as new signals come in — IQLife replans rather than waiting for you to ask.",
      "The core engine connecting every product's data into one model of you, so each platform gets smarter from the others.",
      "Surfaces non-obvious connections — like spending spikes that follow poor sleep — that no single product could see alone.",
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
    featureDetails: [
      "A live view of assets versus liabilities, updated automatically as connected accounts and products change.",
      "Turns spending patterns already detected by IQReceipts into concrete savings moves, instead of leaving insight and action disconnected.",
      "Set a goal — an amount, a date — and IQFinance works backward into a plan that adjusts as your spending changes.",
      "Inherits categorized spending data directly from IQReceipts, so nothing needs to be entered twice.",
      "Feeds your financial IQ into the same daily plan IQLife builds, alongside health, driving, and commute.",
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
