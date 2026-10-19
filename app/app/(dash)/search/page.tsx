import type { Metadata } from "next";
import Link from "next/link";
import { ScoreBadge, leadLine, leadName } from "@/components/system/LeadViews";
import { EmptyState, PageHeader, Panel } from "@/components/system/Page";
import { listClients } from "@/lib/portal/data";
import { listChats, listLeads, listTasks } from "@/lib/system/data";
import { appBase, isStaff, requireUser } from "@/lib/system/session";
import { ago } from "@/lib/utils";

export const metadata: Metadata = { title: "Search" };

const has = (words: string[], ...fields: (string | undefined | null)[]) => {
  const haystack = fields.filter(Boolean).join(" ").toLowerCase();
  return words.every((word) => haystack.includes(word));
};

const row = "-mx-2 flex items-center gap-3 rounded-[14px] px-2 py-2.5 transition-colors hover:bg-white/[0.04]";

/* The top bar's search (from Jadeed Marketing): leads, clients, chats and tasks in one list. */
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const [user, base, { q = "" }] = await Promise.all([requireUser(), appBase(), searchParams]);
  if (!isStaff(user.role)) return <EmptyState icon="lock" title="Team only" body="Search is for the Jadeed team." />;
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return <EmptyState icon="search" title="Search" body="Type a name, business, email, phone number or city in the search box above." />;

  const [leads, chats, tasks, clients] = await Promise.all([listLeads(300), listChats(300), listTasks(300), listClients()]);
  const leadHits = leads.filter((l) => has(words, l.business.name, l.contact.name, l.contact.email, l.contact.phone, l.business.service, l.business.trade, l.business.city, l.business.country, l.goal.notes));
  const clientHits = clients.filter((c) => has(words, c.businessName, c.contactName, c.ownerEmail, c.phone, c.trade, c.city, c.territory));
  const chatHits = chats.filter((c) => has(words, c.contact?.name, c.contact?.email, c.contact?.phone, c.aiSummary, ...(c.messages ?? []).map((m) => m.text)));
  const taskHits = tasks.filter((t) => has(words, t.title, t.leadName, t.assigneeName));
  const total = leadHits.length + clientHits.length + chatHits.length + taskHits.length;

  return (
    <>
      <PageHeader title={`Search: “${q}”`} description={`${total} ${total === 1 ? "result" : "results"}`} />
      {total === 0 ? (
        <Panel>
          <EmptyState icon="search" title="Nothing found" body="Try fewer words, or part of a name or phone number." />
        </Panel>
      ) : null}
      <div className="space-y-4">
        {leadHits.length ? (
          <Panel title={`Leads · ${leadHits.length}`}>
            <ul className="-my-1">
              {leadHits.slice(0, 30).map((lead) => (
                <li key={lead.id}>
                  <Link href={`${base}/leads/${lead.id}`} className={row}>
                    <ScoreBadge score={lead.score} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-white">{leadName(lead)}</span>
                      <span className="block truncate text-xs text-white/50">{[lead.contact.name, leadLine(lead)].filter(Boolean).join(" · ")}</span>
                    </span>
                    <span className="text-xs text-white/45">{ago(lead.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        ) : null}
        {clientHits.length ? (
          <Panel title={`Clients · ${clientHits.length}`}>
            <ul className="-my-1">
              {clientHits.slice(0, 30).map((client) => (
                <li key={client.id}>
                  <Link href={`${base}/clients/${client.id}`} className={row}>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-white">{client.businessName}</span>
                      <span className="block truncate text-xs text-white/50">{[client.contactName, client.trade, client.city].filter(Boolean).join(" · ")}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        ) : null}
        {chatHits.length ? (
          <Panel title={`Chats · ${chatHits.length}`}>
            <ul className="-my-1">
              {chatHits.slice(0, 30).map((chat) => (
                <li key={chat.id}>
                  <Link href={`${base}/chats/${chat.id}`} className={`${row} block`}>
                    <span className="block text-sm font-semibold text-white">{chat.contact?.name || chat.contact?.email || "Visitor"}</span>
                    <span className="line-clamp-1 text-xs text-white/50">{chat.aiSummary || chat.messages.find((m) => m.role === "user")?.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        ) : null}
        {taskHits.length ? (
          <Panel title={`Tasks · ${taskHits.length}`}>
            <ul className="-my-1">
              {taskHits.slice(0, 30).map((task) => (
                <li key={task.id}>
                  <Link href={`${base}/tasks`} className={`${row} block`}>
                    <span className="block text-sm text-white">{task.title}</span>
                    <span className="text-xs text-white/50">{[task.assigneeName, task.leadName, task.status === "done" ? "done" : null].filter(Boolean).join(" · ")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        ) : null}
      </div>
    </>
  );
}
