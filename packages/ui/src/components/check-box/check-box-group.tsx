import * as React from 'react'
import {
  useCheckBoxGroup,
  type UseCheckBoxGroupOptions,
} from '../../headless/check-box/use-check-box-group'
import { CheckBoxGroupContext } from '../../headless/check-box/check-box-group-context'

// ============================================
// CheckBoxGroup Component
// ============================================
export interface CheckBoxGroupProps
  extends
    UseCheckBoxGroupOptions<string>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  children: React.ReactNode
}

export const CheckBoxGroup = React.forwardRef<HTMLDivElement, CheckBoxGroupProps>(
  ({ children, value, defaultValue, onValueChange, disabled, ...props }, ref) => {
    const groupState = useCheckBoxGroup({
      value,
      defaultValue,
      onValueChange,
      disabled,
    })

    return (
      <CheckBoxGroupContext.Provider value={groupState}>
        <div role="group" ref={ref} {...props}>
          {children}
        </div>
      </CheckBoxGroupContext.Provider>
    )
  },
)

// ============================================
// CheckBoxContent Component
// ============================================
export const CheckBoxContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={className} {...props} />
})

CheckBoxGroup.displayName = 'CheckBoxGroup'
CheckBoxContent.displayName = 'CheckBoxContent'
