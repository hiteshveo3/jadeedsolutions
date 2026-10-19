"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { askTeamAI } from "@/app/app/(dash)/actions";
import { askClientAI } from "@/app/app/(dash)/portal-actions";
import { Icon, type IconName } from "@/components/system/Icon";
import { RichText, field } from "@/components/system/ui";
import { cn } from "@/lib/utils";

/* The top bar's tools (from Jadeed Marketing): search, the notifications bell and
   "Ask Jadeed AI". */

export function TopBarSearch({ base }: { base: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        if (q.trim()) router.push(`${base}/search?q=${encodeURIComponent(q.trim())}`);
      }}
      className="relative hidden min-w-0 max-w-md flex-1 sm:block"
    >
      <label className="sr-only" htmlFor="top-search">
        Search
      </label>
      <Icon name="search" size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
      <input id="top-search" type="text" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search leads, chats, tasks…" className={cn(field, "h-10 rounded-full py-0 pl-10")} />
    </form>
  );
}

type Item = { id: string; kind: "lead" | "call" | "ticket" | "question" | "task" | "message" | "update" | "proposal" | "invoice"; title: string; detail?: string; href: string; at: string };
const KIND_ICON: Record<Item["kind"], IconName> = {
  lead: "people",
  call: "calendar",
  ticket: "mail",
  question: "sparkles",
  task: "tasks",
  message: "message",
  update: "activity",
  proposal: "document",
  invoice: "receipt",
};

const ago = (iso: string) => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 0) return "today";
  if (mins < 60) return `${Math.max(1, mins)}m`;
  if (mins < 1440) return `${Math.round(mins / 60)}h`;
  return `${Math.round(mins / 1440)}d`;
};

