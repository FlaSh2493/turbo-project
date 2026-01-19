import { forwardRef } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { indicatorVariants, progressVariants, valueVariants } from './progress.css'

// ============================================
// Progress Component
// ============================================

export interface ProgressProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'value'>,
    VariantProps<typeof progressVariants> {
  /** 진행률 (0-100 또는 0-max) */
  value?: number
  /** 최대값 (기본 100) */
  max?: number
  /** 퍼센트 표시 여부 */
  showValue?: boolean
  /** 스켈레톤 로딩 상태 */
  skeleton?: boolean
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size = 'default',
      showValue = false,
      skeleton = false,
      ...props
    },
    ref,
  ) => {
    // 퍼센트 계산 (0-100 범위로 제한)
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))
    const displayValue = `${Math.round(percentage)}%`

    return (
      <div
        ref={ref}
        data-slot="progress-root"
        data-size={size}
        data-skeleton={skeleton || undefined}
        role="progressbar"
        aria-valuenow={skeleton ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        {/* Progress Indicator */}
        <div
          data-slot="progress-indicator"
          className={cn(
            indicatorVariants({ size }),
            skeleton ? 'progress-shimmer' : 'bg-gradient-to-r from-primary-300 to-primary-300/60',
          )}
          style={{
            width: skeleton ? '100%' : `${percentage}%`,
          }}
        />

        {/* Value Display */}
        {showValue && !skeleton && (
          <>
            {/* Background Value (Gray 600) */}
            <span
              data-slot="progress-value"
              className={cn(valueVariants({ size }), 'left-1/2 -translate-x-1/2 text-gray-600')}
            >
              {displayValue}
            </span>

            {/* Foreground Value (Gray 0) - Clipped */}
            <div
              aria-hidden="true"
              data-slot="progress-value-foreground"
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - percentage}% 0 0)`,
              }}
            >
              <span
                className={cn(valueVariants({ size }), 'left-1/2 -translate-x-1/2 text-gray-0')}
              >
                {displayValue}
              </span>
            </div>
          </>
        )}
      </div>
    )
  },
)

Progress.displayName = 'Progress'
