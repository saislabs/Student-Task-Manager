import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          950: "#070A12",
          900: "#0B0F19",
          850: "#0E1424",
          800: "#141C2E",
          750: "#1A233A",
          700: "#222D4A",
          600: "#334168",
        },
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          purple: "#8B5CF6",
          electric: "#3B82F6",
          cyan: "#06B6D4",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(99, 102, 241, 0.3)",
        "glow-purple": "0 0 25px -5px rgba(139, 92, 246, 0.3)",
        "glow-sm": "0 0 15px -3px rgba(99, 102, 241, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
