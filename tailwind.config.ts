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
        midnight: {
          DEFAULT: "#0F0F0F", // Deep Black - Background
          surface: "#1C1C1C", // Dark Gray - Cards/Surface
        },
        ember: {
          DEFAULT: "#FF6600", // Vibrant Orange - Accent
          hover: "#FF8033", // Lighter orange for hover states
        },
        smoke: {
          DEFAULT: "#F5F5F5", // Off-white - Primary Text
          secondary: "#A3A3A3", // Ash Gray - Secondary Text
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Manrope", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
