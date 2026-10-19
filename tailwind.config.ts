import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/* Every whole-number opacity (white/12, white/72 …) — pages use many values off
   Tailwind's default scale, which otherwise generate no CSS at all. */
const opacity = Object.fromEntries(Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)]));

/* No pure white on dark (owner, 5 Oct 2026: exact white strains the eyes). */
const WHITE = "#EEF2E7";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      opacity,
      /* A missing border colour falls back to a faint line, never light grey. */
      borderColor: { DEFAULT: "rgba(238, 242, 231, 0.08)" },
      fontSize: {
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["13px", { lineHeight: "1.5" }],
        base: ["15px", { lineHeight: "1.6" }],
        md: ["16px", { lineHeight: "1.6" }],
        lg: ["18px", { lineHeight: "1.5" }],
        xl: ["20px", { lineHeight: "1.4" }],
        "2xl": ["24px", { lineHeight: "1.3" }],
        "3xl": ["30px", { lineHeight: "1.2" }],
        "4xl": ["38px", { lineHeight: "1.15" }],
        "5xl": ["48px", { lineHeight: "1.1" }],
        "6xl": ["58px", { lineHeight: "1.08" }],
      },
      // Full-dark brand system (owner, 2026-10-04): every section sits on the
      // brand radial gradient; lime is the only accent. Old token names are
      // remapped so pages that still use them render correctly on dark.
      colors: {
        white: WHITE,
        forest: { glow: "#0B561C", DEFAULT: "#06301D", deep: "#051B1E" },
        neon: { DEFAULT: "#BEF70A", hover: "#ABDE09", ink: "#0B1F12" },
        brand: {
          DEFAULT: "#BEF70A",
          dark: "#ABDE09",
          tint: "rgba(190, 247, 10, 0.08)",
          soft: "rgba(190, 247, 10, 0.35)",
          accent: "#BEF70A",
          50: "rgba(190, 247, 10, 0.06)",
          100: "rgba(190, 247, 10, 0.10)",
          200: "rgba(190, 247, 10, 0.25)",
          300: "rgba(190, 247, 10, 0.40)",
          400: "#D2FA5A",
          500: "#BEF70A",
          600: "#ABDE09",
          700: "#0B561C",
          800: "#06301D",
          900: "#051B1E",
          950: "#03100F",
        },
        surface: {
          canvas: "rgba(255, 255, 255, 0.03)",
          DEFAULT: "rgba(255, 255, 255, 0.06)",
          muted: "rgba(255, 255, 255, 0.05)",
          warm: "rgba(255, 255, 255, 0.05)",
          mint: "rgba(190, 247, 10, 0.08)",
          track: "rgba(255, 255, 255, 0.16)",
        },
        accent: {
          light: "rgba(190, 247, 10, 0.35)",
          400: "#D2FA5A",
          500: "#BEF70A",
          600: "#ABDE09",
        },
        ink: {
          DEFAULT: WHITE,
          muted: "rgba(255, 255, 255, 0.72)",
          faint: "rgba(255, 255, 255, 0.56)",
          soft: "rgba(255, 255, 255, 0.86)",
        },
        js: {
          bg: "#06301D",
          dark: WHITE,
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        roobert: ["Roobertvf", "Arial", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        scroll: "scroll 30s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
      // Brand rule: no shadows anywhere. Every shadow utility resolves to none.
      boxShadow: {
        sm: "none",
        DEFAULT: "none",
        md: "none",
        lg: "none",
        xl: "none",
        "2xl": "none",
        inner: "none",
        soft: "none",
        glow: "none",
      },
      backgroundImage: {
        "brand-grad": "radial-gradient(120% 120% at 50% 0%, #0B561C 0%, #06301D 48%, #051B1E 100%)",
        "grid-faint":
          "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [typography],
};

export default config;
