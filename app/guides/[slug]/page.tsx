import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/lib/guides";
import { HeroBackground } from "@/components/HeroBackground";
import { CTASection } from "@/components/CTASection";
import { AccordionItem } from "@/components/Accordion";
import { LinkButton } from "@/components/Button";
import { getAuthor, defaultAuthorSlug } from "@/lib/authors";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return {
    title: guide.seoTitle,
    description: guide.seoDescription,
    alternates: { canonical: `${siteConfig.url}/guides/${guide.slug}` },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();
  const author = getAuthor(defaultAuthorSlug);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
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
      <article>
        <section className="relative isolate overflow-hidden bg-white pb-12 pt-16">
          <HeroBackground />
          <div className="container relative z-10 max-w-3xl">
            <nav className="text-xs text-slate-500">
              <Link href="/guides" className="hover:text-brand-500">
                Guides
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-ink">{guide.eyebrow}</span>
            </nav>
            <span className="eyebrow mt-4">{guide.eyebrow}</span>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {guide.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {guide.intro}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              By{" "}
              <Link
                href={`/author/${author.slug}`}
                className="font-semibold text-brand-500"
              >
                {author.name}
              </Link>{" "}
              · {author.role}
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="container max-w-3xl space-y-10">
            {guide.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {s.heading}
                </h2>
                {s.body.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="mt-3 text-base leading-relaxed text-slate-600"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}

            {guide.relatedIndustry && (
              <p className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
                Explore our{" "}
                <Link
                  href={`/industries/${guide.relatedIndustry}`}
                  className="font-semibold text-brand-500"
                >
                  industry page
                </Link>{" "}
                for city coverage, or run the{" "}
                <Link
                  href="/tools/growth-check"
                  className="font-semibold text-brand-500"
                >
                  free Growth Check
                </Link>
                .
              </p>
            )}

            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                FAQ
              </h2>
              <div className="mt-4">
                {guide.faqs.map((f) => (
                  <AccordionItem key={f.question} title={f.question}>
                    <p className="text-sm text-slate-600">{f.answer}</p>
                  </AccordionItem>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <LinkButton href={siteConfig.whatsappHref}>WhatsApp us</LinkButton>
              <LinkButton href="/pricing" variant="secondary">
                View pricing
              </LinkButton>
            </div>
          </div>
        </section>
      </article>
      <CTASection />
    </>
  );
}
