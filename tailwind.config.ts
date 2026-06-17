// import { Cormorant_Garamond } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00BFFF", // Sky Blue
        secondary: "#1E3A8A", // Navy Blue Tint
        darkNavy: "#000080", // Dark Navy Blue
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        playfair: ["Playfair Display"],
      },
    },
  },
  plugins: [],
};

export default config;
