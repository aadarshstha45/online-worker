/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {},
    screens: {
      "2xl": "1536px",
      xl: "1280px",
      lg: "1024px",
      md: "768px",
      sm: "540px",
    },
  },
  plugins: [],
};
