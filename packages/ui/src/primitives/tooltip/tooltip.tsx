import * as React from 'react'
import * as RadixTooltipPrimitive from '@radix-ui/react-tooltip'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { type TooltipMode } from '../../headless/tooltip'

// ============================================
// Root
// ============================================

export interface TooltipPrimitiveRootProps
  extends
    Omit<RadixTooltipPrimitive.TooltipProps, 'open' | 'defaultOpen' | 'onOpenChange'>,
    Omit<React.ComponentPropsWithoutRef<typeof RadixTooltipPrimitive.Provider>, 'children'> {
  /** Radix UI 열림 상태 (Visual) */
  open?: boolean
  /** Radix UI 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export const TooltipPrimitiveRoot = ({
  open,
  onOpenChange,
  children,
  delayDuration,
  skipDelayDuration,
  disableHoverableContent,
  ...props
}: TooltipPrimitiveRootProps) => {
  return (
    <RadixTooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <RadixTooltipPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
        disableHoverableContent={disableHoverableContent}
        {...props}
      >
        {children}
      </RadixTooltipPrimitive.Root>
    </RadixTooltipPrimitive.Provider>
  )
}

// ============================================
// Trigger
// ============================================

export interface TooltipPrimitiveTriggerProps extends React.ComponentPropsWithoutRef<
  typeof RadixTooltipPrimitive.Trigger
> {
  mode?: TooltipMode
  open?: boolean
  setOpen?: (open: boolean) => void
  children: React.ReactNode
}

export const TooltipPrimitiveTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTooltipPrimitive.Trigger>,
  TooltipPrimitiveTriggerProps
>(({ children, onClick, mode, open, setOpen, className, ...props }, ref) => {
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (mode === 'click') {
        e.preventDefault()
        setOpen?.(!open)
      }
      onClick?.(e)
    },
    [mode, open, setOpen, onClick],
  )

  return (
    <RadixTooltipPrimitive.Trigger
      ref={ref}
      data-slot="tooltip-trigger"
      className={cn('tooltip-trigger-base', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </RadixTooltipPrimitive.Trigger>
  )
})
TooltipPrimitiveTrigger.displayName = 'TooltipTrigger'

// ============================================
// Content
// ============================================

export interface TooltipPrimitiveContentProps extends React.ComponentPropsWithoutRef<
  typeof RadixTooltipPrimitive.Content
> {
  children: React.ReactNode
}

export const TooltipPrimitiveContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltipPrimitive.Content>,
  TooltipPrimitiveContentProps
>(({ className, sideOffset = 4, children, ...props }, ref) => {
  return (
    <RadixTooltipPrimitive.Portal>
      <RadixTooltipPrimitive.Content
        ref={ref}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn('tooltip-content-base', className)}
        {...props}
      >
        {children}
      </RadixTooltipPrimitive.Content>
    </RadixTooltipPrimitive.Portal>
  )
})
TooltipPrimitiveContent.displayName = 'TooltipContent'

// ============================================
// Arrow
// ============================================

export type TooltipPrimitiveArrowProps = React.ComponentPropsWithoutRef<
  typeof RadixTooltipPrimitive.Arrow
>

export const TooltipPrimitiveArrow = React.forwardRef<
  React.ElementRef<typeof RadixTooltipPrimitive.Arrow>,
  TooltipPrimitiveArrowProps
>(({ className, ...props }, ref) => (
  <RadixTooltipPrimitive.Arrow
    ref={ref}
    data-slot="tooltip-arrow"
    className={cn('tooltip-arrow-base', className)}
    width={14}
    height={9}
    {...props}
  />
))
TooltipPrimitiveArrow.displayName = 'TooltipArrow'

// ============================================
// Close (standalone)
// ============================================

export interface TooltipPrimitiveCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  setOpen?: (open: boolean) => void
  children?: React.ReactNode
}

export const TooltipPrimitiveClose = React.forwardRef<
  HTMLButtonElement,
  TooltipPrimitiveCloseProps
>(({ className, children, setOpen, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      data-slot="tooltip-close"
      onClick={() => setOpen?.(false)}
      className={cn('tooltip-close-base', className)}
      aria-label="Close tooltip"
      {...props}
    >
      {children ?? <X className="w-3 h-3" />}
    </button>
  )
})
TooltipPrimitiveClose.displayName = 'TooltipClose'

// ============================================
// Export
// ============================================

export const TooltipPrimitive = {
  Root: TooltipPrimitiveRoot,
  Trigger: TooltipPrimitiveTrigger,
  Content: TooltipPrimitiveContent,
  Arrow: TooltipPrimitiveArrow,
  Close: TooltipPrimitiveClose,
}
