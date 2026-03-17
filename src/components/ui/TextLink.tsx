import { AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  subtle?: boolean
}

export function TextLink({
  className,
  subtle = false,
  children,
  ...props
}: TextLinkProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center gap-1 text-sm font-medium underline-offset-4 transition-colors',
        subtle
          ? 'text-foreground-secondary hover:text-foreground hover:underline'
          : 'text-accent hover:text-accent-hover hover:underline',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}

