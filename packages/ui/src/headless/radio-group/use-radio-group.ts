import { useState, useCallback } from 'react'

export interface UseRadioGroupOptions<T extends string> {
  /** 현재 선택된 값 (controlled) */
  value?: T
  /** 초기 선택된 값 (uncontrolled) */
  defaultValue?: T
  /** 값 변경 콜백 */
  onValueChange?: (value: T) => void
  /** 비활성화 여부 */
  disabled?: boolean
}

export interface UseRadioGroupReturn<T extends string> {
  /** 현재 선택된 값 */
  value: T | undefined
  /** 특정 값의 체크 여부 확인 */
  isChecked: (itemValue: T) => boolean
  /** 특정 값의 상태 설정 */
  checkValue: (itemValue: T) => void
  /** 비활성화 여부 */
  disabled?: boolean
}

export function useRadioGroup<T extends string>({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled,
}: UseRadioGroupOptions<T> = {}): UseRadioGroupReturn<T> {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue)

  const value = isControlled ? controlledValue : internalValue

  const handleValueChange = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange],
  )

  const isChecked = useCallback((itemValue: T) => value === itemValue, [value])

  const checkValue = useCallback(
    (itemValue: T) => {
      if (disabled) return
      handleValueChange(itemValue)
    },
    [disabled, handleValueChange],
  )

  return {
    value,
    isChecked,
    checkValue,
    disabled,
  }
}
