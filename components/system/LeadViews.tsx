import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/system/Icon";
import { card, secondaryButton } from "@/components/system/ui";
import { CALL_METHOD_LABEL } from "@/lib/booking";
import { BOOKING_STATUS_LABEL, FLAG_LABEL, LEAD_STATUS_LABEL, type Booking, type Lead, type LeadActivity, type LeadFlag } from "@/lib/system/types";
import { ago, cn, pkTime } from "@/lib/utils";

/* Read-only lead views shared by the list's side panel and the full lead page (from Jadeed
   Marketing). Times are shown in Pakistan time, where the team works. */

export const leadName = (lead: Lead) => lead.business.name || lead.contact.name || "Unnamed lead";
export const leadPlace = (lead: Lead) => [lead.business.city, lead.business.country].filter(Boolean).join(", ");
export const leadLine = (lead: Lead) => [lead.business.trade || lead.business.service, leadPlace(lead)].filter(Boolean).join(" · ");
const pounds = (value: number, currency = "GBP") => new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);

export function ScoreBadge({ score, size = "md" }: { score: Lead["score"]; size?: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-extrabold",
        size === "lg" ? "h-10 w-10 text-base" : "h-7 w-7 text-xs",
        score === "A" ? "bg-[#BEF70A] text-[#0B1F12]" : score === "B" ? "bg-[#BEF70A]/[0.14] text-[#BEF70A]" : "bg-white/[0.08] text-white/60"
      )}
      aria-label={`Score ${score}`}
    >
      {score}
    </span>
  );
}

export function StatusPill({ status }: { status: Lead["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold",
        status === "won" ? "bg-[#BEF70A] text-[#0B1F12]" : status === "lost" ? "bg-white/[0.05] text-white/45" : "bg-white/[0.08] text-white/80"
      )}
    >
      {LEAD_STATUS_LABEL[status]}
    </span>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] py-2.5 text-sm">
      <dt className="text-white/50">{label}</dt>
      <dd className="min-w-0 break-words text-white/90">{children}</dd>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: IconName; children: ReactNode }) {
  return (
    <section className={card}>
      <h2 className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3.5 text-[15px] text-white sm:px-5">
        <Icon name={icon} size={17} className="text-[#BEF70A]" />
        {title}
      </h2>
      <dl className="divide-y divide-white/[0.06] px-4 py-1 sm:px-5">{children}</dl>
    </section>
  );
}

const whatsapp = (phone: string) => `https://wa.me/${phone.replace(/[^\d]/g, "")}`;

export function ContactLinks({ lead }: { lead: Lead }) {
  return (
    <div className="flex flex-wrap gap-2">
      {lead.contact.email ? (
        <a href={`mailto:${lead.contact.email}`} className={cn(secondaryButton, "min-h-9 px-3.5")}>
          <Icon name="mail" size={15} />
          Email
        </a>
      ) : null}
      {lead.contact.phone ? (
        <a href={`tel:${lead.contact.phone}`} className={cn(secondaryButton, "min-h-9 px-3.5")}>
          <Icon name="phone" size={15} />
          Call
        </a>
      ) : null}
      {lead.contact.phone ? (
        <a href={whatsapp(lead.contact.phone)} target="_blank" rel="noopener noreferrer" className={cn(secondaryButton, "min-h-9 px-3.5")}>
          <Icon name="whatsapp" size={15} />
          WhatsApp
        </a>
      ) : null}
    </div>
  );
}

