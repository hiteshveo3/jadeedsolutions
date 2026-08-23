export const siteConfig = {
  name: "Jadeed Solutions",
  shortName: "Jadeed",
  tagline: "More booked jobs for local service businesses",
  description:
    "Jadeed Solutions helps UK & USA local service businesses win more bookings with SEO, websites, apps and Google Ads. Pay fixed fees or 10% of the bookings we generate.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "info@jadeedsolutions.com",
  phone: "+92 316 7669343",
  phoneHref: "+923167669343",
  /** WhatsApp chat link (same number, no +) */
  whatsappHref: "https://wa.me/923167669343",
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
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/** Honest homepage / about stats — no inflated client counts */
export const stats = [
  { value: 5, suffix: ".0", label: "Google rating (35 reviews)" },
  { value: 10, suffix: "", label: "Active clients (approx.)" },
  { value: 10, suffix: "%", label: "Of bookings we generate" },
  { value: 6, suffix: " mo", label: "Minimum on SEO plans" },
] as const;
