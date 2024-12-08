import { type Config } from "tailwindcss";
import tailwindCSSAnimate from "tailwindcss-animate";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["sofia-pro", "ui-system", "sans-serif"],
      },
      fontSize: {
        xs: "0.625rem",
        sm: "0.75rem",
        base: ["0.875rem", { lineHeight: "1.428" }],
        md: "1.125rem",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      animationDuration: {
        DEFAULT: "300ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          to: { height: "0", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-in-out",
        "accordion-up": "accordion-up 0.3s ease-in-out",
      },
      borderColor: {
        DEFAULT: "color-mix(in srgb, #a2a8c1, transparent 75%)",
        opaque: "color-mix(in srgb, #a2a8c1, #06060b 75%)",
        "light-opaque": "color-mix(in srgb, #a2a8c1, #06060b 90%)",
      },
      minHeight: {
        screen: "100svh",
      },
    },
    fontWeight: {
      regular: "400",
      semibold: "700",
      bold: "800",
    },
    colors: {
      transparent: "transparent",
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
        800: "#22233c",
        900: "#151628",
        950: "#06060b",
      },
      "border-opaque": "color-mix(in srgb, #a2a8c1, #06060b 75%)",
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
      DEFAULT: "#dcefe3",
      navy: {
        300: "#a2a8c1",
        500: "#595f7b",
      },
    },
    borderRadius: {
      full: "99rem",
      md: "0.25rem",
      lg: "0.5rem",
      xl: "0.75rem",
    },
    ringOpacity: {
      DEFAULT: "1",
    },
  },
  plugins: [tailwindCSSAnimate],
} satisfies Config;
