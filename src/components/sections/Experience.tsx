import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { Calendar, ChevronRight, MapPin, X } from 'lucide-react'
import { experience } from '@/data/content'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import type { Experience as ExperienceItem } from '@/types'

type ExperienceFilter = 'all' | 'employment' | 'freelance'

const filters: Array<{ id: ExperienceFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'employment', label: 'Employment' },
  { id: 'freelance', label: 'Freelance' },
]

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduceMotion = useReducedMotion()
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
              <p className="eyebrow">Experience</p>
              <h2 className="text-3xl font-display font-bold sm:text-4xl">
                Ejecución con foco en <span className="text-accent">impacto real</span>
              </h2>
            </div>
            <p className="max-w-2xl text-foreground-secondary">
              {isRecruiterMode
                ? 'Resumen rápido de resultados clave, listo para revisar en menos de 90 segundos.'
                : 'Modo detalle: decisiones técnicas, optimizaciones y resultados por contexto de producto.'}
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
                  className="group rounded-3xl border border-border bg-background-secondary/70 p-5 sm:p-7"
                >
                  <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-foreground-tertiary">
                        <span>{exp.type === 'employment' ? 'Employment' : 'Freelance'}</span>
                        <span>•</span>
                        <span>{exp.year}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold sm:text-2xl">{exp.role}</h3>
                        <p className="text-accent">{exp.company}</p>
                      </div>
                      <p className="text-sm text-foreground-secondary sm:text-base">{exp.summary}</p>

                      <ul className="space-y-2">
                        {exp.achievements.slice(0, isRecruiterMode ? 2 : 4).map((achievement) => (
                          <li key={achievement} className="flex items-start gap-3 text-sm text-foreground-secondary">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-background/40 p-4">
                      <div className="space-y-2 text-sm text-foreground-secondary">
                        <p className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-accent" />
                          {exp.period}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
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
                        Expand
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
              onClick={() => setActiveExperience(null)}
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
                  <p className="text-accent">{activeExperience.company}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveExperience(null)}
                  className="rounded-full border border-border p-2 text-foreground-secondary transition-colors hover:text-foreground"
                  aria-label="Cerrar detalles"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6">
                <DetailBlock title="Qué construí" items={activeExperience.details.built} />
                <DetailBlock title="Qué optimicé" items={activeExperience.details.optimized} />
                <DetailBlock title="Decisiones técnicas" items={activeExperience.details.decisions} />
                <DetailBlock title="Resultados" items={activeExperience.details.results} />
                {!!activeExperience.details.links?.length && (
                  <div>
                    <h4 className="mb-2 text-sm uppercase tracking-[0.16em] text-foreground-tertiary">Links</h4>
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
