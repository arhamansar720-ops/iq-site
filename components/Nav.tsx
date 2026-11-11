import { PRODUCTS } from "@/lib/products";
import NavClient from "./NavClient";

// Server wrapper: only the four fields the menu needs reach the client bundle,
// instead of the whole product catalog.
export type NavProduct = { slug: string; name: string; category: string; status: "live" | "soon" };

export default function Nav() {
  const products: NavProduct[] = PRODUCTS.map(({ slug, name, category, status }) => ({ slug, name, category, status }));
  return <NavClient products={products} />;
}
