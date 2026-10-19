"use client";

import { useEffect, useState } from "react";
import { ArrowDownIcon, HugeiconsIcon } from "@/components/icons";

export const NAV = [
  { id: "overview", label: "Overview" },
  { id: "build", label: "What We Build" },
  { id: "plan", label: "90-Day Plan" },
  { id: "partnership", label: "Partnership" },
  { id: "pricing", label: "Pricing" },
  { id: "investment", label: "Investment" },
  { id: "faqs", label: "FAQs" },
];

/** Proposal section bar. Sticks just under the site's fixed navbar and uses the
 *  same glass treatment, pills and lime "current" state as the rest of the site. */
export function Nav() {
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let current = NAV[0].id;
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = NAV.find((n) => n.id === active)!;

  return (
    <div className="sticky top-16 z-40 border-b border-white/[0.08] bg-[#06301D]/85 backdrop-blur-xl sm:top-[72px]">
      <div className="mx-auto flex h-12 max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
        <p className="min-w-0 truncate text-sm font-bold tracking-[-.01em]">
          V Chauffeurs <span className="font-semibold text-white/60">× Jadeed Solutions</span>
        </p>

        <nav aria-label="Proposal sections" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`inline-flex h-9 items-center rounded-full px-3.5 text-[13px] font-semibold transition-colors ${
                    active === n.id ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-white/[0.08] pl-4 pr-3 text-[13px] font-semibold transition-colors hover:bg-white/[0.14] xl:hidden"
          aria-expanded={open}
          aria-controls="vc-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {current.label}
          <HugeiconsIcon icon={ArrowDownIcon} size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open && (
        <nav id="vc-menu" aria-label="Proposal sections" className="border-t border-white/[0.08] xl:hidden">
          <ul className="mx-auto grid max-w-[1280px] gap-1 px-5 py-3 sm:grid-cols-2 sm:px-8">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`flex min-h-[44px] items-center rounded-full px-4 text-[15px] font-semibold transition-colors ${
                    active === n.id ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/80 hover:bg-white/[0.08]"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
