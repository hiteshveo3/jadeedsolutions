import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import type { DecodedIdToken } from "firebase-admin/auth";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { SESSION_COOKIE } from "@/lib/firebase/config";
import type { Role } from "@/lib/system/types";

export const runtime = "nodejs";

/* Sign-in for the dashboard and client portal (from Jadeed Marketing). The browser signs in
   with Firebase Auth (Google or email/password), then posts its ID token here. We decide the
   role, then swap the token for an httpOnly session cookie (5 days).

   Roles: an existing custom claim wins; emails in ADMIN_EMAILS become admin; an invite
   (invites/{email}) gives team / client / client_staff; anyone else is a visitor. Elevated
   roles need a verified email (Google accounts always are). */

const SESSION_DAYS = 5;

function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().replace(/^"|"$/g, "").toLowerCase())
    .filter(Boolean);
}

async function resolveRole(token: DecodedIdToken): Promise<{ role: Role; clientId?: string; inviteId?: string }> {
  const existing = token.role as Role | undefined;
  // A visitor can still be invited later, so only a real role short-circuits the lookup.
  if (existing && existing !== "visitor") return { role: existing, clientId: token.clientId as string | undefined };
  const email = (token.email ?? "").toLowerCase();
  if (!email) return { role: "visitor" };
  if (adminEmails().includes(email)) return { role: "admin" };
  const invite = await adminDb().collection("invites").doc(email).get();
  if (invite.exists) {
    const data = invite.data() as { role: Role; clientId?: string };
    return { role: data.role, clientId: data.clientId, inviteId: email };
  }
  return { role: "visitor" };
}

export async function POST(request: Request) {
  let idToken = "";
  try {
    idToken = String(((await request.json()) as { idToken?: string }).idToken ?? "");
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  if (!idToken) return NextResponse.json({ error: "Missing token." }, { status: 400 });

  let token: DecodedIdToken;
  try {
    token = await adminAuth().verifyIdToken(idToken, true);
  } catch {
    return NextResponse.json({ error: "Your sign-in expired. Please try again." }, { status: 401 });
  }

  const { role, clientId, inviteId } = await resolveRole(token);
  const usesPassword = token.firebase?.sign_in_provider === "password";
  if (role !== "visitor" && usesPassword && !token.email_verified) {
    return NextResponse.json({ error: "Please verify your email first. We've sent you a link.", verify: true }, { status: 403 });
  }

  /* New role: store it as a claim, then ask the browser for a fresh token that carries it. */
  if (token.role !== role) {
    await adminAuth().setCustomUserClaims(token.uid, { role, ...(clientId ? { clientId } : {}) });
    if (inviteId) await adminDb().collection("invites").doc(inviteId).set({ acceptedAt: FieldValue.serverTimestamp() }, { merge: true });
    return NextResponse.json({ refresh: true });
  }

  const now = FieldValue.serverTimestamp();
  const userRef = adminDb().collection("users").doc(token.uid);
  const snap = await userRef.get();
  await userRef.set(
    {
      uid: token.uid,
      email: token.email ?? "",
      name: (token.name as string | undefined) ?? token.email ?? "",
      photoURL: token.picture ?? null,
      role,
      clientId: clientId ?? null,
      lastLoginAt: now,
      ...(snap.exists ? {} : { createdAt: now }),
    },
    { merge: true }
  );

  const expiresIn = SESSION_DAYS * 24 * 60 * 60 * 1000;
  const cookie = await adminAuth().createSessionCookie(idToken, { expiresIn });
  const response = NextResponse.json({ ok: true, role });
  response.cookies.set(SESSION_COOKIE, cookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: expiresIn / 1000,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
