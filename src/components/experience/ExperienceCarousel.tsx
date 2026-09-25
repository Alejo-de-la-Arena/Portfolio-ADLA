import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { LocalizedProjectMedia } from '@/data/experiences'
import { DeviceShowcase } from './DeviceShowcase'

type ExperienceCarouselProps = { media: LocalizedProjectMedia[]; onOpen: (index: number) => void; labels: CarouselLabels }
export type CarouselLabels = { carousel: string; previous: string; next: string; goTo: (index: number) => string; counter: (index: number, total: number) => string; openImage: string }

export function ExperienceCarousel({ media, onOpen, labels }: ExperienceCarouselProps) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const lastIndex = media.length - 1
  const mobileAspectRatio = Math.min(...media.map(item => (item.mobile ?? item.desktop).width / (item.mobile ?? item.desktop).height))
  const goTo = (index: number) => setActive(Math.min(Math.max(index, 0), lastIndex))

  return (
    <div className="relative lg:min-h-[23rem]" role="region" aria-roledescription="carousel" aria-label={labels.carousel} tabIndex={0} onKeyDown={(event) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(active - 1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); goTo(active + 1) }
    }}>
      <div className="relative overflow-hidden rounded-[1.35rem] border-4 border-background-tertiary lg:rounded-2xl lg:border lg:border-border">
        <div className={`flex ${reduceMotion ? '' : 'motion-slider'}`} style={{ transform: `translateX(-${active * 100}%)` }}>
          {media.map((item, index) => <div key={item.desktop.src} className="w-full shrink-0" aria-hidden={index !== active} inert={index !== active ? '' : undefined}>
            <DeviceShowcase media={item} mobileAspectRatio={mobileAspectRatio} onOpen={() => onOpen(index)} openLabel={labels.openImage} className="max-w-none rounded-none border-0 bg-background-tertiary shadow-none lg:rounded-none lg:border-0 lg:shadow-none" />
          </div>)}
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm" aria-live="polite">{labels.counter(active + 1, media.length)}</span>
        <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground shadow-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-40" aria-label={labels.previous}><ChevronLeft className="h-5 w-5" /></button>
        <button type="button" onClick={() => goTo(active + 1)} disabled={active === lastIndex} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground shadow-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-40" aria-label={labels.next}><ChevronRight className="h-5 w-5" /></button>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">{media.map((item, index) => <button key={item.desktop.src} type="button" onClick={() => goTo(index)} className={`h-2.5 w-2.5 rounded-full transition-none ${index === active ? 'bg-accent' : 'bg-border-light'}`} aria-label={labels.goTo(index + 1)} aria-current={index === active ? 'true' : undefined} />)}</div>
    </div>
  )
}
