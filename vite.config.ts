import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    env: {
      VITE_EMAILJS_SERVICE_ID: 'test-service',
      VITE_EMAILJS_TEMPLATE_ID: 'test-template',
      VITE_EMAILJS_PUBLIC_KEY: 'test-key',
    },
  },
})
