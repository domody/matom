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
        dark: {
          50: "#b3b3b3",
          100: "#999999",
          200: "#808080",
          300: "#6d6d6d",
          400: "#4d4d4d",
          500: "#333333",
          600: "#292929",
          700: "#1f1f1f",
          800: "#141414",
          900: "#08090a",
          950: "#000000",
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
