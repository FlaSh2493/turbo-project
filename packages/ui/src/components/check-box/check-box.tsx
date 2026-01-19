import * as React from 'react'
import { CheckboxPrimitive } from '../../primitives/check-box/checkbox'
import type { CheckboxPrimitiveProps } from '../../primitives/check-box/checkbox'
import { cn } from '../../lib/utils'
import { useCheckBox, type UseCheckBoxOptions } from '../../headless/check-box/use-check-box'
import { useCheckBoxGroupContext } from '../../headless/check-box/check-box-group-context'
import {
  checkboxVariants,
  indicatorVariants,
  indeterminateIndicatorVariants,
  labelVariants,
  rootVariants,
  checkIconVariants,
} from './checkbox.css'
import { Check } from 'lucide-react'

export interface CheckBoxProps extends CheckboxPrimitiveProps, UseCheckBoxOptions {
  label?: React.ReactNode
  containerClassName?: string
  indicatorClassName?: string
  value?: string
  mode?: 'default' | 'squared'
}

export const CheckBox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.CheckBox>,
  CheckBoxProps
>(
  (
    {
      className,
      containerClassName,
      label,
      id,
      indicatorClassName,
      checked: controlledChecked,
      defaultChecked,
      onCheckedChange,
      disabled,
      required,
      value,
      mode = 'default',
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const checkboxId = id || generatedId
    const groupContext = useCheckBoxGroupContext()

    // Derived props based on group context
    const isGrouped = groupContext && value !== undefined
    const isChecked = isGrouped ? groupContext.isChecked(value) : controlledChecked
    const handleCheckedChange = isGrouped
      ? (checked: boolean | 'indeterminate') => {
          groupContext.checkValue(value)
          onCheckedChange?.(checked) // Calling original callback too if provided
        }
      : onCheckedChange

    const {
      checked,
      onCheckedChange: finalHandleCheckedChange,
      checkboxProps,
    } = useCheckBox({
      checked: isChecked,
      defaultChecked: isGrouped ? undefined : defaultChecked, // defaultChecked doesn't apply if grouped (controlled by group value)
      onCheckedChange: handleCheckedChange,
      disabled,
      required,
    })

    const state =
      checked === true ? 'checked' : checked === 'indeterminate' ? 'indeterminate' : 'unchecked'

    return (
      <CheckboxPrimitive.Root
        className={cn(rootVariants({ mode, state, disabled }), containerClassName)}
      >
        <CheckboxPrimitive.CheckBox
          ref={ref}
          hidden={mode === 'squared'}
          className={cn(checkboxVariants({ state, disabled }), className)}
          indicatorClassName={cn(indicatorVariants(), indicatorClassName)}
          indeterminateClassName={indeterminateIndicatorVariants({ disabled })}
          id={checkboxId}
          checked={checked}
          onCheckedChange={finalHandleCheckedChange}
          disabled={disabled}
          {...checkboxProps}
          {...props}
          value={value}
        />
        {label && (
          <CheckboxPrimitive.Label
            htmlFor={checkboxId}
            className={cn(labelVariants({ disabled, mode, state }))}
          >
            <div className="flex items-center justify-between gap-10">
              <div className="truncate">{label}</div>
              {mode === 'squared' && (
                <Check className={checkIconVariants({ mode, state, disabled })} />
              )}
            </div>
          </CheckboxPrimitive.Label>
        )}
      </CheckboxPrimitive.Root>
    )
  },
)

CheckBox.displayName = 'CheckBox'
