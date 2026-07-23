import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our digital marketing services: SEO, web development, app development, and paid digital advertising including Google Ads.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="section relative isolate overflow-hidden bg-white">
        <HeroBackground />
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="Our services"
            title="Full-service digital growth, under one roof"
            description="Whether you need to rank higher, launch a website or app, or run profitable ad campaigns — we've got a team of specialists ready to help."
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
