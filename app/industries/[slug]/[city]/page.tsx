import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon, CheckIcon, ArrowRightIcon } from "@/components/icons";
import { HeroBackground } from "@/components/HeroBackground";
import { CTASection } from "@/components/CTASection";
import { AccordionItem } from "@/components/Accordion";
import { LinkButton } from "@/components/Button";
import { EeatByline } from "@/components/EeatByline";
import { NicheSidebar } from "@/components/NicheSidebar";
import {
  allNicheCityParams,
  getNicheCity,
  nicheCities,
} from "@/lib/niches";
import { getAuthor } from "@/lib/authors";
import { caseStudies } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";

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
  const { niche, city } = data;
  const title = `${niche.tradePlural[0].toUpperCase()}${niche.tradePlural.slice(1)} in ${city.name} — SEO, Websites & Growth`;
  const description = `Help your ${niche.tradeLabel} business in ${city.name} win more bookings with SEO, a converting website and optional apps. Led by ${getAuthor(niche.authorSlug).name}. From £100/mo SEO or 10% of bookings.`;
  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/industries/${niche.slug}/${city.slug}`,
    },
    authors: [{ name: getAuthor(niche.authorSlug).name }],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      type: "article",
    },
  };
}

export default function NicheCityPage({
  params,
}: {
  params: { slug: string; city: string };
}) {
  const data = getNicheCity(params.slug, params.city);
  if (!data) notFound();
  const { niche, city } = data;
  const author = getAuthor(niche.authorSlug);
  const study = niche.relatedCaseStudy
    ? caseStudies.find((c) => c.id === niche.relatedCaseStudy)
    : undefined;

  const h1 = `Get more ${niche.tradeLabel} jobs in ${city.name}`;
  const siblings = nicheCities(niche).filter((c) => c.slug !== city.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1,
    description: city.angle,
    dateModified: niche.reviewedAt,
    author: {
      "@type": "Person",
      name: author.name,
      url: `${siteConfig.url}/author/${author.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "City",
      name: city.name,
    },
    mainEntityOfPage: `${siteConfig.url}/industries/${niche.slug}/${city.slug}`,
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: h1,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    url: `${siteConfig.url}/industries/${niche.slug}/${city.slug}`,
  };

  const faqs = [
    {
      question: `Can you help my ${niche.tradeLabel} business in ${city.name}?`,
      answer: `Yes. ${city.marketNote}`,
    },
    {
      question: "Do you guarantee I’ll be #1 on Google?",
      answer:
        "No honest company should. We give you a clear plan, realistic timelines, and reporting on calls and visibility.",
    },
    ...niche.faqs.slice(0, 2),
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const cityToc = [
    { id: "searches", label: "What locals search" },
    { id: "how", label: "How we help" },
    { id: "trust", label: "Proof" },
    { id: "faqs", label: "FAQs" },
    { id: "other-cities", label: "Other cities" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="relative isolate overflow-hidden bg-white pb-12 pt-16 sm:pb-14 sm:pt-20">
        <HeroBackground />
        <div className="container relative z-10">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brand-500">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href={`/industries/${niche.slug}`}
                  className="hover:text-brand-500"
                >
                  {niche.navLabel}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink">{city.name}</li>
            </ol>
          </nav>

          <div className="mt-6 max-w-3xl">
            <span className="eyebrow">
              {city.name} · {city.country}
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              {h1}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {city.angle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact" size="lg">
                Free plan for {city.name}
                <HugeiconsIcon icon={ArrowRightIcon} size={18} />
              </LinkButton>
              <LinkButton
                href={`/industries/${niche.slug}`}
                size="lg"
                variant="secondary"
              >
                See all cities
              </LinkButton>
            </div>

            <EeatByline niche={niche} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-16 pt-4 sm:pb-20">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <article className="min-w-0 space-y-12">
            <div id="searches" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                What people in {city.name} type into Google
              </h2>
              <p className="mt-4 text-slate-600">{city.marketNote}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {city.exampleQueries.map((q) => (
                  <li
                    key={q}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-ink"
                  >
                    “{q}”
                  </li>
                ))}
              </ul>
            </div>

            <div id="how" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                How we help you get more jobs in {city.name}
              </h2>
              <div className="mt-8 space-y-8">
                {niche.methodology.map((block) => (
                  <div key={block.title}>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {block.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-slate-600">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div id="trust" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Proof you can check
              </h2>
              <ul className="mt-6 space-y-3">
                {niche.trustSignals.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                      <HugeiconsIcon
                        icon={CheckIcon}
                        size={14}
                        className="h-3.5 w-3.5"
                        strokeWidth={3}
                      />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {study && (
                <p className="mt-6 text-sm text-slate-600">
                  See how we grew{" "}
                  <Link
                    href={`/case-studies/${study.id}`}
                    className="font-semibold text-brand-500 hover:underline"
                  >
                    {study.client}
                  </Link>{" "}
                  with real Google numbers.
                </p>
              )}
            </div>

            <div id="faqs" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Common questions
              </h2>
              <div className="mt-8 space-y-2">
                {faqs.map((f) => (
                  <AccordionItem
                    key={f.question}
                    title={f.question}
                    variant="card-white"
                  >
                    <p className="text-slate-600">{f.answer}</p>
                  </AccordionItem>
                ))}
              </div>
            </div>

            {siblings.length > 0 && (
              <div id="other-cities" className="scroll-mt-28">
                <h2 className="font-display text-xl font-semibold text-ink">
                  Other cities
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {siblings.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/industries/${niche.slug}/${c.slug}`}
                        className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>

          <NicheSidebar
            niche={niche}
            toc={cityToc}
            activeCitySlug={city.slug}
            caseStudyHref={
              study ? `/case-studies/${study.id}` : undefined
            }
            caseStudyLabel={
              study ? `${study.client} case study` : undefined
            }
          />
        </div>
      </section>

      <CTASection
        title={`Want more jobs in ${city.name}?`}
        description={`Tell us where you cover in ${city.name} — we’ll send a free plan.`}
      />
    </>
  );
}
