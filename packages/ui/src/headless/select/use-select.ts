import { SelectPrimitiveRootProps } from '../../primitives'
import * as React from 'react'

export interface SelectOption {
  label: string
  value: string
}

// Props used for Logic (State Management)
export type SelectStatePropsBase = {
  options?: SelectOption[]
  // Controlled open state
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type SingleSelectStateProps = SelectStatePropsBase & {
  type: 'single'
  value: string
  defaultValue?: string
  options: SelectOption[]
  onValueChange?: (value: string) => void
}

export type MultiSelectStateProps = SelectStatePropsBase & {
  type: 'multiple'
  value: string[]
  defaultValue?: string[]
  options: SelectOption[]
  onValueChange?: (value: string[]) => void
}

export type UseSelectStateProps = (SingleSelectStateProps | MultiSelectStateProps) &
  SelectPrimitiveRootProps

// Full Context Value (State + Config)
export interface SelectContextValue {
  // Config (from props)
  type: 'single' | 'multiple'
  size: 'sm' | 'md'
  options: SelectOption[]

  // State (from hook)
  value: string | string[]
  open: boolean
  search: string

  // Handlers (from hook)
  setOpen: (open: boolean) => void
  setSearch: (search: string) => void
  handleItemSelect: (value: string) => void
  resetValue: () => void
}

// Hook Return Type (State Only)
export type SelectState = Omit<SelectContextValue, 'type' | 'size'>

export const useSelect = (props: UseSelectStateProps): SelectState => {
  const { type = 'single', options = [] } = props

  // ==============================
  // Open State
  // ==============================
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isOpenControlled = props.open !== undefined
  const open = isOpenControlled ? props.open! : uncontrolledOpen

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isOpenControlled) {
        setUncontrolledOpen(newOpen)
      }
      props.onOpenChange?.(newOpen)
    },
    [isOpenControlled, props.onOpenChange],
  )

  // ==============================
  // Value State
  // ==============================
  const isValueControlled = props.value !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(() => {
    if (type === 'multiple') {
      return (props as MultiSelectStateProps).defaultValue ?? []
    }
    return (props as SingleSelectStateProps).defaultValue ?? ''
  })

  const value = isValueControlled ? props.value! : uncontrolledValue

  const setValue = React.useCallback(
    (newValue: string | string[]) => {
      if (!isValueControlled) {
        setUncontrolledValue(newValue)
      }
      if (type === 'multiple') {
        ;(props as MultiSelectStateProps).onValueChange?.(newValue as string[])
      } else {
        ;(props as SingleSelectStateProps).onValueChange?.(newValue as string)
      }
    },
    [isValueControlled, props, type],
  )

  // ==============================
  // Search State
  // ==============================
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    if (!open) {
      setSearch('')
    }
  }, [open])

  // ==============================
  // Business Logic
  // ==============================
  const handleItemSelect = React.useCallback(
    (itemValue: string) => {
      if (type === 'multiple') {
        const currentValues = value as string[]
        const isSelected = currentValues.includes(itemValue)
        const nextValues = isSelected
          ? currentValues.filter(v => v !== itemValue)
          : [...currentValues, itemValue]
        setValue(nextValues)
      } else {
        setValue(itemValue)
        setOpen(false)
      }
    },
    [type, value, setValue, setOpen],
  )

  const resetValue = React.useCallback(() => {
    const emptyValue = type === 'multiple' ? [] : ''
    setValue(emptyValue)
  }, [type, setValue])

  // ==============================
  // Filter Options
  // ==============================
  const filteredOptions = React.useMemo(() => {
    if (!search) return options
    return options.filter((option: SelectOption) =>
      option.label.toLowerCase().includes(search.toLowerCase()),
    )
  }, [options, search])

  return {
    value,
    open,
    setOpen,
    search,
    setSearch,
    handleItemSelect,
    resetValue,
    options: filteredOptions,
  }
}
