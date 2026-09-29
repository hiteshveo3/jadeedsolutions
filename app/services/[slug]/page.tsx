import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsappBusinessIcon } from "@/components/icons";
import { services, getService } from "@/lib/services";
import { getCaseStudiesForService } from "@/lib/case-studies";
import { getPost } from "@/lib/blog";
import { getGuide } from "@/lib/guides";
import { siteConfig } from "@/lib/site";
import { AlphaProof } from "@/components/site/AlphaProof";
import {
  ButtonLink,
  CheckList,
  Eyebrow,
  FactRows,
  FaqSection,
  FeatureGrid,
  JsonLd,
  LinkRows,
  PageHero,
  Section,
  SectionHeader,
  StatRow,
  Steps,
  TextLink,
} from "@/components/site/ui";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const service = getService(params.slug);
  if (!service) return {};
  const url = `${siteConfig.url}/services/${service.slug}`;
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: service.seoTitle, description: service.seoDescription, url },
  };
}

/** Further reading per service: blog posts first, then guides. */
const related: Record<string, { posts: string[]; guides: string[] }> = {
  seo: { posts: ["seo-for-local-service-business-step-by-step", "seo-checklist-2026"], guides: ["how-plumbers-get-more-jobs-online"] },
  "web-development": { posts: ["why-nextjs-for-marketing-sites", "how-to-use-icons-mobile-apps-websites"], guides: ["website-seo-app-or-10-percent"] },
  "app-development": { posts: ["how-to-talk-to-app-clients-restaurant-example", "best-icon-libraries-mobile-apps-websites"], guides: ["website-seo-app-or-10-percent"] },
  "digital-advertising": { posts: ["google-ads-roi-fundamentals", "local-seo-google-ads-service-business"], guides: ["how-cleaning-companies-get-more-bookings"] },
};

export default async function ServiceSlugPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = getService(params.slug);
  if (!service) notFound();

  const reading = [
    ...(related[service.slug]?.posts ?? []).map((slug) => getPost(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p)).map((p) => ({ href: `/blog/${p.slug}`, label: p.title, meta: `Blog · ${p.readingTime}` })),
    ...(related[service.slug]?.guides ?? []).map((slug) => getGuide(slug)).filter((g): g is NonNullable<typeof g> => Boolean(g)).map((g) => ({ href: `/guides/${g.slug}`, label: g.title, meta: "Guide" })),
  ];

  const others = services.filter((s) => s.slug !== service.slug);
  const hasAlphaProof = getCaseStudiesForService(service.slug).some((study) => study.id === "alpha-movers");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    serviceType: service.category,
    url: `${siteConfig.url}/services/${service.slug}`,
    areaServed: ["United Kingdom", "United States"],
    provider: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
        eyebrow={service.category}
        title={service.h1}
        lead={service.description}
        actions={
          <>
            <ButtonLink href="/contact">Get a free plan</ButtonLink>
            <ButtonLink href={siteConfig.whatsappHref} variant="outlineLight" icon={WhatsappBusinessIcon}>WhatsApp us</ButtonLink>
          </>
        }
        aside={<FactRows title="At a glance" rows={service.atAGlance} />}
      />

      <Section tone="cream" labelledBy="overview-heading">
        <SectionHeader id="overview-heading" eyebrow={service.tagline} title={service.overview.heading} />
        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div className="space-y-5 text-lg leading-8 text-black/70">
            {service.overview.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
          </div>
          <StatRow items={service.stats} columns={2} />
        </div>
      </Section>

      <Section tone="white" labelledBy="included-heading">
        <SectionHeader id="included-heading" eyebrow="The package" title="What's included — and who it's for" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[.15em] text-black/45">Included</p>
            <CheckList items={service.included} columns={2} />
          </div>
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[.15em] text-black/45">Ideal for</p>
            <CheckList items={service.idealFor} />
          </div>
        </div>
      </Section>

      <Section tone="green" labelledBy="process-heading">
        <SectionHeader id="process-heading" tone="green" eyebrow="How it works" title="From first call to results" />
        <div className="mt-10 md:mt-14">
          <Steps tone="green" steps={service.steps.map((step) => ({ title: step.title, text: step.description }))} />
        </div>
      </Section>

      <Section tone="cream" labelledBy="details-heading">
        <SectionHeader id="details-heading" eyebrow="The details" title="What we actually do" />
        <div className="mt-10 border-t border-black/10 md:mt-14">
          {service.sections.map((section) => (
            <div key={section.id} id={section.id} className="grid scroll-mt-24 gap-3 border-b border-black/10 py-8 md:py-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
              <h3 className="text-2xl font-semibold tracking-[-.035em]">{section.heading}</h3>
              <div className="space-y-4 leading-7 text-black/65">
                {section.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mint" id="pricing" labelledBy="cost-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow tone="mint">Pricing</Eyebrow>
            <h2 id="cost-heading" className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] sm:text-5xl">What it costs</h2>
            <div className="mt-6 space-y-4 leading-7 text-[#063d30]/80">
              {service.cost.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
            </div>
            <p className="mt-6 border-l-2 border-[#015f45] pl-4 text-sm leading-6 text-[#063d30]/75">{service.cost.note}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <TextLink href="/pricing" tone="mint">Compare pricing models</TextLink>
              <TextLink href="/profit-share-handbook" tone="mint">How performance deals work</TextLink>
            </div>
          </div>
          <div className="space-y-10">
            <FactRows tone="mint" title="Price guide" rows={service.cost.rows} />
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">What affects the price</p>
              <CheckList tone="mint" items={service.priceFactors} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="cream" labelledBy="why-heading">
        <SectionHeader id="why-heading" eyebrow="Why Jadeed" title="Why local businesses choose us" />
        <div className="mt-10 md:mt-14">
          <FeatureGrid numbered items={service.whyChoose.map((item) => ({ title: item.title, text: item.description }))} />
        </div>
      </Section>

      {hasAlphaProof && <AlphaProof />}

      <Section tone="white" labelledBy="takeaways-heading">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>In short</Eyebrow>
            <h2 id="takeaways-heading" className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] sm:text-4xl">Key takeaways</h2>
          </div>
          <CheckList items={service.keyTakeaways} />
        </div>
      </Section>

      <FaqSection items={service.faqs} />

      {reading.length > 0 && (
        <Section tone="white" labelledBy="reading-heading">
          <SectionHeader id="reading-heading" eyebrow="Further reading" title="Go deeper before you decide" />
          <div className="mt-10">
            <LinkRows columns={2} items={reading} />
          </div>
        </Section>
      )}

      <Section tone="mint" labelledBy="more-services-heading">
        <SectionHeader id="more-services-heading" tone="mint" eyebrow="More services" title="Works even better with" />
        <div className="mt-10">
          <FeatureGrid
            tone="mint"
            items={others.map((other) => ({ icon: other.icon, title: other.title, text: other.summary, href: `/services/${other.slug}`, linkLabel: "Explore" }))}
          />
        </div>
      </Section>
    </>
  );
}
