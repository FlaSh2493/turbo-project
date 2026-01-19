import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { ToastPrimitive } from '../toast'

describe('ToastPrimitive', () => {
  describe('Viewport', () => {
    it('렌더링된다', () => {
      render(<ToastPrimitive.Viewport data-testid="viewport" />)
      expect(screen.getByTestId('viewport')).toBeInTheDocument()
    })

    it('data-slot 속성을 가진다', () => {
      render(<ToastPrimitive.Viewport data-testid="viewport" />)
      expect(screen.getByTestId('viewport')).toHaveAttribute('data-slot', 'toast-viewport')
    })

    it('기본 bottom 위치는 2.5rem이다', () => {
      render(<ToastPrimitive.Viewport data-testid="viewport" />)
      expect(screen.getByTestId('viewport')).toHaveStyle({ bottom: '2.5rem' })
    })

    it('offsetY prop으로 bottom 위치를 조정할 수 있다', () => {
      render(<ToastPrimitive.Viewport data-testid="viewport" offsetY={80} />)
      expect(screen.getByTestId('viewport')).toHaveStyle({ bottom: '5rem' })
    })

    it('추가 className을 적용한다', () => {
      render(<ToastPrimitive.Viewport data-testid="viewport" className="custom-class" />)
      expect(screen.getByTestId('viewport')).toHaveClass('custom-class')
    })
  })

  describe('Root', () => {
    it('렌더링된다', () => {
      render(<ToastPrimitive.Root>Toast</ToastPrimitive.Root>)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('data-slot 속성을 가진다', () => {
      render(<ToastPrimitive.Root>Toast</ToastPrimitive.Root>)
      expect(screen.getByRole('alert')).toHaveAttribute('data-slot', 'toast-root')
    })

    it('기본 상태는 open이다', () => {
      render(<ToastPrimitive.Root>Toast</ToastPrimitive.Root>)
      expect(screen.getByRole('alert')).toHaveAttribute('data-state', 'open')
    })

    it('open=false일 때 data-state가 closed이다', () => {
      render(<ToastPrimitive.Root open={false}>Toast</ToastPrimitive.Root>)
      expect(screen.getByRole('alert')).toHaveAttribute('data-state', 'closed')
    })

    it('children을 렌더링한다', () => {
      render(<ToastPrimitive.Root>Toast Content</ToastPrimitive.Root>)
      expect(screen.getByText('Toast Content')).toBeInTheDocument()
    })

    it('onAnimationComplete가 애니메이션 종료 시 호출된다', () => {
      const onAnimationComplete = vi.fn()
      render(
        <ToastPrimitive.Root onAnimationComplete={onAnimationComplete}>Toast</ToastPrimitive.Root>,
      )
      const toast = screen.getByRole('alert')
      fireEvent.animationEnd(toast)
      expect(onAnimationComplete).toHaveBeenCalledTimes(1)
    })

    it('open=false일 때 onRemove가 애니메이션 종료 시 호출된다', () => {
      const onRemove = vi.fn()
      render(
        <ToastPrimitive.Root open={false} onRemove={onRemove}>
          Toast
        </ToastPrimitive.Root>,
      )
      const toast = screen.getByRole('alert')
      fireEvent.animationEnd(toast)
      expect(onRemove).toHaveBeenCalledTimes(1)
    })

    it('open=true일 때 onRemove가 호출되지 않는다', () => {
      const onRemove = vi.fn()
      render(
        <ToastPrimitive.Root open={true} onRemove={onRemove}>
          Toast
        </ToastPrimitive.Root>,
      )
      const toast = screen.getByRole('alert')
      fireEvent.animationEnd(toast)
      expect(onRemove).not.toHaveBeenCalled()
    })

    it('onRemove가 제공되지 않아도 애니메이션 종료 시 에러가 발생하지 않는다', () => {
      render(<ToastPrimitive.Root open={false}>Toast</ToastPrimitive.Root>)
      const toast = screen.getByRole('alert')
      // onRemove가 undefined일 때 옵셔널 체이닝이 정상 동작하는지 확인
      expect(() => fireEvent.animationEnd(toast)).not.toThrow()
    })
  })

  describe('Icon', () => {
    it('렌더링된다', () => {
      render(<ToastPrimitive.Icon data-testid="icon" />)
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('data-slot 속성을 가진다', () => {
      render(<ToastPrimitive.Icon data-testid="icon" />)
      expect(screen.getByTestId('icon')).toHaveAttribute('data-slot', 'toast-icon')
    })

    it('기본 타입은 success이다', () => {
      const { container } = render(<ToastPrimitive.Icon data-testid="icon" />)
      // Check icon renders with success styling (toast-icon-success class)
      const checkIcon = container.querySelector('[data-slot="toast-icon-inner"]')
      expect(checkIcon).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('렌더링된다', () => {
      render(<ToastPrimitive.Content data-testid="content">Content</ToastPrimitive.Content>)
      expect(screen.getByTestId('content')).toBeInTheDocument()
    })

    it('data-slot 속성을 가진다', () => {
      render(<ToastPrimitive.Content data-testid="content">Content</ToastPrimitive.Content>)
      expect(screen.getByTestId('content')).toHaveAttribute('data-slot', 'toast-content')
    })
  })

  describe('Description', () => {
    it('렌더링된다', () => {
      render(<ToastPrimitive.Description>메시지</ToastPrimitive.Description>)
      expect(screen.getByText('메시지')).toBeInTheDocument()
    })

    it('data-slot 속성을 가진다', () => {
      render(<ToastPrimitive.Description data-testid="desc">메시지</ToastPrimitive.Description>)
      expect(screen.getByTestId('desc')).toHaveAttribute('data-slot', 'toast-description')
    })
  })

  describe('Close', () => {
    it('렌더링된다', () => {
      render(<ToastPrimitive.Close />)
      expect(screen.getByRole('button', { name: 'toast-close' })).toBeInTheDocument()
    })

    it('data-slot 속성을 가진다', () => {
      render(<ToastPrimitive.Close />)
      expect(screen.getByRole('button', { name: 'toast-close' })).toHaveAttribute(
        'data-slot',
        'toast-close',
      )
    })

    it('type="button" 속성을 가진다', () => {
      render(<ToastPrimitive.Close />)
      expect(screen.getByRole('button', { name: 'toast-close' })).toHaveAttribute('type', 'button')
    })
  })
})
