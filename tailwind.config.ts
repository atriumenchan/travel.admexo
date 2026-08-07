import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — indigo / electric blue. Kept the "brand" key so every
        // existing component that already uses brand-* automatically picks
        // up the new premium palette without a rename pass.
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        // Accent — cyan / sky, used for secondary highlights & gradients.
        accent: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
        },
        // Neutral off-white surface tones for section backgrounds.
        surface: {
          DEFAULT: "#fafafa",
          muted: "#f5f6f8",
          border: "#eceef2",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "1.75rem",
        "5xl": "2rem",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(120deg, #1e1b4b 0%, #4338ca 32%, #4f46e5 58%, #0891b2 100%)",
        "brand-gradient": "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #06b6d4 100%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(79, 70, 229, 0.35)",
        premium: "0 20px 60px -15px rgba(30, 27, 75, 0.25)",
        card: "0 4px 24px -4px rgba(15, 23, 42, 0.06)",
        "card-hover": "0 16px 40px -8px rgba(15, 23, 42, 0.14)",
      },
      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 1.8s infinite",
        float: "float 8s ease-in-out infinite",
        "float-delayed": "float 10s ease-in-out infinite 1.5s",
        "gradient-x": "gradient-x 8s ease infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(2%, -4%) scale(1.05)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
