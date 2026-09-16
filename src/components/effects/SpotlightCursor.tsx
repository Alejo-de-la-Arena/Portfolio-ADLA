import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { useEffect, useRef } from 'react'

export function SpotlightCursor() {
  const reduceMotion = useReducedMotionPreference()
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`
        spotlightRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reduceMotion])

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed z-0 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[100px]"
      style={{
        willChange: 'left, top',
        transform: 'translate(-50%, -50%)',
        transition: 'left 300ms ease-out, top 300ms ease-out',
      }}
    />
  )
}
