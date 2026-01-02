import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[5px] transition-all disabled:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary-400 text-white hover:bg-primary-400-hover active:bg-primary-400 disabled:bg-gray-400',
        outline:
          'border border-primary-300 bg-white text-primary-300 hover:bg-hover active:bg-selected disabled:border-gray-300 disabled:text-gray-400',
        secondary:
          'border border-gray-300 bg-white text-gray-700 hover:bg-hover active:border-primary-300 active:bg-selected active:text-primary-300 disabled:border-gray-300 disabled:text-gray-400',
        ghost:
          'bg-transparent text-gray-700 hover:bg-hover active:bg-selected active:text-primary-300 disabled:text-gray-400',
        link: 'text-primary-300 underline-offset-4 hover:underline',
      },
      size: {
        lg: 'h-[44px] px-[20px] gap-[8px] min-w-[84px] title3',
        default: 'h-[34px] px-[14px] gap-[8px] min-w-[64px] title3',
        sm: 'h-[24px] px-[8px] gap-[4px] min-w-[44px] title4',
        icon: 'size-[34px]',
        'icon-sm': 'size-[24px]',
        'icon-lg': 'size-[44px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
