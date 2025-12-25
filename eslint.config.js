import { defineConfig } from 'eslint/config'
import { jsLintConfig, tsLintConfig } from '@turbo-project/eslint-config'

export default defineConfig([...jsLintConfig, ...tsLintConfig])
