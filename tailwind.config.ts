import type { Config } from "tailwindcss";

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
      colors: {
        brand: {
          DEFAULT: "#015F45",
          dark: "#014F39",
          tint: "#EFF6F2",
          soft: "#A8D1C4",
          accent: "#CBD810",
          50: "#EEF6F2",
          100: "#DCEEE8",
          200: "#B9DDD0",
          300: "#8CC4B0",
          400: "#4F9E84",
          500: "#015F45",
          600: "#014F39",
          700: "#063D30",
          800: "#052F25",
          900: "#04241C",
          950: "#021510",
        },
        surface: {
          canvas: "#FAF9F6",
          DEFAULT: "#FFFFFF",
          muted: "#F3F1EC",
          warm: "#F5F3EE",
          mint: "#EEF5F1",
          track: "#E8E6E1",
        },
        accent: {
          light: "#A8D1C4",
          400: "#EAF25A",
          500: "#CBD810",
          600: "#B8C50E",
        },
        ink: {
          DEFAULT: "#151515",
          muted: "rgba(21, 21, 21, 0.65)",
          faint: "rgba(21, 21, 21, 0.50)",
          soft: "#1F2A26",
        },
        js: {
          bg: "#F7F5EF",
          dark: "#0D0D0D",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        roobert: ["Roobertvf", "Arial", "sans-serif"],
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
        "grid-faint":
          "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
