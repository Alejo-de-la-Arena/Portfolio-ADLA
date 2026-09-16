import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { LocalizedScreenshot } from '@/data/experiences'
import { ModalSurface } from '../ui/ModalSurface'

type ImageLightboxProps = {
  images: LocalizedScreenshot[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
  closeLabel: string
  previousLabel: string
  nextLabel: string
}

export function ImageLightbox({ images, activeIndex, onClose, onNavigate, closeLabel, previousLabel, nextLabel }: ImageLightboxProps) {
  const reduceMotion = useReducedMotionPreference()
  const image = activeIndex === null ? null : images[activeIndex]
  const navigate = (offset: number) => {
    if (activeIndex !== null) onNavigate((activeIndex + offset + images.length) % images.length)
  }

  return (
    <AnimatePresence>
      {image && (
        <ModalSurface onClose={onClose} label={image.alt}>
          <motion.div
            transition={reduceMotion ? { duration: 0 } : undefined}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 sm:p-8"
            initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }}
            onClick={onClose}
            onKeyDown={event => {
              if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(-1) }
              if (event.key === 'ArrowRight') { event.preventDefault(); navigate(1) }
            }}
          >
            <motion.div
              transition={reduceMotion ? { duration: 0 } : undefined}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
              className="relative max-h-full max-w-6xl" onClick={event => event.stopPropagation()}
            >
              <button type="button" data-dialog-initial-focus onClick={onClose} className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-2 text-foreground shadow-lg" aria-label={closeLabel}>
                <X className="h-5 w-5" />
              </button>
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" className="max-h-[85vh] w-auto rounded-xl border border-border object-contain" />
              {images.length > 1 && (
                <>
                  <button type="button" onClick={() => navigate(-1)} className="absolute left-3 top-1/2 rounded-full bg-background/90 p-2 text-foreground" aria-label={previousLabel}>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={() => navigate(1)} className="absolute right-3 top-1/2 rounded-full bg-background/90 p-2 text-foreground" aria-label={nextLabel}>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        </ModalSurface>
      )}
    </AnimatePresence>
  )
}
