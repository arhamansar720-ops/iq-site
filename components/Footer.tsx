"use client";

const LINKS = [
  { label: "Products", href: "#products" },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer id="download" className="relative border-t border-line py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div>
          <div className="font-display text-2xl text-ivory mb-3">IQ</div>
          <p className="text-mute text-sm max-w-xs">Intelligence for Everyday Life.</p>
        </div>

        <ul className="flex flex-wrap gap-6 md:gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-mute hover:text-ivory transition-colors duration-300">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10 mt-12 pt-8 border-t border-line flex flex-col md:flex-row gap-3 justify-between text-xs text-mute">
        <span>&copy; {new Date().getFullYear()} IQ. All rights reserved.</span>
        <span>Built with intelligence, for intelligence.</span>
      </div>
    </footer>
  );
}
