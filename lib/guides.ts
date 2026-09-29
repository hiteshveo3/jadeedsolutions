import { plumbersGuide } from "@/lib/guide-content/plumbers";
import { cleanersGuide } from "@/lib/guide-content/cleaners";
import { choosingGuide } from "@/lib/guide-content/choosing";

export type Guide = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  intro: string;
  relatedIndustry?: string;
  published: string;
  updated: string;
  /** Section bodies are Markdown (GFM). */
  sections: { title: string; body: string }[];
  /** Answers are Markdown. */
  faqs: { question: string; answer: string }[];
};

export const guides: Guide[] = [plumbersGuide, cleanersGuide, choosingGuide];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

/** Words in a guide's sections and FAQs, ignoring Markdown link targets and syntax. */
export function guideWordCount(guide: Guide) {
  const text = [guide.intro, ...guide.sections.flatMap((s) => [s.title, s.body]), ...guide.faqs.flatMap((f) => [f.question, f.answer])]
    .join(" ")
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/[#>*_|`]/g, " ");
  return text.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length;
}
