import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/system/Icon";
import { CallActions } from "@/components/system/LeadActions";
import { CallSummary } from "@/components/system/LeadViews";
import { EmptyState, PageHeader, Panel } from "@/components/system/Page";
import { textLink } from "@/components/system/ui";
import { listBookings } from "@/lib/system/data";
import { appBase, isStaff, requireUser } from "@/lib/system/session";
import type { Booking } from "@/lib/system/types";
import { cn, isPast } from "@/lib/utils";

export const metadata: Metadata = { title: "Bookings" };

function CallRow({ booking, base, actions }: { booking: Booking; base: string; actions: "upcoming" | "unmarked" | "none" }) {
  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <Link href={`${base}/leads/${booking.leadId}`} className={cn(textLink, "text-sm")}>
        {booking.businessName || booking.contact?.name || "Lead"}
      </Link>
      <p className="text-xs text-white/50">{[booking.contact?.name, booking.contact?.email].filter(Boolean).join(" · ")}</p>
      <div className="mt-2.5">
        <CallSummary booking={booking} />
      </div>
      {actions !== "none" ? <CallActions bookingId={booking.id} past={actions === "unmarked"} /> : null}
    </li>
  );
}

/* Calls with Sameer (from Jadeed Marketing): what's coming up (with the Meet link and
   cancel), and past calls to mark as held or no-show. Busy time is blocked in Google
   Calendar itself. */
export default async function BookingsPage() {
  const [user, base] = await Promise.all([requireUser(), appBase()]);
  if (!isStaff(user.role)) return <EmptyState icon="lock" title="Team only" body="Bookings are for the Jadeed team." />;

  const all = await listBookings(200);
  const upcoming = all.filter((b) => b.status === "confirmed" && !isPast(b.startsAt)).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const toMark = all.filter((b) => b.status === "confirmed" && isPast(b.startsAt));
  const history = all.filter((b) => b.status !== "confirmed").slice(0, 50);

  return (
    <>
      <PageHeader title="Bookings" description="Calls with Sameer, one a day at most. To block time, add it to Google Calendar: busy times are never offered." />
      <div className="space-y-4">
        <Panel title={`Coming up · ${upcoming.length}`}>
          {upcoming.length ? (
            <ul className="divide-y divide-white/[0.06]">
              {upcoming.map((booking) => (
                <CallRow key={booking.id} booking={booking} base={base} actions="upcoming" />
              ))}
            </ul>
          ) : (
            <EmptyState icon="calendar" title="No calls booked" body="A and B leads book a call from their private audit page." />
          )}
        </Panel>

        {toMark.length ? (
          <Panel title={`Did these happen? · ${toMark.length}`}>
            <ul className="divide-y divide-white/[0.06]">
              {toMark.map((booking) => (
                <CallRow key={booking.id} booking={booking} base={base} actions="unmarked" />
              ))}
            </ul>
          </Panel>
        ) : null}

        {history.length ? (
          <Panel title="Past and cancelled">
            <ul className="divide-y divide-white/[0.06]">
              {history.map((booking) => (
                <CallRow key={booking.id} booking={booking} base={base} actions="none" />
              ))}
            </ul>
          </Panel>
        ) : null}

        <p className="flex items-center gap-1.5 text-xs text-white/45">
          <Icon name="info" size={14} />
          Times are Pakistan time. Visitors see their own time with Pakistan time alongside.
        </p>
      </div>
    </>
  );
}
