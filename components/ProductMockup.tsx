import PhoneMockup from "./PhoneMockup";
import type { ProductVariant } from "@/lib/products";

const SCREENSHOTS: Record<ProductVariant, { src: string; alt: string }> = {
  habits: { src: "/screenshots/iqhabits.png", alt: "IQHabits app screenshot" },
  drive: { src: "/screenshots/iqdrive.png", alt: "IQDrive app screenshot" },
  commute: { src: "/screenshots/iqcommute.png", alt: "IQCommute app screenshot" },
  receipts: { src: "/screenshots/iqreceipts.png", alt: "IQReceipts app screenshot" },
  life: { src: "/screenshots/iqlife.png", alt: "IQLife app screenshot" },
  finance: { src: "/screenshots/iqfinance.png", alt: "IQFinance app screenshot" },
  valet: { src: "/screenshots/iqvalet.png", alt: "IQValet app screenshot" },
  rx: { src: "/screenshots/iqrx.png", alt: "IQrX app screenshot" },
};

export default function ProductMockup({ variant }: { variant: ProductVariant }) {
  const shot = SCREENSHOTS[variant];
  return <PhoneMockup src={shot.src} alt={shot.alt} />;
}
