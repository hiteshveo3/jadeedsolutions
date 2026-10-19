import { getSessionUser, type SessionUser } from "@/lib/system/session";

/* Who may see which client's portal data (server only), as on Jadeed Marketing.
   - admin, team: every client
   - client: their own client only
   - client_staff: their own client, but nothing about money (invoices, fees) */

export type Viewer = {
  user: SessionUser;
  clientId: string;
  side: "team" | "client";
  /** Invoices and fees: staff, and the client owner. */
  canSeeMoney: boolean;
  /** Only admins mark invoices paid, change fees or remove clients. */
  isAdmin: boolean;
};

export class AccessError extends Error {
  constructor() {
    super("Not allowed");
  }
}

/** The signed-in user's access to a client. `clientId` is required for staff and ignored for clients. */
export async function viewer(clientId?: string): Promise<Viewer> {
  const user = await getSessionUser();
  if (!user) throw new AccessError();
  if (user.role === "admin" || user.role === "team") {
    if (!clientId) throw new AccessError();
    return { user, clientId, side: "team", canSeeMoney: true, isAdmin: user.role === "admin" };
  }
  if ((user.role === "client" || user.role === "client_staff") && user.clientId) {
    if (clientId && clientId !== user.clientId) throw new AccessError();
    return { user, clientId: user.clientId, side: "client", canSeeMoney: user.role === "client", isAdmin: false };
  }
  throw new AccessError();
}
