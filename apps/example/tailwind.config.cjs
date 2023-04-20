// eslint-disable-next-line import/no-extraneous-dependencies
const { fontFamily } = require("tailwindcss/defaultTheme");
const { colors } = require("./utils/styles/colors.cjs");

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: "480px",
      tablet: "768px",
      desktop: "976px",
      desktopFullHD: "1440px",
    },
    colors,
    borderWidth: {
      0.5: "0.5px",
      1: "1px",
      2: "2px",
      3: "3px",
    },
    fontFamily: {
      lexend: ["var(--font-montserrat)", ...fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
};

// eslint-disable-next-line import/no-default-export
export default config;
