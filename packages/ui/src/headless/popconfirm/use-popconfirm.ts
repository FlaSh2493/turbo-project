import * as React from 'react'

// ============================================
// Types
// ============================================

export interface UsePopconfirmProps {
  /** 열림 상태 (Controlled) */
  open?: boolean
  /** 기본 열림 상태 (Uncontrolled) */
  defaultOpen?: boolean
  /** 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void
  /** 확인 버튼 클릭 콜백 (Promise 반환 시 로딩 상태 지원) */
  onConfirm?: () => void | Promise<void>
  /** 취소 버튼 클릭 콜백 */
  onCancel?: () => void
}

export interface UsePopconfirmReturn {
  /** 현재 열림 상태 */
  open: boolean
  /** 열림 상태 변경 함수 */
  setOpen: (open: boolean) => void
  /** 로딩 상태 (비동기 onConfirm 실행 중) */
  isLoading: boolean
  /** 확인 버튼 핸들러 */
  handleConfirm: () => void
  /** 취소 버튼 핸들러 */
  handleCancel: () => void
}

// ============================================
// Hook
// ============================================

export const usePopconfirm = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onConfirm,
  onCancel,
}: UsePopconfirmProps = {}): UsePopconfirmReturn => {
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const [isLoading, setIsLoading] = React.useState(false)

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

  const handleConfirm = React.useCallback(() => {
    if (!onConfirm) {
      setOpen(false)
      return
    }

    const result = onConfirm()

    // 비동기 처리
    if (result instanceof Promise) {
      setIsLoading(true)
      result
        .then(() => {
          setOpen(false)
        })
        .catch(() => {
          // 에러 시 열린 상태 유지
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setOpen(false)
    }
  }, [onConfirm, setOpen])

  const handleCancel = React.useCallback(() => {
    onCancel?.()
    setOpen(false)
  }, [onCancel, setOpen])

  return {
    open,
    setOpen,
    isLoading,
    handleConfirm,
    handleCancel,
  }
}
