"use client";

import { motion } from "framer-motion";

const SECTIONS = [
  {
    title: "1. Agreement to these terms",
    body: [
      "These Terms of Use (“Terms”) govern your access to and use of the IQ family of apps — including IQHabits, IQDrive, IQCommute, IQReceipts, IQLife, IQFinance, IQValet, IQrX, and IQSavings (each an “App,” collectively the “Apps”) — and this website (together, the “Service”), operated by IQ (“IQ,” “we,” “us”).",
      "By creating an account, downloading an App, or otherwise using the Service, you agree to be bound by these Terms. If you don't agree, don't use the Service.",
    ],
  },
  {
    title: "2. Eligibility and accounts",
    body: [
      "You must be at least 13 years old to use the Service. If you're under 18, you need permission from a parent or guardian.",
      "You're responsible for the accuracy of the information you provide and for all activity that happens under your account. Tell us right away if you suspect unauthorized access.",
    ],
  },
  {
    title: "3. Subscriptions, trials, and billing",
    body: [
      "Some features require a paid plan (IQ+ or IQ One). Subscriptions renew automatically at the end of each billing period unless canceled beforehand, and pricing is shown before you subscribe.",
      "If you subscribe through the Apple App Store, your purchase, renewal, and cancellation are managed entirely through your Apple ID account settings — not through IQ directly.",
    ],
  },
  {
    title: "4. Billing and refunds",
    small: true,
    body: [
      "Subscriptions purchased through the Apple App Store are billed and processed entirely by Apple. Apple's own refund policies and procedures apply to those purchases — requests must be submitted directly to Apple at reportaproblem.apple.com. IQ has no ability to authorize, process, or override a refund on an App Store purchase.",
      "For any purchase made directly through IQ (outside the App Store), all fees are non-refundable. We do not provide refunds or credits for partial subscription periods, unused features, downgrades, or early termination, except where required by applicable law.",
    ],
  },
  {
    title: "5. Acceptable use",
    body: [
      "Use the Service lawfully and don't try to reverse-engineer, disrupt, or gain unauthorized access to it, misrepresent your identity, or use it to harm others.",
    ],
  },
  {
    title: "6. Your data",
    body: [
      "You own the data you put into the Apps. We process it to run the Service and improve your experience with it, as described in our Privacy Policy. We don't sell your personal data.",
    ],
  },
  {
    title: "7. Intellectual property",
    body: [
      "The Service, including its design, code, and content, belongs to IQ. These Terms don't grant you any rights to our trademarks, logos, or branding beyond what's needed to use the Service normally.",
    ],
  },
  {
    title: "8. Third-party services",
    body: [
      "Parts of the Service rely on third parties — Apple's App Store and HealthKit, Apple Maps, and financial data providers such as Plaid. Your use of those integrations is also subject to their own terms.",
    ],
  },
  {
    title: "9. Disclaimers and limitation of liability",
    body: [
      "The Service is provided “as is.” IQ isn't a medical, financial, or legal advisor, and nothing in the Apps should be treated as professional advice. To the maximum extent permitted by law, IQ isn't liable for indirect, incidental, or consequential damages arising from your use of the Service.",
    ],
  },
  {
    title: "10. Termination",
    body: [
      "You can stop using the Service and delete your account at any time from within the relevant App's settings. We may suspend or terminate access for violations of these Terms.",
    ],
  },
  {
    title: "11. Changes to these terms",
    body: [
      "We may update these Terms from time to time. If we make material changes, we'll let you know before they take effect. Continuing to use the Service after that means you accept the updated Terms.",
    ],
  },
  {
    title: "12. Contact",
    body: ["Questions about these Terms? Reach us through the contact link in the footer of this site."],
  },
];

export default function TermsContent() {
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
            Terms of Use
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
              <div className={`space-y-3 ${s.small ? "text-xs" : "text-sm"} text-mute leading-relaxed`}>
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
