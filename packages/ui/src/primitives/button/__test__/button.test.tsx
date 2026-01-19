import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ButtonPrimitive } from '../button'

describe('ButtonPrimitive', () => {
  describe('렌더링', () => {
    it('children을 올바르게 렌더링한다', () => {
      render(<ButtonPrimitive>Click me</ButtonPrimitive>)
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('data-slot="button" 속성을 가진다', () => {
      render(<ButtonPrimitive>Button</ButtonPrimitive>)
      expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button')
    })
  })

  describe('상호작용', () => {
    it('클릭 이벤트를 처리한다', () => {
      const handleClick = vi.fn()
      render(<ButtonPrimitive onClick={handleClick}>Click me</ButtonPrimitive>)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('disabled 상태에서는 클릭 이벤트를 처리하지 않는다', () => {
      const handleClick = vi.fn()
      render(
        <ButtonPrimitive onClick={handleClick} disabled>
          Disabled
        </ButtonPrimitive>,
      )

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('asChild', () => {
    it('asChild가 true일 때 자식 요소로 렌더링한다', () => {
      render(
        <ButtonPrimitive asChild>
          <a href="/test">Link Button</a>
        </ButtonPrimitive>,
      )

      const link = screen.getByRole('link', { name: 'Link Button' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
      expect(link).toHaveAttribute('data-slot', 'button')
    })
  })

  describe('className', () => {
    it('추가 className을 적용한다', () => {
      render(<ButtonPrimitive className="custom-class">Button</ButtonPrimitive>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })
  })
})
