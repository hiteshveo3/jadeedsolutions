import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Shared look for the dashboard and client portal, in the site's own dark system (owner,
   Oct 2026): the brand gradient behind everything, translucent cards with a faint line,
   lime only as the accent, pill buttons, no pure white, no white or hover borders. */

/** Inputs: globals.css gives every input a brighter fill, a firm border and a lime focus ring. */
export const field = "w-full rounded-[14px] border px-3.5 py-2.5 text-sm text-white outline-none";

export const primaryButton =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#BEF70A] px-4 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09] disabled:cursor-not-allowed disabled:opacity-50";

export const secondaryButton =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-white/[0.08] px-4 text-sm font-semibold text-white transition-colors hover:bg-white/[0.13] disabled:cursor-not-allowed disabled:opacity-50";

export const iconButton = "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white";

export const card = "rounded-[20px] border border-white/[0.08] bg-white/[0.05]";

/** A link styled as underlined text with a lime underline. */
export const textLink = "font-semibold text-white underline decoration-[#BEF70A] decoration-2 underline-offset-4 hover:text-[#BEF70A]";

export function Chip({ children, on = false, className }: { children: ReactNode; on?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold", on ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.08] text-white/80", className)}>
      {children}
    </span>
  );
}

export function Notice({ text, tone = "neutral" }: { text: string; tone?: "neutral" | "good" }) {
  if (!text) return null;
  return (
    <p role="status" className={cn("mt-2 rounded-[14px] px-3.5 py-2.5 text-sm text-white", tone === "good" ? "bg-[#BEF70A]/[0.1]" : "bg-white/[0.06]")}>
      {text}
    </p>
  );
}

export function ErrorText({ error }: { error: string }) {
  return error ? (
    <p role="alert" className="mt-2 text-sm text-[#ffb4a8]">
      {error}
    </p>
  ) : null;
}

/** The one selector everywhere: a bottom sheet on phones, a list under the field elsewhere. */
export { Select } from "./Select";

/* ------------------------------ safe rich text ------------------------------ */

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

function inline(text: string, allowExternal: boolean) {
  return text.split(INLINE).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) return <Link key={index} href={href} className={textLink}>{label}</Link>;
      if (allowExternal && /^https?:\/\//.test(href)) return <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={textLink}>{label}</a>;
      return <span key={index}>{label}</span>;
    }
    return <span key={index}>{part}</span>;
  });
}

/**
 * Plain words with a little formatting: paragraphs, "- " lists, **bold** and [links](/path).
 * No HTML is ever rendered, so anything typed is safe to show.
 */
export function RichText({ text, allowExternal = false, className }: { text: string; allowExternal?: boolean; className?: string }) {
  const blocks = text.replace(/\r/g, "").split(/\n{2,}/);
  return (
    <div className={cn("space-y-2.5", className)}>
      {blocks.map((block, index) => {
        const lines = block.split("\n").filter((line) => line.trim());
        if (lines.length && lines.every((line) => /^\s*[-•*]\s+/.test(line))) {
          return (
            <ul key={index} className="space-y-1">
              {lines.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#BEF70A]" />
                  <span>{inline(line.replace(/^\s*[-•*]\s+/, ""), allowExternal)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="whitespace-pre-wrap break-words">
            {inline(block.replace(/^#+\s*/gm, ""), allowExternal)}
          </p>
        );
      })}
    </div>
  );
}
