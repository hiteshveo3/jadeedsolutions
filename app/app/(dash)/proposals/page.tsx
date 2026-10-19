import type { Metadata } from "next";
import Link from "next/link";
import { ProposalStatus } from "@/components/portal/Proposals";
import { Icon } from "@/components/system/Icon";
import { EmptyState, Panel, PageHeader } from "@/components/system/Page";
import { card } from "@/components/system/ui";
import { listProposals } from "@/lib/portal/data";
import { appBase, isClient, requireUser } from "@/lib/system/session";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Proposals" };

export default async function ProposalsPage() {
  const [user, base] = await Promise.all([requireUser(), appBase()]);
  if (!isClient(user.role) || !user.clientId) return <EmptyState icon="lock" title="Client portal" body="Proposals are written on each client's page, under Proposals." />;
  const proposals = (await listProposals(user.clientId)).filter((p) => p.status !== "draft");
  return (
    <>
      <PageHeader title="Proposals" description="Plans and offers from Jadeed. Read one, then approve or decline it here." />
      {proposals.length ? (
        <ul className="space-y-3">
          {proposals.map((proposal) => (
            <li key={proposal.id}>
              <Link href={`${base}/proposals/${proposal.id}`} className={cn(card, "flex items-start justify-between gap-4 p-5 transition-colors hover:bg-white/[0.08]")}>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-lg font-extrabold text-white">{proposal.title}</span>
                    <ProposalStatus proposal={proposal} />
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm text-white/60">{proposal.summary}</span>
                </span>
                <Icon name="arrowRight" size={18} className="mt-1 text-[#BEF70A]" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Panel>
          <EmptyState icon="document" title="No proposals yet" body="When Sameer sends you a proposal, it appears here." />
        </Panel>
      )}
    </>
  );
}
