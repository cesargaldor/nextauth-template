import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        motomanotheme: {
          primary: "#2e86de",
          secondary: "#ff4b00",
          accent: "#d70000",
          neutral: "#262626",
          "base-100": "#ffffff",
          info: "#008bc3",
          success: "#00b26e",
          warning: "#ff8e00",
          error: "#f13842",
        },
      },
    ],
  },
};
export default config;
