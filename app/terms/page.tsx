import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackground } from "@/components/HeroBackground";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import { partnership, partnershipCopy } from "@/lib/partnership";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for working with ${siteConfig.name} — SEO, websites, apps and growth services.`,
};

export default function TermsPage() {
  return (
    <section className="relative isolate overflow-hidden bg-transparent pb-20 pt-32 sm:pt-36">
      <HeroBackground />
      <div className="container relative z-10 max-w-3xl">
        <Reveal className="flex flex-col gap-5">
          <span className="eyebrow">Legal</span>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-sm text-white/62">Last updated: 4 October 2026</p>
        </Reveal>

        <div className="mt-10 space-y-8 text-white/80">
          <p className="text-sm leading-relaxed">
            By hiring {siteConfig.name} or using this website, you agree to
            these terms. Detailed project scopes are confirmed in writing
            (WhatsApp, email or contract) before work starts.
          </p>

          <div>
            <h2 className="font-display text-xl font-semibold text-white">
              Services
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              We provide digital marketing, SEO, website and app development,
              and related growth services for local businesses. Scope, pricing
              and deliverables are agreed per engagement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-white">
              Pricing &amp; commitment
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>No setup fee on standard plans unless otherwise agreed.</li>
              <li>
                Fixed SEO plans have a <strong>6-month minimum</strong>.
              </li>
              <li>
                The Growth Partnership (performance and tiered deals) is{" "}
                <strong>£0 upfront</strong>: no setup fee, no monthly retainer and no
                minimum spend.
              </li>
              <li>
                Growth Partnership commission is <strong>{partnership.feePercent}% of the
                full customer invoice</strong> after that invoice is paid, for a
                standard local-service agreement. High-value or cost-heavy work
                can use a lower percentage, a service-specific flat rate, or a
                clearly defined profit-based fee agreed in writing.
              </li>
              <li>
                <strong>{partnership.minimumTermMonths}-month initial term</strong>, then
                month to month. Either side can end the partnership with{" "}
                <strong>{partnership.noticeDays} days&apos; written notice</strong> after
                the initial term; the signed agreement covers early termination
                for breach.
              </li>
              <li>{partnershipCopy.attributionWindow}</li>
              <li>{partnershipCopy.existingCustomers}</li>
              <li>{partnershipCopy.repeatCustomers}</li>
              <li>{partnershipCopy.refunds}</li>
              <li>{partnershipCopy.territoryRule}</li>
              <li>{partnershipCopy.regulated}</li>
              <li>{partnershipCopy.ownership}</li>
              <li>
                Paid ads spend is funded by you. We may manage campaigns; we do
                not charge a separate ads management fee unless agreed in
                writing.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-white">
              Results
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              SEO and marketing outcomes depend on competition, your market and
              how quickly assets can be published. We work for measurable
              progress; we do not guarantee specific rankings or booking volumes
              unless a written guarantee says otherwise.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-white">
              Contact
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-[#BEF70A]"
              >
                {siteConfig.email}
              </a>{" "}
              ·{" "}
              <Link href="/privacy" className="font-semibold text-[#BEF70A]">
                Privacy Policy
              </Link>
              <br />
              {siteConfig.addressLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
