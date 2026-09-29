import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuide } from "@/lib/guides";
import { getNiche } from "@/lib/niches";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/site";
import {
  ButtonLink,
  Eyebrow,
  FaqSection,
  JsonLd,
  LinkRows,
  PageHero,
  Section,
  SectionHeader,
} from "@/components/site/ui";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  const url = `${siteConfig.url}/guides/${guide.slug}`;
  return {
    title: guide.seoTitle,
    description: guide.seoDescription,
    alternates: { canonical: url },
    openGraph: { type: "article", title: guide.seoTitle, description: guide.seoDescription, url },
  };
}

const anchor = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const author = getAuthor();
  const industry = guide.relatedIndustry ? getNiche(guide.relatedIndustry) : undefined;
  const others = guides.filter((g) => g.slug !== guide.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.seoDescription,
    url: `${siteConfig.url}/guides/${guide.slug}`,
    author: { "@type": "Person", name: author.name, url: `${siteConfig.url}/author/${author.slug}` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        compact
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.eyebrow }]}
        eyebrow={`Guide · ${guide.eyebrow}`}
        title={guide.title}
        lead={guide.intro}
      >
        <Link href={`/author/${author.slug}`} className="mt-10 flex w-fit items-center gap-3 border-t border-white/15 pt-6 transition-opacity hover:opacity-85">
          <Image src={author.avatar} alt={author.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          <span className="text-sm leading-5">
            <span className="block font-bold">{author.name}</span>
            <span className="block text-white/60">Founder, Jadeed Solutions</span>
          </span>
        </Link>
      </PageHero>

      <Section tone="cream" labelledBy="guide-body">
        <h2 id="guide-body" className="sr-only">{guide.title}</h2>
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">On this page</p>
            <ol className="mt-4 border-t border-black/10 text-sm">
              {guide.sections.map((section) => (
                <li key={section.heading} className="border-b border-black/10">
                  <a href={`#${anchor(section.heading)}`} className="block py-3 font-medium text-black/70 transition-colors hover:text-[#015f45]">{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="max-w-[720px]">
            {guide.sections.map((section) => (
              <section key={section.heading} id={anchor(section.heading)} className="scroll-mt-28 border-b border-black/10 py-8 first:pt-0">
                <h2 className="font-sans text-[26px] font-semibold leading-tight tracking-[-.035em] sm:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-[17px] leading-8 text-black/75">
                  {section.body.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
                </div>
              </section>
            ))}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="green">Get a free plan</ButtonLink>
              <ButtonLink href="/tools/growth-check" variant="outlineDark">Take the Growth Check</ButtonLink>
            </div>
          </article>
        </div>
      </Section>

      {industry && (
        <Section tone="green" labelledBy="industry-heading">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow tone="green">For {industry.tradePlural}</Eyebrow>
              <h2 id="industry-heading" className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] [text-wrap:balance] sm:text-5xl">{industry.h1}</h2>
              <p className="mt-5 max-w-xl leading-7 text-white/75">{industry.intro}</p>
            </div>
            <div className="lg:justify-self-end">
              <ButtonLink href={`/industries/${industry.slug}`} variant="white">See the {industry.navLabel.toLowerCase()} playbook</ButtonLink>
            </div>
          </div>
        </Section>
      )}

      <FaqSection items={guide.faqs} />

      {others.length > 0 && (
        <Section tone="mint" labelledBy="other-guides-heading">
          <SectionHeader id="other-guides-heading" tone="mint" eyebrow="More guides" title="Keep reading" />
          <div className="mt-10">
            <LinkRows tone="mint" columns={2} items={others.map((other) => ({ href: `/guides/${other.slug}`, label: other.title, meta: other.eyebrow }))} />
          </div>
        </Section>
      )}
    </>
  );
}
