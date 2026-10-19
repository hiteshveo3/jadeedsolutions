import Link from "next/link";
import { Icon } from "@/components/system/Icon";
import { EmptyState, Kpi, Label, PageHeader, Panel } from "@/components/system/Page";
import { card, primaryButton, textLink } from "@/components/system/ui";
import { adminDb } from "@/lib/firebase/admin";
import { money } from "@/lib/money";
import { clientTotals, getClient, hasUnread, listInvoices, listProposals, listResults, listUpdates } from "@/lib/portal/data";
import { plain } from "@/lib/system/data";
import type { SessionUser } from "@/lib/system/session";
import { LEAD_STATUS_LABEL, type Booking, type Lead, type ResultEntry } from "@/lib/system/types";
import { siteUrl } from "@/lib/system/urls";
import { cn, pkMonth, pkTime, shortDate } from "@/lib/utils";
import { ResultStatusPill } from "./Results";

/* Home screens for people outside the team (from Jadeed Marketing): a client's portal
   overview, and a visitor's own account. Design Lab idea 093 A — sidebar + three numbers,
   the newest customers and the latest from the team — with idea 057 B's small monthly bars. */

const greeting = () => {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Europe/London" }).format(new Date()));
  return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
};

/** Customers per month for the last six months, with the paid ones in lime. */
function MonthBars({ results }: { results: ResultEntry[] }) {
  const now = new Date(`${pkMonth()}-01T00:00:00Z`);
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (5 - i), 1));
    const key = d.toISOString().slice(0, 7);
    const all = results.filter((r) => r.firstContact.slice(0, 7) === key);
    return { key, label: new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" }).format(d), count: all.length, paid: all.filter((r) => r.status === "paid").length };
  });
  const max = Math.max(1, ...months.map((m) => m.count));
  return (
    <div>
      <div className="flex h-36 items-end gap-2 sm:gap-3" role="img" aria-label={months.map((m) => `${m.label}: ${m.count} customers, ${m.paid} paid`).join("; ")}>
        {months.map((m) => (
          <div key={m.key} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <span className="text-xs font-bold tabular-nums text-white/70">{m.count || ""}</span>
            <div className="relative w-full max-w-[44px] overflow-hidden rounded-t-[10px] bg-white/[0.1]" style={{ height: `${Math.max(4, (m.count / max) * 100)}%` }}>
              <div className="absolute inset-x-0 bottom-0 rounded-t-[10px] bg-[#BEF70A]" style={{ height: m.count ? `${(m.paid / m.count) * 100}%` : 0 }} />
            </div>
            <span className="text-[11px] text-white/45">{m.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-4 text-xs text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.25]" /> Customers brought in
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#BEF70A]" /> Paid
        </span>
      </p>
    </div>
  );
}

export async function ClientHome({ user, base }: { user: SessionUser; base: string }) {
  if (!user.clientId) return <EmptyState icon="lock" title="No portal yet" body="Your login isn't linked to a business yet. Ask Sameer to invite you." />;
  const canSeeMoney = user.role === "client";
  const [client, results, updates, proposals, invoices, unread] = await Promise.all([
    getClient(user.clientId),
    listResults(user.clientId),
    listUpdates(user.clientId, 1),
    listProposals(user.clientId),
    canSeeMoney ? listInvoices(user.clientId) : Promise.resolve([]),
    hasUnread(user.clientId, user.uid, "client"),
  ]);
  if (!client) return <EmptyState icon="lock" title="No portal yet" body="This business isn't set up yet. Ask Sameer." />;
  const month = pkMonth();
  const totals = clientTotals(results, invoices, month);
  const waiting = proposals.filter((p) => p.status === "sent");
  const due = invoices.filter((i) => i.status === "sent");
  const first = user.name.split(" ")[0] || "there";
  const monthName = new Intl.DateTimeFormat("en-GB", { month: "long", timeZone: "UTC" }).format(new Date(`${month}-01T00:00:00Z`));
  const latest = updates[0];

  return (
    <>
      <PageHeader title={`${greeting()}, ${first}`} description={`${client.businessName} · ${monthName}`} />
      {unread || waiting.length || due.length ? (
        <div className="mb-5 space-y-2">
          {unread ? (
            <Link href={`${base}/messages`} className="flex items-center gap-2.5 rounded-[18px] bg-[#BEF70A]/[0.08] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#BEF70A]/[0.12]">
              <Icon name="message" size={18} className="text-[#BEF70A]" />
              You have a new message from the team
              <Icon name="arrowRight" size={15} className="ml-auto text-[#BEF70A]" />
            </Link>
          ) : null}
          {waiting.map((p) => (
            <Link key={p.id} href={`${base}/proposals/${p.id}`} className="flex items-center gap-2.5 rounded-[18px] bg-[#BEF70A]/[0.08] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#BEF70A]/[0.12]">
              <Icon name="document" size={18} className="text-[#BEF70A]" />
              A proposal is waiting for you: {p.title}
              <Icon name="arrowRight" size={15} className="ml-auto text-[#BEF70A]" />
            </Link>
          ))}
          {due.map((i) => (
            <Link key={i.id} href={`${base}/invoices`} className="flex items-center gap-2.5 rounded-[18px] bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.09]">
              <Icon name="receipt" size={18} className="text-[#BEF70A]" />
              Invoice {i.number}: {money(i.totalCents, i.currency)} due {i.dueOn ? shortDate(i.dueOn) : ""}
              <Icon name="arrowRight" size={15} className="ml-auto text-[#BEF70A]" />
            </Link>
          ))}
        </div>
      ) : null}

      {/* Phones: the month's customers across the top, the two amounts side by side. */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="col-span-2 sm:col-span-1">
          <Kpi label="Customers this month" value={totals.leadsThisMonth} icon="people" lime note={`${totals.leadsAll} since we started`} />
        </div>
        <Kpi label="Your customers paid" value={money(totals.paidThisMonthCents, client.currency)} icon="money" note={`${money(totals.revenueCents, client.currency)} in total`} />
        {canSeeMoney ? (
          <Kpi label="Fees on paid jobs" value={money(totals.feesThisMonthCents, client.currency)} icon="receipt" note={`${client.feePercent}% of paid jobs only`} />
        ) : (
          <Kpi label="Paid jobs" value={totals.paidJobs} icon="checkCircle" />
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Panel
          title="Your newest customers"
          action={
            <Link href={`${base}/leads`} className={cn(textLink, "text-sm")}>
              All results
            </Link>
          }
        >
          {results.length ? (
            <ul className="space-y-2">
              {results.slice(0, 5).map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 rounded-[14px] bg-white/[0.04] px-3.5 py-2.5">
                  <span className="min-w-0 truncate text-sm">
                    <b className="font-semibold text-white">{r.customer}</b>
                    {r.service ? <span className="text-white/50"> · {r.service}</span> : null}
                  </span>
                  <ResultStatusPill status={r.status} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-white/55">Add each customer Jadeed brings in, and update them as the job moves on.</p>
          )}
        </Panel>

        <div className="space-y-4">
          <section className={cn(card, "p-4 sm:p-5")}>
            <div className="flex items-center justify-between gap-3">
              <Label>Latest from the team</Label>
              <Link href={`${base}/work`} className={cn(textLink, "text-xs")}>
                All updates
              </Link>
            </div>
            {latest ? (
              <div className="mt-3 flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#BEF70A] text-xs font-extrabold text-[#0B1F12]">{(latest.createdByName ?? "J").slice(0, 1)}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{latest.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-sm text-white/60">{latest.next ? `Next: ${latest.next}` : latest.body}</p>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-white/55">The team&apos;s first update will appear here.</p>
            )}
          </section>
          <section className={cn(card, "p-4 sm:p-5")}>
            <Label>Last six months</Label>
            <div className="mt-4">
              <MonthBars results={results} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

/** A visitor's own account: the requests and calls under their email address. */
export async function VisitorHome({ user }: { user: SessionUser }) {
  const db = adminDb();
  const snap = user.email ? await db.collection("leads").where("contact.email", "==", user.email.toLowerCase()).limit(5).get() : null;
  const leads = (snap?.docs ?? []).map((d) => ({ ...plain<Lead>(d.data()), id: d.id }));
  const bookings = await Promise.all(
    leads
      .filter((l) => l.bookingId)
      .map(async (l) => {
        const b = await db.collection("bookings").doc(l.bookingId!).get();
        return b.exists ? { ...plain<Booking>(b.data()), id: b.id } : null;
      })
  );
  const first = user.name.split(" ")[0] || "there";
  return (
    <>
      <PageHeader title={`Welcome, ${first}`} description="Your free audit and your call with Sameer." />
      {leads.length ? (
        <div className="space-y-4">
          {leads.map((lead) => {
            const call = bookings.find((b) => b && b.leadId === lead.id && b.status === "confirmed");
            return (
              <Panel key={lead.id} title={lead.business?.name || "Your business"}>
                <p className="text-sm text-white/70">Status: {LEAD_STATUS_LABEL[lead.status]}</p>
                {call ? <p className="mt-1 text-sm text-white">Call booked for {pkTime(call.startsAt)} Pakistan time.</p> : null}
                {lead.token ? (
                  <a href={siteUrl(`/audit/${lead.token}`)} className={cn(primaryButton, "mt-4")}>
                    Open your audit page
                    <Icon name="arrowRight" size={16} />
                  </a>
                ) : null}
              </Panel>
            );
          })}
        </div>
      ) : (
        <Panel>
          <EmptyState icon="home" title="Nothing here yet" body="Ask for a free audit on the website with this email address, and it shows up here. If Jadeed invited you to a client portal, ask Sameer to check the email address." />
        </Panel>
      )}
    </>
  );
}
