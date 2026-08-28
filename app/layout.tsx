import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandSearch } from "@/components/CommandSearch";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { BackToTop } from "@/components/BackToTop";
import { siteConfig } from "@/lib/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [{ url: "/jadeed-favicon.webp", type: "image/webp" }],
    shortcut: "/jadeed-favicon.webp",
  },
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/jadeed-favicon.webp`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    foundingDate: siteConfig.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: "House No. 5, Street No. 1, New Lahore Road, Pejowali Kalan",
      addressLocality: "Narowal",
      postalCode: "51600",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: ["Pakistan", "United Kingdom", "United States", "United Arab Emirates"],
    knowsAbout: ["Local SEO", "Google Ads", "Web development", "Mobile app development", "Conversion optimization", "AI automation"],
    sameAs: [...Object.values(siteConfig.social), siteConfig.trustpilotUrl, siteConfig.clutchUrl, siteConfig.goodfirmsUrl],
  };

  return (
    <html lang="en" className={`${dmSans.variable} ${bricolage.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <CommandSearch />
        <main>{children}</main>
        <Footer />
        <div className="h-16 lg:hidden" aria-hidden="true" />
        <MobileBottomNav />
        <BackToTop />
      </body>
    </html>
  );
}
