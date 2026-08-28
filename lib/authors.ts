export type Author = {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  longBio: string;
  /** Short facts for About / profile layout */
  highlights?: string[];
  location?: string;
  socials?: { label: string; href: string }[];
};

export const authors: Record<string, Author> = {
  "sameer-ahmad-basra": {
    slug: "sameer-ahmad-basra",
    name: "Sameer Ahmad Basra",
    role: "Founder & CEO, Jadeed Solutions",
    avatar: "/team/sameer-ahmad-basra.jpg",
    location: "Narowal, Punjab, Pakistan",
    bio: "Founder and CEO of Jadeed Solutions, working hands-on across technical SEO, local search strategy, conversion websites and performance-aligned growth for service businesses.",
    longBio:
      "Sameer Ahmad Basra founded Jadeed Solutions in 2024 and leads strategy and delivery from Narowal, Punjab. His work connects technical SEO, search-intent architecture, conversion-focused websites, paid acquisition and measurement for local service businesses. He remains directly involved in research, information architecture, implementation and performance review. The Alpha Movers engagement is a documented example: Google Search Console recorded 630 organic clicks and 160,903 impressions from 24 February to 23 August 2026, while the final 28 days generated 272 clicks and 96,301 impressions.",
    highlights: [
      "Founder of Jadeed Solutions (established 2024)",
      "Hands-on technical SEO, local search, websites and acquisition strategy",
      "Performance option: 10% of bookings generated",
      "Works with service businesses in the UK, US, UAE and Pakistan",
      "Author of evidence-led SEO research and client case studies",
    ],
    socials: [
      { label: "Email", href: "mailto:info@jadeedsolutions.com" },
      { label: "WhatsApp", href: "https://wa.me/923167669343" },
      {
        label: "LinkedIn",
        href: "https://pk.linkedin.com/in/sameer-ahmad-basra",
      },
    ],
  },
};

export const defaultAuthorSlug = "sameer-ahmad-basra";

export function getAuthor(slug?: string): Author {
  return authors[slug ?? defaultAuthorSlug] ?? authors[defaultAuthorSlug];
}

export function allAuthors(): Author[] {
  return Object.values(authors);
}
