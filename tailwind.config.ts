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
      colors: {
        brand: {
          50: "#fff4ef",
          100: "#ffe4d8",
          200: "#ffc7b0",
          300: "#ffa585",
          400: "#ff875c",
          500: "#ff6b35",
          600: "#ef5119",
          700: "#c63f12",
          800: "#9e3415",
          900: "#7f2d15",
          950: "#451208",
        },
        accent: {
          400: "#ffb27a",
          500: "#ff9147",
          600: "#f46a1f",
        },
        ink: {
          DEFAULT: "#1c1613",
          soft: "#2c231d",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(26, 20, 16, 0.04), 0 1px 3px rgba(26, 20, 16, 0.06)",
        glow: "0 1px 2px rgba(26, 20, 16, 0.04), 0 1px 3px rgba(26, 20, 16, 0.06)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
      },
      keyframes: {
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
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
