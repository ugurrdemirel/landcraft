const preset = require("./tailwind.preset.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [require("@tailwindcss/typography")],
};