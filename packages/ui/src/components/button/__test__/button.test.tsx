import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  describe('렌더링', () => {
    it('children을 올바르게 렌더링한다', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('data-slot="button" 속성을 가진다', () => {
      render(<Button>Button</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button')
    })
  })

  describe('variant', () => {
    it('기본 variant는 default이다', () => {
      render(<Button>Default</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'default')
    })

    it('variant="outline"을 적용할 수 있다', () => {
      render(<Button variant="outline">Outline</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'outline')
    })

    it('variant="secondary"를 적용할 수 있다', () => {
      render(<Button variant="secondary">Secondary</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'secondary')
    })

    it('variant="ghost"를 적용할 수 있다', () => {
      render(<Button variant="ghost">Ghost</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'ghost')
    })

    it('variant="link"를 적용할 수 있다', () => {
      render(<Button variant="link">Link</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'link')
    })
  })

  describe('size', () => {
    it('기본 size는 md이다', () => {
      render(<Button>Medium</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'md')
    })

    it('size="sm"을 적용할 수 있다', () => {
      render(<Button size="sm">Small</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'sm')
    })

    it('size="lg"를 적용할 수 있다', () => {
      render(<Button size="lg">Large</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg')
    })

    it('size="icon"을 적용할 수 있다', () => {
      render(<Button size="icon">Icon</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'icon')
    })

    it('size="icon-sm"을 적용할 수 있다', () => {
      render(<Button size="icon-sm">Icon SM</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'icon-sm')
    })

    it('size="icon-lg"를 적용할 수 있다', () => {
      render(<Button size="icon-lg">Icon LG</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', 'icon-lg')
    })
  })

  describe('상호작용', () => {
    it('클릭 이벤트를 처리한다', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('disabled 상태에서는 클릭 이벤트를 처리하지 않는다', () => {
      const handleClick = vi.fn()
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>,
      )

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('disabled 상태일 때 disabled 속성을 가진다', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('className', () => {
    it('추가 className을 적용한다', () => {
      render(<Button className="custom-class">Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('variant와 size에 따른 클래스가 적용된다', () => {
      render(
        <Button variant="outline" size="lg">
          Button
        </Button>,
      )
      const button = screen.getByRole('button')
      expect(button).toHaveClass('btn-base')
      expect(button).toHaveClass('btn-outline')
      expect(button).toHaveClass('btn-lg')
    })
  })

  describe('ref 전달', () => {
    it('ref가 올바르게 전달된다', () => {
      const ref = vi.fn()
      render(<Button ref={ref}>Button</Button>)
      expect(ref).toHaveBeenCalled()
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('기타 props 전달', () => {
    it('type 속성을 전달할 수 있다', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })

    it('aria-label을 전달할 수 있다', () => {
      render(<Button aria-label="Close dialog">X</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close dialog')
    })
  })
})
