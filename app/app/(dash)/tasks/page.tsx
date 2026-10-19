import type { Metadata } from "next";
import { EmptyState, PageHeader, Panel } from "@/components/system/Page";
import { NewTaskForm, TaskList } from "@/components/system/TaskList";
import { listStaff, listTasks } from "@/lib/system/data";
import { appBase, isStaff, requireUser } from "@/lib/system/session";

export const metadata: Metadata = { title: "Tasks" };

/* Team tasks (from Jadeed Marketing): mine first, then everyone's, then what was done recently. */
export default async function TasksPage() {
  const [user, base] = await Promise.all([requireUser(), appBase()]);
  if (!isStaff(user.role)) return <EmptyState icon="lock" title="Team only" body="Tasks are for the Jadeed team." />;

  const [tasks, staff] = await Promise.all([listTasks(300), listStaff()]);
  const byDue = (a: { due?: string; createdAt: string }, b: { due?: string; createdAt: string }) => (a.due ?? "9999").localeCompare(b.due ?? "9999") || b.createdAt.localeCompare(a.createdAt);
  const open = tasks.filter((task) => task.status !== "done").sort(byDue);
  const mine = open.filter((task) => task.assignee === user.email);
  const others = open.filter((task) => task.assignee !== user.email);
  const done = tasks.filter((task) => task.status === "done").slice(0, 20);

  return (
    <>
      <PageHeader title="Tasks" description="Small, clear to-dos. Tie one to a lead from the lead's page." />
      <div className="space-y-4">
        <Panel title="New task">
          <NewTaskForm staff={staff} />
        </Panel>
        <Panel title={`Mine · ${mine.length}`}>
          <TaskList tasks={mine} base={base} empty="Nothing on your list." />
        </Panel>
        <Panel title={`Everyone else · ${others.length}`}>
          <TaskList tasks={others} base={base} empty="Nothing open for the rest of the team." />
        </Panel>
        {done.length ? (
          <Panel title="Done recently">
            <TaskList tasks={done} base={base} empty="" />
          </Panel>
        ) : null}
      </div>
    </>
  );
}