export function NotificationBell({ base }: { base: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<{ items: Item[]; unread: number } | null>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // Refresh on each page change (cheap, no polling).
  useEffect(() => {
    void fetch("/api/notifications", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((body) => body && setData(body))
      .catch(() => {});
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && data?.unread) {
      void fetch("/api/notifications", { method: "POST" }).then(() => setData((current) => (current ? { ...current, unread: 0 } : current)));
    }
  };

  return (
    <div ref={wrapper} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={data?.unread ? `Notifications, ${data.unread} new` : "Notifications"}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white"
      >
        <Icon name="bell" size={21} />
        {data?.unread ? (
          <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#BEF70A] px-1 text-[10px] font-extrabold text-[#0B1F12]">
            {data.unread > 9 ? "9+" : data.unread}
          </span>
        ) : null}
      </button>
      {open ? (
        <div className="absolute right-0 top-12 z-40 w-[min(23rem,calc(100vw-2rem))] overflow-hidden rounded-[20px] bg-[#0A3B23] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <p className="border-b border-white/[0.08] px-4 py-3 text-sm font-bold text-white">Notifications</p>
          {data?.items.length ? (
            <ul className="max-h-[60vh] overflow-y-auto p-1.5 custom-scrollbar">
              {data.items.map((item) => (
                <li key={item.id}>
                  <Link href={`${base}${item.href}`} onClick={() => setOpen(false)} className="flex gap-3 rounded-[14px] px-3 py-2.5 transition-colors hover:bg-white/[0.06]">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BEF70A]/[0.1] text-[#BEF70A]">
                      <Icon name={KIND_ICON[item.kind]} size={15} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-white">{item.title}</span>
                      {item.detail ? <span className="block truncate text-xs text-white/50">{item.detail}</span> : null}
                    </span>
                    <span className="shrink-0 text-xs text-white/45">{ago(item.at)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-8 text-center text-sm text-white/60">{data ? "All quiet. Nothing new this week." : "Loading…"}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

const EXAMPLES = {
  team: ["Which A and B leads haven't been contacted yet?", "What calls do I have this week?", "What did people ask about most in chats lately?"],
  client: ["How many customers did Jadeed bring this month?", "What did the team work on lately?", "How much is due on my invoices?"],
};

const COPY = {
  team: { title: "Ask Jadeed AI about your leads, calls and chats", intro: "It reads the latest leads, calls, tasks, clients and chats, and answers from them.", placeholder: "Ask about your leads, calls, tasks or chats…" },
  client: { title: "Ask Jadeed AI about your account", intro: "It answers from your own record, updates and invoices. Anything it can't answer goes to Sameer as a message.", placeholder: "Ask about your results, work or invoices…" },
};

/** The top bar's AI panel. The team asks about everything; a client only about their own account. */
export function AskJadeedAI({ audience = "team" }: { audience?: "team" | "client" }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<{ q: string; a: string }[]>([]);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => input.current?.focus());
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q || pending) return;
    setError("");
    start(async () => {
      const result = audience === "client" ? await askClientAI(q) : await askTeamAI(q);
      if (result.ok) {
        const passed = "passed" in result && result.passed ? "\n\n(Passed to Sameer in Messages.)" : "";
        setAnswers((current) => [...current, { q, a: result.answer + passed }]);
        setQuestion("");
      } else setError(result.error);
    });
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Ask Jadeed AI" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#BEF70A] px-3.5 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09]">
        <Icon name="sparkles" size={17} />
        <span className="hidden sm:inline">Ask Jadeed AI</span>
      </button>
      {/* A portal to <body>: the top bar's backdrop blur would otherwise trap this fixed panel inside the bar. */}
      {open ? createPortal(
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Ask Jadeed AI">
          <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute inset-0 bg-[#051B1E]/60 backdrop-blur-sm" />
          <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-[#06301D] shadow-[0_0_60px_rgba(0,0,0,0.45)]">
            <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-4">
              <p className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
                  <Icon name="sparkles" size={14} />
                </span>
                {COPY[audience].title}
              </p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 hover:bg-white/[0.08] hover:text-white">
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-4 custom-scrollbar">
              {answers.length === 0 ? (
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed text-white/65">{COPY[audience].intro}</p>
                  {EXAMPLES[audience].map((example) => (
                    <button key={example} type="button" onClick={() => ask(example)} className="block w-full rounded-[16px] bg-white/[0.06] px-3.5 py-3 text-left text-sm text-white transition-colors hover:bg-white/[0.1]">
                      {example}
                    </button>
                  ))}
                </div>
              ) : null}
              {answers.map((item, index) => (
                <div key={index} className="space-y-2">
                  <p className="ml-auto w-fit max-w-[85%] rounded-[18px] rounded-br-[6px] bg-[#BEF70A] px-3.5 py-2 text-sm text-[#0B1F12]">{item.q}</p>
                  <div className="max-w-[95%] rounded-[18px] rounded-bl-[6px] bg-white/[0.07] px-4 py-3 text-sm leading-relaxed text-white/85">
                    <RichText text={item.a} />
                  </div>
                </div>
              ))}
              {pending ? <p className="text-sm text-white/60">Thinking…</p> : null}
              {error ? (
                <p role="alert" className="text-sm text-[#ffb4a8]">
                  {error}
                </p>
              ) : null}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                ask(question);
              }}
              className="flex shrink-0 items-end gap-2 border-t border-white/[0.08] p-3"
            >
              <label className="sr-only" htmlFor="team-ai-question">
                Your question
              </label>
              <textarea
                id="team-ai-question"
                ref={input}
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    ask(question);
                  }
                }}
                rows={2}
                maxLength={500}
                placeholder={COPY[audience].placeholder}
                className={cn(field, "min-h-11 flex-1 resize-none")}
              />
              <button type="submit" disabled={pending || !question.trim()} aria-label="Ask" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#BEF70A] text-[#0B1F12] transition-colors hover:bg-[#ABDE09] disabled:opacity-50">
                <Icon name="send" size={18} />
              </button>
            </form>
          </aside>
        </div>,
        document.body
      ) : null}
    </>
  );
}
