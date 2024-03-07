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
    },
  },
  plugins: [],
}

