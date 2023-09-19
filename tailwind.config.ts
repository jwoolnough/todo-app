import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          400: "#abb1ca",
          700: "#31313c",
          800: "#27272d",
          900: "#161618",
          950: "#050505",
        },
        green: {
          "50": "#f3faf4",
          "100": "#e4f4e7",
          "200": "#c9e9d1",
          "300": "#9fd6ae",
          "400": "#6eba83",
          "500": "#50ac69",
          "600": "#38814c",
          "700": "#2f663f",
          "800": "#295235",
          "900": "#23442d",
          "950": "#0f2416",
        },
      },
      fontFamily: {
        primary: ["var(--font-jones)", "sans-serif"],
      },
      borderColor: {
        DEFAULT: "#1d1d21",
      },
    },
  },
  plugins: [],
} satisfies Config;
