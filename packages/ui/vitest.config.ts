import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.turbo'],
    coverage: {
      provider: 'istanbul', // 기본값은 'v8'입니다.
      reporter: ['text', 'json', 'html'], // 리포트 형식 지정
      reportsDirectory: './coverage', // 리포트 저장 경로
    },
  },
})
