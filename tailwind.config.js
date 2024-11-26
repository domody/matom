/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        light: {
          50: "#ffffff",
          100: "#f7f7f7",
          200: "#efefef",
          300: "#e7e7e7",
          400: "#dfdfdf",
          500: "#d7d7d7",
          600: "#cfcfcf",
          700: "#c7c7c7",
          800: "#bfbfbf",
          900: "#b7b7b7",
          950: "#a7a7a7",
        },
        dark: {
          50: "#b3b3b3",
          100: "#999999",
          200: "#808080",
          300: "#6d6d6d",
          400: "#4d4d4d",
          500: "#333333",
          600: "#292929",
          700: "#1f1f1f",
          800: "#131315",
          900: "#08090a",
          950: "#010203",
        },
      },
    },
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: "1rem",

      // default breakpoints but with 40px removed
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1056px",
        "2xl": "10256px",
      },
    },
  },
  plugins: [],
};
