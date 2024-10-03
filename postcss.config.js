const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [
    'postcss-preset-env',
    tailwindcss,
    require('tailwindcss/nesting'),
    require('postcss-prefix-selector')({
      prefix: '.tw-parent'
    })
  ],
};