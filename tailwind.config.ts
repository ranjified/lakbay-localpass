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
          green: "#2B6D4F",
          leaf: "#4D8B68",
          deep: "#123224",
          blue: "#00477E",
          gold: "#F4A623",
          fiesta: "#00477E",
          clay: "#416B5B",
          paper: "#F7F1E4",
          cream: "#FFFAF0",
          river: "#0B5E8E"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 71, 126, 0.12)",
        stamp: "0 14px 0 rgba(43, 109, 79, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
