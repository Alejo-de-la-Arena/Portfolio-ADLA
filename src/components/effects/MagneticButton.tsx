import type { ReactNode } from 'react'
import { Button } from '../ui/Button'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
}

/** Shared button interaction replaces the former pointer-tracking spring. */
export function MagneticButton(props: MagneticButtonProps) {
  return <Button {...props} />
}
