import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { motionTransition } from '@/lib/motion'

/**
 * Aurora calibration. Keep values within these useful ranges while tuning in dev:
 * intensity 0.55–1.20, amplitude 0.20–0.65, speed 0.35–1.20,
 * scale 0.75–1.45, opacity 0.18–0.42. Above these ranges it begins to compete
 * with the hero copy; below them it reads as a flat stain.
 */
export const AURORA_INTENSITY = 0.88
export const AURORA_AMPLITUDE = 0.46
export const AURORA_SPEED = 0.72
export const AURORA_SCALE = 1.08
export const AURORA_OPACITY = 0.28

/** Set to true locally to inspect the shader without masks, fades or opacity caps. */
export const DEBUG_AURORA = true

/** The CSS atmosphere is present even before the optional WebGL chunk loads. */
export function HeroAurora() {
  const host = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotionPreference()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (reducedMotion && !DEBUG_AURORA) return
    let disposed = false
    let cleanup: (() => void) | undefined
    // Two frames let the text paint before loading/initializing the renderer.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        void import('./auroraRenderer').then(({ mountAurora }) => {
          if (!disposed && host.current) {
            cleanup = mountAurora(host.current, value => { if (!disposed) setReady(value) }, {
              intensity: DEBUG_AURORA ? 1.2 : AURORA_INTENSITY,
              amplitude: DEBUG_AURORA ? 0.65 : AURORA_AMPLITUDE,
              speed: DEBUG_AURORA ? 1 : AURORA_SPEED,
              scale: DEBUG_AURORA ? 1 : AURORA_SCALE,
            })
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

  return <div aria-hidden="true" className={`hero-aurora pointer-events-none absolute right-0 top-0 h-full w-full overflow-hidden${DEBUG_AURORA ? ' hero-aurora--debug' : ''}`} style={{ '--hero-aurora-opacity': DEBUG_AURORA ? 1 : AURORA_OPACITY } as React.CSSProperties}>
    <div className="hero-aurora-fallback absolute inset-0" />
    <motion.div ref={host} className="absolute inset-0 h-full w-full overflow-hidden"
      initial={false} animate={{ opacity: (DEBUG_AURORA || ready) && (DEBUG_AURORA || !reducedMotion) ? 1 : 0 }}
      transition={motionTransition(DEBUG_AURORA || reducedMotion, 'slow')} />
  </div>
}
