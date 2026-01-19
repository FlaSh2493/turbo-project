import { defineConfig } from 'tsup'
import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  entry: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/*.test.tsx',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  bundle: false,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }
  },
  onSuccess: async () => {
    // CSS 파일들을 하나로 합치기 (Tailwind 빌드 없이 소스 그대로)
    const stylesDir = 'dist/styles'
    const srcStylesDir = 'src/styles'
    mkdirSync(stylesDir, { recursive: true })

    const files = readdirSync(srcStylesDir)

    // global.css를 가장 먼저, 나머지는 알파벳 순으로 정렬
    const sortedFiles = files
      .filter((file: string) => file.endsWith('.css'))
      .sort((a: string, b: string) => {
        if (a === 'global.css') return -1
        if (b === 'global.css') return 1
        return a.localeCompare(b)
      })

    const combined = sortedFiles
      .map((file: string) => readFileSync(join(srcStylesDir, file), 'utf-8'))
      .join('\n')

    writeFileSync(join(stylesDir, 'index.css'), combined)
    console.log('✅ CSS files combined → dist/styles/index.css')
  },
})
