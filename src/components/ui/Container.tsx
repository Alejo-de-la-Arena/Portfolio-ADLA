import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: 'narrow' | 'base' | 'wide' | 'editorial'
}

export function Container({
  className,
  width = 'base',
  ...props
}: ContainerProps) {
  const widthClass =
    width === 'narrow'
      ? 'max-w-3xl'
      : width === 'wide'
      ? 'max-w-6xl'
      : width === 'editorial'
      ? 'max-w-editorial'
      : 'max-w-5xl'

  return (
    <div
      className={cn('mx-auto px-4 sm:px-6 lg:px-8', widthClass, className)}
      {...props}
    />
  )
}

