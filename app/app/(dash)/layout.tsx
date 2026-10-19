import { AppShell } from "@/components/system/AppShell";
import { appBase, requireUser } from "@/lib/system/session";

/* Every signed-in screen: verifies the session cookie on the server, then wraps the page in
   the shell with the menu for the user's role. */
export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, base] = await Promise.all([requireUser(), appBase()]);
  return (
    <AppShell user={{ name: user.name, email: user.email, role: user.role, picture: user.picture }} base={base}>
      {children}
    </AppShell>
  );
}
