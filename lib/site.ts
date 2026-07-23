export const siteConfig = {
  name: "Jadeed Solutions",
  shortName: "Jadeed",
  tagline: "Digital growth for local service businesses",
  description:
    "Jadeed Solutions helps local service businesses in the UK, USA and worldwide grow with SEO, websites, apps and paid ads — based in Lahore, Pakistan.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "info@jadeedsolutions.com",
  phone: "+92 316 7669343",
  phoneHref: "+923167669343",
  address: "Lahore, Pakistan",
  addressLine: "Lahore, Pakistan · Serving UK, USA & worldwide",
  googleBusinessUrl: "https://share.google/sM4TWgJGFe1bkMcjA",
  /** Embed for contact page map */
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=Lahore%2C%20Pakistan&z=11&output=embed",
  trustpilotUrl: "https://www.trustpilot.com/review/jadeedsolutions.com",
  social: {
    facebook: "https://web.facebook.com/jadeedsolution",
    instagram: "https://www.instagram.com/jadeedsolution/",
    linkedin: "https://pk.linkedin.com/company/jadeed-solutions",
    youtube: "https://www.youtube.com/@JadeedSolution",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/** Honest homepage / about stats — no inflated client counts */
export const stats = [
  { value: 5, suffix: ".0", label: "Google rating (35 reviews)" },
  { value: 4, suffix: ".0", label: "Trustpilot score" },
  { value: 10, suffix: "%", label: "Of bookings we generate" },
  { value: 100, suffix: "%", label: "Local service focus" },
] as const;
