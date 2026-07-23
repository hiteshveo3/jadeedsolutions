"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon, ArrowUpIcon } from "@/components/icons";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-5 z-[60] grid h-11 w-11 place-items-center rounded-full bg-brand-500 text-white shadow-soft transition-all duration-200 hover:opacity-90 lg:bottom-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <HugeiconsIcon icon={ArrowUpIcon} size={20} />
    </button>
  );
}
