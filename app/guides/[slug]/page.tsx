import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/lib/guides";
import { siteConfig } from "@/lib/site";
import { ContentPlaceholder } from "@/components/ContentPlaceholder";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | Jadeed Solutions`,
    description: guide.seoDescription,
    alternates: { canonical: `${siteConfig.url}/guides/${guide.slug}` },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  return (
    <ContentPlaceholder
      badge="Comprehensive Guide"
      category="Guides & Playbooks"
      title={guide.title}
      subtitle={`Our comprehensive step-by-step 2026 playbook and actionable growth frameworks for ${guide.eyebrow} are currently being finalized.`}
      parentPath="/guides"
      parentLabel="All Guides"
    />
  );
}
