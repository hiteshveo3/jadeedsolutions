import { posts } from "@/lib/blog";
import { pricingFaqs } from "@/lib/pricing-faqs";
import { caseStudies } from "@/lib/case-studies";
import { comparisons } from "@/lib/comparisons";
import { guides } from "@/lib/guides";
import { industries } from "@/lib/industries";
import { goodFit, notResults, partnership, partnershipCopy, partnershipTerms } from "@/lib/partnership";
import { googleAggregate } from "@/lib/reviews";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

/**
 * What the site knows, in one index (server only). Built from the same data the pages
 * use, so the search box and Jadeed AI can't drift from what the pages say.
 * No vector database: a small BM25 keyword search picks the passages for each query.
 */

export type SearchGroup = "Pages" | "Pricing" | "Services" | "Industries" | "Guides" | "Blog" | "Compare" | "FAQ";

export type KnowledgeDoc = {
  id: string;
  title: string;
  /** Site path the passage comes from. */
  path: string;
  group: SearchGroup;
  /** One line for search results. */
  summary: string;
  /** What the AI reads. */
  text: string;
  /** Extra words people use for this topic — searched, never shown. */
  tags?: string;
};

/** What the browser gets for the search box — no long text. */
export type SearchItem = Pick<KnowledgeDoc, "title" | "path" | "group" | "summary"> & { keywords: string };

