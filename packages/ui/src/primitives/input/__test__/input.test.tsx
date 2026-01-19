import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { InputPrimitive } from '../input'

describe('InputPrimitive', () => {
  describe('Root', () => {
    it('children을 렌더링한다', () => {
      render(
        <InputPrimitive.Root>
          <span>Test Content</span>
        </InputPrimitive.Root>,
      )
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('data-slot="input" 속성을 가진다', () => {
      render(
        <InputPrimitive.Root data-testid="root">
          <span>Content</span>
        </InputPrimitive.Root>,
      )
      expect(screen.getByTestId('root')).toHaveAttribute('data-slot', 'input')
    })

    it('추가 className을 적용한다', () => {
      render(
        <InputPrimitive.Root className="custom-class" data-testid="root">
          <span>Content</span>
        </InputPrimitive.Root>,
      )
      expect(screen.getByTestId('root')).toHaveClass('custom-class')
    })
  })

  describe('Field', () => {
    it('input 요소를 렌더링한다', () => {
      render(<InputPrimitive.Field data-testid="field" />)
      expect(screen.getByTestId('field').tagName).toBe('INPUT')
    })

    it('data-slot="input-field" 속성을 가진다', () => {
      render(<InputPrimitive.Field data-testid="field" />)
      expect(screen.getByTestId('field')).toHaveAttribute('data-slot', 'input-field')
    })

    it('기본 type은 text이다', () => {
      render(<InputPrimitive.Field data-testid="field" />)
      expect(screen.getByTestId('field')).toHaveAttribute('type', 'text')
    })

    it('type prop을 전달할 수 있다', () => {
      render(<InputPrimitive.Field data-testid="field" type="password" />)
      expect(screen.getByTestId('field')).toHaveAttribute('type', 'password')
    })

    it('placeholder를 표시한다', () => {
      render(<InputPrimitive.Field placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('disabled 속성을 전달할 수 있다', () => {
      render(<InputPrimitive.Field data-testid="field" disabled />)
      expect(screen.getByTestId('field')).toBeDisabled()
    })

    it('readOnly 속성을 전달할 수 있다', () => {
      render(<InputPrimitive.Field data-testid="field" readOnly />)
      expect(screen.getByTestId('field')).toHaveAttribute('readonly')
    })

    it('onChange 이벤트를 처리한다', () => {
      const handleChange = vi.fn()
      render(<InputPrimitive.Field data-testid="field" onChange={handleChange} />)

      fireEvent.change(screen.getByTestId('field'), { target: { value: 'test' } })
      expect(handleChange).toHaveBeenCalled()
    })

    it('onFocus 이벤트를 처리한다', () => {
      const handleFocus = vi.fn()
      render(<InputPrimitive.Field data-testid="field" onFocus={handleFocus} />)

      fireEvent.focus(screen.getByTestId('field'))
      expect(handleFocus).toHaveBeenCalled()
    })

    it('onBlur 이벤트를 처리한다', () => {
      const handleBlur = vi.fn()
      render(<InputPrimitive.Field data-testid="field" onBlur={handleBlur} />)

      fireEvent.blur(screen.getByTestId('field'))
      expect(handleBlur).toHaveBeenCalled()
    })

    it('추가 className을 적용한다', () => {
      render(<InputPrimitive.Field data-testid="field" className="custom-class" />)
      expect(screen.getByTestId('field')).toHaveClass('custom-class')
    })
  })

  describe('ClearButton', () => {
    it('button 요소를 렌더링한다', () => {
      render(<InputPrimitive.ClearButton data-testid="clear" />)
      expect(screen.getByTestId('clear').tagName).toBe('BUTTON')
    })

    it('data-slot="input-clear-button" 속성을 가진다', () => {
      render(<InputPrimitive.ClearButton data-testid="clear" />)
      expect(screen.getByTestId('clear')).toHaveAttribute('data-slot', 'input-clear-button')
    })

    it('기본 type은 button이다', () => {
      render(<InputPrimitive.ClearButton data-testid="clear" />)
      expect(screen.getByTestId('clear')).toHaveAttribute('type', 'button')
    })

    it('CircleX 아이콘을 렌더링한다', () => {
      const { container } = render(<InputPrimitive.ClearButton data-testid="clear" />)
      // CircleX 아이콘이 렌더링되는지 확인
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('onClick 이벤트를 처리한다', () => {
      const handleClick = vi.fn()
      render(<InputPrimitive.ClearButton data-testid="clear" onClick={handleClick} />)

      fireEvent.click(screen.getByTestId('clear'))
      expect(handleClick).toHaveBeenCalled()
    })

    it('추가 className을 적용한다', () => {
      render(<InputPrimitive.ClearButton data-testid="clear" className="custom-class" />)
      expect(screen.getByTestId('clear')).toHaveClass('custom-class')
    })
  })
})
