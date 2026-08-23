/**
 * Local-service industries for the Growth Partnership calculator.
 * Defaults are typical UK/USA ballpark job values in GBP (display converts).
 * Commission stays hardcoded at 10% in the UI.
 */

export type IndustryCategoryId =
  | "home-trades"
  | "cleaning-property"
  | "moving-logistics"
  | "outdoor"
  | "auto-mobile"
  | "beauty-personal"
  | "health-local"
  | "food-hospitality"
  | "pets"
  | "events-other";

export type IndustryCategory = {
  id: IndustryCategoryId;
  label: string;
};

export type CalcIndustry = {
  slug: string;
  label: string;
  category: IndustryCategoryId;
  /** Typical bookings/mo from marketing at a small firm */
  defaultBookings: number;
  /** Typical average job value (GBP) */
  defaultAvgJob: number;
};

export const industryCategories: IndustryCategory[] = [
  { id: "home-trades", label: "Home trades" },
  { id: "cleaning-property", label: "Cleaning & property" },
  { id: "moving-logistics", label: "Moving & logistics" },
  { id: "outdoor", label: "Outdoor & exterior" },
  { id: "auto-mobile", label: "Auto & mobile" },
  { id: "beauty-personal", label: "Beauty & personal care" },
  { id: "health-local", label: "Health & local care" },
  { id: "food-hospitality", label: "Food & hospitality" },
  { id: "pets", label: "Pets" },
  { id: "events-other", label: "Events & other" },
];

export const calcIndustries: CalcIndustry[] = [
  // —— Home trades (12) ——
  { slug: "plumbers", label: "Plumbers", category: "home-trades", defaultBookings: 8, defaultAvgJob: 150 },
  { slug: "electricians", label: "Electricians", category: "home-trades", defaultBookings: 7, defaultAvgJob: 180 },
  { slug: "hvac", label: "HVAC / heating & cooling", category: "home-trades", defaultBookings: 6, defaultAvgJob: 220 },
  { slug: "boiler-engineers", label: "Boiler engineers", category: "home-trades", defaultBookings: 6, defaultAvgJob: 200 },
  { slug: "roofers", label: "Roofers", category: "home-trades", defaultBookings: 4, defaultAvgJob: 450 },
  { slug: "carpenters", label: "Carpenters / joiners", category: "home-trades", defaultBookings: 5, defaultAvgJob: 280 },
  { slug: "painters", label: "Painters & decorators", category: "home-trades", defaultBookings: 5, defaultAvgJob: 350 },
  { slug: "tilers", label: "Tilers", category: "home-trades", defaultBookings: 5, defaultAvgJob: 300 },
  { slug: "locksmiths", label: "Locksmiths", category: "home-trades", defaultBookings: 10, defaultAvgJob: 90 },
  { slug: "handymen", label: "Handyman services", category: "home-trades", defaultBookings: 10, defaultAvgJob: 100 },
  { slug: "appliance-repair", label: "Appliance repair", category: "home-trades", defaultBookings: 8, defaultAvgJob: 120 },
  { slug: "flooring", label: "Flooring installers", category: "home-trades", defaultBookings: 4, defaultAvgJob: 400 },

  // —— Cleaning & property (7) ——
  { slug: "house-cleaning", label: "House cleaning", category: "cleaning-property", defaultBookings: 15, defaultAvgJob: 80 },
  { slug: "office-cleaning", label: "Office / commercial cleaning", category: "cleaning-property", defaultBookings: 8, defaultAvgJob: 200 },
  { slug: "end-of-tenancy", label: "End of tenancy cleaning", category: "cleaning-property", defaultBookings: 10, defaultAvgJob: 150 },
  { slug: "carpet-cleaning", label: "Carpet / upholstery cleaning", category: "cleaning-property", defaultBookings: 12, defaultAvgJob: 95 },
  { slug: "window-cleaning", label: "Window cleaning", category: "cleaning-property", defaultBookings: 14, defaultAvgJob: 70 },
  { slug: "pest-control", label: "Pest control", category: "cleaning-property", defaultBookings: 9, defaultAvgJob: 130 },
  { slug: "property-maintenance", label: "Property maintenance", category: "cleaning-property", defaultBookings: 7, defaultAvgJob: 180 },

  // —— Moving & logistics (5) ——
  { slug: "removals", label: "Removals / movers", category: "moving-logistics", defaultBookings: 8, defaultAvgJob: 150 },
  { slug: "man-and-van", label: "Man & van", category: "moving-logistics", defaultBookings: 12, defaultAvgJob: 90 },
  { slug: "furniture-assembly", label: "Furniture assembly", category: "moving-logistics", defaultBookings: 14, defaultAvgJob: 75 },
  { slug: "storage", label: "Storage services", category: "moving-logistics", defaultBookings: 6, defaultAvgJob: 120 },
  { slug: "courier-local", label: "Local courier / delivery", category: "moving-logistics", defaultBookings: 20, defaultAvgJob: 45 },

  // —— Outdoor & exterior (5) ——
  { slug: "landscaping", label: "Landscaping", category: "outdoor", defaultBookings: 5, defaultAvgJob: 350 },
  { slug: "lawn-care", label: "Lawn care / gardening", category: "outdoor", defaultBookings: 12, defaultAvgJob: 60 },
  { slug: "tree-surgery", label: "Tree surgery", category: "outdoor", defaultBookings: 4, defaultAvgJob: 400 },
  { slug: "fencing", label: "Fencing", category: "outdoor", defaultBookings: 5, defaultAvgJob: 320 },
  { slug: "pressure-washing", label: "Pressure washing", category: "outdoor", defaultBookings: 10, defaultAvgJob: 110 },

  // —— Auto & mobile (5) ——
  { slug: "mobile-mechanics", label: "Mobile mechanics", category: "auto-mobile", defaultBookings: 10, defaultAvgJob: 140 },
  { slug: "car-detailing", label: "Car detailing / valeting", category: "auto-mobile", defaultBookings: 12, defaultAvgJob: 100 },
  { slug: "towing", label: "Towing / roadside", category: "auto-mobile", defaultBookings: 15, defaultAvgJob: 85 },
  { slug: "tyre-fitting", label: "Mobile tyre fitting", category: "auto-mobile", defaultBookings: 14, defaultAvgJob: 90 },
  { slug: "windscreen", label: "Windscreen repair", category: "auto-mobile", defaultBookings: 11, defaultAvgJob: 120 },

  // —— Beauty & personal (4) ——
  { slug: "hair-salons", label: "Hair salons", category: "beauty-personal", defaultBookings: 40, defaultAvgJob: 45 },
  { slug: "barbers", label: "Barbers", category: "beauty-personal", defaultBookings: 50, defaultAvgJob: 25 },
  { slug: "beauty-salons", label: "Beauty salons", category: "beauty-personal", defaultBookings: 30, defaultAvgJob: 55 },
  { slug: "mobile-beauty", label: "Mobile beauty / nails", category: "beauty-personal", defaultBookings: 20, defaultAvgJob: 50 },

  // —— Health & local care (4) ——
  { slug: "dentists", label: "Dentists (local)", category: "health-local", defaultBookings: 25, defaultAvgJob: 120 },
  { slug: "physio", label: "Physiotherapy clinics", category: "health-local", defaultBookings: 30, defaultAvgJob: 65 },
  { slug: "chiropractors", label: "Chiropractors", category: "health-local", defaultBookings: 28, defaultAvgJob: 70 },
  { slug: "home-care", label: "Home care / carers", category: "health-local", defaultBookings: 10, defaultAvgJob: 200 },

  // —— Food & hospitality (4) ——
  { slug: "restaurants", label: "Restaurants", category: "food-hospitality", defaultBookings: 80, defaultAvgJob: 35 },
  { slug: "cafes", label: "Cafés", category: "food-hospitality", defaultBookings: 100, defaultAvgJob: 12 },
  { slug: "pizza-takeaway", label: "Pizza / takeaway", category: "food-hospitality", defaultBookings: 90, defaultAvgJob: 22 },
  { slug: "catering", label: "Local catering", category: "food-hospitality", defaultBookings: 8, defaultAvgJob: 280 },

  // —— Pets (3) ——
  { slug: "dog-grooming", label: "Dog grooming", category: "pets", defaultBookings: 25, defaultAvgJob: 50 },
  { slug: "pet-sitting", label: "Pet sitting / walking", category: "pets", defaultBookings: 30, defaultAvgJob: 25 },
  { slug: "mobile-vet", label: "Mobile vet / pet care", category: "pets", defaultBookings: 12, defaultAvgJob: 90 },

  // —— Events & other (5) ——
  { slug: "photographers", label: "Local photographers", category: "events-other", defaultBookings: 6, defaultAvgJob: 350 },
  { slug: "dj-entertainment", label: "DJs / entertainment", category: "events-other", defaultBookings: 5, defaultAvgJob: 400 },
  { slug: "party-hire", label: "Party / event hire", category: "events-other", defaultBookings: 6, defaultAvgJob: 250 },
  { slug: "tutors", label: "Tutors (local)", category: "events-other", defaultBookings: 20, defaultAvgJob: 40 },
  { slug: "security", label: "Security / guarding", category: "events-other", defaultBookings: 8, defaultAvgJob: 220 },
];

