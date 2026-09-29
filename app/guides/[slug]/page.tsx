import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";
import { InlineMarkdown, LongformMarkdown } from "@/components/longform/Markdown";
import { AskPanel, HeroButton, LongformBody, LongformHero, LongformSection, Pill } from "@/components/longform/Layout";
import { defaultAuthorSlug, getAuthor } from "@/lib/authors";
import { formatDate } from "@/lib/blog";
import { getGuide, guides, guideWordCount } from "@/lib/guides";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const guide = getGuide(params.slug);
  if (!guide) return {};
  const url = `${siteConfig.url}/guides/${guide.slug}`;
  return {
    title: guide.seoTitle,
    description: guide.seoDescription,
    alternates: { canonical: url },
    openGraph: { type: "article", title: guide.title, description: guide.seoDescription, url, publishedTime: guide.published, modifiedTime: guide.updated },
  };
}

const plain = (markdown: string) => markdown.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "");

export default async function GuidePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const url = `${siteConfig.url}/guides/${guide.slug}`;
  const author = getAuthor(defaultAuthorSlug);
  const words = guideWordCount(guide);
  const minutes = Math.max(1, Math.round(words / 230));
  const contents = [
    ...guide.sections.map((s, i) => ({ id: `part-${i + 1}`, label: s.title })),
    { id: "faqs", label: "Frequently asked questions" },
  ];
  const others = guides.filter((g) => g.slug !== guide.slug);
  const whatsappHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(`Hi Jadeed — I read "${guide.title}" and have a question.`)}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: guide.title,
        description: guide.seoDescription,
        url,
        mainEntityOfPage: url,
        inLanguage: "en",
        wordCount: words,
        datePublished: guide.published,
        dateModified: guide.updated,
        author: { "@type": "Person", name: author.name, url: `${siteConfig.url}/author/${author.slug}` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: guide.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: plain(f.answer) } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/guides` },
          { "@type": "ListItem", position: 3, name: guide.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.eyebrow }]}
        eyebrow={<><Pill>Guide · {guide.eyebrow}</Pill><Pill tone="outline">{minutes} min read</Pill></>}
        title={guide.title}
        subtitle={guide.intro}
        actions={
          <>
            <HeroButton href="#part-1">
              Start reading <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </HeroButton>
            <Link href={`/author/${author.slug}`} className="group inline-flex items-center gap-3 rounded-xl sm:ml-2">
              <Image src={author.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-2 ring-white/25" />
              <span className="text-sm leading-5">
                <span className="block font-semibold text-white group-hover:underline">{author.name}</span>
                <span className="block text-white/65">Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time></span>
              </span>
            </Link>
          </>
        }
      />

      <LongformBody contents={contents}>
        {guide.sections.map((section, i) => (
          <LongformSection key={section.title} id={`part-${i + 1}`} label={`Part ${String(i + 1).padStart(2, "0")}`} title={section.title}>
            <LongformMarkdown>{section.body}</LongformMarkdown>
          </LongformSection>
        ))}

        <LongformSection id="faqs" label="FAQs" title="Frequently asked questions">
          <dl className="divide-y divide-black/10 border-y border-black/10">
            {guide.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <dt className="text-[18px] font-bold tracking-[-.015em]">{faq.question}</dt>
                <dd className="mt-2.5 text-[17px] leading-[1.75] text-[#1d1d1b]/80"><InlineMarkdown>{faq.answer}</InlineMarkdown></dd>
              </div>
            ))}
          </dl>
        </LongformSection>

        <AskPanel
          eyebrow="Talk it through"
          title="Want us to look at your business specifically?"
          text="Tell us your services, areas and where you think customers are being lost. The growth plan call is free, and we will tell you honestly if the answer is “not yet”."
          whatsappHref={whatsappHref}
          email={siteConfig.email}
          emailSubject={`Question about: ${guide.title}`}
        />

        {others.length > 0 && (
          <div className="mt-12">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">More guides</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {others.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="group rounded-2xl border border-black/10 p-5 transition-colors hover:border-[#015f45]/40">
                  <span className="text-xs font-bold uppercase tracking-[.12em] text-black/45">{g.eyebrow}</span>
                  <span className="mt-2 block font-semibold leading-snug group-hover:text-[#015f45]">{g.title}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#015f45]">
                    Read guide <HugeiconsIcon icon={ArrowRightIcon} size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </LongformBody>
    </>
  );
}
