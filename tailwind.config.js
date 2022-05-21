const plugin = require('tailwindcss/plugin')
// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{vue,ts}']
  },
  theme: {
    extend: {
      colors: {
        primary: {
          400: 'var(--primaryColor400)',
          regular: 'var(--primaryColorRegular)',
          500: 'var(--primaryColor500)'
        },
        trans: {
          'black-08': 'rgba(0,0,0,.8)'
        }
      }
    }
  },
  plugins: [
  ]
}
