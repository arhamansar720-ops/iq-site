import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PrivacyContent from "@/components/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy — IQ",
  description: "The Privacy Policy covering the IQ family of apps and this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <PrivacyContent />
      <Footer />
    </>
  );
}
