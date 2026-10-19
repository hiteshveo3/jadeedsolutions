import type { IconName } from "@/components/system/Icon";
import type { Role } from "./types";

/* Sidebar items by role. Staff (admin, team) and clients share one shell — the client portal
   is the same layout with a client menu (as on Jadeed Marketing; Design Lab idea 093 A:
   sidebar + numbers). `href` is relative to the dashboard base ("" on
   app.jadeedsolutions.com, "/app" elsewhere). */

/** `bar`: shown in the phone's bottom navigation; everything else sits under "More". */
export type NavItem = { href: string; label: string; icon: IconName; roles: readonly Role[]; bar?: boolean };

const STAFF = ["admin", "team"] as const;
const CLIENT = ["client", "client_staff"] as const;

export const NAV: readonly NavItem[] = [
  { href: "", label: "Home", icon: "home", roles: STAFF, bar: true },
  { href: "/leads", label: "Leads", icon: "people", roles: STAFF, bar: true },
  { href: "/pipeline", label: "Pipeline", icon: "layers", roles: STAFF },
  { href: "/chats", label: "Chats", icon: "chat", roles: STAFF, bar: true },
  { href: "/bookings", label: "Bookings", icon: "calendar", roles: STAFF },
  { href: "/clients", label: "Clients", icon: "briefcase", roles: STAFF, bar: true },
  { href: "/tasks", label: "Tasks", icon: "tasks", roles: STAFF },
  { href: "/invoices", label: "Invoices", icon: "receipt", roles: ["admin"] },
  { href: "/teach", label: "Teach Jadeed AI", icon: "sparkles", roles: STAFF },
  { href: "/settings", label: "Settings", icon: "settings", roles: ["admin"] },

  { href: "", label: "Home", icon: "home", roles: CLIENT, bar: true },
  { href: "/leads", label: "Results", icon: "chart", roles: CLIENT, bar: true },
  { href: "/work", label: "Updates", icon: "activity", roles: CLIENT, bar: true },
  { href: "/messages", label: "Messages", icon: "message", roles: CLIENT, bar: true },
  { href: "/proposals", label: "Proposals", icon: "document", roles: CLIENT },
  { href: "/invoices", label: "Invoices", icon: "receipt", roles: ["client"] },
  { href: "/people", label: "Your team", icon: "profile", roles: ["client"] },

  { href: "", label: "Your account", icon: "home", roles: ["visitor"] },
];

export function navFor(role: Role) {
  return NAV.filter((item) => item.roles.includes(role));
}
