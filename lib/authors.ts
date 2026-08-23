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
    location: "Lahore, Pakistan",
    bio: "Founder & CEO of Jadeed Solutions. I help UK & USA local service businesses grow with SEO, high-converting websites, apps — and a 10% after-bookings model when it fits.",
    longBio:
      "Sameer founded Jadeed Solutions in Lahore and works hands-on with UK and USA local service businesses — SEO, websites, apps and ads when needed. The team stays small (around 10 active clients) so delivery stays senior. Flagship work includes Alpha Movers in London on a 10% after-booking model.",
    highlights: [
      "Founder of Jadeed Solutions (Lahore → UK & USA clients)",
      "Hands-on SEO, websites, apps and optional ads",
      "Performance option: 10% of bookings generated",
      "~10 active clients — small team, senior delivery",
      "5.0 on Google · 35 reviews",
    ],
    socials: [
      { label: "Email", href: "mailto:info@jadeedsolutions.com" },
      { label: "WhatsApp", href: "https://wa.me/923167669343" },
      {
        label: "LinkedIn",
        href: "https://pk.linkedin.com/company/jadeed-solutions",
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
