/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^@/hooks/(.*)$",
    "^@/components/(.*)$",
    "^@/features/(.*)$",
    "^@/server/(.*)$",
    "^@/utils/(.*)$",
    "^@/styles/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
