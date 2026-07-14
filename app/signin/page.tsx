import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SigninFlow from "@/components/SigninFlow";

export const metadata: Metadata = {
  title: "Sign in — IQ",
  description: "Sign in to manage your IQ plan, products, and account.",
};

export default function SigninPage() {
  return (
    <>
      <Nav />
      <SigninFlow />
      <Footer />
    </>
  );
}
