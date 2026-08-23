import { LinkButton } from "./Button";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/lib/site";

export function CTASection({
  title = "Ready for more booked jobs?",
  description = "Tell us your city and what you sell. We’ll outline a free plan — website, Google growth, app or 10% partnership.",
  primaryLabel = "WhatsApp us",
  primaryHref = siteConfig.whatsappHref,
  secondaryLabel = "See pricing",
  secondaryHref = "/pricing",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-3xl bg-brand-500 px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton
                href={primaryHref}
                size="lg"
                variant="white"
                className="w-full sm:w-auto"
              >
                {primaryLabel}
              </LinkButton>
              <LinkButton
                href={secondaryHref}
                size="lg"
                variant="glass"
                className="w-full sm:w-auto"
              >
                {secondaryLabel}
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
