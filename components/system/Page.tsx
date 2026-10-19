import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/system/Icon";
import { cn } from "@/lib/utils";
import { card } from "./ui";

/* Building blocks shared by every dashboard and portal screen (from Jadeed Marketing's
   components/system/Page.tsx), in the site's dark system. */

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-[28px] leading-tight tracking-[-0.03em] text-white sm:text-[32px]">{title}</h1>
        {description ? <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/65">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

/** A number card. `lime` makes the number the page's one lime accent. */
export function Kpi({ label, value, note, icon, lime = false }: { label: string; value: string | number; note?: string; icon?: IconName; lime?: boolean }) {
  return (
    <div className={cn(card, "p-4 sm:p-5")}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-white/60">{label}</p>
        {icon ? <Icon name={icon} size={18} className="text-[#BEF70A]/80" /> : null}
      </div>
      <p className={cn("mt-2 font-display text-[30px] font-extrabold leading-none tracking-[-0.04em] tabular-nums", lime ? "text-[#BEF70A]" : "text-white")}>{value}</p>
      {note ? <p className="mt-1.5 text-xs text-white/50">{note}</p> : null}
    </div>
  );
}

export function Panel({ title, action, children, className, padded = true }: { title?: string; action?: ReactNode; children: ReactNode; className?: string; padded?: boolean }) {
  return (
    <section className={cn(card, className)}>
      {title ? (
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3.5 sm:px-5">
          <h2 className="text-[15px] tracking-[-0.01em] text-white">{title}</h2>
          {action}
        </div>
      ) : null}
      <div className={padded ? "p-4 sm:p-5" : undefined}>{children}</div>
    </section>
  );
}

export function EmptyState({ icon, title, body, children }: { icon: IconName; title: string; body: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-4 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#BEF70A]/[0.1] text-[#BEF70A]">
        <Icon name={icon} size={22} />
      </span>
      <p className="mt-4 font-display text-lg font-extrabold text-white">{title}</p>
      <p className="mt-1 max-w-sm text-sm leading-relaxed text-white/60">{body}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

/** A lime-tinted note (never a side bar — owner's rule). */
export function Note({ children, icon = "info", className }: { children: ReactNode; icon?: IconName; className?: string }) {
  return (
    <div className={cn("flex items-start gap-2.5 rounded-[18px] bg-[#BEF70A]/[0.07] px-4 py-3 text-sm leading-relaxed text-white/85", className)}>
      <Icon name={icon} size={18} className="mt-0.5 text-[#BEF70A]" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/** Small uppercase label used above groups of rows. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[11px] font-bold uppercase tracking-[0.14em] text-white/45", className)}>{children}</p>;
}
