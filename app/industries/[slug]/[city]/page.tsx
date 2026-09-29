import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HugeiconsIcon, SearchIcon, WhatsappBusinessIcon } from "@/components/icons";
import { allNicheCityParams, getNicheCity, nicheCities } from "@/lib/niches";
import { siteConfig } from "@/lib/site";
import { AlphaProof } from "@/components/site/AlphaProof";
import {
  ButtonLink,
  FactRows,
  FaqSection,
  FeatureGrid,
  LinkRows,
  PageHero,
  Section,
  SectionHeader,
  Steps,
} from "@/components/site/ui";

export function generateStaticParams() {
  return allNicheCityParams();
}

export const dynamicParams = false;

/**
 * City pages share most of their content with the parent industry page, so they are
 * kept out of the index (and the sitemap) until each has genuine local proof —
 * see Google's guidance on doorway pages.
 */
export async function generateMetadata(props: { params: Promise<{ slug: string; city: string }> }): Promise<Metadata> {
  const params = await props.params;
  const data = getNicheCity(params.slug, params.city);
  if (!data) return {};
  const title = `${data.niche.navLabel} SEO & Websites in ${data.city.name}`;
  const description = `SEO, Google Maps visibility and conversion-focused websites for ${data.niche.tradePlural} in ${data.city.name}. From £100/mo or 10% of bookings.`;
  const url = `${siteConfig.url}/industries/${params.slug}/${params.city}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url }, robots: { index: false, follow: true } };
}

export default async function IndustryCityPage(props: { params: Promise<{ slug: string; city: string }> }) {
  const params = await props.params;
  const data = getNicheCity(params.slug, params.city);
  if (!data) notFound();
  const { niche, city } = data;

  const nearby = nicheCities(niche)
    .filter((other) => other.country === city.country && other.slug !== city.slug)
    .slice(0, 12);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: niche.navLabel, href: `/industries/${niche.slug}` },
          { label: city.name },
        ]}
        eyebrow={`${niche.navLabel} · ${city.name}`}
        title={`More ${niche.tradeLabel} jobs from Google in ${city.name}`}
        lead={city.angle}
        actions={
          <>
            <ButtonLink href="/contact">Get a free plan</ButtonLink>
            <ButtonLink href={siteConfig.whatsappHref} variant="outlineLight" icon={WhatsappBusinessIcon}>WhatsApp us</ButtonLink>
          </>
        }
        aside={
          <FactRows
            title={`In ${city.name}`}
            rows={[
              { label: "Market", value: `${city.region ? `${city.region}, ` : ""}${city.country}` },
              { label: "Monthly SEO", value: "From £100 · 6-month min." },
              { label: "Or pay per result", value: "10% of bookings · 12–24 mo" },
              { label: "We work", value: "Remotely, from Narowal" },
            ]}
          />
        }
      />

      <Section tone="cream" labelledBy="searches-heading">
        <SectionHeader id="searches-heading" eyebrow="Local demand" title={`What customers in ${city.name} type into Google`} lead={city.marketNote} />
        <ul className="mt-10 grid border-t border-black/10 md:grid-cols-2 md:gap-x-10">
          {city.exampleQueries.map((query) => (
            <li key={query} className="flex items-center gap-4 border-b border-black/10 py-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e7f1ed] text-[#015f45]">
                <HugeiconsIcon icon={SearchIcon} size={18} />
              </span>
              <span className="text-lg font-semibold tracking-[-.02em]">“{query}”</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="expertise-heading">
        <SectionHeader id="expertise-heading" eyebrow="What we do" title={`How we help ${niche.tradePlural} in ${city.name}`} />
        <div className="mt-10 md:mt-14">
          <FeatureGrid columns={4} numbered items={niche.expertise} />
        </div>
      </Section>

      <Section tone="green" labelledBy="method-heading">
        <SectionHeader id="method-heading" tone="green" eyebrow="Our method" title="From first call to booked jobs" />
        <div className="mt-10 md:mt-14">
          <Steps tone="green" steps={niche.methodology} />
        </div>
      </Section>

      {niche.relatedCaseStudy === "alpha-movers" && <AlphaProof />}

      <FaqSection items={niche.faqs} />

      <Section tone="mint" labelledBy="nearby-heading">
        <SectionHeader id="nearby-heading" tone="mint" eyebrow="Nearby markets" title={`${niche.navLabel} in other ${city.country} cities`} />
        <div className="mt-10">
          <LinkRows
            tone="mint"
            columns={3}
            items={[
              ...nearby.map((other) => ({ href: `/industries/${niche.slug}/${other.slug}`, label: other.name, meta: other.region })),
              { href: `/industries/${niche.slug}`, label: `All ${niche.navLabel.toLowerCase()} pages` },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
