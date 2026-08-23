import type { Metadata } from "next";
import Link from "next/link";
import { GrowthCheck } from "@/components/tools/GrowthCheck";
import { CTASection } from "@/components/CTASection";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Free Growth Check — Website, Google, App & 10% Partnership",
  description:
    "Free 5-question Growth Check for local service businesses. See if you need a website, SEO, app, ads — or Jadeed’s 10% Growth Partnership.",
};

export default function GrowthCheckPage() {
  return (
    <div className="bg-slate-50 pb-20 pt-12 sm:pt-16">
      <div className="container max-w-3xl">
        <GrowthCheck />
        <p className="mt-8 text-center text-sm text-slate-500">
          Also try the{" "}
          <Link
            href="/pricing#partnership-calculator"
            className="font-semibold text-brand-500"
          >
            10% pricing calculator
          </Link>
          {" · "}
          <Link href="/guides" className="font-semibold text-brand-500">
            Guides
          </Link>
          {" · "}
          <Link href="/compare" className="font-semibold text-brand-500">
            Compare Jadeed
            <HugeiconsIcon icon={ArrowRightIcon} size={14} className="ml-0.5 inline" />
          </Link>
        </p>
      </div>
      <CTASection
        title="Want a human take on your results?"
        description="WhatsApp us your city and trade — we’ll outline a free plan across website, SEO, apps and ads."
      />
    </div>
  );
}
