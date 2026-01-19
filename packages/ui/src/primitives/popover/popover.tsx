import * as React from 'react'
import * as RadixPopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '../../lib/utils'

// ============================================
// Root
// ============================================

export interface PopoverPrimitiveRootProps extends RadixPopoverPrimitive.PopoverProps {
  children: React.ReactNode
}

export const PopoverPrimitiveRoot = ({ children, ...props }: PopoverPrimitiveRootProps) => {
  return <RadixPopoverPrimitive.Root {...props}>{children}</RadixPopoverPrimitive.Root>
}

PopoverPrimitiveRoot.displayName = 'PopoverPrimitiveRoot'

// ============================================
// Trigger
// ============================================

export interface PopoverPrimitiveTriggerProps extends React.ComponentPropsWithoutRef<
  typeof RadixPopoverPrimitive.Trigger
> {
  children: React.ReactNode
}

export const PopoverPrimitiveTrigger = React.forwardRef<
  React.ElementRef<typeof RadixPopoverPrimitive.Trigger>,
  PopoverPrimitiveTriggerProps
>(({ children, className, ...props }, ref) => {
  return (
    <RadixPopoverPrimitive.Trigger
      ref={ref}
      data-slot="popover-trigger"
      className={cn('popover-trigger', className)}
      {...props}
    >
      {children}
    </RadixPopoverPrimitive.Trigger>
  )
})

PopoverPrimitiveTrigger.displayName = 'PopoverPrimitiveTrigger'

// ============================================
// Anchor
// ============================================

export interface PopoverPrimitiveAnchorProps extends React.ComponentPropsWithoutRef<
  typeof RadixPopoverPrimitive.Anchor
> {
  children?: React.ReactNode
}

export const PopoverPrimitiveAnchor = React.forwardRef<
  React.ElementRef<typeof RadixPopoverPrimitive.Anchor>,
  PopoverPrimitiveAnchorProps
>(({ children, className, ...props }, ref) => {
  return (
    <RadixPopoverPrimitive.Anchor
      ref={ref}
      data-slot="popover-anchor"
      className={className}
      {...props}
    >
      {children}
    </RadixPopoverPrimitive.Anchor>
  )
})

PopoverPrimitiveAnchor.displayName = 'PopoverPrimitiveAnchor'

// ============================================
// Content
// ============================================

export interface PopoverPrimitiveContentProps extends React.ComponentPropsWithoutRef<
  typeof RadixPopoverPrimitive.Content
> {
  children: React.ReactNode
}

export const PopoverPrimitiveContent = React.forwardRef<
  React.ElementRef<typeof RadixPopoverPrimitive.Content>,
  PopoverPrimitiveContentProps
>(({ className, children, sideOffset = 8, ...props }, ref) => {
  return (
    <RadixPopoverPrimitive.Portal>
      <RadixPopoverPrimitive.Content
        ref={ref}
        data-slot="popover-content"
        sideOffset={sideOffset}
        className={cn('popover-content', className)}
        {...props}
      >
        {children}
      </RadixPopoverPrimitive.Content>
    </RadixPopoverPrimitive.Portal>
  )
})

PopoverPrimitiveContent.displayName = 'PopoverPrimitiveContent'

// ============================================
// Arrow
// ============================================

export type PopoverPrimitiveArrowProps = React.ComponentPropsWithoutRef<
  typeof RadixPopoverPrimitive.Arrow
>

export const PopoverPrimitiveArrow = React.forwardRef<
  React.ElementRef<typeof RadixPopoverPrimitive.Arrow>,
  PopoverPrimitiveArrowProps
>(({ className, ...props }, ref) => (
  <RadixPopoverPrimitive.Arrow
    ref={ref}
    data-slot="popover-arrow"
    className={cn('popover-arrow', className)}
    width={16}
    height={12}
    {...props}
  />
))

PopoverPrimitiveArrow.displayName = 'PopoverPrimitiveArrow'

// ============================================
// Close
// ============================================

export interface PopoverPrimitiveCloseProps extends React.ComponentPropsWithoutRef<
  typeof RadixPopoverPrimitive.Close
> {
  children?: React.ReactNode
}

export const PopoverPrimitiveClose = React.forwardRef<
  React.ElementRef<typeof RadixPopoverPrimitive.Close>,
  PopoverPrimitiveCloseProps
>(({ children, className, ...props }, ref) => {
  return (
    <RadixPopoverPrimitive.Close
      ref={ref}
      data-slot="popover-close"
      className={cn('popover-close', className)}
      {...props}
    >
      {children}
    </RadixPopoverPrimitive.Close>
  )
})

PopoverPrimitiveClose.displayName = 'PopoverPrimitiveClose'

export const PopoverPrimitive = {
  Root: PopoverPrimitiveRoot,
  Trigger: PopoverPrimitiveTrigger,
  Content: PopoverPrimitiveContent,
  Arrow: PopoverPrimitiveArrow,
  Close: PopoverPrimitiveClose,
}
