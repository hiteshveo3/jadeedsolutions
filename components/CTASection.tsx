import { LinkButton } from "./Button";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/lib/site";
import Image from "next/image";

export function CTASection({
  title = "Ready for more booked jobs?",
  description = "Tell us your city and what you sell. We’ll outline a free plan — website, Google growth, app or 10% partnership.",
  primaryLabel = "WhatsApp us",
  primaryHref = siteConfig.whatsappHref,
  secondaryLabel = "See pricing",
  secondaryHref = "/pricing",
  variant = "brand",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "brand" | "landscape";
}) {
  if (variant === "landscape") {
    return (
      <section className="overflow-hidden bg-white pt-16 sm:pt-24">
        <Reveal className="relative text-center">
          <div className="relative z-10 mx-auto max-w-3xl px-6 pb-10 sm:pb-14">
            <h2 className="font-display text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {description}
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton
                href={primaryHref}
                size="lg"
                className="w-full bg-black text-white hover:bg-brand-500 sm:w-auto"
              >
                {primaryLabel}
              </LinkButton>
              <LinkButton
                href={secondaryHref}
                size="lg"
                variant="secondary"
                className="w-full border-ink bg-white text-ink sm:w-auto"
              >
                {secondaryLabel}
              </LinkButton>
            </div>
          </div>
          <div className="relative h-[250px] w-full sm:h-[330px] lg:h-[400px]">
            <Image
              src="/jadeed-growth-landscape.png"
              alt="A growing local service business landscape"
              fill
              sizes="100vw"
              className="object-cover object-[center_45%]"
            />
          </div>
        </Reveal>
      </section>
    );
  }

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
