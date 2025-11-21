/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#000000", // True Black
        secondary: "#86868b", // Apple Gray text
        tertiary: "#1c1c1e", // Apple Dark Gray background
        "black-100": "#101010",
        "black-200": "#121212",
        "white-100": "#f5f5f7", // Apple Off-White
        "subtle-gray": "rgba(255, 255, 255, 0.1)",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #000000",
        glow: "0 0 20px rgba(255, 255, 255, 0.1)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "none", // Removing the old pattern
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};