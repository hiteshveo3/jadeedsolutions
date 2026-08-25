import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing: Flexible Growth Models for Local Service Businesses",
  description:
    "Explore performance, tiered and flat commercial models built around your service economics, margins, job value and customer journey.",
  alternates: {
    canonical: "https://www.jadeedsolutions.com/pricing",
  },
  openGraph: {
    title: "Pricing: Flexible Growth Models for Local Service Businesses | Jadeed Solutions",
    description:
      "Explore performance, tiered and flat commercial models built around your service economics, margins, job value and customer journey.",
    url: "https://www.jadeedsolutions.com/pricing",
    siteName: "Jadeed Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing: Flexible Growth Models for Local Service Businesses | Jadeed Solutions",
    description:
      "Explore performance, tiered and flat commercial models built around your service economics, margins, job value and customer journey.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
