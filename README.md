# IQ — Intelligence for Everyday Life

Marketing site for IQ, built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Deploy (GitHub → Vercel)

1. Push this folder's contents to a new GitHub repo (drag-and-drop via the GitHub web UI works fine — no CLI needed).
2. Import the repo in Vercel. It will auto-detect Next.js — no config changes needed.
3. Deploy. Every push to `main` will auto-deploy.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/` — root layout, global styles, and the single page route
- `components/` — Nav, Hero, TrustedBy (marquee + metrics), ProductsSection (IQHabits/IQDrive/IQCommute/IQReceipts), Flagship (IQLife), FinanceTeaser (IQFinance), Ecosystem map, Pricing, Footer
- All product "mockups" are built with inline SVG/CSS (no external images), so there are zero broken-asset risks on deploy.
