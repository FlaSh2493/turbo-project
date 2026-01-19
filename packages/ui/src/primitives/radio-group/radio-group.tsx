import * as React from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { cn } from '../../lib/utils'

const RadioGroupPrimitiveRoot = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadixRadioGroup.Root
      data-slot="radio-group-root"
      className={cn('radio-group-root', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroupPrimitiveRoot.displayName = RadixRadioGroup.Root.displayName

const RadioGroupPrimitiveItem = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>
>(({ className, ...props }, ref) => {
  return <RadixRadioGroup.Item ref={ref} data-slot="radio-item" className={className} {...props} />
})
RadioGroupPrimitiveItem.displayName = RadixRadioGroup.Item.displayName

const RadioGroupPrimitiveIndicator = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Indicator>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Indicator>
>(({ className, ...props }, ref) => {
  return (
    <RadixRadioGroup.Indicator
      ref={ref}
      data-slot="radio-indicator"
      className={className}
      {...props}
    />
  )
})
RadioGroupPrimitiveIndicator.displayName = RadixRadioGroup.Indicator.displayName

export const RadioGroupPrimitive = {
  Root: RadioGroupPrimitiveRoot,
  Item: RadioGroupPrimitiveItem,
  Indicator: RadioGroupPrimitiveIndicator,
}
