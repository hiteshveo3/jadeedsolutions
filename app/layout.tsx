import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandSearch } from "@/components/CommandSearch";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { SiteChrome } from "@/components/site/SiteChrome";
import { searchItems } from "@/lib/ai/knowledge";
import { siteConfig } from "@/lib/site";

// Fonts are self-hosted from app/fonts (latin subset, downloaded from Google Fonts)
// so a build never depends on Google Fonts: on 2026-10-19 Vercel's build failed in
// next/font/google while the same build passed locally.
const dmSans = localFont({
  src: "./fonts/dm-sans-latin-var.woff2",
  weight: "100 1000",
  variable: "--font-sans",
  display: "swap",
});

// FINAL heading font (2026-10-04): Urbanist. Body stays DM Sans.
// Headings render at 600 (readability fix, 2026-10-19); 700/800 stay available for the
// few bold display accents.
const urbanist = localFont({
  src: "./fonts/urbanist-latin-var.woff2",
  weight: "600 800",
  variable: "--font-display",
  display: "swap",
});

// Small handwritten accents (≤10% of a page, Round 2).
const caveat = localFont({
  src: "./fonts/caveat-latin-var.woff2",
  weight: "600 700",
  variable: "--font-hand",
  display: "swap",
});

// Sticker font, used rarely (1–2 stickers on the site, Round 2).
const chewy = localFont({
  src: "./fonts/chewy-latin-400.woff2",
  weight: "400",
  variable: "--font-sticker",
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
    areaServed: ["Pakistan", "United Kingdom", "United States", "Canada", "United Arab Emirates"],
    knowsAbout: ["Local SEO", "Google Ads", "Web development", "Mobile app development", "Conversion optimization", "AI automation"],
    sameAs: [...Object.values(siteConfig.social), siteConfig.trustpilotUrl, siteConfig.clutchUrl, siteConfig.goodfirmsUrl],
  };

  return (
    <html lang="en" className={`${dmSans.variable} ${urbanist.variable} ${caveat.variable} ${chewy.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteChrome>
          <Navbar />
          <CommandSearch items={searchItems()} />
        </SiteChrome>
        <main>{children}</main>
        <SiteChrome>
          <Footer />
          {/* Room for the phone action bar (Jadeed AI + free audit). */}
          <div className="h-[84px] md:hidden" aria-hidden="true" />
          <ChatWidget />
        </SiteChrome>
      </body>
    </html>
  );
}
