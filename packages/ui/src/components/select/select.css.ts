import { cva } from 'class-variance-authority'

export const triggerVariants = cva('select-trigger-base', {
  variants: {
    size: {
      md: 'select-trigger-md',
      sm: 'select-trigger-sm',
    },
    state: {
      enabled: 'select-trigger-enabled',
      open: 'select-trigger-open',
      completed: 'select-trigger-completed',
      error: 'select-trigger-error',
      disabled: 'select-trigger-disabled',
      readonly: 'select-trigger-readonly',
    },
  },
  defaultVariants: {
    size: 'sm',
    state: 'enabled',
  },
})

export const contentVariants = cva('select-content-base')

export const itemVariants = cva('select-item-base', {
  variants: {
    size: {
      md: 'select-item-md',
      sm: 'select-item-sm',
    },
    selected: {
      true: 'select-item-selected',
      false: 'select-item-unselected',
    },
  },
  defaultVariants: {
    size: 'sm',
    selected: false,
  },
})
