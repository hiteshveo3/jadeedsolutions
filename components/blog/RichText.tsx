import Link from "next/link";
import type { ReactNode } from "react";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s<>"')\]]+)/g;

type RichTextProps = {
  text: string;
  /** Use on orange/dark callouts so links stay readable */
  variant?: "default" | "onBrand" | "onBrandInverse";
  className?: string;
};

function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function linkClass(variant: RichTextProps["variant"]) {
  if (variant === "onBrand") {
    return "font-semibold text-white underline decoration-white/50 underline-offset-2 hover:decoration-white";
  }
  if (variant === "onBrandInverse") {
    return "font-semibold text-brand-500 underline decoration-brand-500/40 underline-offset-2 hover:decoration-brand-500";
  }
  return "font-semibold text-brand-500 underline decoration-brand-500/30 underline-offset-2 hover:decoration-brand-500";
}

export function RichText({
  text,
  variant = "default",
  className,
}: RichTextProps) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(LINK_RE.source, "g");
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }

    const label = match[1];
    const mdHref = match[2];
    const bareUrl = match[3];
    const href = mdHref ?? bareUrl!;
    const children = label ?? bareUrl!;
    const cls = linkClass(variant);

    if (isInternal(href)) {
      nodes.push(
        <Link key={key++} href={href} className={cls}>
          {children}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={key++}
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>,
      );
    }

    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  if (className) {
    return <span className={className}>{nodes}</span>;
  }

  return <>{nodes}</>;
}
