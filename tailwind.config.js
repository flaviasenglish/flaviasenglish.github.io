const { gray } = require('tailwindcss/colors');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.4rem',
      xl: '1.5rem',
      '2xl': '1.6rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    fontFamily: {
      title: ['Megante'],
      sans: ['DidactGothic', 'Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: colors.black,
        secondary: colors.red,
        textprimary: colors.black,
        background: colors.white,
        bg_blue: ['#37519f'],
        bg_orange: ['#f0826d'],
        bg_white: ['#fef1e5'],
      },
    },
  },
  variants: {},
  plugins: [],
  content: [],
};
