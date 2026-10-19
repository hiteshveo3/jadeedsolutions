import { BookingChangeError, cancelBooking } from "@/lib/bookings";
import { firestoreReady } from "@/lib/firebase/admin";
import { getSessionUser, isStaff } from "@/lib/system/session";

export const runtime = "nodejs";

/** Staff cancel a booked call (also a dashboard action). See cancelBooking(). */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user || !isStaff(user.role)) return Response.json({ error: "Not allowed." }, { status: 403 });
  if (!firestoreReady()) return Response.json({ error: "The database isn't available." }, { status: 503 });

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as { reason?: string };
  const reason = typeof body.reason === "string" ? body.reason.trim().slice(0, 300) : "";
  try {
    await cancelBooking(id, { email: user.email, name: user.name }, reason);
  } catch (error) {
    if (error instanceof BookingChangeError) return Response.json({ error: error.message }, { status: 409 });
    console.error("[booking] Cancel failed", error instanceof Error ? error.message : error);
    return Response.json({ error: "Couldn't cancel that call. Please try again." }, { status: 500 });
  }
  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
