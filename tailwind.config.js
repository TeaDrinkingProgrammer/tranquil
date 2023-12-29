/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./../../**/templates/**/*.html", "./../../**/themes/**/*.html", "./../../**/static/styles/custom-styles.css", "./../../**/static/icon/*.svg"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'sans': ['Lato', ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {},
  plugins: [
      require('@tailwindcss/typography')
  ]
};
