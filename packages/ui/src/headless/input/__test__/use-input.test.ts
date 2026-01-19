import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useInput } from '../use-input'

describe('useInput', () => {
  describe('상태 관리', () => {
    it('초기 상태에서 value는 빈 문자열이다', () => {
      const { result } = renderHook(() => useInput())
      expect(result.current.value).toBe('')
    })

    it('defaultValue로 초기 값을 설정할 수 있다', () => {
      const { result } = renderHook(() => useInput({ defaultValue: 'initial' }))
      expect(result.current.value).toBe('initial')
    })

    it('value prop으로 제어된 상태를 사용할 수 있다', () => {
      const { result } = renderHook(() => useInput({ value: 'controlled' }))
      expect(result.current.value).toBe('controlled')
    })

    it('isEmpty는 값이 비어있을 때 true이다', () => {
      const { result } = renderHook(() => useInput())
      expect(result.current.isEmpty).toBe(true)
    })

    it('isEmpty는 값이 있을 때 false이다', () => {
      const { result } = renderHook(() => useInput({ defaultValue: 'test' }))
      expect(result.current.isEmpty).toBe(false)
    })
  })

  describe('onChange', () => {
    it('비제어 모드에서 값을 변경할 수 있다', () => {
      const { result } = renderHook(() => useInput())

      act(() => {
        result.current.inputProps.onChange({
          target: { value: 'new value' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.value).toBe('new value')
    })

    it('onChange 콜백을 호출한다', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() => useInput({ onChange }))

      act(() => {
        result.current.inputProps.onChange({
          target: { value: 'test' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      expect(onChange).toHaveBeenCalledWith('test')
    })

    it('제어 모드에서는 내부 상태를 변경하지 않는다', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() => useInput({ value: 'controlled', onChange }))

      act(() => {
        result.current.inputProps.onChange({
          target: { value: 'new value' },
        } as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.value).toBe('controlled')
      expect(onChange).toHaveBeenCalledWith('new value')
    })
  })

  describe('포커스 상태', () => {
    it('초기 상태에서 isFocused는 false이다', () => {
      const { result } = renderHook(() => useInput())
      expect(result.current.isFocused).toBe(false)
    })

    it('onFocus 호출 시 isFocused가 true가 된다', () => {
      const { result } = renderHook(() => useInput())

      act(() => {
        result.current.inputProps.onFocus()
      })

      expect(result.current.isFocused).toBe(true)
    })

    it('onBlur 호출 시 isFocused가 false가 된다', () => {
      const { result } = renderHook(() => useInput())

      act(() => {
        result.current.inputProps.onFocus()
      })
      expect(result.current.isFocused).toBe(true)

      act(() => {
        result.current.inputProps.onBlur()
      })
      expect(result.current.isFocused).toBe(false)
    })
  })

  describe('clear', () => {
    it('비제어 모드에서 값을 초기화한다', () => {
      const { result } = renderHook(() => useInput({ defaultValue: 'test' }))

      act(() => {
        result.current.clear()
      })

      expect(result.current.value).toBe('')
    })

    it('clear 시 onChange 콜백을 빈 문자열로 호출한다', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() => useInput({ defaultValue: 'test', onChange }))

      act(() => {
        result.current.clear()
      })

      expect(onChange).toHaveBeenCalledWith('')
    })

    it('제어 모드에서는 내부 상태를 변경하지 않고 onChange만 호출한다', () => {
      const onChange = vi.fn()
      const { result } = renderHook(() => useInput({ value: 'controlled', onChange }))

      act(() => {
        result.current.clear()
      })

      expect(result.current.value).toBe('controlled')
      expect(onChange).toHaveBeenCalledWith('')
    })
  })

  describe('에러 상태', () => {
    it('error가 없으면 hasError는 false이다', () => {
      const { result } = renderHook(() => useInput())
      expect(result.current.hasError).toBe(false)
    })

    it('error={true}이면 hasError는 true이다', () => {
      const { result } = renderHook(() => useInput({ error: true }))
      expect(result.current.hasError).toBe(true)
    })

    it('error가 문자열이면 hasError는 true이다', () => {
      const { result } = renderHook(() => useInput({ error: '에러 메시지' }))
      expect(result.current.hasError).toBe(true)
    })

    it('error가 문자열이고 값이 비어있으면 errorMessage를 반환한다', () => {
      const { result } = renderHook(() => useInput({ error: '에러 메시지' }))
      expect(result.current.errorMessage).toBe('에러 메시지')
    })

    it('error가 문자열이고 값이 있으면 errorMessage는 undefined이다', () => {
      const { result } = renderHook(() => useInput({ error: '에러 메시지', defaultValue: 'test' }))
      expect(result.current.errorMessage).toBeUndefined()
    })

    it('error={true}이면 errorMessage는 undefined이다', () => {
      const { result } = renderHook(() => useInput({ error: true }))
      expect(result.current.errorMessage).toBeUndefined()
    })
  })

  describe('inputState 상태 판별', () => {
    it('disabled가 true이면 inputState는 disabled이다', () => {
      const { result } = renderHook(() => useInput({ disabled: true }))
      expect(result.current.inputState).toBe('disabled')
    })

    it('readOnly가 true이면 inputState는 fixed이다', () => {
      const { result } = renderHook(() => useInput({ readOnly: true }))
      expect(result.current.inputState).toBe('fixed')
    })

    it('error가 있으면 inputState는 error이다', () => {
      const { result } = renderHook(() => useInput({ error: true }))
      expect(result.current.inputState).toBe('error')
    })

    it('포커스 상태이고 값이 비어있으면 inputState는 focused이다', () => {
      const { result } = renderHook(() => useInput())

      act(() => {
        result.current.inputProps.onFocus()
      })

      expect(result.current.inputState).toBe('focused')
    })

    it('포커스 상태이고 값이 있으면 inputState는 typing이다', () => {
      const { result } = renderHook(() => useInput({ defaultValue: 'test' }))

      act(() => {
        result.current.inputProps.onFocus()
      })

      expect(result.current.inputState).toBe('typing')
    })

    it('포커스가 없고 값이 있으면 inputState는 completed이다', () => {
      const { result } = renderHook(() => useInput({ defaultValue: 'test' }))
      expect(result.current.inputState).toBe('completed')
    })

    it('포커스가 없고 값이 비어있으면 inputState는 enabled이다', () => {
      const { result } = renderHook(() => useInput())
      expect(result.current.inputState).toBe('enabled')
    })

    describe('상태 우선순위', () => {
      it('disabled는 readOnly보다 우선한다', () => {
        const { result } = renderHook(() => useInput({ disabled: true, readOnly: true }))
        expect(result.current.inputState).toBe('disabled')
      })

      it('readOnly는 error보다 우선한다', () => {
        const { result } = renderHook(() => useInput({ readOnly: true, error: true }))
        expect(result.current.inputState).toBe('fixed')
      })

      it('error는 focused보다 우선한다', () => {
        const { result } = renderHook(() => useInput({ error: true }))

        act(() => {
          result.current.inputProps.onFocus()
        })

        expect(result.current.inputState).toBe('error')
      })
    })
  })

  describe('inputProps', () => {
    it('disabled prop을 전달한다', () => {
      const { result } = renderHook(() => useInput({ disabled: true }))
      expect(result.current.inputProps.disabled).toBe(true)
    })

    it('readOnly prop을 전달한다', () => {
      const { result } = renderHook(() => useInput({ readOnly: true }))
      expect(result.current.inputProps.readOnly).toBe(true)
    })

    it('value prop을 전달한다', () => {
      const { result } = renderHook(() => useInput({ defaultValue: 'test' }))
      expect(result.current.inputProps.value).toBe('test')
    })
  })
})
