import { forwardRef } from 'react'
import * as RadixCheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '../../lib/utils'
import { Check } from 'lucide-react'

// ============================================
// CheckBox Root Component
// ============================================
const CheckBoxRoot = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
  },
)

// ============================================
// CheckBox Component
// ============================================
export interface CheckboxPrimitiveProps extends React.ComponentPropsWithoutRef<
  typeof RadixCheckboxPrimitive.Root
> {
  indicatorClassName?: string
  indeterminateClassName?: string
}

const CheckBox = forwardRef<
  React.ElementRef<typeof RadixCheckboxPrimitive.Root>,
  CheckboxPrimitiveProps
>(({ className, indicatorClassName, indeterminateClassName, checked, ...props }, ref) => {
  return (
    <RadixCheckboxPrimitive.Root ref={ref} className={className} checked={checked} {...props}>
      <RadixCheckboxPrimitive.Indicator className={indicatorClassName}>
        {checked === 'indeterminate' && <div className={indeterminateClassName} />}
        {checked === true && <Check className="text-gray-0" />}
      </RadixCheckboxPrimitive.Indicator>
    </RadixCheckboxPrimitive.Root>
  )
})

// ============================================
// CheckBox Label Component
// ============================================
export type CheckboxPrimitiveLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const CheckBoxLabel = forwardRef<HTMLLabelElement, CheckboxPrimitiveLabelProps>(
  ({ className, ...props }, ref) => {
    return <label ref={ref} className={className} {...props} />
  },
)

CheckBoxRoot.displayName = 'CheckBoxRoot'
CheckBox.displayName = 'CheckBox'
CheckBoxLabel.displayName = 'CheckBoxLabel'

// ============================================
// Export
// ============================================

export const CheckboxPrimitive = {
  Label: CheckBoxLabel,
  Root: CheckBoxRoot,
  CheckBox,
}
