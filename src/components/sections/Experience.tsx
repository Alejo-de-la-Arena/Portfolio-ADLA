import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Briefcase, Calendar, ChevronRight, ExternalLink, Laptop, MapPin, X } from 'lucide-react'
import { experience } from '@/data/content'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import type { Experience as ExperienceItem } from '@/types'

type ExperienceFilter = 'all' | 'employment' | 'freelance'

const filters: Array<{ id: ExperienceFilter; label: string }> = [
  { id: 'all', label: 'Todo' },
  { id: 'employment', label: 'Empresa' },
  { id: 'freelance', label: 'Freelance' },
]

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduceMotion = Boolean(useReducedMotion())
  const { isRecruiterMode } = usePortfolioMode()
  const [activeFilter, setActiveFilter] = useState<ExperienceFilter>('all')
  const [activeExperience, setActiveExperience] = useState<ExperienceItem | null>(null)

  const filteredExperience = useMemo(
    () =>
      activeFilter === 'all'
        ? experience
        : experience.filter((item) => item.type === activeFilter),
    [activeFilter]
  )

  const closeDetail = () => setActiveExperience(null)

  return (
    <section id="experience" className="section-space border-y border-border/60 bg-background-secondary/35">
      <div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="editorial-grid mb-10">
            <div className="space-y-4">
              <p className="eyebrow">Experiencia</p>
              <h2 className="text-3xl font-display font-bold sm:text-4xl">
                Experiencia <span className="text-accent">profesional</span>
              </h2>
            </div>
            <p className="max-w-2xl text-foreground-secondary">
              {isRecruiterMode
                ? 'Roles y proyectos clave, resumidos para leer rápido.'
                : 'Más contexto por rol: qué construí, decisiones técnicas y links al trabajo publicado.'}
            </p>
          </div>

          <LayoutGroup>
            <div className="mb-10 flex flex-wrap items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    activeFilter === filter.id
                      ? 'text-foreground'
                      : 'text-foreground-secondary hover:text-foreground'
                  }`}
                  aria-pressed={activeFilter === filter.id}
                >
                  {activeFilter === filter.id && (
                    <motion.span
                      layoutId="experience-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-accent/15"
                      transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                    />
                  )}
                  {filter.label}
                </button>
              ))}
            </div>

            <motion.div layout className="space-y-5">
              <AnimatePresence mode="popLayout">
                {filteredExperience.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, delay: idx * 0.03 }}
                  className={getCardClassName(exp)}
                  style={getCardStyle(exp)}
                >
                  <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-foreground-tertiary">
                        <span className="inline-flex items-center gap-2">
                          {exp.type === 'employment' ? (
                            <Briefcase className="h-3.5 w-3.5 text-accent" style={getAccentStyle(exp)} aria-hidden="true" />
                          ) : (
                            <Laptop className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" style={getAccentStyle(exp)} aria-hidden="true" />
                          )}
                          {exp.type === 'employment' ? 'Empresa' : 'Freelance'}
                        </span>
                        <span>•</span>
                        <span>{exp.year}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold sm:text-2xl">{exp.role}</h3>
                        <p className={exp.type === 'employment' ? 'text-accent' : 'text-sky-600 dark:text-sky-400'} style={getAccentStyle(exp)}>
                          {exp.company}
                        </p>
                      </div>
                      <p className="text-sm text-foreground-secondary sm:text-base">{exp.summary}</p>

                      <ul className="space-y-2">
                        {exp.achievements.slice(0, isRecruiterMode ? 2 : 4).map((achievement) => (
                          <li key={achievement} className="flex items-start gap-3 text-sm text-foreground-secondary">
                            <span
                              className={`mt-1.5 h-1.5 w-1.5 rounded-full ${exp.type === 'employment' ? 'bg-accent' : 'bg-sky-500'}`}
                              style={getAccentDotStyle(exp)}
                            />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-background/40 p-4">
                      <div className="space-y-2 text-sm text-foreground-secondary">
                        <p className="flex items-center gap-2">
                          <Calendar className={`h-4 w-4 ${exp.type === 'employment' ? 'text-accent' : 'text-sky-600 dark:text-sky-400'}`} />
                          {exp.period}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className={`h-4 w-4 ${exp.type === 'employment' ? 'text-accent' : 'text-sky-600 dark:text-sky-400'}`} />
                          {exp.location}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.slice(0, isRecruiterMode ? 3 : 6).map((tech) => (
                          <span key={tech} className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground-secondary">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveExperience(exp)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-accent"
                      >
                        Ver detalle
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeExperience && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar panel de experiencia"
              onClick={closeDetail}
              className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-[60] h-full w-full max-w-xl overflow-y-auto border-l border-border bg-background-secondary p-6 sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-label={`Detalles de ${activeExperience.role} en ${activeExperience.company}`}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow mb-2">{activeExperience.period}</p>
                  <h3 className="text-2xl font-display font-semibold">{activeExperience.role}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <p className={activeExperience.type === 'employment' ? 'text-accent' : 'text-sky-600 dark:text-sky-400'}>
                      {activeExperience.company}
                    </p>
                    {activeExperience.websiteUrl && (
                      <a
                        href={activeExperience.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background/30 px-3 py-1 text-xs text-foreground-secondary transition-colors hover:text-foreground"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Ver sitio
                      </a>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeDetail}
                  className="rounded-full border border-border p-2 text-foreground-secondary transition-colors hover:text-foreground"
                  aria-label="Cerrar detalles"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6">
                {!!activeExperience.images?.length && (
                  <ExperienceGallery
                    title={`${activeExperience.role} · ${activeExperience.company}`}
                    images={activeExperience.images}
                    accent={activeExperience.type === 'employment' ? 'employment' : 'freelance'}
                    reduceMotion={reduceMotion}
                  />
                )}
                {!!activeExperience.subProjects?.length && (
                  <SubProjectsBlock
                    subProjects={activeExperience.subProjects}
                    accent={activeExperience.type === 'employment' ? 'employment' : 'freelance'}
                    reduceMotion={reduceMotion}
                  />
                )}
                <DetailBlock title="Qué construí" items={activeExperience.details.built} />
                <DetailBlock title="Qué optimicé" items={activeExperience.details.optimized} />
                <DetailBlock title="Decisiones técnicas" items={activeExperience.details.decisions} />
                <DetailBlock title="Resultados" items={activeExperience.details.results} />
                {!!activeExperience.details.links?.length && (
                  <div>
                    <h4 className="mb-2 text-sm uppercase tracking-[0.16em] text-foreground-tertiary">Enlaces</h4>
                    <div className="flex flex-wrap gap-3">
                      {activeExperience.details.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-accent underline-offset-4 hover:underline"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

function getCardClassName(exp: ExperienceItem) {
  const base = 'group rounded-3xl border bg-background-secondary/70 p-5 sm:p-7'
  if (exp.type === 'employment') {
    return `${base} border-border border-l-2 border-l-accent/60`
  }
  return `${base} border-border border-l-2 border-l-sky-500/50`
}

function getCardStyle(exp: ExperienceItem): React.CSSProperties | undefined {
  if (!exp.accentColor) return undefined
  return { borderLeftColor: exp.accentColor }
}

function getAccentStyle(exp: ExperienceItem): React.CSSProperties | undefined {
  if (!exp.accentColor) return undefined
  return { color: exp.accentColor }
}

function getAccentDotStyle(exp: ExperienceItem): React.CSSProperties | undefined {
  if (!exp.accentColor) return undefined
  return { backgroundColor: exp.accentColor }
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm uppercase tracking-[0.16em] text-foreground-tertiary">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-foreground-secondary">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SubProjectsBlock({
  subProjects,
  accent,
  reduceMotion,
}: {
  subProjects: NonNullable<ExperienceItem['subProjects']>
  accent: 'employment' | 'freelance'
  reduceMotion: boolean
}) {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const headingColor = accent === 'employment' ? 'text-accent' : 'text-sky-600 dark:text-sky-400'

  return (
    <div>
      <h4 className={`mb-3 text-sm uppercase tracking-[0.16em] ${headingColor}`}>
        Proyectos realizados ({subProjects.length})
      </h4>
      <div className="space-y-3">
        {subProjects.map((project, index) => {
          const isOpen = openIndex === index
          return (
            <div key={`${project.title}-${index}`} className="rounded-xl border border-border bg-background/30">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                aria-expanded={isOpen}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{project.title}</p>
                  <p className="text-xs text-foreground-secondary">{project.role}</p>
                </div>
                <ChevronRight className={`h-4 w-4 text-foreground-secondary transition-transform ${isOpen ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    className="overflow-hidden px-4 pb-4"
                  >
                    {project.context && <p className="mb-2 text-sm text-foreground-secondary">{project.context}</p>}
                    <p className="text-sm text-foreground-secondary">
                      <span className="text-foreground">Contribución:</span> {project.contribution}
                    </p>
                    {project.impact && (
                      <p className="mt-2 text-sm text-foreground-secondary">
                        <span className="text-foreground">Impacto:</span> {project.impact}
                      </p>
                    )}
                    {!!project.stack?.length && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span key={item} className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground-secondary">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-3 flex flex-wrap gap-3">
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-accent underline-offset-4 hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Ver sitio
                      </a>
                      {project.relatedLinks?.map((link) => (
                        <a
                          key={link}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-foreground-secondary underline-offset-4 hover:text-foreground hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Link adicional
                        </a>
                      ))}
                    </div>
                    {!!project.images?.length && (
                      <div className="mt-4">
                        <ExperienceGallery
                          title={project.title}
                          images={project.images}
                          accent={accent}
                          reduceMotion={reduceMotion}
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ExperienceGallery({
  title,
  images,
  accent,
  reduceMotion,
}: {
  title: string
  images: string[]
  accent: 'employment' | 'freelance'
  reduceMotion: boolean
}) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const safeImages = useMemo(() => images.filter(Boolean), [images])
  const current = safeImages[index] ?? safeImages[0]

  const goTo = (next: number) => {
    const total = safeImages.length
    if (!total) return
    const wrapped = ((next % total) + total) % total
    setIndex(wrapped)
  }

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, safeImages.length])

  if (!safeImages.length || !current) return null

  const accentBorder = accent === 'employment' ? 'border-accent/25' : 'border-sky-500/25'
  const accentDot = accent === 'employment' ? 'bg-accent' : 'bg-sky-500'

  return (
    <div className={`rounded-2xl border ${accentBorder} bg-background/30 p-3`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-sm font-medium text-foreground">Galería</h4>
        <p className="text-xs text-foreground-tertiary">{index + 1}/{safeImages.length}</p>
      </div>

      <div
        className="relative overflow-hidden rounded-xl border border-border bg-background-secondary"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null
        }}
        onTouchEnd={(e) => {
          const start = touchStartX.current
          const end = e.changedTouches[0]?.clientX ?? null
          touchStartX.current = null
          if (start == null || end == null) return
          const delta = start - end
          if (Math.abs(delta) < 40) return
          if (delta > 0) next()
          else prev()
        }}
        aria-label={`Galería de imágenes de ${title}. Usá flechas izquierda/derecha para navegar.`}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={current}
            alt={`Visual de ${title}`}
            loading="lazy"
            decoding="async"
            className="h-56 w-full object-cover sm:h-64"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 18 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -18 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/60 p-2 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background/80"
          aria-label="Imagen anterior"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/60 p-2 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background/80"
          aria-label="Imagen siguiente"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {safeImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full border border-border transition-transform ${
              i === index ? `${accentDot} scale-110` : 'bg-background-tertiary'
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}
