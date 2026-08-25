import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";
import { ContentPlaceholder } from "@/components/ContentPlaceholder";

export function generateStaticParams() {
  return publishedCaseStudies().map((c) => ({ slug: c.id }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return {
    title: `${study.client} Case Study | Jadeed Solutions`,
    description: study.summary,
    alternates: {
      canonical: `${siteConfig.url}/case-studies/${study.id}`,
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <ContentPlaceholder
      badge="Verified Results"
      category="Case Study"
      title={`${study.client} Client Case Study`}
      subtitle={`Our verified client breakdown, before/after traffic metrics, conversion optimizations, and audited revenue outcomes for ${study.client} are currently being updated for 2026.`}
      parentPath="/portfolio"
      parentLabel="All Case Studies"
    />
  );
}
