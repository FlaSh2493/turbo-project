import * as React from 'react'
import {
  TooltipPrimitiveRoot,
  TooltipPrimitiveTrigger,
  TooltipPrimitiveContent,
  TooltipPrimitiveArrow,
  TooltipPrimitiveClose,
  type TooltipPrimitiveRootProps,
  type TooltipPrimitiveContentProps,
  type TooltipPrimitiveArrowProps,
} from '../../primitives/tooltip'
import { cn } from '../../lib/utils'
import { TooltipContext, useTooltipState, type TooltipMode } from '../../headless/tooltip'
import { contentVariants } from './tooltip.css'
import { VariantProps } from 'class-variance-authority'

// ============================================
// Tooltip Main Component
// ============================================

export interface TooltipProps
  extends
    Omit<TooltipPrimitiveRootProps, 'open' | 'onOpenChange'>,
    VariantProps<typeof contentVariants> {
  /** 툴팁 내용 */
  content: React.ReactNode
  /** 툴팁 트리거 요소 */
  children: React.ReactNode
  /** 툴팁 내용 컴포넌트 Props */
  contentProps?: Omit<TooltipPrimitiveContentProps, 'children'>
  /** 화살표 표시 여부 */
  showArrow?: boolean
  /** 화살표 컴포넌트 Props */
  arrowProps?: TooltipPrimitiveArrowProps
  /** 닫기 버튼 표시 여부 */
  showClose?: boolean
  /** 모드 설정 */
  mode?: TooltipMode
  /** 열림 상태 (controlled) */
  open?: boolean
  /** 기본 열림 상태 (uncontrolled) */
  defaultOpen?: boolean
  /** 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void
}

/**
 * Tooltip Component
 * 요소 위에 마우스를 올리거나 클릭했을 때 추가 정보를 제공하는 풍선 도움말입니다.
 */
export const Tooltip = ({
  children,
  content,
  contentProps,
  showArrow = true,
  arrowProps,
  showClose = false,
  mode = 'hover',
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  size = 'md',
  ...props
}: TooltipProps) => {
  const { open, setOpen, radixOpen, radixOnOpenChange } = useTooltipState({
    mode,
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
  })

  return (
    <TooltipContext.Provider value={{ mode, open, setOpen }}>
      <TooltipPrimitiveRoot
        open={radixOpen}
        onOpenChange={radixOnOpenChange}
        delayDuration={mode === 'hover' ? (props.delayDuration ?? 200) : 0}
        {...props}
      >
        <TooltipPrimitiveTrigger asChild mode={mode} open={open} setOpen={setOpen}>
          {children}
        </TooltipPrimitiveTrigger>
        <TooltipPrimitiveContent
          {...contentProps}
          className={cn(contentVariants({ size }), contentProps?.className)}
        >
          <div data-slot="tooltip-inner-content" className="flex items-start gap-1">
            <span data-slot="tooltip-text" className="flex-1">
              {content}
            </span>
            {showClose && <TooltipPrimitiveClose setOpen={setOpen} />}
          </div>
          {showArrow && <TooltipPrimitiveArrow {...arrowProps} />}
        </TooltipPrimitiveContent>
      </TooltipPrimitiveRoot>
    </TooltipContext.Provider>
  )
}
