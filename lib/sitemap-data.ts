import { allAuthors } from "@/lib/authors";
import { archiveYearParams, posts } from "@/lib/blog";
import { publishedCaseStudies } from "@/lib/case-studies";
import { comparisons } from "@/lib/comparisons";
import { guides } from "@/lib/guides";
import { handbookMeta } from "@/lib/profit-share-handbook";
import { industries } from "@/lib/industries";
import { services } from "@/lib/services";

/** Date the core marketing pages were last substantively revised. Update when they change. */
export const SITE_CONTENT_UPDATED = "2026-09-29";

export type SitemapEntry = { path: string; title: string; updated: string; group: string };

/**
 * Every indexable page, grouped for the HTML sitemap and used by sitemap.xml.
 * Excluded on purpose: city pages (noindex until they have real local proof),
 * monthly blog archives (thin listings), client proposals and API routes.
 */
export function sitemapEntries(): SitemapEntry[] {
  const u = SITE_CONTENT_UPDATED;
  return [
    { path: "", title: "Home", updated: u, group: "Company" },
    { path: "/about", title: "About Jadeed Solutions", updated: u, group: "Company" },
    { path: "/sameer-ahmad-basra", title: "Founder: Sameer Ahmad Basra", updated: u, group: "Company" },
    ...allAuthors().map((a) => ({ path: `/author/${a.slug}`, title: `Author: ${a.name}`, updated: u, group: "Company" })),
    { path: "/how-it-works", title: "How it works", updated: u, group: "Company" },
    { path: "/contact", title: "Contact", updated: u, group: "Company" },

    { path: "/services", title: "All services", updated: u, group: "Services" },
    ...services.map((s) => ({ path: `/services/${s.slug}`, title: s.title, updated: u, group: "Services" })),
    { path: "/pricing", title: "Pricing and commercial models", updated: u, group: "Services" },
    { path: handbookMeta.path, title: handbookMeta.label, updated: handbookMeta.updated, group: "Services" },

    { path: "/industries", title: "All industries", updated: u, group: "Industries" },
    ...industries.map((i) => ({ path: `/industries/${i.slug}`, title: i.navLabel, updated: i.updated && i.updated > u ? i.updated : u, group: "Industries" })),

    { path: "/portfolio", title: "Portfolio", updated: u, group: "Proof" },
    ...publishedCaseStudies().map((c) => ({ path: `/case-studies/${c.id}`, title: `Case study: ${c.client}`, updated: u, group: "Proof" })),
    { path: "/compare", title: "Comparisons", updated: u, group: "Proof" },
    ...comparisons.map((c) => ({ path: `/compare/${c.slug}`, title: c.h1, updated: c.updated, group: "Proof" })),

    { path: "/guides", title: "All guides", updated: u, group: "Guides & tools" },
    ...guides.map((g) => ({ path: `/guides/${g.slug}`, title: g.title, updated: g.updated, group: "Guides & tools" })),
    { path: "/tools", title: "Free tools", updated: u, group: "Guides & tools" },
    { path: "/tools/growth-check", title: "Growth Check", updated: u, group: "Guides & tools" },

    { path: "/blog", title: "Blog", updated: u, group: "Blog" },
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, title: p.title, updated: p.updated ?? p.date, group: "Blog" })),
    { path: "/blog/archive", title: "Blog archive", updated: u, group: "Blog" },
    ...archiveYearParams().map(({ year }) => ({ path: `/blog/archive/${year}`, title: `Articles from ${year}`, updated: u, group: "Blog" })),

    { path: "/privacy", title: "Privacy policy", updated: u, group: "Legal" },
    { path: "/terms", title: "Terms of service", updated: u, group: "Legal" },
  ];
}
