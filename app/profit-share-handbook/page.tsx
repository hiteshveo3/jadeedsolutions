import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";
import { LongformMarkdown } from "@/components/longform/Markdown";
import { AskPanel, HeroButton, LongformBody, LongformHero, LongformSection, Pill } from "@/components/longform/Layout";
import { RequirementsChecklist } from "@/components/handbook/RequirementsChecklist";
import {
  handbookFaqs,
  handbookMeta,
  handbookSections,
  handbookWordCount,
  onboardingPhases,
  paymentSpread,
  plainText,
  sectionId,
  structureComparison,
  structures,
} from "@/lib/profit-share-handbook";
import { siteConfig } from "@/lib/site";

const url = `${siteConfig.url}${handbookMeta.path}`;

export const metadata: Metadata = {
  title: handbookMeta.seoTitle,
  description: handbookMeta.seoDescription,
  alternates: { canonical: url },
  openGraph: {
    type: "article",
    title: handbookMeta.title,
    description: handbookMeta.subtitle,
    url,
    publishedTime: handbookMeta.published,
    modifiedTime: handbookMeta.updated,
  },
  twitter: { card: "summary_large_image", title: handbookMeta.label, description: handbookMeta.subtitle },
};

const words = handbookWordCount();
const minutes = Math.round(words / 230);
const updated = new Date(handbookMeta.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const blocks: Record<string, () => ReactNode> = {
  comparison: StructureComparison,
  payments: PaymentSpread,
  phases: OnboardingPhases,
  checklist: RequirementsChecklist,
  faqs: Faqs,
};

function SectionBody({ body }: { body: string }) {
  return (
    <>
      {body.split(/^\{\{(\w+)\}\}$/m).map((part, i) => {
        if (i % 2 === 1) {
          const Block = blocks[part];
          return Block ? <Block key={i} /> : null;
        }
        return part.trim() ? <LongformMarkdown key={i}>{part}</LongformMarkdown> : null;
      })}
    </>
  );
}

export default function ProfitShareHandbookPage() {
  const toc = handbookSections.map((s) => ({ id: sectionId(s.number), number: s.number, label: s.title, badge: s.crossBorder ? "Cross-border" : undefined }));
  const whatsappHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent("Hi Jadeed — I've read the profit-share handbook and have a few questions.")}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: handbookMeta.title,
        description: handbookMeta.seoDescription,
        url,
        mainEntityOfPage: url,
        inLanguage: "en",
        wordCount: words,
        datePublished: handbookMeta.published,
        dateModified: handbookMeta.updated,
        author: { "@id": `${siteConfig.url}/#organization` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: handbookFaqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: plainText(f.answer).replace(/\s+/g, " ").trim() } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Pricing", item: `${siteConfig.url}/pricing` },
          { "@type": "ListItem", position: 3, name: handbookMeta.label, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing", href: "/pricing" }, { label: handbookMeta.label }]}
        eyebrow={<Pill>{handbookMeta.eyebrow}</Pill>}
        title={<>{handbookMeta.titleLead} <span className="text-[#eaf25a]">{handbookMeta.titleRest}</span></>}
        subtitle={handbookMeta.subtitle}
        stats={[
          [String(handbookSections.length), "sections"],
          [words.toLocaleString("en-GB"), "words"],
          [`${minutes} min`, "reading time"],
          ["A–D", "structures compared"],
        ]}
        actions={
          <>
            <HeroButton href={`#${sectionId(1)}`}>
              Start reading <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </HeroButton>
            <HeroButton href={`#${sectionId(17)}`} variant="outline">Jump to the checklist</HeroButton>
          </>
        }
        meta={<>By {siteConfig.name} · Updated {updated}</>}
      />

      <LongformBody contents={toc}>
        {handbookSections.map((section) => (
          <LongformSection
            key={section.number}
            id={sectionId(section.number)}
            label={`Section ${String(section.number).padStart(2, "0")}`}
            badge={section.crossBorder ? "Cross-border" : undefined}
            title={section.title}
          >
            <SectionBody body={section.body} />
          </LongformSection>
        ))}

        <AskPanel
          eyebrow="Before the second meeting"
          title="Questions about any of this? Ask us directly."
          text="If something here feels unreasonable for your business, say so now. It is far cheaper to find a mismatch before the agreement than eight months into it."
          whatsappHref={whatsappHref}
          email={siteConfig.email}
          emailSubject="Profit-share handbook question"
        />
        <p className="mt-8 border-t border-black/10 pt-6 text-sm text-black/50">{handbookMeta.disclaimer}</p>
      </LongformBody>
    </>
  );
}

