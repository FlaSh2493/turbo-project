import { ComponentProps, forwardRef } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from './button.css'
import { cn } from '../../lib/utils'
import { ButtonPrimitive } from '../../primitives/button/button'

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  /**
   * 버튼 스타일 변형
   * @default default
   */
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  /**
   * 버튼 크기
   * @default md
   */
  size?: 'md' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <ButtonPrimitive
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
