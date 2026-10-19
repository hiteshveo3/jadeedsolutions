/**
 * Call booking rules (owner's rules from Jadeed Marketing, the same Sameer takes both
 * brands' calls). Pure functions shared by the browser and the server; the server re-checks
 * every booking.
 *
 * - Sameer takes every call; at most one call a day, 7 days a week.
 * - From tomorrow (Pakistan date) up to 14 days ahead.
 * - Start times on the hour, 5 AM – 11 PM Pakistan time (calls end by midnight).
 * - 5–9 AM Pakistan time has the best internet: shown first as "Best time".
 * - 30 minutes for new leads.
 *
 * Pakistan has no daylight saving, so Pakistan time is always UTC+5.
 */

export const BOOKING = {
  timeZone: "Asia/Karachi",
  utcOffsetHours: 5,
  firstHour: 5,
  lastStartHour: 23,
  bestUntilHour: 9,
  daysAhead: 14,
  leadMinutes: 30,
  /** Used until the browser tells us the visitor's zone (most clients are in the UK). */
  fallbackZone: "Europe/London",
} as const;

export type CallMethod = "meet" | "whatsapp";

export const CALL_METHOD_LABEL: Record<CallMethod, string> = {
  meet: "Google Meet",
  whatsapp: "WhatsApp call",
};

export type Slot = { start: string; best: boolean };
/** A busy stretch on the owner's Google Calendar (ISO instants). */
export type BusyRange = { start: string; end: string };
export type BookingDay = { date: string; slots: Slot[]; taken: boolean };

const HOUR = 60 * 60 * 1000;

/** "2026-10-05" — the Pakistan calendar date of an instant. */
export function pkDate(instant: Date) {
  return new Date(instant.getTime() + BOOKING.utcOffsetHours * HOUR).toISOString().slice(0, 10);
}

/** The UTC instant of a Pakistan date and hour. */
function pkInstant(date: string, hour: number) {
  return new Date(Date.parse(`${date}T00:00:00Z`) + (hour - BOOKING.utcOffsetHours) * HOUR);
}

function addDays(date: string, days: number) {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * 24 * HOUR).toISOString().slice(0, 10);
}

/** True when a call starting at `start` would overlap a busy stretch. */
function overlapsBusy(start: Date, busy: readonly BusyRange[]) {
  const end = start.getTime() + BOOKING.leadMinutes * 60_000;
  return busy.some((range) => Date.parse(range.start) < end && Date.parse(range.end) > start.getTime());
}

/**
 * The bookable days and their start times. `takenDates` are Pakistan dates already booked;
 * `busy` comes from the owner's Google Calendar, so a call never overlaps another event.
 */
export function bookingDays(now: Date, takenDates: ReadonlySet<string> = new Set(), busy: readonly BusyRange[] = []): BookingDay[] {
  const today = pkDate(now);
  return Array.from({ length: BOOKING.daysAhead }, (_, index) => {
    const date = addDays(today, index + 1);
    const slots: Slot[] = [];
    for (let hour = BOOKING.firstHour; hour <= BOOKING.lastStartHour; hour += 1) {
      const start = pkInstant(date, hour);
      if (overlapsBusy(start, busy)) continue;
      slots.push({ start: start.toISOString(), best: hour < BOOKING.bestUntilHour });
    }
    return { date, slots, taken: takenDates.has(date) };
  });
}

/** Server check: is this start time one of the offered slots on a free day? */
export function isBookableStart(start: string, now: Date, takenDates: ReadonlySet<string>, busy: readonly BusyRange[] = []) {
  return bookingDays(now, takenDates, busy).some((day) => !day.taken && day.slots.some((slot) => slot.start === start));
}

/** Hour of an instant in a time zone (0–23). */
export function hourIn(instant: Date, timeZone: string) {
  const hour = new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone }).format(instant);
  return Number(hour) % 24;
}

/**
 * Three suggested times that land between 8 AM and 9 PM for the visitor, one per day, on the
 * first free days ("Best time" slots first when they fit the visitor's day).
 */
export function suggestSlots(days: BookingDay[], visitorTimeZone: string, count = 3): Slot[] {
  const friendly = (slot: Slot) => {
    const hour = hourIn(new Date(slot.start), visitorTimeZone);
    return hour >= 8 && hour <= 21;
  };
  const picks: Slot[] = [];
  for (const prefer of [true, false]) {
    for (const day of days) {
      if (picks.length >= count) break;
      if (day.taken || picks.some((p) => pkDate(new Date(p.start)) === day.date)) continue;
      const candidates = day.slots.filter((slot) => friendly(slot) && (!prefer || slot.best));
      // Vary the hour from day to day so the three suggestions give a real choice.
      const pick = candidates[picks.length % Math.max(1, candidates.length)];
      if (pick) picks.push(pick);
    }
  }
  return picks.sort((a, b) => a.start.localeCompare(b.start));
}

/** "Tue 7 Oct, 8:00 pm" in a time zone. */
export function formatSlot(start: string, timeZone: string, options: { weekday?: boolean; date?: boolean } = {}) {
  const { weekday = true, date = true } = options;
  return new Intl.DateTimeFormat("en-GB", {
    ...(weekday ? { weekday: "short" } : {}),
    ...(date ? { day: "numeric", month: "short" } : {}),
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(new Date(start));
}

/** Short zone name for a visitor, e.g. "BST", falling back to the IANA name. */
export function zoneName(timeZone: string, at = new Date()) {
  const part = new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "short" })
    .formatToParts(at)
    .find((p) => p.type === "timeZoneName");
  return part?.value ?? timeZone;
}

/** A time zone the server can use, or the fallback. */
export function safeZone(timeZone: string | undefined) {
  if (!timeZone) return BOOKING.fallbackZone;
  try {
    new Intl.DateTimeFormat("en-GB", { timeZone });
    return timeZone;
  } catch {
    return BOOKING.fallbackZone;
  }
}
