import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRadioGroup } from '../use-radio-group'

type TestOption = 'option1' | 'option2' | 'option3'

describe('useRadioGroup', () => {
  describe('기본 동작', () => {
    it('기본값 없이 초기화하면 value가 undefined이다', () => {
      const { result } = renderHook(() => useRadioGroup<TestOption>())

      expect(result.current.value).toBeUndefined()
    })

    it('defaultValue로 초기 값을 설정할 수 있다', () => {
      const { result } = renderHook(() => useRadioGroup<TestOption>({ defaultValue: 'option1' }))

      expect(result.current.value).toBe('option1')
    })

    it('checkValue로 값을 변경할 수 있다', () => {
      const { result } = renderHook(() => useRadioGroup<TestOption>({ defaultValue: 'option1' }))

      act(() => {
        result.current.checkValue('option2')
      })

      expect(result.current.value).toBe('option2')
    })

    it('isChecked로 특정 값의 선택 여부를 확인할 수 있다', () => {
      const { result } = renderHook(() => useRadioGroup<TestOption>({ defaultValue: 'option1' }))

      expect(result.current.isChecked('option1')).toBe(true)
      expect(result.current.isChecked('option2')).toBe(false)
    })

    it('onValueChange 콜백을 호출한다', () => {
      const handleChange = vi.fn()
      const { result } = renderHook(() =>
        useRadioGroup<TestOption>({ onValueChange: handleChange }),
      )

      act(() => {
        result.current.checkValue('option1')
      })

      expect(handleChange).toHaveBeenCalledWith('option1')
    })
  })

  describe('controlled 모드', () => {
    it('value prop으로 상태를 제어할 수 있다', () => {
      const { result, rerender } = renderHook(({ value }) => useRadioGroup<TestOption>({ value }), {
        initialProps: { value: 'option1' as TestOption },
      })

      expect(result.current.value).toBe('option1')

      rerender({ value: 'option2' as TestOption })

      expect(result.current.value).toBe('option2')
    })

    it('controlled 모드에서는 내부 상태가 변경되지 않는다', () => {
      const handleChange = vi.fn()
      const { result } = renderHook(() =>
        useRadioGroup<TestOption>({ value: 'option1', onValueChange: handleChange }),
      )

      act(() => {
        result.current.checkValue('option2')
      })

      // 내부 상태는 변경되지 않음 (controlled)
      expect(result.current.value).toBe('option1')
      // 콜백은 호출됨
      expect(handleChange).toHaveBeenCalledWith('option2')
    })
  })

  describe('disabled 상태', () => {
    it('disabled가 true이면 checkValue가 동작하지 않는다', () => {
      const handleChange = vi.fn()
      const { result } = renderHook(() =>
        useRadioGroup<TestOption>({
          defaultValue: 'option1',
          disabled: true,
          onValueChange: handleChange,
        }),
      )

      act(() => {
        result.current.checkValue('option2')
      })

      expect(result.current.value).toBe('option1')
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('disabled 상태가 반환값에 포함된다', () => {
      const { result } = renderHook(() => useRadioGroup<TestOption>({ disabled: true }))

      expect(result.current.disabled).toBe(true)
    })

    it('disabled가 설정되지 않으면 undefined이다', () => {
      const { result } = renderHook(() => useRadioGroup<TestOption>())

      expect(result.current.disabled).toBeUndefined()
    })
  })

  describe('isChecked 함수', () => {
    it('선택된 값과 일치하면 true를 반환한다', () => {
      const { result } = renderHook(() => useRadioGroup<TestOption>({ defaultValue: 'option1' }))

      expect(result.current.isChecked('option1')).toBe(true)
    })

    it('선택된 값과 일치하지 않으면 false를 반환한다', () => {
      const { result } = renderHook(() => useRadioGroup<TestOption>({ defaultValue: 'option1' }))

      expect(result.current.isChecked('option2')).toBe(false)
    })

    it('값이 undefined이면 모든 항목에 대해 false를 반환한다', () => {
      const { result } = renderHook(() => useRadioGroup<TestOption>())

      expect(result.current.isChecked('option1')).toBe(false)
      expect(result.current.isChecked('option2')).toBe(false)
    })
  })
})
