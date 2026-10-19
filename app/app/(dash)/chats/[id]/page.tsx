import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SummarizeButton } from "@/components/system/ChatActions";
import { Icon } from "@/components/system/Icon";
import { EmptyState, Panel } from "@/components/system/Page";
import { Chip, card } from "@/components/system/ui";
import { getChat } from "@/lib/system/data";
import { appBase, isStaff, requireUser } from "@/lib/system/session";
import { CHAT_OUTCOME_LABEL } from "@/lib/system/types";
import { ago, cn, pkTime } from "@/lib/utils";

export const metadata: Metadata = { title: "Chat" };

/* One Jadeed AI chat (from Jadeed Marketing): the transcript on the left (what was shown with
   each reply as small notes), and on the right the AI summary, tags, outcome, the visitor
   and the pages they were on. */
export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const [user, base, { id }] = await Promise.all([requireUser(), appBase(), params]);
  if (!isStaff(user.role)) return <EmptyState icon="lock" title="Team only" body="Chats are for the Jadeed team." />;
  const chat = await getChat(id);
  if (!chat) notFound();
  const who = chat.contact?.name || chat.contact?.email || "Visitor";
  const messages = chat.messages ?? [];

  return (
    <>
      <Link href={`${base}/chats`} className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white">
        <Icon name="arrowLeft" size={16} />
        All chats
      </Link>
      <h1 className="mt-3 text-[28px] leading-tight tracking-[-0.03em] text-white">Chat with {who}</h1>
      <p className="mt-1 text-sm text-white/55">
        Started {pkTime(chat.createdAt)} PKT · last message {ago(chat.updatedAt)} · {chat.userMessageCount} {chat.userMessageCount === 1 ? "question" : "questions"}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Panel title="Conversation">
          {messages.length ? (
            <ol className="space-y-3">
              {messages.map((message, index) => (
                <li key={index} className={cn("flex flex-col", message.role === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap break-words rounded-[18px] px-4 py-2.5 text-sm leading-relaxed",
                      message.role === "user" ? "rounded-br-[6px] bg-[#BEF70A] text-[#0B1F12]" : "rounded-bl-[6px] bg-white/[0.08] text-white/90",
                      message.status && "opacity-70"
                    )}
                  >
                    {message.text.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)") || (message.status === "stopped" ? "(stopped)" : "(no reply)")}
                  </div>
                  {message.cards?.length ? (
                    <ul className="mt-1 max-w-[85%] space-y-0.5">
                      {message.cards.map((note) => (
                        <li key={note} className="flex items-start gap-1.5 text-xs text-white/50">
                          <Icon name="sparkles" size={12} className="mt-0.5 text-[#BEF70A]" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <span className="mt-1 px-1 text-[11px] text-white/40">
                    {message.role === "user" ? who : "Jadeed AI"} · {pkTime(message.at, false)}
                    {message.page && message.role === "user" ? ` · on ${message.page}` : ""}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-white/55">No messages were saved for this chat.</p>
          )}
        </Panel>

        <div className="space-y-4">
          <div className="rounded-[20px] bg-[#BEF70A]/[0.07] p-4 sm:p-5">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#BEF70A]">
              <Icon name="sparkles" size={14} />
              Jadeed AI summary
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-white">{chat.aiSummary ?? "Not summarised yet: this happens when the visitor closes the chat or leaves the page."}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {chat.outcome ? <Chip on>{CHAT_OUTCOME_LABEL[chat.outcome]}</Chip> : null}
              {(chat.tags ?? []).map((tag) => (
                <Chip key={tag}>{tag.replace(/_/g, " ")}</Chip>
              ))}
              {chat.language && chat.language !== "en" ? <Chip>language: {chat.language}</Chip> : null}
            </div>
            <div className="mt-4">
              <SummarizeButton chatId={chat.id} />
            </div>
          </div>

          <Panel title="Visitor">
            <dl className="space-y-3 text-sm">
              {[
                ["Name", chat.contact?.name],
                ["Email", chat.contact?.email],
                ["Phone", chat.contact?.phone],
                ["Pages", chat.pages?.join(", ") || chat.firstPage],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-white/50">{label}</dt>
                  <dd className="break-words text-white">
                    {value ? (label === "Email" ? <a href={`mailto:${value}`} className="underline decoration-white/30 underline-offset-4">{value}</a> : label === "Phone" ? <a href={`tel:${value}`} className="underline decoration-white/30 underline-offset-4">{value}</a> : value) : "Not shared"}
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>

          {chat.leadId ? (
            <Link href={`${base}/leads/${chat.leadId}`} className={cn(card, "flex min-h-12 items-center justify-between gap-2 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]")}>
              <span>Became a lead{chat.leadScore ? ` (score ${chat.leadScore})` : ""}</span>
              <Icon name="arrowRight" size={16} className="text-[#BEF70A]" />
            </Link>
          ) : null}
          {chat.ticketId ? (
            <Link href={`${base}/teach`} className={cn(card, "flex items-start gap-2.5 p-4 text-sm text-white transition-colors hover:bg-white/[0.08]")}>
              <Icon name="mail" size={18} className="text-[#BEF70A]" />
              <span>They asked to talk to Sameer from this chat. Reply within 24 hours, then mark it answered in Teach Jadeed AI.</span>
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}
