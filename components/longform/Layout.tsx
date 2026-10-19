import Link from "next/link";
import type { ReactNode } from "react";
import { ContentsNav, ReadingProgress, type ContentsItem } from "@/components/longform/Nav";

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
    <header className="relative overflow-hidden bg-glow pb-12 pt-28 text-white sm:pb-16 sm:pt-36">
      <div className="container relative max-w-[1200px]">
        {/* Pill breadcrumbs on dark (idea 001 B). */}
        <nav aria-label="Breadcrumb" className="text-[13px]">
          <ol className="flex flex-wrap items-center gap-1.5">
            {crumbs.map((crumb, i) => (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true" className="text-white/35">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="inline-flex h-7 items-center rounded-full border border-white/[0.08] bg-white/[0.06] px-3 font-semibold text-white/80 transition-colors hover:text-white">{crumb.label}</Link>
                ) : (
                  <span aria-current="page" className="inline-flex h-7 max-w-[260px] items-center truncate rounded-full bg-[#BEF70A] px-3 font-bold text-[#0B1F12]">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className={aside ? "mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_380px]" : "mt-8"}>
          <div>
            {eyebrow && <div className="flex flex-wrap items-center gap-2">{eyebrow}</div>}
            <h1 className="mt-5 max-w-4xl font-sans text-[36px] font-semibold leading-[1] tracking-[-.05em] [text-wrap:balance] sm:text-5xl lg:text-[56px]">{title}</h1>
            {subtitle && <p className="mt-6 max-w-2xl text-[17px] leading-7 text-white/80 sm:text-xl sm:leading-8">{subtitle}</p>}

            {stats && stats.length > 0 && (
              <dl className="mt-9 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/[0.08] pt-7 sm:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div key={label} className="flex flex-col-reverse">
                    <dt className="text-xs text-white/65">{label}</dt>
                    <dd className="text-3xl font-semibold tracking-[-.04em] text-[#BEF70A]">{value}</dd>
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
        tone === "lime" ? "bg-[#BEF70A]/[0.13] text-[#BEF70A]" : "bg-white/[0.08] text-white/85"
      }`}
    >
      {children}
    </span>
  );
}

export function HeroButton({ href, children, variant = "lime" }: { href: string; children: ReactNode; variant?: "lime" | "outline" }) {
  const className =
    variant === "lime"
      ? "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#BEF70A] px-6 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09]"
      : "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/[0.08] px-6 text-sm font-bold text-white transition-colors hover:bg-white/10";
  if (href.startsWith("/")) return <Link href={href} className={className}>{children}</Link>;
  return <a href={href} className={className} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{children}</a>;
}

/** Two-column reading layout: sticky contents on desktop, collapsible contents on mobile. */
export function LongformBody({ contents, contentsTitle = "Contents", children }: { contents: ContentsItem[]; contentsTitle?: string; children: ReactNode }) {
  return (
    <div className="bg-transparent text-white">
      <ReadingProgress />
      <div className="container max-w-[1200px] py-12 sm:py-16 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 lg:py-20 xl:gap-20">
        <aside className="hidden lg:block">
          <ContentsNav items={contents} title={contentsTitle} />
        </aside>

        <article className="min-w-0 max-w-[760px]">
          {contents.length > 1 && (
            <details className="group mb-10 rounded-2xl border border-white/[0.08] bg-white/[0.05] lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
                {contentsTitle} · {contents.length} sections
                <span className="text-lg leading-none text-[#BEF70A] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <ol className="space-y-1 border-t border-white/[0.08] px-5 py-4 text-sm">
                {contents.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="flex gap-2.5 py-1 text-white/78 hover:text-[#BEF70A]">
                      <span className="w-5 shrink-0 tabular-nums text-white/43">{item.number ?? index + 1}</span>
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
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-white/[0.08] pt-12 first-of-type:border-t-0 first-of-type:pt-0 [&+section]:mt-14">
      {(label || badge) && (
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-extrabold uppercase tracking-[.15em] text-[#BEF70A]">
          {label && <span>{label}</span>}
          {badge && <span className="rounded-full bg-[#BEF70A] px-2.5 py-0.5 text-[10px] tracking-[.12em] text-[#0B1F12]">{badge}</span>}
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
    <aside className="mt-14 rounded-[24px] bg-white/[0.05] p-6 text-white sm:p-8" aria-label={title}>
      <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#BEF70A]">{eyebrow}</p>
      <p className="mt-3 text-2xl font-semibold tracking-[-.03em] sm:text-3xl">{title}</p>
      <p className="mt-3 max-w-xl leading-7 text-white/75">{text}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#BEF70A] px-5 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09]">
          WhatsApp us
        </a>
        <a href={`mailto:${email}?subject=${encodeURIComponent(emailSubject)}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/[0.08] px-5 text-sm font-bold text-white transition-colors hover:bg-white/10">
          {email}
        </a>
      </div>
    </aside>
  );
}
