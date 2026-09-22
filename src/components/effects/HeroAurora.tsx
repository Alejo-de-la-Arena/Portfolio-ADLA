import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { motionTransition } from '@/lib/motion'

/** The CSS atmosphere is present even before the optional WebGL chunk loads. */
export function HeroAurora() {
  const host = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotionPreference()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    let disposed = false
    let cleanup: (() => void) | undefined
    // Two frames let the text paint before loading/initializing the renderer.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        void import('./auroraRenderer').then(({ mountAurora }) => {
          if (!disposed && host.current) {
            cleanup = mountAurora(host.current, value => { if (!disposed) setReady(value) })
          }
        }).catch(() => { if (!disposed) setReady(false) })
      })
    })
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      cleanup?.()
    }
  }, [reducedMotion])

  return <div aria-hidden="true" className="hero-aurora pointer-events-none absolute right-0 top-0 h-full w-full overflow-hidden">
    <div className="hero-aurora-fallback absolute inset-0" />
    <motion.div ref={host} className="absolute inset-0 h-full w-full overflow-hidden"
      initial={false} animate={{ opacity: ready && !reducedMotion ? 1 : 0 }}
      transition={motionTransition(reducedMotion, 'slow')} />
  </div>
}
