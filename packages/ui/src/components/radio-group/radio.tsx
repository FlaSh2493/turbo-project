'use client'

import * as React from 'react'
import { RadioGroupPrimitive } from '../../primitives/radio-group/radio-group'
import {
  rootVariants,
  radioVariants,
  indicatorVariants,
  radioDotVariants,
  labelVariants,
} from './radio-group.css'
import { cn } from '../../lib/utils'
import { useRadioGroupContext } from './radio-group'
import { useRadio } from '../../headless/radio-group/use-radio'

export interface RadioProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'checked' | 'value'> {
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
  /** 라벨 */
  label?: React.ReactNode
  /** 모드 */
  mode?: 'default' | 'squared'
}

export const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(
  (
    {
      className,
      label,
      mode = 'default',
      disabled: disabledProp,
      value,
      checked: controlledChecked,
      onCheckedChange,
      required,
      ...props
    },
    ref,
  ) => {
    const groupContext = useRadioGroupContext()

    const {
      checked,
      disabled,
      onCheckedChange: finalHandleCheckedChange,
      radioProps,
    } = useRadio({
      value,
      checked: controlledChecked,
      defaultChecked: props.defaultChecked,
      onCheckedChange,
      disabled: disabledProp,
      required,
      groupContext,
    })

    const state = checked ? 'checked' : 'unchecked'
    const generatedId = React.useId()
    const radioId = props.id || generatedId

    return (
      <label
        htmlFor={radioId}
        data-slot="radio-container"
        className={cn(rootVariants({ mode, state, disabled }), className)}
      >
        <RadioGroupPrimitive.Item
          ref={ref}
          id={radioId}
          value={value ?? ''}
          data-slot="radio-input"
          className={cn(radioVariants({ state, disabled }))}
          disabled={disabled}
          {...radioProps}
          {...props}
          onClick={e => {
            props.onClick?.(e)
            if (!disabled && !checked) {
              finalHandleCheckedChange(true)
            }
          }}
        >
          <RadioGroupPrimitive.Indicator
            data-slot="radio-indicator"
            className={cn(indicatorVariants())}
          >
            <div data-slot="radio-dot" className={radioDotVariants({ disabled })} />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {label && (
          <span data-slot="radio-label" className={cn(labelVariants({ mode, state, disabled }))}>
            {label}
          </span>
        )}
      </label>
    )
  },
)
Radio.displayName = 'Radio'
