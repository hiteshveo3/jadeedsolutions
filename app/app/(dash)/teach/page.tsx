import type { Metadata } from "next";
import { EmptyState, PageHeader, Panel } from "@/components/system/Page";
import { AddAnswerForm, AnswerCard, TicketButton } from "@/components/system/TeachActions";
import { textLink } from "@/components/system/ui";
import { listKnowledge, listTickets } from "@/lib/system/data";
import { appBase, isStaff, requireUser } from "@/lib/system/session";
import { ago } from "@/lib/utils";

export const metadata: Metadata = { title: "Teach Jadeed AI" };

/* Teach Jadeed AI (from Jadeed Marketing): questions it couldn't answer, the team's answers
   waiting for Sameer, the approved answers it now uses, and questions sent to Sameer. */
export default async function TeachPage() {
  const [user, base] = await Promise.all([requireUser(), appBase()]);
  if (!isStaff(user.role)) return <EmptyState icon="lock" title="Team only" body="Teaching Jadeed AI is for the Jadeed team." />;

  const [entries, tickets] = await Promise.all([listKnowledge(300), listTickets(100)]);
  const isAdmin = user.role === "admin";
  const byCount = (a: { count?: number }, b: { count?: number }) => (b.count ?? 0) - (a.count ?? 0);
  const unanswered = entries.filter((e) => e.status === "pending" && !e.answer.trim()).sort(byCount);
  const waiting = entries.filter((e) => e.status === "pending" && e.answer.trim()).sort(byCount);
  const approved = entries.filter((e) => e.status === "approved");
  const openTickets = tickets.filter((t) => t.status === "open");
  const chatHref = (ids?: string[]) => (ids?.length ? `${base}/chats/${ids[ids.length - 1]}` : undefined);

  return (
    <>
      <PageHeader title="Teach Jadeed AI" description="When Jadeed AI can't answer, the question lands here. Write the answer once; after Sameer approves it, Jadeed AI uses it in every chat." />
      <div className="space-y-4">
        {openTickets.length ? (
          <Panel title={`Waiting for a reply from Sameer · ${openTickets.length}`}>
            <ul className="divide-y divide-white/[0.06]">
              {openTickets.map((ticket) => (
                <li key={ticket.id} className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{ticket.question || "Asked for a person"}</p>
                    <p className="mt-0.5 text-xs text-white/50">
                      {ticket.name ? `${ticket.name} · ` : ""}
                      {ticket.email ? (
                        <a href={`mailto:${ticket.email}`} className="underline decoration-white/30 underline-offset-2">
                          {ticket.email}
                        </a>
                      ) : null}
                      {ticket.phone ? (
                        <a href={`https://wa.me/${ticket.phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-2">
                          {ticket.phone}
                        </a>
                      ) : null}{" "}
                      · {ago(ticket.createdAt)}
                      {ticket.chatId ? (
                        <>
                          {" "}·{" "}
                          <a href={`${base}/chats/${ticket.chatId}`} className={textLink}>
                            the chat
                          </a>
                        </>
                      ) : null}
                    </p>
                  </div>
                  <TicketButton ticketId={ticket.id} answered={false} />
                </li>
              ))}
            </ul>
          </Panel>
        ) : null}

        <Panel title={`Needs an answer · ${unanswered.length}`}>
          {unanswered.length ? (
            <ul className="space-y-3">
              {unanswered.map((entry) => (
                <AnswerCard key={entry.id} entry={entry} isAdmin={isAdmin} chatHref={chatHref(entry.chatIds)} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-white/55">Nothing waiting. Jadeed AI has answered everything it was asked.</p>
          )}
        </Panel>

        <Panel title={`Waiting for Sameer's approval · ${waiting.length}`}>
          {waiting.length ? (
            <ul className="space-y-3">
              {waiting.map((entry) => (
                <AnswerCard key={entry.id} entry={entry} isAdmin={isAdmin} chatHref={chatHref(entry.chatIds)} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-white/55">No answers waiting for approval.</p>
          )}
        </Panel>

        <Panel title="Add a question and answer">
          <AddAnswerForm isAdmin={isAdmin} />
        </Panel>

        <Panel title={`Live in Jadeed AI · ${approved.length}`}>
          {approved.length ? (
            <ul className="space-y-3">
              {approved.map((entry) => (
                <AnswerCard key={entry.id} entry={entry} isAdmin={isAdmin} chatHref={chatHref(entry.chatIds)} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-white/55">No approved answers yet. Jadeed AI uses the website&apos;s own pages until you add some.</p>
          )}
        </Panel>
      </div>
    </>
  );
}
