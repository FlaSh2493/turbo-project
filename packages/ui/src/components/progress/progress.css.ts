import { cva } from 'class-variance-authority'

export const progressVariants = cva('progress-root-base', {
  variants: {
    size: {
      sm: 'progress-root-sm',
      default: 'progress-root-default',
      lg: 'progress-root-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export const indicatorVariants = cva('progress-indicator-base', {
  variants: {
    size: {
      sm: 'progress-indicator-sm',
      default: 'progress-indicator-default',
      lg: 'progress-indicator-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export const valueVariants = cva('progress-value-base', {
  variants: {
    size: {
      sm: 'progress-value-sm',
      default: 'progress-value-default',
      lg: 'progress-value-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})
