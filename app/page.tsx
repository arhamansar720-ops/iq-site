import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import ProductsSection from "@/components/ProductsSection";
import Ecosystem from "@/components/Ecosystem";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustedBy />
      <ProductsSection />
      <Ecosystem />
      <Pricing />
      <Footer />
    </main>
  );
}
