import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { alphaMoversFaqs, alphaMoversSections } from "@/lib/alpha-movers-longform";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/site";
import { HugeiconsIcon, ArrowRightIcon, CheckCircleIcon, TrendingUpIcon, SearchIcon, GlobeIcon } from "@/components/icons";

export function generateStaticParams() {
  return publishedCaseStudies().map((c) => ({ slug: c.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  const title = "Alpha Movers SEO Case Study: 160,903 Impressions in 6 Months";
  const description = "An evidence-led, 5,000+ word Alpha Movers SEO case study using Google Search Console data: 630 clicks, 160,903 impressions and 312% click growth between matched 28-day periods.";
  return {
    title,
    description,
    keywords: ["Alpha Movers SEO case study", "removals company SEO", "local SEO case study UK", "Google Search Console case study", "AI-first SEO", "Jadeed Solutions"],
    alternates: { canonical: `${siteConfig.url}/case-studies/${study.id}` },
    openGraph: { type: "article", title, description, url: `${siteConfig.url}/case-studies/${study.id}`, images: [{ url: "/performance-marketing-local-businesses.webp", width: 1920, height: 840 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/performance-marketing-local-businesses.webp"] },
  };
}

const headlineMetrics = [
  ["630", "organic clicks", "24 Feb–23 Aug 2026"],
  ["160,903", "search impressions", "six-month export"],
  ["272", "clicks in final 28 days", "vs 66 in first 28 days"],
  ["96,301", "final 28-day impressions", "vs 4,476 in first 28 days"],
] as const;

const monthRows = [
  ["Feb 24–28", "1", "382", "0.26%", "53.23"],
  ["March", "84", "5,843", "1.44%", "37.08"],
  ["April", "35", "6,920", "0.51%", "40.64"],
  ["May", "41", "8,873", "0.46%", "33.40"],
  ["June", "65", "15,011", "0.43%", "25.96"],
  ["July", "170", "41,063", "0.41%", "30.36"],
  ["Aug 1–23", "234", "82,811", "0.28%", "21.99"],
] as const;

const queryRows = [
  ["alpha movers", "29", "212", "13.68%", "6.79"],
  ["single item transport", "9", "37", "24.32%", "5.51"],
  ["sofa hoisting experts", "6", "800", "0.75%", "4.20"],
  ["alpha movers reviews", "5", "89", "5.62%", "3.89"],
  ["furniture hoist hire prices", "4", "183", "2.19%", "4.42"],
  ["piano movers croydon", "4", "11", "36.36%", "4.91"],
  ["removals stratford", "3", "841", "0.36%", "27.24"],
  ["moving crate hire london", "3", "697", "0.43%", "21.16"],
] as const;

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study || study.id !== "alpha-movers") notFound();
  const author = getAuthor();

  const articleUrl = `${siteConfig.url}/case-studies/alpha-movers`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${articleUrl}/#article`,
        headline: "Alpha Movers SEO Case Study: 160,903 Impressions in 6 Months",
        description: "Evidence-led analysis of Alpha Movers organic search growth using Google Search Console exports.",
        datePublished: "2026-08-25",
        dateModified: "2026-08-25",
        mainEntityOfPage: articleUrl,
        author: { "@type": "Person", "@id": `${siteConfig.url}/author/sameer-ahmad-basra/#person`, name: author.name, url: `${siteConfig.url}/author/${author.slug}` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
        about: [{ "@type": "Organization", name: "Alpha Movers", url: study.website }, { "@type": "Thing", name: "Local SEO" }],
      },
      {
        "@type": "Dataset",
        name: "Alpha Movers Google Search performance — 24 February to 23 August 2026",
        description: "Aggregated metrics derived from Google Search Console Web search exports supplied on 25 August 2026.",
        temporalCoverage: "2026-02-24/2026-08-23",
        creator: { "@id": `${siteConfig.url}/#organization` },
        variableMeasured: ["Clicks", "Impressions", "CTR", "Average position"],
      },
      {
        "@type": "FAQPage",
        mainEntity: alphaMoversFaqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Case studies", item: `${siteConfig.url}/portfolio` },
          { "@type": "ListItem", position: 3, name: "Alpha Movers SEO case study", item: articleUrl },
        ],
      },
    ],
  };

  return (
    <article className="bg-[#f7f5ef] text-[#111]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="bg-[#015f45] pb-16 pt-32 text-white sm:pb-24 sm:pt-36">
        <div className="container max-w-[1180px]">
          <nav aria-label="Breadcrumb" className="text-sm text-white/65"><Link href="/" className="hover:text-white">Home</Link> / <Link href="/portfolio" className="hover:text-white">Case studies</Link> / <span className="text-white">Alpha Movers</span></nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <div className="inline-flex rounded-full bg-[#cbd810] px-3 py-1 text-xs font-extrabold uppercase tracking-[.14em] text-black">Verified Google Search Console study</div>
              <h1 className="mt-5 max-w-4xl font-sans text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">How Alpha Movers reached <span className="text-[#eaf25a]">160,903 search impressions</span> in six months</h1>
            </div>
            <div>
              <p className="text-lg leading-8 text-white/75">A transparent, AI-first SEO case study covering strategy, data, limitations and the next growth cycle for a London removals business.</p>
              <div className="mt-6 flex items-center gap-3">
                <Image src={author.avatar} alt={author.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                <div><Link href={`/author/${author.slug}`} className="font-bold hover:text-[#eaf25a]">{author.name}</Link><div className="text-sm text-white/60">Founder & CEO, Jadeed Solutions · 25 Aug 2026</div></div>
              </div>
            </div>
          </div>
          <div className="mt-12 grid overflow-hidden rounded-[24px] border border-white/15 bg-[#014f39] sm:grid-cols-2 lg:grid-cols-4">
            {headlineMetrics.map(([value, label, note]) => <div key={label} className="border-white/10 p-6 [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-b-0 lg:[&:not(:last-child)]:border-r"><div className="text-4xl font-bold tracking-[-.04em] text-[#eaf25a]">{value}</div><div className="mt-2 font-bold">{label}</div><div className="mt-1 text-xs text-white/55">{note}</div></div>)}
          </div>
        </div>
      </header>

      <div className="container max-w-[1180px] py-12 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[22px] border border-black/10 bg-white p-5">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#015f45]">On this page</p>
              <ol className="mt-4 space-y-2 text-sm leading-5 text-black/60">{alphaMoversSections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} className="flex gap-2 hover:text-[#015f45]"><span className="text-black/30">{String(index + 1).padStart(2, "0")}</span><span>{section.title}</span></a></li>)}</ol>
              <div className="mt-6 border-t border-black/10 pt-5"><a href={study.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#015f45]">Visit Alpha Movers <HugeiconsIcon icon={ArrowRightIcon} size={16} /></a></div>
            </div>
          </aside>

          <div className="min-w-0">
            <section className="rounded-[26px] bg-[#dceee8] p-6 sm:p-8" aria-labelledby="data-note">
              <h2 id="data-note" className="text-2xl font-bold tracking-[-.025em]">Data scope and claim boundary</h2>
              <p className="mt-3 leading-7 text-black/65">The source workbooks verify Google Web Search clicks, impressions, CTR and average position. They do not contain calls, form submissions, bookings or revenue. This study therefore reports search performance as verified and labels commercial interpretation separately.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3"><DataBadge icon={CheckCircleIcon} title="Source" text="Google Search Console exports" /><DataBadge icon={TrendingUpIcon} title="Period" text="24 Feb–23 Aug 2026" /><DataBadge icon={GlobeIcon} title="Primary market" text="United Kingdom" /></div>
            </section>

            {alphaMoversSections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-black/10 py-11 sm:py-14">
                <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#015f45]">{String(index + 1).padStart(2, "0")} · Alpha Movers SEO case study</p>
                <h2 className="mt-3 font-sans text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">{section.title}</h2>
                <div className="mt-6 rounded-r-2xl border-l-4 border-[#cbd810] bg-white px-5 py-4 text-lg font-semibold leading-7">{section.answer}</div>
                <div className="mt-7 space-y-6 text-[17px] leading-8 text-black/70">{section.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}</div>
                {section.bullets && <ul className="mt-7 grid gap-3 sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-6"><HugeiconsIcon icon={CheckCircleIcon} size={19} className="mt-0.5 shrink-0 text-[#015f45]" />{bullet}</li>)}</ul>}
                {section.id === "growth-curve" && <DataTable title="Monthly Google Search performance" headers={["Period", "Clicks", "Impressions", "CTR", "Avg. position"]} rows={monthRows} />}
                {section.id === "query-results" && <DataTable title="Selected high-value queries — six-month export" headers={["Query", "Clicks", "Impressions", "CTR", "Position"]} rows={queryRows} />}
              </section>
            ))}

            <section className="py-12" aria-labelledby="case-faqs">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#015f45]">Answer engine summary</p>
              <h2 id="case-faqs" className="mt-3 font-sans text-4xl font-semibold tracking-[-.04em]">Alpha Movers SEO FAQs</h2>
              <div className="mt-7 divide-y divide-black/10 border-y border-black/10">{alphaMoversFaqs.map(([q, a], index) => <details key={q} className="group py-5" open={index === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold"><span>{q}</span><span className="text-xl text-[#015f45] group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-4 leading-7 text-black/65">{a}</p></details>)}</div>
            </section>

            <section className="rounded-[28px] bg-[#015f45] p-7 text-white sm:p-10">
              <div className="grid gap-7 sm:grid-cols-[auto_1fr] sm:items-center">
                <Image src={author.avatar} alt={`${author.name}, Founder and CEO of Jadeed Solutions`} width={120} height={120} className="h-28 w-28 rounded-[24px] object-cover" />
                <div><p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#eaf25a]">Analysis by</p><h2 className="mt-2 text-3xl font-bold">{author.name}</h2><p className="mt-2 text-white/70">{author.bio}</p><div className="mt-5 flex flex-wrap gap-3"><Link href={`/author/${author.slug}`} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black">View founder profile</Link><a href="https://pk.linkedin.com/in/sameer-ahmad-basra" target="_blank" rel="noreferrer" className="rounded-xl bg-[#cbd810] px-5 py-3 text-sm font-bold text-black">LinkedIn profile</a></div></div>
              </div>
            </section>

            <section className="mt-8 rounded-[28px] bg-[#dceee8] p-7 sm:p-10"><h2 className="text-3xl font-bold tracking-[-.035em]">Want an evidence-led growth plan for your service business?</h2><p className="mt-3 max-w-2xl leading-7 text-black/65">We will review your search footprint, website architecture, conversion path and measurement gaps—then show you the clearest next actions.</p><Link href="/contact" className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-[#cbd810] px-5 py-3 font-bold hover:bg-[#b8c50e]">Get a free growth plan <HugeiconsIcon icon={ArrowRightIcon} size={18} className="transition-transform group-hover:translate-x-1" /></Link></section>
          </div>
        </div>
      </div>
    </article>
  );
}

function DataBadge({ icon, title, text }: { icon: Parameters<typeof HugeiconsIcon>[0]["icon"]; title: string; text: string }) {
  return <div className="rounded-xl bg-white p-4"><HugeiconsIcon icon={icon} size={20} className="text-[#015f45]" /><div className="mt-3 text-xs font-bold uppercase tracking-wider text-black/40">{title}</div><div className="mt-1 text-sm font-bold">{text}</div></div>;
}

function DataTable({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="mt-8 overflow-hidden rounded-[20px] border border-black/10 bg-white"><div className="border-b border-black/10 px-5 py-4 font-bold">{title}</div><div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-[#e7f1ed] text-[#015f45]"><tr>{headers.map(h => <th key={h} className="px-5 py-3 font-bold">{h}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-t border-black/5">{row.map((cell, i) => <td key={`${row[0]}-${i}`} className={`px-5 py-3 ${i === 0 ? "font-semibold" : "tabular-nums text-black/60"}`}>{cell}</td>)}</tr>)}</tbody></table></div></div>;
}
