/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#19A397",
        cta: "#FA8531",
        secondary: "#737373",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        bricolage: ["var(--font-bricolage)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
