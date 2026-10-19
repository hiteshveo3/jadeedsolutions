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
      <span className="mr-1 text-sm font-semibold text-white">Share</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] text-white transition-colors hover:bg-white/10 hover:text-[#BEF70A]"
        >
          <HugeiconsIcon icon={l.icon} size={16} />
        </a>
      ))}
      <button
        type="button"
        aria-label="Copy link"
        onClick={copy}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/[0.08] px-3 text-sm text-white transition-colors hover:bg-white/10 hover:text-[#BEF70A]"
      >
        <HugeiconsIcon icon={copied ? CheckIcon : CopyIcon} size={16} />
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
