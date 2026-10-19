import type { Metadata } from "next";
import { UpdateList } from "@/components/portal/Updates";
import { EmptyState, PageHeader } from "@/components/system/Page";
import { listUpdates } from "@/lib/portal/data";
import { isClient, requireUser } from "@/lib/system/session";

export const metadata: Metadata = { title: "Updates" };

/* The client's view of what the team did (Design Lab idea 098 B): what, why and what's next,
   written by the people doing the work. */
export default async function WorkPage() {
  const user = await requireUser();
  if (!isClient(user.role) || !user.clientId) return <EmptyState icon="lock" title="Client portal" body="Work updates are shown to clients. The team posts them from each client's page." />;
  const updates = await listUpdates(user.clientId);
  return (
    <>
      <PageHeader title="Updates" description="What the Jadeed team did for you, why, and what comes next — in plain words." />
      <UpdateList updates={updates} empty="No updates yet. The team posts one each week, and a short report each month." />
    </>
  );
}
