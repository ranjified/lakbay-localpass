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
        lakbay: {
          green: "#0f6f52",
          leaf: "#2f8f4e",
          deep: "#173326",
          gold: "#e9a427",
          fiesta: "#c34a2c",
          clay: "#9f4f2f",
          paper: "#f7efd8",
          cream: "#fff7ed",
          river: "#1f7a8c"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(67, 43, 25, 0.12)",
        stamp: "0 14px 0 rgba(159, 79, 47, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
