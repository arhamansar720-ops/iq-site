"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "Products", href: "#products" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Download", href: "#download" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        <a href="#top" className="font-display text-xl tracking-tight text-ivory">
          IQ
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-mute hover:text-ivory transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#pricing"
            className="inline-flex items-center rounded-full bg-ivory text-void text-sm font-medium px-5 py-2.5 hover:bg-signal transition-colors duration-300"
          >
            Get Started
          </a>
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
          <ul className="flex flex-col px-6 py-4 gap-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base text-mute hover:text-ivory transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-full bg-ivory text-void text-sm font-medium px-5 py-2.5"
              >
                Get Started
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
