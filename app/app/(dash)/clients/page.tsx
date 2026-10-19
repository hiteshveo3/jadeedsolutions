import type { Metadata } from "next";
import Link from "next/link";
import { NewClientForm, type ClientPrefill } from "@/components/portal/Clients";
import { Icon } from "@/components/system/Icon";
import { EmptyState, PageHeader, Panel } from "@/components/system/Page";
import { Chip, card, primaryButton } from "@/components/system/ui";
import { adminDb } from "@/lib/firebase/admin";
import { listClients } from "@/lib/portal/data";
import { appBase, isStaff, requireUser } from "@/lib/system/session";
import { CLIENT_STATUS_LABEL } from "@/lib/system/types";
import { ago, cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Clients" };

/* Clients (from Jadeed Marketing): every partnership, with unread messages first. New clients
   usually come from a won lead (?fromLead=<id> fills the form). */
export default async function ClientsPage({ searchParams }: { searchParams: Promise<{ fromLead?: string; new?: string }> }) {
  const [user, base, params] = await Promise.all([requireUser(), appBase(), searchParams]);
  if (!isStaff(user.role)) return <EmptyState icon="lock" title="Team only" body="Clients are managed by the Jadeed team." />;

  const clients = await listClients();
  let prefill: ClientPrefill | undefined;
  if (params.fromLead && /^[A-Za-z0-9]{6,40}$/.test(params.fromLead)) {
    const lead = await adminDb().collection("leads").doc(params.fromLead).get();
    if (lead.exists) {
      prefill = {
        leadId: lead.id,
        businessName: lead.get("business.name") ?? "",
        contactName: lead.get("contact.name") ?? "",
        ownerEmail: lead.get("contact.email") ?? "",
        phone: lead.get("contact.phone") ?? "",
        trade: lead.get("business.trade") ?? "",
        city: lead.get("business.city") ?? "",
        country: lead.get("business.country") ?? "",
        website: lead.get("business.website") ?? "",
      };
    }
  }
  const showForm = Boolean(prefill) || params.new === "1" || clients.length === 0;
  const waiting = (c: (typeof clients)[number]) => c.lastMessageFrom === "client";
  const sorted = [...clients].sort((a, b) => Number(waiting(b)) - Number(waiting(a)) || (b.lastMessageAt ?? b.createdAt).localeCompare(a.lastMessageAt ?? a.createdAt));

  return (
    <>
      <PageHeader
        title="Clients"
        description="Each client's shared record, updates, messages, proposals and invoices — the same things they see in their portal."
        actions={
          showForm ? null : (
            <Link href={`${base}/clients?new=1`} className={primaryButton}>
              <Icon name="plus" size={16} />
              New client
            </Link>
          )
        }
      />
      {showForm ? (
        <Panel title="New client" className="mb-4">
          <NewClientForm base={base} prefill={prefill} isAdmin={user.role === "admin"} />
        </Panel>
      ) : null}
      {sorted.length ? (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((client) => (
            <li key={client.id}>
              <Link href={`${base}/clients/${client.id}`} className={cn(card, "block h-full p-5 transition-colors hover:bg-white/[0.08]")}>
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-lg font-extrabold leading-tight text-white">{client.businessName}</p>
                  <Chip on={client.status === "active"}>{CLIENT_STATUS_LABEL[client.status]}</Chip>
                </div>
                <p className="mt-1 text-sm text-white/55">{[client.contactName, client.trade, [client.city, client.country].filter(Boolean).join(", ")].filter(Boolean).join(" · ")}</p>
                <p className="mt-3 text-xs text-white/45">
                  {client.feePercent}% fee · {client.currency}
                  {client.territory ? ` · ${client.territory}` : ""}
                  {client.lastMessageAt ? ` · last message ${ago(client.lastMessageAt)}` : ""}
                </p>
                {waiting(client) ? (
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#BEF70A]/[0.12] px-2.5 py-1 text-xs font-bold text-[#BEF70A]">
                    <Icon name="message" size={13} />
                    Waiting for our reply
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
