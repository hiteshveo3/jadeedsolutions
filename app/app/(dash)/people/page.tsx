import type { Metadata } from "next";
import { ClientPeople } from "@/components/portal/Clients";
import { EmptyState, PageHeader } from "@/components/system/Page";
import { listClientPeople } from "@/lib/portal/data";
import { isClient, requireUser } from "@/lib/system/session";

export const metadata: Metadata = { title: "Your team" };

/* The client owner adds people from their business (office staff), who see results, updates
   and messages but not invoices or fees (from Jadeed Marketing). */
export default async function PeoplePage() {
  const user = await requireUser();
  if (!isClient(user.role) || !user.clientId) return <EmptyState icon="lock" title="Client portal" body="The team manages client logins on each client's page." />;
  const { people, invites } = await listClientPeople(user.clientId);
  return (
    <>
      <PageHeader title="Your team" description="People from your business who can use this portal." />
      <div className="max-w-3xl">
        <ClientPeople people={people} invites={invites} canManage={user.role === "client"} />
      </div>
    </>
  );
}
