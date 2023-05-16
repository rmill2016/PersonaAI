/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      zIndex: {
        max: 900000,
      },
    },
  },
  plugins: [],
}
