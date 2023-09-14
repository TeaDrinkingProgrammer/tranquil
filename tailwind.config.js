/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./templates/**/*.html", "./themes/**/*.html",  "./themes/**/*.html"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'sans': ['Lato', ...defaultTheme.fontFamily.sans],
    },
    extends: {
      // typography: (theme) => ({
      //   DEFAULT: {
      //     css: {
      //       color: theme('colors.slate.500'),
      //       h2: {
      //         color: theme('colors.slate.500'),
      //       },
      //       h3: {
      //         color: theme('colors.slate.500'),
      //       },
      //       strong: {
      //         color: theme('colors.slate.500'),
      //       },
      //       a: {
      //         color: theme('colors.green.500'),
      //         '&:hover': {
      //           color: theme('colors.green.600')
      //         },
      //       },
      //     },
      //   },
      // })
    }
  },
  variants: {},
  plugins: [
      require('@tailwindcss/typography'),
      plugin(function({ addBase }) {
        addBase({
           'html': { fontSize: "13px" },
         })
       }),
  ]
};
