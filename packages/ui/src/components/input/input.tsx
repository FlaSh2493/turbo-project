import { forwardRef, useCallback } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { InputPrimitive } from '../../primitives/input'
import { useInput } from '../../headless/input'
import { inputRootVariants, inputFieldVariants, inputClearButtonVariants } from './input.css'
import { cn } from '../../lib/utils'

// ============================================
// Input Component
// ============================================

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
    VariantProps<typeof inputRootVariants> {
  /**
   * 초기 값 (uncontrolled)
   */
  defaultValue?: string
  /**
   * 현재 값 (controlled)
   */
  value?: string
  /**
   * 값 변경 콜백
   */
  onChange?: (value: string) => void
  /**
   * 비활성화 상태
   */
  disabled?: boolean
  /**
   * 읽기 전용 상태
   */
  readOnly?: boolean
  /**
   * 에러 상태 (boolean이면 에러 상태만, string이면 에러 메시지도 표시)
   */
  error?: boolean | string
  /**
   * Clear 버튼 표시 여부
   * @default true
   */
  clearable?: boolean
  /**
   * Clear 버튼 클릭 콜백
   */
  onClear?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = 'sm',
      defaultValue,
      value,
      onChange,
      disabled,
      readOnly,
      error,
      clearable = true,
      onClear,
      placeholder = 'Placeholder',
      ...props
    },
    ref,
  ) => {
    const {
      value: inputValue,
      inputState,
      errorMessage,
      inputProps,
      clear,
    } = useInput({
      defaultValue,
      value,
      onChange,
      disabled,
      readOnly,
      error,
    })

    // 에러 메시지가 있으면 placeholder로 표시
    const displayPlaceholder = errorMessage ?? placeholder

    // onChange 병합
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        inputProps.onChange(e)
      },
      [inputProps],
    )

    const handleClearClick = useCallback(() => {
      clear()
      onClear?.()
    }, [clear, onClear])

    // Clear 버튼 표시 조건
    const showClearButton =
      clearable && inputState !== 'disabled' && inputState !== 'fixed' && !!inputValue

    return (
      <InputPrimitive.Root
        className={cn(inputRootVariants({ size, state: inputState }), className)}
      >
        <InputPrimitive.Field
          ref={ref}
          className={inputFieldVariants({ size, state: inputState })}
          placeholder={displayPlaceholder}
          {...inputProps}
          onChange={handleChange}
          {...props}
        />
        {showClearButton && (
          <InputPrimitive.ClearButton
            className={inputClearButtonVariants({ size })}
            onClick={handleClearClick}
          />
        )}
      </InputPrimitive.Root>
    )
  },
)

Input.displayName = 'Input'

export { inputRootVariants, inputFieldVariants, inputClearButtonVariants }
