import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        3: "3px",
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      colors: {
        spacing: {
          0.5: "0.125rem",
          1.5: "0.375rem",
        },
        slate: {
          400: "#abb1ca",
          700: "#41414c",
          800: "#27272d",
          900: "#161618",
          950: "#050505",
        },
        green: {
          50: "#f3faf4",
          100: "#e4f4e7",
          200: "#c9e9d1",
          300: "#9fd6ae",
          400: "#6eba83",
          500: "#50ac69",
          600: "#38814c",
          700: "#2f663f",
          800: "#295235",
          900: "#23442d",
          950: "#0f2416",
        },
      },
      fontFamily: {
        primary: ["Jones", "sans-serif"],
      },
      borderColor: {
        // DEFAULT: "#1f1f24",
        DEFAULT: "rgba(255 255 255 / 5%)",
      },
      borderRadius: {
        sm: "4px",
      },
      ringColor: {
        DEFAULT: "#c9e9d1",
      },
      ringOpacity: {
        DEFAULT: "1",
      },
    },
  },
  plugins: [],
} satisfies Config;
