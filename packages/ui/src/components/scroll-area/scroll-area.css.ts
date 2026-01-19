import { cva } from 'class-variance-authority'

export const scrollBarVariants = cva('scroll-bar-base', {
  variants: {
    orientation: {
      vertical: 'scroll-bar-vertical',
      horizontal: 'scroll-bar-horizontal',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})
