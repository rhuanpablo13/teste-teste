/* eslint-disable no-undef */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.ts",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'to': '#ef6c00',
        'psico': '#8e24aa',
        'fono': '#f6bf26',
        'psico-pegag': '#000000',
      },
      fontFamily: {
        'Raleway': ['Raleway', 'sans-serif'],
        'sans-serif': ['sans-serif']
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}