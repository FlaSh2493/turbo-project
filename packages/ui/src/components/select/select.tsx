import * as React from 'react'
import { cn } from '../../lib/utils'
import {
  SelectPrimitiveRoot,
  SelectPrimitiveTrigger,
  SelectPrimitiveContent,
  SelectPrimitiveItem,
} from '../../primitives/select'
import {
  SelectContext,
  useSelectContext,
  useSelect,
  type UseSelectStateProps,
  type SelectOption,
  type SelectContextValue,
} from '../../headless/select'
import { triggerVariants, contentVariants, itemVariants } from './select.css'
import { Input } from '../input'
import { CheckBox } from '../check-box'
import { Button } from '../../components/button/button'
import { ScrollArea, type ScrollAreaProps } from '../scroll-area'
import { ArrowDown } from 'lucide-react'

// ============================================
// Main Components
// ============================================

type SelectRootProps = UseSelectStateProps & {
  options: SelectOption[]
  size?: 'sm' | 'md'
  children: React.ReactNode
}

/**
 * Select Root Component
 * 사용자가 여러 옵션 중 하나 또는 여러 옵션을 선택할 수 있게 하는 드롭다운 컨트롤입니다.
 */
const SelectRoot = ({
  children,
  size = 'sm',
  options,
  type = 'single',
  ...props
}: SelectRootProps) => {
  const { open, setOpen, ...rest } = useSelect({ ...props, type, options } as UseSelectStateProps)

  const contextValue: SelectContextValue = {
    ...rest,
    open,
    setOpen,
    type,
    size,
  }

  return (
    <SelectContext.Provider value={contextValue}>
      <SelectPrimitiveRoot open={open} onOpenChange={setOpen}>
        {children}
      </SelectPrimitiveRoot>
    </SelectContext.Provider>
  )
}

export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitiveTrigger
> {
  placeholder?: string
  size?: 'sm' | 'md'
  error?: boolean
  /**
   * 읽기 전용 상태 - 값은 표시되지만 변경할 수 없음
   */
  readOnly?: boolean
}

/**
 * Select Trigger Component
 * 선택된 값을 표시하며 드롭다운 메뉴를 열고 닫는 버튼입니다.
 */
export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitiveTrigger>,
  SelectTriggerProps
>(
  (
    { className, children, placeholder = 'Placeholder', size, error = false, disabled, readOnly = false, ...props },
    ref,
  ) => {
    const { value, open, size: contextSize, options } = useSelectContext()
    const appliedSize = size || contextSize

    const getLabel = (v: string) => {
      const option = options.find(opt => opt.value === v)
      return option ? option.label : v
    }

    const hasValue = Array.isArray(value) ? value.length > 0 : !!value
    const displayValue = hasValue
      ? Array.isArray(value)
        ? `${getLabel(value[0])} 외 ${value.length}개`
        : getLabel(value as string)
      : placeholder

    const state = React.useMemo(() => {
      if (disabled) return 'disabled'
      if (readOnly) return 'readonly'
      if (error) return 'error'
      if (open) return 'open'
      if (hasValue) return 'completed'
      return 'enabled'
    }, [disabled, readOnly, error, open, hasValue])

    // readOnly일 때는 클릭해도 드롭다운이 열리지 않도록 함
    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent) => {
        if (readOnly) {
          e.preventDefault()
        }
      },
      [readOnly],
    )

    return (
      <SelectPrimitiveTrigger
        ref={ref}
        disabled={disabled}
        className={cn(triggerVariants({ size: appliedSize, state }), className)}
        onPointerDown={handlePointerDown}
        {...props}
      >
        <span
          data-slot="select-value"
          className={cn('truncate', !hasValue && !error && !readOnly && 'text-gray-400')}
        >
          {children || displayValue}
        </span>
        {readOnly && (
          <ArrowDown
            data-slot="select-icon"
            className={cn('h-4 w-4', state === 'open' ? 'text-gray-700' : 'text-gray-400')}
          />
        )}
      </SelectPrimitiveTrigger>
    )
  },
)
SelectTrigger.displayName = 'SelectTrigger'

/**
 * Select Content Component
 * 드롭다운 메뉴의 내용 컨테이너입니다.
 */
export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitiveContent>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitiveContent>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitiveContent
    ref={ref}
    data-slot="select-content"
    className={cn(contentVariants(), className)}
    {...props}
  >
    {children}
  </SelectPrimitiveContent>
))
SelectContent.displayName = 'SelectContent'

// ============================================
// Compositional Elements
// ============================================

/**
 * Select Search Component
 * 선택 메뉴 내에서 옵션을 검색할 수 있는 입력 필드입니다.
 */
export const SelectSearch = ({ className }: { className?: string }) => {
  const { search, setSearch } = useSelectContext()

  return (
    <Input
      data-slot="select-search"
      className={cn('mb-2', className)}
      onKeyDown={e => e.stopPropagation()}
      size="sm"
      value={search}
      onChange={setSearch}
      clearable
      onClear={() => setSearch('')}
    />
  )
}

/**
 * Select Header Component
 * 선택 메뉴의 상단 영역으로 선택된 개수 표시와 초기화 기능을 제공합니다.
 */
export const SelectHeader = ({ className }: { className?: string }) => {
  const { value, resetValue } = useSelectContext()
  const count = Array.isArray(value) ? value.length : value ? 1 : 0

  return (
    <div
      data-slot="select-header"
      className={cn(
        'flex items-center justify-between text-[12px] font-medium text-gray-400',
        className,
      )}
    >
      <span data-slot="select-count" className="title4 pl-2.5 text-gray-700">
        {count}개
      </span>
      <Button variant="ghost" size="sm" onClick={resetValue}>
        초기화
      </Button>
    </div>
  )
}

