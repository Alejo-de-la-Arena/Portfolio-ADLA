import { AnimatePresence, motion } from 'framer-motion'
import { Layers3, Sparkles } from 'lucide-react'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

export function ModeToggle() {
  const { mode, setMode, isRecruiterMode } = usePortfolioMode()
  const { ui } = useLocalizedContent()

  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-background-secondary/90 p-1 shadow-lg shadow-black/20 backdrop-blur-md"
      role="group"
      aria-label={ui.modeToggle.aria}
    >
      <button
        type="button"
        onClick={() => setMode('recruiter')}
        className={cn(
          'relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
          isRecruiterMode ? 'text-foreground' : 'text-foreground-secondary hover:text-foreground'
        )}
        aria-pressed={isRecruiterMode}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {ui.modeToggle.recruiter}
        <AnimatePresence>
          {isRecruiterMode && (
            <motion.span
              layoutId="mode-toggle-highlight"
              className="absolute inset-0 -z-10 rounded-full bg-accent/15"
              transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            />
          )}
        </AnimatePresence>
      </button>
      <button
        type="button"
        onClick={() => setMode('deep')}
        className={cn(
          'relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
          mode === 'deep' ? 'text-foreground' : 'text-foreground-secondary hover:text-foreground'
        )}
        aria-pressed={mode === 'deep'}
      >
        <Layers3 className="h-3.5 w-3.5" />
        {ui.modeToggle.deep}
        <AnimatePresence>
          {mode === 'deep' && (
            <motion.span
              layoutId="mode-toggle-highlight"
              className="absolute inset-0 -z-10 rounded-full bg-accent/15"
              transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            />
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
