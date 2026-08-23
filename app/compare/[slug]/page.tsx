import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, getComparison } from "@/lib/comparisons";
import { HeroBackground } from "@/components/HeroBackground";
import { CTASection } from "@/components/CTASection";
import { AccordionItem } from "@/components/Accordion";
import { LinkButton } from "@/components/Button";
import { HugeiconsIcon, CheckIcon, CloseIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getComparison(params.slug);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: `${siteConfig.url}/compare/${page.slug}` },
  };
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const page = getComparison(params.slug);
  if (!page) notFound();

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <section className="relative isolate overflow-hidden bg-white pb-14 pt-16">
        <HeroBackground />
        <div className="container relative z-10 max-w-3xl">
          <nav className="text-xs text-slate-500">
            <Link href="/compare" className="hover:text-brand-500">
              Compare
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-ink">{page.navLabel}</span>
          </nav>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {page.h1}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {page.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href={siteConfig.whatsappHref}>WhatsApp us</LinkButton>
            <LinkButton href="/tools/growth-check" variant="secondary">
              Free Growth Check
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-7">
            <h2 className="font-display text-xl font-semibold text-ink">
              With Jadeed you get
            </h2>
            <ul className="mt-4 space-y-3">
              {page.youGet.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-slate-700">
                  <HugeiconsIcon
                    icon={CheckIcon}
                    size={18}
                    className="mt-0.5 shrink-0 text-brand-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-7">
            <h2 className="font-display text-xl font-semibold text-ink">
              {page.competitor} often miss
            </h2>
            <ul className="mt-4 space-y-3">
              {page.theyMiss.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-slate-700">
                  <HugeiconsIcon
                    icon={CloseIcon}
                    size={16}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Why businesses pick Jadeed
          </h2>
          <ul className="mt-6 space-y-3">
            {page.whyJadeed.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <h2 className="font-display text-xl font-semibold text-ink">FAQ</h2>
            <div className="mt-4">
              {page.faqs.map((f) => (
                <AccordionItem key={f.question} title={f.question}>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {f.answer}
                  </p>
                </AccordionItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to switch from gigs and retainers?"
        description="WhatsApp your city and trade — we’ll map website, SEO, app or 10% partnership."
      />
    </>
  );
}
