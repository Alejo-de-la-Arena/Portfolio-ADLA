import { useEntrance } from '@/hooks/useEntrance'
import { motionTokens, motionTransition } from '@/lib/motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownRight, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'
import { Modal } from '../ui/Modal'
import type { ProjectMedia } from '@/data/experiences'
import { ImageLightbox } from '../experience/ImageLightbox'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Project } from '@/types'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'


// ─── Preview image component ────────────────────────

interface PreviewImageProps {
  imageUrl?: string
  media?: ProjectMedia
  title: string
  className?: string
  objectPosition?: string
}

function ProjectPreviewImage({
  imageUrl,
  media,
  title,
  className = '',
  objectPosition = 'top',
}: PreviewImageProps) {
  const { isSpanish, locale } = useLocale()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (media && !error) {
    const desktop = { ...media.desktop, alt: media.desktop.alt[locale] }
    const mobile = media.mobile && { ...media.mobile, alt: media.mobile.alt[locale] }
    const displayed = isDesktop || !mobile ? desktop : mobile
    const images = mobile ? [desktop, mobile] : [desktop]
    return <>
      <button type="button" onClick={() => setActiveImage(isDesktop || !mobile ? 0 : 1)} aria-label={(isSpanish ? 'Ampliar captura: ' : 'Enlarge screenshot: ') + displayed.alt} className={className + ' block w-full overflow-hidden bg-background-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent'}>
        <picture>
          {mobile && <source media="(min-width: 1024px)" srcSet={desktop.src} width={desktop.width} height={desktop.height} />}
          <img src={mobile?.src ?? desktop.src} alt={displayed.alt} width={(mobile ?? desktop).width} height={(mobile ?? desktop).height} loading="lazy" decoding="async" onError={() => setError(true)} className="h-full w-full object-contain" />
        </picture>
      </button>
      <ImageLightbox images={images} activeIndex={activeImage} onClose={() => setActiveImage(null)} onNavigate={setActiveImage} closeLabel={isSpanish ? 'Cerrar imagen' : 'Close image'} previousLabel={isSpanish ? 'Imagen anterior' : 'Previous image'} nextLabel={isSpanish ? 'Imagen siguiente' : 'Next image'} />
    </>
  }

  if (!imageUrl || error) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-accent/25 via-background-secondary to-background-tertiary ${className}`}
      >
        <span className="select-none text-5xl font-display font-bold text-accent/30">
          {title.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {!loaded && <div className="absolute inset-0 skeleton-shimmer" />}
      <img
        src={imageUrl}
        alt={`${isSpanish ? 'Vista previa de' : 'Preview of'} ${title}`}
        loading="lazy"
        decoding="async"
        width={2530}
        height={1260}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`h-full w-full object-cover transition-opacity duration-[var(--motion-fast)] motion-reduce:transition-none ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectPosition }}
      />
    </div>
  )
}

// ─── Project Slider ───────────────────────────────────────────────────────────

interface SliderProps {
  projects: Project[]
  onProjectClick: (p: Project) => void
  reduceMotion: boolean
  ui: {
    projects: {
      viewDemo: string
    }
  }
}

