"use client";

import type { ReactNode } from "react";
import { HugeiconsIcon, SparklesIcon } from "@/components/icons";
import { openChat } from "./ChatWidget";

/** A soft pill that opens Jadeed AI — the on-site partner to every "free audit" button. */
export function AskButton({ question, className = "", children = "Ask Jadeed AI" }: { question?: string; className?: string; children?: ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => openChat(question)}
      className={`inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white/[0.08] px-6 text-sm font-bold text-white transition-colors hover:bg-white/[0.14] ${className}`}
    >
      <HugeiconsIcon icon={SparklesIcon} size={18} className="text-[#BEF70A]" />
      {children}
    </button>
  );
}
