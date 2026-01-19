import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRadio } from '../use-radio'

describe('useRadio', () => {
  describe('기본 동작', () => {
    it('기본값 없이 초기화하면 checked가 false이다', () => {
      const { result } = renderHook(() => useRadio())

      expect(result.current.checked).toBe(false)
      expect(result.current.disabled).toBe(false)
    })

    it('defaultChecked로 초기 상태를 설정할 수 있다', () => {
      const { result } = renderHook(() => useRadio({ defaultChecked: true }))

      expect(result.current.checked).toBe(true)
    })

    it('check 함수를 호출하면 checked가 true가 된다', () => {
      const { result } = renderHook(() => useRadio())

      act(() => {
        result.current.check()
      })

      expect(result.current.checked).toBe(true)
    })

    it('onCheckedChange 콜백을 호출한다', () => {
      const handleChange = vi.fn()
      const { result } = renderHook(() => useRadio({ onCheckedChange: handleChange }))

      act(() => {
        result.current.onCheckedChange(true)
      })

      expect(handleChange).toHaveBeenCalledWith(true)
    })
  })

  describe('controlled 모드', () => {
    it('checked prop으로 상태를 제어할 수 있다', () => {
      const { result, rerender } = renderHook(({ checked }) => useRadio({ checked }), {
        initialProps: { checked: false },
      })

      expect(result.current.checked).toBe(false)

      rerender({ checked: true })

      expect(result.current.checked).toBe(true)
    })

    it('controlled 모드에서는 내부 상태가 변경되지 않는다', () => {
      const handleChange = vi.fn()
      const { result } = renderHook(() =>
        useRadio({ checked: false, onCheckedChange: handleChange }),
      )

      act(() => {
        result.current.onCheckedChange(true)
      })

      // 내부 상태는 변경되지 않음 (controlled)
      expect(result.current.checked).toBe(false)
      // 콜백은 호출됨
      expect(handleChange).toHaveBeenCalledWith(true)
    })
  })

  describe('disabled 상태', () => {
    it('disabled가 true이면 check 함수가 동작하지 않는다', () => {
      const handleChange = vi.fn()
      const { result } = renderHook(() =>
        useRadio({ disabled: true, onCheckedChange: handleChange }),
      )

      act(() => {
        result.current.check()
      })

      expect(result.current.checked).toBe(false)
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('disabled 상태가 radioProps에 반영된다', () => {
      const { result } = renderHook(() => useRadio({ disabled: true }))

      expect(result.current.disabled).toBe(true)
      expect(result.current.radioProps.disabled).toBe(true)
      expect(result.current.radioProps['aria-disabled']).toBe(true)
      expect(result.current.radioProps.tabIndex).toBe(-1)
    })

    it('disabled가 false이면 tabIndex가 0이다', () => {
      const { result } = renderHook(() => useRadio({ disabled: false }))

      expect(result.current.radioProps.tabIndex).toBe(0)
    })
  })

  describe('그룹 컨텍스트 모드', () => {
    it('groupContext가 있으면 그룹의 상태를 사용한다', () => {
      const mockGroupContext = {
        value: 'option1',
        checkValue: vi.fn(),
        isChecked: vi.fn((v: string) => v === 'option1'),
        disabled: false,
      }

      const { result } = renderHook(() =>
        useRadio({ value: 'option1', groupContext: mockGroupContext }),
      )

      expect(result.current.checked).toBe(true)
    })

    it('그룹 모드에서 onCheckedChange(true)를 호출하면 groupContext.checkValue가 호출된다', () => {
      const mockGroupContext = {
        value: 'option2',
        checkValue: vi.fn(),
        isChecked: vi.fn(() => false),
        disabled: false,
      }

      const { result } = renderHook(() =>
        useRadio({ value: 'option2', groupContext: mockGroupContext }),
      )

      act(() => {
        result.current.onCheckedChange(true)
      })

      expect(mockGroupContext.checkValue).toHaveBeenCalledWith('option2')
    })

    it('그룹 모드에서 onCheckedChange(false)를 호출하면 groupContext.checkValue가 호출되지 않는다', () => {
      const mockGroupContext = {
        value: 'option1',
        checkValue: vi.fn(),
        isChecked: vi.fn(() => true),
        disabled: false,
      }

      const { result } = renderHook(() =>
        useRadio({ value: 'option1', groupContext: mockGroupContext }),
      )

      act(() => {
        result.current.onCheckedChange(false)
      })

      expect(mockGroupContext.checkValue).not.toHaveBeenCalled()
    })

    it('그룹의 disabled 상태를 상속받는다', () => {
      const mockGroupContext = {
        value: '',
        checkValue: vi.fn(),
        isChecked: vi.fn(() => false),
        disabled: true,
      }

      const { result } = renderHook(() =>
        useRadio({ value: 'option1', groupContext: mockGroupContext }),
      )

      expect(result.current.disabled).toBe(true)
    })
  })

  describe('radioProps', () => {
    it('role이 radio이다', () => {
      const { result } = renderHook(() => useRadio())

      expect(result.current.radioProps.role).toBe('radio')
    })

    it('aria-checked가 checked 상태를 반영한다', () => {
      const { result, rerender } = renderHook(({ checked }) => useRadio({ checked }), {
        initialProps: { checked: false },
      })

      expect(result.current.radioProps['aria-checked']).toBe(false)

      rerender({ checked: true })

      expect(result.current.radioProps['aria-checked']).toBe(true)
    })

    it('required가 설정되면 aria-required가 true이다', () => {
      const { result } = renderHook(() => useRadio({ required: true }))

      expect(result.current.radioProps['aria-required']).toBe(true)
    })

    it('required가 설정되지 않으면 aria-required가 undefined이다', () => {
      const { result } = renderHook(() => useRadio())

      expect(result.current.radioProps['aria-required']).toBeUndefined()
    })
  })
})
