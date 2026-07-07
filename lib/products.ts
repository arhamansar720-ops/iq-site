export type ProductVariant = "habits" | "drive" | "commute" | "receipts" | "life" | "finance" | "valet" | "rx";

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
  problem: { headline: string; body: string };
  howItWorks: { title: string; steps: { title: string; body: string }[] };
  signature: { eyebrow: string; title: string; body: string; stat: { value: string; label: string } };
  underTheHood: { title: string; bullets: string[] };
  integration: { title: string; body: string; links: string[] };
  specs: { label: string; value: string }[];
  faq: { q: string; a: string }[];
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
    problem: {
      headline: "Tracking shouldn't feel like a second job.",
      body: "Most health apps ask you to weigh food, scan barcodes, and fill in forms before they tell you anything useful. IQHabits flips that around — your Apple Watch and iPhone already know most of what matters. You just tell it what you ate, in your own words.",
    },
    howItWorks: {
      title: "How IQHabits actually works",
      steps: [
        {
          title: "Your Watch already knows",
          body: "Heart rate, workouts, steps, and sleep stages sync automatically from Apple Watch and iPhone — no setup beyond turning it on.",
        },
        {
          title: "Tell it what you ate",
          body: "Type \u201ctwo eggs and toast\u201d or \u201cchipotle bowl, no rice\u201d — IQHabits parses it into calories and macros in seconds. No search, no barcode.",
        },
        {
          title: "One score, not ten charts",
          body: "Sleep, activity, and nutrition combine into a single Health IQ — the one number that tells you if today is actually on track.",
        },
        {
          title: "A nudge, not a report",
          body: "Instead of a dashboard to check, you get one specific thing to change today — an earlier dinner, more water, a short walk after lunch.",
        },
      ],
    },
    signature: {
      eyebrow: "The signature feature",
      title: "Type what you ate. That's it.",
      body: "No camera, no barcode scanner, no scrolling a food database for ten minutes. IQHabits reads a plain sentence — \u201cchicken burrito and a Coke\u201d — and returns calories, protein, carbs, and fat instantly. It gets faster and more accurate the more you use it, learning your usual meals and the way you phrase things.",
      stat: { value: "<3s", label: "Avg. time to log a meal" },
    },
    underTheHood: {
      title: "Built on data you already trust",
      bullets: [
        "Reads natively from Apple HealthKit — heart rate, workouts, steps, and sleep stages, with no separate Watch app required.",
        "Food parsing runs through a language model tuned specifically for nutrition estimation, not a generic chatbot.",
        "Your data stays tied to your Apple ID sign-in. IQHabits never sells health data to advertisers.",
      ],
    },
    integration: {
      title: "Feeds directly into IQLife",
      body: "A rough night's sleep or a missed workout doesn't just sit inside IQHabits — it shows up in IQLife's plan for the day, automatically adjusting what gets prioritized.",
      links: ["iqlife"],
    },
    specs: [
      { label: "Platform", value: "iOS, Apple Watch" },
      { label: "Data sources", value: "Apple Watch, iPhone, manual text log" },
      { label: "Sync frequency", value: "Real-time via HealthKit" },
      { label: "Food logging method", value: "Natural-language text" },
    ],
    faq: [
      {
        q: "Do I need an Apple Watch?",
        a: "No — IQHabits works with iPhone-only data, but Apple Watch unlocks heart rate and sleep-stage detail that meaningfully improves your Health IQ score.",
      },
      {
        q: "Can I log food without exact amounts?",
        a: "Yes. Describe your meal naturally — \u201ca bowl of cereal\u201d or \u201clarge coffee with oat milk\u201d — and IQHabits estimates portions the way a person would.",
      },
      {
        q: "Is my health data shared with anyone?",
        a: "No. Your HealthKit data and meal logs are used only to calculate your own scores and recommendations.",
      },
    ],
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
      "IQDrive watches the things that actually matter — braking, acceleration, cornering — and coaches you toward a measurably safer driving style. Built for parents monitoring new drivers and insurers running usage-based discount programs.",
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
    problem: {
      headline: "Most driving apps just collect data. Yours should act on it.",
      body: "Insurance telematics apps log your trips for a discount you'll see in three months. Family-tracking apps tell you where someone is, but not whether they're actually okay right now. IQDrive does both of those jobs — and the one thing neither does: it notices when something's genuinely wrong.",
    },
    howItWorks: {
      title: "How IQDrive actually works",
      steps: [
        {
          title: "Every trip, detected automatically",
          body: "IQDrive recognizes when you start driving using motion and GPS — no manual start or stop, nothing to forget.",
        },
        {
          title: "Scored on what insurers actually measure",
          body: "Braking, acceleration, cornering, and speed consistency roll up into a single Driving IQ — the same categories usage-based insurance programs use for discounts.",
        },
        {
          title: "Tracked live with Apple Maps",
          body: "Every trip is mapped in real time, so a parent or account holder can see exactly where a driver is and where they've been.",
        },
        {
          title: "Unusual stops get flagged",
          body: "If a vehicle stops somewhere atypical — a highway shoulder, no restart for several minutes — IQDrive treats it as a possible emergency, not just an empty data point.",
        },
      ],
    },
    signature: {
      eyebrow: "The signature feature",
      title: "Built like Fall Detection — for the road.",
      body: "When IQDrive notices a trip has stopped somewhere unusual for longer than expected, it doesn't just log it and move on. It immediately notifies the linked parent or emergency contact, hands them live location and trip context to monitor the situation in real time, and gives a direct path to call 911 if it looks serious. Same instinct as Apple Watch's fall detection — built for what can go wrong on the road instead of on foot.",
      stat: { value: "Live", label: "Location shared the moment a stop is flagged" },
    },
    underTheHood: {
      title: "Built to avoid false alarms",
      bullets: [
        "Trip detection runs on motion and GPS, so it keeps working through brief signal loss until reconnection.",
        "Anomaly detection compares each stop against typical patterns for that route and time of day before flagging anything — a normal gas-station stop won't trigger an alert.",
        "Routing and live tracking are powered directly by Apple Maps.",
      ],
    },
    integration: {
      title: "Built for two very different buyers",
      body: "Families use IQDrive to monitor new or teen drivers with real context, not just a dot on a map. Insurers and fleets use the same Driving IQ for usage-based discount programs. A string of harsh-braking days also feeds straight into IQLife's daily plan.",
      links: ["iqlife"],
    },
    specs: [
      { label: "Platform", value: "iOS" },
      { label: "Tracking", value: "GPS via Apple Maps" },
      { label: "Best for", value: "Parents, teen drivers, insurers" },
      { label: "Emergency flow", value: "Notify contact → monitor live → optional 911" },
    ],
    faq: [
      {
        q: "Will it flag every stop at a gas station or red light?",
        a: "No. IQDrive learns typical stop patterns for your routes — it's built to flag genuinely unusual stops, not routine ones.",
      },
      {
        q: "What happens after a contact gets notified?",
        a: "They can watch the trip live in real time and decide whether to check in directly or escalate to 911 — IQDrive doesn't call emergency services automatically.",
      },
      {
        q: "Can insurers see my full location history?",
        a: "No. Insurance integrations see your Driving IQ and trip scores — not your live location or destinations.",
      },
    ],
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
      "IQCommute is built directly on Apple Maps routing and live traffic data, layered with your own driving history to find what actually saves you time and fuel — not just the shortest line on a map.",
    features: [
      "Route intelligence",
      "Traffic prediction",
      "Fuel optimization",
      "Cost analysis",
      "Personalized commute insights",
    ],
    featureDetails: [
      "Compares every viable route against your actual driving history, not just live map data, to pick the one that works for you.",
      "Uses Apple Maps' live traffic data to anticipate congestion, so you leave at the right time instead of reacting to a jam.",
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
    problem: {
      headline: "Maps gets you there. It doesn't know your commute.",
      body: "Apple Maps is excellent at giving you a route right now. It doesn't remember that your 7:40am route is always twelve minutes worse than your 7:55am one, or that the fuel difference between two routes adds up to real money every month.",
    },
    howItWorks: {
      title: "How IQCommute actually works",
      steps: [
        {
          title: "Built directly on Apple Maps",
          body: "IQCommute uses real-time Apple Maps routing and traffic data as its foundation — no separate map to learn.",
        },
        {
          title: "Layered with your own history",
          body: "Your past trips reveal patterns Maps alone can't see — which route is actually faster for you, not just in theory.",
        },
        {
          title: "Costed out in real numbers",
          body: "Every route comparison comes with a fuel and time cost, so 'faster' and 'cheaper' aren't guesses.",
        },
        {
          title: "One commute insight a day",
          body: "Instead of constant rerouting, IQCommute tells you the one adjustment — a different departure time, a different route — actually worth making.",
        },
      ],
    },
    signature: {
      eyebrow: "Early access",
      title: "Still early — and that's intentional.",
      body: "IQCommute is the newest product in the IQ family, built on the same Apple Maps foundation as the rest of iOS, with route and cost intelligence layered carefully on top. We're expanding it deliberately rather than shipping everything at once.",
      stat: { value: "v1", label: "Currently in active development" },
    },
    underTheHood: {
      title: "What it does — and doesn't — replace",
      bullets: [
        "Routing, live traffic, and ETAs come directly from Apple Maps — IQCommute adds judgment on top of it, it doesn't replace it.",
        "Fuel cost estimates use your vehicle's typical efficiency combined with current local fuel prices.",
        "Currently focused on driving commutes, with route history specific to your own patterns.",
      ],
    },
    integration: {
      title: "Connects to IQDrive and IQLife",
      body: "Your commute draws on the same driving signals as IQDrive, and a longer-than-usual commute shows up in IQLife's plan as a reason to lighten the rest of your day.",
      links: ["iqdrive", "iqlife"],
    },
    specs: [
      { label: "Platform", value: "iOS" },
      { label: "Routing engine", value: "Apple Maps" },
      { label: "Status", value: "Actively expanding" },
      { label: "Scope", value: "Driving commutes" },
    ],
    faq: [
      {
        q: "Does IQCommute replace Apple Maps?",
        a: "No — it sits on top of Apple Maps, adding cost analysis and personal route history Maps doesn't track on its own.",
      },
      {
        q: "Will it support transit or biking?",
        a: "Driving is the current focus. Other commute types are on the roadmap as the product matures.",
      },
      {
        q: "How is fuel cost calculated?",
        a: "From your vehicle's typical efficiency and current local fuel prices, applied to the specific route and traffic conditions.",
      },
    ],
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
      "IQReceipts scans receipts and tax documents, detects subscriptions automatically, and drafts reminder or cancellation emails — turning paperwork you'd normally manage by hand into something that manages itself.",
    features: [
      "Receipt scanning",
      "Tax document organization",
      "Subscription detection",
      "Automated reminder emails",
      "Spending analytics",
    ],
    featureDetails: [
      "Snap a photo or forward an email receipt — line items are extracted automatically, no manual entry.",
      "Receipts and documents relevant to taxes are tagged and organized continuously, so nothing's a scramble in April.",
      "Finds recurring charges automatically, including quiet price increases on subscriptions you already pay for.",
      "Drafts a reminder or cancellation email ahead of a renewal — ready for you to review and send.",
      "Turns categorized transactions into clear monthly trends, so you can see where money actually goes.",
    ],
    stats: [
      { label: "Spending IQ", value: "79" },
      { label: "Subscriptions found", value: "6" },
      { label: "Avg. monthly save", value: "$112" },
    ],
    variant: "receipts",
    problem: {
      headline: "Receipts, taxes, and subscriptions live in three different piles. They shouldn't.",
      body: "A photo of a receipt goes one place. Tax documents go in a folder you'll dig through in April. Subscriptions quietly renew because no one remembers to check. IQReceipts treats all three as the same problem: paperwork you shouldn't have to manage by hand.",
    },
    howItWorks: {
      title: "How IQReceipts actually works",
      steps: [
        {
          title: "Scan it, forget it",
          body: "Snap a receipt or forward an email and the line items are extracted automatically — no manual entry.",
        },
        {
          title: "Tax season, handled year-round",
          body: "Receipts and documents relevant to taxes are tagged and organized continuously, so nothing's a scramble in April.",
        },
        {
          title: "Subscriptions get watched for you",
          body: "IQReceipts detects recurring charges automatically, including quiet price increases on things you already pay for.",
        },
        {
          title: "Reminders that actually do something",
          body: "Before a renewal hits, you get a reminder — and an automated email ready to go if you want to cancel.",
        },
      ],
    },
    signature: {
      eyebrow: "The signature feature",
      title: "It doesn't just notice the subscription. It drafts the cancellation.",
      body: "Most apps stop at \u201cyou have 6 subscriptions.\u201d IQReceipts goes further: when a renewal is coming up, it prepares a cancellation or reminder email for you to review and send, so noticing a forgotten subscription and actually doing something about it happen in the same step.",
      stat: { value: "6", label: "Avg. forgotten subscriptions found" },
    },
    underTheHood: {
      title: "How the scanning and detection work",
      bullets: [
        "Receipt and document scanning uses OCR tuned specifically for receipts and tax paperwork, not generic text extraction.",
        "Subscription detection looks for recurring merchant and amount patterns across scanned receipts and forwarded emails.",
        "Drafted cancellation emails are always shown for review before sending — nothing goes out without your approval.",
      ],
    },
    integration: {
      title: "The financial backbone of the ecosystem",
      body: "IQReceipts' categorized spending and subscription data is what IQFinance is built on top of, and the same spending insights surface inside IQLife's daily plan.",
      links: ["iqfinance", "iqlife"],
    },
    specs: [
      { label: "Platform", value: "iOS" },
      { label: "Input methods", value: "Camera scan, forwarded email" },
      { label: "Document types", value: "Receipts, tax documents" },
      { label: "Automation", value: "Subscription reminders, draft emails" },
    ],
    faq: [
      {
        q: "Does IQReceipts send emails on its own?",
        a: "No. It drafts reminder or cancellation emails for you to review — nothing is sent without your approval.",
      },
      {
        q: "Can it help at tax time?",
        a: "Yes. Receipts and documents tagged as tax-relevant are organized continuously, so you have what you need without a year-end search.",
      },
      {
        q: "How does it find subscriptions I forgot about?",
        a: "By matching recurring merchant names and amounts across your scanned receipts and forwarded emails, including price changes on existing charges.",
      },
    ],
  },
  {
    slug: "iqlife",
    index: 5,
    name: "IQLife",
    category: "Life Intelligence",
    status: "live",
    tagline: "Built for brains that lose momentum.",
    description:
      "IQLife connects every IQ product and transforms data into intelligent decisions — built specifically for ADHD and OCD patterns around focus and motivation.",
    longDescription:
      "IQLife is the flagship of the ecosystem, designed around a different problem than most productivity apps: knowing what to do and still not being able to start, or getting stuck checking the same thing over and over. It externalizes structure instead of just storing it.",
    features: [
      "One next step",
      "Momentum tracking",
      "Adaptive daily planning",
      "Personal intelligence engine",
      "Cross-product insights",
    ],
    featureDetails: [
      "Instead of a backlog, IQLife shows the single next tiny action — small enough that starting doesn't require motivation you don't have yet.",
      "Progress is tracked as momentum, not unbroken streaks — missing a day doesn't reset everything to zero.",
      "Your plan shifts in real time around sleep, driving, commute, and spending signals, rather than assuming today looks like yesterday.",
      "The core engine connecting every product's data into one model of you, so each platform gets smarter from the others.",
      "Surfaces non-obvious connections — like spending spikes that follow poor sleep — that no single product could see alone.",
    ],
    stats: [
      { label: "Life IQ", value: "91" },
      { label: "Products connected", value: "4" },
      { label: "Next steps shown at once", value: "1" },
    ],
    variant: "life",
    problem: {
      headline: "Other apps assume you'll remember to open them. IQLife doesn't.",
      body: "Most productivity tools are built for brains that already have working executive function — they just need a place to put a list. IQLife is built for the opposite problem: knowing what to do and still not being able to start, or getting stuck checking the same thing over and over. It's designed to externalize structure, not just store it.",
    },
    howItWorks: {
      title: "How IQLife actually works",
      steps: [
        {
          title: "One next step, not a list",
          body: "Instead of a backlog, IQLife shows the single next tiny action — small enough that starting doesn't require motivation you don't have yet.",
        },
        {
          title: "Momentum over streaks",
          body: "Progress is tracked as momentum, not unbroken streaks — missing a day doesn't reset everything to zero, because that's not how motivation actually works.",
        },
        {
          title: "Built-in done signals",
          body: "For checking and reassurance-seeking patterns, IQLife gives one clear \u201cthis is done\u201d confirmation, instead of a screen you can keep reopening to recheck.",
        },
        {
          title: "Your day, replanned automatically",
          body: "Poor sleep from IQHabits, a long commute from IQCommute, a stressful spending day from IQReceipts — IQLife folds all of it into a lighter, more realistic plan instead of pretending today is identical to yesterday.",
        },
      ],
    },
    signature: {
      eyebrow: "The flagship feature",
      title: "Designed around losing motivation, not assuming you won't.",
      body: "IQLife's adaptive engine is built specifically for ADHD and OCD patterns — task initiation difficulty, motivation drop-off, and compulsive checking loops. Rather than another to-do list that assumes consistent follow-through, it actively redesigns the day in real time around how you're actually doing, and gives definitive stopping points instead of open-ended checklists.",
      stat: { value: "1", label: "Next step shown at a time" },
    },
    underTheHood: {
      title: "Built around how focus actually breaks down",
      bullets: [
        "Daily planning logic is built around task-initiation and motivation patterns, not generic productivity frameworks.",
        "Pulls real signals from IQHabits, IQDrive, and IQCommute — sleep, activity, and commute stress — to judge how much today can realistically hold.",
        "Designed with checking-pattern behavior in mind: clear, singular completion states instead of indefinitely re-checkable lists.",
      ],
    },
    integration: {
      title: "The hub all of IQ feeds into",
      body: "Every other IQ product exists partly to give IQLife better signal — a rough night, a stressful drive, an unexpected expense all become context for what today's plan should look like.",
      links: ["iqhabits", "iqdrive", "iqcommute", "iqreceipts"],
    },
    specs: [
      { label: "Platform", value: "iOS" },
      { label: "Designed for", value: "ADHD and OCD patterns" },
      { label: "Inputs", value: "IQHabits, IQDrive, IQCommute, IQReceipts" },
      { label: "Core mechanic", value: "Single next-step focus mode" },
    ],
    faq: [
      {
        q: "Is IQLife only useful if I have ADHD or OCD?",
        a: "It's built specifically around those patterns, but the underlying idea — one next step instead of a long list — helps almost anyone who struggles with task initiation.",
      },
      {
        q: "Do I need the other IQ products for IQLife to work?",
        a: "No. IQLife works on its own, but it gets noticeably smarter about your day when IQHabits, IQDrive, IQCommute, or IQReceipts are connected.",
      },
      {
        q: "How does it handle missed days without feeling punishing?",
        a: "Momentum tracking doesn't reset to zero after a miss — it's designed to reflect an overall pattern, not penalize a single off day.",
      },
    ],
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
      "IQFinance is being built around a simpler idea than most money apps: one number, no shame, structure first. It picks up directly where IQReceipts leaves off.",
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
    problem: {
      headline: "Money apps love to make you feel behind.",
      body: "Red and green progress bars, guilt-based budgets, categories that don't match how you actually think about spending. IQFinance is being built around a simpler idea: one number, no shame, structure first.",
    },
    howItWorks: {
      title: "The plan so far",
      steps: [
        {
          title: "Starts where IQReceipts leaves off",
          body: "Categorized spending and subscriptions already detected by IQReceipts become the foundation — nothing re-entered.",
        },
        {
          title: "One number, not ten categories",
          body: "A single Financial IQ score is designed to replace a wall of budget categories most people don't check anyway.",
        },
        {
          title: "Goals, worked backward",
          body: "Set an amount and a date — IQFinance is being designed to work backward into a plan that adjusts as spending changes.",
        },
        {
          title: "Shows up in your day, not a separate app",
          body: "Like every IQ product, financial decisions are meant to surface inside IQLife's daily plan instead of living in their own dashboard.",
        },
      ],
    },
    signature: {
      eyebrow: "Coming soon",
      title: "Built shame-free, on purpose.",
      body: "IQFinance is still early, but the core decision is already made: no red-and-green guilt bars, no comparison to anyone else's spending — just the one thing worth knowing today.",
      stat: { value: "Soon", label: "In active development" },
    },
    underTheHood: {
      title: "What's already decided",
      bullets: [
        "Will inherit categorized data directly from IQReceipts rather than starting from a blank slate.",
        "Designed to connect to IQLife's daily plan from day one, not bolted on later.",
        "No public release date yet — built deliberately rather than rushed.",
      ],
    },
    integration: {
      title: "Connects to IQReceipts and IQLife",
      body: "IQFinance is being designed as a continuation of IQReceipts' spending data, and as a direct input into IQLife's daily plan.",
      links: ["iqreceipts", "iqlife"],
    },
    specs: [
      { label: "Status", value: "In development" },
      { label: "Foundation", value: "IQReceipts spending data" },
      { label: "Planned integration", value: "IQLife daily plan" },
      { label: "Platform", value: "iOS" },
    ],
    faq: [
      {
        q: "When does IQFinance launch?",
        a: "There's no public date yet — it's being built deliberately rather than rushed out.",
      },
      {
        q: "Will I need IQReceipts to use it?",
        a: "IQFinance is being designed to build directly on IQReceipts' data, so using both together will likely unlock the most value.",
      },
      {
        q: "Can I get early access?",
        a: "Joining the waitlist on this page is the best way to hear first when early access opens.",
      },
    ],
  },
  {
    slug: "iqvalet",
    index: 7,
    name: "IQValet",
    category: "Valet Intelligence",
    status: "live",
    tagline: "Hand over your keys. Watch where they go.",
    description:
      "On-demand valet parking that connects drivers, valets, and venues on one live map.",
    longDescription:
      "IQValet turns valet parking into something you can actually see. A live map matches you with the nearest available valet and garage, then tracks your car from the moment you hand over your keys until the moment it comes back — no more wondering where it went or who has it.",
    features: [
      "On-demand valet requests",
      "Live valet & garage map",
      "Real-time trip tracking",
      "Digital vehicle inspection",
      "Cashless tip & payment",
    ],
    featureDetails: [
      "See every nearby valet and garage on a live map and request a pickup in seconds — no phone call, no waiting at a stand.",
      "Valets and garages appear as live pins before you even request, so you know who's close and how long the wait actually is.",
      "From key handoff to return, your car's location updates in real time on the same map you requested from.",
      "A timestamped photo walkaround runs before and after your car is valeted, so any new scuff or scratch has a clear record.",
      "Pay and tip inside the app when your car comes back — no fumbling for cash at the stand.",
    ],
    stats: [
      { label: "Valet IQ", value: "90" },
      { label: "Avg. pickup time", value: "4m" },
      { label: "Trips tracked", value: "38" },
    ],
    variant: "valet",
    problem: {
      headline: "Handing your keys to a stranger shouldn't feel like a leap of faith.",
      body: "Traditional valet means giving up your car and hoping for the best — no idea where it's parked, who's driving it, or what condition it'll come back in. IQValet replaces the hope with a live map and a photo record, for exactly as long as someone else has your keys.",
    },
    howItWorks: {
      title: "How IQValet actually works",
      steps: [
        {
          title: "Request the nearest valet",
          body: "The live map shows nearby valets and garages before you even request — pick one and a valet is on the way.",
        },
        {
          title: "A walkaround, before anything moves",
          body: "A quick photo inspection runs before handoff, so your car's condition is documented the moment it leaves your hands.",
        },
        {
          title: "Tracked the whole way",
          body: "From key handoff to the garage and back, your car's live location stays on your screen — never a black box.",
        },
        {
          title: "Retrieve and pay in the app",
          body: "Request your car back, watch it return live, and pay and tip in-app — no cash, no waiting at a stand.",
        },
      ],
    },
    signature: {
      eyebrow: "The signature feature",
      title: "Watch your car's exact route. Live.",
      body: "Most valet services end the moment you hand over your keys — you get a ticket and a hope. IQValet keeps a live line to your car from the second it's out of your hands: where it's headed, when it's parked, and when it's on its way back. The same live-tracking instinct as a rideshare app, pointed at your own car.",
      stat: { value: "Live", label: "GPS tracking from key handoff to return" },
    },
    underTheHood: {
      title: "Built as one network, four ways in",
      bullets: [
        "One live dispatch layer connects the customer app, the valet's job app, the venue's business dashboard, and an operations console for garages running multiple locations.",
        "Live location and map matching are built on MapKit, the same foundation as IQCommute's routing.",
        "Every trip's photo walkaround is timestamped and stored with the trip record, not a separate system.",
      ],
    },
    integration: {
      title: "Connects to IQDrive and IQCommute",
      body: "A trip where someone else is driving your car shouldn't count against you. IQValet tags valeted trips so IQDrive and IQCommute recognize them as valet-driven, keeping your own driving score and commute history accurate.",
      links: ["iqdrive", "iqcommute"],
    },
    specs: [
      { label: "Platform", value: "iOS" },
      { label: "Live tracking", value: "MapKit, key handoff to return" },
      { label: "Network", value: "Customer, valet, business, operations apps" },
      { label: "Vehicle record", value: "Timestamped photo walkaround" },
    ],
    faq: [
      {
        q: "Can I see my car while it's parked, not just while it's moving?",
        a: "Yes — your car's location stays visible on the live map for the entire time it's with a valet, whether it's in transit or parked.",
      },
      {
        q: "What happens if there's new damage?",
        a: "The before-and-after photo walkaround gives you a timestamped record to compare, so any new damage is easy to point to.",
      },
      {
        q: "How do tips work?",
        a: "Tipping happens in the app when your car is returned — no cash needed at the stand.",
      },
    ],
  },
  {
    slug: "iqrx",
    index: 8,
    name: "IQrX",
    category: "Pharmacy Intelligence",
    status: "live",
    tagline: "Every dose, sorted. Every refill, delivered.",
    description:
      "A smart pharmacy assistant that sorts every prescription by dose and brings refills to your door.",
    longDescription:
      "IQrX takes every prescription you're on and sorts it into Morning, Afternoon, Evening, and Night — so the question is never “which pills, when,” just “what's next.” When something needs a refill, IQrX handles the delivery too, tracked the same way as any modern delivery app.",
    features: [
      "Dose-bucket scheduling",
      "Prescription management",
      "Home delivery requests",
      "Live delivery tracking",
      "Refill reminders",
    ],
    featureDetails: [
      "Every prescription is sorted automatically into Morning, Afternoon, Evening, or Night — no more cross-referencing five different bottles.",
      "Add a prescription once — dose, frequency, refill count — and IQrX keeps it organized and current from then on.",
      "Skip the pharmacy counter and request home delivery for any prescription that's running low.",
      "Track every delivery from placed to packed to out for delivery to delivered, the same way you'd track any package.",
      "Get reminded before a prescription actually runs out, not after you've already missed a dose.",
    ],
    stats: [
      { label: "Adherence IQ", value: "87" },
      { label: "Prescriptions tracked", value: "5" },
      { label: "Avg. delivery time", value: "38m" },
    ],
    variant: "rx",
    problem: {
      headline: "Five prescriptions, four times a day, and no single place that tracks it.",
      body: "Between morning pills, evening pills, and the ones that are supposed to come with food, most people are running their medication schedule from memory or a sticky note. IQrX turns that into four clear buckets a day and handles the refill errand for you.",
    },
    howItWorks: {
      title: "How IQrX actually works",
      steps: [
        {
          title: "Add a prescription once",
          body: "Dose, frequency, and refill count go in once — IQrX takes it from there.",
        },
        {
          title: "Sorted into four buckets",
          body: "Morning, Afternoon, Evening, and Night — every prescription lands in the right slot automatically.",
        },
        {
          title: "Request delivery instead of a pharmacy trip",
          body: "When something's running low, request home delivery right from the app instead of making the trip yourself.",
        },
        {
          title: "Tracked from placed to delivered",
          body: "Watch your delivery move from placed → packed → out for delivery → delivered, live.",
        },
      ],
    },
    signature: {
      eyebrow: "The signature feature",
      title: "Four buckets. Zero guessing.",
      body: "IQrX doesn't just list your prescriptions — it sorts every one of them into Morning, Afternoon, Evening, or Night based on how it's actually supposed to be taken. Open the app at any point in the day and the answer to “what do I take now” is already sorted for you.",
      stat: { value: "4", label: "Dose buckets sorted automatically" },
    },
    underTheHood: {
      title: "Built around real prescription schedules",
      bullets: [
        "Dose-bucket sorting is driven by each prescription's actual frequency, not a generic reminder time.",
        "Delivery tracking follows the same placed → packed → out for delivery → delivered pattern as consumer logistics apps.",
        "Prescription data is stored on-device and tied to your Apple ID sign-in.",
      ],
    },
    integration: {
      title: "Feeds into IQLife",
      body: "A missed dose or a delayed delivery becomes context IQLife factors into today's plan, right alongside sleep, driving, and spending signals.",
      links: ["iqlife"],
    },
    specs: [
      { label: "Platform", value: "iOS" },
      { label: "Data storage", value: "On-device, tied to Apple ID" },
      { label: "Scheduling", value: "Morning, Afternoon, Evening, Night buckets" },
      { label: "Delivery tracking", value: "Placed → Packed → Out for delivery → Delivered" },
    ],
    faq: [
      {
        q: "Does IQrX replace my pharmacy?",
        a: "No — it organizes what you're prescribed and can request delivery for refills, working alongside your existing pharmacy.",
      },
      {
        q: "Is my prescription data shared with anyone?",
        a: "No. Your prescription data is used only to build your schedule and manage your own deliveries.",
      },
      {
        q: "Can I track prescriptions for more than one person?",
        a: "IQrX is currently built around a single person's prescriptions and schedule.",
      },
    ],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
