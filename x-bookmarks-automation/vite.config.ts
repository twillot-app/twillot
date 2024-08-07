import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import solidPlugin from 'vite-plugin-solid'
import manifest from './src/manifest.js'
import { resolve } from 'path'

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    conditions: ['development', 'browser'],
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: 'build',
    target: 'esnext',
    // polyfillDynamicImport: false,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/chunk-[hash].js',
      },
    },
  },
  plugins: [crx({ manifest }), solidPlugin()],
})
