/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'phone': {'max': '450px'},
      'tablet': {'max': '640px'}
    },
    extend: {},
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}

