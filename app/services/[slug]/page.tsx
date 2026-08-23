import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccordionItem } from "@/components/Accordion";
import { HeroBackground } from "@/components/HeroBackground";
import {
  services,
  getService,
  type Review as ReviewType,
  type PriceRow,
} from "@/lib/services";
import {
  getReviewsForService,
  googleAggregate,
  trustpilotAggregate,
  type GoogleReview,
} from "@/lib/reviews";
import { getCaseStudiesForService, type CaseStudy } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";
import {
  HugeiconsIcon,
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
  WhatsappBusinessIcon,
  type IconSvgElement,
} from "@/components/icons";

const WHATSAPP = `https://wa.me/${siteConfig.phoneHref.replace("+", "")}`;
const TEL = `tel:${siteConfig.phoneHref}`;

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
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `${siteConfig.url}/services/${service.slug}` },
    openGraph: {
      title: `${service.seoTitle} | ${siteConfig.name}`,
      description: service.seoDescription,
      images: [{ url: service.heroImage, width: 640, height: 400, alt: service.h1 }],
    },
  };
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 text-[15px] text-slate-700 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5"
        >
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
            <HugeiconsIcon icon={CheckIcon} size={14} className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span className="font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PriceTable({ rows }: { rows: PriceRow[] }) {
  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-brand-500 text-white">
            <th className="px-4 py-3 font-semibold" scope="col">
              Option
            </th>
            <th className="px-4 py-3 text-right font-semibold" scope="col">
              Guide price
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              <td className="border-t border-slate-200 px-4 py-3 font-semibold text-ink">
                {row.label}
              </td>
              <td className="border-t border-slate-200 px-4 py-3 text-right text-slate-600">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview | ReviewType }) {
  const initials = review.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  const source = "source" in review ? review.source : "Client";
  const avatar = "avatar" in review ? review.avatar : undefined;
  const business =
    "business" in review && review.business ? String(review.business) : undefined;
  const subtitle =
    business ||
    ("location" in review && review.location
      ? String(review.location)
      : source === "Trustpilot"
        ? "Trustpilot review · 5.0"
        : "Google review · 5.0");

  return (
    <figure className="w-full rounded-r-2xl border-l-4 border-brand-500 bg-white py-5 pl-6 pr-6 shadow-sm">
      <div className="flex items-center justify-end gap-3">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
          {source}
        </span>
      </div>
      <blockquote className="mt-3 text-[16px] leading-relaxed text-ink">
        {review.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt={review.name}
            loading="lazy"
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-brand-100"
          />
        ) : (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-semibold text-white ring-2 ring-brand-100">
            {initials || "JS"}
          </span>
        )}
        <span className="text-sm">
          <span className="block font-semibold text-ink">{review.name}</span>
          <span className="block text-xs text-slate-500">{subtitle}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function CaseStudyTeaser({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.id}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:gap-5"
    >
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">
          Case study
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold text-ink group-hover:text-brand-500">
          {study.client}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{study.summary}</p>
        <p className="mt-2 text-xs text-slate-500">
          {study.location} · {study.engagementModel}
        </p>
      </div>
      <span className="mt-4 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-500 sm:mt-0">
        View case study
        <HugeiconsIcon
          icon={ArrowRightIcon}
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

function SectionHeading2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 pt-2 font-display text-2xl font-semibold tracking-tight text-ink"
    >
      {children}
    </h2>
  );
}

