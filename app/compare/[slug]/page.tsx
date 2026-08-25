import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { comparisons, getComparison } from "@/lib/comparisons";
import { siteConfig } from "@/lib/site";
import { ContentPlaceholder } from "@/components/ContentPlaceholder";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getComparison(params.slug);
  if (!page) return {};
  return {
    title: `${page.h1} | Jadeed Solutions`,
    description: page.seoDescription,
    alternates: { canonical: `${siteConfig.url}/compare/${page.slug}` },
  };
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const page = getComparison(params.slug);
  if (!page) notFound();

  return (
    <ContentPlaceholder
      badge="Strategic Comparison"
      category="Comparisons"
      title={page.h1}
      subtitle={`Our objective 2026 cost-benefit analysis, execution models, and feature comparison breakdown for ${page.navLabel} are currently being finalized.`}
      parentPath="/compare"
      parentLabel="All Comparisons"
    />
  );
}
