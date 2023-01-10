import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

process.env.VITE_APP_VERSION = pkg.version
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString()
}

export default defineConfig({
  plugins: [
    vue({
      script: {
        refSugar: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src')
    }
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'cjs',
        entryFileNames: 'threeSixtyContentScreen.js',
        chunkFileNames: 'threeSixtyContentScreen-[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css')
            return 'threeSixtyContentScreen.css'
          return assetInfo.name
        }
      }
    }
  },
  test: {
    globals: true,
    // include: ['tests/**/*.test.ts', './scr/components/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue']
    }
  }
})
