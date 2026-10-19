export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** This moment in Pakistan time (UTC+5, no daylight saving), where the team works. */
const pk = (at = Date.now()) => new Date(at + 5 * 3600_000);

/** Today's Pakistan date, "2026-10-05". */
export const pkToday = () => pk().toISOString().slice(0, 10);

/** This month in Pakistan time, "2026-10". */
export const pkMonth = () => pk().toISOString().slice(0, 7);

/** "Mon 5 Oct, 3:00 PM" in Pakistan time. */
export const pkTime = (iso: string, withDate = true) =>
  new Intl.DateTimeFormat("en-GB", {
    ...(withDate ? { weekday: "short", day: "numeric", month: "short" } : {}),
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Karachi",
  }).format(new Date(iso));

/** "5m ago", "3h ago", "4d ago", then the date. */
export const ago = (iso: string) => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return days < 60 ? `${days}d ago` : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
};

/** "5 Oct 2026" from "2026-10-05". */
export const shortDate = (day: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${day}T00:00:00Z`));

/** True once an instant has passed (server render time). */
export const isPast = (iso: string) => new Date(iso).getTime() < Date.now();
