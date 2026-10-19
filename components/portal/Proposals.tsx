"use client";

import { useState, useTransition, type ReactNode } from "react";
import { decideProposal, saveProposal, sendProposal } from "@/app/app/(dash)/portal-actions";
import { Icon } from "@/components/system/Icon";
import { Label } from "@/components/system/Page";
import { Chip, Notice, RichText, card, field, iconButton, primaryButton, secondaryButton } from "@/components/system/ui";
import { PROPOSAL_STATUS_LABEL, type Proposal } from "@/lib/system/types";
import { cn } from "@/lib/utils";

/* Proposals in the portal (from Jadeed Marketing): the team writes and sends; the client
   owner reads and approves or declines, and approval records the typed name and the time.
   Design Lab idea 097 A: the key terms as small cards, then two buttons. */

const day = (iso: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
const dayTime = (iso: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(iso));

type Draft = { id: string; title: string; summary: string; sections: { heading: string; body: string }[]; keyTerms: { label: string; value: string }[]; price: string; terms: string };

const STARTER: Draft["sections"] = [
  { heading: "Where you are today", body: "" },
  { heading: "What we'll do", body: "" },
  { heading: "How we'll measure it", body: "" },
];

/** The Growth Partnership's standard terms (lib/partnership.ts), ready to edit. */
const STARTER_TERMS: Draft["keyTerms"] = [
  { label: "Upfront", value: "£0" },
  { label: "Fee", value: "10% of each paid invoice" },
  { label: "Term", value: "6 months, then monthly" },
  { label: "Territory", value: "" },
];

export function ProposalEditor({ clientId, proposal }: { clientId: string; proposal?: Proposal }) {
  const [form, setForm] = useState<Draft>({
    id: proposal?.id ?? "",
    title: proposal?.title ?? "",
    summary: proposal?.summary ?? "",
    sections: proposal?.sections.length ? proposal.sections : STARTER,
    keyTerms: proposal?.keyTerms?.length ? proposal.keyTerms : STARTER_TERMS,
    price: proposal?.price ?? "",
    terms: proposal?.terms ?? "",
  });
  const [notice, setNotice] = useState("");
  const [pending, start] = useTransition();
  const setSection = (index: number, key: "heading" | "body", value: string) => setForm((current) => ({ ...current, sections: current.sections.map((s, i) => (i === index ? { ...s, [key]: value } : s)) }));
  const setTerm = (index: number, key: "label" | "value", value: string) => setForm((current) => ({ ...current, keyTerms: current.keyTerms.map((t, i) => (i === index ? { ...t, [key]: value } : t)) }));

  const save = (thenSend: boolean) =>
    start(async () => {
      setNotice("");
      const result = await saveProposal(clientId, {
        ...form,
        sections: form.sections.filter((s) => s.heading.trim() && s.body.trim()),
        keyTerms: form.keyTerms.filter((t) => t.label.trim() && t.value.trim()),
      });
      if (!result.ok) return setNotice(result.error);
      setForm((current) => ({ ...current, id: result.proposalId }));
      if (thenSend) {
        const sent = await sendProposal(clientId, result.proposalId);
        setNotice(sent.ok ? "Sent. The client gets an email and can approve it in the portal." : sent.error);
      } else setNotice("Draft saved. The client can't see it until you send it.");
    });

  return (
    <form onSubmit={(event) => event.preventDefault()} className="space-y-3">
      <input aria-label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={140} placeholder="Proposal title, e.g. Growth partnership for Croydon" className={cn(field, "font-semibold")} />
      <textarea aria-label="Summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={3} maxLength={1500} placeholder="Two or three sentences: what you propose and why." className={field} />

      <div className="rounded-[18px] bg-[#06301D]/60 p-3 sm:p-4">
        <Label>Key terms (shown as cards)</Label>
        <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
          {form.keyTerms.map((term, index) => (
            <div key={index} className="flex gap-2">
              <input aria-label={`Term ${index + 1} label`} value={term.label} onChange={(e) => setTerm(index, "label", e.target.value)} maxLength={40} placeholder="Label" className={cn(field, "w-28 shrink-0")} />
              <input aria-label={`Term ${index + 1} value`} value={term.value} onChange={(e) => setTerm(index, "value", e.target.value)} maxLength={120} placeholder="e.g. Plumbing · Croydon" className={field} />
            </div>
          ))}
        </div>
        {form.keyTerms.length < 8 ? (
          <button type="button" onClick={() => setForm({ ...form, keyTerms: [...form.keyTerms, { label: "", value: "" }] })} className={cn(secondaryButton, "mt-2.5 min-h-9")}>
            <Icon name="plus" size={15} />
            Add a term
          </button>
        ) : null}
      </div>

      {form.sections.map((section, index) => (
        <div key={index} className="space-y-2 rounded-[18px] bg-[#06301D]/60 p-3 sm:p-4">
          <div className="flex gap-2">
            <input aria-label={`Section ${index + 1} heading`} value={section.heading} onChange={(e) => setSection(index, "heading", e.target.value)} maxLength={120} className={cn(field, "font-semibold")} />
            <button type="button" aria-label={`Remove section ${index + 1}`} onClick={() => setForm({ ...form, sections: form.sections.filter((_, i) => i !== index) })} className={iconButton}>
              <Icon name="trash" size={16} />
            </button>
          </div>
          <textarea aria-label={`Section ${index + 1} text`} value={section.body} onChange={(e) => setSection(index, "body", e.target.value)} rows={4} maxLength={6000} placeholder="Plain words. Use - for lists." className={field} />
        </div>
      ))}
      <button type="button" onClick={() => setForm({ ...form, sections: [...form.sections, { heading: "", body: "" }] })} className={secondaryButton}>
        <Icon name="plus" size={15} />
        Add a section
      </button>
      <input aria-label="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} maxLength={300} placeholder="Price in plain words, e.g. £0 upfront, 10% of each paid invoice" className={field} />
      <textarea aria-label="Terms" value={form.terms} onChange={(e) => setForm({ ...form, terms: e.target.value })} rows={4} maxLength={4000} placeholder="Full terms: start, term, notice, territory…" className={field} />
      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={pending} onClick={() => save(false)} className={secondaryButton}>
          {pending ? "Saving…" : "Save draft"}
        </button>
        <button type="button" disabled={pending} onClick={() => save(true)} className={primaryButton}>
          <Icon name="send" size={16} />
          Save and send to the client
        </button>
      </div>
      <Notice text={notice} tone={notice.startsWith("Sent") || notice.startsWith("Draft") ? "good" : "neutral"} />
    </form>
  );
}

export function ProposalStatus({ proposal }: { proposal: Proposal }) {
  return <Chip on={proposal.status === "approved"} className={proposal.status === "sent" ? "!bg-[#BEF70A]/[0.14] !text-[#BEF70A]" : undefined}>{PROPOSAL_STATUS_LABEL[proposal.status]}</Chip>;
}

/** The proposal as the client reads it: header, key terms as cards, then the sections. */
export function ProposalView({ proposal, decision }: { proposal: Proposal; decision?: ReactNode }) {
  return (
    <article className={cn(card, "p-5 sm:p-8")}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <Label>Proposal{proposal.sentAt ? ` · sent ${day(proposal.sentAt)}` : ""}</Label>
          <h2 className="mt-2 text-[26px] leading-tight tracking-[-0.03em] text-white sm:text-[30px]">{proposal.title}</h2>
        </div>
        <ProposalStatus proposal={proposal} />
      </div>
      <p className="mt-3 max-w-[66ch] text-[15px] leading-relaxed text-white/75">{proposal.summary}</p>

      {proposal.keyTerms?.length ? (
        <div className="mt-6 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {proposal.keyTerms.map((term) => (
            <div key={term.label} className="rounded-[16px] bg-white/[0.06] px-4 py-3">
              <p className="text-xs text-white/50">{term.label}</p>
              <p className="mt-1 text-sm font-semibold text-white">{term.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      {decision ? <div className="mt-6">{decision}</div> : null}

      {proposal.decidedAt && proposal.decidedBy ? (
        <p role="status" className={cn("mt-6 flex items-start gap-2.5 rounded-[18px] p-4 text-sm text-white", proposal.status === "approved" ? "bg-[#BEF70A]/[0.08]" : "bg-white/[0.06]")}>
          <Icon name={proposal.status === "approved" ? "checkCircle" : "info"} size={18} className="text-[#BEF70A]" />
          <span>
            {proposal.status === "approved" ? "Approved" : "Declined"} by {proposal.decidedBy.name} ({proposal.decidedBy.email}) on {dayTime(proposal.decidedAt)}
            {proposal.declineReason ? `: ${proposal.declineReason}` : "."}
            {proposal.status === "approved" ? " Sameer will be in touch about next steps." : ""}
          </span>
        </p>
      ) : null}

      <div className="mt-8 space-y-6">
        {proposal.sections.map((section, index) => (
          <section key={index}>
            <h3 className="text-[18px] tracking-[-0.02em] text-white">{section.heading}</h3>
            <RichText text={section.body} allowExternal className="read mt-2 !text-[15px] !leading-relaxed" />
          </section>
        ))}
        {proposal.price ? (
          <div className="rounded-[18px] bg-[#BEF70A]/[0.07] px-5 py-4">
            <Label className="!text-[#BEF70A]">Price</Label>
            <p className="mt-1 text-base font-semibold text-white">{proposal.price}</p>
          </div>
        ) : null}
        {proposal.terms ? (
          <section>
            <h3 className="text-[18px] tracking-[-0.02em] text-white">Terms</h3>
            <RichText text={proposal.terms} className="read mt-2 !text-[15px] !leading-relaxed" />
          </section>
        ) : null}
      </div>
    </article>
  );
}

/** Approve or decline (097 A): two buttons; the chosen one asks for the owner's typed name. */
export function ProposalDecision({ proposalId }: { proposalId: string }) {
  const [choice, setChoice] = useState<"approved" | "declined" | null>(null);
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  const decide = () =>
    choice &&
    start(async () => {
      const outcome = await decideProposal(proposalId, choice, name, reason);
      setResult(outcome.ok ? { ok: true, text: choice === "approved" ? "Approved. Thank you, Sameer will be in touch about next steps." : "Declined. Sameer will see your reason." } : { ok: false, text: outcome.error });
    });

  if (result?.ok) {
    return (
      <p role="status" className="flex items-start gap-2.5 rounded-[18px] bg-[#BEF70A]/[0.08] p-4 text-sm text-white">
        <Icon name="checkCircle" size={18} className="text-[#BEF70A]" />
        {result.text}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setChoice("approved")} aria-pressed={choice === "approved"} className={cn(primaryButton, "h-12 pl-5 pr-2", choice === "declined" && "opacity-60")}>
          Approve
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F12] text-[#BEF70A]">
            <Icon name="arrowRight" size={15} />
          </span>
        </button>
        <button type="button" onClick={() => setChoice("declined")} aria-pressed={choice === "declined"} className={cn(secondaryButton, "h-12 px-6", choice === "declined" && "bg-white/[0.14]")}>
          Decline
        </button>
      </div>
      {choice ? (
        <div className="space-y-3 rounded-[18px] bg-white/[0.05] p-4">
          <label className="block text-sm font-semibold text-white">
            {choice === "approved" ? "Type your full name to approve" : "Type your full name"}
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} autoComplete="name" className={cn(field, "mt-1.5 font-normal")} />
          </label>
          {choice === "declined" ? (
            <label className="block text-sm font-semibold text-white">
              What would make it work for you? (optional)
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} maxLength={1000} className={cn(field, "mt-1.5 font-normal")} />
            </label>
          ) : null}
          <button type="button" disabled={pending || name.trim().length < 2} onClick={decide} className={primaryButton}>
            {pending ? "Saving…" : choice === "approved" ? "Confirm approval" : "Send my decision"}
          </button>
          <p className="text-xs text-white/45">Your name, email and the time are recorded. Approval is the go-ahead; the signed agreement follows.</p>
          {result && !result.ok ? (
            <p role="alert" className="text-sm text-[#ffb4a8]">
              {result.text}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
