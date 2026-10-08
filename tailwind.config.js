/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#06140F",
        forest: "#0B2A1F",
        pine: "#145139",
        mint: "#7BE0A4",
        sage: "#B9D8C6",
        paper: "#F7F4EE",
        stone: "#E6E1D6",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