function ProjectSlider({ projects, onProjectClick, reduceMotion, ui }: SliderProps) {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const { isSpanish } = useLocale()
  const total = projects.length

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total])

  useEffect(() => {
    if (hasFocus || isHovered || reduceMotion || total <= 1) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [hasFocus, isHovered, reduceMotion, total, next])

  const project = projects[current]
  if (!project) return null

  return (
    <div
      className="overflow-hidden rounded-3xl border border-border bg-background-secondary/60 shadow-lg shadow-black/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false) }}
    >
      <div className="grid md:grid-cols-[1.1fr_1fr]">
      {/* Responsive preview */}
      <div className="relative h-60 overflow-hidden bg-background sm:h-72 md:h-full md:min-h-[25rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            className="absolute inset-0"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: motionTokens.distance }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -motionTokens.distance }}
            transition={motionTransition(reduceMotion)}
          >
            <ProjectPreviewImage
              imageUrl={project.image}
              media={project.media}
              title={project.title}
              objectPosition="top"
              className="h-full w-full"
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={prev}
          aria-label={isSpanish ? 'Proyecto anterior' : 'Previous project'}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur-sm transition-none hover:bg-black/60"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label={isSpanish ? 'Proyecto siguiente' : 'Next project'}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur-sm transition-none hover:bg-black/60"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Info section — technologies + impact + buttons */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`info-${project.id}`}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: motionTokens.distance }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={motionTransition(reduceMotion)}
          className="min-w-0 border-t border-border bg-background-secondary/40 p-6 md:flex md:flex-col md:justify-center md:border-l md:border-t-0 lg:p-8"
        >
          <p className="mb-2 text-xs font-medium text-accent">{current + 1} / {total}</p>
          <h3 className="mb-3 font-display text-2xl font-semibold">{project.title}</h3>
          {/* Technologies */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map(tech => (
              <span
                key={tech}
                className="rounded-full border border-border/60 bg-background-secondary/40 px-2.5 py-0.5 text-xs text-foreground-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Impact / brief description */}
          <p className="mb-4 text-sm leading-relaxed text-foreground-secondary">
            {project.impact}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onProjectClick(project)}
              aria-haspopup="dialog"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground-secondary transition-none hover:border-accent/40 hover:text-foreground"
            >
              {isSpanish ? 'Ver detalle' : 'View details'}
              <ArrowDownRight className="h-3.5 w-3.5" />
            </button>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-demo-link inline-flex items-center justify-center gap-2 rounded-full bg-accent-solid px-3 py-1.5 text-xs font-medium text-white transition-none hover:bg-accent-solid-hover sm:text-sm">
                {ui.projects.viewDemo}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 border-t border-border px-4 py-2">
      {/* Dot indicators */}
      <div className="flex items-center gap-1">
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={(isSpanish ? 'Ir al proyecto ' : 'Go to project ') + (i + 1)}
            aria-current={i === current ? 'true' : undefined}
            className="flex h-11 w-11 items-center justify-center rounded-full"
          >
            <span className={i === current ? 'h-2 w-6 rounded-full bg-accent' : 'h-2 w-2 rounded-full bg-border-light'} />
          </button>
        ))}
      </div>
      </div>
    </div>
  )
}

