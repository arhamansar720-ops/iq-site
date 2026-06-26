"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProductMockup from "./ProductMockup";
import FeatureAccordion from "./FeatureAccordion";
import ProblemSection from "./ProblemSection";
import HowItWorks from "./HowItWorks";
import SignatureMoment from "./SignatureMoment";
import UnderTheHood from "./UnderTheHood";
import IntegrationBlock from "./IntegrationBlock";
import SpecsTable from "./SpecsTable";
import FAQSection from "./FAQSection";
import type { Product } from "@/lib/products";

export default function ProductPageContent({
  product,
  prev,
  next,
}: {
  product: Product;
  prev: Product;
  next: Product;
}) {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-radial-glow pt-24">
        <div className="absolute inset-0 noise opacity-30 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link href="/#products" className="inline-flex items-center gap-2 text-xs text-mute hover:text-ivory transition-colors mb-8">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1M1 7L6 2M1 7L6 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All products
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 mb-7 text-xs text-mute">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
              {product.category}
              {product.status === "soon" && <span className="text-mute">— Launching Soon</span>}
            </div>

            <h1 className="font-display text-balance text-4xl md:text-6xl lg:text-7xl tracking-tight text-ivory mb-6">
              {product.name}
            </h1>
            <p className="text-mute text-base md:text-lg max-w-md mb-10">{product.longDescription}</p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full bg-ivory text-void text-sm font-medium px-7 py-3.5 hover:bg-signal transition-colors duration-300"
              >
                {product.status === "soon" ? "Join the waitlist" : `Explore ${product.name}`}
              </a>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center rounded-full border border-line text-ivory text-sm font-medium px-7 py-3.5 hover:border-signal/50 hover:bg-white/5 transition-colors duration-300"
              >
                View pricing
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <ProductMockup variant={product.variant} />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none" />
      </section>

      {/* THE PROBLEM */}
      <ProblemSection headline={product.problem.headline} body={product.problem.body} />

      {/* STATS */}
      <section className="relative py-16 border-t border-line">
        <div className="mx-auto max-w-5xl px-6 md:px-10 grid grid-cols-3 gap-4">
          {product.stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl px-4 py-7 text-center"
            >
              <div className="font-display text-2xl md:text-3xl text-ivory">{s.value}</div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.08em] text-mute">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <div id="how-it-works">
        <HowItWorks title={product.howItWorks.title} steps={product.howItWorks.steps} />
      </div>

      {/* SIGNATURE MOMENT */}
      <SignatureMoment
        eyebrow={product.signature.eyebrow}
        title={product.signature.title}
        body={product.signature.body}
        stat={product.signature.stat}
        variant={product.variant}
      />

      {/* FEATURES */}
      <section id="features" className="relative py-24 md:py-32 border-t border-line">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl md:text-4xl tracking-tight text-ivory text-center mb-14"
          >
            What's inside {product.name}
          </motion.h2>

          <FeatureAccordion features={product.features} details={product.featureDetails} />
        </div>
      </section>

      {/* UNDER THE HOOD */}
      <UnderTheHood title={product.underTheHood.title} bullets={product.underTheHood.bullets} />

      {/* INTEGRATION */}
      <IntegrationBlock
        title={product.integration.title}
        body={product.integration.body}
        links={product.integration.links}
      />

      {/* SPECS */}
      <SpecsTable specs={product.specs} />

      {/* FAQ */}
      <FAQSection faq={product.faq} />

      {/* NEXT / PREV NAV */}
      <section className="relative border-t border-line">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2">
          <Link
            href={`/products/${prev.slug}`}
            className="group flex items-center gap-4 py-10 sm:pr-8 sm:border-r border-line"
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1">
              <path d="M13 7H1M1 7L6 2M1 7L6 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div className="text-[11px] uppercase tracking-[0.08em] text-mute mb-1">Previous</div>
              <div className="font-display text-lg text-ivory group-hover:text-signal transition-colors">{prev.name}</div>
            </div>
          </Link>
          <Link
            href={`/products/${next.slug}`}
            className="group flex items-center justify-between gap-4 py-10 sm:pl-8 sm:text-right"
          >
            <div className="sm:order-1">
              <div className="text-[11px] uppercase tracking-[0.08em] text-mute mb-1">Next</div>
              <div className="font-display text-lg text-ivory group-hover:text-signal transition-colors">{next.name}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:order-2">
              <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
