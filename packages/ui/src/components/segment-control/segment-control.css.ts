import { cva } from 'class-variance-authority'

export const segmentControlVariants = cva('', {
  variants: {
    size: {
      sm: 'segment-control-root-sm',
      default: 'segment-control-root-default',
      lg: 'segment-control-root-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export const segmentControlItemVariants = cva('', {
  variants: {
    size: {
      sm: 'segment-control-item-sm',
      default: 'segment-control-item-default',
      lg: 'segment-control-item-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})