/** Jadeed AI's view of the lead: score reason, next step, summary and flags. */
export function AiOpinion({ lead }: { lead: Lead }) {
  return (
    <div className="rounded-[20px] bg-[#BEF70A]/[0.07] p-4 sm:p-5">
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#BEF70A]">
        <Icon name="sparkles" size={14} />
        Jadeed AI · score {lead.score}
      </p>
      {lead.scoreReason ? <p className="mt-2.5 text-sm leading-relaxed text-white">{lead.scoreReason}</p> : null}
      {lead.nextStep ? (
        <p className="mt-2 text-sm leading-relaxed text-white">
          <span className="font-bold">Next step:</span> {lead.nextStep}
        </p>
      ) : null}
      {lead.aiSummary ? <p className="mt-2 text-sm leading-relaxed text-white/70">{lead.aiSummary}</p> : null}
      {lead.flags.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {lead.flags.map((flag) => (
            <span key={flag} className="rounded-full bg-[#06301D]/70 px-2.5 py-0.5 text-xs font-semibold text-white">
              {FLAG_LABEL[flag as LeadFlag] ?? flag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** `siteBase` is the public site origin on the app host ("" where the site and dashboard share a host). */
export function LeadProfile({ lead, context, siteBase = "" }: { lead: Lead; context: Record<string, string>; siteBase?: string }) {
  const b = lead.business;
  const call = lead.goal.preferredCall;
  return (
    <div className="space-y-4">
      <Section title="Contact" icon="profile">
        <Row label="Name">{lead.contact.name || "—"}</Row>
        <Row label="Email">{lead.contact.email ? <a href={`mailto:${lead.contact.email}`} className="underline decoration-white/30 underline-offset-4">{lead.contact.email}</a> : "—"}</Row>
        <Row label="Phone">{lead.contact.phone ? <a href={`tel:${lead.contact.phone}`} className="underline decoration-white/30 underline-offset-4">{lead.contact.phone}</a> : "—"}</Row>
      </Section>
      <Section title="Business" icon="shop">
        <Row label="Business">{b.name || "—"}</Row>
        <Row label="Service">{b.service ?? "—"}</Row>
        {b.trade ? <Row label="Trade (AI)">{b.trade}</Row> : null}
        <Row label="Location">{leadPlace(lead) || "—"}</Row>
        {b.website ? (
          <Row label="Website">
            <a href={/^https?:/.test(b.website) ? b.website : `https://${b.website}`} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4">
              {b.website}
            </a>
          </Row>
        ) : null}
        <Row label="Typical job">{b.jobValue ? pounds(b.jobValue, b.currency) : "—"}</Row>
        <Row label="Budget">{b.budget ?? "—"}</Row>
      </Section>
      <Section title="What they need" icon="target">
        <Row label="Message">{lead.goal.notes ? <span className="whitespace-pre-wrap">{lead.goal.notes}</span> : "—"}</Row>
        {call ? (
          <Row label="Preferred call">
            {call.method}, {call.day} around {call.time}
            <span className="block text-xs text-white/45">{call.timeZone ? call.timeZone : "their own time"}</span>
          </Row>
        ) : null}
      </Section>
      <Section title="Where they came from" icon="globe">
        <Row label="Source">{lead.source === "chat" ? "Jadeed AI chat" : "Free audit form"}</Row>
        {context.pageUrl ? <Row label="Page">{context.pageUrl.replace(/^https?:\/\/[^/]+/, "") || "/"}</Row> : null}
        {context.referrer ? <Row label="Referrer">{context.referrer}</Row> : null}
        {context.utm ? <Row label="UTM">{context.utm}</Row> : null}
        <Row label="Received">{pkTime(lead.createdAt)} PKT</Row>
        {lead.token ? (
          <Row label="Audit page">
            <a href={`${siteBase}/audit/${lead.token}`} target="_blank" rel="noopener noreferrer" className="underline decoration-[#BEF70A] decoration-2 underline-offset-4">
              Open their page
            </a>
          </Row>
        ) : null}
      </Section>
    </div>
  );
}

export function CallSummary({ booking }: { booking: Booking }) {
  return (
    <div>
      <p className="font-display text-lg font-extrabold text-white">{pkTime(booking.startsAt)} PKT</p>
      <p className="mt-0.5 text-sm text-white/60">
        {booking.minutes} minutes · {CALL_METHOD_LABEL[booking.method]} · {BOOKING_STATUS_LABEL[booking.status]}
        {booking.timeZone && booking.timeZone !== "Asia/Karachi"
          ? ` · their time ${new Intl.DateTimeFormat("en-GB", { weekday: "short", hour: "numeric", minute: "2-digit", hour12: true, timeZone: booking.timeZone, timeZoneName: "short" }).format(new Date(booking.startsAt))}`
          : ""}
      </p>
      {booking.meetUrl && booking.status === "confirmed" ? (
        <a href={booking.meetUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#BEF70A] px-4 text-sm font-bold text-[#0B1F12] hover:bg-[#ABDE09]">
          <Icon name="monitor" size={16} />
          Join Google Meet
        </a>
      ) : null}
    </div>
  );
}

const ACTIVITY_ICON: Record<LeadActivity["type"], IconName> = {
  note: "document",
  status: "layers",
  assign: "profile",
  booking: "calendar",
  cancel: "calendar",
  email_draft: "mail",
};

export function Timeline({ activity, lead }: { activity: LeadActivity[]; lead: Lead }) {
  const items = [
    ...activity,
    { id: "created", type: "status" as const, text: lead.source === "chat" ? "Came in through a Jadeed AI chat." : "Sent the free audit form.", by: "system", at: lead.createdAt },
  ];
  return (
    <ol className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="flex gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[#BEF70A]">
            <Icon name={ACTIVITY_ICON[item.type]} size={15} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white/90">{item.text}</p>
            <p className="mt-0.5 text-xs text-white/45">
              {item.by === "system" ? "Jadeed" : ("byName" in item && item.byName) || item.by} · {ago(item.at)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** The side panel next to the leads list (desktop): enough to decide, with a link to everything. */
export function LeadPeek({ lead, href, closeHref }: { lead: Lead; href: string; closeHref: string }) {
  return (
    <aside className={card} aria-label={`Lead: ${leadName(lead)}`}>
      <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] p-4 sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <ScoreBadge score={lead.score} />
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-extrabold text-white">{leadName(lead)}</p>
            <p className="truncate text-sm text-white/55">{leadLine(lead) || "—"}</p>
            <div className="mt-2">
              <StatusPill status={lead.status} />
            </div>
          </div>
        </div>
        <Link href={closeHref} aria-label="Close" scroll={false} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/55 hover:bg-white/[0.08] hover:text-white">
          <Icon name="x" size={18} />
        </Link>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <p className="text-sm font-semibold text-white">{lead.contact.name}</p>
          <p className="text-sm text-white/55">{[lead.contact.email, lead.contact.phone].filter(Boolean).join(" · ") || "No contact details"}</p>
          <div className="mt-3">
            <ContactLinks lead={lead} />
          </div>
        </div>
        <AiOpinion lead={lead} />
        <dl className="divide-y divide-white/[0.06]">
          {lead.business.jobValue ? <Row label="Typical job">{pounds(lead.business.jobValue, lead.business.currency)}</Row> : null}
          <Row label="Service">{lead.business.service ?? "—"}</Row>
          <Row label="Budget">{lead.business.budget ?? "—"}</Row>
          <Row label="Received">{ago(lead.createdAt)}</Row>
        </dl>
        <Link href={href} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#BEF70A] px-4 text-sm font-bold text-[#0B1F12] hover:bg-[#ABDE09]">
          Open the lead
          <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </aside>
  );
}

/** Leads as a list (used on Home). */
export function LeadList({ leads, base }: { leads: Lead[]; base: string }) {
  return (
    <ul className="-my-1 divide-y divide-white/[0.06]">
      {leads.map((lead) => (
        <li key={lead.id}>
          <Link href={`${base}/leads/${lead.id}`} className="-mx-2 flex items-center gap-3 rounded-[14px] px-2 py-3 transition-colors hover:bg-white/[0.04]">
            <ScoreBadge score={lead.score} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-white">{leadName(lead)}</span>
              <span className="block truncate text-xs text-white/50">{leadLine(lead) || lead.contact.email || "—"}</span>
            </span>
            <span className="hidden sm:block">
              <StatusPill status={lead.status} />
            </span>
            <span className="w-16 shrink-0 text-right text-xs text-white/45">{ago(lead.createdAt)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
