import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About — IQ",
  description:
    "IQ builds AI-powered intelligence systems that help people make smarter decisions across every area of life.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <AboutContent />
      <Footer />
    </>
  );
}
