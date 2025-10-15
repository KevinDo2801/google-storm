import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#34C759]",
  {
    variants: {
      variant: {
        default:
          'bg-[#34C759] text-white shadow-[0_4px_8px_rgba(52,199,89,0.3)] hover:bg-[#2BA84A] active:scale-[0.98] rounded-[10px]',
        destructive:
          'bg-[#dc2626] text-white shadow-[0_4px_8px_rgba(220,38,38,0.3)] hover:bg-[#b91c1c] active:scale-[0.98] rounded-[10px]',
        outline:
          'border border-[#34C759] bg-white text-[#34C759] hover:bg-[#F3FFF3] rounded-[10px]',
        secondary:
          'bg-[#F8F9FA] text-[#4F4F4F] shadow-xs hover:bg-[#E0E0E0] rounded-[10px]',
        ghost:
          'hover:bg-[#F8F9FA] hover:text-[#212121] rounded-[10px]',
        link: 'text-[#34C759] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
})

Button.displayName = 'Button'

export { Button, buttonVariants }
