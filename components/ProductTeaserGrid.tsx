import { PRODUCTS } from "@/lib/products";
import ProductTeaserGridClient, { type TeaserProduct } from "./ProductTeaserGridClient";

// Server wrapper: ships only the teaser fields, not the full product catalog.
export default function ProductTeaserGrid() {
  const products: TeaserProduct[] = PRODUCTS.map(({ slug, index, name, category, status, description }) => ({
    slug,
    index,
    name,
    category,
    status,
    description,
  }));
  return <ProductTeaserGridClient products={products} />;
}