export const DEFAULT_INDUSTRY_SLUG = "plumbers";

export function getCalcIndustry(slug: string): CalcIndustry {
  return (
    calcIndustries.find((i) => i.slug === slug) ??
    calcIndustries.find((i) => i.slug === DEFAULT_INDUSTRY_SLUG)!
  );
}

export function industriesByCategory(categoryId: IndustryCategoryId) {
  return calcIndustries.filter((i) => i.category === categoryId);
}

/** Hardcoded partnership rate — do not change without business approval */
export const PARTNERSHIP_COMMISSION = 0.1;

export const FIXED_SEO_GBP = 100;
export const TYPICAL_RETAINER_GBP = 1000;

export const BOOKINGS_MIN = 0;
export const BOOKINGS_MAX = 120;
export const JOB_MIN = 10;
export const JOB_MAX = 800;

export type SizePreset = {
  id: string;
  label: string;
  /** Multiplier on industry default bookings */
  bookingsFactor: number;
  /** Multiplier on industry default avg job */
  jobFactor: number;
};

export const sizePresets: SizePreset[] = [
  { id: "solo", label: "Solo / quiet", bookingsFactor: 0.5, jobFactor: 0.85 },
  { id: "typical", label: "Typical", bookingsFactor: 1, jobFactor: 1 },
  { id: "busy", label: "Busy crew", bookingsFactor: 1.6, jobFactor: 1.15 },
];

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function partnershipMath(bookings: number, avgJobGbp: number) {
  const revenue = bookings * avgJobGbp;
  const fee = revenue * PARTNERSHIP_COMMISSION;
  const keep = revenue - fee;
  const breakEvenBookings =
    avgJobGbp > 0
      ? Math.ceil(TYPICAL_RETAINER_GBP / (avgJobGbp * PARTNERSHIP_COMMISSION))
      : 0;
  return {
    revenue,
    fee,
    keep,
    sixKeep: keep * 6,
    sixFee: fee * 6,
    breakEvenBookings,
    seoMonthly: FIXED_SEO_GBP,
    retainerMonthly: TYPICAL_RETAINER_GBP,
  };
}
