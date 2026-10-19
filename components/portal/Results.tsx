"use client";

import { useMemo, useState, useTransition } from "react";
import { deleteResult, saveResult } from "@/app/app/(dash)/portal-actions";
import { Icon } from "@/components/system/Icon";
import { Kpi } from "@/components/system/Page";
import { ErrorText, Select, card, field, iconButton, primaryButton, secondaryButton } from "@/components/system/ui";
import { currencySymbol, money } from "@/lib/money";
import { RESULT_STATUS_LABEL, type ResultEntry, type ResultStatus } from "@/lib/system/types";
import { cn, pkToday, shortDate } from "@/lib/utils";

/* The shared record of customers Jadeed brought in (from Jadeed Marketing): lead → contacted
   → booked → quoted → completed → paid. Both sides add and update it; a fee is worked out
   only when a job is paid. This is the "trust" reporting from the partnership terms: no bank
   statements, just this record. Design Lab idea 094 A: a table with status filters. */

const STATUSES = Object.keys(RESULT_STATUS_LABEL) as ResultStatus[];
const CHANNELS = ["Website form", "Phone call", "Google Business Profile", "Jadeed AI chat", "Text or WhatsApp", "Other"];
const asAmount = (cents?: number) => (cents === undefined ? "" : String(cents / 100));

type Draft = { id: string; customer: string; service: string; channel: string; firstContact: string; status: ResultStatus; jobValue: string; paid: string; paidOn: string; notes: string };

const blank = (): Draft => ({ id: "", customer: "", service: "", channel: "Website form", firstContact: pkToday(), status: "lead", jobValue: "", paid: "", paidOn: "", notes: "" });

export function ResultStatusPill({ status }: { status: ResultStatus }) {
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold",
        status === "paid" ? "bg-[#BEF70A] text-[#0B1F12]" : status === "lost" ? "bg-white/[0.05] text-white/45" : status === "completed" ? "bg-[#BEF70A]/[0.14] text-[#BEF70A]" : "bg-white/[0.08] text-white/80"
      )}
    >
      {RESULT_STATUS_LABEL[status]}
    </span>
  );
}

