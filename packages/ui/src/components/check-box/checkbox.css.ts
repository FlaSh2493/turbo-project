import { cva } from 'class-variance-authority'

export const rootVariants = cva('checkbox-root-base', {
  variants: {
    mode: {
      default: '',
      squared: 'checkbox-root-squared',
    },
    state: {
      checked: '',
      unchecked: '',
      indeterminate: '',
    },
    disabled: {
      true: '',
      false: 'checkbox-root-enabled',
    },
  },
  compoundVariants: [
    // Squared Mode - Checked
    {
      mode: 'squared',
      state: 'checked',
      disabled: false,
      class: 'checkbox-root-squared-checked',
    },
    // Squared Mode - Unchecked
    {
      mode: 'squared',
      state: 'unchecked',
      disabled: false,
      class: 'checkbox-root-squared-unchecked',
    },
    // Squared Mode - Disabled
    {
      mode: 'squared',
      state: 'checked',
      disabled: true,
      class: 'checkbox-root-squared-checked-disabled',
    },
    {
      mode: 'squared',
      state: 'unchecked',
      disabled: true,
      class: 'checkbox-root-squared-unchecked-disabled',
    },
  ],
  defaultVariants: {
    mode: 'default',
    state: 'unchecked',
    disabled: false,
  },
})

export const checkboxVariants = cva('group peer checkbox-base', {
  variants: {
    mode: {
      default: '',
      squared: '',
    },
    state: {
      checked: '',
      unchecked: '',
      indeterminate: '',
    },
    disabled: {
      true: 'checkbox-disabled',
      false: '',
    },
  },
  compoundVariants: [
    // Enabled states
    {
      state: 'checked',
      disabled: false,
      class: 'checkbox-checked',
    },
    {
      state: 'unchecked',
      disabled: false,
      class: 'checkbox-unchecked',
    },
    {
      state: 'indeterminate',
      disabled: false,
      class: 'checkbox-indeterminate',
    },
    // Disabled states
    {
      state: 'unchecked',
      disabled: true,
      class: 'checkbox-unchecked-disabled',
    },
    {
      state: 'checked',
      disabled: true,
      class: 'checkbox-checked-disabled',
    },
    {
      state: 'indeterminate',
      disabled: true,
      class: 'checkbox-indeterminate-disabled',
    },
    // Squared mode
    {
      mode: 'squared',
      state: 'checked',
      disabled: false,
      class: 'checkbox-squared-checked',
    },
    {
      mode: 'squared',
      state: 'checked',
      disabled: true,
      class: 'checkbox-squared-checked-disabled',
    },
  ],
  defaultVariants: {
    state: 'unchecked',
    disabled: false,
  },
})

export const indicatorVariants = cva('checkbox-indicator')

export const indeterminateIndicatorVariants = cva('checkbox-indeterminate-indicator', {
  variants: {
    disabled: {
      true: 'checkbox-indeterminate-indicator-disabled',
      false: 'checkbox-indeterminate-indicator-enabled',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export const labelVariants = cva('checkbox-label', {
  variants: {
    disabled: {
      true: 'checkbox-label-disabled',
      false: 'checkbox-label-enabled',
    },
    mode: {
      default: '',
      squared: '',
    },
    state: {
      checked: '',
      unchecked: '',
      indeterminate: '',
    },
  },
  compoundVariants: [
    {
      mode: 'squared',
      state: 'checked',
      disabled: false,
      class: 'checkbox-label-squared-checked',
    },
    {
      mode: 'squared',
      state: 'checked',
      disabled: true,
      class: 'checkbox-label-squared-checked-disabled',
    },
  ],
  defaultVariants: {
    disabled: false,
    mode: 'default',
    state: 'unchecked',
  },
})

export const checkIconVariants = cva('checkbox-check-icon', {
  variants: {
    mode: {
      default: '',
      squared: '',
    },
    state: {
      checked: '',
      unchecked: '',
      indeterminate: '',
    },
    disabled: {
      true: 'checkbox-check-icon-disabled',
      false: '',
    },
  },
  compoundVariants: [
    {
      mode: 'squared',
      state: 'checked',
      disabled: false,
      class: 'checkbox-check-icon-squared-checked',
    },
    {
      mode: 'squared',
      state: 'unchecked',
      disabled: false,
      class: 'checkbox-check-icon-squared-unchecked',
    },
    {
      mode: 'squared',
      state: 'checked',
      disabled: true,
      class: 'checkbox-check-icon-squared-checked-disabled',
    },
  ],
  defaultVariants: {
    mode: 'default',
    state: 'unchecked',
    disabled: false,
  },
})
