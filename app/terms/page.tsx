import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TermsContent from "@/components/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Use — IQ",
  description: "The Terms of Use governing the IQ family of apps and this website.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <TermsContent />
      <Footer />
    </>
  );
}
