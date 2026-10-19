"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/system/Icon";
import { BOOKING, CALL_METHOD_LABEL, formatSlot, suggestSlots, zoneName, type BookingDay, type CallMethod, type Slot } from "@/lib/booking";
import { cn } from "@/lib/utils";

/* Book the free call with Sameer (Jadeed Marketing's BookingPicker, in this site's dark
   style): three suggested times first, then "See all 14 days" for a date strip (Design Lab
   idea 081 A: a strip of days, then the times). Times show in the visitor's own zone with
   Pakistan time alongside. */

export type BookedCall = { startsAt: string; method: CallMethod; minutes: number; timeZone?: string; meetUrl?: string };

const samePakistanTime = (start: string, zone: string) => formatSlot(start, zone) === formatSlot(start, BOOKING.timeZone);
const visitorZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || BOOKING.fallbackZone;
const localDate = (start: string, timeZone: string) => new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone }).format(new Date(start));

export function BookingPicker({ token, booked: initial }: { token: string; booked?: BookedCall | null }) {
  const [zone, setZone] = useState<string>(BOOKING.fallbackZone);
  const [days, setDays] = useState<BookingDay[] | null>(null);
  const [selected, setSelected] = useState<Slot | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [activeDate, setActiveDate] = useState("");
  const [method, setMethod] = useState<CallMethod>("meet");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [booked, setBooked] = useState<BookedCall | null>(initial ?? null);

  async function loadSlots() {
    try {
      const response = await fetch("/api/booking/slots", { cache: "no-store" });
      const body = (await response.json()) as { days: BookingDay[] };
      setDays(body.days);
    } catch {
      setError("Couldn't load call times. Please refresh the page.");
    }
  }

  useEffect(() => {
    // The visitor's zone is only known in the browser; until then the markup uses UK time.
    setZone(visitorZone());
    if (!initial) void loadSlots();
  }, [initial]);

  const suggestions = useMemo(() => (days ? suggestSlots(days, zone) : []), [days, zone]);

  /** Free slots grouped by the visitor's own calendar date. */
  const byLocalDate = useMemo(() => {
    const groups = new Map<string, Slot[]>();
    for (const day of days ?? []) {
      if (day.taken) continue;
      for (const slot of day.slots) {
        const key = localDate(slot.start, zone);
        groups.set(key, [...(groups.get(key) ?? []), slot]);
      }
    }
    return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [days, zone]);

  const activeSlots = byLocalDate.find(([date]) => date === activeDate)?.[1] ?? byLocalDate[0]?.[1] ?? [];
  const currentDate = activeDate || byLocalDate[0]?.[0] || "";

  async function book() {
    if (!selected) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, start: selected.start, method, timeZone: zone }),
      });
      const body = (await response.json()) as { ok?: boolean; error?: string; booking?: { startsAt: string; minutes: number; method: CallMethod; meetUrl?: string } };
      if (!response.ok || !body.booking) {
        setError(body.error ?? "Couldn't book that time. Please pick another.");
        if (response.status === 409) {
          setSelected(null);
          void loadSlots();
        }
        return;
      }
      setBooked({ startsAt: body.booking.startsAt, method: body.booking.method, minutes: body.booking.minutes, timeZone: zone, meetUrl: body.booking.meetUrl });
    } catch {
      setError("We couldn't reach our server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (booked) return <BookedSummary call={booked} />;

  return (
    <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.05] p-5 sm:p-7">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
          <Icon name="calendar" size={19} />
        </span>
        <div>
          <h2 className="text-[22px] leading-tight tracking-[-0.02em] text-white">Book your free call with Sameer</h2>
          <p className="mt-1 text-sm text-white/60">
            {BOOKING.leadMinutes} minutes · times in your zone ({zoneName(zone)}), with Pakistan time alongside
          </p>
        </div>
      </div>

      {!days ? (
        <p className="mt-5 text-sm text-white/60">Loading times…</p>
      ) : (
        <>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Suggested for you</p>
          <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
            {suggestions.map((slot) => (
              <SlotButton key={slot.start} slot={slot} zone={zone} selected={selected?.start === slot.start} onSelect={setSelected} />
            ))}
          </div>

          <button type="button" onClick={() => setShowAll((open) => !open)} aria-expanded={showAll} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-white underline decoration-[#BEF70A] decoration-2 underline-offset-4">
            {showAll ? "Hide other days" : `See all ${BOOKING.daysAhead} days`}
            <Icon name="chevronDown" size={16} className={cn("transition-transform", showAll && "rotate-180")} />
          </button>

          {showAll ? (
            <div className="mt-2">
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 custom-scrollbar" role="tablist" aria-label="Pick a day">
                {byLocalDate.map(([date, slots]) => {
                  const first = slots[0].start;
                  const active = date === currentDate;
                  return (
                    <button
                      key={date}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveDate(date)}
                      className={cn("flex min-w-[60px] shrink-0 flex-col items-center rounded-[14px] px-2.5 py-2 transition-colors", active ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.06] text-white hover:bg-white/[0.1]")}
                    >
                      <span className="text-xs font-semibold">{new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: zone }).format(new Date(first))}</span>
                      <span className="text-lg font-extrabold leading-tight">{new Intl.DateTimeFormat("en-GB", { day: "numeric", timeZone: zone }).format(new Date(first))}</span>
                      <span className={cn("text-[11px]", active ? "text-[#0B1F12]/70" : "text-white/50")}>{new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: zone }).format(new Date(first))}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tabpanel">
                {[...activeSlots]
                  .sort((a, b) => a.start.localeCompare(b.start))
                  .map((slot) => (
                    <SlotButton key={slot.start} slot={slot} zone={zone} compact selected={selected?.start === slot.start} onSelect={setSelected} />
                  ))}
              </div>
            </div>
          ) : null}

          <fieldset className="mt-6">
            <legend className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">How should Sameer call?</legend>
            <div className="mt-2.5 flex w-fit flex-wrap rounded-full bg-white/[0.06] p-1" role="radiogroup">
              {(Object.keys(CALL_METHOD_LABEL) as CallMethod[]).map((value) => (
                <button key={value} type="button" role="radio" aria-checked={method === value} onClick={() => setMethod(value)} className={cn("h-10 rounded-full px-4 text-sm font-semibold transition-colors", method === value ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/70 hover:text-white")}>
                  {CALL_METHOD_LABEL[value]}
                </button>
              ))}
            </div>
          </fieldset>

          {error ? (
            <p role="alert" className="mt-4 rounded-[14px] bg-white/[0.06] p-3 text-sm text-[#ffb4a8]">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={book}
            disabled={!selected || busy}
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#BEF70A] px-5 text-base font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Booking…" : selected ? `Book ${formatSlot(selected.start, zone)}` : "Pick a time above"}
          </button>
        </>
      )}
    </div>
  );
}

function SlotButton({ slot, zone, selected, compact = false, onSelect }: { slot: Slot; zone: string; selected: boolean; compact?: boolean; onSelect: (slot: Slot) => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(slot)}
      className={cn("flex flex-col items-start rounded-[16px] text-left transition-colors", compact ? "min-h-11 px-3 py-2" : "px-4 py-3", selected ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.06] text-white hover:bg-white/[0.1]")}
    >
      {compact ? null : <span className={cn("text-xs font-semibold", selected ? "text-[#0B1F12]/70" : "text-white/55")}>{formatSlot(slot.start, zone).split(",").slice(0, 1).join(",")}</span>}
      <span className={cn("font-extrabold", compact ? "text-sm" : "text-lg leading-tight")}>{formatSlot(slot.start, zone, { weekday: false, date: false })}</span>
      {samePakistanTime(slot.start, zone) ? null : <span className={cn("text-[11px]", selected ? "text-[#0B1F12]/70" : "text-white/45")}>{formatSlot(slot.start, BOOKING.timeZone, { date: false })} in Pakistan</span>}
    </button>
  );
}

export function BookedSummary({ call }: { call: BookedCall }) {
  const [zone, setZone] = useState(call.timeZone ?? BOOKING.fallbackZone);
  useEffect(() => setZone(visitorZone()), []);
  return (
    <div role="status" className="rounded-[24px] bg-[#BEF70A]/[0.08] p-5 sm:p-7">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
          <Icon name="check" size={18} />
        </span>
        <div>
          <h2 className="text-[22px] leading-tight tracking-[-0.02em] text-white">Your call is booked</h2>
          <p className="mt-2 text-sm text-white/75">
            <strong className="font-semibold text-white">{formatSlot(call.startsAt, zone)}</strong> your time ({zoneName(zone)})
            {samePakistanTime(call.startsAt, zone) ? null : ` · ${formatSlot(call.startsAt, BOOKING.timeZone)} in Pakistan`}
          </p>
          <p className="mt-1 text-sm text-white/75">
            {call.minutes} minutes by {CALL_METHOD_LABEL[call.method]}.{" "}
            {call.method === "meet"
              ? call.meetUrl
                ? "The invite and a reminder an hour before come by email."
                : "The Google Meet link comes by email, with a reminder an hour before."
              : "Sameer will call your phone on WhatsApp. A reminder comes by email an hour before."}
          </p>
          {call.meetUrl ? (
            <a href={call.meetUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#BEF70A] px-5 text-sm font-bold text-[#0B1F12] hover:bg-[#ABDE09]">
              <Icon name="monitor" size={16} />
              Join Google Meet
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
