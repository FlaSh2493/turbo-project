import { cva } from 'class-variance-authority'

export const contentVariants = cva('tooltip-content-base', {
  variants: {
    size: {
      sm: 'tooltip-content-sm',
      md: 'tooltip-content-md',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
