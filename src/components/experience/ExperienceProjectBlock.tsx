import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ExperienceProject, Screenshot } from '@/data/experiences'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Badge } from '@/components/ui/Badge'
import { DeviceShowcase } from './DeviceShowcase'
import { ExperienceCarousel } from './ExperienceCarousel'
import { ExperiencePlaceholder } from './ExperienceImage'
import { ImageLightbox } from './ImageLightbox'

type ExperienceProjectBlockProps = { project: ExperienceProject; index: number }
export function ExperienceProjectBlock({ project, index }: ExperienceProjectBlockProps) {
  const reduceMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const images = useMemo<Screenshot[]>(() => project.media.map((item) => isDesktop || !item.mobile ? item.desktop : item.mobile), [isDesktop, project.media])
  const imageFirst = index % 2 === 0
  const motionProps = reduceMotion ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.5, ease: 'easeOut' as const } }
  const visual = <div className="lg:col-span-6">{project.media.length === 0 ? <ExperiencePlaceholder label={`Captura pendiente de ${project.name}`} /> : project.media.length === 1 ? <DeviceShowcase media={project.media[0]} onOpen={() => setActiveIndex(0)} /> : <ExperienceCarousel media={project.media} onOpen={setActiveIndex} />}</div>
  const copy = <div className="lg:col-span-6"><p className="eyebrow">{project.subtitle}</p><h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{project.name}</h3><p className="mt-2 text-base font-medium text-foreground-secondary">{project.role}</p><dl className="mt-7 space-y-5 text-sm leading-relaxed"><div><dt className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground-tertiary">Contribución</dt><dd className="mt-2 text-foreground-secondary">{project.contribution}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground-tertiary">Impacto</dt><dd className="mt-2 text-foreground-secondary">{project.impact}</dd></div></dl><div className="mt-6 flex flex-wrap gap-2">{project.stack.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}</div>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover hover:underline underline-offset-4">Ver sitio <ExternalLink className="h-4 w-4" /></a>}</div>
  return <><motion.article {...motionProps} className="grid grid-cols-1 items-center gap-8 border-t border-border py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-12">{imageFirst ? <>{visual}{copy}</> : <>{copy}{visual}</>}</motion.article><ImageLightbox images={images} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} /></>
}
