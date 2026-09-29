import Link from "next/link";
import type { ReactNode } from "react";
import { HugeiconsIcon, ArrowRightIcon, CheckIcon, PlusIcon, type IconSvgElement } from "@/components/icons";
import { siteConfig } from "@/lib/site";

/**
 * Shared building blocks for every page outside the homepage.
 * Brand rules: green / cream / mint / lime palette, flat divider-based lists
 * (no card grids), no shadows, text-only heroes.
 */

export type Tone = "cream" | "white" | "green" | "deep" | "mint";

const toneClasses: Record<Tone, string> = {
  cream: "bg-[#f7f5ef] text-[#0d0d0d]",
  white: "bg-white text-[#0d0d0d]",
  green: "bg-[#015f45] text-white",
  deep: "bg-[#014f39] text-white",
  mint: "bg-[#dceee8] text-[#063d30]",
};

export const isDark = (tone: Tone) => tone === "green" || tone === "deep";
export const lineClass = (tone: Tone) => (isDark(tone) ? "border-white/15" : tone === "mint" ? "border-[#063d30]/15" : "border-black/10");
export const mutedClass = (tone: Tone) => (isDark(tone) ? "text-white/75" : tone === "mint" ? "text-[#063d30]/75" : "text-black/65");
const accentText = (tone: Tone) => (isDark(tone) ? "text-[#eaf25a]" : "text-[#015f45]");

