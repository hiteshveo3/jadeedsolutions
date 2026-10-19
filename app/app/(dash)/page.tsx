import type { Metadata } from "next";
import Link from "next/link";
import { ClientHome, VisitorHome } from "@/components/portal/HomeViews";
import { Icon } from "@/components/system/Icon";
import { LeadList } from "@/components/system/LeadViews";
import { EmptyState, Kpi, Label, PageHeader, Panel } from "@/components/system/Page";
import { textLink } from "@/components/system/ui";
import { homeStats, latestLeads, listBookings, listTasks } from "@/lib/system/data";
import { appBase, isClient, isStaff, requireUser } from "@/lib/system/session";
import { cn, isPast, pkTime, shortDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Home" };

/* Home: numbers + latest leads for the team (as on Jadeed Marketing). Clients see their portal
   overview; visitors see their account. */
export default async function HomePage() {
  const [user, base] = await Promise.all([requireUser(), appBase()]);

  if (isClient(user.role)) return <ClientHome user={user} base={base} />;
  if (!isStaff(user.role)) return <VisitorHome user={user} />;

  const [stats, leads, bookings, tasks] = await Promise.all([homeStats(), latestLeads(8), listBookings(40), listTasks(200)]);
  const nextCalls = bookings
    .filter((b) => b.status === "confirmed" && !isPast(b.startsAt))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, 3);
  const myTasks = tasks
    .filter((t) => t.status !== "done" && t.assignee === user.email)
    .sort((a, b) => (a.due ?? "9999").localeCompare(b.due ?? "9999"))
    .slice(0, 5);
  const firstName = user.name.split(" ")[0] || "there";

  return (
    <>
      <PageHeader
        title={`Hello, ${firstName}`}
        description="What needs your attention today."
        actions={
          <Link href={`${base}/pipeline`} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/[0.08] px-4 text-sm font-semibold text-white transition-colors hover:bg-white/[0.13]">
            <Icon name="layers" size={16} />
            Pipeline
          </Link>
        }
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="New leads · 7 days" value={stats.newLeads} icon="people" lime />
        <Kpi label="A and B leads · 7 days" value={stats.goodLeads} icon="star" />
        <Kpi label="Upcoming calls" value={stats.upcomingCalls} icon="calendar" />
        <Kpi label="Open tasks" value={stats.openTasks} icon="tasks" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <Panel
          title="Latest leads"
          className="min-w-0"
          action={
            <Link href={`${base}/leads`} className={cn(textLink, "text-sm")}>
              All leads
            </Link>
          }
        >
          {leads.length ? <LeadList leads={leads} base={base} /> : <EmptyState icon="people" title="No leads yet" body="New leads from the free-audit form appear here with their score and Jadeed AI's summary." />}
        </Panel>
        <Panel title="Coming up">
          <Label>Calls</Label>
          {nextCalls.length ? (
            <ul className="mt-2 space-y-1">
              {nextCalls.map((call) => (
                <li key={call.id}>
                  <Link href={`${base}/leads/${call.leadId}`} className="-mx-2 block rounded-[14px] px-2 py-2 transition-colors hover:bg-white/[0.05]">
                    <span className="block text-sm font-semibold text-white">{call.businessName || call.contact?.name}</span>
                    <span className="block text-xs text-white/50">{pkTime(call.startsAt)} PKT</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-white/55">No calls booked.</p>
          )}
          <Label className="mt-6">My tasks</Label>
          {myTasks.length ? (
            <ul className="mt-2 space-y-2">
              {myTasks.map((task) => (
                <li key={task.id} className="flex items-start gap-2 text-sm text-white">
                  <Icon name="tasks" size={16} className="mt-0.5 text-[#BEF70A]" />
                  <span>
                    {task.title}
                    {task.due ? <span className="block text-xs text-white/45">Due {shortDate(task.due)}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-white/55">Nothing assigned to you.</p>
          )}
          <Link href={`${base}/tasks`} className={cn(textLink, "mt-5 inline-block text-sm")}>
            All tasks
          </Link>
        </Panel>
      </div>
    </>
  );
}
