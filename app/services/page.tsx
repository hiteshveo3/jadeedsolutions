import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "SEO, Websites, Apps & Google Ads for Local Services",
  description:
    "Explore Jadeed Solutions services for UK & USA local businesses: local SEO, conversion websites, mobile apps and Google Ads — or pay 10% of bookings we generate.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="section relative isolate overflow-hidden bg-white">
        <HeroBackground />
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="Our services"
            title="Growth services for local service businesses"
            description="SEO, websites, apps and Google Ads — built for movers, cleaners, trades and other UK & USA local service companies that need more bookings."
          />
        </div>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <div className="container grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Not sure which service you need?"
        description="Tell us your goals and we'll recommend the right mix. Free consultation, no pressure."
        primaryLabel="Book a free consultation"
      />
    </>
  );
}
