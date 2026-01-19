import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/utils'

// ============================================
// Primitives
// ============================================

export interface SelectPrimitiveRootProps extends React.PropsWithChildren {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const SelectPrimitiveRoot = ({ children, open, onOpenChange }: SelectPrimitiveRootProps) => {
  return (
    <DropdownMenuPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DropdownMenuPrimitive.Root>
  )
}

export const SelectPrimitiveTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    data-slot="select-trigger"
    className={cn('outline-none', className)}
    {...props}
  />
))
SelectPrimitiveTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName

export const SelectPrimitiveContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, style, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      data-slot="select-content"
      sideOffset={sideOffset}
      className={cn('select-content-base', className)}
      style={{
        width: 'var(--radix-dropdown-menu-trigger-width)',
        ...style,
      }}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
SelectPrimitiveContent.displayName = DropdownMenuPrimitive.Content.displayName

export interface SelectPrimitiveItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
  'children'
> {
  value: string
  type: 'single' | 'multiple'
  selectedValue: string | string[]
  handleItemSelect: (value: string) => void
  children?: React.ReactNode | ((props: { isSelected: boolean }) => React.ReactNode)
}

export const SelectPrimitiveItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  SelectPrimitiveItemProps
>(({ className, children, value, type, selectedValue, handleItemSelect, ...props }, ref) => {
  const isSelected = Array.isArray(selectedValue)
    ? selectedValue.includes(value)
    : selectedValue === value

  // Using DropdownMenuPrimitive.Item for both single and multiple
  // because we handle the 'checked' state manually in the headless layer
  // and multi-select in Radix DropdownMenu is typically CheckboxItem,
  // but we want a unified PrimitiveItem that handles both based on context.

  const handleSelect = (event: Event) => {
    // Prevent closing if multiple
    if (type === 'multiple') {
      event.preventDefault()
    }
    handleItemSelect(value)
  }

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn('select-item-base', className)}
      onSelect={handleSelect}
      disabled={props.disabled}
      {...props}
    >
      {typeof children === 'function' ? children({ isSelected }) : children}
    </DropdownMenuPrimitive.Item>
  )
})
SelectPrimitiveItem.displayName = DropdownMenuPrimitive.Item.displayName
