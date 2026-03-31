import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github, Search } from 'lucide-react'
import { projectSortLabels, projects } from '@/data/content'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import type { Project } from '@/types'

type SortMode = 'featured' | 'latest' | 'impact'

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduceMotion = useReducedMotion()
  const { isRecruiterMode } = usePortfolioMode()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortMode>('featured')
  const [filter, setFilter] = useState<string>('Todos')

  const allTags = ['Todos', ...Array.from(new Set(projects.flatMap(p => p.tags)))]
  const filteredProjects = useMemo(() => {
    const byTag = filter === 'Todos' ? projects : projects.filter((project) => project.tags.includes(filter))

    const query = search.trim().toLowerCase()
    const byQuery = !query
      ? byTag
      : byTag.filter((project) => {
          const haystack = [
            project.title,
            project.description,
            project.role,
            project.scope,
            project.timeline,
            String(project.year),
            project.tags.join(' '),
          ]
            .join(' ')
            .toLowerCase()

          return haystack.includes(query)
        })

    const sorted = [...byQuery].sort((a, b) => {
      if (sort === 'latest') return b.year - a.year
      if (sort === 'impact') return b.impact.localeCompare(a.impact)
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    })

    return sorted
  }, [filter, search, sort])

  const spotlightProject = useMemo(() => {
    if (hoveredProjectId) {
      return filteredProjects.find((project) => project.id === hoveredProjectId) ?? filteredProjects[0]
    }

    return filteredProjects[0]
  }, [filteredProjects, hoveredProjectId])

  return (
    <section id="projects" className="section-space">
      <div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="editorial-grid mb-8">
            <div className="space-y-4">
              <p className="eyebrow">Proyectos</p>
              <h2 className="text-3xl font-display font-bold sm:text-4xl">
                Proyectos con <span className="text-accent">impacto medible</span>
              </h2>
            </div>
            <p className="max-w-2xl text-foreground-secondary">
              {isRecruiterMode
                ? 'Vista compacta para validar impacto, rol y stack en segundos.'
                : 'Vista de análisis: problema, solución, decisiones de arquitectura y resultados por proyecto.'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {spotlightProject && (
              <motion.button
                key={spotlightProject.id}
                type="button"
                onClick={() => setSelectedProject(spotlightProject)}
                className="mb-8 w-full rounded-3xl border border-border bg-gradient-to-br from-background-secondary to-background p-6 text-left transition-colors hover:border-border-light"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.16em] text-foreground-tertiary">Proyecto destacado</p>
                    <h3 className="text-2xl font-display font-semibold">{spotlightProject.title}</h3>
                    <p className="max-w-2xl text-sm text-foreground-secondary">{spotlightProject.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1 text-xs text-foreground">
                    {spotlightProject.impact}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-tertiary" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por nombre, tag, año o rol..."
                className="w-full rounded-full border border-border bg-background-secondary py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
                aria-label="Buscar proyecto"
              />
            </div>
            <div className="flex items-center gap-2">
              {(['featured', 'latest', 'impact'] as SortMode[]).map((sortOption) => (
                <button
                  key={sortOption}
                  type="button"
                  onClick={() => setSort(sortOption)}
                  className={`rounded-full px-3 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                    sort === sortOption
                      ? 'bg-accent/20 text-foreground'
                      : 'text-foreground-secondary hover:text-foreground'
                  }`}
                >
                  {projectSortLabels[sortOption]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === tag
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'bg-background-secondary text-foreground-secondary hover:bg-border-light'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, delay: idx * 0.04 }}
                >
                  <Card
                    hover
                    className="group h-full cursor-pointer overflow-hidden"
                    onMouseEnter={() => setHoveredProjectId(project.id)}
                    onFocus={() => setHoveredProjectId(project.id)}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative mb-5 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/12 via-transparent to-background p-4">
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                      </div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-foreground-tertiary">{project.year}</p>
                      <h3 className="mt-2 text-xl font-semibold transition-colors group-hover:text-accent">{project.title}</h3>
                      <p className="mt-2 text-xs text-foreground-secondary">{project.role}</p>
                    </div>

                    <p className="mb-4 line-clamp-2 text-sm text-foreground-secondary">{project.description}</p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, isRecruiterMode ? 2 : 3).map((tag) => (
                        <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <span className="text-xs text-accent">{project.impact}</span>
                      {project.liveUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                          }}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <CaseChip label="Rol" value={selectedProject.role} />
              <CaseChip label="Alcance" value={selectedProject.scope} />
              <CaseChip label="Duración" value={selectedProject.timeline} />
              <CaseChip label="Impacto" value={selectedProject.impact} />
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 text-sm text-foreground-secondary">
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-2">Problema</h4>
              <p className="text-foreground-secondary text-sm">{selectedProject.problem}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Solución</h4>
              <p className="text-foreground-secondary text-sm">{selectedProject.solution}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Puntos clave</h4>
              <ul className="space-y-2">
                {selectedProject.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-foreground-secondary text-sm">
                    <span className="text-accent mt-1">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 text-sm rounded-lg bg-background-tertiary text-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {!!selectedProject.metrics?.length && (
              <div>
                <h4 className="font-semibold mb-2">Métricas</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.metrics.map((metric) => (
                    <span key={metric} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.caseStudy && (
              <div>
                <h4 className="font-semibold mb-2">Caso</h4>
                <p className="text-foreground-secondary text-sm">{selectedProject.caseStudy}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {selectedProject.liveUrl && (
                <Button onClick={() => window.open(selectedProject.liveUrl, '_blank')}>
                  <ExternalLink className="w-4 h-4" />
                  Ver demo
                </Button>
              )}
              {selectedProject.githubUrl && (
                <Button variant="outline" onClick={() => window.open(selectedProject.githubUrl, '_blank', 'noopener,noreferrer')}>
                  <Github className="w-4 h-4" />
                  Ver código
                </Button>
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
      <p className="text-[10px] uppercase tracking-[0.16em] text-foreground-tertiary">{label}</p>
      <p className="mt-1 text-xs text-foreground-secondary">{value}</p>
    </div>
  )
}
