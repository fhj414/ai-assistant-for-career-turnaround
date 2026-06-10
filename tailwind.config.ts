import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        muted: "#667085",
        line: "#E4E7EC",
        brand: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          600: "#059669",
          700: "#047857"
        },
        accent: {
          500: "#7C3AED",
          600: "#6D28D9"
        },
        warning: {
          500: "#F59E0B",
          600: "#D97706"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 24, 40, 0.08)",
        line: "0 0 0 1px rgba(16, 24, 40, 0.06)"
      },
      backgroundImage: {
        "app-grid":
          "linear-gradient(rgba(16,24,40,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(16,24,40,0.055) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
