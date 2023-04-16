/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
      montserrat: 'Montserrat'
    },
    colors: {
      primaryLight: "#F2E0FC",
      primary: "#BC63F2",
      black: "#000000",
      black50: "#0007",
      darkBlack: "#181818",
      darkBlack50: "#18181877",
      warning: "#FAF9D0",
      grey: "#F5F5F5",
      white: "#FFF",

    },
    screens: {
      '2xl': '1536px',
      'xl': '1280px',
      'lg': '1024px',
      'md': '768px',
      'sm': '640px',
      'xs': '480px'
    }
  },
  plugins: [],
}