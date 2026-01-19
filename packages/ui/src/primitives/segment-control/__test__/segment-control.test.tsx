import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SegmentControlPrimitive } from '../segment-control'

describe('SegmentControlPrimitive', () => {
  describe('Root', () => {
    it('children을 렌더링한다', () => {
      render(
        <SegmentControlPrimitive.Root>
          <span>Test Content</span>
        </SegmentControlPrimitive.Root>,
      )
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('data-slot="segment-control-root" 속성을 가진다', () => {
      render(
        <SegmentControlPrimitive.Root data-testid="root">Content</SegmentControlPrimitive.Root>,
      )
      expect(screen.getByTestId('root')).toHaveAttribute('data-slot', 'segment-control-root')
    })

    it('role="tablist" 속성을 가진다', () => {
      render(<SegmentControlPrimitive.Root>Content</SegmentControlPrimitive.Root>)
      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('size prop에 따라 data-size 속성을 가진다', () => {
      const { rerender } = render(
        <SegmentControlPrimitive.Root data-testid="root" size="sm">
          Content
        </SegmentControlPrimitive.Root>,
      )
      expect(screen.getByTestId('root')).toHaveAttribute('data-size', 'sm')

      rerender(
        <SegmentControlPrimitive.Root data-testid="root" size="lg">
          Content
        </SegmentControlPrimitive.Root>,
      )
      expect(screen.getByTestId('root')).toHaveAttribute('data-size', 'lg')
    })

    it('추가 className을 적용한다', () => {
      render(
        <SegmentControlPrimitive.Root className="custom-class" data-testid="root">
          Content
        </SegmentControlPrimitive.Root>,
      )
      expect(screen.getByTestId('root')).toHaveClass('custom-class')
    })
  })

  describe('Indicator', () => {
    it('left와 width 스타일을 적용한다', () => {
      render(
        <SegmentControlPrimitive.Root className="custom-class" data-testid="root">
          <SegmentControlPrimitive.Indicator data-testid="indicator" left={20} width={100} />
        </SegmentControlPrimitive.Root>,
      )
      const indicator = screen.getByTestId('indicator')
      expect(indicator).toHaveStyle({ left: '20px', width: '100px' })
    })

    it('data-slot="segment-control-indicator" 속성을 가진다', () => {
      render(
        <SegmentControlPrimitive.Root className="custom-class" data-testid="root">
          <SegmentControlPrimitive.Indicator data-testid="indicator" left={0} width={100} />
        </SegmentControlPrimitive.Root>,
      )
      expect(screen.getByTestId('indicator')).toHaveAttribute(
        'data-slot',
        'segment-control-indicator',
      )
    })
  })

  describe('Item', () => {
    it('children을 렌더링한다', () => {
      render(
        <SegmentControlPrimitive.Root className="custom-class" data-testid="root">
          <SegmentControlPrimitive.Item>Menu 1</SegmentControlPrimitive.Item>
        </SegmentControlPrimitive.Root>,
      )
      expect(screen.getByRole('tab', { name: 'Menu 1' })).toBeInTheDocument()
    })

    it('role="tab" 속성을 가진다', () => {
      render(
        <SegmentControlPrimitive.Root className="custom-class" data-testid="root">
          <SegmentControlPrimitive.Item>Menu</SegmentControlPrimitive.Item>
        </SegmentControlPrimitive.Root>,
      )
      expect(screen.getByRole('tab')).toBeInTheDocument()
    })

    it('선택되지 않은 상태에서 data-state="inactive"를 가진다', () => {
      render(
        <SegmentControlPrimitive.Root className="custom-class" data-testid="root">
          <SegmentControlPrimitive.Item selected={false}>Menu</SegmentControlPrimitive.Item>
        </SegmentControlPrimitive.Root>,
      )
      expect(screen.getByRole('tab')).toHaveAttribute('data-state', 'inactive')
    })

    it('선택된 상태에서 data-state="active"를 가진다', () => {
      render(
        <SegmentControlPrimitive.Root className="custom-class" data-testid="root">
          <SegmentControlPrimitive.Item selected>Menu</SegmentControlPrimitive.Item>
        </SegmentControlPrimitive.Root>,
      )
      expect(screen.getByRole('tab')).toHaveAttribute('data-state', 'active')
    })

    it('aria-selected 속성을 가진다', () => {
      render(
        <SegmentControlPrimitive.Root className="custom-class" data-testid="root">
          <SegmentControlPrimitive.Item selected>Menu</SegmentControlPrimitive.Item>
        </SegmentControlPrimitive.Root>,
      )
      expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true')
    })

    it('클릭 이벤트를 처리한다', () => {
      const handleClick = vi.fn()
      render(
        <SegmentControlPrimitive.Root className="custom-class" data-testid="root">
          <SegmentControlPrimitive.Item onClick={handleClick}>Menu</SegmentControlPrimitive.Item>
        </SegmentControlPrimitive.Root>,
      )

      fireEvent.click(screen.getByRole('tab'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('추가 className을 적용한다', () => {
      render(
        <SegmentControlPrimitive.Root className="custom-class" data-testid="root">
          <SegmentControlPrimitive.Item className="custom-class">Menu</SegmentControlPrimitive.Item>
        </SegmentControlPrimitive.Root>,
      )
      expect(screen.getByRole('tab')).toHaveClass('custom-class')
    })
  })
})
