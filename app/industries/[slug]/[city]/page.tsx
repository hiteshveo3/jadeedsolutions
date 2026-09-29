import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon, ArrowRightIcon, WhatsappIcon } from "@/components/icons";
import { LongformHero, Pill } from "@/components/longform/Layout";
import { CaseStudyCard, CheckList, LandingSection, StepsGrid } from "@/components/landing/Blocks";
import { getCaseStudy } from "@/lib/case-studies";
import { getIndustry } from "@/lib/industries";
import { allNicheCityParams, getNicheCity } from "@/lib/niches";
import { siteConfig } from "@/lib/site";

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
  return {
    title: `${data.niche.navLabel} in ${data.city.name} — SEO, websites & ads`,
    description: `Local SEO, conversion-focused websites and Google Ads for ${data.niche.tradePlural} in ${data.city.name}${data.city.region ? `, ${data.city.region}` : ""}.`,
    alternates: { canonical: `${siteConfig.url}/industries/${params.slug}/${params.city}` },
    robots: { index: false, follow: true },
  };
}

export default async function IndustryCityPage(props: { params: Promise<{ slug: string; city: string }> }) {
  const params = await props.params;
  const data = getNicheCity(params.slug, params.city);
  const industry = getIndustry(params.slug);
  if (!data || !industry) notFound();

  const { niche, city } = data;
  const place = city.region && city.country === "USA" ? `${city.name}, ${city.region}` : city.name;
  const study = industry.relatedCaseStudy ? getCaseStudy(industry.relatedCaseStudy) : undefined;
  const whatsappHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(`Hi Jadeed — I run a ${niche.tradeLabel} business in ${city.name} and would like help getting more jobs online.`)}`;

  return (
    <>
      <LongformHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.navLabel, href: `/industries/${industry.slug}` },
          { label: city.name },
        ]}
        eyebrow={<><Pill>{industry.navLabel}</Pill><Pill tone="outline">{place}</Pill></>}
        title={<>More {niche.tradeLabel} work from Google in <span className="text-[#eaf25a]">{city.name}.</span></>}
        subtitle={city.angle}
        actions={
          <>
            <Link href="/contact" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#cbd810] px-5 text-sm font-semibold text-[#111] transition-colors hover:bg-[#b8c50e]">
              Get a free growth plan <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/35 px-5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">
              <HugeiconsIcon icon={WhatsappIcon} size={18} aria-hidden="true" /> WhatsApp us
            </a>
          </>
        }
      />

      <LandingSection id="local" eyebrow={`${industry.navLabel} in ${city.name}`} title={`What customers in ${city.name} search for`} tone="cream">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-8">
            <p className="text-[17px] leading-[1.75] text-black/75">{city.marketNote}</p>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[.14em] text-[#015f45]">Searches we would plan around</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {city.exampleQueries.map((q) => (
                <li key={q} className="rounded-full bg-[#f3f1ec] px-3 py-1.5 text-sm font-medium text-black/70">“{q}”</li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-black/55">We confirm real search demand for your services and areas in the free growth plan, rather than assuming it.</p>
          </div>
          <div className="rounded-[24px] bg-[#dceee8] p-6 text-[#063d30] sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">How we work with {city.name} businesses</p>
            <p className="mt-4 leading-7">
              We are based in Narowal, Pakistan and work remotely with {niche.tradePlural} in {city.name} and elsewhere in the {city.country === "UK" ? "UK" : "US"}, by WhatsApp, phone and video. Every account we set up — website, Google Business Profile, ads — is in your business’s name.
            </p>
            <div className="mt-5"><CheckList items={industry.outcomes} /></div>
          </div>
        </div>
      </LandingSection>

      <LandingSection id="help" eyebrow="How we help" title={`What we do for ${niche.tradePlural}`}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industry.capabilities.map((c) => (
            <div key={c.title} className="rounded-[24px] border border-black/10 p-6">
              <h3 className="text-lg font-bold tracking-[-.02em]">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/65">{c.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-black/60">
          The full approach — pages, searches, first 90 days — is on our <Link href={`/industries/${industry.slug}`} className="font-semibold text-[#015f45] hover:underline">{industry.navLabel.toLowerCase()} page</Link>
          {industry.relatedGuide && <> and in the <Link href={`/guides/${industry.relatedGuide}`} className="font-semibold text-[#015f45] hover:underline">step-by-step guide</Link></>}.
        </p>
      </LandingSection>

      <LandingSection id="process" eyebrow="How it works" title="What working with us looks like" tone="green">
        <StepsGrid steps={industry.process} />
      </LandingSection>

      {study && (
        <LandingSection id="proof" eyebrow="Proof" title="A local service business we grow">
          <CaseStudyCard study={study} />
        </LandingSection>
      )}
    </>
  );
}
