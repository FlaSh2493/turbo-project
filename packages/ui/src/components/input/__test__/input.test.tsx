import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { createRef } from 'react'
import { Input } from '../input'

describe('Input', () => {
  describe('렌더링', () => {
    it('Input을 렌더링한다', () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('defaultValue에 해당하는 값이 표시된다', () => {
      render(<Input defaultValue="initial value" />)
      expect(screen.getByDisplayValue('initial value')).toBeInTheDocument()
    })
  })

  describe('상호작용', () => {
    it('값을 입력할 수 있다', () => {
      render(<Input placeholder="Enter text" />)
      const input = screen.getByPlaceholderText('Enter text')

      fireEvent.change(input, { target: { value: 'test value' } })
      expect(screen.getByDisplayValue('test value')).toBeInTheDocument()
    })

    it('onChange 콜백을 호출한다', () => {
      const onChange = vi.fn()
      render(<Input placeholder="Enter text" onChange={onChange} />)
      const input = screen.getByPlaceholderText('Enter text')

      fireEvent.change(input, { target: { value: 'test' } })
      expect(onChange).toHaveBeenCalledWith('test')
    })

    it('Clear 버튼을 클릭하면 값이 초기화된다', () => {
      render(<Input defaultValue="test value" />)
      expect(screen.getByDisplayValue('test value')).toBeInTheDocument()

      const clearButton = screen.getByRole('button', { name: '입력 내용 삭제' })
      fireEvent.click(clearButton)

      expect(screen.queryByDisplayValue('test value')).not.toBeInTheDocument()
    })

    it('onClear 콜백을 호출한다', () => {
      const onClear = vi.fn()
      render(<Input defaultValue="test value" onClear={onClear} />)

      const clearButton = screen.getByRole('button', { name: '입력 내용 삭제' })
      fireEvent.click(clearButton)

      expect(onClear).toHaveBeenCalled()
    })
  })

  describe('Clear 버튼 표시 조건', () => {
    it('값이 비어있으면 Clear 버튼이 표시되지 않는다', () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.queryByRole('button', { name: '입력 내용 삭제' })).not.toBeInTheDocument()
    })

    it('값이 있으면 Clear 버튼이 표시된다', () => {
      render(<Input defaultValue="test" />)
      expect(screen.getByRole('button', { name: '입력 내용 삭제' })).toBeInTheDocument()
    })

    it('disabled 상태에서는 Clear 버튼이 표시되지 않는다', () => {
      render(<Input defaultValue="test" disabled />)
      expect(screen.queryByRole('button', { name: '입력 내용 삭제' })).not.toBeInTheDocument()
    })

    it('readOnly 상태에서는 Clear 버튼이 표시되지 않는다', () => {
      render(<Input defaultValue="test" readOnly />)
      expect(screen.queryByRole('button', { name: '입력 내용 삭제' })).not.toBeInTheDocument()
    })

    it('clearable={false}이면 Clear 버튼이 표시되지 않는다', () => {
      render(<Input defaultValue="test" clearable={false} />)
      expect(screen.queryByRole('button', { name: '입력 내용 삭제' })).not.toBeInTheDocument()
    })
  })

  describe('제어 모드', () => {
    it('value prop으로 선택 상태를 제어할 수 있다', () => {
      const { rerender } = render(<Input value="controlled" onChange={() => {}} />)
      expect(screen.getByDisplayValue('controlled')).toBeInTheDocument()

      rerender(<Input value="updated" onChange={() => {}} />)
      expect(screen.getByDisplayValue('updated')).toBeInTheDocument()
    })
  })

  describe('에러 상태', () => {
    it('error={true}이면 에러 상태가 된다', () => {
      render(<Input error={true} data-testid="input-root" />)
      const input = screen.getByTestId('input-root')
      // Root element should have error class
      const root = input.parentElement
      expect(root).toHaveClass('input-root-error')
    })

    it('error가 문자열이고 값이 비어있으면 placeholder에 에러 메시지가 표시된다', () => {
      render(<Input error="에러 메시지" placeholder="기본 placeholder" />)
      expect(screen.getByPlaceholderText('에러 메시지')).toBeInTheDocument()
    })

    it('error가 문자열이고 값이 있으면 기본 placeholder가 유지된다', () => {
      render(<Input error="에러 메시지" defaultValue="test" placeholder="기본 placeholder" />)
      const input = screen.getByDisplayValue('test')
      expect(input).toHaveAttribute('placeholder', '기본 placeholder')
    })
  })

  describe('disabled 상태', () => {
    it('disabled 상태에서는 입력이 비활성화된다', () => {
      render(<Input disabled placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeDisabled()
    })
  })

  describe('readOnly 상태', () => {
    it('readOnly 상태에서는 입력이 읽기 전용이 된다', () => {
      render(<Input readOnly defaultValue="fixed value" />)
      expect(screen.getByDisplayValue('fixed value')).toHaveAttribute('readonly')
    })
  })

  describe('size', () => {
    it('size="md"를 적용할 수 있다', () => {
      render(<Input size="md" data-testid="input-root" />)
      const input = screen.getByTestId('input-root')
      const root = input.parentElement
      expect(root).toHaveClass('input-root-md')
    })

    it('기본 size는 sm이다', () => {
      render(<Input data-testid="input-root" />)
      const input = screen.getByTestId('input-root')
      const root = input.parentElement
      expect(root).toHaveClass('input-root-sm')
    })

    it('size가 undefined이면 기본값 sm이 적용된다', () => {
      render(<Input size={undefined} data-testid="input-root" />)
      const input = screen.getByTestId('input-root')
      const root = input.parentElement
      expect(root).toHaveClass('input-root-sm')
    })
  })

  describe('접근성', () => {
    it('Clear 버튼이 렌더링된다', () => {
      render(<Input defaultValue="test" />)
      // Clear 버튼은 CircleX 아이콘을 포함한 버튼으로 렌더링됨
      const clearButton = screen.getByRole('button')
      expect(clearButton).toBeInTheDocument()
    })
  })

  describe('ref 전달', () => {
    it('object ref를 전달하면 input 요소에 접근할 수 있다', () => {
      const ref = createRef<HTMLInputElement>()
      render(<Input ref={ref} placeholder="test" />)

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
      expect(ref.current?.placeholder).toBe('test')
    })

    it('function ref를 전달하면 input 요소에 접근할 수 있다', () => {
      const refCallback = vi.fn()
      render(<Input ref={refCallback} placeholder="test" />)

      expect(refCallback).toHaveBeenCalledWith(expect.any(HTMLInputElement))
    })
  })
})
