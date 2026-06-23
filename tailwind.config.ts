import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        foreground: "#F8FAFC",
        primary: {
          gold: "#FFD700",
          "gold-dim": "#FFC107",
          orange: "#FF8C00",
          "orange-dim": "#FF6B00",
        },
        navy: {
          light: "#1E1B4B",
          DEFAULT: "#0F172A",
          dark: "#111827",
        },
        accent: {
          gold: "#F59E0B",
          orange: "#F97316",
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(to right, #FFD700, #FFC107)",
        "orange-gradient": "linear-gradient(to right, #FF8C00, #FF6B00)",
        "premium-gradient": "linear-gradient(to right, #FFD700, #FF8C00, #FF6B00)",
        "bg-gradient": "linear-gradient(to bottom right, #0F172A, #1E1B4B, #111827)",
      },
      fontFamily: {
        oswald: ["var(--font-oswald)"],
        inter: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
