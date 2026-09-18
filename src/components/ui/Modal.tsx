import { motionTransition } from '@/lib/motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { useId } from 'react'
import { ModalSurface } from './ModalSurface'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './Button'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const reduceMotion = useReducedMotionPreference()
  const { ui } = useLocalizedContent()
  const titleId = useId()

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalSurface onClose={onClose} labelledBy={title ? titleId : undefined} label={title ? undefined : ui.command.title}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={motionTransition(reduceMotion)}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={event => { if (event.target === event.currentTarget) onClose() }}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={motionTransition(reduceMotion)}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background-secondary border border-border rounded-2xl shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-background-secondary/95 backdrop-blur-sm border-b border-border">
                {title && (
                  <h2 id={titleId} tabIndex={-1} data-dialog-initial-focus className="text-2xl font-display font-bold">{title}</h2>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="ml-auto"
                  aria-label={ui.modal.close}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </ModalSurface>
      )}
    </AnimatePresence>
  )
}
