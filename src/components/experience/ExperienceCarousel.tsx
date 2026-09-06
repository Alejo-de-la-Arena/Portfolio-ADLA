import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { ProjectMedia } from '@/data/experiences'
import { DeviceShowcase } from './DeviceShowcase'

type ExperienceCarouselProps = { media: ProjectMedia[]; onOpen: (index: number) => void }

export function ExperienceCarousel({ media, onOpen }: ExperienceCarouselProps) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const lastIndex = media.length - 1
  const goTo = (index: number) => setActive(Math.min(Math.max(index, 0), lastIndex))

  return (
    <div className="relative min-h-[28rem] lg:min-h-[23rem]" role="region" aria-roledescription="carousel" aria-label="Capturas del proyecto" tabIndex={0} onKeyDown={(event) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(active - 1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); goTo(active + 1) }
    }}>
      <div className="relative overflow-hidden rounded-[1.35rem] border-4 border-background-tertiary lg:rounded-2xl lg:border lg:border-border">
        <div className={`flex ${reduceMotion ? '' : 'transition-transform duration-500 ease-out'}`} style={{ transform: `translateX(-${active * 100}%)` }}>
          {media.map((item, index) => <div key={item.desktop.src} className="w-full shrink-0" aria-hidden={index !== active} inert={index !== active ? '' : undefined}>
            <DeviceShowcase media={item} onOpen={() => onOpen(index)} className="rounded-none border-0 shadow-none lg:rounded-none lg:border-0 lg:shadow-none" />
          </div>)}
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm" aria-live="polite">{active + 1} de {media.length}</span>
        <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground shadow-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-40" aria-label="Vista anterior"><ChevronLeft className="h-5 w-5" /></button>
        <button type="button" onClick={() => goTo(active + 1)} disabled={active === lastIndex} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground shadow-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-40" aria-label="Vista siguiente"><ChevronRight className="h-5 w-5" /></button>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">{media.map((item, index) => <button key={item.desktop.src} type="button" onClick={() => goTo(index)} className={`h-2.5 w-2.5 rounded-full transition-colors ${index === active ? 'bg-accent' : 'bg-border-light'}`} aria-label={`Ir a la vista ${index + 1}`} aria-current={index === active ? 'true' : undefined} />)}</div>
    </div>
  )
}
