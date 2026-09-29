import Link from "next/link";
import type { ReactNode } from "react";
import { ContentsNav, ReadingProgress, type ContentsItem } from "@/components/longform/Nav";

const noise = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export type Crumb = { label: string; href?: string };

/** Green inner-page hero that sits under the fixed navbar. */
export function LongformHero({
  crumbs,
  eyebrow,
  title,
  subtitle,
  stats,
  actions,
  meta,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  stats?: [string, string][];
  actions?: ReactNode;
  meta?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-[#015f45] pb-14 pt-[128px] text-white sm:pb-20 sm:pt-[156px]">
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: noise }} aria-hidden="true" />
      <div className="container relative max-w-[1200px]">
        <nav aria-label="Breadcrumb" className="text-sm text-white/60">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((crumb, i) => (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white">{crumb.label}</Link>
                ) : (
                  <span aria-current="page" className="text-white/85">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className={aside ? "mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_380px]" : "mt-8"}>
          <div>
            {eyebrow && <div className="flex flex-wrap items-center gap-2">{eyebrow}</div>}
            <h1 className="mt-5 max-w-4xl text-balance text-[34px] font-semibold leading-[1.05] tracking-[-.045em] sm:text-5xl lg:text-[56px]">{title}</h1>
            {subtitle && <p className="mt-6 max-w-2xl text-lg leading-7 text-white/80">{subtitle}</p>}

            {stats && stats.length > 0 && (
              <dl className="mt-9 grid max-w-3xl grid-cols-2 overflow-hidden rounded-2xl border border-white/20 bg-[#014f39]/60 sm:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div key={label} className="flex flex-col-reverse border-white/15 px-5 py-4 [&:nth-child(-n+2)]:border-b [&:nth-child(odd)]:border-r sm:[&:not(:last-child)]:border-r sm:[&:nth-child(-n+2)]:border-b-0">
                    <dt className="text-xs text-white/65">{label}</dt>
                    <dd className="text-xl font-bold tracking-tight">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {(actions || meta) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {actions}
                {meta && <span className="text-sm text-white/60 sm:ml-3">{meta}</span>}
              </div>
            )}
          </div>
          {aside && <div className="hidden lg:block">{aside}</div>}
        </div>
      </div>
    </header>
  );
}

export function Pill({ children, tone = "lime" }: { children: ReactNode; tone?: "lime" | "outline" }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[.14em] ${
        tone === "lime" ? "bg-[#cbd810] text-[#063d30]" : "border border-white/30 text-white/85"
      }`}
    >
      {children}
    </span>
  );
}

export function HeroButton({ href, children, variant = "lime" }: { href: string; children: ReactNode; variant?: "lime" | "outline" }) {
  const className =
    variant === "lime"
      ? "group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#cbd810] px-5 text-sm font-semibold text-[#111] transition-colors hover:bg-[#b8c50e]"
      : "inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/35 px-5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10";
  if (href.startsWith("/")) return <Link href={href} className={className}>{children}</Link>;
  return <a href={href} className={className} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{children}</a>;
}

/** Two-column reading layout: sticky contents on desktop, collapsible contents on mobile. */
export function LongformBody({ contents, contentsTitle = "Contents", children }: { contents: ContentsItem[]; contentsTitle?: string; children: ReactNode }) {
  return (
    <div className="bg-white text-[#111]">
      <ReadingProgress />
      <div className="container max-w-[1200px] py-12 sm:py-16 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 lg:py-20 xl:gap-20">
        <aside className="hidden lg:block">
          <ContentsNav items={contents} title={contentsTitle} />
        </aside>

        <article className="min-w-0 max-w-[760px]">
          {contents.length > 1 && (
            <details className="group mb-10 rounded-2xl border border-black/10 bg-[#f7f5ef] lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
                {contentsTitle} · {contents.length} sections
                <span className="text-lg leading-none text-[#015f45] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <ol className="space-y-1 border-t border-black/10 px-5 py-4 text-sm">
                {contents.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="flex gap-2.5 py-1 text-black/70 hover:text-[#015f45]">
                      <span className="w-5 shrink-0 tabular-nums text-black/35">{item.number ?? index + 1}</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          )}
          {children}
        </article>
      </div>
    </div>
  );
}

/** A numbered long-form section with a small "Section 03" label above the heading. */
export function LongformSection({
  id,
  label,
  title,
  badge,
  children,
}: {
  id: string;
  label?: string;
  title: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-black/10 pt-12 first-of-type:border-t-0 first-of-type:pt-0 [&+section]:mt-14">
      {(label || badge) && (
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">
          {label && <span>{label}</span>}
          {badge && <span className="rounded-full bg-[#cbd810] px-2.5 py-0.5 text-[10px] tracking-[.12em] text-[#063d30]">{badge}</span>}
        </div>
      )}
      <h2 id={`${id}-title`} className={`${label || badge ? "mt-3" : ""} text-balance text-[28px] font-semibold leading-[1.1] tracking-[-.035em] sm:text-[36px]`}>{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** Closing panel for long-form pages: a direct way to ask questions. */
export function AskPanel({ eyebrow, title, text, whatsappHref, email, emailSubject }: { eyebrow: string; title: string; text: string; whatsappHref: string; email: string; emailSubject: string }) {
  return (
    <aside className="mt-14 rounded-[24px] bg-[#015f45] p-6 text-white sm:p-8" aria-label={title}>
      <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#eaf25a]">{eyebrow}</p>
      <p className="mt-3 text-2xl font-semibold tracking-[-.03em] sm:text-3xl">{title}</p>
      <p className="mt-3 max-w-xl leading-7 text-white/75">{text}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#cbd810] px-5 text-sm font-bold text-[#111] transition-colors hover:bg-[#b8c50e]">
          WhatsApp us
        </a>
        <a href={`mailto:${email}?subject=${encodeURIComponent(emailSubject)}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/35 px-5 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10">
          {email}
        </a>
      </div>
    </aside>
  );
}
