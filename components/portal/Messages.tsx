"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { markThreadRead, sendMessage } from "@/app/app/(dash)/portal-actions";
import { Icon } from "@/components/system/Icon";
import type { ClientMessage } from "@/lib/system/types";
import { cn } from "@/lib/utils";
import { FileLink, useUploads } from "./ui";

/* One message thread per client, replacing WhatsApp (from Jadeed Marketing; Design Lab idea
   096 A). On phones it looks and works like a WhatsApp chat (owner, 5 Oct 2026): no card,
   full width, day labels, the time inside each bubble, and the composer pinned at the bottom
   with attach, a growing text box and send. On bigger screens it sits in a card.
   Opening it marks it read and cancels the waiting email for this side. */

const time = (iso: string) => new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(iso));
const dayKey = (iso: string) => new Date(iso).toDateString();
function dayLabel(iso: string) {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date(Date.now() - 86_400_000);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", ...(date.getFullYear() !== today.getFullYear() ? { year: "numeric" } : {}) }).format(date);
}

export function MessageThread({
  messages,
  side,
  clientId,
  otherName,
  subtitle,
  layout = "page",
}: {
  messages: ClientMessage[];
  side: "team" | "client";
  /** Required for the team; clients are scoped by their login. */
  clientId?: string;
  otherName: string;
  subtitle?: string;
  /** "page": the screen is the chat (client Messages). "embedded": inside a client's workspace tab. */
  layout?: "page" | "embedded";
}) {
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const uploads = useUploads("message", clientId);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    void markThreadRead(clientId);
  }, [clientId, messages.length]);

  useEffect(() => {
    const box = scroller.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [messages.length]);

  /* The text box grows with what's typed, up to about five lines (like WhatsApp). */
  const grow = () => {
    const el = input.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
    el.style.overflowY = el.scrollHeight > 132 ? "auto" : "hidden";
  };
  useEffect(grow, [body]);

  const send = () => {
    if ((!body.trim() && !uploads.files.length) || pending) return;
    setError("");
    start(async () => {
      const result = await sendMessage(clientId, { body, attachments: uploads.files });
      if (result.ok) {
        setBody("");
        uploads.clear();
      } else setError(result.error);
    });
  };

  const initial = otherName.trim().slice(0, 1).toUpperCase() || "J";
  let lastDay = "";

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden",
        // Phones: edge to edge, no card. The client's Messages screen fills the space between the top bar and the bottom navigation.
        "-mx-4 sm:mx-auto sm:max-w-3xl sm:rounded-[20px] sm:border sm:border-white/[0.08] sm:bg-white/[0.05]",
        layout === "page" ? "-mb-4 -mt-4 h-[calc(100dvh-8rem-env(safe-area-inset-bottom))] sm:my-0 sm:h-auto" : "h-[72dvh] sm:h-auto"
      )}
    >
      <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.08] bg-[#06301D]/50 px-4 py-3 sm:bg-transparent sm:px-5 sm:py-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#BEF70A] text-sm font-extrabold text-[#0B1F12]">{initial}</span>
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-extrabold text-white">{otherName}</p>
          <p className="truncate text-xs text-white/50">{subtitle ?? (side === "client" ? "Sameer and the team reply here" : "One thread with this client")}</p>
        </div>
      </div>

      <div ref={scroller} className="min-h-0 flex-1 space-y-1.5 overflow-y-auto overscroll-contain px-3 py-4 custom-scrollbar sm:max-h-[58vh] sm:min-h-64 sm:flex-none sm:px-5">
        {messages.length ? (
          messages.map((message) => {
            const mine = message.from === side;
            const key = dayKey(message.createdAt);
            const showDay = key !== lastDay;
            lastDay = key;
            const who = mine ? null : message.byName || (message.from === "team" ? "Jadeed" : otherName);
            return (
              <div key={message.id}>
                {showDay ? (
                  <p className="my-3 flex justify-center">
                    <span className="rounded-full bg-[#06301D]/80 px-3 py-1 text-[11px] font-semibold text-white/60">{dayLabel(message.createdAt)}</span>
                  </p>
                ) : null}
                <div className={cn("flex", mine ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[82%] whitespace-pre-wrap break-words rounded-[18px] px-3.5 pb-1.5 pt-2 text-[15px] leading-snug sm:max-w-[75%] sm:text-sm",
                      mine ? "rounded-br-[6px] bg-[#BEF70A] text-[#0B1F12]" : "rounded-bl-[6px] bg-white/[0.1] text-white/90"
                    )}
                  >
                    {message.viaAi ? (
                      <span className={cn("mb-0.5 flex items-center gap-1 text-xs font-bold", mine ? "text-[#0B1F12]/70" : "text-[#BEF70A]")}>
                        <Icon name="sparkles" size={12} />
                        Passed on by Jadeed AI
                      </span>
                    ) : who ? (
                      <span className="mb-0.5 block text-xs font-bold text-[#BEF70A]">{who}</span>
                    ) : null}
                    {message.body}
                    {message.attachments?.length ? (
                      <span className="mt-2 flex flex-wrap gap-1.5">
                        {message.attachments.map((file) => (
                          <FileLink key={file.id} file={file} />
                        ))}
                      </span>
                    ) : null}
                    <span className={cn("float-right ml-3 mt-1.5 text-[10.5px] leading-none", mine ? "text-[#0B1F12]/60" : "text-white/45")}>{time(message.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="py-12 text-center text-sm text-white/50">No messages yet. Write the first one below.</p>
        )}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
        className="shrink-0 border-t border-white/[0.08] bg-[#06301D]/50 px-2.5 py-2.5 sm:bg-transparent sm:px-4 sm:py-3"
      >
        {uploads.files.length || uploads.error ? (
          <div className="mb-2 flex flex-wrap gap-1.5 px-1">
            {uploads.files.map((file) => (
              <span key={file.id} className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-1.5 text-xs text-white">
                <span className="truncate">{file.name}</span>
                <button type="button" aria-label={`Remove ${file.name}`} onClick={() => uploads.remove(file.id)} className="text-white/55 hover:text-white">
                  <Icon name="x" size={14} />
                </button>
              </span>
            ))}
            {uploads.error ? (
              <p role="alert" className="basis-full text-xs text-[#ffb4a8]">
                {uploads.error}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="flex items-end gap-2">
          {uploads.picker}
          <button type="button" onClick={uploads.open} disabled={uploads.busy} aria-label={uploads.busy ? "Uploading…" : "Attach a file"} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/75 transition-colors hover:bg-white/[0.13] hover:text-white disabled:opacity-50">
            <Icon name={uploads.busy ? "refresh" : "attach"} size={20} className={uploads.busy ? "animate-spin" : ""} />
          </button>
          <label className="sr-only" htmlFor="message-body">
            Message
          </label>
          <textarea
            id="message-body"
            ref={input}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            onKeyDown={(event) => {
              // Desktop: Enter sends, Shift+Enter is a new line. Phones: Enter is a new line, like WhatsApp.
              if (event.key === "Enter" && !event.shiftKey && !window.matchMedia("(pointer: coarse)").matches) {
                event.preventDefault();
                send();
              }
            }}
            rows={1}
            maxLength={5000}
            placeholder={side === "team" ? `Message ${otherName}…` : "Message"}
            className="min-h-11 flex-1 resize-none rounded-[22px] border px-4 py-[11px] text-[15px] leading-[1.4] text-white outline-none sm:text-sm"
          />
          <button type="submit" disabled={pending || uploads.busy || (!body.trim() && !uploads.files.length)} aria-label="Send" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#BEF70A] text-[#0B1F12] transition-colors hover:bg-[#ABDE09] disabled:opacity-50">
            <Icon name="send" size={19} />
          </button>
        </div>
        {error ? (
          <p role="alert" className="mt-2 px-1 text-sm text-[#ffb4a8]">
            {error}
          </p>
        ) : null}
        <p className="mt-2 hidden px-1 text-xs text-white/45 sm:block">{side === "team" ? "They get one email if they haven't read it within 30 minutes." : "The team gets an email if nobody reads it within 30 minutes."}</p>
      </form>
    </div>
  );
}