const strip = (md: string) =>
  md
    .replace(/\{\{\w+\}\}/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|]/g, " ")
    .replace(/:?-{3,}:?/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const join = (...parts: (string | false | undefined | null)[]) => parts.filter(Boolean).join(" ");
const cut = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).replace(/\s+\S*$/, "")}…` : s);

const FIXED = "Fixed plans: local SEO from £300 a month with no setup fee and a 6-month minimum; websites from £199; apps and paid ads are quoted up front. Ad spend is paid by the client straight to Google or Meta, never marked up.";

function coreDocs(): KnowledgeDoc[] {
  const fee = partnership.feePercent;
  return [
    {
      id: "home",
      title: "Jadeed Solutions",
      path: "/",
      group: "Pages",
      summary: siteConfig.tagline,
      text: join(siteConfig.description, `A remote team in Narowal, Pakistan, working with clients in the UK, US, Canada and UAE.`, `Rated ${googleAggregate.score} on Google ${googleAggregate.label}. Around 10 active clients.`),
    },
    {
      id: "pricing",
      tags: "price prices cost costs how much fee fees monthly plan plans package packages cheap expensive",
      title: "Pricing",
      path: "/pricing",
      group: "Pricing",
      summary: "Fixed plans, or the Growth Partnership: £0 upfront and 10% of paid jobs.",
      text: join(FIXED, `Growth Partnership: ${partnershipCopy.oneLiner}`, partnershipCopy.upfront, partnershipCopy.percentageRule, partnershipCopy.flatRate),
    },
    {
      id: "partnership-terms",
      tags: "terms conditions contract agreement fine print percentage commission revenue share",
      title: "Growth Partnership terms",
      path: "/pricing",
      group: "Pricing",
      summary: `${fee}% of a paid invoice, ${partnershipCopy.termShort}.`,
      text: partnershipTerms.join(" "),
    },
    {
      id: "result",
      tags: "result results pay paid charge charged lead leads call calls click clicks booking bookings",
      title: "What counts as a result",
      path: "/pricing",
      group: "Pricing",
      summary: "A completed job your customer paid for — nothing less.",
      text: join(`A result needs all three: the customer came through Jadeed, the work was completed, and the customer paid.`, `${notResults.join(", ")} are never results on their own.`, partnershipCopy.whatIsFree),
    },
    {
      id: "term",
      tags: "cancel cancellation leave leaving exit notice contract length minimum commitment months lock",
      title: "Term, notice and leaving",
      path: "/pricing",
      group: "Pricing",
      summary: partnershipCopy.termShort,
      text: join(partnershipCopy.commitment, "Fixed SEO plans have a 6-month minimum."),
    },
    {
      id: "attribution",
      tags: "existing customers old customers repeat returning referral referrals refund refunds chargeback",
      title: "Attribution, existing and repeat customers",
      path: "/pricing",
      group: "Pricing",
      summary: "Which customers count — and which never do.",
      text: join(partnershipCopy.attributionWindow, partnershipCopy.existingCustomers, partnershipCopy.repeatCustomers, partnershipCopy.refunds),
    },
    {
      id: "reporting",
      tags: "report reports reporting track tracking proof evidence bank statements invoices trust crm",
      title: "Reporting and trust",
      path: "/pricing",
      group: "Pricing",
      summary: "You mark what happened; your confirmation is the report.",
      text: join(partnershipCopy.tracking, partnershipCopy.trust, partnershipCopy.disputes, partnershipCopy.invoicing),
    },
    {
      id: "territory",
      tags: "competitor competitors competition exclusive exclusivity area areas city cities town postcode zip available availability open taken rival rivals",
      title: "Territory: one partner per trade, per area",
      path: "/pricing",
      group: "Pricing",
      summary: "Your area, agreed in writing.",
      text: join(partnershipCopy.territoryRule, "Whether your area is open is confirmed by the team after the free audit, within 24 hours.", partnershipCopy.territoryCooperation),
    },
    {
      id: "regulated",
      tags: "lawyer lawyers solicitor solicitors law firm attorney doctor dentist clinic clinics healthcare medical mortgage broker real estate finance",
      title: "Regulated professions",
      path: "/pricing",
      group: "Pricing",
      summary: "Lawyers, clinics and finance firms: custom proposals after legal review.",
      text: join(partnershipCopy.regulated, "Lawyers, healthcare providers, mortgage and settlement-service businesses receive a custom proposal only after qualified counsel checks the fee structure."),
    },
    {
      id: "ownership",
      tags: "own owner ownership domain website accounts google business profile hosting cloud ad spend",
      title: "Ownership and direct costs",
      path: "/pricing",
      group: "Pricing",
      summary: "Your domain, website and accounts stay in your name.",
      text: join(partnershipCopy.ownership, partnershipCopy.directCosts),
    },
    {
      id: "fit",
      tags: "fit suitable right for me qualify requirements who",
      title: "Is this a fit?",
      path: "/how-it-works",
      group: "Pages",
      summary: "Who the Growth Partnership works best for.",
      text: join(`Good fit: ${goodFit.join("; ")}.`, partnershipCopy.partnership),
    },
    {
      id: "how-it-works",
      title: "How it works",
      path: "/how-it-works",
      group: "Pages",
      summary: "Free audit, fix the foundations, grow visibility, report every month.",
      text: "Free growth plan and audit, with a reply within 24 hours. Then the foundations: Google Business Profile, tracking, mobile call routes and service pages. Then visibility: content, reviews, genuine local pages and optional ads. Monthly reporting on enquiries and booked work.",
    },
    {
      id: "contact",
      tags: "contact phone whatsapp email call talk speak meet address book",
      title: "Contact Jadeed",
      path: "/contact",
      group: "Pages",
      summary: "WhatsApp, email or a free growth plan.",
      text: `WhatsApp or call ${siteConfig.phone}. Email ${siteConfig.email}. Address: ${siteConfig.address}. The free growth plan form is on the contact page; the team replies within 24 hours.`,
    },
    {
      id: "about",
      title: "About Jadeed Solutions",
      path: "/about",
      group: "Pages",
      summary: "A small, hands-on team led by Sameer Ahmad Basra.",
      text: "Founded in December 2024 by Sameer Ahmad Basra, who leads strategy, software, technical SEO and automation from Narowal, Punjab, Pakistan. A small remote team; no account managers or handoffs.",
    },
    {
      id: "handbook",
      title: "Profit-Share Handbook",
      path: "/profit-share-handbook",
      group: "Guides",
      summary: "Deal structures, attribution and what a percentage deal needs.",
      text: "The handbook explains the four deal structures (percentage of net profit, of gross revenue, of attributable revenue, or a reduced retainer plus a percentage), what counts as profit, attribution, documents, cross-border payment and disputes. The standard Growth Partnership is the attributable-revenue structure on paid invoices, with trust-based reporting.",
    },
  ];
}

function contentDocs(): KnowledgeDoc[] {
  const docs: KnowledgeDoc[] = [];
  pricingFaqs.forEach((f, i) => docs.push({ id: `pricing-faq-${i}`, title: f.q, path: "/pricing", group: "FAQ", summary: cut(f.a, 140), text: f.a }));
  for (const s of services) {
    const path = `/services/${s.slug}`;
    docs.push({ id: `service-${s.slug}`, title: s.title, path, group: "Services", summary: s.summary, tags: `${s.slug.replace(/-/g, " ")} ${s.category} ${s.priceLabel}`, text: join(s.summary, s.description, `Price: ${s.priceLabel}.`, `Included: ${s.included.join("; ")}.`, s.cost.paragraphs.join(" "), s.cost.note) });
    s.faqs.forEach((f, i) => docs.push({ id: `service-${s.slug}-faq-${i}`, title: f.question, path, group: "FAQ", summary: cut(strip(f.answer), 140), text: strip(f.answer) }));
  }
  for (const ind of industries) {
    const path = `/industries/${ind.slug}`;
    docs.push({ id: `industry-${ind.slug}`, title: ind.navLabel, path, group: "Industries", summary: cut(strip(ind.intro), 140), text: join(strip(ind.intro), ind.capabilities.map((c) => `${c.title}: ${c.text}`).join(" ")) });
    ind.faqs.forEach((f, i) => docs.push({ id: `industry-${ind.slug}-faq-${i}`, title: f.question, path, group: "FAQ", summary: cut(strip(f.answer), 140), text: strip(f.answer) }));
  }
  for (const g of guides) {
    const path = `/guides/${g.slug}`;
    docs.push({ id: `guide-${g.slug}`, title: g.title, path, group: "Guides", summary: cut(strip(g.intro), 140), text: strip(g.intro) });
    g.faqs.forEach((f, i) => docs.push({ id: `guide-${g.slug}-faq-${i}`, title: f.question, path, group: "FAQ", summary: cut(strip(f.answer), 140), text: strip(f.answer) }));
  }
  for (const c of comparisons) {
    const path = `/compare/${c.slug}`;
    docs.push({ id: `compare-${c.slug}`, title: c.navLabel, path, group: "Compare", summary: cut(strip(c.intro), 140), text: join(strip(c.verdict), c.table.map(([what, them, us]) => `${what}: ${c.competitorShort} — ${them}; Jadeed — ${us}.`).join(" ")) });
  }
  for (const study of caseStudies.filter((x) => !x.draft)) {
    docs.push({ id: `case-${study.id}`, title: `${study.client} case study`, path: `/case-studies/${study.id}`, group: "Pages", summary: cut(study.summary, 140), text: join(`${study.client}, ${study.industry}, ${study.location}.`, study.summary, study.metrics.map((m) => `${m.value} ${m.label}`).join("; "), study.highlights.join(" ")) });
  }
  for (const p of posts) {
    docs.push({ id: `post-${p.slug}`, title: p.title, path: `/blog/${p.slug}`, group: "Blog", summary: cut(p.excerpt, 140), text: p.excerpt });
  }
  return docs;
}

/* ------------------------------ BM25 ------------------------------ */

const STOP = new Set("a an and are as at be by can do does for from has have how i if in is it its me much my of on or our so that the their them then there this to us we what when where which who why will with you your yours".split(" "));
const tokens = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9£$%\s]/g, " ").split(/\s+/).filter((t) => t.length > 1 && !STOP.has(t));

type Index = { docs: KnowledgeDoc[]; tf: Map<string, number>[]; len: number[]; df: Map<string, number>; avg: number };
/* Built once per module load (a code change in dev rebuilds it). */
let cached: Index | null = null;

function index(): Index {
  if (cached) return cached;
  const docs = [...coreDocs(), ...contentDocs()];
  const df = new Map<string, number>();
  const tf = docs.map((d) => {
    const m = new Map<string, number>();
    // Titles count three times: a question that matches a heading is usually that page.
    for (const t of tokens(`${d.title} ${d.title} ${d.title} ${d.text} ${d.tags ?? ""} ${d.tags ?? ""}`)) m.set(t, (m.get(t) ?? 0) + 1);
    for (const t of m.keys()) df.set(t, (df.get(t) ?? 0) + 1);
    return m;
  });
  const len = tf.map((m) => [...m.values()].reduce((a, b) => a + b, 0));
  const built = { docs, tf, len, df, avg: len.reduce((a, b) => a + b, 0) / Math.max(1, len.length) };
  cached = built;
  return built;
}

export type Scored = { doc: KnowledgeDoc; score: number };

export function searchKnowledge(query: string, limit = 5): KnowledgeDoc[] {
  return searchScored(query, limit).map((s) => s.doc);
}

export function searchScored(query: string, limit = 5): Scored[] {
  const ix = index();
  const q = [...new Set(tokens(query))];
  // "How much…", "what does it cost…": lean towards the pages that carry prices.
  if (/\b(cost|costs|price|prices|pricing|much|fee|fees|charge|cheap|expensive)\b|£|\$/i.test(query)) q.push("price", "cost");
  if (!q.length) return [];
  const N = ix.docs.length;
  const scored = ix.docs.map((doc, i) => {
    let score = 0;
    for (const t of q) {
      const f = ix.tf[i].get(t);
      if (!f) continue;
      const n = ix.df.get(t) ?? 0;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      score += (idf * f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (ix.len[i] / ix.avg)));
    }
    // The core pricing facts are the most reliable answer for money questions.
    return { doc, score: doc.group === "Pricing" ? score * 1.3 : score };
  });
  return scored.filter((s) => s.score > 0.8).sort((a, b) => b.score - a.score).slice(0, limit);
}

/** The search box's list (sent to the browser once, in the layout). */
export function searchItems(): SearchItem[] {
  const seen = new Set<string>();
  return index().docs
    .filter((d) => !["partnership-terms", "result", "term", "attribution", "reporting", "ownership", "fit"].includes(d.id))
    .filter((d) => {
      const key = `${d.group}:${d.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((d) => ({ title: d.title, path: d.path, group: d.group, summary: d.summary, keywords: cut(d.text, 400) }));
}

/** Every path the AI may link, one per line. */
export function siteMapText(): string {
  const seen = new Set<string>();
  return index()
    .docs.filter((d) => d.group !== "FAQ" && !seen.has(d.path) && seen.add(d.path))
    .map((d) => `${d.path} — ${d.title}`)
    .join("\n");
}
