import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing: Flexible Growth Models for Local Service Businesses",
  description:
    "Explore performance, tiered and flat commercial models built around your service economics, margins, job value and customer journey.",
  alternates: {
    canonical: "https://www.jadeedsolutions.com/pricing",
  },
  openGraph: {
    title: "Pricing: Flexible Growth Models for Local Service Businesses",
    description:
      "Explore transparent pricing models for UK & US local service businesses. Fixed monthly growth systems or aligned 10% revenue-share partnerships with zero upfront software lock-in.",
    url: "https://www.jadeedsolutions.com/pricing",
    siteName: "Jadeed Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing: Flexible Growth Models for Local Service Businesses",
    description:
      "Explore transparent pricing models for UK & US local service businesses: Fixed Monthly or 10% Revenue-Share with clear unit economics.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
