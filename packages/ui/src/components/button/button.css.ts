import { cva } from 'class-variance-authority'

export const buttonVariants = cva('btn-base', {
  variants: {
    variant: {
      default: 'btn-default',
      outline: 'btn-outline',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      link: 'btn-link',
    },
    size: {
      lg: 'btn-lg',
      md: 'btn-md',
      sm: 'btn-sm',
      icon: 'btn-icon',
      'icon-sm': 'btn-icon-sm',
      'icon-lg': 'btn-icon-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
