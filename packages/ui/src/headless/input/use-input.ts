import { useState, useCallback, useMemo } from 'react'

// ============================================
// Types
// ============================================

export type InputState =
  | 'enabled'
  | 'fixed'
  | 'focused'
  | 'typing'
  | 'completed'
  | 'error'
  | 'disabled'

export interface UseInputOptions {
  /** 초기 값 (uncontrolled) */
  defaultValue?: string
  /** 현재 값 (controlled) */
  value?: string
  /** 값 변경 콜백 */
  onChange?: (value: string) => void
  /** 비활성화 상태 */
  disabled?: boolean
  /** 읽기 전용 상태 (Fixed) */
  readOnly?: boolean
  /** 에러 상태 (boolean이면 에러 상태만, string이면 에러 메시지도 표시) */
  error?: boolean | string
}

export interface UseInputReturn {
  /** 현재 값 */
  value: string
  /** 포커스 상태 */
  isFocused: boolean
  /** 값이 비어있는지 여부 */
  isEmpty: boolean
  /** 에러 상태 여부 */
  hasError: boolean
  /** 에러 메시지 (error가 string이고 값이 비어있을 때) */
  errorMessage: string | undefined
  /** 현재 Input 상태 */
  inputState: InputState
  /** input 요소에 전달할 props */
  inputProps: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus: () => void
    onBlur: () => void
    disabled: boolean
    readOnly: boolean
  }
  /** 값 초기화 함수 */
  clear: () => void
}

// ============================================
// Hook
// ============================================

export function useInput({
  defaultValue = '',
  value,
  onChange,
  disabled = false,
  readOnly = false,
  error,
}: UseInputOptions = {}): UseInputReturn {
  // controlled vs uncontrolled 상태
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = isControlled ? value : internalValue

  // 포커스 상태
  const [isFocused, setIsFocused] = useState(false)

  // 값이 비어있는지 여부
  const isEmpty = currentValue === ''

  // 에러 상태 처리
  const hasError = Boolean(error)
  const errorMessage = useMemo(() => {
    if (typeof error === 'string' && isEmpty) {
      return error
    }
    return undefined
  }, [error, isEmpty])

  // 상태 판별 로직 (우선순위 순)
  const inputState = useMemo<InputState>(() => {
    if (disabled) return 'disabled'
    if (readOnly) return 'fixed'
    if (hasError) return 'error'
    if (isFocused && isEmpty) return 'focused'
    if (isFocused && !isEmpty) return 'typing'
    if (!isFocused && !isEmpty) return 'completed'
    return 'enabled'
  }, [disabled, readOnly, hasError, isFocused, isEmpty])

  // 값 변경 핸들러
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    },
    [isControlled, onChange],
  )

  // 포커스 핸들러
  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  // 블러 핸들러
  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  // 값 초기화 함수
  const clear = useCallback(() => {
    if (!isControlled) {
      setInternalValue('')
    }
    onChange?.('')
  }, [isControlled, onChange])

  return {
    value: currentValue,
    isFocused,
    isEmpty,
    hasError,
    errorMessage,
    inputState,
    inputProps: {
      value: currentValue,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      disabled,
      readOnly,
    },
    clear,
  }
}
