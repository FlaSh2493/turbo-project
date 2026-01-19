import { forwardRef } from 'react'
import { X, Check } from 'lucide-react'
import { cn } from '../../lib/utils'

// ============================================
// Viewport (Portal Container)
// ============================================

export interface ToastViewportProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Y축 오프셋 (px) - rem으로 변환되어 적용 */
  offsetY?: number
}

const ToastViewport = forwardRef<HTMLDivElement, ToastViewportProps>(
  ({ className, offsetY, style, ...props }, ref) => {
    const bottomOffset = offsetY ? `${offsetY / 16}rem` : '2.5rem' // 기본 40px = 2.5rem

    return (
      <div
        ref={ref}
        data-slot="toast-viewport"
        className={cn('toast-viewport-base', className)}
        style={{
          bottom: bottomOffset,
          ...style,
        }}
        {...props}
      />
    )
  },
)
ToastViewport.displayName = 'ToastViewport'

// ============================================
// Root (Individual Toast Container)
// ============================================

export interface ToastRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 토스트 상태 */
  open?: boolean
  /** 애니메이션 완료 콜백 */
  onAnimationComplete?: () => void
  /** 토스트 제거 핸들러 */
  onRemove?: () => void
}

const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>(
  ({ className, open = true, onAnimationComplete, onRemove, ...props }, ref) => {
    const handleAnimationEnd = () => {
      // 닫기 애니메이션이 끝났을 때만 콜백 호출
      if (!open) {
        onRemove?.()
      }
      onAnimationComplete?.()
    }

    return (
      <div
        ref={ref}
        data-slot="toast"
        data-state={open ? 'open' : 'closed'}
        role="alert"
        aria-live="polite"
        className={cn('toast-root-base', className)}
        onAnimationEnd={handleAnimationEnd}
        {...props}
      />
    )
  },
)
ToastRoot.displayName = 'ToastRoot'

// ============================================
// Content (Icon + Description Container)
// ============================================

const ToastContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="toast-content"
        className={cn('toast-content-base', className)}
        {...props}
      />
    )
  },
)
ToastContent.displayName = 'ToastContent'

// ============================================
// Icon (Check Icon)
// ============================================

export interface ToastIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 아이콘 타입 */
  type?: 'success'
}

const ToastIcon = forwardRef<HTMLDivElement, ToastIconProps>(
  ({ className, type = 'success', ...props }, ref) => {
    return (
      <div ref={ref} data-slot="toast-icon" className={cn('toast-icon-base', className)} {...props}>
        {type === 'success' && (
          <div className="toast-icon-success">
            <Check className="h-[10px] w-[10px] text-gray-0" strokeWidth={3} />
          </div>
        )}
      </div>
    )
  },
)
ToastIcon.displayName = 'ToastIcon'

// ============================================
// Description (Text)
// ============================================

const ToastDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      data-slot="toast-description"
      className={cn('toast-description-base', className)}
      {...props}
    />
  )
})
ToastDescription.displayName = 'ToastDescription'

// ============================================
// Close Button
// ============================================

const ToastClose = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot="toast-close"
        type="button"
        aria-label="toast-close"
        className={cn('toast-close-base', className)}
        {...props}
      >
        <X className="h-[16px] w-[16px]" strokeWidth={2} />
      </button>
    )
  },
)
ToastClose.displayName = 'ToastClose'

// ============================================
// Export
// ============================================

export const ToastPrimitive = {
  Viewport: ToastViewport,
  Root: ToastRoot,
  Content: ToastContent,
  Icon: ToastIcon,
  Description: ToastDescription,
  Close: ToastClose,
}
