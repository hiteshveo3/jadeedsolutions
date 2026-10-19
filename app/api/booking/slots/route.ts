import { BOOKING, bookingDays, pkDate } from "@/lib/booking";
import { busyTimes } from "@/lib/google/calendar";
import { takenDates } from "@/lib/leads/store";

export const runtime = "nodejs";

/** The next 14 days of call times: days with a call are marked taken, and times that overlap
    the owner's Google Calendar are left out. */
export async function GET() {
  const now = new Date();
  const [taken, busy] = await Promise.all([takenDates(pkDate(now)), busyTimes(now, new Date(now.getTime() + (BOOKING.daysAhead + 2) * 24 * 3600_000))]);
  return Response.json({ days: bookingDays(now, taken, busy) }, { headers: { "Cache-Control": "no-store" } });
}
