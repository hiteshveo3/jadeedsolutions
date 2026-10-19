import type { Metadata } from "next";
import { leadLine, leadName } from "@/components/system/LeadViews";
import { EmptyState, PageHeader } from "@/components/system/Page";
import { PipelineBoard } from "@/components/system/PipelineBoard";
import { listLeads } from "@/lib/system/data";
import { appBase, isStaff, requireUser } from "@/lib/system/session";
import { ago } from "@/lib/utils";

export const metadata: Metadata = { title: "Pipeline" };

/* The leads board (Jadeed Marketing's pipeline; Design Lab idea 099 A). */
export default async function PipelinePage() {
  const [user, base] = await Promise.all([requireUser(), appBase()]);
  if (!isStaff(user.role)) return <EmptyState icon="lock" title="Team only" body="The pipeline is for the Jadeed team." />;

  const leads = await listLeads(300);
  const cards = leads.map((lead) => ({
    id: lead.id,
    name: leadName(lead),
    detail: leadLine(lead) || lead.contact.name || "—",
    score: lead.score,
    status: lead.status,
    age: ago(lead.createdAt),
  }));

  return (
    <>
      <PageHeader title="Pipeline" description="Every lead is a card that moves New → Contacted → Call booked → Audit sent → Won. Drag a card, or use its menu. Every move is logged on the lead." />
      {cards.length ? <PipelineBoard cards={cards} base={base} /> : <EmptyState icon="layers" title="No leads yet" body="Leads from the free-audit form appear here as they arrive." />}
    </>
  );
}
