/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md}", "./src/**/*.svg",],
  theme: {
    extend: {
      colors: {
        'primary': '#02B0AF',
        'secondary': '#FE3C07',
        'tertiary': '#F8A585',
        'background': '#EEDBCC',
        'text': '#362420',
      },
      dropShadow: {
        'strong': '1px 1px #362420',
      }
    },
    boxShadow: {
      '3xl': 'inset 0 1px 2px -1px rgba(255,255,255,.5), 0 1rem 2rem 0 rgba(0,0,0,.4);',
    },
  },
  plugins: [],
}

