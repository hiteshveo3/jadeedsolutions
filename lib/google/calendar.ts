import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, firestoreReady, withTimeout } from "@/lib/firebase/admin";

/**
 * Google Calendar on jadeedsolutionz@gmail.com (server only), copied from Jadeed Marketing.
 * Free API, no Workspace features needed. An admin connects it once from Settings (OAuth
 * "offline" access); the refresh token is stored encrypted in settings/google and every
 * booking then:
 *   - checks busy times so a call never lands on top of something else (freeBusy)
 *   - creates the event with a Google Meet link and invites the visitor
 * Needs GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET (the same OAuth client as
 * Jadeed Marketing works once this site's callback URL is added to it).
 */

export const GOOGLE_SCOPES = [
  "openid",
  "email",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.freebusy",
];

const SETTINGS_DOC = () => adminDb().collection("settings").doc("google");

export const googleConfigured = () => Boolean(process.env.GOOGLE_OAUTH_CLIENT_ID && process.env.GOOGLE_OAUTH_CLIENT_SECRET);

/* The refresh token is encrypted with a key derived from the client secret, so a copy of the
   database alone can't use the calendar. Rotating the secret means reconnecting. */
function key() {
  return createHash("sha256").update(`jadeed-calendar:${process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? ""}`).digest();
}

function encrypt(text: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), data].map((part) => part.toString("base64url")).join(".");
}

