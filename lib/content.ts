export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Monthly SEO fees were hard for us. Paying 10% after bookings made sense — and Jadeed built the website, app, SEO and ads as one team.",
    name: "Abdullah Bin Mustafa",
    role: "Alpha Movers · London",
    avatar: "/case-studies/alpha-movers/logo-alpha.png",
  },
  {
    quote:
      "Clear communication and solid work. They treated our project like it mattered — on time and professional.",
    name: "ASIF MASIH",
    role: "Google review · 5.0",
    avatar: "/placeholders/add-image.svg",
  },
];

export type WhyUsItem = {
  title: string;
  description: string;
};

export const whyUs: WhyUsItem[] = [
  {
    title: "Bookings, not buzzwords",
    description:
      "We care about calls and booked jobs. Reports exist to prove progress — not to fill a slide deck.",
  },
  {
    title: "Website, Google, apps & ads together",
    description:
      "One team builds what you need. You can buy SEO, a website or an app on their own — or grow on 10% of bookings.",
  },
  {
    title: "Straight talk",
    description:
      "Small team (~10 clients). You’ll know what’s happening, what’s working, and what isn’t.",
  },
  {
    title: "Fair pricing",
    description:
      "No setup fee. Fixed plans from £100/mo SEO — or pay 10% only on bookings we generate. Six-month minimum.",
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const homeFaqs: Faq[] = [
  {
    question: "Who is Jadeed Solutions for?",
    answer:
      "Local service businesses in the UK and USA — plumbers, cleaners, movers, trades and similar. If customers find you on Google, we can help you win more of those jobs.",
  },
  {
    question: "Do I have to take the 10% partnership?",
    answer:
      "No. You can buy SEO, a website or an app as fixed packages. The 10% model is for owners who want the full growth setup with fees tied to bookings we bring in.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Websites can go live quickly. SEO usually needs a few months to compound — that’s why SEO plans have a 6-month minimum. We’ll set expectations for your market on the first call.",
  },
  {
    question: "Do you force Google Ads?",
    answer:
      "No. Most of our clients grow with organic search first. If you want ads later, you pay the ad spend; we can set them up and manage them.",
  },
];
