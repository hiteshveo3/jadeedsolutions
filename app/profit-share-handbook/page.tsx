import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { HugeiconsIcon, ArrowRightIcon, WhatsappIcon, MailIcon } from "@/components/icons";
import { HandbookMarkdown } from "@/components/handbook/HandbookMarkdown";
import { HandbookProgress, HandbookToc } from "@/components/handbook/HandbookNav";
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
        return part.trim() ? <HandbookMarkdown key={i}>{part}</HandbookMarkdown> : null;
      })}
    </>
  );
}

export default function ProfitShareHandbookPage() {
  const toc = handbookSections.map((s) => ({ id: sectionId(s.number), number: s.number, title: s.title, crossBorder: s.crossBorder }));
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
    <div className="bg-white text-[#111]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HandbookProgress />

      <header className="relative overflow-hidden bg-[#015f45] pb-14 pt-[128px] text-white sm:pb-20 sm:pt-[156px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        <div className="container relative max-w-[1200px]">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/85">{handbookMeta.label}</li>
            </ol>
          </nav>

          <p className="mt-8 inline-flex rounded-full bg-[#cbd810] px-3 py-1 text-[11px] font-bold uppercase tracking-[.14em] text-[#063d30]">{handbookMeta.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-balance text-[34px] font-semibold leading-[1.05] tracking-[-.045em] sm:text-5xl lg:text-[56px]">
            {handbookMeta.titleLead} <span className="text-[#eaf25a]">{handbookMeta.titleRest}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-7 text-white/80">{handbookMeta.subtitle}</p>

          <dl className="mt-9 grid max-w-3xl grid-cols-2 overflow-hidden rounded-2xl border border-white/20 bg-[#014f39]/60 sm:grid-cols-4">
            {[
              [String(handbookSections.length), "sections"],
              [words.toLocaleString("en-GB"), "words"],
              [`${minutes} min`, "reading time"],
              ["A–D", "structures compared"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse border-white/15 px-5 py-4 [&:nth-child(-n+2)]:border-b [&:nth-child(odd)]:border-r sm:[&:not(:last-child)]:border-r sm:[&:nth-child(-n+2)]:border-b-0">
                <dt className="text-xs text-white/65">{label}</dt>
                <dd className="text-xl font-bold tracking-tight">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={`#${sectionId(1)}`} className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#cbd810] px-5 text-sm font-semibold text-[#111] transition-colors hover:bg-[#b8c50e]">
              Start reading <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href={`#${sectionId(17)}`} className="inline-flex h-12 items-center justify-center rounded-xl border border-white/35 px-5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">
              Jump to the checklist
            </a>
            <span className="text-sm text-white/60 sm:ml-3">By {siteConfig.name} · Updated {updated}</span>
          </div>
        </div>
      </header>

      <div className="container max-w-[1200px] py-12 sm:py-16 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 lg:py-20 xl:gap-20">
        <aside className="hidden lg:block">
          <HandbookToc items={toc} />
        </aside>

        <article className="min-w-0 max-w-[760px]">
          <details className="group mb-10 rounded-2xl border border-black/10 bg-[#f7f5ef] lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
              Contents · {handbookSections.length} sections
              <span className="text-lg leading-none text-[#015f45] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <ol className="space-y-1 border-t border-black/10 px-5 py-4 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="flex gap-2.5 py-1 text-black/70 hover:text-[#015f45]">
                    <span className="w-5 shrink-0 tabular-nums text-black/35">{item.number}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </details>

          {handbookSections.map((section) => {
            const id = sectionId(section.number);
            return (
              <section key={id} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-black/10 pt-12 first-of-type:border-t-0 first-of-type:pt-0 [&+section]:mt-14">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">
                  <span>Section {String(section.number).padStart(2, "0")}</span>
                  {section.crossBorder && <span className="rounded-full bg-[#cbd810] px-2.5 py-0.5 text-[10px] tracking-[.12em] text-[#063d30]">Cross-border</span>}
                </div>
                <h2 id={`${id}-title`} className="mt-3 text-balance text-[28px] font-semibold leading-[1.1] tracking-[-.035em] sm:text-[36px]">{section.title}</h2>
                <div className="mt-6">
                  <SectionBody body={section.body} />
                </div>
              </section>
            );
          })}

          <aside className="mt-14 rounded-[24px] bg-[#015f45] p-6 text-white sm:p-8" aria-labelledby="handbook-next">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#eaf25a]">Before the second meeting</p>
            <h2 id="handbook-next" className="mt-3 text-2xl font-semibold tracking-[-.03em] sm:text-3xl">Questions about any of this? Ask us directly.</h2>
            <p className="mt-3 max-w-xl leading-7 text-white/75">If something here feels unreasonable for your business, say so now. It is far cheaper to find a mismatch before the agreement than eight months into it.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#cbd810] px-5 text-sm font-bold text-[#111] transition-colors hover:bg-[#b8c50e]">
                <HugeiconsIcon icon={WhatsappIcon} size={18} aria-hidden="true" /> WhatsApp us
              </a>
              <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Profit-share handbook question")}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/35 px-5 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10">
                <HugeiconsIcon icon={MailIcon} size={18} aria-hidden="true" /> {siteConfig.email}
              </a>
            </div>
          </aside>

          <p className="mt-8 border-t border-black/10 pt-6 text-sm text-black/50">{handbookMeta.disclaimer}</p>
        </article>
      </div>
    </div>
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
              <HandbookMarkdown>{phase.body}</HandbookMarkdown>
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
            <HandbookMarkdown>{faq.answer}</HandbookMarkdown>
          </dd>
        </div>
      ))}
    </dl>
  );
}
