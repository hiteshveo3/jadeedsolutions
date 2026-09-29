import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon, ArrowRightIcon, CheckIcon } from "@/components/icons";
import { InlineMarkdown, LongformMarkdown } from "@/components/longform/Markdown";
import { AskPanel, HeroButton, LongformBody, LongformHero, LongformSection, Pill } from "@/components/longform/Layout";
import { formatDate } from "@/lib/blog";
import { comparisons, getComparison } from "@/lib/comparisons";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getComparison(params.slug);
  if (!page) return {};
  const url = `${siteConfig.url}/compare/${page.slug}`;
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: url },
    openGraph: { type: "article", title: page.h1, description: page.seoDescription, url, modifiedTime: page.updated },
  };
}

const plain = (markdown: string) => markdown.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "");

function ChoiceList({ title, items, tone }: { title: string; items: string[]; tone: "them" | "us" }) {
  return (
    <div className={`rounded-2xl p-5 sm:p-6 ${tone === "us" ? "bg-[#015f45] text-white" : "border border-black/10 bg-white"}`}>
      <p className={`text-xs font-extrabold uppercase tracking-[.14em] ${tone === "us" ? "text-[#eaf25a]" : "text-black/50"}`}>{title}</p>
      <ul className="mt-4 space-y-3 text-[15px] leading-6">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tone === "us" ? "bg-[#cbd810] text-[#063d30]" : "bg-[#f3f1ec] text-black/60"}`} aria-hidden="true">
              <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={2.6} />
            </span>
            <span className={tone === "us" ? "text-white/90" : "text-black/75"}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const page = getComparison(params.slug);
  if (!page) notFound();

  const url = `${siteConfig.url}/compare/${page.slug}`;
  const contents = [
    { id: "short-answer", label: "The short answer" },
    { id: "side-by-side", label: "Side by side" },
    ...page.sections.map((s, i) => ({ id: `part-${i + 1}`, label: s.title })),
    { id: "faqs", label: "Frequently asked questions" },
  ];
  const others = comparisons.filter((c) => c.slug !== page.slug);
  const whatsappHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(`Hi Jadeed — I was comparing you with ${page.competitor} and have a question.`)}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: page.h1,
        description: page.seoDescription,
        url,
        mainEntityOfPage: url,
        datePublished: page.published,
        dateModified: page.updated,
        author: { "@id": `${siteConfig.url}/#organization` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: plain(f.answer) } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Compare", item: `${siteConfig.url}/compare` },
          { "@type": "ListItem", position: 3, name: page.h1, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: page.navLabel }]}
        eyebrow={<><Pill>Honest comparison</Pill><Pill tone="outline">Updated {formatDate(page.updated)}</Pill></>}
        title={page.h1}
        subtitle={page.intro}
        actions={
          <>
            <HeroButton href="#short-answer">
              Read the short answer <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </HeroButton>
            <HeroButton href="#side-by-side" variant="outline">See the comparison table</HeroButton>
          </>
        }
      />

      <LongformBody contents={contents}>
        <LongformSection id="short-answer" label="Verdict" title="The short answer">
          <p className="text-[18px] leading-8 text-[#1d1d1b]/85"><InlineMarkdown>{page.verdict}</InlineMarkdown></p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <ChoiceList title={`Choose ${page.competitor} if`} items={page.chooseThemIf} tone="them" />
            <ChoiceList title="Choose Jadeed if" items={page.chooseUsIf} tone="us" />
          </div>
        </LongformSection>

        <LongformSection id="side-by-side" label="Comparison" title="Side by side">
          <div className="overflow-x-auto rounded-2xl border border-black/10">
            <table className="w-full min-w-[600px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="bg-[#f3f1ec] text-xs font-bold uppercase tracking-[.1em] text-black/60">
                  <th scope="col" className="w-[26%] px-4 py-3"><span className="sr-only">Compared</span></th>
                  <th scope="col" className="px-4 py-3">{page.competitorShort}</th>
                  <th scope="col" className="bg-[#dceee8] px-4 py-3 text-[#015f45]">Jadeed Solutions</th>
                </tr>
              </thead>
              <tbody>
                {page.table.map(([label, them, us]) => (
                  <tr key={label} className="border-t border-black/10">
                    <th scope="row" className="px-4 py-3 align-top text-sm font-semibold text-black/70">{label}</th>
                    <td className="px-4 py-3 align-top text-[#1d1d1b]/80">{them}</td>
                    <td className="bg-[#eef6f2] px-4 py-3 align-top font-medium text-[#063d30]">{us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LongformSection>

        {page.sections.map((section, i) => (
          <LongformSection key={section.title} id={`part-${i + 1}`} title={section.title}>
            <LongformMarkdown>{section.body}</LongformMarkdown>
          </LongformSection>
        ))}

        <LongformSection id="faqs" label="FAQs" title="Frequently asked questions">
          <dl className="divide-y divide-black/10 border-y border-black/10">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <dt className="text-[18px] font-bold tracking-[-.015em]">{faq.question}</dt>
                <dd className="mt-2.5 text-[17px] leading-[1.75] text-[#1d1d1b]/80"><InlineMarkdown>{faq.answer}</InlineMarkdown></dd>
              </div>
            ))}
          </dl>
        </LongformSection>

        <AskPanel
          eyebrow="Still comparing?"
          title="Ask us anything — including whether we are the right fit."
          text="If another option suits your business better, we will tell you. The growth plan call is free."
          whatsappHref={whatsappHref}
          email={siteConfig.email}
          emailSubject={`Question: ${page.h1}`}
        />

        <div className="mt-12">
          <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">Other comparisons</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {others.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="group rounded-2xl border border-black/10 p-4 text-sm font-semibold transition-colors hover:border-[#015f45]/40 hover:text-[#015f45]">
                Jadeed {c.navLabel}
                <HugeiconsIcon icon={ArrowRightIcon} size={14} className="ml-1 inline transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </LongformBody>
    </>
  );
}
