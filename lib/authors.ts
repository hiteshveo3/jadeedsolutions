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
  address?: string;
  socials?: { label: string; href: string }[];
};

export const authors: Record<string, Author> = {
  "sameer-ahmad-basra": {
    slug: "sameer-ahmad-basra",
    name: "Sameer Ahmad Basra",
    role: "Founder & Lead Architect, Jadeed Solutions",
    avatar: "/team/sameer-ahmad-basra.jpg",
    location: "Narowal, Punjab, Pakistan",
    address: "House No. 5, Street No. 1, New Lahore Road, Pejowali Kalan, Narowal, 51600, Pakistan",
    bio: "Founder of Jadeed Solutions, helping local service-based businesses generate more bookings by combining high-performing websites, SEO, software, AI, and custom-built automation — with a model where Jadeed Solutions only charges when the business gets an actual booking.",
    longBio:
      "Sameer Ahmad Basra founded Jadeed Solutions in December 2024 and leads strategy, software architecture, technical SEO, and automation from Narowal, Punjab. Starting originally in WordPress web development, he expanded into modern Next.js/React engineering, search-intent architecture, AI integration, and performance-based growth systems. His core philosophy connects real business demand to measurable bookings rather than abstract marketing metrics.",
    highlights: [
      "Founder of Jadeed Solutions (Founded December 2024)",
      "Hands-on full-stack development, technical SEO, AI systems & custom automation",
      "Performance-aligned model: We only charge when you get an actual booking",
      "Proven international portfolio across UK, UAE, Pakistan and US service businesses",
      "Official Location: Pejowali Kalan, Narowal, Punjab, Pakistan",
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