/**
 * Select Footer Component
 * 선택 메뉴의 하단 영역으로 취소 및 확인 버튼을 포함합니다.
 */
export const SelectFooter = ({
  className,
  onConfirm,
  onCancel,
}: {
  className?: string
  onConfirm?: () => void
  onCancel?: () => void
}) => {
  const { setOpen } = useSelectContext()

  const handleCancel = () => {
    onCancel?.()
    setOpen(false)
  }

  const handleConfirm = () => {
    onConfirm?.()
    setOpen(false)
  }

  return (
    <div data-slot="select-footer" className={cn('flex items-center justify-end gap-1', className)}>
      <Button variant="secondary" size="sm" onClick={handleCancel}>
        취소
      </Button>
      <Button variant="secondary" size="sm" onClick={handleConfirm}>
        확인
      </Button>
    </div>
  )
}

// ============================================
// Items
// ============================================

export interface SelectItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitiveItem>,
  'type' | 'selectedValue' | 'handleItemSelect'
> {
  size?: 'sm' | 'md'
}

/**
 * Select Item Component
 * 단일 선택 모드에서의 개별 옵션 아이템입니다.
 */
export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitiveItem>,
  SelectItemProps
>(({ className, children, value, ...props }, ref) => {
  const {
    search,
    size: contextSize,
    value: contextValue,
    handleItemSelect,
    type,
  } = useSelectContext()
  const size = props.size || contextSize
  const isSelected = value === contextValue

  if (
    search &&
    typeof children === 'string' &&
    !children.toLowerCase().includes(search.toLowerCase())
  ) {
    return null
  }

  return (
    <SelectPrimitiveItem
      ref={ref}
      value={value}
      type={type}
      selectedValue={contextValue}
      handleItemSelect={handleItemSelect}
      className={cn(itemVariants({ size, selected: isSelected }), className)}
      {...props}
    >
      {(state: { isSelected: boolean }) => (
        <div
          data-slot="select-item-inner"
          className={cn(
            'flex items-center w-full h-full',
            size === 'md' ? 'gap-[14px]' : 'gap-[10px]',
            isSelected ? 'text-primary-300' : 'text-gray-700',
          )}
        >
          <span data-slot="select-item-text" className="text-gray-700">
            {typeof children === 'function' ? children(state) : children}
          </span>
        </div>
      )}
    </SelectPrimitiveItem>
  )
})
SelectItem.displayName = 'SelectItem'

export interface SelectCheckboxItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitiveItem>,
  'type' | 'selectedValue' | 'handleItemSelect'
> {
  size?: 'sm' | 'md'
}

/**
 * Select Checkbox Item Component
 * 다중 선택 모드에서의 체크박스를 포함하는 개별 옵션 아이템입니다.
 */
export const SelectCheckboxItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitiveItem>,
  SelectCheckboxItemProps
>(({ className, children, value, ...props }, ref) => {
  const {
    search,
    handleItemSelect,
    value: selectedValue,
    size: contextSize,
    type,
  } = useSelectContext()
  const size = props.size || contextSize

  if (
    search &&
    typeof children === 'string' &&
    !children.toLowerCase().includes(search.toLowerCase())
  ) {
    return null
  }

  const isSelected = Array.isArray(selectedValue)
    ? selectedValue.includes(value)
    : selectedValue === value

  return (
    <SelectPrimitiveItem
      ref={ref}
      value={value}
      type={type}
      selectedValue={selectedValue}
      handleItemSelect={handleItemSelect}
      onSelect={e => {
        e.preventDefault() // CheckBox should not close the menu
        handleItemSelect(value)
      }}
      className={cn(itemVariants({ size, selected: isSelected }), className)}
      {...props}
    >
      <div
        data-slot="select-item-checked-inner"
        className={cn(
          'flex items-center w-full h-full',
          size === 'md' ? 'gap-[14px]' : 'gap-[10px]',
        )}
      >
        <CheckBox
          checked={isSelected}
          onCheckedChange={() => handleItemSelect(value)}
          tabIndex={-1}
        />
        <span
          data-slot="select-item-text"
          className={cn('body2', isSelected ? 'text-primary-300' : 'text-gray-700')}
        >
          {typeof children === 'function' ? children({ isSelected }) : children}
        </span>
      </div>
    </SelectPrimitiveItem>
  )
})
SelectCheckboxItem.displayName = 'SelectCheckboxItem'

// ============================================
// Group / List
// ============================================

export interface SelectListProps extends ScrollAreaProps {
  render: (options: SelectOption[]) => React.ReactNode
}

/**
 * Select List Component
 * 옵션 아이템들이 나열되는 스크롤 가능한 리스트 영역입니다.
 */
export const SelectList = ({
  className,
  offset = 0,
  type = 'always',
  render,
  ...props
}: SelectListProps) => {
  const { size, options } = useSelectContext()
  return (
    <ScrollArea data-slot="select-list" type={type} offset={offset} {...props}>
      <div className={cn('flex flex-col', size === 'md' ? 'gap-2' : 'gap-1', className)}>
        {render(options)}
      </div>
    </ScrollArea>
  )
}

// ============================================
// Compound Component Export
// ============================================

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Search: SelectSearch,
  Header: SelectHeader,
  Footer: SelectFooter,
  Item: SelectItem,
  CheckboxItem: SelectCheckboxItem,
  List: SelectList,
})
