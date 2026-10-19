"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createClient, draftInvoice, inviteClientStaff, removeClientUser, updateClient } from "@/app/app/(dash)/portal-actions";
import { Icon } from "@/components/system/Icon";
import { Notice, Select, card, field, primaryButton, secondaryButton } from "@/components/system/ui";
import { CLIENT_STATUS_LABEL, CURRENCIES, ROLE_LABEL, type Client, type ClientStatus, type Currency, type Role } from "@/lib/system/types";
import { cn } from "@/lib/utils";

/* The team's client tools (from Jadeed Marketing): add a client (usually from a won lead),
   client settings, the people with a portal login, and drafting an invoice. */

export type ClientPrefill = Partial<{ businessName: string; contactName: string; ownerEmail: string; phone: string; trade: string; city: string; country: string; website: string; leadId: string }>;

export function NewClientForm({ base, prefill, isAdmin }: { base: string; prefill?: ClientPrefill; isAdmin: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState({
    businessName: prefill?.businessName ?? "",
    contactName: prefill?.contactName ?? "",
    ownerEmail: prefill?.ownerEmail ?? "",
    phone: prefill?.phone ?? "",
    trade: prefill?.trade ?? "",
    city: prefill?.city ?? "",
    state: "",
    country: prefill?.country || "United Kingdom",
    website: prefill?.website ?? "",
    territory: "",
    feePercent: "10",
    currency: "GBP" as Currency,
    leadId: prefill?.leadId ?? "",
  });
  const [notice, setNotice] = useState("");
  const [pending, start] = useTransition();
  const input = (key: keyof typeof form, label: string, placeholder = "", disabled = false) => (
    <label className="block text-sm font-semibold text-white">
      {label}
      <input value={form[key]} disabled={disabled} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className={cn(field, "mt-1.5 font-normal disabled:opacity-50")} />
    </label>
  );
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setNotice("");
        start(async () => {
          const result = await createClient({ ...form, feePercent: Number(form.feePercent) });
          if (result.ok) router.push(`${base}/clients/${result.clientId}`);
          else setNotice(result.error);
        });
      }}
      className="space-y-3"
    >
      {form.leadId ? <p className="text-sm text-white/60">Filled in from the lead. It moves to Won when you save.</p> : null}
      <div className="grid gap-3 sm:grid-cols-2">
        {input("businessName", "Business name")}
        {input("contactName", "Owner's name")}
        {input("ownerEmail", "Owner's email (their portal login)")}
        {input("phone", "Phone (optional)")}
        {input("trade", "Trade", "e.g. Plumbing")}
        {input("website", "Website (optional)")}
        {input("city", "City")}
        {input("state", "County, state or region (optional)")}
        {input("country", "Country")}
        {input("territory", "Territory (trade · area)", "e.g. Plumbing · Croydon")}
        {input("feePercent", "Fee % of each paid invoice", "10", !isAdmin)}
        <Select label="Currency" value={form.currency} options={CURRENCIES.map((c) => ({ value: c, label: c }))} onChange={(currency) => setForm({ ...form, currency })} />
      </div>
      <button type="submit" disabled={pending} className={primaryButton}>
        <Icon name="briefcase" size={16} />
        {pending ? "Adding…" : "Add client and invite the owner"}
      </button>
      <p className="text-xs text-white/45">The owner gets an email, signs in with this address and lands in their portal.</p>
      <Notice text={notice} />
    </form>
  );
}

