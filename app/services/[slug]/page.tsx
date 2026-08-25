import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { ContentPlaceholder } from "@/components/ContentPlaceholder";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | Jadeed Solutions`,
    description: service.seoDescription,
    alternates: { canonical: `${siteConfig.url}/services/${service.slug}` },
  };
}

export default function ServiceSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <ContentPlaceholder
      badge="Service Overview"
      category="Services"
      title={service.title}
      subtitle={`Our comprehensive 2026 service framework, deliverables, and transparent pricing structures for ${service.title} are currently being finalized.`}
      parentPath="/services"
      parentLabel="All Services"
    />
  );
}
