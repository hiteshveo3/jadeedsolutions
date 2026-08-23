import Link from "next/link";
import Image from "next/image";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/site";
import type { Niche } from "@/lib/niches";

/** Author strip on niche hub & city pages */
export function EeatByline({
  niche,
  reviewedLabel,
}: {
  niche: Niche;
  reviewedLabel?: string;
}) {
  const author = getAuthor(niche.authorSlug);
  const reviewed = reviewedLabel ?? formatReviewed(niche.reviewedAt);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <Link
        href={`/author/${author.slug}`}
        className="flex items-center gap-3 transition-opacity hover:opacity-90"
      >
        <Image
          src={author.avatar}
          alt={author.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
        />
        <div>
          <p className="text-sm font-semibold text-ink">{author.name}</p>
          <p className="text-xs text-slate-500">{author.role}</p>
        </div>
      </Link>
      <div className="hidden h-10 w-px bg-slate-200 sm:block" aria-hidden />
      <div className="text-xs leading-relaxed text-slate-500">
        <p>
          Questions? You’re talking to the founder — not a call centre.
        </p>
        <p className="mt-1">
          Updated {reviewed} ·{" "}
          <a
            href={siteConfig.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-500 hover:underline"
          >
            Google 5.0
          </a>
          {" · "}
          <a
            href={siteConfig.trustpilotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-500 hover:underline"
          >
            Trustpilot
          </a>
        </p>
      </div>
    </div>
  );
}

function formatReviewed(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
