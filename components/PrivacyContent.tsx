"use client";

import { motion } from "framer-motion";

const SECTIONS = [
  {
    title: "1. What this covers",
    body: [
      "This Privacy Policy explains what information IQ (“IQ,” “we,” “us”) collects across the IQ family of apps — including IQHabits, IQDrive, IQCommute, IQReceipts, IQLife, IQFinance, IQValet, IQrX, and IQSavings (each an “App”) — and this website (together, the “Service”), and how we use it.",
    ],
  },
  {
    title: "2. Information you provide",
    body: [
      "Account details — name and email — when you create an IQ account.",
      "Content you add directly, such as receipts you capture, habits you track, trips you log, or financial goals you set.",
    ],
  },
  {
    title: "3. Information from connected services",
    body: [
      "If you connect a bank or card account, financial data (balances, transactions) is retrieved through Plaid, a third-party financial data provider. IQ never sees or stores your bank login credentials — those are handled entirely by Plaid and your bank.",
      "If you grant permission, some Apps read data from Apple HealthKit (e.g. sleep, activity) or Apple Maps (e.g. location, routes) to power features like health scoring or commute tracking. This data stays on-device or is processed only to power the specific feature you enabled.",
    ],
  },
  {
    title: "4. How we use information",
    body: [
      "To operate the Service — running the features you use, syncing your account across Apps, and showing you insights based on your own data.",
      "We don't sell your personal data, and we don't share it with advertisers.",
    ],
  },
  {
    title: "5. Data sharing between IQ products",
    body: [
      "Part of what makes the IQ ecosystem work is that products can share signal with each other when you've connected them — for example, spending data from IQReceipts informing IQFinance, or sleep and driving data feeding IQLife's daily plan. This only happens for products you've actually connected under your account.",
    ],
  },
  {
    title: "6. Data retention and deletion",
    body: [
      "You can delete your account and associated data at any time from within any App's settings. Deleting your account removes your profile, subscription, and entitlement records; content tied to a specific App is governed by that App's own local storage and deletion behavior.",
    ],
  },
  {
    title: "7. Third-party services",
    body: [
      "The Service relies on third parties to operate, including Supabase (account and authentication infrastructure), Plaid (bank account connections), and Apple (App Store, HealthKit, Maps). Each of those providers has its own privacy practices governing the data it processes on our behalf.",
    ],
  },
  {
    title: "8. Children's privacy",
    body: [
      "The Service isn't directed at children under 13, and we don't knowingly collect personal information from them.",
    ],
  },
  {
    title: "9. Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. If we make material changes, we'll let you know before they take effect.",
    ],
  },
  {
    title: "10. Contact",
    body: ["Questions about this policy? Reach us through the contact link in the footer of this site."],
  },
];

export default function PrivacyContent() {
  return (
    <main>
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 mb-7 text-xs text-mute"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
            Legal
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl tracking-tight text-ivory mb-5"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-mute"
          >
            Last updated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </motion.p>
        </div>
      </section>

      <section className="relative pb-28 md:pb-36 border-t border-line">
        <div className="mx-auto max-w-3xl px-6 md:px-10 pt-16 space-y-12">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
            >
              <h2 className="font-display text-lg text-ivory mb-3">{s.title}</h2>
              <div className="space-y-3 text-sm text-mute leading-relaxed">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
