/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: "selector",
    extend: {
      colors: {
        theme: {
          50: "#495363",
          100: "#3f4958",
          200: "#333e4f",
          300: "#282f3e",
          400: "#1d2331",
          500: "#171f2b",
          600: "#121720",
          700: "#10151d",
          800: "#0b0e14",
          900: "#080a0e",
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
