import * as React from 'react'

// ============================================
// Types
// ============================================

export interface UseModalProps {
  /** 열림 상태 (Controlled) */
  open?: boolean
  /** 기본 열림 상태 (Uncontrolled) */
  defaultOpen?: boolean
  /** 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void
}

export interface UseModalReturn {
  /** 현재 열림 상태 */
  open: boolean
  /** 열림 상태 변경 함수 */
  setOpen: (open: boolean) => void
}

// ============================================
// Hook
// ============================================

export const useModal = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: UseModalProps = {}): UseModalReturn => {
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

  return {
    open,
    setOpen,
  }
}
