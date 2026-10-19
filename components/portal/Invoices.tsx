"use client";

import Link from "next/link";
import { useState, useTransition, type DragEvent } from "react";
import { addPaymentProof, saveBilling, setInvoiceStatus } from "@/app/app/(dash)/portal-actions";
import { Icon } from "@/components/system/Icon";
import { Label } from "@/components/system/Page";
import { Notice, card, field, primaryButton, secondaryButton, textLink } from "@/components/system/ui";
import { money } from "@/lib/money";
import { INVOICE_STATUS_LABEL, type BillingSettings, type Invoice } from "@/lib/system/types";
import { cn, shortDate } from "@/lib/utils";
import { FileLink, useUploads } from "./ui";

/* Invoices (from Jadeed Marketing): drafted from paid jobs, sent by Sameer, paid by bank
   transfer. The client uploads the transfer screenshot; an admin checks the bank and marks it
   paid. Design Lab idea 095 B: the invoice beside a drop box for the screenshot. */

const monthName = (period: string) => (period ? new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${period}-01T00:00:00Z`)) : "");

function StatusPill({ invoice }: { invoice: Invoice }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
        invoice.status === "paid" ? "bg-[#BEF70A] text-[#0B1F12]" : invoice.status === "sent" ? "bg-[#BEF70A]/[0.14] text-[#BEF70A]" : "bg-white/[0.07] text-white/60"
      )}
    >
      {INVOICE_STATUS_LABEL[invoice.status]}
    </span>
  );
}

/** The dashed lime drop box: drop or tap to choose the payment screenshot, then send it. */
function ProofDrop({ invoice }: { invoice: Invoice }) {
  const uploads = useUploads("payment", invoice.clientId);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [over, setOver] = useState(false);
  const [pending, start] = useTransition();
  const file = uploads.files[0];

  const sendProof = () =>
    file &&
    start(async () => {
      setError("");
      const result = await addPaymentProof(invoice.id, file);
      if (result.ok) {
        uploads.clear();
        setDone(true);
      } else setError(result.error);
    });

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setOver(false);
    void uploads.upload(event.dataTransfer.files);
  };

  if (done) {
    return (
      <div role="status" className="flex h-full min-h-48 flex-col items-center justify-center rounded-[22px] border-[1.5px] border-dashed border-[#BEF70A]/45 bg-[#BEF70A]/[0.05] p-6 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
          <Icon name="check" size={20} />
        </span>
        <p className="mt-3 font-display text-lg font-extrabold text-white">Thank you.</p>
        <p className="mt-1 text-sm text-white/65">We&apos;ll check the bank and mark it paid.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {uploads.picker}
      {file ? (
        <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-[22px] border-[1.5px] border-dashed border-[#BEF70A]/45 bg-[#BEF70A]/[0.05] p-6 text-center">
          <Icon name="document" size={30} className="text-[#BEF70A]" />
          <p className="mt-2 max-w-full truncate text-sm font-semibold text-white">{file.name}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button type="button" disabled={pending} onClick={sendProof} className={primaryButton}>
              {pending ? "Sending…" : "Send the screenshot"}
            </button>
            <button type="button" onClick={uploads.clear} className={secondaryButton}>
              Choose another
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={uploads.open}
          disabled={uploads.busy}
          onDragOver={(event) => {
            event.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={onDrop}
          className={cn(
            "flex h-full min-h-48 w-full flex-col items-center justify-center rounded-[22px] border-[1.5px] border-dashed p-6 text-center transition-colors",
            over ? "border-[#BEF70A] bg-[#BEF70A]/[0.1]" : "border-[#BEF70A]/45 bg-[#BEF70A]/[0.04] hover:bg-[#BEF70A]/[0.07]"
          )}
        >
          <Icon name="upload" size={32} className="text-[#BEF70A]" />
          {/* Phones tap; bigger screens can also drag the file in. */}
          <span className="mt-3 font-display text-lg font-extrabold text-white">
            {uploads.busy ? (
              "Uploading…"
            ) : (
              <>
                <span className="sm:hidden">Upload your payment screenshot</span>
                <span className="hidden sm:inline">Drop your payment screenshot</span>
              </>
            )}
          </span>
          <span className="mt-1 text-sm text-white/55">
            <span className="sm:hidden">Tap to choose a photo or PDF</span>
            <span className="hidden sm:inline">or click to choose a file</span>
          </span>
        </button>
      )}
      {uploads.error || error ? (
        <p role="alert" className="mt-2 text-sm text-[#ffb4a8]">
          {uploads.error || error}
        </p>
      ) : null}
    </div>
  );
}

function AdminActions({ invoice }: { invoice: Invoice }) {
  const [notice, setNotice] = useState("");
  const [pending, start] = useTransition();
  const run = (status: "sent" | "paid" | "void") =>
    start(async () => {
      setNotice("");
      const result = await setInvoiceStatus(invoice.id, status);
      if (!result.ok) setNotice(result.error);
    });
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {invoice.status === "draft" ? (
          <button type="button" disabled={pending} onClick={() => run("sent")} className={primaryButton}>
            <Icon name="send" size={16} />
            Send to the client
          </button>
        ) : null}
        {invoice.status === "sent" ? (
          <button type="button" disabled={pending} onClick={() => run("paid")} className={primaryButton}>
            <Icon name="check" size={16} />
            Mark paid
          </button>
        ) : null}
        {invoice.status === "draft" || invoice.status === "sent" ? (
          <button type="button" disabled={pending} onClick={() => run("void")} className={secondaryButton}>
            Void
          </button>
        ) : null}
      </div>
      <Notice text={notice} />
    </div>
  );
}

/** One invoice as a card: number, status, the big amount, each paid job's fee. */
function InvoiceCard({ invoice, side, isAdmin, base, showClient }: { invoice: Invoice; side: "team" | "client"; isAdmin: boolean; base: string; showClient: boolean }) {
  const base100 = invoice.lines.reduce((sum, line) => sum + (line.baseCents ?? 0), 0);
  const pct = invoice.lines[0]?.feePercent;
  return (
    <div className={cn(card, "p-5 sm:p-6")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label>Invoice {invoice.number}</Label>
        <StatusPill invoice={invoice} />
      </div>
      {showClient ? (
        <Link href={`${base}/clients/${invoice.clientId}?tab=invoices`} className={cn(textLink, "mt-2 inline-block text-sm")}>
          {invoice.clientName}
        </Link>
      ) : null}
      <p className="mt-3 font-display text-[44px] font-extrabold leading-none tracking-[-0.05em] tabular-nums text-white">{money(invoice.totalCents, invoice.currency)}</p>
      <p className="mt-2 text-sm text-white/55">
        {pct !== undefined ? `${pct}% of ${money(base100, invoice.currency)} in paid jobs` : "Fees on paid jobs"} · {monthName(invoice.period)}
      </p>
      <div className="my-4 border-t-[1.5px] border-dashed border-white/[0.12]" />
      <ul className="space-y-1.5">
        {invoice.lines.map((line, index) => (
          <li key={line.resultId ?? index} className="flex justify-between gap-4 text-sm">
            <span className="min-w-0 text-white/60">{line.description}</span>
            <b className="shrink-0 tabular-nums text-white">{money(line.amountCents, invoice.currency)}</b>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-white/45">
        {[invoice.issuedOn ? `Issued ${shortDate(invoice.issuedOn)}` : "Not sent yet", invoice.dueOn && invoice.status === "sent" ? `due ${shortDate(invoice.dueOn)}` : null, invoice.paidOn ? `paid ${shortDate(invoice.paidOn)}` : null]
          .filter(Boolean)
          .join(" · ")}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a href={`/api/invoices/${invoice.id}/pdf`} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
          <Icon name="receipt" size={16} />
          PDF with bank details
        </a>
        {invoice.proofs?.length ? (
          <>
            <span className="text-xs font-semibold text-white/50">Payment proof:</span>
            {invoice.proofs.map((proof) => (
              <FileLink key={proof.id} file={proof} />
            ))}
          </>
        ) : null}
      </div>
      {side === "team" && isAdmin ? <AdminActions invoice={invoice} /> : null}
    </div>
  );
}

export function InvoiceList({ invoices, side, isAdmin, base, showClient = false }: { invoices: Invoice[]; side: "team" | "client"; isAdmin: boolean; base: string; showClient?: boolean }) {
  if (!invoices.length) return <p className="text-sm text-white/55">No invoices yet. They&apos;re made from paid jobs in the shared record.</p>;
  return (
    <ul className="space-y-4">
      {invoices.map((invoice) => (
        <li key={invoice.id} className={cn(side === "client" && invoice.status === "sent" && "grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]")}>
          <InvoiceCard invoice={invoice} side={side} isAdmin={isAdmin} base={base} showClient={showClient} />
          {side === "client" && invoice.status === "sent" ? <ProofDrop invoice={invoice} /> : null}
        </li>
      ))}
    </ul>
  );
}

export function BillingForm({ billing }: { billing: BillingSettings | null }) {
  const [form, setForm] = useState({
    accountTitle: billing?.accountTitle ?? "",
    bankName: billing?.bankName ?? "",
    iban: billing?.iban ?? "",
    accountNumber: billing?.accountNumber ?? "",
    swift: billing?.swift ?? "",
    branch: billing?.branch ?? "",
    notes: billing?.notes ?? "",
    registration: billing?.registration ?? "",
    paymentTermsDays: String(billing?.paymentTermsDays ?? 14),
  });
  const [notice, setNotice] = useState("");
  const [pending, start] = useTransition();
  const input = (key: keyof typeof form, label: string, placeholder = "") => (
    <label className="block text-sm font-semibold text-white">
      {label}
      <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className={cn(field, "mt-1.5 font-normal")} />
    </label>
  );
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await saveBilling({ ...form, paymentTermsDays: Number(form.paymentTermsDays) || 14 });
          setNotice(result.ok ? "Saved. New invoices show these details." : result.error);
        });
      }}
      className="space-y-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {input("accountTitle", "Account title")}
        {input("bankName", "Bank")}
        {input("iban", "IBAN")}
        {input("accountNumber", "Account number (optional)")}
        {input("swift", "SWIFT / BIC (optional)")}
        {input("branch", "Branch (optional)")}
        {input("paymentTermsDays", "Days to pay", "14")}
        {input("registration", "Registration line on invoices (optional)")}
      </div>
      <label className="block text-sm font-semibold text-white">
        Note on invoices (optional)
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} maxLength={600} placeholder="e.g. International transfers: please cover the sending bank's fee." className={cn(field, "mt-1.5 font-normal")} />
      </label>
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "Saving…" : "Save bank details"}
      </button>
      <Notice text={notice} tone={notice.startsWith("Saved") ? "good" : "neutral"} />
    </form>
  );
}