export function ClientSettings({ client, isAdmin }: { client: Client; isAdmin: boolean }) {
  const [status, setStatus] = useState<ClientStatus>(client.status);
  const [fee, setFee] = useState(String(client.feePercent));
  const [territory, setTerritory] = useState(client.territory ?? "");
  const [notes, setNotes] = useState(client.notes ?? "");
  const [notice, setNotice] = useState("");
  const [pending, start] = useTransition();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await updateClient(client.id, { status, notes, territory, ...(isAdmin ? { feePercent: Number(fee) } : {}) });
          setNotice(result.ok ? "Saved." : result.error);
        });
      }}
      className="space-y-3"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Select label="Status" value={status} options={(Object.keys(CLIENT_STATUS_LABEL) as ClientStatus[]).filter((s) => isAdmin || s !== "ended").map((s) => ({ value: s, label: CLIENT_STATUS_LABEL[s] }))} onChange={setStatus} />
        <label className="block text-sm font-semibold text-white">
          Fee % of each paid invoice
          <input value={fee} disabled={!isAdmin} onChange={(e) => setFee(e.target.value)} inputMode="decimal" className={cn(field, "mt-1.5 font-normal disabled:opacity-50")} />
        </label>
        <label className="block text-sm font-semibold text-white">
          Territory
          <input value={territory} onChange={(e) => setTerritory(e.target.value)} maxLength={120} placeholder="e.g. Plumbing · Croydon" className={cn(field, "mt-1.5 font-normal")} />
        </label>
      </div>
      <label className="block text-sm font-semibold text-white">
        Team notes (the client never sees these)
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} maxLength={4000} className={cn(field, "mt-1.5 font-normal")} />
      </label>
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "Saving…" : "Save"}
      </button>
      {isAdmin ? <p className="text-xs text-white/45">A new fee applies to jobs added after the change; existing rows keep theirs.</p> : null}
      <Notice text={notice} tone={notice === "Saved." ? "good" : "neutral"} />
    </form>
  );
}

export type ClientPerson = { uid: string; name: string; email: string; role: Role };

export function ClientPeople({ people, invites, clientId, canManage }: { people: ClientPerson[]; invites: string[]; clientId?: string; canManage: boolean }) {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, start] = useTransition();
  return (
    <div className="space-y-4">
      <ul className={cn(card, "divide-y divide-white/[0.06]")}>
        {people.map((person) => (
          <li key={person.uid} className="flex items-center justify-between gap-3 px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.1] text-xs font-bold text-white">{(person.name || person.email).slice(0, 1).toUpperCase()}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{person.name || person.email}</p>
                <p className="truncate text-xs text-white/50">
                  {person.email} · {person.role === "client" ? "Owner" : ROLE_LABEL[person.role]}
                </p>
              </div>
            </div>
            {canManage && person.role === "client_staff" ? (
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  start(async () => {
                    const result = await removeClientUser(clientId, person.uid);
                    setNotice(result.ok ? "Removed." : result.error);
                  })
                }
                className={secondaryButton}
              >
                Remove
              </button>
            ) : null}
          </li>
        ))}
        {invites.map((invite) => (
          <li key={invite} className="flex items-center justify-between gap-3 px-4 py-3.5">
            <p className="truncate text-sm text-white">{invite}</p>
            <span className="text-xs text-white/45">Invited, not signed in yet</span>
          </li>
        ))}
        {!people.length && !invites.length ? <li className="px-4 py-3.5 text-sm text-white/55">Nobody has signed in yet.</li> : null}
      </ul>
      {canManage ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setNotice("");
            start(async () => {
              const result = await inviteClientStaff(clientId, email);
              if (result.ok) {
                setEmail("");
                setNotice("Invited. They get an email and sign in with that address.");
              } else setNotice(result.error);
            });
          }}
          className="flex flex-col gap-2 sm:flex-row sm:items-end"
        >
          <label className="block flex-1 text-sm font-semibold text-white">
            Add someone from the business
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@business.com" className={cn(field, "mt-1.5 font-normal")} />
          </label>
          <button type="submit" disabled={pending || !email.includes("@")} className={primaryButton}>
            <Icon name="people" size={16} />
            Invite
          </button>
        </form>
      ) : null}
      <p className="text-xs text-white/45">Staff see results, updates and messages, but not invoices or fees.</p>
      <Notice text={notice} tone={notice.startsWith("Invited") || notice === "Removed." ? "good" : "neutral"} />
    </div>
  );
}

export function DraftInvoiceButton({ clientId }: { clientId: string }) {
  const [notice, setNotice] = useState("");
  const [pending, start] = useTransition();
  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const result = await draftInvoice(clientId);
            setNotice(result.ok ? "Draft made from every paid job not yet invoiced. Check it, then send it." : result.error);
          })
        }
        className={primaryButton}
      >
        <Icon name="receipt" size={16} />
        {pending ? "Drafting…" : "Draft invoice from paid jobs"}
      </button>
      <Notice text={notice} tone={notice.startsWith("Draft made") ? "good" : "neutral"} />
    </div>
  );
}