function StructureComparison() {
  return (
    <div className="mt-7 overflow-x-auto rounded-2xl border border-black/10">
      <table className="w-full min-w-[720px] border-collapse text-[14px] leading-5">
        <caption className="sr-only">Structures A to D compared</caption>
        <thead>
          <tr>
            <td className="sticky left-0 z-10 w-[150px] bg-[#f3f1ec]" />
            {structures.map((s) => (
              <th key={s.key} scope="col" className={`px-3.5 py-3 text-left align-bottom ${s.recommended ? "bg-[#dceee8]" : "bg-[#f3f1ec]"}`}>
                {s.recommended && <span className="mb-1.5 block w-fit rounded-full bg-[#015f45] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Recommended</span>}
                <span className="block text-lg font-bold">{s.letter}</span>
                <span className="block text-xs font-semibold text-black/60">{s.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {structureComparison.map((row) => (
            <tr key={row.label} className="border-t border-black/10">
              <th scope="row" className="sticky left-0 z-10 bg-white px-3.5 py-3 text-left align-top text-[13px] font-semibold text-black/70">{row.label}</th>
              {structures.map((s) => (
                <td key={s.key} className={`px-3.5 py-3 align-top text-[#1d1d1b]/85 ${s.recommended ? "bg-[#eef6f2] font-medium" : ""}`}>{row.values[s.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PaymentSpread() {
  const max = Math.max(...paymentSpread.map((p) => p.value));
  const min = Math.min(...paymentSpread.map((p) => p.value));
  return (
    <figure className="mt-7 rounded-2xl border border-black/10 p-5 sm:p-6">
      <figcaption className="text-sm font-bold">Same business, same year: three possible payments</figcaption>
      <ul className="mt-5 space-y-4">
        {paymentSpread.map((p) => (
          <li key={p.label}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="text-black/65">{p.label}</span>
              <span className="font-bold tabular-nums">{p.value.toLocaleString("en-GB")}</span>
            </div>
            <div className="mt-1.5 h-3 rounded-[4px] bg-[#f3f1ec]">
              <div className="h-full min-w-[3px] rounded-[4px] bg-[#015f45]" style={{ width: `${(p.value / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-black/50">The largest is {Math.round(max / min)}× the smallest. Figures from the table above.</p>
    </figure>
  );
}

function OnboardingPhases() {
  return (
    <ol className="mt-8">
      {onboardingPhases.map((phase, i) => (
        <li key={phase.phase} className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-4 pb-9 last:pb-0 sm:gap-5">
          {i < onboardingPhases.length - 1 && <span className="absolute bottom-0 left-[19px] top-11 w-px bg-black/10" aria-hidden="true" />}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#015f45] text-sm font-bold text-white">{phase.phase}</span>
          <div className="pt-1.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <h3 className="text-[19px] font-bold tracking-[-.02em]">Phase {phase.phase} — {phase.title}</h3>
              {phase.when && <span className="rounded-full bg-[#f3f1ec] px-2.5 py-0.5 text-xs font-semibold text-black/60">{phase.when}</span>}
            </div>
            <div className="mt-3">
              <LongformMarkdown>{phase.body}</LongformMarkdown>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Faqs() {
  return (
    <dl className="divide-y divide-black/10 border-y border-black/10">
      {handbookFaqs.map((faq) => (
        <div key={faq.question} className="py-6">
          <dt className="text-[18px] font-bold tracking-[-.015em]">{faq.question}</dt>
          <dd className="mt-2.5">
            <LongformMarkdown>{faq.answer}</LongformMarkdown>
          </dd>
        </div>
      ))}
    </dl>
  );
}
