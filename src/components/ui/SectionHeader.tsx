import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const alignClass =
    align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <header className={cn('flex flex-col gap-3 mb-10', alignClass, className)}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.22em] text-foreground-tertiary">
          {eyebrow}
        </p>
      )}
      <div className="space-y-3">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="max-w-2xl text-sm sm:text-base text-foreground-secondary leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </header>
  )
}

