import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allNicheCityParams, getNicheCity } from "@/lib/niches";
import { siteConfig } from "@/lib/site";
import { ContentPlaceholder } from "@/components/ContentPlaceholder";

export function generateStaticParams() {
  return allNicheCityParams();
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; city: string };
}): Metadata {
  const data = getNicheCity(params.slug, params.city);
  if (!data) return {};
  return {
    title: `${data.niche.navLabel} SEO in ${data.city.name} | Jadeed Solutions`,
    description: `Local SEO and growth services for ${data.niche.tradePlural} in ${data.city.name}.`,
    alternates: {
      canonical: `${siteConfig.url}/industries/${params.slug}/${params.city}`,
    },
  };
}

export default function IndustryCityPage({
  params,
}: {
  params: { slug: string; city: string };
}) {
  const data = getNicheCity(params.slug, params.city);
  if (!data) notFound();

  return (
    <ContentPlaceholder
      badge="Local Market Coverage"
      category={`Local Strategy • ${data.city.name}`}
      title={`${data.niche.navLabel} in ${data.city.name}`}
      subtitle={`Our verified local market analysis, search volume benchmarks, and precision marketing campaigns for ${data.city.name} are currently being finalized for 2026.`}
      parentPath={`/industries/${params.slug}`}
      parentLabel={`Back to ${data.niche.navLabel}`}
    />
  );
}
