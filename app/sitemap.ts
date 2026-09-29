import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { sitemapEntries } from "@/lib/sitemap-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const priority: Record<string, number> = { Company: 0.8, Services: 0.9, Industries: 0.8, Proof: 0.7, "Guides & tools": 0.7, Blog: 0.6, Legal: 0.3 };

  return sitemapEntries().map((entry) => ({
    url: `${base}${entry.path}`,
    lastModified: new Date(entry.updated),
    changeFrequency: "monthly",
    priority: entry.path === "" ? 1 : priority[entry.group] ?? 0.5,
  }));
}
