import { createContext, useContext, useCallback, useEffect, useRef } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { SegmentControlPrimitive } from '../../primitives/segment-control'
import { useSegmentControl } from '../../headless/segment-control'
import { segmentControlItemVariants, segmentControlVariants } from './segment-control.css'
import { cn } from '../../lib/utils'

// ============================================
// Context
// ============================================

interface SegmentControlContextValue {
  selectedValue: string | undefined
  selectValue: (value: string) => void
  registerItem: (value: string, element: HTMLElement | null) => void
  size: 'sm' | 'default' | 'lg'
}

const SegmentControlContext = createContext<SegmentControlContextValue | null>(null)

function useSegmentControlContext() {
  const context = useContext(SegmentControlContext)
  if (!context) {
    throw new Error('SegmentControl components must be used within SegmentControl.Root')
  }
  return context
}

// ============================================
// Root
// ============================================

interface SegmentControlRootProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'>,
    VariantProps<typeof segmentControlVariants> {
  /** 현재 선택 값 (controlled) */
  value?: string
  /** 초기 선택 값 (uncontrolled) */
  defaultValue?: string
  /** 값 변경 콜백 */
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

/**
 * SegmentControl Root Component
 * 여러 옵션 중 하나를 선택할 수 있는 세그먼트 컨트롤의 컨테이너입니다.
 */
function SegmentControlRoot({
  className,
  size,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: SegmentControlRootProps) {
  const { selectedValue, selectValue, registerItem, indicatorStyle, containerRef } =
    useSegmentControl({
      value,
      defaultValue,
      onValueChange,
    })

  return (
    <SegmentControlContext.Provider
      value={{
        selectedValue,
        selectValue,
        registerItem,
        size: size ?? 'default',
      }}
    >
      <SegmentControlPrimitive.Root
        ref={containerRef}
        size={size ?? 'default'}
        className={cn(segmentControlVariants({ size }), className)}
        {...props}
      >
        {/* Indicator */}
        {indicatorStyle && (
          <SegmentControlPrimitive.Indicator
            left={indicatorStyle.left}
            width={indicatorStyle.width}
            size={size ?? 'default'}
          />
        )}
        {children}
      </SegmentControlPrimitive.Root>
    </SegmentControlContext.Provider>
  )
}

// ============================================
// Item
// ============================================

interface SegmentControlItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> {
  /** 아이템 값 */
  value: string
  children: React.ReactNode
}

/**
 * SegmentControl Item Component
 * 세그먼트 컨트롤의 개별 선택 옵션입니다.
 */
function SegmentControlItem({ className, value, children, ...props }: SegmentControlItemProps) {
  const { selectedValue, selectValue, registerItem, size } = useSegmentControlContext()
  const isSelected = selectedValue === value
  const ref = useRef<HTMLButtonElement>(null)

  // 요소 등록
  const handleRef = useCallback(
    (element: HTMLButtonElement | null) => {
      ;(ref as React.MutableRefObject<HTMLButtonElement | null>).current = element
      registerItem(value, element)
    },
    [registerItem, value],
  )

  // 초기 마운트 시 재계산 트리거
  useEffect(() => {
    registerItem(value, ref.current)
    return () => {
      registerItem(value, null)
    }
  }, [registerItem, value])

  return (
    <SegmentControlPrimitive.Item
      ref={handleRef}
      selected={isSelected}
      className={cn(segmentControlItemVariants({ size }), className)}
      onClick={() => selectValue(value)}
      {...props}
    >
      {children}
    </SegmentControlPrimitive.Item>
  )
}

// ============================================
// Export
// ============================================

export const SegmentControl = {
  Root: SegmentControlRoot,
  Item: SegmentControlItem,
}

export type { SegmentControlRootProps, SegmentControlItemProps }
