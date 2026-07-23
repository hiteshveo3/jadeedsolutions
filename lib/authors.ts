export type Author = {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  longBio: string;
  socials?: { label: string; href: string }[];
};

export const authors: Record<string, Author> = {
  "sameer-ahmad-basra": {
    slug: "sameer-ahmad-basra",
    name: "Sameer Ahmad Basra",
    role: "Founder & CEO, Jadeed Solutions",
    avatar: "/team/sameer-ahmad-basra.jpg",
    bio: "Founder & CEO of Jadeed Solutions. I help local service businesses grow online with SEO, high-converting websites, apps and profitable ad campaigns.",
    longBio:
      "Sameer Ahmad Basra is the founder and CEO of Jadeed Solutions, a growth partner for local service-based businesses. He works hands-on with SEO, web and app development, and paid advertising — turning marketing into measurable revenue. On this blog he shares practical, no-nonsense playbooks drawn from real client work.",
    socials: [
      { label: "Email", href: "mailto:hello@jadeedsolutions.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com" },
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
