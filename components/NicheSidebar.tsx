import Link from "next/link";
import Image from "next/image";
import {
  HugeiconsIcon,
  ArrowRightIcon,
  PhoneIcon,
  WhatsappIcon,
  CheckIcon,
} from "@/components/icons";
import { getAuthor } from "@/lib/authors";
import { nicheCities, type Niche } from "@/lib/niches";
import { siteConfig } from "@/lib/site";

const WHATSAPP = `https://wa.me/${siteConfig.phoneHref.replace("+", "")}`;
const TEL = `tel:${siteConfig.phoneHref}`;

export type NicheTocItem = { id: string; label: string };

export function NicheSidebar({
  niche,
  toc,
  activeCitySlug,
  caseStudyHref,
  caseStudyLabel,
}: {
  niche: Niche;
  toc: NicheTocItem[];
  activeCitySlug?: string;
  caseStudyHref?: string;
  caseStudyLabel?: string;
}) {
  const author = getAuthor(niche.authorSlug);
  const cities = nicheCities(niche);

  return (
    <aside className="space-y-6 lg:sticky lg:top-[68px] lg:self-start">
      <div className="rounded-2xl bg-white/[0.05] p-6 text-white">
        <p className="font-display text-lg font-semibold">
          Free plan for your firm
        </p>
        <p className="mt-1 text-sm text-white/85">
          Say where you work and what jobs you want more of — we reply within a
          business day.
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/25"
        >
          <HugeiconsIcon
            icon={WhatsappIcon}
            size={16}
            className="h-4 w-4"
          />
          WhatsApp us
        </a>
        <a
          href={TEL}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0B1F12]"
        >
          <HugeiconsIcon icon={PhoneIcon} size={16} className="h-4 w-4" />
          {siteConfig.phone}
        </a>
        <Link
          href="/contact"
          className="mt-3 block text-center text-sm font-semibold text-white/90 underline-offset-2 hover:underline"
        >
          Or send a proposal request
        </Link>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-white">
          Jump to
        </p>
        <nav className="mt-4" aria-label="Page sections">
          <ul className="space-y-1">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block rounded-lg px-2 py-1.5 text-sm text-white/72 transition-colors hover:bg-white/10 hover:text-[#BEF70A]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-white">
          Cities
        </p>
        <ul className="mt-4 space-y-1">
          {cities.map((city) => {
            const active = city.slug === activeCitySlug;
            return (
              <li key={city.slug}>
                <Link
                  href={`/industries/${niche.slug}/${city.slug}`}
                  className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors ${
                    active
                      ? "bg-white/[0.07] font-semibold text-[#BEF70A]"
                      : "text-white/72 hover:bg-white/10 hover:text-[#BEF70A]"
                  }`}
                >
                  <span>
                    {city.name}
                    <span className="ml-1 text-xs font-normal text-white/52">
                      {city.country}
                    </span>
                  </span>
                  <HugeiconsIcon icon={ArrowRightIcon} size={14} />
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href={`/industries/${niche.slug}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#BEF70A] hover:underline"
        >
          All cities
          <HugeiconsIcon icon={ArrowRightIcon} size={14} />
        </Link>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-white">
          Pricing
        </p>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
            <dt className="text-white/62">Monthly SEO</dt>
            <dd className="font-semibold text-white">From £300</dd>
          </div>
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
            <dt className="text-white/62">Or pay after jobs</dt>
            <dd className="font-semibold text-white">10% of paid jobs</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-white/62">Built for</dt>
            <dd className="font-semibold text-white capitalize">
              {niche.tradePlural}
            </dd>
          </div>
        </dl>
        <ul className="mt-4 space-y-2">
          {[
            "No fake #1 promises",
            "You talk to the founder",
            "Real Search Console proof",
          ].map((t) => (
            <li
              key={t}
              className="flex items-start gap-2 text-xs text-white/72"
            >
              <HugeiconsIcon
                icon={CheckIcon}
                size={14}
                className="mt-0.5 shrink-0 text-[#BEF70A]"
                strokeWidth={2.6}
              />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#BEF70A]">
          Your contact
        </p>
        <Link
          href={`/author/${author.slug}`}
          className="mt-3 flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <Image
            src={author.avatar}
            alt={author.name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-white">{author.name}</p>
            <p className="text-xs text-white/62">{author.role}</p>
          </div>
        </Link>
        {caseStudyHref && caseStudyLabel && (
          <Link
            href={caseStudyHref}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#BEF70A] hover:underline"
          >
            {caseStudyLabel}
            <HugeiconsIcon icon={ArrowRightIcon} size={14} />
          </Link>
        )}
      </div>
    </aside>
  );
}
