import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import solidPlugin from 'vite-plugin-solid'
import { resolve } from 'path'

import manifest from './src/manifest.js'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      clientPort: 3000,
    },
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
