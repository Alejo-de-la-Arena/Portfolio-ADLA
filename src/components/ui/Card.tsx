import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glass?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, glass = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border border-border p-6',
          glass 
            ? 'bg-background-secondary/50 backdrop-blur-md' 
            : 'bg-background-secondary/80',
          hover &&
            'transition-all duration-300 hover:-translate-y-0.5 hover:border-border-light hover:shadow-[0_18px_40px_-28px_rgba(124,92,255,0.55)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
