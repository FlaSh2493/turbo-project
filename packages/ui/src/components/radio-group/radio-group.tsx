'use client'

import * as React from 'react'
import {
  useRadioGroup,
  type UseRadioGroupOptions,
  type UseRadioGroupReturn,
} from '../../headless/radio-group/use-radio-group'
import { RadioGroupPrimitive } from '../../primitives/radio-group/radio-group'
import { cn } from '../../lib/utils'

// Context
type RadioGroupContextValue = UseRadioGroupReturn<string>

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

export const useRadioGroupContext = () => {
  return React.useContext(RadioGroupContext)
}

// ============================================
// RadioGroup Component
// ============================================
export interface RadioGroupProps
  extends
    UseRadioGroupOptions<string>,
    Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
      'defaultValue' | 'onChange' | 'value'
    > {
  children: React.ReactNode
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, children, value, defaultValue, onValueChange, disabled, ...props }, ref) => {
  const groupState = useRadioGroup({
    value,
    defaultValue,
    onValueChange,
    disabled,
  })

  return (
    <RadioGroupContext.Provider value={groupState}>
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn('grid gap-2', className)}
        value={groupState.value}
        onValueChange={groupState.checkValue}
        disabled={disabled}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>
  )
})

RadioGroup.displayName = 'RadioGroup'
