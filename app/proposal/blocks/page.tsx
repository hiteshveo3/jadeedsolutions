import type { Metadata } from "next";
import { ContractPayback, SampleAudit, SuccessFeeChart } from "@/components/jadeed/proposal";
import { TermSlider } from "@/components/jadeed/terms";
import { Eyebrow } from "@/components/site/ui";

/* Private preview of the proposal blocks (ideas 022, 024, 033, 035, 036).
   A capped success fee or a monthly fee is one client's own deal, so these run on
   unlisted proposal pages only — copy a block into /proposal/<client> and pass that
   client's real numbers. Everything below is sample data. */

export const metadata: Metadata = {
  title: "Proposal blocks · private preview",
  robots: { index: false, follow: false },
};

const card = "rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-6 sm:p-8";

export default function ProposalBlocksPage() {
  return (
    <main className="px-5 pb-20 pt-[130px] sm:px-8 md:pt-[160px]">
      <div className="mx-auto max-w-[1100px]">
        <Eyebrow>Private · not indexed</Eyebrow>
        <h1 className="mt-5 text-4xl tracking-[-.04em] sm:text-5xl">Proposal blocks</h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-7 text-white/75">
          Building blocks for client proposals. Every number here is a sample — in a real proposal each block gets that client&apos;s own deal and evidence.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4">
          <section className={card} aria-labelledby="fee-cap">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#BEF70A]">022 · Investment</p>
            <h2 id="fee-cap" className="mb-6 mt-2 text-2xl tracking-[-.03em] sm:text-3xl">A success fee with an upper limit</h2>
            <SuccessFeeChart percent={2} cap={400} />
          </section>

          <section className={card} aria-labelledby="payback">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#BEF70A]">024 · Why a few customers are enough</p>
            <h2 id="payback" className="mb-6 mt-2 text-2xl tracking-[-.03em] sm:text-3xl">One contract covers months of the fee</h2>
            <ContractPayback contractValue={12000} monthlyFee={350} />
          </section>

          <section className={card} aria-labelledby="term">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#BEF70A]">033 · Term and exit</p>
            <h2 id="term" className="mb-6 mt-2 text-2xl tracking-[-.03em] sm:text-3xl">A clear way in, and a clear way out</h2>
            <TermSlider />
          </section>

          <section aria-labelledby="rivals">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#BEF70A]">035 + 036 · Who ranks today · Where you stand</p>
            <h2 id="rivals" className="mb-6 mt-2 text-2xl tracking-[-.03em] sm:text-3xl">The competition, in numbers</h2>
            <SampleAudit />
          </section>
        </div>
      </div>
    </main>
  );
}
