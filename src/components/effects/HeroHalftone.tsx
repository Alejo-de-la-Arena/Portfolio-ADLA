import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { motionTransition } from '@/lib/motion'

/** Adds dots where the lower portrait fades; toggle to compare the transition. */
export const HALFTONE_DISSOLVE = true
/** Inspect the full-strength pattern without masks, fades, or opacity caps. */
export const DEBUG_HALFTONE = false

/** Calibration: dot spacing 9–22 CSS px; smaller values make a denser field. */
export const HALFTONE_SPACING = 15
/** Calibration: dot size 0.35–0.85 of a cell. */
export const HALFTONE_DOT_SCALE = 0.62
/** Calibration: contour strength 0.15–0.65. */
export const HALFTONE_CONTOUR_STRENGTH = 0.38
/** Calibration: motion speed 0.03–0.20; 0 makes the scene static. */
export const HALFTONE_SPEED = 0.075
/** Calibration: dissolve boost 0–0.65; 0 disables its visual effect. */
export const HALFTONE_DISSOLVE_STRENGTH = 0.34
/** Calibration: normalized portrait focus; x/y each 0–1. */
const HALFTONE_FACE_DESKTOP: [number, number] = [0.62, 0.58]
const HALFTONE_FACE_MOBILE: [number, number] = [0.50, 0.69]
/** Calibration: quiet radius 0.20–0.38; larger values protect more of the face. */
export const HALFTONE_FACE_QUIET_RADIUS = 0.30
/** Calibration: dot reduction around the face 0.25–0.60. */
export const HALFTONE_FACE_QUIET_STRENGTH = 0.44
/** Calibration: text focus in normalized shader coordinates (x/y 0–1, Y grows upward). */
const HALFTONE_TEXT_DESKTOP: [number, number] = [0.26, 0.49]
const HALFTONE_TEXT_MOBILE: [number, number] = [0.50, 0.22]
/** Calibration: text quiet ellipse half-width and half-height, each 0.15–0.55. */
const HALFTONE_TEXT_QUIET_SIZE: [number, number] = [0.42, 0.50]
/** Calibration: reduction inside the text ellipse, 0.45–0.90; 1 hides the pattern. */
export const HALFTONE_TEXT_QUIET_STRENGTH = 0.78
/** Calibration: desktop lower-portrait fade center, 0.10–0.35 from the bottom of the shader (Y grows upward). */
export const HALFTONE_DISSOLVE_Y_DESKTOP = 0.20
export const HALFTONE_DISSOLVE_Y_MOBILE = 0.52
/** Calibration: 4–9 contour intervals across the height field. */
export const HALFTONE_CONTOUR_COUNT = 6
/** Calibration: on mobile, freeze when the first 24 frames average below 24–40 fps. */
export const HALFTONE_MIN_MOBILE_FPS = 28
/** Calibration: dark 0.40–0.75; verify text contrast after changes. */
export const HALFTONE_OPACITY_DARK = 0.62
/** Calibration: light 0.08–0.18. */
export const HALFTONE_OPACITY_LIGHT = 0.14

export function HeroHalftone() {
  const host = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotionPreference()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let disposed = false
    let cleanup: (() => void) | undefined
    let frame = 0
    // Decode the high-priority portrait, then give it two paint opportunities.
    // WebGL compilation must not compete with the LCP image.
    const start = () => {
      if (disposed) return
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          void import('./halftoneRenderer').then(({ mountHalftone }) => {
            if (disposed || !host.current) return
            cleanup = mountHalftone(host.current, value => { if (!disposed) setReady(value) }, {
              dissolve: HALFTONE_DISSOLVE,
              spacing: HALFTONE_SPACING,
              dotScale: HALFTONE_DOT_SCALE,
              contourStrength: HALFTONE_CONTOUR_STRENGTH,
              speed: HALFTONE_SPEED,
              dissolveStrength: HALFTONE_DISSOLVE_STRENGTH,
              faceDesktop: HALFTONE_FACE_DESKTOP,
              faceMobile: HALFTONE_FACE_MOBILE,
              faceQuietRadius: HALFTONE_FACE_QUIET_RADIUS,
              faceQuietStrength: HALFTONE_FACE_QUIET_STRENGTH,
              textDesktop: HALFTONE_TEXT_DESKTOP,
              textMobile: HALFTONE_TEXT_MOBILE,
              textQuietSize: HALFTONE_TEXT_QUIET_SIZE,
              textQuietStrength: HALFTONE_TEXT_QUIET_STRENGTH,
              dissolveYDesktop: HALFTONE_DISSOLVE_Y_DESKTOP,
              dissolveYMobile: HALFTONE_DISSOLVE_Y_MOBILE,
              contourCount: HALFTONE_CONTOUR_COUNT,
              minMobileFps: HALFTONE_MIN_MOBILE_FPS,
              staticFrame: reducedMotion && !DEBUG_HALFTONE,
            })
          }).catch(() => { if (!disposed) setReady(false) })
        })
      })
    }
    const portrait = host.current?.closest('#hero')?.querySelector('img')
    if (portrait) void portrait.decode().then(start, start)
    else start()
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      cleanup?.()
    }
  }, [reducedMotion])

  return <div aria-hidden="true" className={`hero-halftone pointer-events-none absolute inset-0 overflow-hidden${DEBUG_HALFTONE ? ' hero-halftone--debug' : ''}`}
    style={{
      '--halftone-opacity-dark': HALFTONE_OPACITY_DARK,
      '--halftone-opacity-light': HALFTONE_OPACITY_LIGHT,
      '--halftone-spacing': `${HALFTONE_SPACING}px`,
      '--halftone-text-x-desktop': `${HALFTONE_TEXT_DESKTOP[0] * 100}%`,
      '--halftone-text-y-desktop': `${(1 - HALFTONE_TEXT_DESKTOP[1]) * 100}%`,
      '--halftone-text-x-mobile': `${HALFTONE_TEXT_MOBILE[0] * 100}%`,
      '--halftone-text-y-mobile': `${(1 - HALFTONE_TEXT_MOBILE[1]) * 100}%`,
      '--halftone-text-size-x': `${HALFTONE_TEXT_QUIET_SIZE[0] * 100}%`,
      '--halftone-text-size-y': `${HALFTONE_TEXT_QUIET_SIZE[1] * 100}%`,
      '--halftone-text-opacity-floor': (1 - HALFTONE_TEXT_QUIET_STRENGTH).toFixed(2),
    } as React.CSSProperties}>
    <div className="hero-halftone-fallback absolute inset-0" />
    <motion.div ref={host} className="absolute inset-0 h-full w-full overflow-hidden"
      initial={false} animate={{ opacity: ready ? 1 : 0 }}
      transition={motionTransition(reducedMotion, 'slow')} />
  </div>
}
