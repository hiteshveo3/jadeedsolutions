"use client";

import { useState } from "react";
import {
  HugeiconsIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  CopyIcon,
  CheckIcon,
} from "@/components/icons";

export function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const enc = encodeURIComponent;
  const links = [
    {
      label: "Share on Twitter",
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
      icon: TwitterIcon,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      icon: FacebookIcon,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      icon: LinkedinIcon,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
      icon: WhatsappIcon,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-ink">Share</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-ink transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-500"
        >
          <HugeiconsIcon icon={l.icon} size={16} />
        </a>
      ))}
      <button
        type="button"
        aria-label="Copy link"
        onClick={copy}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 px-3 text-sm text-ink transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-500"
      >
        <HugeiconsIcon icon={copied ? CheckIcon : CopyIcon} size={16} />
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
