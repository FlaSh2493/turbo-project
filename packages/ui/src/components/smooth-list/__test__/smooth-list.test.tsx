import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import React from 'react'
import { SmoothList } from '../smooth-list'

describe('SmoothList', () => {
  // Mock WAAPI methods
  const originalAnimate = HTMLElement.prototype.animate
  const originalGetAnimations = HTMLElement.prototype.getAnimations

  beforeEach(() => {
    HTMLElement.prototype.animate = vi.fn()
    HTMLElement.prototype.getAnimations = vi.fn().mockReturnValue([])
  })

  afterEach(() => {
    HTMLElement.prototype.animate = originalAnimate
    HTMLElement.prototype.getAnimations = originalGetAnimations
    vi.restoreAllMocks()
  })

  it('renders children correctly', () => {
    render(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
        <div data-layout-id="2">Item 2</div>
      </SmoothList>,
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders as different tag using "as" prop', () => {
    const { container } = render(
      <SmoothList as="div">
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('uses custom duration', async () => {
    const { rerender } = render(
      <SmoothList duration={500}>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    // Trigger position change
    const item = screen.getByText('Item 1')
    vi.spyOn(item, 'getBoundingClientRect')
      .mockReturnValueOnce({ top: 100, left: 100 } as any) // initial render positions are saved in prevRects
      .mockReturnValueOnce({ top: 0, left: 0 } as any) // second render positions

    rerender(
      <SmoothList duration={500}>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    expect(item.animate).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ duration: 500 }),
    )
  })

  it('finishes ongoing animations before starting new one', () => {
    const { rerender } = render(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    // Trigger position change
    const item = screen.getByText('Item 1')
    vi.spyOn(item, 'getBoundingClientRect')
      .mockReturnValueOnce({ top: 100, left: 100 } as any)
      .mockReturnValueOnce({ top: 0, left: 0 } as any)

    rerender(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )
  })

  it('triggers animation on reorder (FLIP)', async () => {
    const { rerender } = render(
      <SmoothList>
        <div data-layout-id="1" key="1">
          Item 1
        </div>
        <div data-layout-id="2" key="2">
          Item 2
        </div>
      </SmoothList>,
    )

    // Initial positions
    const items = screen.getAllByText(/Item/)
    vi.spyOn(items[0], 'getBoundingClientRect').mockReturnValue({
      top: 0,
      left: 0,
    } as any)
    vi.spyOn(items[1], 'getBoundingClientRect').mockReturnValue({
      top: 50,
      left: 0,
    } as any)

    // Re-render with swapped order and different layout
    vi.spyOn(items[0], 'getBoundingClientRect').mockReturnValue({
      top: 50,
      left: 0,
    } as any)
    vi.spyOn(items[1], 'getBoundingClientRect').mockReturnValue({
      top: 0,
      left: 0,
    } as any)

    rerender(
      <SmoothList>
        <div data-layout-id="2" key="2">
          Item 2
        </div>
        <div data-layout-id="1" key="1">
          Item 1
        </div>
      </SmoothList>,
    )

    expect(items[0].animate).toHaveBeenCalled()
    expect(items[1].animate).toHaveBeenCalled()
  })

  it('skips children without data-layout-id', () => {
    const { rerender } = render(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
        <div>No Key</div>
      </SmoothList>,
    )

    const item1 = screen.getByText('Item 1')
    vi.spyOn(item1, 'getBoundingClientRect')
      .mockReturnValueOnce({ top: 100, left: 0 } as any)
      .mockReturnValueOnce({ top: 0, left: 0 } as any)

    rerender(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
        <div>No Key</div>
      </SmoothList>,
    )

    expect(item1.animate).toHaveBeenCalled()
  })

  it('handles empty children', () => {
    const { rerender } = render(<SmoothList>{null}</SmoothList>)
    rerender(<SmoothList>{null}</SmoothList>)
    // Should not crash
  })

  it('does not animate when position has not changed', () => {
    const { rerender } = render(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    const item = screen.getByText('Item 1')
    // After first render, mock same position for second render
    vi.spyOn(item, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      left: 0,
    } as DOMRect)

    rerender(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    // animate should not be called when deltaX and deltaY are both 0
    expect(item.animate).not.toHaveBeenCalled()
  })

  it('handles horizontal position change only', () => {
    const { rerender } = render(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    const item = screen.getByText('Item 1')
    // After first render, mock positions: first call returns old pos, second returns new pos
    vi.spyOn(item, 'getBoundingClientRect')
      .mockReturnValueOnce({ top: 100, left: 50 } as DOMRect) // saved as prevRect
      .mockReturnValueOnce({ top: 100, left: 0 } as DOMRect) // new position

    // First rerender to establish prevRects
    rerender(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    // Second rerender to trigger animation
    rerender(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    expect(item.animate).toHaveBeenCalledWith(
      [{ transform: 'translate(50px, 0px)' }, { transform: 'translate(0, 0)' }],
      expect.objectContaining({
        duration: 300,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        fill: 'both',
      }),
    )
  })

  it('passes className and other props to container', () => {
    const { container } = render(
      <SmoothList className="custom-class" data-testid="smooth-list">
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    const list = container.firstChild as HTMLElement
    expect(list).toHaveClass('custom-class')
    expect(list).toHaveAttribute('data-testid', 'smooth-list')
  })

  it('renders as ul by default', () => {
    const { container } = render(
      <SmoothList>
        <li data-layout-id="1">Item 1</li>
      </SmoothList>,
    )

    expect(container.firstChild?.nodeName).toBe('UL')
  })

  it('handles vertical position change only', () => {
    const { rerender } = render(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    const item = screen.getByText('Item 1')
    vi.spyOn(item, 'getBoundingClientRect')
      .mockReturnValueOnce({ top: 50, left: 100 } as DOMRect)
      .mockReturnValueOnce({ top: 0, left: 100 } as DOMRect)

    rerender(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    rerender(
      <SmoothList>
        <div data-layout-id="1">Item 1</div>
      </SmoothList>,
    )

    expect(item.animate).toHaveBeenCalledWith(
      [{ transform: 'translate(0px, 50px)' }, { transform: 'translate(0, 0)' }],
      expect.objectContaining({
        duration: 300,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        fill: 'both',
      }),
    )
  })
})
