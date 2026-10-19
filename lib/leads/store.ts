import { randomBytes } from "node:crypto";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb, firestoreReady, withTimeout } from "@/lib/firebase/admin";
import type { Booking, Lead } from "@/lib/system/types";

/* Lead and booking storage (server only, from Jadeed Marketing). Firestore must never cost
   us a lead: callers treat a null result as "not saved" and still send the lead email. */

export type NewLead = Omit<Lead, "id" | "createdAt" | "updatedAt" | "token"> & {
  context: Record<string, string>;
};

export async function saveLead(lead: NewLead): Promise<{ id: string; token: string } | null> {
  if (!firestoreReady()) return null;
  const token = randomBytes(24).toString("base64url");
  try {
    const ref = adminDb().collection("leads").doc();
    await withTimeout(ref.set({ ...lead, token, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() }), 6000, "Saving the lead");
    return { id: ref.id, token };
  } catch (error) {
    console.error("[lead] Firestore save failed", error instanceof Error ? error.message : error);
    return null;
  }
}

const iso = (value: unknown) => (value instanceof Timestamp ? value.toDate().toISOString() : typeof value === "string" ? value : "");

export type AuditView = { id: string; lead: Lead; booking: Booking | null };

/** The lead behind a private audit link, or null. Tokens are 32 url-safe characters. */
export async function leadByToken(token: string): Promise<AuditView | null> {
  if (!/^[A-Za-z0-9_-]{32}$/.test(token) || !firestoreReady()) return null;
  const db = adminDb();
  const snap = await withTimeout(db.collection("leads").where("token", "==", token).limit(1).get(), 6000, "Reading the lead");
  const doc = snap.docs[0];
  if (!doc) return null;
  const data = doc.data();
  const lead = { ...data, id: doc.id, goal: data.goal ?? {}, business: data.business ?? {}, createdAt: iso(data.createdAt), updatedAt: iso(data.updatedAt) } as Lead;

  let booking: Booking | null = null;
  if (lead.bookingId) {
    const b = await db.collection("bookings").doc(lead.bookingId).get();
    if (b.exists) {
      const bd = b.data()!;
      booking = { ...bd, id: b.id, startsAt: iso(bd.startsAt), createdAt: iso(bd.createdAt) } as Booking;
    }
  }
  return { id: doc.id, lead, booking };
}

/** Pakistan dates that already have a confirmed call (one call a day). */
export async function takenDates(fromDate: string): Promise<Set<string>> {
  if (!firestoreReady()) return new Set();
  try {
    const snap = await withTimeout(adminDb().collection("bookingDays").where("date", ">=", fromDate).get(), 5000, "Reading booked days");
    return new Set(snap.docs.map((d) => d.id));
  } catch (error) {
    console.error("[booking] Could not read booked days", error instanceof Error ? error.message : error);
    return new Set();
  }
}
