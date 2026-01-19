import { CircleX } from 'lucide-react'
import { forwardRef } from 'react'

// ============================================
// Root (Container)
// ============================================

export interface InputPrimitiveRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const InputPrimitiveRoot = forwardRef<HTMLDivElement, InputPrimitiveRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} data-slot="input" className={className} {...props}>
        {children}
      </div>
    )
  },
)
InputPrimitiveRoot.displayName = 'InputPrimitiveRoot'

// ============================================
// Field (실제 input 요소)
// ============================================

export type InputPrimitiveFieldProps = React.InputHTMLAttributes<HTMLInputElement>

export const InputPrimitiveField = forwardRef<HTMLInputElement, InputPrimitiveFieldProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return <input ref={ref} type={type} data-slot="input-field" className={className} {...props} />
  },
)
InputPrimitiveField.displayName = 'InputPrimitiveField'

// ============================================
// ClearButton (삭제 버튼)
// ============================================

export type InputPrimitiveClearButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const InputPrimitiveClearButton = forwardRef<
  HTMLButtonElement,
  InputPrimitiveClearButtonProps
>(({ className, type = 'button', 'aria-label': ariaLabel = '입력 내용 삭제', ...props }, ref) => {
  return (
    <button ref={ref} type={type} data-slot="input-clear-button" className={className} aria-label={ariaLabel} {...props}>
      <CircleX size={16} />
    </button>
  )
})
InputPrimitiveClearButton.displayName = 'InputPrimitiveClearButton'

// ============================================
// Export
// ============================================

export const InputPrimitive = {
  Root: InputPrimitiveRoot,
  Field: InputPrimitiveField,
  ClearButton: InputPrimitiveClearButton,
}
