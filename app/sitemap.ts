import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";
import { posts, archiveMonthParams, archiveYearParams } from "@/lib/blog";
import { publishedCaseStudies } from "@/lib/case-studies";
import { intentPages } from "@/lib/intent-pages";
import { niches, allNicheCityParams } from "@/lib/niches";
import { comparisons } from "@/lib/comparisons";
import { guides } from "@/lib/guides";
import { allAuthors } from "@/lib/authors";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "",
    "/services",
    "/pricing",
    "/portfolio",
    "/about",
    "/how-it-works",
    "/industries",
    "/tools",
    "/tools/growth-check",
    "/compare",
    "/guides",
    "/blog",
    "/blog/archive",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const intentRoutes = intentPages.map((p) => ({
    url: `${base}/industries/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const nicheRoutes = niches.map((n) => ({
    url: `${base}/industries/${n.slug}`,
    lastModified: new Date(n.reviewedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const nicheCityRoutes = allNicheCityParams().map(({ slug, city }) => ({
    url: `${base}/industries/${slug}/${city}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const caseRoutes = publishedCaseStudies().map((c) => ({
    url: `${base}/case-studies/${c.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const authorRoutes = allAuthors().map((author) => ({
    url: `${base}/author/${author.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogYearRoutes = archiveYearParams().map(({ year }) => ({
    url: `${base}/blog/archive/${year}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.45,
  }));

  const blogMonthRoutes = archiveMonthParams().map(({ year, month }) => ({
    url: `${base}/blog/archive/${year}/${month}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  const compareRoutes = comparisons.map((c) => ({
    url: `${base}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guideRoutes = guides.map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...intentRoutes,
    ...nicheRoutes,
    ...nicheCityRoutes,
    ...caseRoutes,
    ...authorRoutes,
    ...blogRoutes,
    ...blogYearRoutes,
    ...blogMonthRoutes,
    ...compareRoutes,
    ...guideRoutes,
  ];
}
