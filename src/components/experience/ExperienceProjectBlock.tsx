import { useEntrance } from '@/hooks/useEntrance'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { LocalizedExperienceProject, LocalizedScreenshot } from '@/data/experiences'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Badge } from '@/components/ui/Badge'
import { DeviceShowcase } from './DeviceShowcase'
import { ExperienceCarousel } from './ExperienceCarousel'
import { ImageLightbox } from './ImageLightbox'

type ExperienceProjectLabels = { contribution: string; impact: string; viewSite: string; openImage: string; pendingCapture: (name: string) => string; lightboxClose: string; lightboxPrevious: string; lightboxNext: string; carousel: string; previousView: string; nextView: string; goToView: (index: number) => string; viewCounter: (index: number, total: number) => string }
type ExperienceProjectBlockProps = { project: LocalizedExperienceProject; index: number; labels: ExperienceProjectLabels }

export function ExperienceProjectBlock({ project, index, labels }: ExperienceProjectBlockProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const images = useMemo<LocalizedScreenshot[]>(() => project.media.map((item) => isDesktop || !item.mobile ? item.desktop : item.mobile), [isDesktop, project.media])
  const imageFirst = index % 2 === 0
  const motionProps = useEntrance('listItem', index)
  const visual = <div className="lg:col-span-6">{project.media.length === 1 ? <DeviceShowcase media={project.media[0]} onOpen={() => setActiveIndex(0)} openLabel={labels.openImage} /> : <ExperienceCarousel media={project.media} onOpen={setActiveIndex} labels={{ carousel: labels.carousel, previous: labels.previousView, next: labels.nextView, goTo: labels.goToView, counter: labels.viewCounter, openImage: labels.openImage }} />}</div>
  const copy = <div className={project.media.length ? "lg:col-span-6" : "lg:col-span-12"}>{project.period && <p className="mb-3 text-xs uppercase tracking-[0.15em] text-foreground-tertiary">{project.period}</p>}<p className="eyebrow">{project.subtitle}</p><h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{project.name}</h3><p className="mt-2 text-base font-medium text-foreground-secondary">{project.role}</p>{project.body ? <div className="mt-7 space-y-4 text-sm leading-relaxed text-foreground-secondary">{project.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div> : <dl className="mt-7 space-y-5 text-sm leading-relaxed"><div><dt className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground-tertiary">{labels.contribution}</dt><dd className="mt-2 text-foreground-secondary">{project.contribution}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground-tertiary">{labels.impact}</dt><dd className="mt-2 text-foreground-secondary">{project.impact}</dd></div></dl>}<div className="mt-6 flex flex-wrap gap-2">{project.stack.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}</div>{project.liveUrl && <a href={project.liveUrl} aria-label={`${labels.viewSite}: ${project.name}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover hover:underline underline-offset-4">{labels.viewSite} <ExternalLink className="h-4 w-4" /></a>}</div>
  return <><motion.article id={project.id} {...motionProps} className="scroll-mt-24 grid grid-cols-1 items-center gap-8 border-t border-border py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-12">{project.media.length === 0 ? copy : imageFirst ? <>{visual}{copy}</> : <>{copy}{visual}</>}</motion.article><ImageLightbox images={images} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} closeLabel={labels.lightboxClose} previousLabel={labels.lightboxPrevious} nextLabel={labels.lightboxNext} /></>
}
