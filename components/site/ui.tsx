import Link from "next/link";
import type { ReactNode } from "react";
import { HugeiconsIcon, ArrowRightIcon, CheckIcon, PlusIcon, type IconSvgElement } from "@/components/icons";
import { siteConfig } from "@/lib/site";

/**
 * Shared building blocks for every page outside the homepage.
 * Full-dark brand system (owner, 2026-10-04): every section sits on the brand
 * radial gradient; "green"/"deep" tones add their own glow band. Lime #BEF70A
 * is the only accent. Pill buttons with a circle arrow, translucent line cards,
 * Iconsax Bulk in one colour (no icon tiles).
 */

export type Tone = "cream" | "white" | "green" | "deep" | "mint";

const toneClasses: Record<Tone, string> = {
  cream: "text-white",
  white: "text-white",
  mint: "text-white",
  green: "bg-glow text-white",
  deep: "bg-glow text-white",
};

export const isDark = (_tone: Tone) => true;
export const lineClass = (_tone: Tone) => "border-white/[0.08]";
export const mutedClass = (_tone: Tone) => "text-white/[0.72]";
const accentText = (_tone: Tone) => "text-[#BEF70A]";

export const NOISE_TEXTURE = "none";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Small four-point spark used in labels (idea 004 A). */
export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 1.5c.7 5.6 3.4 9 10.5 10.5C15.4 13.5 12.7 16.9 12 22.5 11.3 16.9 8.6 13.5 1.5 12 8.6 10.5 11.3 7.1 12 1.5Z" fill="currentColor" />
    </svg>
  );
}

/** Lime circle with an arrow — sits inside pill buttons everywhere (Round 4). */
export function CircleArrow({ dark = false, size = "md" }: { dark?: boolean; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-45 ${
        size === "sm" ? "h-7 w-7" : "h-9 w-9"
      } ${dark ? "bg-[#0B1F12] text-[#BEF70A]" : "bg-[#BEF70A] text-[#0B1F12]"}`}
    >
      <HugeiconsIcon icon={ArrowRightIcon} size={size === "sm" ? 14 : 16} />
    </span>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  breadcrumbs,
  aside,
  children,
  compact = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: Crumb[];
  aside?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-glow text-white">
      <div className={`container relative max-w-[1200px] pt-28 sm:pt-36 ${compact ? "pb-12 sm:pb-16" : "pb-14 sm:pb-20"}`}>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={`grid gap-10 ${aside ? "lg:grid-cols-[1.2fr_.8fr] lg:items-start lg:gap-16" : ""}`}>
          <div>
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            <h1 className={`max-w-4xl leading-[0.98] tracking-[-.045em] [text-wrap:balance] ${compact ? "text-[36px] sm:text-5xl lg:text-[56px]" : "text-[40px] min-[420px]:text-[46px] sm:text-[58px] lg:text-[66px]"}`}>{title}</h1>
            {lead && <p className="mt-6 max-w-2xl text-[17px] leading-7 text-white/80 sm:text-xl sm:leading-8">{lead}</p>}
            {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
            {children}
          </div>
          {/* The aside sits beside the headline, not at the bottom (owner, 5 Oct 2026). */}
          {aside && <div className="min-w-0 lg:pt-1">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

/** Breadcrumbs as small pills on dark (idea 001 B). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteConfig.url}${item.href === "/" ? "" : item.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-[13px]">
      <JsonLd data={schema} />
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true" className="text-white/35">/</span>}
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="inline-flex h-7 items-center rounded-full border border-white/[0.08] bg-white/[0.06] px-3 font-semibold text-white/80 transition-colors hover:bg-white/[0.09] hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="inline-flex h-7 items-center rounded-full bg-[#BEF70A] px-3 font-bold text-[#0B1F12]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Label/value rows for the hero aside. */
export function FactRows({ title, rows, tone = "green" }: { title?: string; rows: { label: string; value: ReactNode }[]; tone?: Tone }) {
  const line = lineClass(tone);
  return (
    <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-5 sm:p-6">
      {title && <p className={`mb-3 text-xs font-extrabold uppercase tracking-[.15em] ${accentText(tone)}`}>{title}</p>}
      <dl>
        {rows.map((row, index) => (
          <div key={row.label} className={`flex items-baseline justify-between gap-6 py-3 ${index ? `border-t ${line}` : ""}`}>
            <dt className={`text-sm ${mutedClass(tone)}`}>{row.label}</dt>
            <dd className="text-right text-sm font-bold">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ───────────────────────── Layout ───────────────────────── */

export function Section({
  tone = "cream",
  id,
  labelledBy,
  narrow = false,
  className = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  labelledBy?: string;
  narrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${toneClasses[tone]} relative scroll-mt-20 py-14 md:py-24 ${className}`}>
      <div className={`container relative ${narrow ? "max-w-[860px]" : "max-w-[1200px]"}`}>{children}</div>
    </section>
  );
}

