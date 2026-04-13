import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@sci-comp/core': path.resolve(__dirname, '../../packages/sci-comp-core/src/index.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/support/setup.ts',
    globals: true,
  },
})
