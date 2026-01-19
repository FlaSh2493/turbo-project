import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SegmentControl } from '../segment-control'
import { expectToThrowSilent } from '../../../tests/test-utils'

describe('SegmentControl', () => {
  describe('렌더링', () => {
    it('Root와 Item을 렌더링한다', () => {
      render(
        <SegmentControl.Root defaultValue="tab1">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument()
    })

    it('defaultValue에 해당하는 아이템이 선택된다', () => {
      render(
        <SegmentControl.Root defaultValue="tab2">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'inactive')
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('data-state', 'active')
    })
  })

  describe('상호작용', () => {
    it('아이템을 클릭하면 선택된다', () => {
      render(
        <SegmentControl.Root defaultValue="tab1">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
      fireEvent.click(tab2)

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'inactive')
      expect(tab2).toHaveAttribute('data-state', 'active')
    })

    it('onValueChange 콜백을 호출한다', () => {
      const handleChange = vi.fn()
      render(
        <SegmentControl.Root defaultValue="tab1" onValueChange={handleChange}>
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
      expect(handleChange).toHaveBeenCalledWith('tab2')
    })
  })

  describe('제어 모드', () => {
    it('value prop으로 선택 상태를 제어할 수 있다', () => {
      const { rerender } = render(
        <SegmentControl.Root value="tab1">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'active')

      rerender(
        <SegmentControl.Root value="tab2">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('data-state', 'active')
    })
  })

  describe('size', () => {
    it('sm size를 적용할 수 있다', () => {
      render(
        <SegmentControl.Root defaultValue="tab1" size="sm" data-testid="root">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', 'sm')
    })

    it('lg size를 적용할 수 있다', () => {
      render(
        <SegmentControl.Root defaultValue="tab1" size="lg" data-testid="root">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', 'lg')
    })

    it('size가 지정되지 않으면 default size를 사용한다', () => {
      render(
        <SegmentControl.Root defaultValue="tab1" data-testid="root">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', 'default')
    })
  })

  describe('Indicator', () => {
    it('아이템이 선택되면 인디케이터가 렌더링된다', () => {
      // Mock getBoundingClientRect
      const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect
      HTMLElement.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
        left: 0,
        top: 0,
        width: 100,
        height: 40,
        bottom: 40,
        right: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      })

      const { container } = render(
        <SegmentControl.Root defaultValue="tab1">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      const indicator = container.querySelector('[data-slot="segment-control-indicator"]')
      expect(indicator).toBeInTheDocument()

      HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect
    })

    it('선택된 값이 없으면 인디케이터가 렌더링되지 않는다', () => {
      const { container } = render(
        <SegmentControl.Root>
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      const indicator = container.querySelector('[data-slot="segment-control-indicator"]')
      expect(indicator).not.toBeInTheDocument()
    })

    it('존재하지 않는 값이 선택되면 인디케이터가 렌더링되지 않는다', () => {
      const { container } = render(
        <SegmentControl.Root value="invalid">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      const indicator = container.querySelector('[data-slot="segment-control-indicator"]')
      expect(indicator).not.toBeInTheDocument()
    })
  })

  describe('여러 아이템', () => {
    it('3개 이상의 아이템을 렌더링할 수 있다', () => {
      render(
        <SegmentControl.Root defaultValue="tab1">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
          <SegmentControl.Item value="tab3">Tab 3</SegmentControl.Item>
          <SegmentControl.Item value="tab4">Tab 4</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getAllByRole('tab')).toHaveLength(4)
    })
  })

  describe('접근성', () => {
    it('선택된 아이템은 aria-selected="true"를 가진다', () => {
      render(
        <SegmentControl.Root defaultValue="tab1">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'false')
    })

    it('선택된 아이템은 tabIndex=0, 그 외는 tabIndex=-1을 가진다', () => {
      render(
        <SegmentControl.Root defaultValue="tab1">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('tabindex', '0')
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('className', () => {
    it('Root에 추가 className을 적용할 수 있다', () => {
      render(
        <SegmentControl.Root defaultValue="tab1" className="custom-root" data-testid="root">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByTestId('root')).toHaveClass('custom-root')
    })

    it('Item에 추가 className을 적용할 수 있다', () => {
      render(
        <SegmentControl.Root defaultValue="tab1">
          <SegmentControl.Item value="tab1" className="custom-item">
            Tab 1
          </SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveClass('custom-item')
    })
  })

  describe('에러 처리', () => {
    it('Root 없이 Item을 사용하면 에러가 발생한다', () => {
      expectToThrowSilent(() => {
        render(<SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>)
      }, 'SegmentControl components must be used within SegmentControl.Root')
    })
  })

  describe('Cleanup', () => {
    it('아이템이 언마운트되어도 에러가 발생하지 않는다', () => {
      const { rerender } = render(
        <SegmentControl.Root defaultValue="tab1">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
          <SegmentControl.Item value="tab2">Tab 2</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument()

      rerender(
        <SegmentControl.Root defaultValue="tab1">
          <SegmentControl.Item value="tab1">Tab 1</SegmentControl.Item>
        </SegmentControl.Root>,
      )

      expect(screen.queryByRole('tab', { name: 'Tab 2' })).not.toBeInTheDocument()
    })
  })
})
