"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cta } from "@/lib/site";
import { HugeiconsIcon, ArrowRightIcon, ArrowUpRightIcon, CheckIcon, CloseIcon, LoaderIcon, SparklesIcon } from "@/components/icons";
import { ChatText } from "./ChatText";
import { proposalChat } from "@/lib/ai/proposals/chat-config";

/* Jadeed AI, placed exactly as on Jadeed Marketing (owner, 5 Oct 2026):
   - desktop: an "Ask Jadeed AI" pill bottom-right that opens a docked panel there;
   - phones: a bar with two actions — the free audit and the assistant — that slides
     up once the visitor is past the first screen; the panel opens full screen.
   Everything stays on the site: the human handoff is a short form, not WhatsApp. */

type Source = { title: string; path: string };
type Message = { role: "user" | "assistant"; content: string; sources?: Source[]; handoff?: boolean; pending?: boolean };
export type OpenChatDetail = { question?: string };

const SUGGESTED = [
  "How does the 10% partnership work?",
  "Is there a setup fee?",
  "What does local SEO cost?",
  "Can I leave after six months?",
  "Do you work with my competitors?",
  "Is my area still open?",
] as const;

/** Opens the chat from anywhere: openChat() or openChat("Is my area open?"). */
export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent<OpenChatDetail>("open-jadeed-chat", { detail: { question } }));
}

