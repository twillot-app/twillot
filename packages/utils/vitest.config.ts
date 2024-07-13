import { defineConfig } from 'vitest/config'

export default 
  defineConfig({
    server: {
        hmr: {
          host: 'localhost',
          port: 9526,
        },
      },
      resolve: {
        conditions: ['development', 'browser'],
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
  } as any,
)
