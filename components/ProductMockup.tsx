import BrowserMockup from "./BrowserMockup";
import IllustratedPhoneMockup from "./IllustratedPhoneMockup";
import type { ProductVariant } from "@/lib/products";

export default function ProductMockup({
  variant,
  context = "hero",
}: {
  variant: ProductVariant;
  context?: "hero" | "signature";
}) {
  // IQSavings is a browser extension, not an iPhone app — it gets its own
  // browser-window mockup. The hero shows the coupon-testing moment; the
  // signature section shows the price-protection moment, so the imagery
  // tells a different beat of the story each time.
  if (variant === "savings") {
    return <BrowserMockup mode={context === "signature" ? "priceProtection" : "coupon"} />;
  }

  // Every other product gets an illustrated phone screen built from the
  // product's own real stats/copy — no screenshot asset dependency, and it
  // reads as designed marketing art rather than a raw app capture.
  return <IllustratedPhoneMockup variant={variant} />;
}
