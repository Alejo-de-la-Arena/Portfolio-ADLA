import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  subtle?: boolean
}

export function Divider({ className, subtle = false, ...props }: DividerProps) {
  return (
    <hr
      className={cn(
        'border-t border-border',
        subtle && 'border-border/60',
        className,
      )}
      {...props}
    />
  )
}

