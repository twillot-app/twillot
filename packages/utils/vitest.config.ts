import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    conditions: ['development', 'browser'],
    alias: {
      '~': resolve(__dirname, './'),
    },
  },
  test: {
    setupFiles: ['vitest.setup.ts'],
    server: {
      deps: {
        include: ['@webext-core/storage', '@webext-core/fake-browser'],
      },
    },
    globals: true,
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    environment: 'jsdom',
    pool: 'forks',
    poolOptions: {
      forks: {
        isolate: false,
      },
    },
  },
} as any)
