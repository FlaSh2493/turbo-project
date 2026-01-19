import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useCheckBoxGroup } from '../use-check-box-group'

describe('useCheckBoxGroup (Headless)', () => {
  it('기본값으로 초기화되어야 한다', () => {
    const { result } = renderHook(() => useCheckBoxGroup())
    expect(result.current.value).toEqual([])
  })

  it('defaultValue가 제공되면 초기값으로 설정되어야 한다', () => {
    const { result } = renderHook(() => useCheckBoxGroup({ defaultValue: ['a', 'b'] }))
    expect(result.current.value).toEqual(['a', 'b'])
  })

  it('checkValue를 호출하면 값이 토글되어야 한다 (Uncontrolled)', () => {
    const { result } = renderHook(() => useCheckBoxGroup({ defaultValue: ['a'] as string[] }))

    act(() => {
      result.current.checkValue('b')
    })
    expect(result.current.value).toEqual(['a', 'b'])

    act(() => {
      result.current.checkValue('a')
    })
    expect(result.current.value).toEqual(['b'])
  })

  it('Controlled 모드에서는 내부 상태가 변경되지 않고 onValueChange가 호출되어야 한다', () => {
    const onValueChange = vi.fn()
    const { result } = renderHook(() =>
      useCheckBoxGroup({ value: ['a'] as string[], onValueChange }),
    )

    act(() => {
      result.current.checkValue('b')
    })

    expect(result.current.value).toEqual(['a']) // Internal value not changed
    expect(onValueChange).toHaveBeenCalledWith(['a', 'b'])
  })

  it('disabled 상태에서는 상태 변경이 무시되어야 한다', () => {
    const { result } = renderHook(() =>
      useCheckBoxGroup({ defaultValue: ['a'] as string[], disabled: true }),
    )

    act(() => {
      result.current.checkValue('b')
    })
    expect(result.current.value).toEqual(['a'])

    act(() => {
      result.current.checkAll(['a', 'b', 'c'])
    })
    expect(result.current.value).toEqual(['a'])
  })

  it('checkAll을 호출하면 전체 선택/해제가 동작해야 한다', () => {
    const { result } = renderHook(() => useCheckBoxGroup({ defaultValue: ['a'] as string[] }))
    const allItems = ['a', 'b', 'c']

    // Toggle All On
    act(() => {
      result.current.checkAll(allItems)
    })
    expect(result.current.value).toEqual(['a', 'b', 'c'])

    // Toggle All Off (since all are selected)
    act(() => {
      result.current.checkAll(allItems)
    })
    expect(result.current.value).toEqual([])
  })

  it('getGroupState가 올바른 상태를 반환해야 한다', () => {
    const { result } = renderHook(() => useCheckBoxGroup({ defaultValue: ['a'] as string[] }))
    const allItems = ['a', 'b', 'c']

    // 1 selected -> indeterminate
    let state = result.current.getGroupState(allItems)
    expect(state).toEqual({ allChecked: false, isIndeterminate: true })

    // Add 'b' -> still indeterminate
    act(() => {
      result.current.checkValue('b')
    })
    state = result.current.getGroupState(allItems)
    expect(state).toEqual({ allChecked: false, isIndeterminate: true })

    // Add 'c' -> allChecked
    act(() => {
      result.current.checkValue('c')
    })
    state = result.current.getGroupState(allItems)
    expect(state).toEqual({ allChecked: true, isIndeterminate: false })

    // Remove all -> empty
    act(() => {
      result.current.checkAll(allItems)
    })
    state = result.current.getGroupState(allItems)
    expect(state).toEqual({ allChecked: false, isIndeterminate: false })
  })
})
