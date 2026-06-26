"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/lib/products";

const LINKS = [
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-void/70 backdrop-blur-xl border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/#top" className="font-display text-xl tracking-tight text-ivory">
          IQ
        </Link>

        <ul className="hidden md:flex items-center gap-9">
          <li
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <Link
              href="/#products"
              className="text-sm text-mute hover:text-ivory transition-colors duration-300 inline-flex items-center gap-1.5"
            >
              Products
              <svg width="9" height="9" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72"
                >
                  <div className="rounded-2xl glass p-2">
                    {PRODUCTS.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 hover:bg-white/5 transition-colors duration-200"
                      >
                        <div>
                          <div className="text-sm text-ivory">{p.name}</div>
                          <div className="text-[11px] text-mute">{p.category}</div>
                        </div>
                        {p.status === "soon" && (
                          <span className="text-[10px] uppercase tracking-[0.08em] text-mute border border-line rounded-full px-2 py-0.5 shrink-0">
                            Soon
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm text-mute hover:text-ivory transition-colors duration-300">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/#pricing"
            className="inline-flex items-center rounded-full bg-ivory text-void text-sm font-medium px-5 py-2.5 hover:bg-signal transition-colors duration-300"
          >
            Get Started
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 w-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal rounded"
        >
          <span className={`h-px w-full bg-ivory transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`h-px w-full bg-ivory transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`h-px w-full bg-ivory transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-void/95 backdrop-blur-xl border-b border-line"
        >
          <ul className="flex flex-col px-6 py-4 gap-1">
            <li>
              <button
                onClick={() => setMobileProductsOpen((v) => !v)}
                className="w-full flex items-center justify-between text-base text-mute hover:text-ivory transition-colors py-2"
              >
                Products
                <svg width="10" height="10" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`}>
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileProductsOpen && (
                <ul className="pl-3 border-l border-line ml-1 mb-2">
                  {PRODUCTS.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-sm text-mute hover:text-ivory transition-colors"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base text-mute hover:text-ivory transition-colors py-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/#pricing"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-full bg-ivory text-void text-sm font-medium px-5 py-2.5"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
