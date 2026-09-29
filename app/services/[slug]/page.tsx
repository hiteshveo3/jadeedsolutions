import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon, ArrowRightIcon, WhatsappIcon } from "@/components/icons";
import { LongformHero, Pill } from "@/components/longform/Layout";
import { AtAGlance, CaseStudyCard, CheckList, FaqList, LandingSection, LinkCards, ReviewGrid, StatRow, StepsGrid } from "@/components/landing/Blocks";
import { getPost } from "@/lib/blog";
import { getCaseStudiesForService } from "@/lib/case-studies";
import { getGuide } from "@/lib/guides";
import { getReviewsForService, googleAggregate } from "@/lib/reviews";
import { getService, services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  const url = `${siteConfig.url}/services/${service.slug}`;
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: url },
    openGraph: { type: "website", title: service.seoTitle, description: service.seoDescription, url },
  };
}

/** Further reading per service: blog posts first, then guides. */
const related: Record<string, { posts: string[]; guides: string[] }> = {
  seo: { posts: ["seo-for-local-service-business-step-by-step", "seo-checklist-2026"], guides: ["how-plumbers-get-more-jobs-online"] },
  "web-development": { posts: ["why-nextjs-for-marketing-sites", "how-to-use-icons-mobile-apps-websites"], guides: ["website-seo-app-or-10-percent"] },
  "app-development": { posts: ["how-to-talk-to-app-clients-restaurant-example", "best-icon-libraries-mobile-apps-websites"], guides: ["website-seo-app-or-10-percent"] },
  "digital-advertising": { posts: ["google-ads-roi-fundamentals", "local-seo-google-ads-service-business"], guides: ["how-cleaning-companies-get-more-bookings"] },
};

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const url = `${siteConfig.url}/services/${service.slug}`;
  const reviews = getReviewsForService(service.slug, 4);
  const study = getCaseStudiesForService(service.slug)[0];
  const reading = [
    ...(related[service.slug]?.posts ?? []).map((slug) => getPost(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p)).map((p) => ({ href: `/blog/${p.slug}`, eyebrow: `Blog · ${p.readingTime}`, title: p.title, text: p.excerpt })),
    ...(related[service.slug]?.guides ?? []).map((slug) => getGuide(slug)).filter((g): g is NonNullable<typeof g> => Boolean(g)).map((g) => ({ href: `/guides/${g.slug}`, eyebrow: `Guide · ${g.eyebrow}`, title: g.title, text: g.intro })),
  ];
  const others = services.filter((s) => s.slug !== service.slug);
  const whatsappHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(`Hi Jadeed — I'm interested in ${service.title.toLowerCase()} for my business.`)}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: service.category,
        description: service.description,
        url,
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: ["United Kingdom", "United States", "Canada", "United Arab Emirates", "Pakistan"],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: service.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
        eyebrow={<Pill>{service.category}</Pill>}
        title={service.h1}
        subtitle={service.description}
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
        meta={
          <a href={googleAggregate.url} target="_blank" rel="noreferrer" className="hover:text-white">
            ★ {googleAggregate.score} {googleAggregate.label}
          </a>
        }
        aside={<AtAGlance rows={service.atAGlance} />}
      />

      <div className="border-b border-black/10 bg-white">
        <div className="container flex max-w-[1200px] flex-wrap gap-x-6 gap-y-3 py-5 text-sm font-semibold text-black/70">
          {service.highlights.map((h) => (
            <span key={h.label} className="inline-flex items-center gap-2">
              <HugeiconsIcon icon={h.icon} size={18} className="text-[#015f45]" aria-hidden="true" /> {h.label}
            </span>
          ))}
        </div>
      </div>

      <LandingSection id="overview" eyebrow="Overview" title={service.overview.heading} tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-5 text-[17px] leading-[1.75] text-black/75">
            {service.overview.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
          </div>
          <div className="lg:hidden">
            <div className="rounded-[24px] bg-[#015f45] p-1"><AtAGlance rows={service.atAGlance} /></div>
          </div>
          <div className="rounded-[24px] border border-black/10 bg-white p-6">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">Key takeaways</p>
            <div className="mt-4"><CheckList items={service.keyTakeaways} /></div>
          </div>
        </div>
        <div className="mt-10"><StatRow stats={service.stats} /></div>
      </LandingSection>

      <LandingSection id="included" eyebrow="What you get" title="What’s included" intro={<>Every engagement is scoped in writing before work starts, and every account we set up is in your business’s name.</>}>
        <div className="grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
          <div className="rounded-[24px] border border-black/10 p-6 sm:p-8">
            <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {service.included.map((item) => <CheckList key={item} items={[item]} />)}
            </div>
          </div>
          <div className="rounded-[24px] bg-[#dceee8] p-6 text-[#063d30] sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">Ideal for</p>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-6">
              {service.idealFor.map((item) => <li key={item} className="border-b border-[#015f45]/10 pb-2.5 last:border-0">{item}</li>)}
            </ul>
          </div>
        </div>
      </LandingSection>

      <LandingSection id="process" eyebrow="How it works" title="From first call to results" tone="green">
        <StepsGrid steps={service.steps} />
      </LandingSection>

      <LandingSection id="detail" eyebrow="In detail" title={`How we approach ${service.title.toLowerCase()}`}>
        <div className="grid gap-4 md:grid-cols-2">
          {service.sections.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-24 rounded-[24px] border border-black/10 p-6 sm:p-8">
              <h3 className="text-xl font-bold tracking-[-.02em]">{section.heading}</h3>
              {section.paragraphs.map((p) => <p key={p.slice(0, 40)} className="mt-3 leading-7 text-black/70">{p}</p>)}
            </article>
          ))}
        </div>
      </LandingSection>

      <LandingSection
        id="pricing"
        eyebrow="Pricing"
        title="What it costs"
        tone="cream"
        intro={<>Prices are in GBP and shown as a guide. You always get a fixed price or an agreed commercial model in writing before work starts.</>}
      >
        <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="space-y-4 text-[17px] leading-[1.75] text-black/75">
              {service.cost.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </div>
            <div className="mt-6 overflow-hidden rounded-[20px] border border-black/10 bg-white">
              <table className="w-full text-left text-[15px]">
                <tbody>
                  {service.cost.rows.map((row) => (
                    <tr key={row.label} className="border-t border-black/10 first:border-t-0">
                      <th scope="row" className="px-5 py-3.5 font-medium text-black/75">{row.label}</th>
                      <td className="px-5 py-3.5 text-right font-bold text-[#015f45]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-black/55">{service.cost.note}</p>
          </div>
          <div className="flex flex-col rounded-[24px] bg-white p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">What affects the price</p>
            <div className="mt-4"><CheckList items={service.priceFactors} /></div>
            <div className="mt-8 flex flex-col gap-2 border-t border-black/10 pt-5 text-sm font-bold text-[#015f45]">
              <Link href="/pricing" className="group inline-flex items-center gap-1.5">Compare pricing models <HugeiconsIcon icon={ArrowRightIcon} size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
              <Link href="/profit-share-handbook" className="group inline-flex items-center gap-1.5">How performance deals work <HugeiconsIcon icon={ArrowRightIcon} size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </LandingSection>

      <LandingSection id="proof" eyebrow="Proof" title="Results and reviews you can check">
        {study && <CaseStudyCard study={study} />}
        {reviews.length > 0 && <div className={study ? "mt-4" : ""}><ReviewGrid reviews={reviews} /></div>}
        <p className="mt-5 text-sm text-black/55">
          Reviews are quoted from our public <a href={googleAggregate.url} target="_blank" rel="noreferrer" className="font-semibold text-[#015f45] hover:underline">Google</a> and <a href={siteConfig.trustpilotUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#015f45] hover:underline">Trustpilot</a> profiles, lightly shortened.
        </p>
      </LandingSection>

      <LandingSection id="why" eyebrow="Why Jadeed" title={`Why choose us for ${service.title.toLowerCase()}`} tone="mint">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.whyChoose.map((card) => (
            <div key={card.title} className="rounded-[24px] bg-white p-6">
              <h3 className="text-lg font-bold tracking-[-.02em] text-[#111]">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/65">{card.description}</p>
            </div>
          ))}
        </div>
      </LandingSection>

      <LandingSection id="faqs" eyebrow="FAQs" title="Questions we get asked">
        <FaqList faqs={service.faqs} />
      </LandingSection>

      {reading.length > 0 && (
        <LandingSection id="reading" eyebrow="Further reading" title="Learn more before you decide" tone="cream">
          <LinkCards items={reading} />
          <div className="mt-8 flex flex-wrap gap-2 text-sm">
            <span className="py-1.5 font-semibold text-black/55">Other services:</span>
            {others.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 font-semibold text-black/70 hover:border-[#015f45]/40 hover:text-[#015f45]">{s.title}</Link>
            ))}
          </div>
        </LandingSection>
      )}
    </>
  );
}