/** Section label: lime-tint pill with a spark (idea 004 A). */
export function Eyebrow({ children, className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <p className={`inline-flex w-fit items-center gap-1.5 rounded-full bg-[#BEF70A]/[0.13] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-[#BEF70A] ${className}`}>
      <Spark />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
  tone = "cream",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={`grid gap-5 ${lead ? "lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-10" : ""} ${className}`}>
      <div>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <h2 id={id} className={`${eyebrow ? "mt-4" : ""} max-w-3xl text-[34px] leading-[1.02] tracking-[-.04em] [text-wrap:balance] sm:text-5xl`}>{title}</h2>
      </div>
      {lead && <p className={`max-w-xl text-base leading-7 lg:justify-self-end ${mutedClass(tone)}`}>{lead}</p>}
    </div>
  );
}

/* ───────────────────────── Actions ───────────────────────── */

type ButtonVariant = "lime" | "white" | "green" | "outlineLight" | "outlineDark";

const buttonVariants: Record<ButtonVariant, string> = {
  lime: "bg-[#BEF70A] text-[#0B1F12] hover:bg-[#ABDE09]",
  green: "bg-[#BEF70A] text-[#0B1F12] hover:bg-[#ABDE09]",
  white: "bg-white text-[#0B1F12] hover:bg-white/90",
  outlineLight: "bg-white/[0.08] text-white hover:bg-white/[0.14]",
  outlineDark: "bg-white/[0.08] text-white hover:bg-white/[0.14]",
};

const isExternal = (href: string) => /^(https?:|tel:|mailto:)/.test(href);