function decrypt(value: string) {
  const [iv, tag, data] = value.split(".").map((part) => Buffer.from(part, "base64url"));
  const decipher = createDecipheriv("aes-256-gcm", key(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}

/* ------------------------------ connecting ------------------------------ */

export function authUrl(redirectUri: string, state: string) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",
    redirect_uri: redirectUri,
    response_type: "code",
    scope: GOOGLE_SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "true",
    login_hint: "jadeedsolutionz@gmail.com",
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

type TokenResponse = { access_token: string; expires_in: number; refresh_token?: string; id_token?: string; scope?: string; error?: string };

async function tokenRequest(body: Record<string, string>): Promise<TokenResponse> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? "",
      ...body,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  const json = (await response.json()) as TokenResponse & { error_description?: string };
  if (!response.ok) throw new Error(`Google token error: ${json.error ?? response.status} ${json.error_description ?? ""}`.trim());
  return json;
}

/** The email inside Google's id_token (already verified by Google over TLS). */
function emailFromIdToken(idToken?: string) {
  if (!idToken) return undefined;
  try {
    const payload = JSON.parse(Buffer.from(idToken.split(".")[1], "base64url").toString("utf8")) as { email?: string };
    return payload.email;
  } catch {
    return undefined;
  }
}

/** Exchanges the code from Google's consent screen and stores the connection. */
export async function connectCalendar(code: string, redirectUri: string, connectedBy: string) {
  const tokens = await tokenRequest({ code, redirect_uri: redirectUri, grant_type: "authorization_code" });
  if (!tokens.refresh_token) throw new Error("Google didn't return offline access. Remove the app's access in your Google account and connect again.");
  const email = emailFromIdToken(tokens.id_token);
  await SETTINGS_DOC().set({
    refreshToken: encrypt(tokens.refresh_token),
    email: email ?? null,
    scopes: tokens.scope ?? GOOGLE_SCOPES.join(" "),
    connectedBy,
    connectedAt: FieldValue.serverTimestamp(),
    lastError: null,
  });
  cache.__jadeedGoogle = { token: tokens.access_token, expiresAt: Date.now() + (tokens.expires_in - 60) * 1000 };
  return { email };
}

export type CalendarStatus = { connected: boolean; email?: string; lastError?: string | null };

export async function calendarStatus(): Promise<CalendarStatus> {
  if (!firestoreReady()) return { connected: false };
  const snap = await withTimeout(SETTINGS_DOC().get(), 4000, "Reading the calendar connection").catch(() => null);
  if (!snap?.exists || !snap.get("refreshToken")) return { connected: false };
  return { connected: true, email: snap.get("email") ?? undefined, lastError: snap.get("lastError") ?? null };
}

/* ------------------------------ access tokens ------------------------------ */

const cache = globalThis as typeof globalThis & { __jadeedGoogle?: { token: string; expiresAt: number } };

/** A fresh access token, or null when the calendar isn't connected (bookings still work). */
async function accessToken(): Promise<string | null> {
  const hit = cache.__jadeedGoogle;
  if (hit && hit.expiresAt > Date.now()) return hit.token;
  if (!googleConfigured() || !firestoreReady()) return null;
  const snap = await withTimeout(SETTINGS_DOC().get(), 4000, "Reading the calendar connection").catch(() => null);
  const stored = snap?.get("refreshToken") as string | undefined;
  if (!stored) return null;
  try {
    const tokens = await tokenRequest({ refresh_token: decrypt(stored), grant_type: "refresh_token" });
    cache.__jadeedGoogle = { token: tokens.access_token, expiresAt: Date.now() + (tokens.expires_in - 60) * 1000 };
    return tokens.access_token;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[calendar] Token refresh failed", message);
    await SETTINGS_DOC().update({ lastError: message.slice(0, 300) }).catch(() => null);
    return null;
  }
}

async function calendarFetch<T>(path: string, init: RequestInit = {}): Promise<T | null> {
  const token = await accessToken();
  if (!token) return null;
  const response = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Google Calendar ${response.status}: ${(await response.text()).slice(0, 300)}`);
  return response.status === 204 ? ({} as T) : ((await response.json()) as T);
}

/* ------------------------------ busy times ------------------------------ */

export type Busy = { start: string; end: string };

type BusyCache = { from: string; to: string; busy: Busy[]; readAt: number };
const busyCache = globalThis as typeof globalThis & { __jadeedBusy?: BusyCache };

/** Busy times on the owner's calendar between two instants (cached for two minutes). [] if not connected. */
export async function busyTimes(from: Date, to: Date): Promise<Busy[]> {
  const hit = busyCache.__jadeedBusy;
  if (hit && Date.now() - hit.readAt < 120_000 && hit.from <= from.toISOString() && hit.to >= to.toISOString()) return hit.busy;
  try {
    const result = await calendarFetch<{ calendars?: Record<string, { busy?: Busy[] }> }>("/freeBusy", {
      method: "POST",
      body: JSON.stringify({ timeMin: from.toISOString(), timeMax: to.toISOString(), items: [{ id: "primary" }] }),
    });
    const busy = result?.calendars?.primary?.busy ?? [];
    busyCache.__jadeedBusy = { from: from.toISOString(), to: to.toISOString(), busy, readAt: Date.now() };
    return busy;
  } catch (error) {
    console.error("[calendar] freeBusy failed", error instanceof Error ? error.message : error);
    return [];
  }
}

/** Forget cached busy times (after a booking adds an event). */
export const clearBusyCache = () => {
  busyCache.__jadeedBusy = undefined;
};

/* ------------------------------ events ------------------------------ */

export type CallEvent = {
  /** Our booking id; makes the Meet request idempotent. */
  bookingId: string;
  summary: string;
  description: string;
  start: string;
  minutes: number;
  attendee?: { email: string; name?: string };
  meet: boolean;
};

/** Creates the call on the owner's calendar. Null when the calendar isn't connected. */
export async function createCallEvent(call: CallEvent): Promise<{ eventId: string; meetUrl?: string; htmlLink?: string } | null> {
  const end = new Date(new Date(call.start).getTime() + call.minutes * 60_000).toISOString();
  const event = await calendarFetch<{
    id: string;
    htmlLink?: string;
    hangoutLink?: string;
    conferenceData?: { entryPoints?: { entryPointType: string; uri: string }[] };
  }>(`/calendars/primary/events?conferenceDataVersion=1&sendUpdates=${call.attendee ? "all" : "none"}`, {
    method: "POST",
    body: JSON.stringify({
      summary: call.summary,
      description: call.description,
      start: { dateTime: call.start, timeZone: "Asia/Karachi" },
      end: { dateTime: end, timeZone: "Asia/Karachi" },
      attendees: call.attendee ? [{ email: call.attendee.email, displayName: call.attendee.name }] : [],
      reminders: { useDefault: false, overrides: [{ method: "popup", minutes: 15 }] },
      ...(call.meet
        ? { conferenceData: { createRequest: { requestId: `jadeed-js-${call.bookingId}`, conferenceSolutionKey: { type: "hangoutsMeet" } } } }
        : {}),
      extendedProperties: { private: { jadeedBookingId: call.bookingId, jadeedSite: "solutions" } },
    }),
  });
  if (!event) return null;
  clearBusyCache();
  const meetUrl = event.hangoutLink ?? event.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri;
  return { eventId: event.id, meetUrl, htmlLink: event.htmlLink };
}

/** Removes a call from the calendar and tells the visitor (used when a booking is cancelled). */
export async function cancelCallEvent(eventId: string) {
  await calendarFetch(`/calendars/primary/events/${encodeURIComponent(eventId)}?sendUpdates=all`, { method: "DELETE" });
  clearBusyCache();
}
