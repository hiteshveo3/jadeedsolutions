"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { createTask, updateTask } from "@/app/app/(dash)/actions";
import { Icon } from "@/components/system/Icon";
import { ErrorText, Select, field, iconButton, primaryButton } from "@/components/system/ui";
import { TASK_STATUS_LABEL, type Task, type TaskStatus } from "@/lib/system/types";
import { cn, pkToday } from "@/lib/utils";

/* Simple team tasks (from Jadeed Marketing; ClickUp-like, kept small): add, assign, due
   date, To do → Doing → Done. */

type Staff = { email: string; name: string };

const addDays = (date: string, days: number) => new Date(Date.parse(`${date}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);
const dueText = (due: string) => new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${due}T00:00:00Z`));

export function NewTaskForm({ staff, leadId }: { staff: Staff[]; leadId?: string }) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [due, setDue] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const today = pkToday();
  const quick = [
    { label: "Today", value: today },
    { label: "Tomorrow", value: addDays(today, 1) },
    { label: "In a week", value: addDays(today, 7) },
  ];
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setError("");
        start(async () => {
          const result = await createTask({ title, assignee, due, leadId });
          if (result.ok) {
            setTitle("");
            setDue("");
          } else setError(result.error);
        });
      }}
      className="space-y-3"
    >
      <label className="sr-only" htmlFor={`task-title-${leadId ?? "all"}`}>
        Task
      </label>
      <input id={`task-title-${leadId ?? "all"}`} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} placeholder="What needs doing?" className={field} />
      <div className="flex flex-wrap items-end gap-3">
        <div className="w-52">
          <Select label="For" value={assignee} options={[{ value: "", label: "Anyone" }, ...staff.map((person) => ({ value: person.email, label: person.name }))]} onChange={setAssignee} />
        </div>
        <div role="group" aria-label="Due" className="flex flex-wrap items-center gap-1.5">
          {quick.map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={due === option.value}
              onClick={() => setDue(due === option.value ? "" : option.value)}
              className={cn("min-h-10 rounded-full px-3.5 text-sm font-semibold transition-colors", due === option.value ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.07] text-white/75 hover:bg-white/[0.11]")}
            >
              {option.label}
            </button>
          ))}
          <label className="sr-only" htmlFor={`task-due-${leadId ?? "all"}`}>
            Due date
          </label>
          <input id={`task-due-${leadId ?? "all"}`} type="date" value={due} min={today} onChange={(e) => setDue(e.target.value)} className={cn(field, "w-40 py-2 [color-scheme:dark]")} />
        </div>
        <button type="submit" disabled={pending || title.trim().length < 2} className={primaryButton}>
          {pending ? "Adding…" : "Add task"}
        </button>
      </div>
      <ErrorText error={error} />
    </form>
  );
}

function TaskRow({ task, base }: { task: Task; base: string }) {
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [gone, setGone] = useState(false);
  const [pending, start] = useTransition();
  const change = (next: TaskStatus) => {
    const previous = status;
    setStatus(next);
    start(async () => {
      const result = await updateTask(task.id, { status: next });
      if (!result.ok) setStatus(previous);
    });
  };
  if (gone) return null;
  const overdue = task.due && status !== "done" && task.due < pkToday();
  return (
    <li className={cn("flex items-start gap-3 py-3", pending && "opacity-60")}>
      <button
        type="button"
        role="checkbox"
        aria-checked={status === "done"}
        aria-label={status === "done" ? `Mark “${task.title}” not done` : `Mark “${task.title}” done`}
        onClick={() => change(status === "done" ? "todo" : "done")}
        className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors", status === "done" ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.1] hover:bg-white/[0.16]")}
      >
        {status === "done" ? <Icon name="check" size={13} /> : null}
      </button>
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm text-white", status === "done" && "text-white/45 line-through")}>{task.title}</p>
        <p className="mt-0.5 flex flex-wrap gap-x-2 text-xs text-white/50">
          <span>{task.assigneeName ?? "Anyone"}</span>
          {task.due ? <span className={cn(overdue && "font-bold text-[#BEF70A]")}>{overdue ? "Overdue · " : "Due "}{dueText(task.due)}</span> : null}
          {task.leadId ? (
            <Link href={`${base}/leads/${task.leadId}`} className="underline decoration-white/30 underline-offset-2 hover:text-white">
              {task.leadName ?? "Lead"}
            </Link>
          ) : null}
        </p>
      </div>
      <div className="w-32 shrink-0">
        <Select label={`Status of ${task.title}`} hideLabel value={status} options={(Object.keys(TASK_STATUS_LABEL) as TaskStatus[]).map((s) => ({ value: s, label: TASK_STATUS_LABEL[s] }))} onChange={change} size="sm" />
      </div>
      <button
        type="button"
        aria-label={`Delete “${task.title}”`}
        onClick={() =>
          start(async () => {
            const result = await updateTask(task.id, { delete: true });
            if (result.ok) setGone(true);
          })
        }
        className={iconButton}
      >
        <Icon name="trash" size={16} />
      </button>
    </li>
  );
}

export function TaskList({ tasks, base, empty }: { tasks: Task[]; base: string; empty: string }) {
  return tasks.length ? (
    <ul className="-my-3 divide-y divide-white/[0.06]">
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} base={base} />
      ))}
    </ul>
  ) : (
    <p className="text-sm text-white/55">{empty}</p>
  );
}
