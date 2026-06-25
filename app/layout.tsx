import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IQ — Intelligence for Everyday Life",
  description:
    "IQ builds AI-powered intelligence systems that help people make smarter decisions across every area of life. Health, driving, spending, commuting, and life — one connected ecosystem.",
  metadataBase: new URL("https://iq.com"),
  openGraph: {
    title: "IQ — Intelligence for Everyday Life",
    description:
      "A family of AI-powered products designed to help you drive smarter, spend smarter, live healthier, and make better decisions every day.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IQ — Intelligence for Everyday Life",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable} ${mono.variable}`}>
      <body className="font-body antialiased bg-void text-ivory selection:bg-signal/20">
        {children}
      </body>
    </html>
  );
}
