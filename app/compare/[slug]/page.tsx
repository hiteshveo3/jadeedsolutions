import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HugeiconsIcon, ArrowRightIcon, CheckIcon } from "@/components/icons";
import { InlineMarkdown, LongformMarkdown } from "@/components/longform/Markdown";
import { AskPanel, HeroButton, LongformBody, LongformHero, LongformSection, Pill } from "@/components/longform/Layout";
import { formatDate } from "@/lib/blog";
import { comparisons, getComparison } from "@/lib/comparisons";
import { siteConfig } from "@/lib/site";
import { FaqCards, LinkRows } from "@/components/site/ui";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
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
    <div>
      <p className={`mb-3 text-xs font-extrabold uppercase tracking-[.14em] ${tone === "us" ? "text-[#BEF70A]" : "text-white/58"}`}>{title}</p>
      <ul className="border-t border-white/[0.08] text-[15px] leading-6">
        {items.map((item) => (
          <li key={item} className="flex gap-3 border-b border-white/[0.08] py-3.5">
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tone === "us" ? "bg-transparent text-[#BEF70A]" : "bg-transparent text-white/68"}`} aria-hidden="true">
              <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={2.6} />
            </span>
            <span className="text-white/83">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ComparePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
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
          <p className="text-[18px] leading-8 text-white/[0.84]"><InlineMarkdown>{page.verdict}</InlineMarkdown></p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <ChoiceList title={`Choose ${page.competitor} if`} items={page.chooseThemIf} tone="them" />
            <ChoiceList title="Choose Jadeed if" items={page.chooseUsIf} tone="us" />
          </div>
        </LongformSection>

        <LongformSection id="side-by-side" label="Comparison" title="Side by side">
          <div className="jt-wrap">
            <table className="jt min-w-[600px]">
              <thead>
                <tr>
                  <th scope="col" className="w-[26%]"><span className="sr-only">Compared</span></th>
                  <th scope="col" className="jt-us">Jadeed Solutions</th>
                  <th scope="col">{page.competitorShort}</th>
                </tr>
              </thead>
              <tbody>
                {page.table.map(([label, them, us]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td className="jt-us">{us}</td>
                    <td>{them}</td>
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
          <FaqCards items={page.faqs.map((faq) => ({ question: faq.question, answer: <InlineMarkdown>{faq.answer}</InlineMarkdown> }))} />
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
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[.15em] text-[#BEF70A]">Other comparisons</p>
          <LinkRows items={others.map((c) => ({ href: `/compare/${c.slug}`, label: c.h1 }))} />
        </div>
      </LongformBody>
    </>
  );
}
