import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientPeople, ClientSettings, DraftInvoiceButton } from "@/components/portal/Clients";
import { InvoiceList } from "@/components/portal/Invoices";
import { MessageThread } from "@/components/portal/Messages";
import { ProposalEditor, ProposalStatus, ProposalView } from "@/components/portal/Proposals";
import { ResultsRecord } from "@/components/portal/Results";
import { UpdateComposer, UpdateList } from "@/components/portal/Updates";
import { Icon } from "@/components/system/Icon";
import { EmptyState, Kpi, Panel } from "@/components/system/Page";
import { Chip, card, primaryButton, secondaryButton } from "@/components/system/ui";
import { money } from "@/lib/money";
import { clientTotals, getClient, getProposal, listClientPeople, listInvoices, listMessages, listProposals, listResults, listUpdates } from "@/lib/portal/data";
import { appBase, isStaff, requireUser } from "@/lib/system/session";
import { CLIENT_STATUS_LABEL } from "@/lib/system/types";
import { cn, pkMonth } from "@/lib/utils";

export const metadata: Metadata = { title: "Client" };

const TABS = [
  ["overview", "Overview"],
  ["results", "Shared record"],
  ["updates", "Updates"],
  ["messages", "Messages"],
  ["proposals", "Proposals"],
  ["invoices", "Invoices"],
  ["people", "People"],
  ["settings", "Settings"],
] as const;
type Tab = (typeof TABS)[number][0];

/* One client's workspace for the team (from Jadeed Marketing): the same data the client sees
   in their portal, plus team-only notes and settings. */
export default async function ClientWorkspace({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ tab?: string; p?: string }> }) {
  const [user, base, { id }, query] = await Promise.all([requireUser(), appBase(), params, searchParams]);
  if (!isStaff(user.role)) return <EmptyState icon="lock" title="Team only" body="This is the Jadeed team's view of a client." />;
  const client = await getClient(id);
  if (!client) notFound();
  const tab: Tab = (TABS.find(([key]) => key === query.tab)?.[0] ?? "overview") as Tab;
  const isAdmin = user.role === "admin";
  const href = (key: Tab, extra = "") => `${base}/clients/${client.id}?tab=${key}${extra}`;

  const [results, invoices] = await Promise.all([listResults(client.id), listInvoices(client.id)]);
  const totals = clientTotals(results, invoices, pkMonth());

  return (
    <>
      <Link href={`${base}/clients`} className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white">
        <Icon name="arrowLeft" size={16} />
        All clients
      </Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[28px] leading-tight tracking-[-0.03em] text-white">{client.businessName}</h1>
          <p className="mt-1 text-sm text-white/55">
            {client.contactName} ·{" "}
            <a href={`mailto:${client.ownerEmail}`} className="underline decoration-white/30 underline-offset-4">
              {client.ownerEmail}
            </a>
            {client.territory ? ` · ${client.territory}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip on={client.status === "active"}>{CLIENT_STATUS_LABEL[client.status]}</Chip>
          <Chip>{client.feePercent}% of paid invoices</Chip>
        </div>
      </div>

      <nav aria-label="Client sections" className="relative -mx-4 mt-5 flex gap-1.5 overflow-x-auto px-4 pb-1 custom-scrollbar sm:mx-0 sm:px-0">
        {TABS.map(([key, label]) => (
          <Link
            key={key}
            href={href(key)}
            aria-current={tab === key ? "page" : undefined}
            className={cn("shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors", tab === key ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.06] text-white/70 hover:bg-white/[0.1] hover:text-white")}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-5">
        {tab === "overview" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Kpi label="Customers this month" value={totals.leadsThisMonth} icon="people" lime note={`${totals.leadsAll} in total`} />
              <Kpi label="Paid jobs" value={totals.paidJobs} icon="checkCircle" />
              <Kpi label="Customers paid them" value={money(totals.revenueCents, client.currency)} icon="money" />
              <Kpi label="Fees not invoiced" value={money(totals.feesUninvoicedCents, client.currency)} icon="receipt" note={totals.dueCents ? `${money(totals.dueCents, client.currency)} on unpaid invoices` : undefined} />
            </div>
            <Panel title="Quick links">
              <div className="flex flex-wrap gap-2">
                {(["results", "updates", "messages", "invoices"] as Tab[]).map((key) => (
                  <Link key={key} href={href(key)} className={secondaryButton}>
                    {TABS.find(([k]) => k === key)?.[1]}
                  </Link>
                ))}
                {client.leadId ? (
                  <Link href={`${base}/leads/${client.leadId}`} className={secondaryButton}>
                    Original lead
                  </Link>
                ) : null}
              </div>
            </Panel>
          </div>
        ) : null}

        {tab === "results" ? <ResultsRecord results={results} clientId={client.id} feePercent={client.feePercent} canSeeMoney isAdmin={isAdmin} currency={client.currency} /> : null}

        {tab === "updates" ? <UpdatesTab clientId={client.id} /> : null}

        {tab === "messages" ? <MessageThread messages={await listMessages(client.id)} side="team" clientId={client.id} otherName={client.contactName || client.businessName} subtitle={client.businessName} layout="embedded" /> : null}

        {tab === "proposals" ? <ProposalsTab clientId={client.id} selected={query.p} base={base} /> : null}

        {tab === "invoices" ? (
          <div className="space-y-4">
            {isAdmin ? (
              <Panel title="New invoice">
                <p className="mb-3 text-sm text-white/60">
                  {totals.feesUninvoicedCents ? `${money(totals.feesUninvoicedCents, client.currency)} in fees from paid jobs isn't on an invoice yet.` : "Every paid job is already on an invoice."} Drafts are also made automatically on the 1st of each month.
                </p>
                <DraftInvoiceButton clientId={client.id} />
              </Panel>
            ) : null}
            <InvoiceList invoices={invoices} side="team" isAdmin={isAdmin} base={base} />
          </div>
        ) : null}

        {tab === "people" ? <PeopleTab clientId={client.id} /> : null}

        {tab === "settings" ? (
          <Panel title="Client settings">
            <ClientSettings client={client} isAdmin={isAdmin} />
          </Panel>
        ) : null}
      </div>
    </>
  );
}

