/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^~/styles/(.*)$",
    "^~/utils/(.*)$",
    "^~/hooks/(.*)$",
    "^~/components/(.*)$",
    "^~/trpc/(.*)$",
    "^~/server/(.*)$",
    "^~/app/(.*)$",
    "^~/features/(.*)$",
    "^~/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindFunctions: ["cn"],
};

export default config;
