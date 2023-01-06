/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: media,
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],

  // theme: {
  //   colors: {
  //     secondary: "#121212",
  //   },
  // },
};
