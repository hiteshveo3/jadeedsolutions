# Pricing Page Design QA

## Evidence

- Source visual truth: `qa-alpha-case-study-desktop.png` for Jadeed color direction; `clay-pricing-reference-top.png` and `clay-pricing-reference-cta.png` for layout rhythm and CTA composition.
- Implementation: `qa-pricing-refined-desktop.png`, `qa-pricing-refined-faq.png`, `qa-pricing-refined-mobile.png`, and `qa-pricing-refined-faq-mobile.png`.
- Desktop viewport: 1440 × 1000 CSS px, device scale factor 1.
- Mobile viewport: 375 × 844 CSS px, device scale factor 1.
- State: pricing hero at rest; FAQ first item expanded; commercial-model tabs and currency controls tested.
- Console: no browser console errors.

## Findings

- No actionable P0, P1, or P2 findings remain.
- Typography: DM Sans hierarchy, display weight, wrapping, and compact UI labels match the Jadeed system while adopting Clay's larger editorial scale.
- Spacing and layout: desktop uses a Clay-like split hero, large whitespace, compact segmented model selector, two-column FAQ, and responsive single-column mobile flow without horizontal overflow.
- Colors: reference screenshots were pixel-sampled and applied exactly: warm canvas `#F7F5EF`, mint panels `#DCEEE8`, white cards `#FFFFFF`, lime accent `#CBD810`, plus the established Jadeed deep green. Browser-computed FAQ background verified as `rgb(220, 238, 232)`.
- Final CTA: the decorative landscape was intentionally removed; the conversion close now uses a clean black primary and outlined secondary action on the warm canvas.
- Copy: all Jadeed pricing, attribution, calculator, FAQ, and CTA content is preserved.
- Interaction: currency selector, model tabs, animated calculator values, expandable comparison, and 700ms FAQ plus/minus controls operate correctly with ARIA state updates.

## Comparison History

1. Earlier pricing implementation used a pale, low-contrast palette and a narrow tab strip that felt unlike the selected Alpha/Clay direction.
2. Applied the Alpha deep-green/lime hero, cream financial panel, three-card model selector, white page canvas, and Clay-style split FAQ.
3. Replaced the FAQ chevron with Hugeicons plus/minus controls and verified expanded/collapsed states on desktop and mobile.
4. Post-fix captures show the intended palette, hierarchy, responsive behavior, and interaction states with no material mismatch.
5. Final palette pass replaced nearby approximations with the exact sampled screenshot values and was re-captured in `qa-pricing-exact-palette.png` / `qa-pricing-exact-faq.png`.
6. Focused polish removed the weak acquisition-pipeline block, retained a concise Field Operations add-on, removed the CTA image, and verified a compact 288px mobile model switcher with zero page overflow.
7. Flat-layout pass removed nested card surfaces and shadows from the model panel, recommender, calculator, margin and governance areas. Mobile diagnostic options now render as border-separated rows; browser-computed radii are `0px`, shadows are `none`, and the 375px viewport has no horizontal overflow.
8. Responsive hierarchy correction restores useful cards only from tablet/desktop breakpoints upward. At 1440px the selected pricing model is a 28px-radius white long card with a mint `#DCEEE8` calculation panel; at 375px both surfaces compute to transparent, `0px` radius and no shadow, with no horizontal overflow.
9. Calculator redesign follows the supplied pricing-tool references: desktop uses a 32px deep-green shell, white input workspace and 24px mint recommendation panel; the result area now exposes revenue, commercial-fit guidance, indicative fee and retained revenue as distinct decisions. Mobile removes the outer shell (`0px`, transparent), keeps a full-width mint result band, and has no horizontal overflow. Increment controls and animated totals were re-tested after hydration (`£12,000` → `£12,750`).
10. Added three reference-matched editorial sections: founder proof + benefits/tags, centered trust infrastructure with four supporting capabilities, and a capability/evidence split using the verified Alpha Movers case study. All three render at desktop, stack at mobile, and the 375px viewport remains exactly 375px wide with no overflow. Three pricing tier cards also remain present and console QA is clean.

## Focused Region Comparison

- Hero: compared Alpha case-study green/lime hierarchy and Clay pricing split composition against the rebuilt pricing hero.
- FAQ: compared Clay's spacious grouped FAQ treatment against the implementation's two-column heading and rounded accordion stack.
- Mobile: inspected hero wrapping, control stacking, card widths, FAQ touch targets, and opened answer state at 375 px.

## Follow-up Polish

- P3: the financial example could gain a bespoke small illustration in a future iteration, but it is intentionally data-led and does not block fidelity or usability.

final result: passed
