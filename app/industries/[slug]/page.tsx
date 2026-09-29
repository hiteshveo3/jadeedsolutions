import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon, ArrowRightIcon, WhatsappIcon } from "@/components/icons";
import { LongformHero, Pill } from "@/components/longform/Layout";
import { LongformMarkdown } from "@/components/longform/Markdown";
import { CaseStudyCard, CheckList, FaqList, LandingSection, LinkCards, ReviewGrid, StepsGrid } from "@/components/landing/Blocks";
import { getCaseStudy } from "@/lib/case-studies";
import { citiesByCountry } from "@/lib/cities";
import { getGuide } from "@/lib/guides";
import { getIndustry, industries } from "@/lib/industries";
import { getReviewsForService, googleAggregate } from "@/lib/reviews";
import { getService } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = getIndustry(params.slug);
  if (!industry) return {};
  const url = `${siteConfig.url}/industries/${industry.slug}`;
  return {
    title: industry.seoTitle,
    description: industry.seoDescription,
    alternates: { canonical: url },
    openGraph: { type: "website", title: industry.h1, description: industry.seoDescription, url },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();

  const url = `${siteConfig.url}/industries/${industry.slug}`;
  const study = industry.relatedCaseStudy ? getCaseStudy(industry.relatedCaseStudy) : undefined;
  const reviews = getReviewsForService(industry.relatedService, 4);
  const service = getService(industry.relatedService);
  const guide = industry.relatedGuide ? getGuide(industry.relatedGuide) : undefined;
  const others = industries.filter((i) => i.slug !== industry.slug);
  const whatsappHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(`Hi Jadeed — I found your page for ${industry.audience} and would like help getting more jobs online.`)}`;

  const reading = [
    ...(guide ? [{ href: `/guides/${guide.slug}`, eyebrow: `Guide · ${guide.eyebrow}`, title: guide.title, text: guide.intro }] : []),
    ...(service ? [{ href: `/services/${service.slug}`, eyebrow: "Service", title: service.h1, text: service.summary }] : []),
    { href: "/profit-share-handbook", eyebrow: "Handbook", title: "Profit-share partnerships: what we need before we take a percentage", text: "How performance and tiered deals are set up, and what they need from you." },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: industry.h1,
        description: industry.seoDescription,
        url,
        serviceType: "Local SEO, websites and paid acquisition",
        audience: { "@type": "BusinessAudience", name: industry.navLabel },
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: ["United Kingdom", "United States", "Canada", "United Arab Emirates"],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: industry.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Industries", item: `${siteConfig.url}/industries` },
          { "@type": "ListItem", position: 3, name: industry.navLabel, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: industry.navLabel }]}
        eyebrow={<Pill>{industry.eyebrow}</Pill>}
        title={industry.h1}
        subtitle={industry.intro}
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
        meta={<a href={googleAggregate.url} target="_blank" rel="noreferrer" className="hover:text-white">★ {googleAggregate.score} {googleAggregate.label}</a>}
        aside={
          <div className="rounded-[24px] border border-white/20 bg-[#014f39]/70 p-6">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#eaf25a]">What you can expect</p>
            <div className="mt-4"><CheckList items={industry.outcomes} dark /></div>
          </div>
        }
      />

      <LandingSection id="how-we-help" eyebrow="How we help" title={`Built around how ${industry.audience} win work`} tone="cream">
        <div className={`grid gap-4 sm:grid-cols-2 ${industry.capabilities.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {industry.capabilities.map((c) => (
            <div key={c.title} className="rounded-[24px] border border-black/10 bg-white p-6">
              <h3 className="text-lg font-bold tracking-[-.02em]">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/65">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[24px] bg-[#dceee8] p-6 text-[#063d30] sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">Who this is for</p>
            <div className="mt-4"><CheckList items={industry.whoFor} /></div>
          </div>
          <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">Why owners trust us</p>
            <div className="mt-4"><CheckList items={industry.trustSignals} /></div>
          </div>
        </div>
      </LandingSection>

      {industry.playbook.length > 0 && (
        <section id="playbook" aria-labelledby="playbook-title" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="container max-w-[1200px] lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">The playbook</p>
              <h2 id="playbook-title" className="mt-3 text-balance text-[32px] font-semibold leading-[1.05] tracking-[-.045em]">Our playbook for {industry.audience}</h2>
              <ol className="mt-6 hidden space-y-2 border-l border-black/10 text-[13px] lg:block">
                {industry.playbook.map((s, i) => (
                  <li key={s.title}><a href={`#playbook-${i + 1}`} className="-ml-px block border-l-2 border-transparent py-1 pl-3.5 text-black/60 hover:border-[#015f45] hover:text-[#015f45]">{s.title}</a></li>
                ))}
              </ol>
            </div>
            <div className="mt-10 max-w-[760px] lg:mt-0">
              {industry.playbook.map((section, i) => (
                <article key={section.title} id={`playbook-${i + 1}`} className="scroll-mt-28 border-t border-black/10 pt-10 first:border-t-0 first:pt-0 [&+article]:mt-10">
                  <h3 className="text-balance text-[24px] font-semibold leading-[1.15] tracking-[-.03em] sm:text-[28px]">{section.title}</h3>
                  <div className="mt-5"><LongformMarkdown>{section.body}</LongformMarkdown></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <LandingSection id="process" eyebrow="How it works" title="What working with us looks like" tone="green">
        <StepsGrid steps={industry.process} />
      </LandingSection>

      {(study || reviews.length > 0) && (
        <LandingSection id="proof" eyebrow="Proof" title="Results and reviews you can check">
          {study && <CaseStudyCard study={study} />}
          {reviews.length > 0 && <div className={study ? "mt-4" : ""}><ReviewGrid reviews={reviews} /></div>}
        </LandingSection>
      )}

      <LandingSection id="faqs" eyebrow="FAQs" title="Questions owners ask" tone="cream">
        <FaqList faqs={industry.faqs} />
        <p className="mt-6 text-sm text-black/60">{industry.ctaNote} <Link href="/contact" className="font-semibold text-[#015f45] hover:underline">Contact us</Link> or <a href={whatsappHref} target="_blank" rel="noreferrer" className="font-semibold text-[#015f45] hover:underline">message us on WhatsApp</a>.</p>
      </LandingSection>

      <LandingSection id="reading" eyebrow="Further reading" title="Go deeper before you decide">
        <LinkCards items={reading} />

        {industry.niche && (
          <details className="group mt-8 rounded-2xl border border-black/10 bg-[#f7f5ef]">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
              Areas we work with {industry.niche.tradePlural} in
              <span className="text-lg leading-none text-[#015f45] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <div className="grid gap-6 border-t border-black/10 px-5 py-5 sm:grid-cols-2">
              {(["UK", "USA"] as const).map((country) => (
                <div key={country}>
                  <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#015f45]">{country === "UK" ? "United Kingdom" : "United States"}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
                    {citiesByCountry(country).map((city) => (
                      <li key={city.slug}><Link href={`/industries/${industry.slug}/${city.slug}`} className="text-black/65 hover:text-[#015f45]">{city.name}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        )}

        <div className="mt-8 flex flex-wrap gap-2 text-sm">
          <span className="py-1.5 font-semibold text-black/55">Other industries:</span>
          {others.map((o) => (
            <Link key={o.slug} href={`/industries/${o.slug}`} className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 font-semibold text-black/70 hover:border-[#015f45]/40 hover:text-[#015f45]">{o.navLabel}</Link>
          ))}
        </div>
      </LandingSection>
    </>
  );
}
