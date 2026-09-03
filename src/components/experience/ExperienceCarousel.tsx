import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { ProjectMedia } from '@/data/experiences'
import { DeviceShowcase } from './DeviceShowcase'

type ExperienceCarouselProps = { media: ProjectMedia[]; onOpen: (index: number) => void }
export function ExperienceCarousel({ media, onOpen }: ExperienceCarouselProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const goTo = (index: number) => { const next = (index + media.length) % media.length; const element = ref.current; if (element) element.scrollTo({ left: element.clientWidth * next, behavior: reduceMotion ? 'auto' : 'smooth' }); setActive(next) }
  const onScroll = () => { const element = ref.current; if (element) setActive(Math.round(element.scrollLeft / element.clientWidth)) }
  return <div className="relative min-h-[28rem] lg:min-h-[23rem]" role="region" aria-roledescription="carousel" aria-label="Capturas del proyecto"><div ref={ref} tabIndex={0} onScroll={onScroll} onKeyDown={(event) => { if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(active - 1) }; if (event.key === 'ArrowRight') { event.preventDefault(); goTo(active + 1) } }} className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{media.map((item, index) => <div key={item.desktop.src} className="w-full shrink-0 snap-center px-1"><DeviceShowcase media={item} onOpen={() => onOpen(index)} /></div>)}</div><button type="button" onClick={() => goTo(active - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground" aria-label="Vista anterior"><ChevronLeft className="h-5 w-5" /></button><button type="button" onClick={() => goTo(active + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground" aria-label="Vista siguiente"><ChevronRight className="h-5 w-5" /></button><div className="mt-4 flex items-center justify-center gap-3"><span className="sr-only" aria-live="polite">{active + 1} de {media.length}</span>{media.map((item, index) => <button key={item.desktop.src} type="button" onClick={() => goTo(index)} className={`h-2.5 w-2.5 rounded-full ${index === active ? 'bg-accent' : 'bg-border-light'}`} aria-label={`Ir a vista ${index + 1}`} aria-current={index === active ? 'true' : undefined} />)}</div></div>
}
