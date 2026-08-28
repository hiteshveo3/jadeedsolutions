import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIntentPage, intentPages } from "@/lib/intent-pages";
import { getNiche, niches } from "@/lib/niches";
import { siteConfig } from "@/lib/site";
import { ContentPlaceholder } from "@/components/ContentPlaceholder";

export function generateStaticParams() {
  const intentSlugs = intentPages.map((p) => ({ slug: p.slug }));
  const nicheSlugs = niches.map((n) => ({ slug: n.slug }));
  const seen = new Set<string>();
  return [...intentSlugs, ...nicheSlugs].filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const niche = getNiche(params.slug);
  if (niche) {
    return {
      title: niche.h1,
      description: niche.seoDescription,
      alternates: { canonical: `${siteConfig.url}/industries/${niche.slug}` },
    };
  }

  const page = getIntentPage(params.slug);
  if (!page) return {};
  return {
    title: page.h1,
    description: page.seoDescription,
    alternates: { canonical: `${siteConfig.url}/industries/${page.slug}` },
  };
}

export default function IndustrySlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const niche = getNiche(params.slug);
  const page = getIntentPage(params.slug);

  if (!niche && !page) notFound();

  const title = niche?.h1 || page?.h1 || "Industry Playbook";

  return (
    <ContentPlaceholder
      badge="Industry Playbook"
      category="Industries"
      title={title}
      subtitle={`Our specialized 2026 growth framework, lead generation systems, and ROI benchmarks for ${title} are currently being prepared.`}
      parentPath="/industries"
      parentLabel="All Industries"
    />
  );
}
