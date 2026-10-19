"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon, ArrowDownIcon } from "./icons";

type Variant = "card" | "card-white" | "plain";

export function AccordionItem({
  title,
  children,
  variant = "card",
  defaultOpen = false,
}: {
  title: ReactNode;
  children: ReactNode;
  variant?: Variant;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const isCard = variant === "card" || variant === "card-white";

  const wrapper =
    variant === "card"
      ? "overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05]"
      : variant === "card-white"
        ? "overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05]"
        : "border-b border-white/[0.08] last:border-0";

  const trigger = isCard
    ? "flex w-full items-center justify-between gap-4 p-6 text-left font-semibold text-white"
    : "flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white/62";

  const body = isCard ? "px-6 pb-6 text-white/72" : "pb-4 text-sm";

  return (
    <div className={wrapper}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={trigger}
      >
        <span>{title}</span>
        <HugeiconsIcon
          icon={ArrowDownIcon}
          size={20}
          className={`shrink-0 text-[#BEF70A] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className={body}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
