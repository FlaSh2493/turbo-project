import { cva } from 'class-variance-authority'

export const segmentControlItemVariants = cva('segment-control-item-base', {
  variants: {
    selected: {
      true: 'segment-control-item-active',
      false: 'segment-control-item-inactive',
    },
  },
  defaultVariants: {
    selected: false,
  },
})
