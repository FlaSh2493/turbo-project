import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export const jsLintConfig = defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'warn',
    },
    ignores: ['node_modules', 'dist', 'build', 'storybook-static', 'stats.html'],
  },
])

export const tsLintConfig = defineConfig([
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    extends: [...tseslint.configs.recommended],
    languageOptions: { globals: globals.browser },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    ignores: ['node_modules', 'dist', 'build', 'storybook-static', 'stats.html'],
  },
])
