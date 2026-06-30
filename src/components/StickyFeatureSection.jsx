import React from "react";
import { BarChart3, Bot, Globe2, Layers3 } from "lucide-react";
import { ContentBlock } from "./ContentBlock";
import { MediaPane } from "./MediaPane";

const stickyFeatures = [
  {
    title: "Create at the speed of thought",
    body: "Tell Jadeed Solutions your idea, and watch it turn into a working digital system with the building blocks already in place, from beautifully designed pages to customer flows and one-click integrations.",
    kicker: "Jadeed Tasks",
    prompt: "Create a task management app for my operations team",
    accent: "dark",
    alt: "Dark task board interface for a generated business workflow",
    icon: Layers3
  },
  {
    title: "A backend that builds with you",
    body: "While you shape the offer, Jadeed Solutions sets up the logic and infrastructure so your website, CRM, portal, or app works out of the box. User logins, data storage, permissions, and workflows are planned behind the scenes.",
    kicker: "Cartly",
    prompt: "Build an e-commerce backend with purchase history and inventory data",
    accent: "orange",
    alt: "Backend generation card with database and permission tasks",
    icon: Bot
  },
  {
    title: "Ready to use, instantly",
    body: "Your platform comes with hosting, analytics, and custom domain planning so when your system is ready to go live, the launch path is already clear. We remove the messy handoff between design, development, and deployment.",
    kicker: "learn-it.jadeed.app",
    prompt: "Launch a course portal with analytics and student dashboards",
    accent: "yellow",
    cta: "Start building",
    alt: "Published learning portal preview with browser chrome and content cards",
    icon: Globe2
  },
  {
    title: "Improve with every workflow",
    body: "After launch, reporting and automation show what needs attention next. Leads, campaigns, content, bookings, and follow-ups can be connected into one simple operating system that grows with the business.",
    kicker: "Growth OS",
    prompt: "Connect leads, bookings, reports, and follow-ups into one system",
    accent: "blue",
    alt: "Analytics and automation workspace for connected business operations",
    icon: BarChart3
  }
];

export function StickyFeatureSection() {
  return (
    <section className="sticky-feature-section reveal-section" aria-label="How Jadeed Solutions builds digital systems">
      <div className="sticky-feature-layout">
        {stickyFeatures.map((feature, index) => (
          <div className="feature-story-card" key={feature.title}>
            <ContentBlock
              feature={feature}
              index={index}
              total={stickyFeatures.length}
            />
            <MediaPane feature={feature} />
          </div>
        ))}
      </div>
    </section>
  );
}
