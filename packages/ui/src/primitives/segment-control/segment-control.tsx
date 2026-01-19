import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { segmentControlItemVariants } from './segment-control.css'

// ============================================
// Root (Container)
// ============================================

export interface SegmentControlPrimitiveRootProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg'
  children: React.ReactNode
}

export const SegmentControlPrimitiveRoot = forwardRef<
  HTMLDivElement,
  SegmentControlPrimitiveRootProps
>(({ className, size = 'default', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="segment-control-root"
      data-size={size}
      className={cn('segment-control-root-base', `segment-control-root-${size}`, className)}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  )
})
SegmentControlPrimitiveRoot.displayName = 'SegmentControlPrimitiveRoot'

// ============================================
// Indicator (선택 표시자)
// ============================================

export interface SegmentControlPrimitiveIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 인디케이터 left 위치 (px) */
  left: number
  /** 인디케이터 width (px) */
  width: number
  /** 컨테이너 size */
  size?: 'sm' | 'default' | 'lg'
}

export const SegmentControlPrimitiveIndicator = forwardRef<
  HTMLDivElement,
  SegmentControlPrimitiveIndicatorProps
>(({ className, left, width, size = 'default', style, ...props }, ref) => {
  const padding = size === 'sm' ? 2 : size === 'default' ? 3 : 4

  return (
    <div
      ref={ref}
      data-slot="segment-control-indicator"
      className={cn(
        'segment-control-indicator-base',
        `segment-control-indicator-${size}`,
        className,
      )}
      style={{
        left,
        width,
        top: padding,
        bottom: padding,
        ...style,
      }}
      {...props}
    />
  )
})
SegmentControlPrimitiveIndicator.displayName = 'SegmentControlPrimitiveIndicator'

// ============================================
// Item (개별 세그먼트)
// ============================================

export interface SegmentControlPrimitiveItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 선택 상태 */
  selected?: boolean
  children: React.ReactNode
}

export const SegmentControlPrimitiveItem = forwardRef<
  HTMLButtonElement,
  SegmentControlPrimitiveItemProps
>(({ className, selected = false, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      data-slot="segment-control-item"
      data-state={selected ? 'active' : 'inactive'}
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={cn(segmentControlItemVariants({ selected }), className)}
      {...props}
    >
      {children}
    </button>
  )
})
SegmentControlPrimitiveItem.displayName = 'SegmentControlItem'

// ============================================
// Export
// ============================================

export const SegmentControlPrimitive = {
  Root: SegmentControlPrimitiveRoot,
  Indicator: SegmentControlPrimitiveIndicator,
  Item: SegmentControlPrimitiveItem,
}
