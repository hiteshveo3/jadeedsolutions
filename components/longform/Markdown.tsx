import Link from "next/link";
import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return "";
}

/** `2.1` → `section-2-1`; used for numbered sub-headings so they can be deep-linked. */
export function sectionId(number: number | string) {
  return `section-${String(number).replace(/\./g, "-")}`;
}

const linkClass =
  "font-semibold text-[#015f45] underline decoration-[#015f45]/30 underline-offset-4 transition-colors hover:decoration-[#015f45]";

function MarkdownLink({ href = "", children }: { href?: string; children?: ReactNode }) {
  if (href.startsWith("/")) return <Link href={href} className={linkClass}>{children}</Link>;
  if (href.startsWith("#")) return <a href={href} className={linkClass}>{children}</a>;
  return <a href={href} target="_blank" rel="noreferrer" className={linkClass}>{children}</a>;
}

const components: Components = {
  p: ({ children }) => <p className="mt-5 text-[17px] leading-[1.75] text-[#1d1d1b]/80 first:mt-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-[#111]">{children}</strong>,
  a: ({ href, children }) => <MarkdownLink href={href}>{children}</MarkdownLink>,
  h3: ({ children }) => {
    const text = textOf(children);
    const match = text.match(/^(\d+\.\d+)\s+(.*)$/);
    if (!match) return <h3 className="mt-12 text-[21px] font-bold leading-snug tracking-[-.02em] text-[#111]">{children}</h3>;
    return (
      <h3 id={sectionId(match[1])} className="mt-12 flex scroll-mt-28 gap-3 text-[21px] font-bold leading-snug tracking-[-.02em] text-[#111]">
        <span className="shrink-0 tabular-nums text-[#015f45]">{match[1]}</span>
        <span>{match[2]}</span>
      </h3>
    );
  },
  h4: ({ children }) => <h4 className="mt-8 text-xs font-extrabold uppercase tracking-[.14em] text-[#015f45]">{children}</h4>,
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2.5 pl-6 text-[17px] leading-[1.7] text-[#1d1d1b]/80 marker:text-[#015f45]">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2.5 pl-6 text-[17px] leading-[1.7] text-[#1d1d1b]/80 marker:font-bold marker:text-[#015f45]">{children}</ol>,
  li: ({ children }) => <li className="pl-1.5">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-7 rounded-2xl border-l-4 border-[#cbd810] bg-[#eef6f2] px-5 py-5 sm:px-6 [&_p]:text-[16px] [&_p]:leading-7">{children}</blockquote>
  ),
  table: ({ children }) => (
    <div className="mt-7 overflow-x-auto rounded-2xl border border-black/10">
      <table className="w-full min-w-[460px] border-collapse text-[15px]">{children}</table>
    </div>
  ),
  th: ({ children, style }) => <th style={style} className="bg-[#f3f1ec] px-4 py-3 text-left text-xs font-bold uppercase tracking-[.1em] text-black/60">{children}</th>,
  td: ({ children, style }) => <td style={style} className="border-t border-black/10 px-4 py-2.5 align-top text-[#1d1d1b]/85">{children}</td>,
  code: ({ children }) => <code className="rounded bg-[#f3f1ec] px-1.5 py-0.5 font-mono text-[0.9em] text-[#063d30]">{children}</code>,
};

/** Block-level Markdown (GFM) in the long-form reading style. */
export function LongformMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}

const inlineComponents: Components = {
  p: ({ children }) => <>{children}</>,
  strong: components.strong,
  a: components.a,
  code: components.code,
};

/** Inline Markdown (links, bold, code) without a wrapping paragraph. */
export function InlineMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={inlineComponents}>
      {children}
    </ReactMarkdown>
  );
}
