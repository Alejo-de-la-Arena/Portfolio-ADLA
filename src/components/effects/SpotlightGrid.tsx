import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const MOBILE_BREAKPOINT = 768

export function SpotlightGrid() {
  const reduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [pointer, setPointer] = useState({ x: 50, y: 35 })

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(media.matches)
    onChange()
    media.addEventListener('change', onChange)

    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduceMotion || isMobile) return

    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      setPointer({ x, y })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduceMotion, isMobile])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-70"
      animate={
        reduceMotion || isMobile
          ? undefined
          : {
              backgroundPosition: `${pointer.x}% ${pointer.y}%`,
            }
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        backgroundImage: `
          radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(139, 92, 246, 0.20), transparent 28%),
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent 80%)',
      }}
    />
  )
}