async function UpdatesTab({ clientId }: { clientId: string }) {
  const updates = await listUpdates(clientId);
  return (
    <div className="space-y-4">
      <Panel title="Post an update">
        <UpdateComposer clientId={clientId} />
      </Panel>
      <UpdateList updates={updates} empty="No updates yet. Post what was done each week, and a short report each month." />
    </div>
  );
}

async function ProposalsTab({ clientId, selected, base }: { clientId: string; selected?: string; base: string }) {
  const proposals = await listProposals(clientId);
  const current = selected && selected !== "new" ? await getProposal(clientId, selected) : null;
  const editing = selected === "new" || (current && current.status === "draft");
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div className="space-y-2">
        <Link href={`${base}/clients/${clientId}?tab=proposals&p=new`} className={cn(primaryButton, "w-full")}>
          <Icon name="plus" size={16} />
          New proposal
        </Link>
        <ul className="space-y-2">
          {proposals.map((proposal) => (
            <li key={proposal.id}>
              <Link href={`${base}/clients/${clientId}?tab=proposals&p=${proposal.id}`} className={cn(card, "block p-3.5 transition-colors hover:bg-white/[0.08]", proposal.id === current?.id && "bg-[#BEF70A]/[0.08]")}>
                <span className="block text-sm font-semibold text-white">{proposal.title}</span>
                <span className="mt-1.5 block">
                  <ProposalStatus proposal={proposal} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0">
        {editing ? (
          <Panel title={current ? "Edit the draft" : "New proposal"}>
            <ProposalEditor key={current?.id ?? "new"} clientId={clientId} proposal={current ?? undefined} />
          </Panel>
        ) : current ? (
          <ProposalView proposal={current} />
        ) : (
          <Panel>
            <p className="text-sm text-white/60">Pick a proposal, or write a new one. The client sees it once you send it, and approves it in their portal.</p>
          </Panel>
        )}
      </div>
    </div>
  );
}

async function PeopleTab({ clientId }: { clientId: string }) {
  const { people, invites } = await listClientPeople(clientId);
  return (
    <Panel title="People with a portal login">
      <ClientPeople people={people} invites={invites} clientId={clientId} canManage />
    </Panel>
  );
}
