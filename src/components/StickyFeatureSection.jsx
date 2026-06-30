import React, { useEffect, useRef, useState } from "react";

const featureCards = [
  {
    title: "Create at the speed of thought",
    body:
      "Tell Jadeed Solutions your idea, and watch it transform into a working digital system with all the building blocks already in place, from beautifully designed pages to user flows and one-click integrations.",
    cta: "Start building",
    image:
      "https://static.wixstatic.com/media/dea07e_125faa410ab84732b15a14d6408fa704~mv2.jpg/v1/fill/w_1020,h_1320,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Create%20at%20the%20speed%20of%20thought%20-%20Desktop.jpg",
    alt: "Task management interface showing grouped task boards for Product, Marketing, and Design."
  },
  {
    title: "A backend that builds with you",
    body:
      "While you shape the idea, Jadeed Solutions sets up the logic and infrastructure so your website, portal, CRM, or app works out of the box with data, permissions, and workflows planned behind the scenes.",
    cta: "See the logic",
    image:
      "https://static.wixstatic.com/media/dea07e_3e3440eba62a4e0280547c9c58f1c31a~mv2.jpg/v1/fill/w_1020,h_1320,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/A%20backend%20that%20builds%20with%20you%20-%20Desktop.jpg",
    alt: "Builder interface displaying generated authentication, database, roles, and product catalog logic."
  },
  {
    title: "Ready to use, instantly",
    body:
      "Your platform comes with launch planning, analytics, hosting direction, and custom domain readiness, so when the system is approved, the path to going live is already clear.",
    cta: "Launch faster",
    image:
      "https://static.wixstatic.com/media/dea07e_01a647f9a0c244ce9d4f3cd3289bf081~mv2.jpg/v1/fill/w_1020,h_1320,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Ready%20to%20use%2C%20instantly%20-%20Desktop.jpg",
    alt: "Learning dashboard displayed inside a browser with a custom domain URL."
  },
  {
    title: "One platform for every workflow",
    body:
      "After launch, connected reporting and automation help you improve what matters next, from leads and bookings to follow-ups, campaigns, content, and daily operations.",
    cta: "Grow the system",
    image:
      "https://static.wixstatic.com/media/dea07e_2c9ac0357d0b460eb02073c3740626f1~mv2.jpg/v1/fill/w_1020,h_1320,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/One%20platform_%20Any%20agent%20-%20Desktop.jpg",
    alt: "Settings interface displaying automatic and manual AI mode selection options."
  }
];

export function StickyFeatureSection() {
  const [activeCard, setActiveCard] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (activeEntry) {
          setActiveCard(Number(activeEntry.target.dataset.index));
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mockup-feature-section" aria-label="Jadeed Solutions feature mockup">
      <div className="mockup-feature-stack">
        {featureCards.map((card, index) => (
          <article
            className={`mockup-feature-card ${activeCard === index ? "is-active" : ""}`}
            data-index={index}
            key={card.title}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
          >
            <div className="mockup-copy">
              <div className="mockup-kicker">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <em>/</em>
                <span>{String(featureCards.length).padStart(2, "0")}</span>
                <h2>{card.title}</h2>
              </div>

              <p>{card.body}</p>

              <a href="/contact/" className="mockup-cta">
                {card.cta}
              </a>
            </div>

            <div className="mockup-media">
              <img src={card.image} alt={card.alt} loading="lazy" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