function Highlight({ icon, label }: { icon: IconSvgElement; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <HugeiconsIcon icon={icon} size={16} className="h-4 w-4 text-brand-500" />
      {label}
    </span>
  );
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getService(params.slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const googleReviews = getReviewsForService(service.slug, 4);
  const caseStudies = getCaseStudiesForService(service.slug);
  const displayReviews =
    googleReviews.length > 0 ? googleReviews : service.reviews;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
    },
    url: `${siteConfig.url}/services/${service.slug}`,
    offers: {
      "@type": "Offer",
      price: service.priceLabel,
      priceCurrency: "GBP",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${siteConfig.url}/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-white py-12 md:py-16">
        <HeroBackground />
        <div className="container relative z-10">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link className="transition-colors hover:text-brand-500" href="/">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link className="transition-colors hover:text-brand-500" href="/services">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_460px]">
            <div>
              <span className="inline-flex rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-semibold text-white">
                {service.category}
              </span>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
                {service.h1}
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
                {service.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <HugeiconsIcon icon={WhatsappBusinessIcon} size={16} className="h-4 w-4" />
                  WhatsApp us
                </a>
                <a
                  href={TEL}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-slate-200"
                >
                  <HugeiconsIcon icon={PhoneIcon} size={16} className="h-4 w-4" />
                  {siteConfig.phone}
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                {service.highlights.map((h) => (
                  <Highlight key={h.label} icon={h.icon} label={h.label} />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-ink">{service.rating.score}</span>
                  <span className="text-sm text-slate-500">{service.rating.count}</span>
                </span>
                <span className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden="true" />
                {service.trustBadges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-ink shadow-sm"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.heroImage}
                alt={service.title}
                className="aspect-[16/11] w-full rounded-[24px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="bg-slate-50">
        <div className="container py-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="space-y-4">
              {/* Overview */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7">
                <SectionHeading2 id="overview">{service.overview.heading}</SectionHeading2>
                <div className="mt-3 space-y-4">
                  {service.overview.paragraphs.map((p, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-slate-600">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Stat band */}
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-4">
                {service.stats.map((s) => (
                  <div key={s.label} className="bg-white px-4 py-5 text-center">
                    <div className="font-display text-2xl font-semibold text-brand-500">
                      {s.value.replace("★", "").trim()}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Included */}
              <SectionHeading2 id="included">What&rsquo;s included</SectionHeading2>
              <p className="text-[15px] leading-relaxed text-slate-600">
                Every {service.title.toLowerCase()} engagement comes with the essentials built
                in — no surprise extras bolted on later.
              </p>
              <CheckList items={service.included} />

              {/* Ideal for */}
              <SectionHeading2 id="ideal">Who this service is for</SectionHeading2>
              <p className="text-[15px] leading-relaxed text-slate-600">
                Not sure if this is the right fit? It works brilliantly for:
              </p>
              <CheckList items={service.idealFor} />

              {/* How it works */}
              <SectionHeading2 id="how-it-works">How it works, step by step</SectionHeading2>
              <ol className="space-y-4">
                {service.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Cost */}
              <SectionHeading2 id="cost">How much does it cost?</SectionHeading2>
              {service.cost.paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-slate-600">
                  {p}
                </p>
              ))}
              <PriceTable rows={service.cost.rows} />
              <p className="flex items-center gap-2 text-sm font-medium text-brand-600">
                <HugeiconsIcon icon={CheckIcon} size={16} className="h-4 w-4 shrink-0" strokeWidth={2.6} />
                {service.cost.note}
              </p>

              {/* Affects price */}
              <SectionHeading2 id="affects">What affects the price</SectionHeading2>
              <p className="text-[15px] leading-relaxed text-slate-600">
                A few practical factors move the final number up or down:
              </p>
              <CheckList items={service.priceFactors} />

              {/* Key takeaways */}
              <aside className="my-4 rounded-2xl bg-brand-500 p-6 text-white">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
                  <HugeiconsIcon icon={CheckIcon} size={15} className="h-4 w-4" strokeWidth={2.4} />
                  Key takeaways
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {service.keyTakeaways.map((k) => (
                    <li key={k} className="flex items-start gap-2.5">
                      <HugeiconsIcon
                        icon={CheckIcon}
                        size={14}
                        className="mt-0.5 h-4 w-4 shrink-0"
                        strokeWidth={2.4}
                      />
                      <span className="font-medium">{k}</span>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Case studies — full write-ups live on dedicated pages */}
              {caseStudies.length > 0 && (
                <div className="space-y-3">
                  <SectionHeading2 id="case-studies">Case studies</SectionHeading2>
                  <p className="text-[15px] leading-relaxed text-slate-600">
                    Real local-service results. Open a case study for full metrics,
                    keywords and proof.
                  </p>
                  {caseStudies.map((study) => (
                    <CaseStudyTeaser key={study.id} study={study} />
                  ))}
                </div>
              )}

              {/* Extra long-form sections */}
              {service.sections.map((s) => (
                <div key={s.id}>
                  <SectionHeading2 id={s.id}>{s.heading}</SectionHeading2>
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="mt-3 text-[15px] leading-relaxed text-slate-600">
                      {p}
                    </p>
                  ))}
                </div>
              ))}

              {/* Why choose */}
              <SectionHeading2 id="why">Why choose {siteConfig.name}</SectionHeading2>
              <ul className="mt-2 grid gap-4 sm:grid-cols-2">
                {service.whyChoose.map((c) => (
                  <li key={c.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
                      <HugeiconsIcon icon={CheckIcon} size={20} className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                    <p className="mt-3 font-semibold text-ink">{c.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{c.description}</p>
                  </li>
                ))}
              </ul>

              {/* Inline CTA */}
              <div className="my-6 flex flex-col items-start justify-between gap-4 rounded-[24px] bg-brand-500 p-6 text-white sm:flex-row sm:items-center">
                <div>
                  <p className="font-display text-lg font-semibold">
                    Ready to grow with {service.title.toLowerCase()}?
                  </p>
                  <p className="mt-1 text-sm text-white/80">
                    Get a clear, no-obligation quote — usually within one business day.
                  </p>
                </div>
                <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/25"
                  >
                    <HugeiconsIcon icon={WhatsappBusinessIcon} size={16} className="h-4 w-4" />
                    WhatsApp us
                  </a>
                  <a
                    href={TEL}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-500"
                  >
                    <HugeiconsIcon icon={PhoneIcon} size={16} className="h-4 w-4" />
                    Call us
                  </a>
                </div>
              </div>

              {/* Reviews */}
              <div className="flex flex-wrap items-end justify-between gap-3">
                <SectionHeading2 id="reviews">What our clients say</SectionHeading2>
                <p className="flex flex-wrap gap-x-3 gap-y-1 pb-1 text-sm font-semibold text-ink">
                  <a
                    href={googleAggregate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-500"
                  >
                    Google {googleAggregate.score} · {googleAggregate.count}
                  </a>
                  <span className="text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <a
                    href={trustpilotAggregate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-500"
                  >
                    Trustpilot {trustpilotAggregate.score} · {trustpilotAggregate.count}
                  </a>
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {displayReviews.map((r) => (
                  <ReviewCard key={r.name} review={r} />
                ))}
              </div>

              {/* FAQs */}
              <SectionHeading2 id="faqs">Frequently asked questions</SectionHeading2>
              <div className="mt-2 space-y-3">
                {service.faqs.map((f, i) => (
                  <AccordionItem
                    key={f.question}
                    title={f.question}
                    variant="card-white"
                    defaultOpen={i === 0}
                  >
                    {f.answer}
                  </AccordionItem>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-[68px] lg:self-start">
              <div className="rounded-2xl bg-brand-500 p-6 text-white">
                <p className="font-display text-lg font-semibold">Get a free quote</p>
                <p className="mt-1 text-sm text-white/80">
                  A clear, all-in price for your {service.title.toLowerCase()} — no obligation.
                </p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/25"
                >
                  <HugeiconsIcon icon={WhatsappBusinessIcon} size={16} className="h-4 w-4" />
                  WhatsApp us
                </a>
                <a
                  href={TEL}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-500"
                >
                  <HugeiconsIcon icon={PhoneIcon} size={16} className="h-4 w-4" />
                  {siteConfig.phone}
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-ink">
                  At a glance
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  {service.atAGlance.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-slate-500">{row.label}</dt>
                      <dd className="font-semibold text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Related services */}
          <section className="mt-14">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Related services
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 hover:underline"
              >
                View all
                <HugeiconsIcon icon={ArrowRightIcon} size={16} className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.heroImage}
                    alt={s.title}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />
                  <div className="p-5">
                    <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-600">
                      {s.priceLabel}
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold leading-snug text-ink group-hover:text-brand-500">
                      {s.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
                      Learn more
                      <HugeiconsIcon icon={ArrowRightIcon} size={16} className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="container py-12">
        <div className="rounded-[28px] bg-brand-500 px-6 py-14 text-center text-white md:px-12">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to grow your business?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/80">
            Message or call us for a free, no-obligation quote on {service.title.toLowerCase()}{" "}
            — honest advice, clear pricing, real results.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/25 sm:w-auto"
            >
                    <HugeiconsIcon icon={WhatsappBusinessIcon} size={16} className="h-4 w-4" />
              WhatsApp us
            </a>
            <a
              href={TEL}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-500 sm:w-auto"
            >
              <HugeiconsIcon icon={PhoneIcon} size={16} className="h-4 w-4" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
