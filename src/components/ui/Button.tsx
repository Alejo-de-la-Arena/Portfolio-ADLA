import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-medium',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-accent hover:bg-accent-hover text-white': variant === 'primary',
            'bg-background-tertiary hover:bg-border-light text-foreground': variant === 'secondary',
            'hover:bg-background-tertiary text-foreground-secondary': variant === 'ghost',
            'border border-border hover:border-border-light text-foreground': variant === 'outline',
          },
          {
            'px-3 py-1.5 text-xs sm:text-sm': size === 'sm',
            'px-4 py-2 text-sm sm:text-base': size === 'md',
            'px-5 py-2.5 text-base sm:text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
