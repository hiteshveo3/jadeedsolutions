import { ClientEvidence } from "@/components/site/ClientEvidence";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { alphaMoversFaqs, alphaMoversSections } from "@/lib/alpha-movers-longform";
import { FaqCards } from "@/components/site/ui";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/site";
import { HugeiconsIcon, ArrowRightIcon, CheckCircleIcon, CheckIcon, TrendingUpIcon, SearchIcon, GlobeIcon, PlusIcon, MonitorIcon, SmartphoneIcon, InstagramIcon, MegaphoneIcon, ZapIcon } from "@/components/icons";
import { ClicksChart } from "@/components/jadeed/blocks";
import { EvidenceTabs } from "@/components/jadeed/interactive";

export function generateStaticParams() {
  return publishedCaseStudies().map((c) => ({ slug: c.id }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  if (study.id !== "alpha-movers") return { title: `${study.client} SEO & Website Case Study`, description: study.summary, alternates: { canonical: `${siteConfig.url}/case-studies/${study.id}` } };
  const title = "Alpha Movers SEO Case Study: 90+ Booked Jobs in 3 Months";
  const description = "An evidence-led Alpha Movers SEO case study. July–October 2026: 90+ booked jobs and 150+ website enquiries. Search Console captured 19 October: 885 organic clicks and 273K impressions over three months, plus the full six-month Search Console analysis.";
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
  ["90+", "booked jobs", "from the website · Jul–Oct 2026"],
  ["150+", "website enquiries", "Jul–Oct 2026"],
  ["273K", "search impressions", "last 3 months · captured 19 Oct 2026"],
  ["885", "organic clicks", "last 3 months · captured 19 Oct 2026"],
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

const built = [
  [MonitorIcon, "Website — built and launched December 2025"],
  [SmartphoneIcon, "Mobile app — proposed and shipped"],
  [SearchIcon, "SEO and local SEO — service and area pages"],
  [InstagramIcon, "Social — profiles and regular posts"],
  [MegaphoneIcon, "Paid ads — Google and Meta"],
  [ZapIcon, "A new service — sofa and furniture hoisting pages"],
] as const;

const evidence = [
  { label: "Last 3 months", src: "/case-studies/alpha-movers/gsc-3-months-19-oct-2026.webp", caption: "Google Search Console · Captured 19 Oct 2026 · last 3 months: 885 clicks, 273K impressions", width: 1902, height: 865 },
  { label: "6 months", src: "/case-studies/alpha-movers/gsc-6-months-oct-2026.webp", caption: "Google Search Console · last 6 months · 4 Oct 2026: 930 clicks, 285K impressions", width: 1918, height: 883 },
  { label: "28 days", src: "/case-studies/alpha-movers/gsc-28-days-oct-2026.webp", caption: "Google Search Console · last 28 days · 4 Oct 2026: 273 clicks, 83.2K impressions", width: 1918, height: 877 },
  { label: "7 days", src: "/case-studies/alpha-movers/gsc-7-days.png", caption: "Google Search Console · last 7 days", width: 1918, height: 882 },
] as const;

export default async function CaseStudyPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const study = getCaseStudy(params.slug);
  if (!study) notFound();
  if (study.id !== "alpha-movers") return <ClientEvidence study={study} />;
  const author = getAuthor();

  const articleUrl = `${siteConfig.url}/case-studies/alpha-movers`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${articleUrl}/#article`,
        headline: "Alpha Movers SEO Case Study: 90+ Booked Jobs in 3 Months",
        description: "Evidence-led analysis of Alpha Movers organic search growth and website bookings, using Google Search Console exports.",
        datePublished: "2026-08-25",
        dateModified: "2026-10-04",
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
    <article className="bg-transparent text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="bg-glow pb-16 pt-32 text-white sm:pb-24 sm:pt-36">
        <div className="container max-w-[1180px]">
          <nav aria-label="Breadcrumb" className="text-[13px]"><ol className="flex flex-wrap items-center gap-1.5"><li><Link href="/" className="inline-flex h-7 items-center rounded-full border border-white/[0.08] bg-white/[0.06] px-3 font-semibold text-white/80 hover:text-white">Home</Link></li><li aria-hidden="true" className="text-white/35">/</li><li><Link href="/portfolio" className="inline-flex h-7 items-center rounded-full border border-white/[0.08] bg-white/[0.06] px-3 font-semibold text-white/80 hover:text-white">Case studies</Link></li><li aria-hidden="true" className="text-white/35">/</li><li><span aria-current="page" className="inline-flex h-7 items-center rounded-full bg-[#BEF70A] px-3 font-bold text-[#0B1F12]">Alpha Movers</span></li></ol></nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <div className="inline-flex rounded-full bg-[#BEF70A] px-3 py-1 text-xs font-extrabold uppercase tracking-[.14em] text-[#0B1F12]">Verified Google Search Console study</div>
              <h1 className="mt-5 max-w-4xl font-sans text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">How Alpha Movers turned search into <span className="text-[#BEF70A]">90+ booked jobs</span> in three months</h1>
            </div>
            <div>
              <p className="text-lg leading-8 text-white/75">A transparent, AI-first SEO case study covering strategy, data, limitations and the next growth cycle for a London removals business.</p>
              <div className="mt-6 flex items-center gap-3">
                <Image src={author.avatar} alt={author.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                <div><Link href={`/author/${author.slug}`} className="font-bold hover:text-[#BEF70A]">{author.name}</Link><div className="text-sm text-white/60">Founder & CEO, Jadeed Solutions · Updated 13 Sep 2026</div></div>
              </div>
            </div>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-8 border-t border-white/[0.08] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {headlineMetrics.map(([value, label, note]) => <div key={label}><div className="text-5xl font-semibold tracking-[-.05em] text-[#BEF70A]">{value}</div><div className="mt-2 font-bold">{label}</div><div className="mt-1 text-xs text-white/55">{note}</div></div>)}
          </div>
        </div>
      </header>

      <section aria-labelledby="built-heading" className="container max-w-[1180px] pt-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Not just “SEO”</p>
            <h2 id="built-heading" className="mt-2 text-3xl tracking-[-.03em]">One partner built the whole system.</h2>
            <ol className="mt-6 grid gap-2">
              {built.map(([icon, label]) => (
                <li key={label} className="flex items-center gap-3 py-1"><span className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.08] text-[#BEF70A]"><HugeiconsIcon icon={icon} size={18} /></span><span className="font-semibold">{label}</span></li>
              ))}
              <li className="mt-2 flex items-center gap-3 rounded-full border-[1.5px] border-[#BEF70A] px-4 py-2.5"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]"><HugeiconsIcon icon={CheckIcon} size={13} /></span><span className="font-bold">90+ booked jobs in three months</span></li>
            </ol>
          </div>
          <div className="flex flex-col rounded-[26px] border border-white/[0.08] bg-glow p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Google clicks</p>
            <p className="mt-2 text-3xl font-bold tracking-[-.03em]">Up and to the right.</p>
            <div className="mt-auto pt-6"><ClicksChart badge="+312% clicks" source="Historical: first vs final 28 days · Feb–Aug 2026 · Alpha Movers" /></div>
          </div>
        </div>
        <div className="mt-4 rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-5 sm:p-7">
          <EvidenceTabs items={evidence} />
        </div>
      </section>

      <div className="container max-w-[1180px] py-12 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-white/[0.08] bg-transparent p-5 md:rounded-[22px]">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#BEF70A]">On this page</p>
              <ol className="mt-4 space-y-2 text-sm leading-5 text-white/68">{alphaMoversSections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} className="flex gap-2 hover:text-[#BEF70A]"><span className="text-white/38">{String(index + 1).padStart(2, "0")}</span><span>{section.title}</span></a></li>)}</ol>
              <div className="mt-6 border-t border-white/[0.08] pt-5"><a href={study.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#BEF70A]">Visit Alpha Movers <HugeiconsIcon icon={ArrowRightIcon} size={16} /></a></div>
            </div>
          </aside>

          <div className="min-w-0">
            <section className="bg-white/[0.07] p-6 sm:p-8 md:rounded-[26px]" aria-labelledby="data-note">
              <h2 id="data-note" className="text-2xl font-bold tracking-[-.025em]">Data scope and claim boundary</h2>
              <p className="mt-3 leading-7 text-white/73">The source workbooks verify Google Web Search clicks, impressions, CTR and average position. They do not contain calls, form submissions, bookings or revenue. The October 2026 update adds website enquiries (150+) and booked jobs (90+) for July–October 2026, which are tracked separately from Search Console. The three-month screenshot above was captured on 19 October 2026; the six-month and 28-day windows are from 4 October 2026. The detailed analysis below covers the historical 24 February–23 August export.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3"><DataBadge icon={CheckCircleIcon} title="Source" text="Search Console + booking records" /><DataBadge icon={TrendingUpIcon} title="Period" text="Latest capture: 19 Oct 2026" /><DataBadge icon={GlobeIcon} title="Primary market" text="United Kingdom" /></div>
            </section>

            {alphaMoversSections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-white/[0.08] py-11 sm:py-14">
                <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#BEF70A]">{String(index + 1).padStart(2, "0")} · Alpha Movers SEO case study</p>
                <h2 className="mt-3 font-sans text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">{section.title}</h2>
                <div className="mt-6 rounded-[20px] bg-[#BEF70A]/[0.07] px-5 py-4 text-lg font-semibold leading-7">{section.answer}</div>
                <div className="mt-7 space-y-6 text-[17px] leading-8 text-white/78">{section.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}</div>
                {section.bullets && <ul className="mt-7 grid gap-3 sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 rounded-xl bg-white/[0.05] p-4 text-sm leading-6"><HugeiconsIcon icon={CheckCircleIcon} size={19} className="mt-0.5 shrink-0 text-[#BEF70A]" />{bullet}</li>)}</ul>}
                {section.id === "growth-curve" && <DataTable title="Monthly Google Search performance" headers={["Period", "Clicks", "Impressions", "CTR", "Avg. position"]} rows={monthRows} />}
                {section.id === "query-results" && <DataTable title="Selected high-value queries — six-month export" headers={["Query", "Clicks", "Impressions", "CTR", "Position"]} rows={queryRows} />}
              </section>
            ))}

            <section className="py-12" aria-labelledby="case-faqs">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#BEF70A]">Answer engine summary</p>
              <h2 id="case-faqs" className="mt-3 font-sans text-4xl font-semibold tracking-[-.04em]">Alpha Movers SEO FAQs</h2>
              <div className="mt-7"><FaqCards items={alphaMoversFaqs.map(([question, answer]) => ({ question, answer }))} /></div>
            </section>

            <section className="bg-transparent p-7 text-white sm:p-10 md:rounded-[28px]">
              <div className="grid gap-7 sm:grid-cols-[auto_1fr] sm:items-center">
                <Image src={author.avatar} alt={`${author.name}, Founder and CEO of Jadeed Solutions`} width={120} height={120} className="h-28 w-28 rounded-[24px] object-cover" />
                <div><p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#BEF70A]">Analysis by</p><h2 className="mt-2 text-3xl font-bold">{author.name}</h2><p className="mt-2 text-white/70">{author.bio}</p><div className="mt-5 flex flex-wrap gap-3"><Link href={`/author/${author.slug}`} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0B1F12]">View founder profile</Link><a href="https://pk.linkedin.com/in/sameer-ahmad-basra" target="_blank" rel="noreferrer" className="rounded-xl bg-[#BEF70A] px-5 py-3 text-sm font-bold text-[#0B1F12]">LinkedIn profile</a></div></div>
              </div>
            </section>

            <section className="mt-8 bg-white/[0.07] p-7 sm:p-10 md:rounded-[28px]"><h2 className="text-3xl font-bold tracking-[-.035em]">Want an evidence-led growth plan for your service business?</h2><p className="mt-3 max-w-2xl leading-7 text-white/73">We will review your search footprint, website architecture, conversion path and measurement gaps—then show you the clearest next actions.</p><Link href="/contact" className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-[#BEF70A] px-5 py-3 font-bold hover:bg-[#ABDE09]">Get a free growth plan <HugeiconsIcon icon={ArrowRightIcon} size={18} className="transition-transform group-hover:translate-x-1" /></Link></section>
          </div>
        </div>
      </div>
    </article>
  );
}

function DataBadge({ icon, title, text }: { icon: Parameters<typeof HugeiconsIcon>[0]["icon"]; title: string; text: string }) {
  return <div className="rounded-xl bg-white/[0.05] p-4"><HugeiconsIcon icon={icon} size={20} className="text-[#BEF70A]" /><div className="mt-3 text-xs font-bold uppercase tracking-wider text-white/48">{title}</div><div className="mt-1 text-sm font-bold">{text}</div></div>;
}

function DataTable({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="mt-8"><p className="font-bold">{title}</p><div className="jt-wrap mt-3"><table className="jt min-w-[640px]"><thead><tr>{headers.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={`${row[0]}-${i}`} className={i === 0 ? "" : "tabular-nums"}>{cell}</td>)}</tr>)}</tbody></table></div></div>;
}
