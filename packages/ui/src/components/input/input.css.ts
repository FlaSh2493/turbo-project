import { cva } from 'class-variance-authority'

// ============================================
// Root Variants (Components - size/state 토큰화)
// ============================================

export const inputRootVariants = cva('input-root-base', {
  variants: {
    size: {
      md: 'input-root-md',
      sm: 'input-root-sm',
    },
    state: {
      enabled: 'input-root-enabled',
      fixed: 'input-root-fixed',
      focused: 'input-root-focused',
      typing: 'input-root-typing',
      completed: 'input-root-completed',
      error: 'input-root-error',
      disabled: 'input-root-disabled',
    },
  },
  defaultVariants: {
    size: 'sm',
    state: 'enabled',
  },
})

export const inputFieldVariants = cva('input-field-base', {
  variants: {
    size: {
      md: 'input-field-md',
      sm: 'input-field-sm',
    },
    state: {
      enabled: 'input-field-enabled',
      fixed: 'input-field-fixed',
      focused: 'input-field-enabled',
      typing: 'input-field-enabled',
      completed: 'input-field-enabled',
      error: 'input-field-error',
      disabled: 'input-field-disabled',
    },
  },
  defaultVariants: {
    size: 'sm',
    state: 'enabled',
  },
})

export const inputClearButtonVariants = cva('input-clear-button-base', {
  variants: {
    size: {
      md: 'input-clear-button-md',
      sm: 'input-clear-button-sm',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
