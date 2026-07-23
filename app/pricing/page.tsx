import type { Metadata } from "next";
import { PricingContent } from "@/components/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing — pay 10% of the bookings we generate",
  description:
    "Simple, global pricing. Our flagship Growth Partnership costs just 10% of the bookings we generate — no setup fees or minimums. SEO from £100/mo and business websites from £100 also available.",
};

export default function PricingPage() {
  return <PricingContent />;
}
