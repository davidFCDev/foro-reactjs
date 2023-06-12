/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#051535",
        secondary: "#EF4444",
        tertiary: "#0b1e46",
        glow: "#D592D7"
      }
    },
  },
  plugins: [],
}
