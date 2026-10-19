"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/system/Icon";
import { secondaryButton } from "@/components/system/ui";
import type { FileRef } from "@/lib/system/types";
import { cn } from "@/lib/utils";

/* Shared pieces for the client portal and the team's client workspace (from Jadeed
   Marketing's components/portal/ui.tsx). */

export const fileSize = (bytes: number) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

/** A link that opens a stored file through the access-checked /api/files route. */
export function FileLink({ file, className }: { file: FileRef; className?: string }) {
  return (
    <a
      href={`/api/files/${file.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#06301D]/60 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#06301D]", className)}
    >
      <Icon name={file.type.startsWith("image/") ? "eye" : "document"} size={14} className="text-[#BEF70A]" />
      <span className="truncate">{file.name}</span>
      <span className="shrink-0 font-normal text-white/50">{fileSize(file.size)}</span>
    </a>
  );
}

/** Upload state for a form: pick files, they upload straight away, and the refs come back. */
export function useUploads(purpose: "message" | "update" | "payment" | "proposal", clientId?: string) {
  const [files, setFiles] = useState<FileRef[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const upload = async (list: FileList | File[] | null) => {
    if (!list || !list.length) return;
    setBusy(true);
    setError("");
    for (const file of Array.from(list).slice(0, 10)) {
      const body = new FormData();
      body.set("file", file);
      body.set("purpose", purpose);
      if (clientId) body.set("clientId", clientId);
      try {
        const response = await fetch("/api/files", { method: "POST", body });
        const json = (await response.json()) as { file?: FileRef; error?: string };
        if (!response.ok || !json.file) setError(json.error ?? "That file couldn't be uploaded.");
        else setFiles((current) => [...current, json.file!]);
      } catch {
        setError("The upload failed. Check your connection and try again.");
      }
    }
    setBusy(false);
    if (input.current) input.current.value = "";
  };

  const picker = (
    <input
      ref={input}
      type="file"
      multiple={purpose !== "payment"}
      accept={purpose === "payment" ? "image/*,application/pdf" : "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt"}
      className="sr-only"
      tabIndex={-1}
      onChange={(event) => void upload(event.target.files)}
    />
  );

  return {
    files,
    busy,
    error,
    upload,
    clear: () => setFiles([]),
    remove: (id: string) => setFiles((current) => current.filter((file) => file.id !== id)),
    open: () => input.current?.click(),
    picker,
  };
}

/** The "Attach" button plus chips for what's attached. */
export function Attachments({ uploads, label = "Attach a file" }: { uploads: ReturnType<typeof useUploads>; label?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {uploads.picker}
      <button type="button" onClick={uploads.open} disabled={uploads.busy} className={secondaryButton}>
        <Icon name="attach" size={16} />
        {uploads.busy ? "Uploading…" : label}
      </button>
      {uploads.files.map((file) => (
        <span key={file.id} className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-1.5 text-xs text-white">
          <span className="truncate">{file.name}</span>
          <button type="button" aria-label={`Remove ${file.name}`} onClick={() => uploads.remove(file.id)} className="text-white/55 hover:text-white">
            <Icon name="x" size={14} />
          </button>
        </span>
      ))}
      {uploads.error ? (
        <p role="alert" className="basis-full text-sm text-[#ffb4a8]">
          {uploads.error}
        </p>
      ) : null}
    </div>
  );
}
