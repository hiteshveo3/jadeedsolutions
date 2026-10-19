import type { ReactNode } from "react";
import { CheckIcon, CloseIcon, HugeiconsIcon } from "@/components/icons";
import { Eyebrow } from "@/components/site/ui";

/* Thin helpers for the V Chauffeurs proposal, built only from the site's own
   pieces: Eyebrow, the lime tick dot from CheckList, the standard card fills. */

export const CARD = "rounded-[22px] border border-white/[0.08] bg-white/[0.06]";
export const SOFT = "rounded-[22px] bg-white/[0.05]";
export const LABEL = "text-xs font-extrabold uppercase tracking-[.15em]";

/** Compact tick row: the same lime dot as the site's CheckList. */
export function Tick({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15px] leading-6 text-white/85">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
        <HugeiconsIcon icon={CheckIcon} size={12} />
      </span>
      <span>{children}</span>
    </li>
  );
}

/** "Doesn't count" row: muted cross dot, same geometry as Tick. */
export function Cross({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15px] leading-6 text-white/75">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/[0.1] text-white/70">
        <HugeiconsIcon icon={CloseIcon} size={11} />
      </span>
      <span>{children}</span>
    </li>
  );
}

/** Section heading: site Eyebrow + Urbanist h2, same scale as SectionHeader. */
export function Head({ eyebrow, title, intro, id }: { eyebrow: string; title: ReactNode; intro?: ReactNode; id?: string }) {
  return (
    <div className="vc-reveal max-w-[780px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-4 text-[34px] leading-[1.02] tracking-[-.04em] [text-wrap:balance] sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-[17px] leading-7 text-white/[0.72] sm:text-lg sm:leading-8">{intro}</p>}
    </div>
  );
}

/** Numbered lime dot used for steps and stages. */
export function Num({ n, solid = true }: { n: number; solid?: boolean }) {
  return (
    <span className={`vc-num grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${solid ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-[#BEF70A]/[0.13] text-[#BEF70A]"}`}>{n}</span>
  );
}
