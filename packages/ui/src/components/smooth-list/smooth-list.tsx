import React, { PropsWithChildren, useLayoutEffect, useRef } from 'react'

export interface SmoothListProps<T extends React.ElementType> extends PropsWithChildren {
  className?: string
  as?: T
  duration?: number
}

export const SmoothList = <T extends React.ElementType = 'ul'>({
  children,
  duration = 300,
  ...props
}: SmoothListProps<T>) => {
  const containerRef = useRef<HTMLElement>(null)
  const prevRects = useRef(new Map<string, DOMRect>())

  useLayoutEffect(() => {
    const container = containerRef.current
    /* istanbul ignore if -- @preserve defensive check for null ref */
    if (!container) return

    const currentChildren = Array.from(container.children) as HTMLElement[]
    const newRects = new Map<string, DOMRect>()

    currentChildren.forEach(child => {
      const key = child.dataset.layoutId
      if (!key) return

      const newRect = child.getBoundingClientRect()
      newRects.set(key, newRect)

      const oldRect = prevRects.current.get(key)

      if (oldRect) {
        const deltaX = oldRect.left - newRect.left
        const deltaY = oldRect.top - newRect.top

        if (deltaX !== 0 || deltaY !== 0) {
          child.animate(
            [
              { transform: `translate(${deltaX}px, ${deltaY}px)` },
              { transform: 'translate(0, 0)' },
            ],
            {
              duration,
              easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
              fill: 'both', // 애니메이션 종료 후 상태 유지
            },
          )
        }
      }
    })

    prevRects.current = newRects
  }) // 모든 렌더링에 반응하도록 의존성 제거

  const Component = props.as || 'ul'
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Component ref={containerRef as any} {...props}>
      {children}
    </Component>
  )
}
