import { vsFiverr } from "@/lib/comparison-content/fiverr";
import { vsUpwork } from "@/lib/comparison-content/upwork";
import { vsHostinger } from "@/lib/comparison-content/hostinger";
import { vsMarketingAgency } from "@/lib/comparison-content/marketing-agency";

export type Comparison = {
  slug: string;
  navLabel: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  /** Who we are compared with, e.g. "Fiverr freelancers". */
  competitor: string;
  /** Short column label for the comparison table, e.g. "Fiverr". */
  competitorShort: string;
  published: string;
  updated: string;
  intro: string;
  /** One-paragraph honest verdict (Markdown). */
  verdict: string;
  chooseThemIf: string[];
  chooseUsIf: string[];
  /** [what is compared, the alternative, Jadeed] */
  table: [string, string, string][];
  /** Section bodies are Markdown (GFM). */
  sections: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const comparisons: Comparison[] = [vsFiverr, vsUpwork, vsHostinger, vsMarketingAgency];

export function getComparison(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}