export function ButtonLink({
  href,
  variant = "lime",
  icon,
  arrow = true,
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  icon?: IconSvgElement;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const filled = variant === "lime" || variant === "green" || variant === "white";
  const withArrow = arrow && !icon && filled;
  const cls = `group inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${withArrow ? "pl-6 pr-1.5" : "px-6"} ${buttonVariants[variant]} ${className}`;
  const inner = (
    <>
      {icon && <HugeiconsIcon icon={icon} size={20} />}
      {children}
      {withArrow && <CircleArrow dark={variant !== "white"} />}
    </>
  );
  if (isExternal(href)) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return <Link href={href} className={cls}>{inner}</Link>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode; tone?: Tone }) {
  const cls = "group inline-flex items-center gap-2 text-sm font-bold text-white";
  const inner = (
    <>
      {children}
      <CircleArrow size="sm" />
    </>
  );
  return isExternal(href) ? (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

/* ───────────────────────── Lists ───────────────────────── */

/** Tick list: lime ticks on dark (idea 002 A). */
export function CheckList({ items, tone = "cream", columns = 1 }: { items: readonly string[]; tone?: Tone; columns?: 1 | 2 }) {
  const line = lineClass(tone);
  return (
    <ul className={`grid border-t ${line} ${columns === 2 ? "sm:grid-cols-2 sm:gap-x-10" : ""}`}>
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 border-b py-4 leading-6 text-white/85 ${line}`}>
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
            <HugeiconsIcon icon={CheckIcon} size={12} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export type FeatureItem = { title: string; text: string; icon?: IconSvgElement; href?: string; linkLabel?: string; eyebrow?: string };

/** Line cards with one-colour Bulk icons (Round 3/4, idea 061). */
export function FeatureGrid({
  items,
  columns = 3,
  numbered = false,
}: {
  items: FeatureItem[];
  tone?: Tone;
  columns?: 2 | 3 | 4;
  numbered?: boolean;
}) {
  const grid = columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid gap-3 ${grid}`}>
      {items.map((item, index) => {
        const body = (
          <>
            {(item.icon || numbered || item.href) && (
              <div className="mb-6 flex items-start justify-between gap-4">
                {item.icon ? <HugeiconsIcon icon={item.icon} size={30} className="text-[#BEF70A]" /> : numbered ? <span className="text-sm font-bold text-[#BEF70A]">{String(index + 1).padStart(2, "0")}</span> : <span />}
                {item.href && <CircleArrow size="sm" />}
                {!item.href && item.icon && numbered && <span className="text-sm font-bold text-white/40">{String(index + 1).padStart(2, "0")}</span>}
              </div>
            )}
            {item.eyebrow && <p className="mb-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#BEF70A]">{item.eyebrow}</p>}
            <h3 className="text-xl tracking-[-.03em]">{item.title}</h3>
            <p className="mt-2 leading-7 text-white/[0.72]">{item.text}</p>
            {item.href && item.linkLabel && <span className="mt-5 text-sm font-bold text-[#BEF70A]">{item.linkLabel}</span>}
          </>
        );
        const cls = "group flex flex-col rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-6 transition-colors md:p-7";
        return item.href ? (
          <Link key={item.title} href={item.href} className={`${cls} hover:bg-white/[0.09]`}>{body}</Link>
        ) : (
          <div key={item.title} className={cls}>{body}</div>
        );
      })}
    </div>
  );
}

/** Numbered steps with big lime numbers. */
export function Steps({ steps, tone = "cream" }: { steps: { title: string; text: string }[]; tone?: Tone }) {
  const line = lineClass(tone);
  return (
    <ol className={`border-t ${line}`}>
      {steps.map((step, index) => (
        <li key={step.title} className={`grid gap-3 border-b py-7 sm:grid-cols-[88px_1fr] sm:gap-x-8 md:py-9 lg:grid-cols-[120px_.8fr_1.2fr] ${line}`}>
          <span className="text-4xl font-semibold leading-none tracking-[-.05em] text-[#BEF70A] sm:text-5xl">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="text-xl tracking-[-.03em] sm:text-2xl">{step.title.replace(/^\d+\.\s*/, "")}</h3>
          <p className={`leading-7 sm:col-start-2 lg:col-start-auto ${mutedClass(tone)}`}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Numbers band: big lime numbers, no side lines (idea 044 B + owner note). */
export function StatRow({ items, columns }: { items: readonly { value: string; label: string; note?: string }[]; tone?: Tone; columns?: 2 | 3 | 4 }) {
  const count = columns ?? (items.length >= 4 ? 4 : items.length === 3 ? 3 : 2);
  const cols = count === 4 ? "lg:grid-cols-4" : count === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-8 ${cols} lg:gap-x-10`}>
      {items.map((item) => (
        <div key={item.label} className="flex min-w-0 flex-col break-words">
          <dt className="order-2 mt-2 text-sm leading-5 text-white/[0.72]">{item.label}</dt>
          <dd className="order-1 text-[38px] font-semibold leading-none tracking-[-.05em] text-[#BEF70A] sm:text-5xl">{item.value}</dd>
          {item.note && <dd className="order-3 mt-1 text-xs text-white/50">{item.note}</dd>}
        </div>
      ))}
    </dl>
  );
}

export type LinkRow = { href: string; label: string; meta?: string; description?: string };

export function LinkRows({ items, tone = "cream", columns = 1 }: { items: LinkRow[]; tone?: Tone; columns?: 1 | 2 | 3 }) {
  const line = lineClass(tone);
  const grid = columns === 3 ? "md:grid-cols-2 lg:grid-cols-3 md:gap-x-10" : columns === 2 ? "md:grid-cols-2 md:gap-x-10" : "";
  return (
    <ul className={`grid border-t ${line} ${grid}`}>
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={`group flex items-center justify-between gap-4 border-b py-4 ${line}`}>
            <span className="min-w-0">
              <span className="font-bold transition-colors group-hover:text-[#BEF70A]">{item.label}</span>
              {item.meta && <span className="ml-2 text-xs text-white/55">{item.meta}</span>}
              {item.description && <span className={`mt-1 block text-sm leading-6 ${mutedClass(tone)}`}>{item.description}</span>}
            </span>
            <HugeiconsIcon icon={ArrowRightIcon} size={18} className="shrink-0 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-[#BEF70A]" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** The one FAQ style across the site (owner, 5 Oct 2026): a soft card per question,
 *  a filled lime-tint circle that turns solid when open — no borders, no lines. */
export function FaqCards({ items, openFirst = true }: { items: readonly { question: string; answer: ReactNode }[]; openFirst?: boolean }) {
  return (
    <div className="space-y-3">
      {items.map((faq, index) => (
        <details key={faq.question} className="group rounded-[20px] bg-white/[0.05] transition-colors open:bg-white/[0.08]" open={openFirst && index === 0}>
          <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left text-base font-semibold md:px-7 md:py-5 md:text-[17px] [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#BEF70A]/[0.12] text-[#BEF70A] transition-all duration-300 group-open:rotate-45 group-open:bg-[#BEF70A] group-open:text-[#0B1F12]">
              <HugeiconsIcon icon={PlusIcon} size={18} />
            </span>
          </summary>
          <div className="max-w-[760px] px-5 pb-6 text-[16px] leading-7 text-white/75 md:px-7 md:pb-7 md:pr-20">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}

export function FaqList({ items, openFirst = true }: { items: { question: string; answer: string }[]; tone?: Tone; openFirst?: boolean }) {
  return <FaqCards items={items} openFirst={openFirst} />;
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };
}

/** Two-column FAQ block used at the bottom of most pages (idea 072 A). */
export function FaqSection({ items, title = "Frequently asked questions", eyebrow = "Clear answers", tone = "cream" }: { items: { question: string; answer: string }[]; title?: string; eyebrow?: string; tone?: Tone }) {
  if (items.length === 0) return null;
  return (
    <Section tone={tone} labelledBy="faq-heading">
      <JsonLd data={faqSchema(items)} />
      <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          <h2 id="faq-heading" className="mt-4 text-[34px] leading-[1.02] tracking-[-.04em] sm:text-4xl">{title}</h2>
        </div>
        <FaqList items={items} tone={tone} />
      </div>
    </Section>
  );
}
