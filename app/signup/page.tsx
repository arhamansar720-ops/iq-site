import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SignupFlow from "@/components/SignupFlow";

export const metadata: Metadata = {
  title: "Create your account — IQ",
  description: "Choose your plan, pick your products, and create your IQ account.",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  return (
    <>
      <Nav />
      <SignupFlow initialPlanId={plan} />
      <Footer />
    </>
  );
}
