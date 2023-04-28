/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primaryLight: "#F2E0FC",
        primary: "#BC63F2",
        primaryDark: "#A345DC",
        black: "#000000",
        black50: "#0007",
        darkBlack: "#181818",
        darkBlack50: "#18181877",
        warning: "#FAF9D0",
        grey: "#F5F5F5",
        gray: "#F2F3F5",
        white: "#FFF",
        success: "#29CC6A",
        error: "#FF5353",
      },
      borderWidth: {
        1: "1px"
      }
    },
    fontFamily: {
      montserrat: 'Montserrat'
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