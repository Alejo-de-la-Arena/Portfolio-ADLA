import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

const SESSION_KEY = 'portfolio_loader_seen'

export function CinematicLoader() {
  const reduceMotion = useReducedMotion()
  const { personalInfo, ui } = useLocalizedContent()
  const [visible, setVisible] = useState(false)

  const initials = useMemo(() => (
    personalInfo.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 3)
  ), [personalInfo.name])

  useEffect(() => {
    if (reduceMotion) return

    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === 'true'
    if (alreadySeen) return

    setVisible(true)
    const timer = window.setTimeout(() => {
      setVisible(false)
      window.sessionStorage.setItem(SESSION_KEY, 'true')
    }, 950)

    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  if (!visible) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-background"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative flex flex-col items-center gap-3"
        >
          <motion.div
            className="h-20 w-20 rounded-2xl border border-border bg-background-secondary/80 text-center font-display text-3xl font-bold leading-[5rem] text-foreground shadow-xl shadow-black/20"
            animate={{ boxShadow: ['0 0 0 rgba(139,92,246,0)', '0 0 30px rgba(139,92,246,0.25)', '0 0 0 rgba(139,92,246,0)'] }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            {initials}
          </motion.div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-foreground-tertiary">{ui.loader.subtitle}</p>
          <button
            type="button"
            className="text-xs text-foreground-tertiary underline-offset-4 hover:text-foreground hover:underline"
            onClick={() => {
              setVisible(false)
              window.sessionStorage.setItem(SESSION_KEY, 'true')
            }}
          >
            {ui.loader.skip}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
