import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { scrollBarVariants } from './scroll-area.css'

export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
> {
  /**
   * Additional class name for the viewport component.
   */
  viewportClassName?: string
  /**
   * The offset of the scrollbar from the edge.
   * @default 10
   */
  offset?: number
}

/**
 * ScrollArea Component
 * 커스텀 스타일의 스크롤바를 제공하는 스크롤 영역 컴포넌트입니다.
 */
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, viewportClassName, offset = 10, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    data-slot="scroll-area-root"
    className={cn('scroll-area-root', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      className={cn('scroll-area-viewport', viewportClassName)}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar orientation="vertical" offset={offset} />
    <ScrollBar orientation="horizontal" offset={offset} />
    <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export interface ScrollBarProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>, 'orientation'>,
    VariantProps<typeof scrollBarVariants> {
  /**
   * The offset of the scrollbar from the edge.
   * @default 10
   */
  offset?: number
}

/**
 * ScrollBar Component
 * ScrollArea 내에서 사용되는 커스텀 스크롤바 컴포넌트입니다.
 */
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  ScrollBarProps
>(({ className, orientation = 'vertical', offset = 10, ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    data-slot="scroll-bar"
    orientation={orientation as 'vertical' | 'horizontal'}
    className={cn(scrollBarVariants({ orientation, className }))}
    style={
      {
        '--scrollbar-offset': `${offset}px`,
        '--scrollbar-track-size': `${7 + offset}px`,
        ...props.style,
      } as React.CSSProperties
    }
    {...props}
  >
    <ScrollAreaPrimitive.Thumb data-slot="scroll-thumb" className="scroll-thumb" />
  </ScrollAreaPrimitive.Scrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName

export { ScrollArea, ScrollBar }
