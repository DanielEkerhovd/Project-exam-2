/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        titles: ["Poppins", "sans-serif"],
      },
      colors: {
        "holidaze-dark": "#292929",
        "holidaze-light": "#FAF3E0",
        "holidaze-highlight": "#FDB725",
        "holidaze-alert": "#ff0f0f",
      },
      screens: {
        "2xl": "1440px"
      },
    },
  },
  plugins: [],
};