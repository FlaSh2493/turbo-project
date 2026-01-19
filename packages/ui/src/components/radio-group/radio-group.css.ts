import { cva } from 'class-variance-authority'

export const rootVariants = cva('radio-container-base', {
  variants: {
    mode: {
      default: '',
      squared: 'radio-container-squared',
    },
    state: {
      checked: '',
      unchecked: '',
    },
    disabled: {
      true: '',
      false: 'cursor-pointer',
    },
  },
  compoundVariants: [
    {
      mode: 'squared',
      state: 'checked',
      disabled: false,
      class: 'radio-container-squared-checked',
    },
    {
      mode: 'squared',
      state: 'unchecked',
      disabled: false,
      class: 'radio-container-squared-unchecked',
    },
    {
      mode: 'squared',
      state: 'unchecked',
      disabled: true,
      class: 'radio-container-squared-disabled',
    },
    {
      mode: 'squared',
      state: 'checked',
      disabled: true,
      class: 'radio-container-squared-checked-disabled',
    },
  ],
  defaultVariants: {
    mode: 'default',
    state: 'unchecked',
    disabled: false,
  },
})

export const radioVariants = cva('radio-item-base', {
  variants: {
    state: {
      checked: '',
      unchecked: '',
    },
    disabled: {
      true: 'radio-item-disabled',
      false: '',
    },
  },
  compoundVariants: [
    // Enabled states
    {
      state: 'checked',
      disabled: false,
      class: 'radio-item-checked',
    },
    {
      state: 'unchecked',
      disabled: false,
      class: 'radio-item-unchecked',
    },
    // Disabled states
    {
      state: 'checked',
      disabled: true,
      class: 'radio-item-checked-disabled',
    },
    {
      state: 'unchecked',
      disabled: true,
      class: 'radio-item-unchecked-disabled',
    },
  ],
  defaultVariants: {
    state: 'unchecked',
    disabled: false,
  },
})

export const indicatorVariants = cva('radio-indicator-base')

export const radioDotVariants = cva('radio-dot-base', {
  variants: {
    disabled: {
      true: 'radio-dot-disabled',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export const labelVariants = cva('radio-label-base', {
  variants: {
    disabled: {
      true: '',
      false: 'cursor-pointer',
    },
    mode: {
      default: 'w-full',
      squared: 'text-left',
    },
    state: {
      checked: '',
      unchecked: '',
    },
  },
  compoundVariants: [
    // Default + enabled (any state)
    {
      mode: 'default',
      disabled: false,
      class: 'radio-label-default-color',
    },
    // Squared + unchecked + enabled
    {
      mode: 'squared',
      state: 'unchecked',
      disabled: false,
      class: 'radio-label-default-color',
    },
    // Squared + checked + enabled
    {
      mode: 'squared',
      state: 'checked',
      disabled: false,
      class: 'radio-label-checked',
    },
    // Squared + checked + disabled
    {
      mode: 'squared',
      state: 'checked',
      disabled: true,
      class: 'radio-label-squared-checked-disabled',
    },
    // Squared + unchecked + disabled
    {
      mode: 'squared',
      state: 'unchecked',
      disabled: true,
      class: 'radio-label-disabled',
    },
    // Default + disabled
    {
      mode: 'default',
      disabled: true,
      class: 'radio-label-disabled',
    },
  ],
  defaultVariants: {
    disabled: false,
    mode: 'default',
    state: 'unchecked',
  },
})
