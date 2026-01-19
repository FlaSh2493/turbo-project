import { useState, useCallback } from 'react'

export interface UseCheckBoxGroupOptions<T extends string> {
  /** 현재 선택된 값들 (controlled) */
  value?: T[]
  /** 초기 선택된 값들 (uncontrolled) */
  defaultValue?: T[]
  /** 값 변경 콜백 */
  onValueChange?: (value: T[]) => void
  /** 비활성화 여부 */
  disabled?: boolean
}

export interface UseCheckBoxGroupReturn<T extends string> {
  /** 현재 선택된 값 배열 */
  value: T[]
  /** 특정 값의 체크 여부 확인 */
  isChecked: (itemValue: T) => boolean
  /** 특정 값의 상태 토글 */
  checkValue: (itemValue: T) => void
  /** 전체 선택/해제 */
  checkAll: (allValues: T[]) => void
  /** 전체 선택 여부 및 Indeterminate 여부 계산을 위한 도우미 */
  getGroupState: (allValues: T[]) => {
    allChecked: boolean
    isIndeterminate: boolean
  }
}

export function useCheckBoxGroup<T extends string>({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled,
}: UseCheckBoxGroupOptions<T> = {}): UseCheckBoxGroupReturn<T> {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState<T[]>(defaultValue ?? [])

  const value = isControlled ? controlledValue! : internalValue

  const handleValueChange = useCallback(
    (newValue: T[]) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange],
  )

  const isChecked = useCallback((itemValue: T) => value.includes(itemValue), [value])

  const checkValue = useCallback(
    (itemValue: T) => {
      if (disabled) return
      const newValue = isChecked(itemValue)
        ? value.filter(v => v !== itemValue)
        : [...value, itemValue]
      handleValueChange(newValue)
    },
    [disabled, handleValueChange, isChecked, value],
  )

  const checkAll = useCallback(
    (allValues: T[]) => {
      if (disabled) return
      const allSelected = allValues.every(v => value.includes(v))
      handleValueChange(allSelected ? [] : [...allValues])
    },
    [disabled, handleValueChange, value],
  )

  const getGroupState = useCallback(
    (allValues: T[]) => {
      const selectedCount = allValues.filter(v => value.includes(v)).length
      const allChecked = selectedCount === allValues.length && allValues.length > 0
      const isIndeterminate = selectedCount > 0 && selectedCount < allValues.length

      return { allChecked, isIndeterminate }
    },
    [value],
  )

  return {
    value,
    isChecked,
    checkValue,
    checkAll,
    getGroupState,
  }
}
