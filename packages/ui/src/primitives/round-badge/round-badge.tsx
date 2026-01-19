import * as React from 'react'
import { cn } from '../../lib/utils'

// ============================================
// Root
// ============================================

/**
 * RoundBadge Root Component
 * 배지의 컨테이너 역할을 하며 기본 스타일과 레이아웃을 제공합니다.
 */
export interface RoundBadgeRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const RoundBadgeRoot = React.forwardRef<HTMLDivElement, RoundBadgeRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="badge-root"
        className={cn('badge-round-root', className)}
        {...props}
      />
    )
  },
)
RoundBadgeRoot.displayName = 'RoundBadge.Root'

// ============================================
// Dot
// ============================================

/**
 * RoundBadge Dot Component
 * 배지 내부에 표시되는 원형 아이콘(점) 스타일을 제공합니다.
 */
export type RoundBadgeDotProps = React.HTMLAttributes<HTMLDivElement>

export const RoundBadgeDot = React.forwardRef<HTMLDivElement, RoundBadgeDotProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} data-slot="badge-dot" className={cn('badge-dot', className)} {...props} />
  },
)
RoundBadgeDot.displayName = 'RoundBadge.Dot'

// ============================================
// Content
// ============================================

/**
 * RoundBadge Content Component
 * 배지 내부에 텍스트 콘텐츠를 표시하는 정규화된 스타일을 제공합니다.
 */
export interface RoundBadgeContentProps
  extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {}

export const RoundBadgeContent = React.forwardRef<HTMLDivElement, RoundBadgeContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="badge-content"
        className={cn('badge-content', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
RoundBadgeContent.displayName = 'RoundBadge.Content'

// ============================================
// Export
// ============================================

export const RoundBadge = {
  Root: RoundBadgeRoot,
  Dot: RoundBadgeDot,
  Content: RoundBadgeContent,
}
