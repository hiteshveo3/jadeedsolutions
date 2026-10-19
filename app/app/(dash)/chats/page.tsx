import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChatReport } from "@/components/system/ChatActions";
import { ListFilters } from "@/components/system/ListFilters";
import { EmptyState, Kpi, PageHeader, Panel } from "@/components/system/Page";
import { Chip } from "@/components/system/ui";
import { getAiReport, listChats, listKnowledge } from "@/lib/system/data";
import { appBase, isStaff, requireUser } from "@/lib/system/session";
import { CHAT_OUTCOME_LABEL, type ChatOutcome, type ChatSession } from "@/lib/system/types";
import { ago, pkMonth } from "@/lib/utils";

export const metadata: Metadata = { title: "Chats" };

const tagLabel = (tag: string) => tag.replace(/_/g, " ");

type Params = { q?: string; tag?: string; outcome?: string };

function matches(chat: ChatSession, params: Params) {
  if (params.tag && !chat.tags?.includes(params.tag as never)) return false;
  if (params.outcome && chat.outcome !== params.outcome) return false;
  if (params.q) {
    const haystack = [chat.contact?.name, chat.contact?.email, chat.contact?.phone, chat.aiSummary, ...(chat.messages ?? []).map((m) => m.text)].filter(Boolean).join(" ").toLowerCase();
    if (!params.q.toLowerCase().split(/\s+/).every((word) => haystack.includes(word))) return false;
  }
  return true;
}

/* Every Jadeed AI chat on the site (kept 24 months) with its AI summary, tags and outcome,
   plus the monthly "what people ask" report (from Jadeed Marketing). */
export default async function ChatsPage({ searchParams }: { searchParams: Promise<Params> }) {
  const [user, base, params] = await Promise.all([requireUser(), appBase(), searchParams]);
  if (!isStaff(user.role)) return <EmptyState icon="lock" title="Team only" body="Chats are for the Jadeed team." />;

  const month = pkMonth();
  const [all, knowledge, report] = await Promise.all([listChats(300), listKnowledge(300), getAiReport(`chats-${month}`)]);
  const chats = all.filter((chat) => chat.userMessageCount > 0 && matches(chat, params));
  const thisMonth = all.filter((chat) => chat.updatedAt.slice(0, 7) === month && chat.userMessageCount > 0);
  const tagCounts = new Map<string, number>();
  for (const chat of all) for (const tag of chat.tags ?? []) tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  const topTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  const unanswered = knowledge.filter((entry) => entry.status === "pending" && !entry.answer).length;

  return (
    <>
      <PageHeader title="Chats" description="Every Jadeed AI conversation on the website, with its AI summary and tags." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Chats this month" value={thisMonth.length} icon="chat" lime />
        <Kpi label="Sent to Sameer" value={thisMonth.filter((chat) => chat.ticketId).length} icon="mail" />
        <Kpi label="Became leads" value={thisMonth.filter((chat) => chat.leadId).length} icon="people" />
        <Kpi label="Questions to teach" value={unanswered} icon="sparkles" note="Waiting in Teach Jadeed AI" />
      </div>

      <Panel title={`What people ask · ${month}`} className="mt-4">
        <ChatReport saved={report} month={month} />
      </Panel>

      <div className="mt-6">
        <Suspense>
          <ListFilters
            search="Search names, emails, summaries and messages…"
            chips={topTags.length ? [{ param: "tag", label: "Tag", options: topTags.map(([tag, count]) => ({ value: tag, label: tagLabel(tag), count })) }] : []}
            menus={[{ param: "outcome", label: "Outcome", options: (Object.keys(CHAT_OUTCOME_LABEL) as ChatOutcome[]).map((o) => ({ value: o, label: CHAT_OUTCOME_LABEL[o] })) }]}
          />
        </Suspense>
      </div>

      <Panel className="mt-4">
        {chats.length ? (
          <ul className="-my-2 divide-y divide-white/[0.06]">
            {chats.map((chat) => {
              const first = chat.messages.find((m) => m.role === "user")?.text ?? "";
              return (
                <li key={chat.id}>
                  <Link href={`${base}/chats/${chat.id}`} className="-mx-2 block rounded-[14px] px-2 py-3.5 transition-colors hover:bg-white/[0.04]">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-white">{chat.contact?.name || chat.contact?.email || "Visitor"}</p>
                      <span className="shrink-0 text-xs text-white/45">
                        {chat.userMessageCount} {chat.userMessageCount === 1 ? "question" : "questions"} · {ago(chat.updatedAt)}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-sm text-white/65">{chat.aiSummary || `“${first}”`}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {chat.outcome ? <Chip on={chat.outcome === "handoff" || chat.outcome === "lead"}>{CHAT_OUTCOME_LABEL[chat.outcome]}</Chip> : null}
                      {(chat.tags ?? []).map((tag) => (
                        <Chip key={tag}>{tagLabel(tag)}</Chip>
                      ))}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState icon="chat" title={all.length ? "No chats match" : "No chats yet"} body={all.length ? "Try clearing a filter or the search." : "Conversations with Jadeed AI on the website appear here."} />
        )}
      </Panel>
    </>
  );
}
