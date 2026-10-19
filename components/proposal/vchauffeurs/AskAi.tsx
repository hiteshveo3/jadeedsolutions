"use client";

import { openChat } from "@/components/chat/ChatWidget";
import { HugeiconsIcon, SparklesIcon } from "@/components/icons";

/* "Ask our AI before contacting us" prompts for the proposal. They open the site chat,
   which on this page answers only from the V Chauffeurs proposal (lib/ai/proposals). */

const QUICK = ["What counts as an eligible booking?", "What would I pay with 15 bookings a month?", "Which costs are not included?"];

export function AskAiCallout({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-[22px] bg-[#BEF70A]/[0.08] p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]" aria-hidden="true">
          <HugeiconsIcon icon={SparklesIcon} size={20} />
        </span>
        <div>
          <p className="font-bold leading-snug">Something not clear? Ask our AI before contacting us.</p>
          <p className="mt-1 text-sm leading-6 text-white/[0.72]">It answers from this proposal only, any time, in English or Urdu. Anything it can&apos;t answer goes straight to Sameer.</p>
        </div>
      </div>
      {!compact && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {QUICK.map((q) => (
            <li key={q}>
              <button
                type="button"
                onClick={() => openChat(q)}
                className="rounded-full bg-white/[0.07] px-3.5 py-2 text-left text-[13px] font-medium text-white/85 transition-colors hover:bg-[#BEF70A]/[0.14] hover:text-[#BEF70A]"
              >
                {q}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => openChat()}
        className="group mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-[#BEF70A] pl-5 pr-5 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09]"
      >
        <HugeiconsIcon icon={SparklesIcon} size={18} />
        Ask the proposal AI
      </button>
    </div>
  );
}
