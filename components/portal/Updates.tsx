"use client";

import { useState, useTransition } from "react";
import { postUpdate } from "@/app/app/(dash)/portal-actions";
import { Icon } from "@/components/system/Icon";
import { Label } from "@/components/system/Page";
import { Chip, Notice, RichText, Select, card, field, primaryButton } from "@/components/system/ui";
import type { WorkUpdate } from "@/lib/system/types";
import { cn } from "@/lib/utils";
import { Attachments, FileLink, useUploads } from "./ui";

/* Work updates and reports (from Jadeed Marketing): written by the team, never by AI, read by
   the client in "Updates". Design Lab idea 098 B: every update in three plain parts — what we
   did, why, what's next — so an owner understands it in twenty seconds. */

const AREAS = ["SEO", "Website", "Google Business Profile", "Ads", "Reviews", "App", "Reporting", "Other"];
const day = (iso: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

export function UpdateComposer({ clientId }: { clientId: string }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [why, setWhy] = useState("");
  const [next, setNext] = useState("");
  const [area, setArea] = useState("SEO");
  const [kind, setKind] = useState<"update" | "report">("update");
  const [notice, setNotice] = useState("");
  const [pending, start] = useTransition();
  const uploads = useUploads("update", clientId);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setNotice("");
        start(async () => {
          const result = await postUpdate(clientId, { title, body, why, next, area, kind, attachments: uploads.files });
          if (result.ok) {
            setTitle("");
            setBody("");
            setWhy("");
            setNext("");
            uploads.clear();
            setNotice("Posted. The client gets an email.");
          } else setNotice(result.error);
        });
      }}
      className="space-y-3"
    >
      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Type" className="flex gap-1.5">
          {(["update", "report"] as const).map((value) => (
            <button key={value} type="button" aria-pressed={kind === value} onClick={() => setKind(value)} className={cn("min-h-9 rounded-full px-3.5 text-sm font-semibold transition-colors", kind === value ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.07] text-white/75 hover:bg-white/[0.11]")}>
              {value === "update" ? "Work update" : "Monthly report"}
            </button>
          ))}
        </div>
        <Select label="Area" hideLabel value={area} options={AREAS.map((a) => ({ value: a, label: a }))} onChange={setArea} className="w-52" />
      </div>
      <label className="sr-only" htmlFor="update-title">
        Title
      </label>
      <input id="update-title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={140} placeholder="e.g. Two new area pages are live" className={cn(field, "font-semibold")} />
      <div className="grid gap-3 lg:grid-cols-3">
        <label className="block text-sm font-semibold text-[#BEF70A]">
          What we did
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} maxLength={8000} placeholder="Built pages for Bromley and Sutton." className={cn(field, "mt-1.5 font-normal")} />
        </label>
        <label className="block text-sm font-semibold text-[#BEF70A]">
          Why
          <textarea value={why} onChange={(e) => setWhy(e.target.value)} rows={4} maxLength={2000} placeholder="People search by area, and you had no page for either." className={cn(field, "mt-1.5 font-normal")} />
        </label>
        <label className="block text-sm font-semibold text-[#BEF70A]">
          What&apos;s next
          <textarea value={next} onChange={(e) => setNext(e.target.value)} rows={4} maxLength={2000} placeholder="Add photos from local jobs there." className={cn(field, "mt-1.5 font-normal")} />
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Attachments uploads={uploads} />
        <button type="submit" disabled={pending || uploads.busy || title.trim().length < 3 || body.trim().length < 10} className={primaryButton}>
          <Icon name="send" size={16} />
          {pending ? "Posting…" : "Post to the client"}
        </button>
      </div>
      <p className="text-xs text-white/45">Plain words, no jargon. Written by you — Jadeed AI never writes client updates.</p>
      <Notice text={notice} tone={notice.startsWith("Posted") ? "good" : "neutral"} />
    </form>
  );
}

function Parts({ update, large = false }: { update: WorkUpdate; large?: boolean }) {
  const parts = [
    ["What we did", update.body],
    ["Why", update.why],
    ["What's next", update.next],
  ].filter((part): part is [string, string] => Boolean(part[1]));
  return (
    <div className={cn("grid gap-4", parts.length > 1 && "sm:grid-cols-2 lg:grid-cols-3")}>
      {parts.map(([heading, text]) => (
        <div key={heading} className="min-w-0">
          <p className="text-xs font-bold text-[#BEF70A]">{heading}</p>
          <RichText text={text} allowExternal className={cn("mt-1.5 leading-relaxed text-white/85", large ? "text-[15px]" : "text-sm")} />
        </div>
      ))}
    </div>
  );
}

/** The newest update as a large card (098 B); earlier ones as a list that opens in place. */
export function UpdateList({ updates, empty }: { updates: WorkUpdate[]; empty: string }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!updates.length) return <p className={cn(card, "p-8 text-center text-sm text-white/55")}>{empty}</p>;
  const [latest, ...earlier] = updates;
  return (
    <div className="space-y-4">
      <article className={cn(card, "p-5 sm:p-7")}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Chip on>New</Chip>
            {latest.area ? <Chip>{latest.area}</Chip> : null}
            {latest.kind === "report" ? <Chip>Monthly report</Chip> : null}
          </div>
          <span className="text-xs text-white/45">
            {day(latest.createdAt)}
            {latest.createdByName ? ` · ${latest.createdByName}` : ""}
          </span>
        </div>
        <h2 className="mt-4 text-[24px] leading-tight tracking-[-0.03em] text-white sm:text-[28px]">{latest.title}</h2>
        <div className="mt-5">
          <Parts update={latest} large />
        </div>
        {latest.attachments?.length ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {latest.attachments.map((file) => (
              <FileLink key={file.id} file={file} />
            ))}
          </div>
        ) : null}
      </article>

      {earlier.length ? (
        <section className={card}>
          <Label className="px-5 pt-4">Earlier updates</Label>
          <ul className="mt-1 divide-y divide-white/[0.06]">
            {earlier.map((update) => {
              const isOpen = open === update.id;
              return (
                <li key={update.id}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : update.id)} className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-white/[0.03]">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-white">{update.title}</span>
                      <span className="block text-xs text-white/45">{[update.area, update.kind === "report" ? "Monthly report" : null, update.createdByName].filter(Boolean).join(" · ")}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2 text-xs text-white/45">
                      {day(update.createdAt)}
                      <Icon name="chevronDown" size={15} className={cn("transition-transform", isOpen && "rotate-180")} />
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="px-5 pb-5">
                      <Parts update={update} />
                      {update.attachments?.length ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {update.attachments.map((file) => (
                            <FileLink key={file.id} file={file} />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