export function Projects() {
  const heading = useEntrance()
  const reduceMotion = useReducedMotionPreference()
  const { projects, ui } = useLocalizedContent()
  const { isSpanish } = useLocale()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const selectedProject = projects.find(project => project.id === selectedProjectId)
  return (
    <section id="projects" className="section-space">
      <div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
        <div>
          <motion.div {...heading} className="editorial-grid mb-8">
            <div className="space-y-4">
              <p className="eyebrow">{ui.projects.eyebrow}</p>
              <h2 className="text-3xl font-display font-bold sm:text-4xl">
                {ui.projects.titleStart}{' '}
                <span className="text-accent">{ui.projects.titleAccent}</span>
              </h2>
            </div>
            <p className="max-w-2xl text-foreground-secondary">
              {ui.projects.intro}
            </p>
          </motion.div>

          {/* Slider */}
          <ProjectSlider
            projects={projects}
            onProjectClick={project => setSelectedProjectId(project.id)}
            reduceMotion={Boolean(reduceMotion)}
            ui={ui}
          />

        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProjectId(null)}
          title={selectedProject.title}
        >
          <div className="space-y-6">
            {selectedProject.media && <ProjectPreviewImage media={selectedProject.media} title={selectedProject.title} className="h-72 rounded-xl sm:h-96" />}
            <p className="text-sm leading-relaxed text-foreground-secondary">{selectedProject.description}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <CaseChip label={ui.projects.role} value={selectedProject.role} />
              <CaseChip label={ui.projects.scope} value={selectedProject.scope} />
              <CaseChip label={ui.projects.duration} value={selectedProject.timeline} />
              <CaseChip label={ui.projects.impact} value={selectedProject.impact} />
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-sm text-foreground-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <h3 className="mb-2 font-semibold">{ui.projects.problem}</h3>
              <p className="text-sm text-foreground-secondary">{selectedProject.problem}</p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">{ui.projects.solution}</h3>
              <p className="text-sm text-foreground-secondary">{selectedProject.solution}</p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">{ui.projects.highlights}</h3>
              <ul className="space-y-2">
                {selectedProject.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground-secondary">
                    <span className="mt-1 text-accent">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">{ui.projects.stack}</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map(tech => (
                  <span
                    key={tech}
                    className="rounded-lg bg-background-tertiary px-3 py-1.5 text-sm text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <ProjectCopyList title={isSpanish ? 'Decisiones técnicas' : 'Technical decisions'} items={selectedProject.decisions} />
            <ProjectCopyList title={isSpanish ? 'Estado actual' : 'Current status'} items={selectedProject.results} />
            <ProjectCopyList title="Roadmap" items={selectedProject.roadmap} />
            {selectedProject.demos && <div className="space-y-6">
              <h3 className="font-semibold">{isSpanish ? 'Implementaciones dentro de VYZON' : 'Implementations within VYZON'}</h3>
              <p className="text-sm text-foreground-secondary">{isSpanish ? 'Demos con briefs ficticios. El contenido comercial de sus interfaces es parte del ejercicio, no evidencia de clientes ni de resultados.' : 'Demos based on fictional briefs. Marketing content in their interfaces is part of the exercise, not evidence of clients or results.'}</p>
              {selectedProject.demos.map(demo => <article key={demo.id} className="space-y-3 border-t border-border pt-5">
                <p className="eyebrow">{demo.label}</p>
                <h4 className="font-display text-xl font-semibold">{demo.title}</h4>
                <p className="text-sm text-foreground-secondary">{demo.description}</p>
                <ProjectPreviewImage imageUrl={demo.image} title={demo.title + ' · ' + demo.label} className="aspect-video overflow-hidden rounded-xl" />
                <ul className="space-y-2 text-sm text-foreground-secondary">{demo.decisions.map(decision => <li key={decision}>{decision}</li>)}</ul>
                <p className="text-sm text-foreground-secondary">{demo.status}</p>
                {demo.liveUrl && <a href={demo.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex text-sm text-accent">{isSpanish ? 'Abrir demo ficticia' : 'Open fictional demo'}: {demo.title}</a>}
              </article>)}
            </div>}
            {!!selectedProject.metrics?.length && (
              <div>
                <h3 className="mb-2 font-semibold">{ui.projects.metrics}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.metrics.map(metric => (
                    <span
                      key={metric}
                      className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.caseStudy && (
              <div>
                <h3 className="mb-2 font-semibold">{ui.projects.caseStudy}</h3>
                <p className="text-sm text-foreground-secondary">{selectedProject.caseStudy}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="project-demo-link inline-flex items-center justify-center gap-2 rounded-full bg-accent-solid px-4 py-2 text-sm font-medium text-white hover:bg-accent-solid-hover sm:text-base">
                  <ExternalLink className="h-4 w-4" />
                  {ui.projects.viewDemo}
                </a>
              )}
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-border-light sm:text-base">
                  <Github className="h-4 w-4" />
                  {ui.projects.viewCode}
                </a>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
  )
}

function CaseChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background-tertiary/50 px-3 py-2">
      <p className="text-xs uppercase tracking-[0.16em] text-foreground-tertiary">{label}</p>
      <p className="mt-1 text-xs text-foreground-secondary">{value}</p>
    </div>
  )
}

function ProjectCopyList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return <div><h3 className="mb-2 font-semibold">{title}</h3><ul className="space-y-2 text-sm text-foreground-secondary">{items.map(item => <li key={item}>{item}</li>)}</ul></div>
}
