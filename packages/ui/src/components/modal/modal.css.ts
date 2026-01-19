import { cva } from 'class-variance-authority'

export const modalOverlayVariants = cva('modal-overlay-base')

export const modalContentVariants = cva('modal-content-base', {
  variants: {
    size: {
      sm: 'modal-content-sm',
      md: 'modal-content-md',
      lg: 'modal-content-lg',
      xl: 'modal-content-xl',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

export const modalBodyVariants = cva('modal-body-base', {
  variants: {
    size: {
      sm: 'modal-body-sm',
      md: 'modal-body-md',
      lg: 'modal-body-lg',
      xl: 'modal-body-xl',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
