import * as React from 'react'
import { cn } from '../../lib/utils'

// ============================================
// Root
// ============================================

/**
 * SquareBadge Root Component
 * 각진 모서리의 배지 컨테이너 역할을 하며 기본 스타일과 레이아웃을 제공합니다.
 */
export interface SquareBadgeRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const SquareBadgeRoot = React.forwardRef<HTMLDivElement, SquareBadgeRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="badge-root"
        className={cn('badge-square-root', className)}
        {...props}
      />
    )
  },
)
SquareBadgeRoot.displayName = 'SquareBadge.Root'

// ============================================
// Content
// ============================================

/**
 * SquareBadge Content Component
 * 배지 내부에 텍스트 콘텐츠를 표시하는 정규화된 스타일을 제공합니다.
 */
export interface SquareBadgeContentProps
  extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {}

export const SquareBadgeContent = React.forwardRef<HTMLDivElement, SquareBadgeContentProps>(
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
SquareBadgeContent.displayName = 'SquareBadge.Content'

// ============================================
// Export
// ============================================

export const SquareBadge = {
  Root: SquareBadgeRoot,
  Content: SquareBadgeContent,
}
