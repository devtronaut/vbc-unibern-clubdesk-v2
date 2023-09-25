/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'phone': {'max': '550px'},
      'tablet': {'max': '680px'},
    },
    extend: {
      colors: {
        'col-table-header': 'rgba(51,51,51,1.0)',
        'col-button': 'rgba(255,0,0,1.0)'
      }
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}

