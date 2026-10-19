import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE } from "@/lib/firebase/config";
import { STAFF_ROLES, type Role } from "./types";

/* Server helpers for the dashboard: who is signed in, and where the dashboard lives
   (app.jadeedsolutions.com serves it at the root; on localhost and the main domain it is
   under /app). Same as Jadeed Marketing. */

export type SessionUser = {
  uid: string;
  email: string;
  name: string;
  picture?: string;
  role: Role;
  clientId?: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return null;
  try {
    const d = await adminAuth().verifySessionCookie(value, true);
    return {
      uid: d.uid,
      email: d.email ?? "",
      name: (d.name as string | undefined) ?? d.email ?? "",
      picture: d.picture,
      role: ((d.role as Role | undefined) ?? "visitor") as Role,
      clientId: d.clientId as string | undefined,
    };
  } catch {
    return null;
  }
}

/** "" on app.jadeedsolutions.com, "/app" everywhere else. */
export async function appBase(): Promise<string> {
  const host = (await headers()).get("host") ?? "";
  return host.startsWith("app.") ? "" : "/app";
}

/** For dashboard pages: redirects to the sign-in page when signed out. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect(`${await appBase()}/login`);
  return user;
}

export function isStaff(role: Role) {
  return STAFF_ROLES.includes(role);
}

export function isClient(role: Role) {
  return role === "client" || role === "client_staff";
}
