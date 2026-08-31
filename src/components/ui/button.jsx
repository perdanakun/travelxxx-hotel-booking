import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  `
    group/button
    inline-flex
    shrink-0
    items-center
    justify-center
    whitespace-nowrap
    border
    border-transparent
    bg-clip-padding
    font-semibold
    transition-all
    outline-none
    select-none
    touch-manipulation
    active:not-aria-[haspopup]:scale-[0.98]
    disabled:pointer-events-none
    disabled:opacity-40
    focus-visible:border-ring
    focus-visible:ring-3
    focus-visible:ring-ring/50
    aria-invalid:border-destructive
    aria-invalid:ring-3
    aria-invalid:ring-destructive/20
    [&_svg]:pointer-events-none
    [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4
  `,
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',

        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90',

        outline:
          'border-border bg-background text-foreground hover:bg-surface',

        selected:
          'border-secondary bg-secondary-muted text-secondary',

        ghost:
          'border-transparent bg-transparent text-foreground hover:bg-surface',

        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20',

        link:
          'border-transparent bg-transparent text-primary underline-offset-4 hover:underline',
      },

      size: {
        sm:
          'min-h-10 gap-1.5 rounded-xl px-3 py-2 text-xs',

        default:
          'min-h-11 gap-2 rounded-full px-5 py-2 text-sm',

        lg:
          'min-h-14 gap-2 rounded-full px-5 py-3 text-base',

        icon:
          'size-11 rounded-full p-0',

        'icon-sm':
          'size-10 rounded-full p-0',

        'icon-lg':
          'size-14 rounded-full p-0',
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
  ...props
}) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
