import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lamaSky: "#366eb2",
        lamaSkyLight: "#5989c5",
        lamaPurple: "#cfceff",
        lamaPurpleLight: "#f1f0ff",
        lamaYellow: "#ffcd05",
        lamaYellowLight: "#d8bb3c",
      },
    },
  },
  plugins: [],
};
export default config;
