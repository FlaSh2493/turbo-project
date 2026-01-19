import { useState, useCallback, useId } from 'react'
import { useCheckBoxGroupContext } from './check-box-group-context'

export interface UseCheckBoxOptions {
  /** 체크박스의 고유 ID. 제공되지 않으면 useId로 자동 생성됩니다. */
  id?: string
  /** 현재 체크 상태 (controlled) */
  checked?: boolean | 'indeterminate'
  /** 초기 체크 상태 (uncontrolled) */
  defaultChecked?: boolean | 'indeterminate'
  /** 체크 상태 변경 콜백 */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  /** 비활성화 여부 */
  disabled?: boolean
  /** 필수 여부 */
  required?: boolean
  /** 체크박스 그룹 내에서의 값 */
  value?: string
}

export interface UseCheckBoxReturn {
  /** 최종 결정된 ID */
  id: string
  /** 현재 체크 상태 */
  checked: boolean | 'indeterminate'
  /** 상태 변경 핸들러 */
  onCheckedChange: (checked: boolean | 'indeterminate') => void
  /** 체크 토글 핸들러 */
  check: () => void
  /** checkbox 요소에 전달할 데이터 속성 및 ARIA 속성 */
  checkboxProps: {
    role: 'checkbox'
    'aria-checked': boolean | 'mixed'
    'aria-required'?: boolean
    'aria-disabled'?: boolean
    disabled?: boolean
    tabIndex: number
  }
}

export function useCheckBox({
  id: providedId,
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  disabled,
  required,
  value,
}: UseCheckBoxOptions = {}): UseCheckBoxReturn {
  const generatedId = useId()
  const id = providedId || generatedId

  const groupContext = useCheckBoxGroupContext()
  const isGrouped = groupContext && value !== undefined

  const [internalChecked, setInternalChecked] = useState<boolean | 'indeterminate'>(
    defaultChecked ?? false,
  )

  // 그룹 인텍스트가 있으면 그룹에서 상태를 가져오고, 없으면 controlled/uncontrolled 로직 사용
  const checked = isGrouped
    ? groupContext.isChecked(value)
    : controlledChecked !== undefined
      ? controlledChecked
      : internalChecked

  const handleCheckedChange = useCallback(
    (newChecked: boolean | 'indeterminate') => {
      if (isGrouped) {
        groupContext.checkValue(value)
      } else if (controlledChecked === undefined) {
        setInternalChecked(newChecked)
      }
      onCheckedChange?.(newChecked)
    },
    [isGrouped, groupContext, value, controlledChecked, onCheckedChange],
  )

  const check = useCallback(() => {
    if (disabled) return
    const nextChecked = checked === 'indeterminate' ? true : !checked
    handleCheckedChange(nextChecked)
  }, [checked, disabled, handleCheckedChange])

  return {
    id,
    checked,
    onCheckedChange: handleCheckedChange,
    check,
    checkboxProps: {
      role: 'checkbox',
      'aria-checked': checked === 'indeterminate' ? 'mixed' : checked,
      'aria-required': required,
      'aria-disabled': disabled,
      disabled: disabled,
      tabIndex: disabled ? -1 : 0,
    },
  }
}
