import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Briefcase, Calendar, ChevronDown, ChevronRight, ExternalLink, Laptop, MapPin, X } from 'lucide-react'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import type { Experience as ExperienceItem } from '@/types'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'
import { useLocale } from '@/context/LocaleContext'

type ExperienceFilter = 'all' | 'employment' | 'freelance'

type SortMode = 'relevant' | 'recent' | 'oldest' | 'az'
type SortControlMode = SortMode | 'default'

const FREELANCE_ACCENT = 'rgb(192 132 252 / var(--tw-text-opacity, 1))'

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduceMotion = Boolean(useReducedMotion())
  const { isRecruiterMode } = usePortfolioMode()
  const { locale } = useLocale()
  const { experience, ui } = useLocalizedContent()
  const [activeFilter, setActiveFilter] = useState<ExperienceFilter>('all')
  const [activeExperience, setActiveExperience] = useState<ExperienceItem | null>(null)
  const [sortMode, setSortMode] = useState<SortMode>('relevant')
  const [sortControlMode, setSortControlMode] = useState<SortControlMode>('relevant')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const compactMode = isMobile ? true : isRecruiterMode
  const filters: Array<{ id: ExperienceFilter; label: string }> = [
    { id: 'all', label: ui.experience.filters.all },
    { id: 'employment', label: ui.experience.filters.employment },
    { id: 'freelance', label: ui.experience.filters.freelance },
  ]

  const filteredExperience = useMemo(
    () =>
      activeFilter === 'all'
        ? experience
        : experience.filter((item) => item.type === activeFilter),
    [activeFilter, experience]
  )

  const orderedExperience = useMemo(() => {
    const list = [...filteredExperience]

    if (sortMode === 'az') {
      return list.sort((a, b) => a.company.localeCompare(b.company, locale))
    }

    if (sortMode === 'relevant') return sortExperienceByRelevance(list)

    if (sortMode === 'oldest') {
      return list.sort((a, b) => getExperienceSortValue(a) - getExperienceSortValue(b))
    }

    // recent
    return list.sort((a, b) => getExperienceSortValue(b) - getExperienceSortValue(a))
  }, [filteredExperience, locale, sortMode])

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
              <p className="eyebrow">{ui.experience.eyebrow}</p>
              <h2 className="text-3xl font-display font-bold sm:text-4xl">
                {ui.experience.titleStart} <span className="text-accent">{ui.experience.titleAccent}</span>
              </h2>
            </div>
            <p className="max-w-2xl text-foreground-secondary">
              {isRecruiterMode
                ? ui.experience.recruiterIntro
                : ui.experience.deepIntro}
            </p>
          </div>

          <LayoutGroup>
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors ${activeFilter === filter.id
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

              <div className="flex items-center justify-between gap-3 md:justify-end">
                <label className="text-xs uppercase tracking-[0.16em] text-foreground-tertiary">
                  {ui.experience.sortBy}
                </label>
                <div className="relative">
                  <select
                    value={sortControlMode}
                    onChange={(e) => {
                      const next = e.target.value as SortControlMode
                      setSortControlMode(next)
                      setSortMode(next === 'default' ? 'relevant' : next)
                    }}
                    className="appearance-none rounded-full border border-border bg-background-secondary py-2 pl-4 pr-11 text-sm text-foreground outline-none transition-colors focus:border-accent"
                    aria-label={ui.experience.sortBy}
                  >
                    <option value="default">{ui.experience.sort.default}</option>
                    <option value="relevant">{ui.experience.sort.relevant}</option>
                    <option value="recent">{ui.experience.sort.recent}</option>
                    <option value="oldest">{ui.experience.sort.oldest}</option>
                    <option value="az">A–Z</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-tertiary" aria-hidden="true" />
                </div>
              </div>
            </div>

            <motion.div layout className="space-y-5">
              <AnimatePresence mode="popLayout">
                {orderedExperience.map((exp, idx) => (
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
                              <Laptop className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" style={getAccentStyle(exp)} aria-hidden="true" />
                            )}
                            {exp.type === 'employment' ? ui.experience.filters.employment : ui.experience.filters.freelance}
                          </span>
                          <span>•</span>
                          <span>{exp.year}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold sm:text-2xl">{exp.role}</h3>
                          <p className={exp.type === 'employment' ? 'text-accent' : 'text-violet-500 dark:text-violet-400'} style={getAccentStyle(exp)}>
                            {exp.company}
                          </p>
                        </div>
                        <p className="text-sm text-foreground-secondary sm:text-base">{exp.summary}</p>

                        <ul className="space-y-2">
                          {exp.achievements.slice(0, compactMode ? 2 : 4).map((achievement) => (
                            <li key={achievement} className="flex items-start gap-3 text-sm text-foreground-secondary">
                              <span
                                className={`mt-1.5 h-1.5 w-1.5 rounded-full ${exp.type === 'employment' ? 'bg-accent' : 'bg-violet-400'}`}
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
                            <Calendar className={`h-4 w-4 ${exp.type === 'employment' ? 'text-accent' : 'text-violet-500 dark:text-violet-400'}`} />
                            {exp.period}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className={`h-4 w-4 ${exp.type === 'employment' ? 'text-accent' : 'text-violet-500 dark:text-violet-400'}`} />
                            {exp.location}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.slice(0, compactMode ? 3 : 6).map((tech) => (
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
                          {ui.experience.detail}
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
              aria-label={ui.experience.closePanel}
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
              aria-label={`${ui.experience.detail}: ${activeExperience.role} @ ${activeExperience.company}`}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow mb-2">{activeExperience.period}</p>
                  <h3 className="text-2xl font-display font-semibold">{activeExperience.role}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <p className={activeExperience.type === 'employment' ? 'text-accent' : 'text-violet-500 dark:text-violet-400'}>
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
                        {ui.experience.viewSite}
                      </a>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeDetail}
                  className="rounded-full border border-border p-2 text-foreground-secondary transition-colors hover:text-foreground"
                  aria-label={ui.experience.closeDetails}
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
                    ui={ui.experience}
                  />
                )}
                {!!activeExperience.subProjects?.length && (
                  <SubProjectsBlock
                    subProjects={activeExperience.subProjects}
                    accent={activeExperience.type === 'employment' ? 'employment' : 'freelance'}
                    reduceMotion={reduceMotion}
                    ui={ui.experience}
                  />
                )}
                <DetailBlock title={ui.experience.built} items={activeExperience.details.built} />
                <DetailBlock title={ui.experience.optimized} items={activeExperience.details.optimized} />
                <DetailBlock title={ui.experience.decisions} items={activeExperience.details.decisions} />
                <DetailBlock title={ui.experience.results} items={activeExperience.details.results} />
                {!!activeExperience.details.links?.length && (
                  <div>
                    <h4 className="mb-2 text-sm uppercase tracking-[0.16em] text-foreground-tertiary">{ui.experience.links}</h4>
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
  return `${base} border-border border-l-2 border-l-violet-400/50`
}

function getCardStyle(exp: ExperienceItem): React.CSSProperties | undefined {
  if (exp.type === 'freelance') {
    return { borderLeftColor: FREELANCE_ACCENT }
  }
  if (!exp.accentColor) return undefined
  return { borderLeftColor: exp.accentColor }
}

function getAccentStyle(exp: ExperienceItem): React.CSSProperties | undefined {
  if (exp.type === 'freelance') return { color: FREELANCE_ACCENT }
  if (!exp.accentColor) return undefined
  return { color: exp.accentColor }
}

function getAccentDotStyle(exp: ExperienceItem): React.CSSProperties | undefined {
  if (exp.type === 'freelance') return { backgroundColor: FREELANCE_ACCENT }
  if (!exp.accentColor) return undefined
  return { backgroundColor: exp.accentColor }
}

function getExperienceSortValue(exp: ExperienceItem) {
  // Orden consistente: por fecha de fin si existe; "Present/Actualidad" => más reciente.
  const parsed = parsePeriod(exp.period)
  if (parsed?.end != null) return parsed.end
  if (parsed?.start != null) return parsed.start
  return exp.year * 100 + 1
}

function parsePeriod(period: string): { start?: number; end?: number } | null {
  const normalized = period
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  const hasPresent = /actualidad|presente|present|current/.test(normalized)

  // "sept. 2025 - nov. 2025" | "abr. 2025 - oct. 2025"
  const range = normalized.split('-').map(s => s.trim())
  const start = parseMonthYear(range[0] ?? '')
  const end = hasPresent ? 999912 : parseMonthYear(range[1] ?? '')

  if (start == null && end == null) return null
  return { start: start ?? undefined, end: end ?? undefined }
}

function parseMonthYear(part: string): number | null {
  const p = part
    .replace(/\./g, '')
    .replace(/de /g, '')
    .trim()

  const monthMap: Record<string, number> = {
    ene: 1,
    feb: 2,
    mar: 3,
    abr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    ago: 8,
    sep: 9,
    sept: 9,
    oct: 10,
    nov: 11,
    dic: 12,
    jan: 1,
    febr: 2,
    march: 3,
    apr: 4,
    june: 6,
    july: 7,
    aug: 8,
    septe: 9,
    octob: 10,
    novem: 11,
    decem: 12,
  }

  const match = p.match(/([a-zñ]+)?\s*(\d{4})/)
  if (!match) return null
  const monthRaw = (match[1] ?? '').slice(0, 5)
  const year = Number(match[2])
  const month = monthMap[monthRaw] ?? 12
  return year * 100 + month
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
  ui,
}: {
  subProjects: NonNullable<ExperienceItem['subProjects']>
  accent: 'employment' | 'freelance'
  reduceMotion: boolean
  ui: {
    deliveredProjects: string
    contribution: string
    impact: string
    viewSite: string
    extraLink: string
    gallery: string
    previousImage: string
    nextImage: string
    goToImage: string
  }
}) {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const headingColor = accent === 'employment' ? 'text-accent' : 'text-violet-500 dark:text-violet-400'

  return (
    <div>
      <h4 className={`mb-3 text-sm uppercase tracking-[0.16em] ${headingColor}`}>
        {ui.deliveredProjects} ({subProjects.length})
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
                      <span className="text-foreground">{ui.contribution}:</span> {project.contribution}
                    </p>
                    {project.impact && (
                      <p className="mt-2 text-sm text-foreground-secondary">
                        <span className="text-foreground">{ui.impact}:</span> {project.impact}
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
                        {ui.viewSite}
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
                          {ui.extraLink}
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
                          ui={ui}
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
  ui,
}: {
  title: string
  images: string[]
  accent: 'employment' | 'freelance'
  reduceMotion: boolean
  ui: {
    gallery: string
    previousImage: string
    nextImage: string
    goToImage: string
  }
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

  const accentBorder = accent === 'employment' ? 'border-accent/25' : 'border-violet-400/25'
  const accentDot = accent === 'employment' ? 'bg-accent' : 'bg-violet-400'

  return (
    <div className={`rounded-2xl border ${accentBorder} bg-background/30 p-3`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-sm font-medium text-foreground">{ui.gallery}</h4>
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
        aria-label={`${ui.gallery}: ${title}`}
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
          aria-label={ui.previousImage}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/60 p-2 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background/80"
          aria-label={ui.nextImage}
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
            className={`h-2.5 w-2.5 rounded-full border border-border transition-transform ${i === index ? `${accentDot} scale-110` : 'bg-background-tertiary'
              }`}
            aria-label={`${ui.goToImage} ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}

function sortExperienceByRelevance(list: ExperienceItem[]) {
  const rank = (exp: ExperienceItem) => {
    const company = exp.company.trim().toLowerCase()
    if (company === 'zetenta') return 0
    if (company === 'espacio boa') return 1
    if (company === 'solution') return 2
    if (company === 'mdvproyectos') return 3
    return 999
  }

  return list.sort((a, b) => {
    const ra = rank(a)
    const rb = rank(b)
    if (ra !== rb) return ra - rb
    return getExperienceSortValue(b) - getExperienceSortValue(a)
  })
}
