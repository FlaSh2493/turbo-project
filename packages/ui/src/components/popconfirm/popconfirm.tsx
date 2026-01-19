import * as React from 'react'
import { PopoverPrimitive } from '../../primitives/popover'
import { usePopconfirm, type UsePopconfirmProps } from '../../headless/popconfirm'
import { cn } from '../../lib/utils'
import { Button } from '../../components/button/button'

// ============================================
// PopConfirm
// ============================================

export interface PopConfirmProps extends UsePopconfirmProps {
  /** 트리거 요소 */
  children: React.ReactNode
  /** 확인 메시지 */
  title: React.ReactNode
  /** 확인 버튼 텍스트 */
  confirmText?: string
  /** 아니요 버튼 텍스트 */
  cancelText?: string
  /** Popover가 나타날 방향 (top, bottom, left, right) */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Popover의 정렬 기준 (start, center, end) */
  align?: 'start' | 'center' | 'end'
  /** 화살표 표시 여부 */
  showArrow?: boolean
  /** 로딩 중 텍스트 */
  loadingText?: string
  /** 확인 버튼 비활성화 */
  confirmDisabled?: boolean
  /** 취소 버튼 비활성화 */
  cancelDisabled?: boolean
  /** 추가 클래스명 */
  className?: string
}

/**
 * PopConfirm Component
 * 특정 요소를 클릭했을 때 확인/취소 버튼이 포함된 팝오버를 표시합니다.
 */
export const PopConfirm = ({
  children,
  title,
  confirmText = '네',
  cancelText = '아니요',
  side = 'top',
  align = 'center',
  showArrow = true,
  className,
  loadingText,
  confirmDisabled = false,
  cancelDisabled = false,
  // usePopconfirm props
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  onConfirm,
  onCancel,
}: PopConfirmProps) => {
  const { open, setOpen, isLoading, handleConfirm, handleCancel } = usePopconfirm({
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
    onConfirm,
    onCancel,
  })

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content side={side} align={align} className={cn('p-5 shadow-1', className)}>
        <div data-slot="popconfirm-title" className="popconfirm-title">
          {title}
        </div>
        <div data-slot="popconfirm-button-area" className="popconfirm-button-area">
          <Button
            variant="secondary"
            size="md"
            data-slot="popconfirm-cancel-button"
            onClick={handleCancel}
            disabled={cancelDisabled || isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant="outline"
            size="md"
            data-slot="popconfirm-confirm-button"
            onClick={handleConfirm}
            disabled={confirmDisabled || isLoading}
          >
            {isLoading ? (loadingText ?? confirmText) : confirmText}
          </Button>
        </div>
        {showArrow && <PopoverPrimitive.Arrow />}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  )
}

PopConfirm.displayName = 'PopConfirm'
