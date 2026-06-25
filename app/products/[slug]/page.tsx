import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductPageContent from "@/components/ProductPageContent";
import { PRODUCTS, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — IQ`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const i = PRODUCTS.findIndex((p) => p.slug === product.slug);
  const prev = PRODUCTS[(i - 1 + PRODUCTS.length) % PRODUCTS.length];
  const next = PRODUCTS[(i + 1) % PRODUCTS.length];

  return (
    <>
      <Nav />
      <ProductPageContent product={product} prev={prev} next={next} />
      <Footer />
    </>
  );
}
