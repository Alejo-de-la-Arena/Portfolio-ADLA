import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { ProjectImage } from '@/data/experiences'

type ImageLightboxProps = { image: ProjectImage | null; onClose: () => void }
export function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  useEffect(() => { if (!image) return; const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; document.addEventListener('keydown', onKeyDown); return () => document.removeEventListener('keydown', onKeyDown) }, [image, onClose])
  return <AnimatePresence>{image && <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="dialog" aria-modal="true" aria-label={image.alt}><motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative max-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}><button type="button" onClick={onClose} className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-2 text-foreground shadow-lg" aria-label="Cerrar imagen"><X className="h-5 w-5" /></button><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" className="max-h-[85vh] w-auto rounded-xl border border-border object-contain" /></motion.div></motion.div>}</AnimatePresence>
}
