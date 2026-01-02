import { defineConfig } from 'tsup'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.d.ts'],
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
    mkdirSync(stylesDir, { recursive: true })

    const cssFiles = ['src/styles/global.css', 'src/styles/colors.css', 'src/styles/typography.css']

    const combined = cssFiles.map(file => readFileSync(file, 'utf-8')).join('\n')

    writeFileSync(join(stylesDir, 'index.css'), combined)
    console.log('✅ CSS files combined → dist/styles/index.css')
  },
})
