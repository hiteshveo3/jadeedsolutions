import React from "react";
import Link from "next/link";
import { HugeiconsIcon, InfoIcon, ArrowRightIcon } from "@/components/icons";

/**
 * Eyebrow Label: Standardized badge component
 */
export const Eyebrow = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`inline-flex items-center gap-2 bg-brand-tint border border-brand/20 text-brand text-xs font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-wider ${className}`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
    <span>{children}</span>
  </div>
);

/**
 * Standardized Legal / Microcopy Disclaimer: Non-italic, AA-compliant contrast text-ink/70
 */
export const Disclaimer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={`text-xs text-ink/70 leading-normal flex items-start gap-1.5 ${className}`}>
    <span
      className="w-4 h-4 rounded-full bg-brand-tint text-brand flex items-center justify-center flex-shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <HugeiconsIcon icon={InfoIcon} size={11} strokeWidth={2.5} />
    </span>
    <span>{children}</span>
  </p>
);

/**
 * StatCard: Reusable Metric Display Card
 */
export const StatCard = ({
  label,
  value,
  subtext,
  variant = "default",
  className = "",
}: {
  label: string;
  value: string | React.ReactNode;
  subtext?: string;
  variant?: "default" | "tint" | "muted";
  className?: string;
}) => {
  const bgClasses =
    variant === "tint"
      ? "bg-brand-tint border border-brand/15"
      : variant === "muted"
      ? "bg-surface-canvas border border-black/[0.06]"
      : "bg-surface border border-black/[0.08]";

  return (
    <div className={`p-4 rounded-xl ${bgClasses} ${className}`}>
      <span className="text-xs font-bold text-ink/65 uppercase tracking-wider block mb-1">
        {label}
      </span>
      <div className="text-xl font-bold text-ink">{value}</div>
      {subtext && <span className="text-xs text-ink/60 mt-1 block">{subtext}</span>}
    </div>
  );
};

/**
 * Reusable CTA Button with sliding arrow hover animation (Deduplicated single source of animation)
 */
export const CTAButton = ({
  variant = "primary",
  href,
  onClick,
  label,
  className = "",
}: {
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  label: string;
  className?: string;
}) => {
  const baseClasses =
    "group min-h-[48px] px-6 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 cursor-pointer";
  const variantClasses =
    variant === "primary"
      ? "bg-brand text-white hover:bg-brand-dark shadow-xs"
      : "bg-surface-muted text-ink hover:bg-surface-track border border-black/[0.08]";

  const content = (
    <>
      <span>{label}</span>
      <HugeiconsIcon
        icon={ArrowRightIcon}
        size={16}
        strokeWidth={2}
        className="transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
      {content}
    </button>
  );
};
