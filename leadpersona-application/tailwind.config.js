const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '20px',
        md: '40px',
        xl: '80px'
      }
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1200px',
      xl: '1440px',
      '2xl': '1920px'
    },
    extend: {
      colors: {
        base: '#071E2C',
        primary: '#28616F',
        secondary: '#0D3C4C',
        accent: '#35BE9C',
        'accent-darken': '#1e8970',
        gray: '#ABAEAC'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      },
      transitionProperty: {
        width: 'width'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-font-inter'),
    require('flowbite/plugin')
  ]
}
