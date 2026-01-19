import { useState, useCallback } from 'react'
import type { UseRadioGroupReturn } from './use-radio-group'

export interface UseRadioOptions {
  /** Radio의 value (그룹 내에서 사용 시 필수) */
  value?: string
  /** 현재 체크 상태 (controlled, 그룹 외부에서 단독 사용 시) */
  checked?: boolean
  /** 초기 체크 상태 (uncontrolled) */
  defaultChecked?: boolean
  /** 체크 상태 변경 콜백 */
  onCheckedChange?: (checked: boolean) => void
  /** 비활성화 여부 */
  disabled?: boolean
  /** 필수 여부 */
  required?: boolean
  /** RadioGroup 컨텍스트 (그룹 내에서 사용 시) */
  groupContext?: UseRadioGroupReturn<string> | null
}

export interface UseRadioReturn {
  /** 현재 체크 상태 */
  checked: boolean
  /** 비활성화 여부 */
  disabled: boolean
  /** 상태 변경 핸들러 */
  onCheckedChange: (checked: boolean) => void
  /** 체크 토글 핸들러 */
  check: () => void
  /** radio 요소에 전달할 데이터 속성 및 ARIA 속성 */
  radioProps: {
    role: 'radio'
    'aria-checked': boolean
    'aria-required'?: boolean
    'aria-disabled'?: boolean
    disabled?: boolean
    tabIndex: number
  }
}

export function useRadio({
  value,
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  disabled: disabledProp,
  required,
  groupContext,
}: UseRadioOptions = {}): UseRadioReturn {
  // 그룹 컨텍스트가 있고 value가 있으면 그룹 모드
  const isGrouped = groupContext && value !== undefined

  // 그룹 모드일 때는 그룹의 상태를 사용, 아니면 controlled/uncontrolled 상태 사용
  const isControlled = !isGrouped && controlledChecked !== undefined
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked ?? false)

  // 체크 상태 결정: 그룹 모드 > controlled > uncontrolled
  const checked = isGrouped
    ? groupContext.isChecked(value)
    : isControlled
      ? controlledChecked!
      : internalChecked

  // disabled 상태: prop > 그룹의 disabled
  const disabled = disabledProp ?? groupContext?.disabled ?? false

  const handleCheckedChange = useCallback(
    (newChecked: boolean) => {
      if (isGrouped) {
        // 그룹 모드: 체크될 때만 그룹에 값 전달
        if (newChecked) {
          groupContext.checkValue(value)
        }
        onCheckedChange?.(newChecked)
      } else {
        // 단독 모드
        if (!isControlled) {
          setInternalChecked(newChecked)
        }
        onCheckedChange?.(newChecked)
      }
    },
    [isGrouped, groupContext, value, isControlled, onCheckedChange],
  )

  const check = useCallback(() => {
    if (disabled) return
    handleCheckedChange(true)
  }, [disabled, handleCheckedChange])

  return {
    checked,
    disabled,
    onCheckedChange: handleCheckedChange,
    check,
    radioProps: {
      role: 'radio',
      'aria-checked': checked,
      'aria-required': required,
      'aria-disabled': disabled,
      disabled,
      tabIndex: disabled ? -1 : 0,
    },
  }
}
