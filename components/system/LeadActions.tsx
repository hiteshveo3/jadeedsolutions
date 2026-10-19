"use client";

import { useState, useTransition } from "react";
import { addLeadNote, assignLead, cancelCall, draftFollowUp, markCall, setLeadStatus } from "@/app/app/(dash)/actions";
import { Icon } from "@/components/system/Icon";
import { ErrorText, Select, field, primaryButton, secondaryButton } from "@/components/system/ui";
import { LEAD_STATUS_LABEL, type LeadStatus } from "@/lib/system/types";
import { cn } from "@/lib/utils";

/* Interactive pieces of the lead screens (from Jadeed Marketing). Each calls a Server Action
   and shows the action's own error message if it fails. */

export function StatusControl({ leadId, status, compact = false }: { leadId: string; status: LeadStatus; compact?: boolean }) {
  const [value, setValue] = useState(status);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  return (
    <div className={cn(pending && "opacity-60")}>
      <Select
        label="Status"
        hideLabel={compact}
        value={value}
        options={(Object.keys(LEAD_STATUS_LABEL) as LeadStatus[]).map((s) => ({ value: s, label: LEAD_STATUS_LABEL[s] }))}
        onChange={(next) => {
          const previous = value;
          setValue(next);
          setError("");
          start(async () => {
            const result = await setLeadStatus(leadId, next);
            if (!result.ok) {
              setValue(previous);
              setError(result.error);
            }
          });
        }}
      />
      <ErrorText error={error} />
    </div>
  );
}

export function AssignControl({ leadId, assignedTo, staff }: { leadId: string; assignedTo?: string; staff: { email: string; name: string }[] }) {
  const [value, setValue] = useState(assignedTo ?? "");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const options = [{ value: "", label: "Nobody yet" }, ...staff.map((person) => ({ value: person.email, label: person.name }))];
  if (assignedTo && !staff.some((person) => person.email === assignedTo)) options.push({ value: assignedTo, label: assignedTo });
  return (
    <div className={cn(pending && "opacity-60")}>
      <Select
        label="Owner"
        value={value}
        options={options}
        onChange={(next) => {
          const previous = value;
          setValue(next);
          setError("");
          start(async () => {
            const result = await assignLead(leadId, next);
            if (!result.ok) {
              setValue(previous);
              setError(result.error);
            }
          });
        }}
      />
      <ErrorText error={error} />
    </div>
  );
}

export function NoteComposer({ leadId }: { leadId: string }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!text.trim()) return;
        setError("");
        start(async () => {
          const result = await addLeadNote(leadId, text);
          if (result.ok) setText("");
          else setError(result.error);
        });
      }}
    >
      <label className="sr-only" htmlFor={`note-${leadId}`}>
        Add a note
      </label>
      <textarea id={`note-${leadId}`} value={text} onChange={(event) => setText(event.target.value)} rows={3} maxLength={4000} placeholder="Add a note: what you discussed, what's next…" className={field} />
      <div className="mt-2 flex justify-end">
        <button type="submit" disabled={pending || !text.trim()} className={primaryButton}>
          {pending ? "Saving…" : "Add note"}
        </button>
      </div>
      <ErrorText error={error} />
    </form>
  );
}

export function FollowUpDraft({ leadId, email }: { leadId: string; email?: string }) {
  const [purpose, setPurpose] = useState("");
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [pending, start] = useTransition();

  const mailto = draft && email ? `mailto:${email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}` : null;

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`purpose-${leadId}`}>
          What the email is for
        </label>
        <input id={`purpose-${leadId}`} value={purpose} onChange={(event) => setPurpose(event.target.value)} maxLength={300} placeholder="What for? e.g. they missed the call, send the audit, check in" className={field} />
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setError("");
            setCopied(false);
            start(async () => {
              const result = await draftFollowUp(leadId, purpose);
              if (result.ok) setDraft({ subject: result.subject, body: result.body });
              else setError(result.error);
            });
          }}
          className={cn(primaryButton, "shrink-0")}
        >
          <Icon name="sparkles" size={16} />
          {pending ? "Writing…" : draft ? "Write again" : "Draft with AI"}
        </button>
      </div>
      <ErrorText error={error} />
      {draft ? (
        <div className="mt-3 space-y-2">
          <input aria-label="Subject" value={draft.subject} onChange={(event) => setDraft({ ...draft, subject: event.target.value })} className={cn(field, "font-semibold")} />
          <textarea aria-label="Email" value={draft.body} onChange={(event) => setDraft({ ...draft, body: event.target.value })} rows={9} className={field} />
          <div className="flex flex-wrap gap-2">
            {mailto ? (
              <a href={mailto} className={primaryButton}>
                <Icon name="mail" size={16} />
                Open in email
              </a>
            ) : null}
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(`Subject: ${draft.subject}\n\n${draft.body}`);
                  setCopied(true);
                } catch {
                  setError("Couldn't copy. Select the text and copy it instead.");
                }
              }}
              className={secondaryButton}
            >
              <Icon name="copy" size={16} />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-white/45">A draft only: nothing is sent until you send it from your email.</p>
        </div>
      ) : null}
    </div>
  );
}

export function CallActions({ bookingId, past }: { bookingId: string; past: boolean }) {
  const [confirming, setConfirming] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  const run = (action: () => Promise<{ ok: boolean; error?: string }>) => {
    setError("");
    start(async () => {
      const result = await action();
      if (!result.ok) setError(result.error ?? "Something went wrong.");
      else setConfirming(false);
    });
  };

  return (
    <div className="mt-3">
      {confirming ? (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white" htmlFor={`reason-${bookingId}`}>
            Reason (goes in the email to them)
          </label>
          <input id={`reason-${bookingId}`} value={reason} onChange={(event) => setReason(event.target.value)} maxLength={300} placeholder="e.g. Sameer is travelling that day" className={field} />
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={pending} onClick={() => run(() => cancelCall(bookingId, reason))} className={primaryButton}>
              {pending ? "Cancelling…" : "Cancel the call"}
            </button>
            <button type="button" onClick={() => setConfirming(false)} className={secondaryButton}>
              Keep it
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {past ? (
            <>
              <button type="button" disabled={pending} onClick={() => run(() => markCall(bookingId, "done"))} className={secondaryButton}>
                <Icon name="check" size={16} />
                Call held
              </button>
              <button type="button" disabled={pending} onClick={() => run(() => markCall(bookingId, "no_show"))} className={secondaryButton}>
                No-show
              </button>
            </>
          ) : null}
          <button type="button" disabled={pending} onClick={() => setConfirming(true)} className={secondaryButton}>
            Cancel call
          </button>
        </div>
      )}
      <ErrorText error={error} />
    </div>
  );
}
