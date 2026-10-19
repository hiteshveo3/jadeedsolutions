import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProposalDecision, ProposalView } from "@/components/portal/Proposals";
import { Icon } from "@/components/system/Icon";
import { EmptyState } from "@/components/system/Page";
import { getProposal } from "@/lib/portal/data";
import { appBase, isClient, requireUser } from "@/lib/system/session";

export const metadata: Metadata = { title: "Proposal" };

/* One proposal for the client (Design Lab idea 097 A): the key terms, then Approve or Decline. */
export default async function ProposalPage({ params }: { params: Promise<{ id: string }> }) {
  const [user, base, { id }] = await Promise.all([requireUser(), appBase(), params]);
  if (!isClient(user.role) || !user.clientId) return <EmptyState icon="lock" title="Client portal" body="The team reads proposals on each client's page." />;
  const proposal = await getProposal(user.clientId, id);
  if (!proposal || proposal.status === "draft") notFound();
  const decision =
    proposal.status === "sent" ? (
      user.role === "client" ? (
        <ProposalDecision proposalId={proposal.id} />
      ) : (
        <p className="rounded-[16px] bg-white/[0.06] p-4 text-sm text-white/70">The business owner approves proposals.</p>
      )
    ) : null;
  return (
    <>
      <Link href={`${base}/proposals`} className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white">
        <Icon name="arrowLeft" size={16} />
        All proposals
      </Link>
      <div className="mx-auto mt-3 max-w-4xl">
        <ProposalView proposal={proposal} decision={decision} />
      </div>
    </>
  );
}
