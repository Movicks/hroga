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
    },
  },
  plugins: [],
};

export default config;
