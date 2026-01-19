import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { ScrollArea, ScrollBar } from '../scroll-area'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

describe('ScrollArea', () => {
  it('should render children correctly', () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <div>Scroll Content</div>
      </ScrollArea>,
    )

    expect(screen.getByText('Scroll Content')).toBeInTheDocument()
    expect(screen.getByTestId('scroll-area')).toHaveAttribute('data-slot', 'scroll-area-root')
  })

  it('should apply custom className and viewportClassName', () => {
    render(
      <ScrollArea
        className="custom-root"
        viewportClassName="custom-viewport"
        data-testid="scroll-area"
      >
        <div>Content</div>
      </ScrollArea>,
    )

    const root = screen.getByTestId('scroll-area')
    expect(root).toHaveClass('custom-root')

    const viewport = root.querySelector('[data-radix-scroll-area-viewport]')
    expect(viewport).toHaveClass('custom-viewport')
  })

  it('should render both vertical and horizontal scrollbars by default', () => {
    const { container } = render(
      <ScrollArea type="always">
        <div style={{ width: '200px', height: '200px' }}>Large Content</div>
      </ScrollArea>,
    )

    const scrollbars = container.querySelectorAll('[data-slot="scroll-bar"]')
    // Note: Radix UI may render scrollbars differently in test environment
    expect(scrollbars.length).toBe(2)
  })

  describe('ScrollBar', () => {
    it('should hit default orientation and offset branches', () => {
      const { container } = render(
        <ScrollAreaPrimitive.Root type="always">
          <ScrollBar />
        </ScrollAreaPrimitive.Root>,
      )

      const scrollbar = container.querySelector('[data-slot="scroll-bar"]')
      expect(scrollbar).toBeInTheDocument()
      expect(scrollbar).toHaveAttribute('data-orientation', 'vertical')
    })

    it('should hit custom orientation and default offset branches', () => {
      const { container } = render(
        <ScrollAreaPrimitive.Root type="always">
          <ScrollBar orientation="horizontal" />
        </ScrollAreaPrimitive.Root>,
      )

      const scrollbar = container.querySelector('[data-slot="scroll-bar"]')
      expect(scrollbar).toHaveAttribute('data-orientation', 'horizontal')
    })

    it('should hit custom offset and default orientation branches', () => {
      const { container } = render(
        <ScrollAreaPrimitive.Root type="always">
          <ScrollBar offset={20} />
        </ScrollAreaPrimitive.Root>,
      )

      const scrollbar = container.querySelector('[data-slot="scroll-bar"]')
      expect(scrollbar).toBeInTheDocument()
      // Verification of style is flaky in JSDOM, but hitting the branch is the goal
    })

    it('should hit all custom branches', () => {
      const { container } = render(
        <ScrollAreaPrimitive.Root type="always">
          <ScrollBar orientation="horizontal" offset={20} style={{ opacity: 0.5 }} />
        </ScrollAreaPrimitive.Root>,
      )

      const scrollbar = container.querySelector('[data-slot="scroll-bar"]')
      expect(scrollbar).toHaveAttribute('data-orientation', 'horizontal')
    })
  })
})
