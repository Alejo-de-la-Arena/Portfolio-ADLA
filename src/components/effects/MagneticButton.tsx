import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
}

export function MagneticButton({ 
  children, 
  className, 
  onClick, 
  variant = 'primary' 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const { clientX, clientY } = e
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * 0.3
    const y = (clientY - (top + height / 2)) * 0.3
    setPosition({ x, y })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      animate={position}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Button
        ref={ref}
        variant={variant}
        className={className}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        onClick={onClick}
      >
        {children}
      </Button>
    </motion.div>
  )
}
