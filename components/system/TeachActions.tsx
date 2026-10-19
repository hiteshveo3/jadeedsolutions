"use client";

import { useState, useTransition } from "react";
import { addAnswer, draftAnswer, markTicket, saveAnswer, setAnswerStatus } from "@/app/app/(dash)/actions";
import { Icon } from "@/components/system/Icon";
import { Chip, card, field, primaryButton, secondaryButton, textLink } from "@/components/system/ui";
import type { KnowledgeEntry } from "@/lib/system/types";
import { cn } from "@/lib/utils";

/* Teach Jadeed AI (from Jadeed Marketing): questions the AI couldn't answer, answered by the
   team and approved by Sameer; approved answers are what Jadeed AI says from then on. */

export function AnswerCard({ entry, isAdmin, chatHref }: { entry: KnowledgeEntry; isAdmin: boolean; chatHref?: string }) {
  const [question, setQuestion] = useState(entry.question);
  const [answer, setAnswer] = useState(entry.answer);
  const [message, setMessage] = useState("");
  const [pending, start] = useTransition();
  const run = (work: () => Promise<{ ok: boolean; error?: string }>, done: string) => {
    setMessage("");
    start(async () => {
      const result = await work();
      setMessage(result.ok ? done : (result.error ?? "Something went wrong."));
    });
  };
  const approved = entry.status === "approved";

  return (
    <li className={cn(card, "p-4 sm:p-5")}>
      <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
        {entry.count ? <Chip on>Asked {entry.count}×</Chip> : null}
        <span>{entry.createdBy === "chat" ? "From a chat" : `Added by ${entry.createdBy}`}</span>
        {entry.answeredBy ? <span>· answered by {entry.answeredBy}</span> : null}
        {chatHref ? (
          <a href={chatHref} className={textLink}>
            See the chat
          </a>
        ) : null}
      </div>
      <label className="mt-3 block text-xs font-semibold text-white/60" htmlFor={`q-${entry.id}`}>
        Question
      </label>
      <input id={`q-${entry.id}`} value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={300} className={cn(field, "mt-1.5 font-semibold")} />
      <label className="mt-3 block text-xs font-semibold text-white/60" htmlFor={`a-${entry.id}`}>
        Answer Jadeed AI should give
      </label>
      <textarea id={`a-${entry.id}`} value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} maxLength={2000} placeholder="Write the answer in plain words. Facts only." className={cn(field, "mt-1.5")} />
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            run(async () => {
              const result = await draftAnswer(question);
              if (result.ok) setAnswer(result.answer);
              return result;
            }, "Draft written. Check anything in [brackets] before saving.")
          }
          className={secondaryButton}
        >
          <Icon name="sparkles" size={16} />
          Draft with AI
        </button>
        <button type="button" disabled={pending} onClick={() => run(() => saveAnswer(entry.id, question, answer, false), approved ? "Saved." : "Saved. It goes live once Sameer approves it.")} className={secondaryButton}>
          Save
        </button>
        {isAdmin && !approved ? (
          <button type="button" disabled={pending} onClick={() => run(() => saveAnswer(entry.id, question, answer, true), "Approved. Jadeed AI uses it now.")} className={primaryButton}>
            <Icon name="check" size={16} />
            Approve
          </button>
        ) : null}
        {isAdmin && approved ? (
          <button type="button" disabled={pending} onClick={() => run(() => setAnswerStatus(entry.id, "pending"), "Taken offline.")} className={secondaryButton}>
            Take offline
          </button>
        ) : null}
        {isAdmin ? (
          <button type="button" disabled={pending} onClick={() => run(() => setAnswerStatus(entry.id, "deleted"), "Deleted.")} className={cn(secondaryButton, "ml-auto")}>
            <Icon name="trash" size={16} />
            Delete
          </button>
        ) : null}
      </div>
      {message ? (
        <p role="status" className="mt-2 text-sm text-white/80">
          {message}
        </p>
      ) : null}
    </li>
  );
}

export function AddAnswerForm({ isAdmin }: { isAdmin: boolean }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [pending, start] = useTransition();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("");
        start(async () => {
          const result = await addAnswer(question, answer);
          if (result.ok) {
            setQuestion("");
            setAnswer("");
            setMessage(isAdmin ? "Added. Jadeed AI uses it now." : "Added. It goes live once Sameer approves it.");
          } else setMessage(result.error);
        });
      }}
      className="space-y-2.5"
    >
      <label className="sr-only" htmlFor="new-question">
        Question
      </label>
      <input id="new-question" value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={300} placeholder="A question visitors ask" className={field} />
      <label className="sr-only" htmlFor="new-answer">
        Answer
      </label>
      <textarea id="new-answer" value={answer} onChange={(e) => setAnswer(e.target.value)} rows={3} maxLength={2000} placeholder="The answer Jadeed AI should give" className={field} />
      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={pending || question.trim().length < 5} className={primaryButton}>
          {pending ? "Adding…" : "Add answer"}
        </button>
        <button
          type="button"
          disabled={pending || question.trim().length < 5}
          onClick={() =>
            start(async () => {
              setMessage("");
              const result = await draftAnswer(question);
              if (result.ok) setAnswer(result.answer);
              else setMessage(result.error);
            })
          }
          className={secondaryButton}
        >
          <Icon name="sparkles" size={16} />
          Draft with AI
        </button>
      </div>
      {message ? (
        <p role="status" className="text-sm text-white/80">
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function TicketButton({ ticketId, answered }: { ticketId: string; answered: boolean }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" disabled={pending} onClick={() => start(async () => void (await markTicket(ticketId, answered ? "open" : "answered")))} className={secondaryButton}>
      <Icon name="check" size={16} />
      {answered ? "Reopen" : "Mark answered"}
    </button>
  );
}