export function ChatWidget() {
  const pathname = usePathname();
  // On a client proposal page the assistant answers only from that proposal.
  const pc = proposalChat(pathname);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [pastFold, setPastFold] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const ask = useCallback(
    async (question: string) => {
      const q = question.trim().slice(0, 600);
      if (!q || busy) return;
      setOpen(true);
      setDraft("");
      const history: Message[] = [...messages.filter((m) => !m.pending), { role: "user", content: q }];
      setMessages([...history, { role: "assistant", content: "", pending: true }]);
      setBusy(true);
      const controller = new AbortController();
      abortRef.current = controller;
      const patch = (fn: (m: Message) => Message) =>
        setMessages((list) => {
          const next = list.slice();
          next[next.length - 1] = fn(next[next.length - 1]);
          return next;
        });
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })), page: pathname || "/" }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          patch((m) => ({ ...m, pending: false, content: data.error ?? "I couldn't answer that just now. Please try again.", handoff: true }));
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            const event = JSON.parse(line) as { t: string; v?: string; items?: Source[] };
            if (event.t === "text" && event.v) patch((m) => ({ ...m, pending: false, content: m.content + event.v }));
            else if (event.t === "sources" && event.items) patch((m) => ({ ...m, sources: event.items }));
            else if (event.t === "handoff") patch((m) => ({ ...m, handoff: true }));
          }
        }
        patch((m) => ({ ...m, pending: false }));
      } catch {
        if (!controller.signal.aborted) patch((m) => ({ ...m, pending: false, content: m.content || "I couldn't answer that just now. Please try again in a moment.", handoff: true }));
      } finally {
        setBusy(false);
      }
    },
    [busy, messages, pathname]
  );

  useEffect(() => {
    const onOpen = (e: Event) => {
      const q = (e as CustomEvent<OpenChatDetail | undefined>).detail?.question;
      setOpen(true);
      if (q) window.setTimeout(() => ask(q), 0);
    };
    window.addEventListener("open-jadeed-chat", onOpen);
    return () => window.removeEventListener("open-jadeed-chat", onOpen);
  }, [ask]);

  useEffect(() => {
    const onScroll = () => setPastFold(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    // Full screen on phones: stop the page scrolling underneath.
    const phone = window.matchMedia("(max-width: 767px)").matches;
    if (phone) document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  /* Chats are saved for the team's dashboard (as on Jadeed Marketing). When a chat ends — the
     panel closes, a new chat starts or the page is left — a beacon asks for its AI summary. */
  const askedRef = useRef(false);
  useEffect(() => {
    askedRef.current = messages.some((m) => m.role === "user");
  }, [messages]);
  const endChat = useCallback(() => {
    if (!askedRef.current) return;
    try {
      navigator.sendBeacon?.("/api/chat/end");
    } catch {
      /* A missed beacon is caught by the daily job. */
    }
  }, []);
  useEffect(() => {
    window.addEventListener("pagehide", endChat);
    return () => window.removeEventListener("pagehide", endChat);
  }, [endChat]);

  // Proposals carry their own terms (only those with a proposal assistant show the chat); the design lab has its own bar.
  if (pathname?.startsWith("/design-lab") || (pathname?.startsWith("/proposal") && !pc)) return null;

  const close = () => {
    endChat();
    setOpen(false);
  };
  const onNavigate = () => {
    if (window.matchMedia("(max-width: 767px)").matches) close();
  };
  const reset = () => {
    endChat();
    abortRef.current?.abort();
    setBusy(false);
    setMessages([]);
  };
  const lastQuestion = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
        {open ? (
          <section
            id="jadeed-chat-panel"
            role="dialog"
            aria-labelledby="jadeed-chat-title"
            className="fixed inset-0 flex h-dvh w-screen flex-col overflow-hidden bg-[radial-gradient(130%_80%_at_50%_0%,#0B561C_0%,#06301D_55%,#051B1E_100%)] md:static md:h-[min(640px,calc(100dvh-3rem))] md:w-[400px] md:rounded-[24px] md:shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
          >
            <header className="flex shrink-0 items-center justify-between gap-2 px-4 pb-3 pt-[calc(0.75rem+env(safe-area-inset-top))] md:pt-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
                  <HugeiconsIcon icon={SparklesIcon} size={18} />
                </span>
                <div className="min-w-0">
                  <h2 id="jadeed-chat-title" className="truncate text-[15px] font-bold" style={{ fontFamily: "var(--font-sans)", fontWeight: 700 }}>
                    {pc ? pc.title : "Jadeed AI"}
                  </h2>
                  <p className="flex items-center gap-1.5 truncate text-xs text-white/55">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#BEF70A]" aria-hidden="true" />
                    {pc ? pc.subtitle : "Pricing, terms & your area"}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {messages.length > 0 && (
                  <button type="button" onClick={reset} aria-label="New chat" title="New chat" className="grid h-9 w-9 place-items-center rounded-full text-white/65 transition-colors hover:bg-white/[0.08] hover:text-white">
                    <HugeiconsIcon icon={LoaderIcon} size={18} />
                  </button>
                )}
                <button type="button" onClick={close} aria-label="Close chat" className="grid h-9 w-9 place-items-center rounded-full text-white/65 transition-colors hover:bg-white/[0.08] hover:text-white">
                  <HugeiconsIcon icon={CloseIcon} size={18} />
                </button>
              </div>
            </header>
            <div className="mx-4 h-px shrink-0 bg-white/[0.08]" />

            <div ref={threadRef} className="custom-scrollbar flex-1 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
              {messages.length === 0 ? (
                <div>
                  <Bubble>{pc ? pc.greeting : "Hi! Ask me about pricing, the Growth Partnership, our services or your area. I answer from this website — and pass anything else to Sameer."}</Bubble>
                  <div className="mt-4 flex flex-wrap gap-2 pl-11">
                    {(pc ? pc.suggested : SUGGESTED).map((q) => (
                      <button key={q} type="button" onClick={() => ask(q)} className="rounded-full bg-white/[0.06] px-3.5 py-2 text-left text-[13px] font-medium text-white/85 transition-colors hover:bg-[#BEF70A]/[0.14] hover:text-[#BEF70A]">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((m, i) =>
                    m.role === "user" ? (
                      <div key={i} className="flex justify-end">
                        <p className="max-w-[85%] rounded-[18px] rounded-tr-[6px] bg-[#BEF70A] px-4 py-2.5 text-[15px] font-medium leading-6 text-[#0B1F12]">{m.content}</p>
                      </div>
                    ) : (
                      <div key={i}>
                        <Bubble>
                          {m.pending && !m.content ? (
                            <span className="flex h-7 items-center gap-1.5" aria-label="Thinking">
                              {[0, 1, 2].map((d) => (
                                <i key={d} className="h-1.5 w-1.5 rounded-full bg-[#BEF70A] motion-safe:animate-bounce" style={{ animationDelay: `${d * 140}ms` }} />
                              ))}
                            </span>
                          ) : (
                            <ChatText text={m.content} onNavigate={onNavigate} />
                          )}
                        </Bubble>
                        {!!m.sources?.length && (
                          <div className="mt-2 flex flex-wrap items-center gap-1.5 pl-11">
                            <span className="text-[11px] font-bold uppercase tracking-[.12em] text-white/40">From</span>
                            {m.sources.map((s) => (
                              <Link key={`${s.path}-${s.title}`} href={s.path} onClick={onNavigate} className="inline-flex h-7 items-center gap-1 rounded-full bg-white/[0.06] px-2.5 text-xs font-semibold text-white/75 transition-colors hover:bg-[#BEF70A]/[0.14] hover:text-[#BEF70A]">
                                {s.title}
                                <HugeiconsIcon icon={ArrowUpRightIcon} size={12} />
                              </Link>
                            ))}
                          </div>
                        )}
                        {m.handoff && !m.pending && i === messages.length - 1 && <Handoff question={lastQuestion} page={pathname || "/"} />}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <form
              className="shrink-0 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2"
              onSubmit={(e) => {
                e.preventDefault();
                ask(draft);
              }}
            >
              <div className="flex items-end gap-2 rounded-[22px] bg-white/[0.08] p-1.5 pl-4 focus-within:bg-white/[0.1]">
                <label htmlFor="jadeed-chat-input" className="sr-only">Your question</label>
                <textarea
                  id="jadeed-chat-input"
                  ref={inputRef}
                  rows={1}
                  value={draft}
                  maxLength={600}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      ask(draft);
                    }
                  }}
                  placeholder={busy ? "Answering…" : pc ? pc.placeholder : "Ask about Jadeed…"}
                  className="max-h-28 min-h-[40px] flex-1 resize-none bg-transparent py-2 text-[15px] leading-6 text-white outline-none placeholder:text-white/45"
                />
                <button type="submit" disabled={busy || !draft.trim()} aria-label="Send" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12] transition-opacity disabled:opacity-40">
                  <HugeiconsIcon icon={ArrowRightIcon} size={18} />
                </button>
              </div>
              <p className="mt-2 px-1 text-[11px] leading-4 text-white/40">
                {pc ? "Answers come from this proposal; the signed agreement is what counts." : "Answers come from this site; prices and terms are confirmed in writing."} Chats are kept for 24 months so the team can improve answers —{" "}
                <Link href="/privacy" onClick={onNavigate} className="underline underline-offset-2 hover:text-white/70">
                  privacy
                </Link>
                .
              </p>
            </form>
          </section>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded="false"
            aria-controls="jadeed-chat-panel"
            className="hidden min-h-12 items-center gap-2 rounded-full bg-[#BEF70A] px-5 py-3 text-sm font-bold text-[#0B1F12] shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[#ABDE09] md:flex"
          >
            <HugeiconsIcon icon={SparklesIcon} size={20} />
            {pc ? pc.launcher : "Ask Jadeed AI"}
          </button>
        )}
      </div>

      {/* Phones: both actions in one bar, once past the first screen. */}
      {!open && (
        <div
          data-mobile-bar
          aria-hidden={!pastFold || undefined}
          className={`fixed inset-x-0 bottom-0 z-[65] bg-[#06301D]/90 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-[transform,opacity] duration-300 md:hidden ${pastFold ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}
        >
          <div className={pc ? "grid" : "grid grid-cols-2 gap-2"}>
            {!pc && <Link href="/contact" tabIndex={pastFold ? undefined : -1} className="flex min-h-12 items-center justify-center rounded-full bg-[#BEF70A] px-3 text-sm font-bold text-[#0B1F12]">
              {cta.fit}
            </Link>}
            <button type="button" onClick={() => setOpen(true)} tabIndex={pastFold ? undefined : -1} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/[0.1] px-3 text-sm font-bold">
              <HugeiconsIcon icon={SparklesIcon} size={18} className="text-[#BEF70A]" />
              {pc ? pc.launcher : "Ask Jadeed AI"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]" aria-hidden="true">
        <HugeiconsIcon icon={SparklesIcon} size={15} />
      </span>
      <div className="min-w-0 max-w-[calc(100%-2.75rem)] rounded-[18px] rounded-tl-[6px] bg-white/[0.06] px-4 py-3 text-[15px] leading-7 text-white/85">{children}</div>
    </div>
  );
}

/* The human handoff, on the site: name and a way to reply. Sameer answers within 24 hours. */
function Handoff({ question, page }: { question: string; page: string }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  if (state === "sent") {
    return (
      <div className="ml-11 mt-3 flex items-start gap-2.5 rounded-[18px] bg-[#BEF70A]/[0.08] p-4 text-sm">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]"><HugeiconsIcon icon={CheckIcon} size={13} /></span>
        <span>Sent. Sameer will reply within 24 hours.</span>
      </div>
    );
  }
  return (
    <form
      className="ml-11 mt-3 rounded-[18px] bg-[#BEF70A]/[0.08] p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!name.trim() || !contact.trim()) return;
        setState("sending");
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: "ai-chat", name, contact, message: question, page }),
        }).catch(() => null);
        setState(res?.ok ? "sent" : "error");
      }}
    >
      <p className="text-sm font-bold">Send this to Sameer</p>
      <p className="mt-1 text-[13px] leading-5 text-white/65">The founder answers himself, within 24 hours.</p>
      <div className="mt-3 grid gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" required maxLength={80} className="h-10 rounded-full px-4 text-sm" />
        <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Email or phone" aria-label="Email or phone" required maxLength={120} className="h-10 rounded-full px-4 text-sm" />
      </div>
      <button type="submit" disabled={state === "sending"} className="mt-3 inline-flex h-9 items-center gap-2 rounded-full bg-[#BEF70A] px-4 text-[13px] font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09] disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send"}
      </button>
      {state === "error" && <p className="mt-2 text-xs text-[#ff8a8a]">That didn&apos;t send. Please try again in a moment.</p>}
    </form>
  );
}
