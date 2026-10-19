"use client";

import { useState, useTransition } from "react";
import { summarizeChatNow, writeChatReport } from "@/app/app/(dash)/actions";
import { Icon } from "@/components/system/Icon";
import { ErrorText, RichText, secondaryButton } from "@/components/system/ui";
import { cn } from "@/lib/utils";

export function SummarizeButton({ chatId }: { chatId: string }) {
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setError("");
            const result = await summarizeChatNow(chatId);
            if (!result.ok) setError(result.error);
          })
        }
        className={secondaryButton}
      >
        <Icon name="sparkles" size={16} />
        {pending ? "Summarising…" : "Summarise again"}
      </button>
      <ErrorText error={error} />
    </div>
  );
}

/** The monthly "what people ask" report: shows the saved one and can write a fresh one. */
export function ChatReport({ saved, month }: { saved?: { report: string; chats: number; createdAt: string }; month: string }) {
  const [report, setReport] = useState(saved?.report ?? "");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  return (
    <div>
      {report ? (
        <RichText text={report} className="text-sm leading-relaxed text-white/85" />
      ) : (
        <p className="text-sm text-white/60">No report for {month} yet. Jadeed AI reads this month&apos;s chat summaries and open questions and writes one.</p>
      )}
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setError("");
            const result = await writeChatReport();
            if (result.ok) setReport(result.report);
            else setError(result.error);
          })
        }
        className={cn(secondaryButton, "mt-4")}
      >
        <Icon name="sparkles" size={16} />
        {pending ? "Writing…" : report ? "Write it again" : "Write this month's report"}
      </button>
      <ErrorText error={error} />
    </div>
  );
}
