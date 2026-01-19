import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

export interface ButtonPrimitiveProps extends React.ComponentProps<'button'> {
  asChild?: boolean
}

export const ButtonPrimitive = React.forwardRef<HTMLButtonElement, ButtonPrimitiveProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return <Comp data-slot="button" className={className} ref={ref} {...props} />
  },
)
ButtonPrimitive.displayName = 'ButtonPrimitive'
