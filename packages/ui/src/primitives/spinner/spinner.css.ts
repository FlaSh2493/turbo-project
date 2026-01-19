import { cva } from 'class-variance-authority'

export const spinnerVariants = cva('spinner-root-base', {
  variants: {
    fullscreen: {
      page: 'spinner-fullscreen-page',
      container: 'spinner-fullscreen-container',
      static: 'spinner-fullscreen-static',
    },
    dim: {
      white: 'spinner-dim-white',
      black: 'spinner-dim-black',
    },
  },
  defaultVariants: {
    fullscreen: 'container',
    dim: 'white',
  },
})
