export const siteConfig = {
  name: "Jadeed Solutions",
  shortName: "Jadeed",
  tagline: "More booked jobs for local service businesses",
  description:
    "Jadeed Solutions helps UK and US local service businesses grow through connected SEO, paid acquisition, websites, apps and revenue attribution, with performance, tiered and flat commercial structures.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.jadeedsolutions.com",
  email: "info@jadeedsolutions.com",
  phone: "+92 316 7669343",
  phoneHref: "+923167669343",
  /** WhatsApp chat link (same number, no +) */
  whatsappHref: "https://wa.me/923167669343",
  address: "House No. 5, Street No. 1, New Lahore Road, Pejowali Kalan, Narowal 51600, Pakistan",
  addressLine: "Pejowali Kalan, Narowal 51600, Pakistan · Serving clients worldwide",
  googleBusinessUrl: "https://g.page/r/CR8o8gDknX_AEBM/review",
  /** Embed for contact page map */
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.8138231574435!2d74.81080087425822!3d32.047230420925814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39195300c6b42b1b%3A0xc07f9de400f2281f!2sJadeed%20Solutions!5e0!3m2!1sen!2s!4v1787677187097!5m2!1sen!2s",
  trustpilotUrl: "https://www.trustpilot.com/review/jadeedsolutions.com",
  clutchUrl: "https://clutch.co/profile/jadeed-solutions",
  goodfirmsUrl: "https://www.goodfirms.co/company/jadeed-solutions",
  facebookReviewsUrl: "https://web.facebook.com/jadeedsolution/reviews",
  founded: "2024",
  geo: { latitude: 32.047230420925814, longitude: 74.81080087425822 },
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
