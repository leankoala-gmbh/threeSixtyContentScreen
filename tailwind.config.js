const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  safelist: [],
  theme: {
    extend: {
      colors: {
        content: {
          headline: 'var(--tsxScreenHeadline)',
          body: 'var(--tsxScreenText)'
        },
        contentScreen: 'var(--tsxScreenBackground)',
        primary: {
          hover: 'var(--tsxScreenPrimaryHover)',
          DEFAULT: 'var(--tsxScreenPrimary)'
        },
        marketing: {
          hover: 'var(--tsxScreenMarketingHover)',
          DEFAULT: 'var(--tsxScreenMarketing)'
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
