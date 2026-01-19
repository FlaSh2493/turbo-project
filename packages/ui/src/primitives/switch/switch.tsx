import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '../../lib/utils'
import { switchRootVariants, switchThumbVariants } from './switch.css'

/**
 * Switch Root Component
 * 사용자가 두 가지 상태(on/off) 중 하나를 선택할 수 있게 하는 토글 스위치입니다.
 */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, checked, defaultChecked, disabled, ...props }, ref) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false)
  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : internalChecked

  return (
    <SwitchPrimitives.Root
      ref={ref}
      data-slot="switch-root"
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={(newChecked) => {
        if (!isControlled) {
          setInternalChecked(newChecked)
        }
        props.onCheckedChange?.(newChecked)
      }}
      className={cn(switchRootVariants({ checked: isChecked, disabled }), className)}
      {...props}
    >
      <SwitchPrimitives.Thumb
        data-slot="switch-thumb"
        className={switchThumbVariants({ checked: isChecked, disabled })}
      />
    </SwitchPrimitives.Root>
  )
})

Switch.displayName = SwitchPrimitives.Root.displayName
