/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#extension-root',
  content: ['./content-script/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: '2rem',
    },
    extend: {
      zIndex: {
        max: 900000,
      },
      colors: {
        green: {
          base: '#071E2C',
          primary: '#28616F',
          secondary: '#0D3C4C',
          accent: '#35BE9C',
          to: '#073044',
          from: '#28616F',
        },
        gray: '#ABAEAC',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
