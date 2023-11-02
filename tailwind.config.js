/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ['Epilogue','sans-serif'],
      //   serif: ['Cormorant','serif'],
      // },
    },
  },
  plugins: [],
});
