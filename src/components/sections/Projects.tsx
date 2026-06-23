import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import type { Project } from '@/types'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

type SortMode = 'featured' | 'latest' | 'impact'

const PINNED_ID = 0

// ─── Preview image component (used in slider + cards) ────────────────────────

interface PreviewImageProps {
  imageUrl?: string
  title: string
  className?: string
  objectPosition?: string
}

function ProjectPreviewImage({
  imageUrl,
  title,
  className = '',
  objectPosition = 'top',
}: PreviewImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

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
        alt={`Preview de ${title}`}
        loading="lazy"
        decoding="async"
        width={2530}
        height={1260}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
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
  const total = projects.length

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total])

  useEffect(() => {
    if (isHovered || reduceMotion || total <= 1) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [isHovered, reduceMotion, total, next])

  const project = projects[current]
  if (!project) return null

  return (
    <div
      className="mb-8 overflow-hidden rounded-3xl border border-border bg-background-secondary/60 shadow-lg shadow-black/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-background-tertiary/80 px-4 py-2.5">
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
          <div className="h-3 w-3 rounded-full bg-green-400/60" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-xs flex-1 items-center gap-1.5 rounded-full bg-background-secondary px-3 py-1">
          <div className="h-2 w-2 shrink-0 rounded-full border border-border-light" />
          <span className="truncate text-[11px] text-foreground-tertiary">
            {project.liveUrl ?? 'preview'}
          </span>
        </div>
        <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] text-foreground-tertiary">
          {current + 1}/{total}
        </span>
      </div>

      {/* Image area — aspect-video on mobile, aspect-[2/1] on sm+ */}
      <div className="relative aspect-video overflow-hidden bg-background sm:aspect-[2/1]">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            className="absolute inset-0"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectPreviewImage
              imageUrl={project.image}
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
          aria-label="Proyecto anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Proyecto siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Info section — technologies + impact + buttons */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`info-${project.id}`}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="border-t border-border bg-background-secondary/40 px-5 py-4 sm:px-6"
        >
          {/* Technologies */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="rounded-full border border-border/60 bg-background-secondary/40 px-2.5 py-0.5 text-[11px] text-foreground-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Impact / brief description */}
          <p className="mb-4 line-clamp-2 text-sm text-foreground-secondary">
            {project.impact}
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onProjectClick(project)}
              className="inline-flex min-w-[130px] items-center justify-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground-secondary transition-colors hover:border-accent/40 hover:text-foreground"
            >
              Ver detalle
              <ArrowDownRight className="h-3.5 w-3.5" />
            </button>
            {project.liveUrl && (
              <Button
                size="sm"
                className="min-w-[130px] justify-center"
                onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
              >
                {ui.projects.viewDemo}
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 bg-background-secondary/20 py-3">
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Ir al proyecto ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'h-2 w-6 bg-accent'
                : 'h-2 w-2 bg-border-light hover:bg-foreground-tertiary'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Card image thumbnail ─────────────────────────────────────────────────────

function ProjectCardImage({ project }: { project: Project }) {
  return (
    <div className="mb-5 -mx-6 -mt-6 overflow-hidden rounded-t-2xl">
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <ProjectPreviewImage
          imageUrl={project.image}
          title={project.title}
          objectPosition="top"
          className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background-secondary/50 to-transparent" />
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduceMotion = useReducedMotion()
  const { isRecruiterMode } = usePortfolioMode()
  const { projects, projectSortLabels, ui } = useLocalizedContent()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [sort, setSort] = useState<SortMode>('featured')
  const [filter, setFilter] = useState<string>(ui.projects.allTags)

  useEffect(() => {
    setFilter(ui.projects.allTags)
  }, [ui.projects.allTags])

  const sliderProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (a.id === PINNED_ID) return -1
      if (b.id === PINNED_ID) return 1
      return Number(b.featured ?? false) - Number(a.featured ?? false)
    })
  }, [projects])

  const allTags = [ui.projects.allTags, ...Array.from(new Set(projects.flatMap(p => p.tags)))]

  const filteredProjects = useMemo(() => {
    const pinned = projects.find(p => p.id === PINNED_ID)
    const rest = projects.filter(p => p.id !== PINNED_ID)
    const byTag =
      filter === ui.projects.allTags
        ? rest
        : rest.filter(p => p.tags.includes(filter))

    const sorted = [...byTag].sort((a, b) => {
      if (sort === 'latest') return b.year - a.year
      if (sort === 'impact') return b.impact.localeCompare(a.impact)
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    })

    return pinned ? [pinned, ...sorted] : sorted
  }, [filter, projects, sort, ui.projects.allTags])

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
              <p className="eyebrow">{ui.projects.eyebrow}</p>
              <h2 className="text-3xl font-display font-bold sm:text-4xl">
                {ui.projects.titleStart}{' '}
                <span className="text-accent">{ui.projects.titleAccent}</span>
              </h2>
            </div>
            <p className="max-w-2xl text-foreground-secondary">
              {isRecruiterMode ? ui.projects.recruiterIntro : ui.projects.deepIntro}
            </p>
          </div>

          {/* Slider */}
          <ProjectSlider
            projects={sliderProjects}
            onProjectClick={setSelectedProject}
            reduceMotion={Boolean(reduceMotion)}
            ui={ui}
          />

          {/* Filters */}
          <div className="mb-8">
            <p className="eyebrow mb-4">{ui.projects.filterTitle}</p>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {(['featured', 'latest', 'impact'] as SortMode[]).map(sortOption => (
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
            <div className="relative w-full sm:w-auto sm:min-w-[200px]">
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="w-full appearance-none rounded-full border border-border bg-background-tertiary py-2 pl-4 pr-10 text-sm text-foreground outline-none transition-colors focus:border-accent sm:w-auto"
                aria-label={ui.projects.allTags}
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-tertiary"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Cards grid */}
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
                    onClick={() => setSelectedProject(project)}
                  >
                    <ProjectCardImage project={project} />

                    <div className="mb-4 space-y-1">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-foreground-tertiary">
                        {project.year}
                      </p>
                      <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
                        {project.title}
                      </h3>
                      <p className="text-xs text-foreground-secondary">{project.role}</p>
                    </div>

                    <p className="mb-4 line-clamp-2 text-sm text-foreground-secondary">
                      {project.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, isRecruiterMode ? 2 : 3).map(tag => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <span className="text-xs text-accent">{project.impact}</span>
                      <div className="flex items-center gap-1">
                        {project.liveUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={e => {
                              e.stopPropagation()
                              window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={e => {
                              e.stopPropagation()
                              window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                            }}
                          >
                            <Github className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
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
              <h4 className="mb-2 font-semibold">{ui.projects.problem}</h4>
              <p className="text-sm text-foreground-secondary">{selectedProject.problem}</p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">{ui.projects.solution}</h4>
              <p className="text-sm text-foreground-secondary">{selectedProject.solution}</p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">{ui.projects.highlights}</h4>
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
              <h4 className="mb-3 font-semibold">{ui.projects.stack}</h4>
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

            {!!selectedProject.metrics?.length && (
              <div>
                <h4 className="mb-2 font-semibold">{ui.projects.metrics}</h4>
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
                <h4 className="mb-2 font-semibold">{ui.projects.caseStudy}</h4>
                <p className="text-sm text-foreground-secondary">{selectedProject.caseStudy}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {selectedProject.liveUrl && (
                <Button onClick={() => window.open(selectedProject.liveUrl, '_blank')}>
                  <ExternalLink className="h-4 w-4" />
                  {ui.projects.viewDemo}
                </Button>
              )}
              {selectedProject.githubUrl && (
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(selectedProject.githubUrl, '_blank', 'noopener,noreferrer')
                  }
                >
                  <Github className="h-4 w-4" />
                  {ui.projects.viewCode}
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
