import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports'

export const jsLintConfig = defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      js,
      'unused-imports': unusedImports,
    },
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
    ignores: ['node_modules', 'dist', 'build', 'storybook-static', 'stats.html'],
  },
])

export const tsLintConfig = defineConfig([
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    extends: [...tseslint.configs.recommended],
    plugins: {
      'unused-imports': unusedImports,
    },
    languageOptions: { globals: globals.browser },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    ignores: ['node_modules', 'dist', 'build', 'storybook-static', 'stats.html'],
  },
])
