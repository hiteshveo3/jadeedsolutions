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
import { getIntentPage, intentPages } from "@/lib/intent-pages";
import { getNiche, nicheCities, niches } from "@/lib/niches";
import { getService } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  const intentSlugs = intentPages.map((p) => ({ slug: p.slug }));
  const nicheSlugs = niches.map((n) => ({ slug: n.slug }));
  const seen = new Set<string>();
  return [...intentSlugs, ...nicheSlugs].filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const niche = getNiche(params.slug);
  if (niche) {
    return {
      title: niche.seoTitle,
      description: niche.seoDescription,
      alternates: { canonical: `${siteConfig.url}/industries/${niche.slug}` },
      authors: [{ name: getAuthor(niche.authorSlug).name }],
      openGraph: {
        title: `${niche.seoTitle} | ${siteConfig.name}`,
        description: niche.seoDescription,
        type: "article",
      },
    };
  }

  const page = getIntentPage(params.slug);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: `${siteConfig.url}/industries/${page.slug}` },
    openGraph: {
      title: `${page.seoTitle} | ${siteConfig.name}`,
      description: page.seoDescription,
    },
  };
}

export default function ForSlugPage({ params }: { params: { slug: string } }) {
  const niche = getNiche(params.slug);
  if (niche) return <NicheHubPage nicheSlug={params.slug} />;

  const page = getIntentPage(params.slug);
  if (!page) notFound();
  return <IntentHubPage slug={params.slug} />;
}

