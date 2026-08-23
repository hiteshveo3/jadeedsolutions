import type { Metadata } from "next";
import { PricingContent } from "@/components/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing — 10% of Bookings or Fixed SEO & Website Fees",
  description:
    "Growth Partnership: pay 10% of the bookings we generate — no setup fees or retainers. Or choose fixed SEO from £100/mo and business websites from £199.",
};

export default function PricingPage() {
  return <PricingContent />;
}
