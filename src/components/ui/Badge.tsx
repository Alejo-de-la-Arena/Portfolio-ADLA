import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'subtle' | 'outline'
}

export function Badge({
  className,
  variant = 'subtle',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        'border border-border/60 text-foreground-secondary bg-background-secondary/80',
        variant === 'outline' && 'bg-transparent',
        className,
      )}
      {...props}
    />
  )
}