function NicheHubPage({ nicheSlug }: { nicheSlug: string }) {
  const niche = getNiche(nicheSlug);
  if (!niche) notFound();

  const service = getService(niche.relatedService);
  const study = niche.relatedCaseStudy
    ? caseStudies.find((c) => c.id === niche.relatedCaseStudy)
    : undefined;
  const author = getAuthor(niche.authorSlug);
  const cities = nicheCities(niche);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: niche.h1,
    description: niche.seoDescription,
    dateModified: niche.reviewedAt,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      url: `${siteConfig.url}/author/${author.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/industries/${niche.slug}`,
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: niche.h1,
    description: niche.seoDescription,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "35",
        bestRating: "5",
      },
    },
    areaServed: cities.map((c) => ({
      "@type": "City",
      name: c.name,
    })),
    url: `${siteConfig.url}/industries/${niche.slug}`,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: niche.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const hubToc = [
    { id: "experience", label: "Why work with us" },
    { id: "expertise", label: "What we do" },
    { id: "trust", label: "Proof you can check" },
    { id: "methodology", label: "How it works" },
    { id: "cities", label: "Your city" },
    { id: "who", label: "Is this for you?" },
    { id: "faqs", label: "FAQs" },
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
                <Link href="/services/seo" className="hover:text-brand-500">
                  SEO
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink">{niche.navLabel}</li>
            </ol>
          </nav>

          <div className="mt-6 max-w-3xl">
            <span className="eyebrow">{niche.eyebrow}</span>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              {niche.h1}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {niche.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact" size="lg">
                Get a free plan for my firm
                <HugeiconsIcon icon={ArrowRightIcon} size={18} />
              </LinkButton>
              {service && (
                <LinkButton
                  href={`/services/${service.slug}`}
                  size="lg"
                  variant="secondary"
                >
                  View SEO service
                </LinkButton>
              )}
            </div>
            <p className="mt-4 text-sm text-slate-500">{niche.ctaNote}</p>
            <EeatByline niche={niche} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-16 pt-4 sm:pb-20">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <article className="min-w-0 space-y-12">
            <div id="experience" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Why {niche.tradePlural} work with us
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-600">
                {niche.experience.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              {study && (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                    Real results
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                    {study.client} — {study.location}
                  </h3>
                  <p className="mt-3 text-slate-600">{study.summary}</p>
                  <Link
                    href={`/case-studies/${study.id}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:underline"
                  >
                    Read the case study
                    <HugeiconsIcon icon={ArrowRightIcon} size={16} />
                  </Link>
                </div>
              )}
            </div>

            <div id="expertise" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                What we do for your {niche.tradeLabel} business
              </h2>
              <div className="mt-8 space-y-8">
                {niche.expertise.map((block, i) => (
                  <div key={block.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">
                        {block.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-slate-600">
                        {block.text}
                      </p>
                    </div>
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
            </div>

            <div id="methodology" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                How it works
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

            <div id="cities" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Find your city
              </h2>
              <p className="mt-3 text-slate-600">
                Pick your city — we tailor pages to how people search for{" "}
                {niche.tradePlural} there.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {cities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/industries/${niche.slug}/${city.slug}`}
                      className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      <span className="font-display text-lg font-semibold text-ink">
                        {city.name}
                      </span>
                      <span className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                        {city.country}
                      </span>
                      <span className="mt-3 text-sm text-slate-600 line-clamp-3">
                        {city.angle}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
                        View page
                        <HugeiconsIcon icon={ArrowRightIcon} size={14} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="who"
              className="scroll-mt-28 grid gap-10 sm:grid-cols-2"
            >
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  Is this for you?
                </h2>
                <ul className="mt-6 space-y-3">
                  {niche.whoFor.map((item) => (
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
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  What you walk away with
                </h2>
                <ul className="mt-6 space-y-3">
                  {niche.outcomes.map((item) => (
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
              </div>
            </div>

            <div id="faqs" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                FAQs
              </h2>
              <div className="mt-8 space-y-2">
                {niche.faqs.map((f) => (
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
          </article>

          <NicheSidebar
            niche={niche}
            toc={hubToc}
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
        title={`Want more ${niche.tradeLabel} jobs from Google?`}
        description={niche.ctaNote}
      />
    </>
  );
}

function IntentHubPage({ slug }: { slug: string }) {
  const page = getIntentPage(slug);
  if (!page) notFound();

  const service = getService(page.relatedService);
  const study = page.relatedCaseStudy
    ? caseStudies.find((c) => c.id === page.relatedCaseStudy)
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.seoDescription,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ["GB", "US"],
    url: `${siteConfig.url}/industries/${page.slug}`,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="relative isolate overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20">
        <HeroBackground />
        <div className="container relative z-10 max-w-3xl">
          <nav className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brand-500">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/services" className="hover:text-brand-500">
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink">{page.navLabel}</li>
            </ol>
          </nav>

          <span className="eyebrow mt-6">{page.eyebrow}</span>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            {page.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/contact" size="lg">
              Get a free proposal
              <HugeiconsIcon icon={ArrowRightIcon} size={18} />
            </LinkButton>
            {service && (
              <LinkButton
                href={`/services/${service.slug}`}
                size="lg"
                variant="secondary"
              >
                View {service.title}
              </LinkButton>
            )}
          </div>
          <p className="mt-4 text-sm text-slate-500">{page.ctaNote}</p>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Who this is for
            </h2>
            <ul className="mt-6 space-y-3">
              {page.whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
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
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              What you get
            </h2>
            <ul className="mt-6 space-y-3">
              {page.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
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
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            How we help
          </h2>
          <div className="mt-10 space-y-8">
            {page.howWeHelp.map((block, i) => (
              <div key={block.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {block.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-600">
                    {block.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {study && (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                Proof
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                {study.client} — {study.location}
              </h3>
              <p className="mt-3 text-slate-600">{study.summary}</p>
              <Link
                href={`/case-studies/${study.id}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:underline"
              >
                Read the full case study
                <HugeiconsIcon icon={ArrowRightIcon} size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container max-w-3xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            FAQs
          </h2>
          <div className="mt-8 space-y-2">
            {page.faqs.map((f) => (
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
      </section>

      <section className="pb-8">
        <div className="container">
          <p className="mb-4 text-center text-sm text-slate-500">
            Related guides
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            {[
              ...intentPages.filter((p) => p.slug !== page.slug),
              ...niches.map((n) => ({
                slug: n.slug,
                navLabel: n.navLabel,
              })),
            ].map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/industries/${p.slug}`}
                  className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                >
                  {p.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Ready for more bookings?"
        description={page.ctaNote}
      />
    </>
  );
}