export const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
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
    <section className="relative overflow-hidden bg-[#015f45] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: NOISE_TEXTURE, backgroundRepeat: "repeat" }} />
      <div className={`container relative max-w-[1200px] pt-28 sm:pt-36 ${compact ? "pb-12 sm:pb-16" : "pb-14 sm:pb-20"}`}>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={`grid gap-10 ${aside ? "lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16" : ""}`}>
          <div>
            {eyebrow && (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#eaf25a]">
                <span className="h-2 w-2 rounded-full bg-[#cbd810]" />
                {eyebrow}
              </div>
            )}
            <h1 className={`max-w-4xl font-sans font-semibold leading-[1] tracking-[-.05em] [text-wrap:balance] ${compact ? "text-[36px] sm:text-5xl lg:text-[56px]" : "text-[38px] min-[420px]:text-[44px] sm:text-[58px] lg:text-[64px]"}`}>{title}</h1>
            {lead && <p className="mt-6 max-w-2xl text-[17px] leading-7 text-white/80 sm:text-xl sm:leading-8">{lead}</p>}
            {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
            {children}
          </div>
          {aside && <div className="min-w-0">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

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
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/60">
      <JsonLd data={schema} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="transition-colors hover:text-white">{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Label/value rows for the hero aside — flat, divider-separated. */
export function FactRows({ title, rows, tone = "green" }: { title?: string; rows: { label: string; value: ReactNode }[]; tone?: Tone }) {
  const line = lineClass(tone);
  return (
    <div>
      {title && <p className={`mb-3 text-xs font-extrabold uppercase tracking-[.15em] ${accentText(tone)}`}>{title}</p>}
      <dl className={`border-t ${line}`}>
        {rows.map((row) => (
          <div key={row.label} className={`flex items-baseline justify-between gap-6 border-b py-3.5 ${line}`}>
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
    <section id={id} aria-labelledby={labelledBy} className={`${toneClasses[tone]} scroll-mt-20 py-14 md:py-24 ${className}`}>
      <div className={`container ${narrow ? "max-w-[860px]" : "max-w-[1200px]"}`}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = "cream" }: { children: ReactNode; tone?: Tone }) {
  return <p className={`text-xs font-extrabold uppercase tracking-[.15em] ${accentText(tone)}`}>{children}</p>;
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
        <h2 id={id} className={`${eyebrow ? "mt-3" : ""} max-w-3xl font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] [text-wrap:balance] sm:text-5xl sm:leading-[1.02]`}>{title}</h2>
      </div>
      {lead && <p className={`max-w-xl text-base leading-7 lg:justify-self-end ${mutedClass(tone)}`}>{lead}</p>}
    </div>
  );
}

/* ───────────────────────── Actions ───────────────────────── */

type ButtonVariant = "lime" | "white" | "green" | "outlineLight" | "outlineDark";

const buttonVariants: Record<ButtonVariant, string> = {
  lime: "bg-[#cbd810] text-[#111111] hover:bg-[#b8c50e] focus-visible:outline-white",
  white: "bg-white text-black hover:bg-gray-100 focus-visible:outline-white",
  green: "bg-[#015f45] text-white hover:bg-[#014f39] focus-visible:outline-[#015f45]",
  outlineLight: "border border-white/25 text-white hover:bg-white/10 focus-visible:outline-white",
  outlineDark: "border border-[#015f45]/25 text-[#015f45] hover:bg-[#edf5f1] focus-visible:outline-[#015f45]",
};

function SlideArrow() {
  return (
    <span aria-hidden="true" className="relative -mr-1 flex h-4 w-4 items-center justify-center overflow-hidden">
      <HugeiconsIcon icon={ArrowRightIcon} size={16} className="absolute -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
      <HugeiconsIcon icon={ArrowRightIcon} size={16} className="absolute translate-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-full" />
    </span>
  );
}

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
  const cls = `group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${buttonVariants[variant]} ${className}`;
  const inner = (
    <>
      {icon && <HugeiconsIcon icon={icon} size={18} />}
      {children}
      {arrow && !icon && <SlideArrow />}
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

export function TextLink({ href, children, tone = "cream" }: { href: string; children: ReactNode; tone?: Tone }) {
  const cls = `group inline-flex items-center gap-1.5 text-sm font-bold ${accentText(tone)}`;
  const inner = (
    <>
      {children}
      <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" />
    </>
  );
  return isExternal(href) ? (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

/* ───────────────────────── Lists ───────────────────────── */

export function CheckList({ items, tone = "cream", columns = 1 }: { items: readonly string[]; tone?: Tone; columns?: 1 | 2 }) {
  const line = lineClass(tone);
  const dark = isDark(tone);
  return (
    <ul className={`grid border-t ${line} ${columns === 2 ? "sm:grid-cols-2 sm:gap-x-10" : ""}`}>
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 border-b py-4 leading-6 ${line} ${dark ? "text-white/85" : tone === "mint" ? "text-[#063d30]/85" : "text-black/75"}`}>
          <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${dark ? "bg-[#cbd810] text-[#063d30]" : "bg-[#015f45] text-[#eaf25a]"}`}>
            <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export type FeatureItem = { title: string; text: string; icon?: IconSvgElement; href?: string; linkLabel?: string; eyebrow?: string };

export function FeatureGrid({
  items,
  tone = "cream",
  columns = 3,
  numbered = false,
}: {
  items: FeatureItem[];
  tone?: Tone;
  columns?: 2 | 3 | 4;
  numbered?: boolean;
}) {
  const line = lineClass(tone);
  const dark = isDark(tone);
  const grid = columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid border-t ${line} ${grid} md:gap-x-10`}>
      {items.map((item, index) => {
        const body = (
          <>
            {(item.icon || numbered) && (
              <div className="mb-6 flex items-start justify-between gap-4">
                {item.icon ? (
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${dark ? "bg-white/10 text-[#eaf25a]" : "bg-[#e7f1ed] text-[#015f45] group-hover:bg-[#015f45] group-hover:text-[#eaf25a]"}`}>
                    <HugeiconsIcon icon={item.icon} size={22} />
                  </span>
                ) : <span />}
                {numbered && <span className={`text-sm font-bold ${dark ? "text-white/40" : "text-black/35"}`}>{String(index + 1).padStart(2, "0")}</span>}
              </div>
            )}
            {item.eyebrow && <p className={`mb-2 text-xs font-extrabold uppercase tracking-[.14em] ${accentText(tone)}`}>{item.eyebrow}</p>}
            <h3 className={`text-xl font-bold tracking-[-.03em] ${item.href ? (dark ? "group-hover:text-[#eaf25a]" : "group-hover:text-[#015f45]") : ""} transition-colors`}>{item.title}</h3>
            <p className={`mt-2 leading-7 ${mutedClass(tone)}`}>{item.text}</p>
            {item.href && (
              <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold ${accentText(tone)}`}>
                {item.linkLabel ?? "Learn more"}
                <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </>
        );
        const cls = `group flex flex-col border-b py-8 md:py-10 ${line}`;
        return item.href ? (
          <Link key={item.title} href={item.href} className={cls}>{body}</Link>
        ) : (
          <div key={item.title} className={cls}>{body}</div>
        );
      })}
    </div>
  );
}

export function Steps({ steps, tone = "cream" }: { steps: { title: string; text: string }[]; tone?: Tone }) {
  const line = lineClass(tone);
  return (
    <ol className={`border-t ${line}`}>
      {steps.map((step, index) => (
        <li key={step.title} className={`grid gap-3 border-b py-7 sm:grid-cols-[88px_1fr] sm:gap-x-8 md:py-9 lg:grid-cols-[120px_.8fr_1.2fr] ${line}`}>
          <span className={`text-4xl font-semibold leading-none tracking-[-.05em] sm:text-5xl ${accentText(tone)}`}>{String(index + 1).padStart(2, "0")}</span>
          <h3 className="text-xl font-bold tracking-[-.03em] sm:text-2xl">{step.title.replace(/^\d+\.\s*/, "")}</h3>
          <p className={`leading-7 sm:col-start-2 lg:col-start-auto ${mutedClass(tone)}`}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function StatRow({ items, tone = "cream", columns }: { items: readonly { value: string; label: string; note?: string }[]; tone?: Tone; columns?: 2 | 3 | 4 }) {
  const line = lineClass(tone);
  const count = columns ?? (items.length >= 4 ? 4 : items.length === 3 ? 3 : 2);
  const cols = count === 4 ? "lg:grid-cols-4" : count === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <dl className={`grid grid-cols-2 gap-x-6 border-t ${line} ${cols} lg:gap-x-10`}>
      {items.map((item) => (
        <div key={item.label} className={`flex flex-col border-b py-6 md:py-8 ${line}`}>
          <dt className={`order-2 mt-2 text-sm leading-5 ${mutedClass(tone)}`}>{item.label}</dt>
          <dd className={`order-1 text-[34px] font-bold leading-none tracking-[-.05em] sm:text-5xl ${accentText(tone)}`}>{item.value}</dd>
          {item.note && <dd className={`order-3 mt-1 text-xs ${isDark(tone) ? "text-white/55" : "text-black/50"}`}>{item.note}</dd>}
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
              <span className={`font-bold transition-colors ${isDark(tone) ? "group-hover:text-[#eaf25a]" : "group-hover:text-[#015f45]"}`}>{item.label}</span>
              {item.meta && <span className={`ml-2 text-xs ${isDark(tone) ? "text-white/55" : "text-black/45"}`}>{item.meta}</span>}
              {item.description && <span className={`mt-1 block text-sm leading-6 ${mutedClass(tone)}`}>{item.description}</span>}
            </span>
            <HugeiconsIcon icon={ArrowRightIcon} size={18} className={`shrink-0 transition-transform group-hover:translate-x-1 ${accentText(tone)}`} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ items, tone = "cream", openFirst = true }: { items: { question: string; answer: string }[]; tone?: Tone; openFirst?: boolean }) {
  const line = lineClass(tone);
  return (
    <div className={`divide-y border-y ${line} ${isDark(tone) ? "divide-white/15" : "divide-black/10"}`}>
      {items.map((faq, index) => (
        <details key={faq.question} className="group" open={openFirst && index === 0}>
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <HugeiconsIcon icon={PlusIcon} size={22} strokeWidth={2} className={`shrink-0 transition-transform duration-300 group-open:rotate-45 ${accentText(tone)}`} />
          </summary>
          <p className={`max-w-2xl pb-5 leading-7 ${mutedClass(tone)}`}>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };
}

/** Two-column FAQ block used at the bottom of most pages. */
export function FaqSection({ items, title = "Frequently asked questions", eyebrow = "Clear answers", tone = "cream" }: { items: { question: string; answer: string }[]; title?: string; eyebrow?: string; tone?: Tone }) {
  if (items.length === 0) return null;
  return (
    <Section tone={tone} labelledBy="faq-heading">
      <JsonLd data={faqSchema(items)} />
      <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          <h2 id="faq-heading" className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] sm:text-4xl">{title}</h2>
        </div>
        <FaqList items={items} tone={tone} />
      </div>
    </Section>
  );
}
