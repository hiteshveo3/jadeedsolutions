import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingPicker } from "@/components/audit/BookingPicker";
import { Icon } from "@/components/system/Icon";
import { leadByToken } from "@/lib/leads/store";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Your free audit",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export const dynamic = "force-dynamic";

const REVIEWED = new Set(["audit_sent", "won", "lost"]);

/* The visitor's private audit page (from Jadeed Marketing's /audit/[token]), linked from the
   form's thank-you and the confirmation email. Anyone with the link can see it, so it shows
   only what the visitor typed in — never the score, flags or team notes. A and B leads book
   their call here. */
export default async function AuditPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const view = await leadByToken(token).catch(() => null);
  if (!view) notFound();

  const { lead, booking } = view;
  const firstName = lead.contact.name.split(/\s+/)[0] || "there";
  const received = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(lead.createdAt));
  const reviewed = REVIEWED.has(lead.status);
  const hasCall = Boolean(booking && booking.status === "confirmed");
  // The summary was written before booking; drop its "pick a time" line once a call exists.
  const summary = hasCall ? lead.visitorSummary?.replace(/\s*[^.!?]*(pick a time|audit page)[^.!?]*[.!?]?\s*$/i, "") : lead.visitorSummary;

  const steps: { title: string; body: string; state: "done" | "now" | "next" }[] = [
    { title: "Request received", body: received, state: "done" },
    { title: "Sameer reviews your visibility", body: "How you show up on Google, the Map Pack and AI assistants, and what's costing you calls.", state: reviewed ? "done" : "now" },
    ...(lead.bookable ? [{ title: hasCall ? "Call booked" : "Pick a call time", body: "A free 30-minute call to walk through what we found.", state: hasCall ? ("done" as const) : ("now" as const) }] : []),
    { title: "Your plan arrives", body: "A plain-English audit and growth plan by email, within 24 hours of your request.", state: reviewed ? "done" : "next" },
  ];

  const answers: [string, string | undefined][] = [
    ["Business", lead.business.name],
    ["Service", lead.business.service],
    ["Monthly budget", lead.business.budget],
    ["Typical job", lead.business.jobValue ? `£${lead.business.jobValue.toLocaleString("en-GB")}` : undefined],
    ["Preferred call", lead.goal.preferredCall ? `${lead.goal.preferredCall.method}, ${lead.goal.preferredCall.day} around ${lead.goal.preferredCall.time}` : undefined],
    ["Your message", lead.goal.notes],
  ];

  return (
    <section className="bg-glow">
      <div className="container max-w-3xl pb-20 pt-28 sm:pt-36">
        <p className="eyebrow">Private audit page</p>
        <h1 className="mt-4 text-[38px] leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl">Your free audit, {firstName}</h1>
        <p className="mt-4 text-[17px] leading-7 text-white/70">Only people with this link can open this page. Keep it to come back any time.</p>

        {summary ? (
          <div className="mt-8 flex items-start gap-3 rounded-[22px] border border-white/[0.08] bg-white/[0.05] p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
              <Icon name="sparkles" size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Jadeed AI</p>
              <p className="mt-1 text-[15px] leading-relaxed text-white/80">{summary}</p>
            </div>
          </div>
        ) : null}

        <ol className="mt-10">
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 pb-7 last:pb-0">
              {i < steps.length - 1 ? <span aria-hidden="true" className="absolute bottom-0 left-[17px] top-10 w-px bg-white/[0.12]" /> : null}
              <span
                className={cn(
                  "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
                  step.state === "done" ? "bg-[#BEF70A] text-[#0B1F12]" : step.state === "now" ? "bg-[#BEF70A]/[0.15] text-[#BEF70A]" : "bg-white/[0.07] text-white/50"
                )}
              >
                {step.state === "done" ? <Icon name="check" size={15} /> : i + 1}
              </span>
              <div className="pt-1.5">
                <p className="text-base font-bold text-white">
                  {step.title}
                  {step.state === "now" ? <span className="ml-2 rounded-full bg-[#BEF70A]/[0.15] px-2 py-0.5 text-xs font-bold text-[#BEF70A]">Now</span> : null}
                </p>
                <p className="mt-0.5 text-sm text-white/60">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {lead.bookable ? (
          <div className="mt-10">
            <BookingPicker
              token={token}
              booked={hasCall && booking ? { startsAt: booking.startsAt, method: booking.method, minutes: booking.minutes, timeZone: booking.timeZone, meetUrl: booking.meetUrl } : null}
            />
          </div>
        ) : null}

        <div className="mt-10 rounded-[22px] border border-white/[0.08] bg-white/[0.05]">
          <h2 className="border-b border-white/[0.08] px-5 py-4 text-lg text-white">What you told us</h2>
          <dl className="divide-y divide-white/[0.06]">
            {answers
              .filter((row): row is [string, string] => Boolean(row[1]))
              .map(([label, value]) => (
                <div key={label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[11rem_1fr]">
                  <dt className="text-sm font-semibold text-white/55">{label}</dt>
                  <dd className="whitespace-pre-wrap text-sm text-white/90">{value}</dd>
                </div>
              ))}
          </dl>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-white/60">
          Questions? Reply to your confirmation email or write to{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-white underline decoration-[#BEF70A] decoration-2 underline-offset-4">
            {siteConfig.email}
          </a>
          . While you wait, see{" "}
          <Link href="/how-it-works" className="font-semibold text-white underline decoration-[#BEF70A] decoration-2 underline-offset-4">
            how Jadeed works
          </Link>
          .
        </p>
        <div className="mt-10 flex items-center gap-2.5 text-xs text-white/40">
          <Image src="/jadeed-favicon.webp" alt="" width={20} height={20} className="h-5 w-5 rounded-[6px]" />
          Jadeed Solutions · Narowal, Pakistan · working with local businesses in the UK, US, Canada and UAE
        </div>
      </div>
    </section>
  );
}
