import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/system/Icon";
import { AssignControl, CallActions, FollowUpDraft, NoteComposer, StatusControl } from "@/components/system/LeadActions";
import { AiOpinion, CallSummary, ContactLinks, LeadProfile, ScoreBadge, StatusPill, Timeline, leadLine, leadName } from "@/components/system/LeadViews";
import { EmptyState, Panel } from "@/components/system/Page";
import { NewTaskForm, TaskList } from "@/components/system/TaskList";
import { primaryButton, textLink } from "@/components/system/ui";
import { siteConfig } from "@/lib/site";
import { bookingsForLead, getLead, listStaff, tasksForLead } from "@/lib/system/data";
import { appBase, isStaff, requireUser } from "@/lib/system/session";
import { ago, cn, isPast } from "@/lib/utils";

export const metadata: Metadata = { title: "Lead" };

/* One lead (from Jadeed Marketing): profile on the left, the full timeline on the right
   (calls, follow-up drafts, tasks, notes, the chat and every change). Stacks on phones. */
export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const [user, base, { id }] = await Promise.all([requireUser(), appBase(), params]);
  if (!isStaff(user.role)) return <EmptyState icon="lock" title="Team only" body="Leads are for the Jadeed team." />;

  const [detail, staff, calls, tasks] = await Promise.all([getLead(id), listStaff(), bookingsForLead(id), tasksForLead(id)]);
  if (!detail) notFound();
  const { lead, context, activity, chat } = detail;
  const activeCall = calls.find((call) => call.status === "confirmed");
  const pastCalls = calls.filter((call) => call !== activeCall);

  return (
    <>
      <Link href={`${base}/leads`} className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white">
        <Icon name="arrowLeft" size={16} />
        All leads
      </Link>

      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-3.5">
          <ScoreBadge score={lead.score} size="lg" />
          <div className="min-w-0">
            <h1 className="text-[28px] leading-tight tracking-[-0.03em] text-white">{leadName(lead)}</h1>
            <p className="mt-1 text-sm text-white/55">{[lead.contact.name !== leadName(lead) ? lead.contact.name : null, leadLine(lead)].filter(Boolean).join(" · ")} · {ago(lead.createdAt)}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusPill status={lead.status} />
              <ContactLinks lead={lead} />
              <Link href={lead.clientId ? `${base}/clients/${lead.clientId}` : `${base}/clients?fromLead=${lead.id}`} className={cn(primaryButton, "min-h-9 px-3.5")}>
                <Icon name="briefcase" size={15} />
                {lead.clientId ? "Open client" : "Make client"}
              </Link>
            </div>
          </div>
        </div>
        <div className="grid shrink-0 gap-3 sm:grid-cols-2 lg:w-[26rem]">
          <StatusControl leadId={lead.id} status={lead.status} />
          <AssignControl leadId={lead.id} assignedTo={lead.assignedTo} staff={staff} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]">
        <div className="order-2 space-y-4 lg:order-1">
          <AiOpinion lead={lead} />
          <LeadProfile lead={lead} context={context} siteBase={base === "" ? siteConfig.url : ""} />
        </div>

        <div className="order-1 space-y-4 lg:order-2">
          {activeCall ? (
            <Panel title="Call">
              <CallSummary booking={activeCall} />
              <CallActions bookingId={activeCall.id} past={isPast(activeCall.startsAt)} />
            </Panel>
          ) : null}

          <Panel title="Follow-up email">
            <FollowUpDraft leadId={lead.id} email={lead.contact.email} />
          </Panel>

          {chat ? (
            <Panel
              title="Jadeed AI chat"
              action={
                <Link href={`${base}/chats/${chat.id}`} className={cn(textLink, "text-sm")}>
                  Read the chat
                </Link>
              }
            >
              <p className="text-sm leading-relaxed text-white/75">{chat.aiSummary ?? `${chat.userMessageCount} questions, last ${ago(chat.updatedAt)}.`}</p>
            </Panel>
          ) : null}

          <Panel title={`Tasks${tasks.length ? ` · ${tasks.filter((task) => task.status !== "done").length} open` : ""}`}>
            <NewTaskForm staff={staff} leadId={lead.id} />
            {tasks.length ? (
              <div className="mt-5 border-t border-white/[0.08] pt-5">
                <TaskList tasks={tasks} base={base} empty="" />
              </div>
            ) : null}
          </Panel>

          <Panel title="Notes and history">
            <NoteComposer leadId={lead.id} />
            <div className="mt-5 border-t border-white/[0.08] pt-5">
              <Timeline activity={activity} lead={lead} />
            </div>
          </Panel>

          {pastCalls.length ? (
            <Panel title="Earlier calls">
              <ul className="space-y-4">
                {pastCalls.map((call) => (
                  <li key={call.id}>
                    <CallSummary booking={call} />
                    {call.cancelReason ? <p className="text-xs text-white/45">Reason: {call.cancelReason}</p> : null}
                  </li>
                ))}
              </ul>
            </Panel>
          ) : null}
        </div>
      </div>
    </>
  );
}