function ResultForm({ draft, onDone, clientId, feePercent, canSeeMoney, currency }: { draft: Draft; onDone: () => void; clientId?: string; feePercent: number; canSeeMoney: boolean; currency: string }) {
  const [form, setForm] = useState(draft);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setForm((current) => ({ ...current, [key]: value }));
  const fee = form.status === "paid" && Number(form.paid) > 0 ? money(Math.round(Number(form.paid) * feePercent), currency) : null;
  const symbol = currencySymbol(currency);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setError("");
        start(async () => {
          const result = await saveResult(clientId, { ...form, paidOn: form.status === "paid" ? form.paidOn : "" });
          if (result.ok) onDone();
          else setError(result.error);
        });
      }}
      className="space-y-3 rounded-[18px] bg-[#06301D]/60 p-4 sm:p-5"
    >
      <p className="font-display text-base font-extrabold text-white">{form.id ? `Update ${draft.customer}` : "Add a customer"}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-white">
          Customer (name or your reference)
          <input value={form.customer} onChange={(e) => set("customer", e.target.value)} maxLength={120} className={cn(field, "mt-1.5 font-normal")} />
        </label>
        <label className="block text-sm font-semibold text-white">
          Service
          <input value={form.service} onChange={(e) => set("service", e.target.value)} maxLength={120} placeholder="e.g. Boiler repair" className={cn(field, "mt-1.5 font-normal")} />
        </label>
        <Select label="How they came in" value={form.channel} options={CHANNELS.map((c) => ({ value: c, label: c }))} onChange={(v) => set("channel", v)} />
        <label className="block text-sm font-semibold text-white">
          First contact
          <input type="date" value={form.firstContact} max={pkToday()} onChange={(e) => set("firstContact", e.target.value)} className={cn(field, "mt-1.5 font-normal [color-scheme:dark]")} />
        </label>
        <Select label="Where it stands" value={form.status} options={STATUSES.map((s) => ({ value: s, label: RESULT_STATUS_LABEL[s] }))} onChange={(v) => set("status", v)} />
        <label className="block text-sm font-semibold text-white">
          Job value (estimate, {symbol})
          <input inputMode="decimal" value={form.jobValue} onChange={(e) => set("jobValue", e.target.value)} placeholder="e.g. 900" className={cn(field, "mt-1.5 font-normal")} />
        </label>
        {form.status === "paid" ? (
          <>
            <label className="block text-sm font-semibold text-white">
              Amount the customer paid ({symbol})
              <input inputMode="decimal" value={form.paid} onChange={(e) => set("paid", e.target.value)} placeholder="e.g. 850" className={cn(field, "mt-1.5 font-normal")} />
            </label>
            <label className="block text-sm font-semibold text-white">
              Paid on
              <input type="date" value={form.paidOn} max={pkToday()} onChange={(e) => set("paidOn", e.target.value)} className={cn(field, "mt-1.5 font-normal [color-scheme:dark]")} />
            </label>
          </>
        ) : null}
      </div>
      <label className="block text-sm font-semibold text-white">
        Notes
        <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2} maxLength={1000} className={cn(field, "mt-1.5 font-normal")} />
      </label>
      {fee && canSeeMoney ? (
        <p className="text-sm text-white/85">
          Fee on this job: <strong className="text-[#BEF70A]">{fee}</strong> ({feePercent}% of the amount paid). It goes on the next invoice.
        </p>
      ) : null}
      <ErrorText error={error} />
      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={pending} className={primaryButton}>
          {pending ? "Saving…" : form.id ? "Save changes" : "Add customer"}
        </button>
        <button type="button" onClick={onDone} className={secondaryButton}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export function ResultsRecord({
  results,
  clientId,
  feePercent,
  canSeeMoney,
  isAdmin = false,
  currency = "GBP",
}: {
  results: ResultEntry[];
  clientId?: string;
  feePercent: number;
  canSeeMoney: boolean;
  isAdmin?: boolean;
  currency?: string;
}) {
  const [editing, setEditing] = useState<Draft | null>(null);
  const [filter, setFilter] = useState<ResultStatus | "">("");
  const [, start] = useTransition();
  const shown = useMemo(() => (filter ? results.filter((r) => r.status === filter) : results), [results, filter]);
  const counts = (status: ResultStatus) => results.filter((r) => r.status === status).length;
  const paid = results.filter((r) => r.status === "paid");
  const used = STATUSES.filter((s) => counts(s) > 0);
  const paidShown = shown.filter((r) => r.status === "paid").reduce((s, r) => s + (r.paidCents ?? 0), 0);

  const edit = (r: ResultEntry) =>
    setEditing({
      id: r.id,
      customer: r.customer,
      service: r.service ?? "",
      channel: r.channel ?? "Other",
      firstContact: r.firstContact,
      status: r.status,
      jobValue: asAmount(r.jobValueCents),
      paid: asAmount(r.paidCents),
      paidOn: r.paidOn ?? "",
      notes: r.notes ?? "",
    });

  return (
    <div className="space-y-4">
      <div className={cn("grid grid-cols-2 gap-3", canSeeMoney ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
        <Kpi label="Customers brought in" value={results.length} icon="people" />
        <Kpi label="Paid jobs" value={paid.length} icon="checkCircle" />
        <Kpi label="Paid by customers" value={money(paid.reduce((s, r) => s + (r.paidCents ?? 0), 0), currency)} icon="money" lime />
        {canSeeMoney ? <Kpi label="Fees on paid jobs" value={money(paid.reduce((s, r) => s + (r.feeCents ?? 0), 0), currency)} icon="receipt" note={`${feePercent}% of paid jobs only`} /> : null}
      </div>

      <section className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3.5 sm:px-5">
          <h2 className="text-[15px] text-white">Customers brought in</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-1.5">
              {(["", ...used] as (ResultStatus | "")[]).map((status) => (
                <button
                  key={status || "all"}
                  type="button"
                  aria-pressed={filter === status}
                  onClick={() => setFilter(status)}
                  className={cn("min-h-9 rounded-full px-3 text-xs font-semibold transition-colors sm:min-h-8", filter === status ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.07] text-white/75 hover:bg-white/[0.11]")}
                >
                  {status ? RESULT_STATUS_LABEL[status] : "All"} <span className="opacity-60">{status ? counts(status) : results.length}</span>
                </button>
              ))}
            </div>
            {!editing ? (
              <button type="button" onClick={() => setEditing(blank())} className={cn(primaryButton, "min-h-9")}>
                <Icon name="plus" size={16} />
                Add customer
              </button>
            ) : null}
          </div>
        </div>

        {editing && !editing.id ? (
          <div className="p-4 sm:p-5">
            <ResultForm draft={editing} clientId={clientId} feePercent={feePercent} canSeeMoney={canSeeMoney} currency={currency} onDone={() => setEditing(null)} />
          </div>
        ) : null}

        {shown.length ? (
          <>
          {/* Phones: one card per customer, nothing to scroll sideways. */}
          <ul className="divide-y divide-white/[0.06] sm:hidden">
            {shown.map((r) =>
              editing?.id === r.id ? (
                <li key={r.id} className="p-3">
                  <ResultForm draft={editing} clientId={clientId} feePercent={feePercent} canSeeMoney={canSeeMoney} currency={currency} onDone={() => setEditing(null)} />
                </li>
              ) : (
                <li key={r.id} className="px-4 py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{r.customer}</p>
                      <p className="text-xs text-white/55">{[r.service, r.channel].filter(Boolean).join(" · ") || "—"}</p>
                      <p className="text-xs text-white/40">
                        First contact {shortDate(r.firstContact)}
                        {r.invoiceId ? " · on an invoice" : ""}
                      </p>
                    </div>
                    <ResultStatusPill status={r.status} />
                  </div>
                  {r.notes ? <p className="mt-1.5 text-xs text-white/55">{r.notes}</p> : null}
                  <div className="mt-2.5 flex items-center justify-between gap-3">
                    <div className="tabular-nums">
                      {r.status === "paid" ? (
                        <p className="text-sm">
                          <b className="font-semibold text-white">{money(r.paidCents, currency)}</b>
                          {canSeeMoney ? <span className="text-xs text-white/45"> · fee {money(r.feeCents, currency)}</span> : null}
                        </p>
                      ) : r.jobValueCents ? (
                        <p className="text-xs text-white/45">est. {money(r.jobValueCents, currency)}</p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {!r.invoiceId || isAdmin ? (
                        <button type="button" onClick={() => edit(r)} className={cn(secondaryButton, "min-h-9 px-3.5 text-xs")}>
                          Update
                        </button>
                      ) : null}
                      {isAdmin && !r.invoiceId && clientId ? (
                        <button type="button" aria-label={`Delete ${r.customer}`} onClick={() => start(async () => void (await deleteResult(clientId, r.id)))} className={iconButton}>
                          <Icon name="trash" size={16} />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
          {/* Wider screens: the table (Design Lab idea 094 A). */}
          <div className="hidden overflow-x-auto px-1 custom-scrollbar sm:block sm:px-2">
            <table className="jt min-w-[640px]">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>How they came in</th>
                  <th>Where it stands</th>
                  <th className="text-right">Paid</th>
                  <th>
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {shown.map((r) =>
                  editing?.id === r.id ? (
                    <tr key={r.id}>
                      <td colSpan={5} className="!p-3">
                        <ResultForm draft={editing} clientId={clientId} feePercent={feePercent} canSeeMoney={canSeeMoney} currency={currency} onDone={() => setEditing(null)} />
                      </td>
                    </tr>
                  ) : (
                    <tr key={r.id}>
                      <td>
                        <span className="block !text-white">{r.customer}</span>
                        <span className="block text-xs font-normal text-white/45">
                          {[r.service, `first contact ${shortDate(r.firstContact)}`].filter(Boolean).join(" · ")}
                          {r.invoiceId ? " · on an invoice" : ""}
                        </span>
                        {r.notes ? <span className="mt-0.5 block text-xs font-normal text-white/55">{r.notes}</span> : null}
                      </td>
                      <td>{r.channel ?? "—"}</td>
                      <td>
                        <ResultStatusPill status={r.status} />
                      </td>
                      <td className="text-right tabular-nums">
                        {r.status === "paid" ? (
                          <>
                            <span className="block font-semibold text-white">{money(r.paidCents, currency)}</span>
                            {canSeeMoney ? <span className="block text-xs text-white/45">fee {money(r.feeCents, currency)}</span> : null}
                          </>
                        ) : r.jobValueCents ? (
                          <span className="text-xs text-white/45">est. {money(r.jobValueCents, currency)}</span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="whitespace-nowrap text-right">
                        {!r.invoiceId || isAdmin ? (
                          <button type="button" onClick={() => edit(r)} className={cn(secondaryButton, "min-h-8 px-3 text-xs")}>
                            Update
                          </button>
                        ) : null}
                        {isAdmin && !r.invoiceId && clientId ? (
                          <button type="button" aria-label={`Delete ${r.customer}`} onClick={() => start(async () => void (await deleteResult(clientId, r.id)))} className={cn(iconButton, "ml-1 inline-flex")}>
                            <Icon name="trash" size={16} />
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          </>
        ) : (
          <p className="p-8 text-center text-sm text-white/55">{results.length ? "Nothing with this status." : "No customers recorded yet. Add each new customer Jadeed brings in, then update them as the job moves on."}</p>
        )}
        {shown.length && paidShown ? (
          <p className="border-t border-white/[0.08] px-4 py-3 text-xs text-white/55 sm:px-5">
            Paid by customers{filter ? ` (${RESULT_STATUS_LABEL[filter].toLowerCase()})` : ""}: <b className="text-[#BEF70A]">{money(paidShown, currency)}</b>
          </p>
        ) : null}
      </section>
    </div>
  );
}
