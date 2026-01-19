import { cva } from 'class-variance-authority'

export const switchRootVariants = cva('switch-root', {
  variants: {
    checked: {
      true: 'switch-root-checked',
      false: 'switch-root-unchecked',
    },
    disabled: {
      true: 'switch-root-disabled',
    },
  },
  defaultVariants: {
    checked: false,
    disabled: false,
  },
})

export const switchThumbVariants = cva('switch-thumb', {
  variants: {
    checked: {
      true: 'switch-thumb-checked',
      false: 'switch-thumb-unchecked',
    },
    disabled: {
      true: 'switch-thumb-disabled',
    },
  },
  defaultVariants: {
    checked: false,
    disabled: false,
  },
})
