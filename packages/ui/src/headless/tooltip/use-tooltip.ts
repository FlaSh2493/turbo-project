import * as React from 'react'

export type TooltipMode = 'hover' | 'click'

export interface TooltipContextValue {
  mode: TooltipMode
  open: boolean
  setOpen: (open: boolean) => void
}

export const TooltipContext = React.createContext<TooltipContextValue | null>(null)

export const useTooltipContext = () => {
  const context = React.useContext(TooltipContext)
  if (!context) {
    throw new Error('Tooltip components must be used within TooltipProvider')
  }
  return context
}

export interface UseTooltipStateProps {
  mode?: TooltipMode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const useTooltipState = ({
  mode = 'hover',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: UseTooltipStateProps) => {
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange],
  )

  // hover mode utilizes Radix default behavior
  // click mode utilizes manual control
  const radixOpen = mode === 'click' ? open : undefined
  const radixOnOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (mode === 'click') {
        if (nextOpen) {
          setOpen(true)
        }
        // ignore false (outside click / escape)
      } else {
        onOpenChange?.(nextOpen)
      }
    },
    [mode, setOpen, onOpenChange],
  )

  return {
    mode,
    open,
    setOpen,
    radixOpen,
    radixOnOpenChange,
  }
}
