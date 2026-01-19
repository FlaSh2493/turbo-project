import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useCheckBox } from '../use-check-box'
import { CheckBoxGroupContext } from '../check-box-group-context'
import React from 'react'

describe('useCheckBox (Headless)', () => {
  it('기본값으로 초기화되어야 한다', () => {
    const { result } = renderHook(() => useCheckBox())
    expect(result.current.checked).toBe(false)
  })

  it('defaultChecked가 제공되면 초기값으로 설정되어야 한다', () => {
    const { result } = renderHook(() => useCheckBox({ defaultChecked: true }))
    expect(result.current.checked).toBe(true)
  })

  it('check를 호출하면 상태가 토글되어야 한다 (Uncontrolled)', () => {
    const { result } = renderHook(() => useCheckBox({ defaultChecked: false }))

    act(() => {
      result.current.check()
    })
    expect(result.current.checked).toBe(true)

    act(() => {
      result.current.check()
    })
    expect(result.current.checked).toBe(false)
  })

  it('indeterminate 상태에서 check를 호출하면 true가 되어야 한다', () => {
    const { result } = renderHook(() => useCheckBox({ defaultChecked: 'indeterminate' }))

    expect(result.current.checked).toBe('indeterminate')
    act(() => {
      result.current.check()
    })
    expect(result.current.checked).toBe(true)
  })

  it('Controlled 모드에서는 내부 상태가 변경되지 않고 onCheckedChange가 호출되어야 한다', () => {
    const onCheckedChange = vi.fn()
    const { result } = renderHook(() => useCheckBox({ checked: false, onCheckedChange }))

    act(() => {
      result.current.check()
    })

    expect(result.current.checked).toBe(false) // value not changed
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('disabled 상태에서는 check 호출이 무시되어야 한다', () => {
    const { result } = renderHook(() => useCheckBox({ defaultChecked: false, disabled: true }))

    act(() => {
      result.current.check()
    })
    expect(result.current.checked).toBe(false)
  })

  it('checkboxProps가 올바르게 반환되어야 한다', () => {
    const { result } = renderHook(() => useCheckBox({ disabled: true, required: true }))

    expect(result.current.checkboxProps).toEqual({
      role: 'checkbox',
      'aria-checked': false,
      'aria-required': true,
      'aria-disabled': true,
      disabled: true,
      tabIndex: -1,
    })
  })

  describe('그룹 컨텍스트 모드', () => {
    it('그룹 컨텍스트가 있으면 그룹의 상태를 사용한다', () => {
      const mockGroupContext = {
        value: ['opt1'],
        checkValue: vi.fn(),
        isChecked: (v: string) => v === 'opt1',
      }

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CheckBoxGroupContext.Provider value={mockGroupContext}>
          {children}
        </CheckBoxGroupContext.Provider>
      )

      const { result } = renderHook(() => useCheckBox({ value: 'opt1' }), { wrapper })

      expect(result.current.checked).toBe(true)
    })

    it('그룹 모드에서 onCheckedChange를 호출하면 groupContext.checkValue가 호출된다', () => {
      const mockGroupContext = {
        value: [],
        checkValue: vi.fn(),
        isChecked: () => false,
      }

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CheckBoxGroupContext.Provider value={mockGroupContext}>
          {children}
        </CheckBoxGroupContext.Provider>
      )

      const { result } = renderHook(() => useCheckBox({ value: 'opt2' }), { wrapper })

      act(() => {
        result.current.onCheckedChange(true)
      })

      expect(mockGroupContext.checkValue).toHaveBeenCalledWith('opt2')
    })

    it('그룹 모드에서 외부 onCheckedChange 콜백도 호출된다', () => {
      const mockGroupContext = {
        value: [],
        checkValue: vi.fn(),
        isChecked: () => false,
      }
      const externalOnChange = vi.fn()

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CheckBoxGroupContext.Provider value={mockGroupContext}>
          {children}
        </CheckBoxGroupContext.Provider>
      )

      const { result } = renderHook(
        () => useCheckBox({ value: 'opt2', onCheckedChange: externalOnChange }),
        { wrapper },
      )

      act(() => {
        result.current.onCheckedChange(true)
      })

      expect(externalOnChange).toHaveBeenCalledWith(true)
    })
  })
})
