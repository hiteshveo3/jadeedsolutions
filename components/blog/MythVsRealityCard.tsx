import { HugeiconsIcon, AlertIcon, CheckCircleIcon } from "@/components/icons";

interface MythItem {
  topic: string;
  myth: string;
  reality: string;
  sourceDoc: string;
  sourceUrl: string;
}

const MYTHS: MythItem[] = [
  {
    topic: "Next.js & JavaScript Frameworks",
    myth: "Building a site in Next.js or using SSR automatically gives you a Google ranking boost.",
    reality: "Next.js is not a ranking factor. Google ranks authoritative, relevant content. Next.js is valuable because it provides fast rendering, image optimization, and clean metadata tooling.",
    sourceDoc: "Google SEO Starter Guide",
    sourceUrl: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
  },
  {
    topic: "Location & Borough Pages",
    myth: "You can mass-generate 50 borough landing pages using the exact same text and only swapping the town name.",
    reality: "Mass-duplicated pages violate Google's Doorway Pages policy. Each location page must offer unique local value (parking permits, access rules, real local reviews).",
    sourceDoc: "Google Search Spam Policies",
    sourceUrl: "https://developers.google.com/search/docs/essentials/spam-policies#doorways",
  },
  {
    topic: "Google Business Profile Ranking",
    myth: "Stuffing target keywords into your GBP business name is a sustainable long-term SEO strategy.",
    reality: "Google determines local ranking on Relevance, Distance, and Prominence. Name spam can trigger profile suspensions. Optimize your primary category and reviews instead.",
    sourceDoc: "How Local Ranking Works",
    sourceUrl: "https://support.google.com/business/answer/7091",
  },
];

export function MythVsRealityCard() {
  return (
    <div className="my-8 space-y-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-700 border border-rose-100">
          <HugeiconsIcon icon={AlertIcon} size={14} />
          SEO Myth-Busting
        </span>
        <h3 className="font-display text-xl font-bold tracking-tight text-white">
          Common Local SEO Myths vs. Google’s Official Stance
        </h3>
      </div>

      <div className="grid gap-4">
        {MYTHS.map((item) => (
          <div
            key={item.topic}
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05] shadow-2xs"
          >
            <div className="bg-white/[0.06]/70 px-5 py-2.5 border-b border-white/[0.08]">
              <span className="text-xs font-extrabold uppercase tracking-wider text-white/80">
                {item.topic}
              </span>
            </div>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/12">
              {/* Myth Column */}
              <div className="p-5 bg-rose-50/30">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-rose-600 text-white text-[10px]">✕</span>
                  Common SEO Myth
                </div>
                <p className="mt-2 text-xs font-medium text-white/80 leading-relaxed">
                  &ldquo;{item.myth}&rdquo;
                </p>
              </div>

              {/* Reality Column */}
              <div className="p-5 bg-white/[0.06]">
                <div className="flex items-center gap-2 text-[#BEF70A] font-bold text-xs uppercase tracking-wider">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12] text-[10px]">✓</span>
                  Official Reality
                </div>
                <p className="mt-2 text-xs font-medium text-white leading-relaxed">
                  {item.reality}
                </p>
                <div className="mt-3">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-[#BEF70A] underline underline-offset-2 hover:text-[#BEF70A]"
                  >
                    Source: {item.sourceDoc} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
