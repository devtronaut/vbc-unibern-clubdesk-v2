/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      phone: { max: '550px' },
      tablet: { max: '680px' },
    },
    extend: {
      colors: {
        'col-gray': 'rgba(51,51,51,1.0)',
        'col-gray-light': 'rgba(122,122,122,1.0)',
        'col-button': 'rgba(255,0,0,1.0)',
      },
      boxShadow: {
        roundedTabRightActive: '0 10px 0 0 rgba(51,51,51,1.0)',
        roundedTabRightPassive: '0 10px 0 0 rgba(122,122,122,1.0)',
        roundedTabLeftActive: '0 10px 0 0 rgba(51,51,51,1.0)',
        roundedTabLeftPassive: '0 10px 0 0 rgba(122,122,122,1.0)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

