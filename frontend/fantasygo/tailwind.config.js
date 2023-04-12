/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue, js, ts, jsx, tsx}",
    "./src/*.{vue, js, ts, jsx, tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.purple,
        gray: colors.gray,
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin")]
}

