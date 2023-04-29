/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#74D8F1",
          200: "#5BD3F1",
          300: "#43CEF1",
          400: "#2BC9F1",
          500: "#13C5F1",
        },
        // secondary:"#ecf0f1",
        primaryLight: "#E3E9E9",
        primaryGray: "#C4D0C6",
        // primaryDark:"#8FA5B2",
        primaryDark: "#2BC9F1",
        darkGray: "#131C85",
        background: "#F8F8F8",
        milky: "#ffffff",
      },
    },
  },
  plugins: [],
};
