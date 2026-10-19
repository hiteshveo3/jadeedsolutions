import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ResultsRecord } from "@/components/portal/Results";
import { Icon } from "@/components/system/Icon";
import { ListFilters } from "@/components/system/ListFilters";
import { LeadPeek, ScoreBadge, StatusPill, leadLine, leadName } from "@/components/system/LeadViews";
import { EmptyState, PageHeader, Panel } from "@/components/system/Page";
import { getClient, listResults } from "@/lib/portal/data";
import { listLeads } from "@/lib/system/data";
import { appBase, isClient, isStaff, requireUser } from "@/lib/system/session";
import { LEAD_STATUS_LABEL, type Lead, type LeadStatus } from "@/lib/system/types";
import { ago, cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Leads" };

type Params = { q?: string; score?: string; status?: string; source?: string; owner?: string; lead?: string };

function matches(lead: Lead, params: Params) {
  if (params.score && lead.score !== params.score) return false;
  if (params.status && lead.status !== params.status) return false;
  if (params.source && lead.source !== params.source) return false;
  if (params.owner === "none" && lead.assignedTo) return false;
  if (params.owner && params.owner !== "none" && lead.assignedTo !== params.owner) return false;
  if (params.q) {
    const haystack = [lead.business.name, lead.contact.name, lead.contact.email, lead.contact.phone, lead.business.service, lead.business.trade, lead.business.city, lead.business.country]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (!params.q.toLowerCase().split(/\s+/).every((word) => haystack.includes(word))) return false;
  }
  return true;
}

/* Leads (from Jadeed Marketing): the list with filters, and on desktop a detail panel on the
   right so a lead can be checked without leaving the list. Clients see their shared record of
   customers here instead (Design Lab idea 094 A). */
export default async function LeadsPage({ searchParams }: { searchParams: Promise<Params> }) {
  const [user, base, params] = await Promise.all([requireUser(), appBase(), searchParams]);
  if (isClient(user.role) && user.clientId) {
    const [client, results] = await Promise.all([getClient(user.clientId), listResults(user.clientId)]);
    return (
      <>
        <PageHeader title="Results" description="Every customer Jadeed brought in, and where each one stands. Update them as jobs get booked, done and paid: this shared record is how fees are worked out." />
        <ResultsRecord results={results} feePercent={client?.feePercent ?? 10} canSeeMoney={user.role === "client"} currency={client?.currency} />
      </>
    );
  }
  if (!isStaff(user.role)) return <EmptyState icon="lock" title="Team only" body="Leads are for the Jadeed team." />;

  const all = await listLeads(300);
  const leads = all.filter((lead) => matches(lead, params));
  const selected = params.lead ? all.find((lead) => lead.id === params.lead) : undefined;

  const query = (changes: Partial<Params>) => {
    const next = new URLSearchParams(Object.entries({ ...params, ...changes }).filter(([, v]) => v) as [string, string][]);
    return next.size ? `?${next}` : "";
  };
  const counts = (score: string) => all.filter((lead) => matches(lead, { ...params, score, lead: undefined })).length;

  return (
    <>
      <PageHeader title="Leads" description={`${leads.length} of ${all.length} leads, newest first.`} />
      <Suspense>
        <ListFilters
          search="Search name, business, email, phone, city…"
          chips={[{ param: "score", label: "Score", options: ["A", "B", "C"].map((score) => ({ value: score, label: score, count: counts(score) })) }]}
          menus={[
            { param: "status", label: "Status", options: (Object.keys(LEAD_STATUS_LABEL) as LeadStatus[]).map((s) => ({ value: s, label: LEAD_STATUS_LABEL[s] })) },
            { param: "source", label: "Source", options: [{ value: "form", label: "Audit form" }, { value: "chat", label: "Jadeed AI chat" }] },
          ]}
        />
      </Suspense>

      <div className={cn("mt-4 grid grid-cols-1 gap-4", selected && "lg:grid-cols-[minmax(0,1fr)_25rem]")}>
        <Panel className="min-w-0">
          {leads.length ? (
            <ul className="-my-2 divide-y divide-white/[0.06]">
              {leads.map((lead) => {
                const on = lead.id === selected?.id;
                const inner = (
                  <>
                    <ScoreBadge score={lead.score} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-white">{leadName(lead)}</span>
                      <span className="block truncate text-xs text-white/50">{[leadLine(lead), lead.source === "chat" ? "chat" : null].filter(Boolean).join(" · ") || lead.contact.email || "—"}</span>
                    </span>
                    <span className="hidden sm:block">
                      <StatusPill status={lead.status} />
                    </span>
                    <span className="w-16 shrink-0 text-right text-xs text-white/45">{ago(lead.createdAt)}</span>
                  </>
                );
                return (
                  <li key={lead.id}>
                    {/* Phones open the full page; wide screens open the side panel. */}
                    <Link href={`${base}/leads/${lead.id}`} className="flex items-center gap-3 py-3 lg:hidden">
                      {inner}
                    </Link>
                    <Link
                      href={`${base}/leads${query({ lead: lead.id })}`}
                      scroll={false}
                      aria-current={on ? "true" : undefined}
                      className={cn("-mx-2 hidden items-center gap-3 rounded-[14px] px-2 py-3 transition-colors lg:flex", on ? "bg-[#BEF70A]/[0.08]" : "hover:bg-white/[0.04]")}
                    >
                      {inner}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyState
              icon="people"
              title={all.length ? "No leads match" : "No leads yet"}
              body={all.length ? "Try clearing a filter or the search." : "Leads from the free-audit form appear here with their score and Jadeed AI's summary."}
            />
          )}
        </Panel>
        {selected ? (
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <LeadPeek lead={selected} href={`${base}/leads/${selected.id}`} closeHref={`${base}/leads${query({ lead: undefined })}`} />
            </div>
          </div>
        ) : null}
      </div>
      {all.length >= 300 ? (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-white/45">
          <Icon name="info" size={14} />
          Showing the newest 300 leads.
        </p>
      ) : null}
    </>
  );
}
