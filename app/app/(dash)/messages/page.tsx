import type { Metadata } from "next";
import { MessageThread } from "@/components/portal/Messages";
import { EmptyState, PageHeader } from "@/components/system/Page";
import { listMessages } from "@/lib/portal/data";
import { isClient, requireUser } from "@/lib/system/session";

export const metadata: Metadata = { title: "Messages" };

/* The client's single thread with the team (replaces WhatsApp; Design Lab idea 096 A). */
export default async function MessagesPage() {
  const user = await requireUser();
  if (!isClient(user.role) || !user.clientId) return <EmptyState icon="lock" title="Client portal" body="Messages with each client are on that client's page." />;
  const messages = await listMessages(user.clientId);
  return (
    <>
      {/* Phones: the chat is the whole screen, like WhatsApp, so the page title steps aside. */}
      <div className="hidden sm:block">
        <PageHeader title="Messages" description="Everything with the Jadeed team in one place, files included. Sameer and the team reply here." />
      </div>
      <MessageThread messages={messages} side="client" otherName="Jadeed team" />
    </>
  );
}
