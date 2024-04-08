import { type Config } from "tailwindcss";
import tailwindCSSAnimate from "tailwindcss-animate";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sofia Pro", "ui-system", "sans-serif"],
      },
      fontSize: {
        xs: "0.625rem",
        sm: "0.75rem",
        base: "0.875rem",
        md: "1.125rem",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
    fontWeight: {
      normal: "300",
      semibold: "500",
      bold: "700",
    },
    colors: {
      white: "#fff",
      black: "#06060b",
      green: {
        300: "#7dbd9d",
        500: "#00b37e", // "oklch(67.79% 0.1779 163.2)",
        900: "#163a34",
      },
      navy: {
        100: "#d2d3d9",
        300: "#a2a8c1",
        500: "#595f7b",
        800: "#222337",
        900: "#141521",
        950: "#06060b",
      },
    },
    boxShadow: {
      md: "0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.25)",
      lg: "0 24px 32px -5px rgb(0 0 0 / 0.25), 0 8px 16px -6px rgb(0 0 0 / 0.25)",
      neon: `
        0px 4px 8px -1px color-mix(in srgb, var(--neon-color, #00b37e), transparent 65%),
        0px 10px 16px -1.5px color-mix(in srgb, var(--neon-color, #00b37e), transparent 65%),
        0px 24px 36px -2.5px color-mix(in srgb, var(--neon-color, #00b37e), transparent 65%)
      `,
    },
    dropShadow: {
      md: ["0 4px 6px rgb(0 0 0 / 0.25)", "0 2px 4px rgb(0 0 0 / 0.25)"],
      lg: ["0 24px 32px rgb(0 0 0 / 0.25)", "0 8px 6px rgb(0 0 0 / 0.25)"],
      neon: [
        "0px 2px 2px color-mix(in srgb, var(--neon-color, #00b37e), transparent 65%)",
        "0px 4px 4px color-mix(in srgb, var(--neon-color, #00b37e), transparent 65%)",
        "0px 8px 8px color-mix(in srgb, var(--neon-color, #00b37e), transparent 65%)",
      ],
    },
    ringColor: {
      DEFAULT: "#c9e9d1",
    },
    ringOpacity: {
      DEFAULT: "1",
    },
  },
  plugins: [tailwindCSSAnimate],
} satisfies Config;
