import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { independentWork, experiences, formatExperiencePeriod, getExperienceBySlug, localizeExperience, type Experience } from '@/data/experiences'
import { Badge } from '@/components/ui/Badge'
import { useLocale, type Locale } from '@/context/LocaleContext'
import { ExperienceProjectBlock } from './ExperienceProjectBlock'

const pageLabels = (locale: Locale) => locale === 'es' ? {
  back: 'Volver a trayectoria', summary: 'Resumen', projects: 'Proyectos', work: 'Trabajo realizado', contribution: 'Contribución', impact: 'Qué quedó implementado', viewSite: 'Ver sitio', visit: (company: string) => `Visitar ${company}`, companySite: (company: string) => `Sitio de ${company}`, previousExperience: 'Experiencia anterior', nextExperience: 'Experiencia siguiente', navigation: 'Navegación entre experiencias', notFound: 'Experiencia no encontrada', notFoundCopy: 'La experiencia que buscás no está disponible o la dirección es incorrecta.', pending: (name: string) => `Captura pendiente de ${name}`, capturePending: 'Captura pendiente', carousel: 'Capturas del proyecto', previousView: 'Vista anterior', nextView: 'Vista siguiente', goToView: (index: number) => `Ir a la vista ${index}`, counter: (index: number, total: number) => `${index} de ${total}`, openImage: 'Ampliar imagen', closeImage: 'Cerrar imagen', previousImage: 'Imagen anterior', nextImage: 'Imagen siguiente', company: 'RELACIÓN DE DEPENDENCIA', freelance: 'FREELANCE',
} : {
  back: 'Back to experience', summary: 'Summary', projects: 'Projects', work: 'Work completed', contribution: 'Contribution', impact: 'What was implemented', viewSite: 'View site', visit: (company: string) => `Visit ${company}`, companySite: (company: string) => `${company} website`, previousExperience: 'Previous experience', nextExperience: 'Next experience', navigation: 'Experience navigation', notFound: 'Experience not found', notFoundCopy: 'The experience you are looking for is unavailable or the address is incorrect.', pending: (name: string) => `Screenshot pending for ${name}`, capturePending: 'Screenshot pending', carousel: 'Project screenshots', previousView: 'Previous view', nextView: 'Next view', goToView: (index: number) => `Go to view ${index}`, counter: (index: number, total: number) => `${index} of ${total}`, openImage: 'Open image', closeImage: 'Close image', previousImage: 'Previous image', nextImage: 'Next image', company: 'EMPLOYMENT', freelance: 'FREELANCE',
}

export function ExperienceDetailPage() {
  const { slug } = useParams()
  const { hash } = useLocation()
  const { locale } = useLocale()
  const sourceExperience = getExperienceBySlug(slug)
  const labels = pageLabels(locale)
  const experience = sourceExperience && localizeExperience(sourceExperience, locale)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'auto' })
    })
    return () => cancelAnimationFrame(frame)
  }, [slug, hash])
  useEffect(() => {
    if (!experience) return
    document.title = `${experience.company} | ${locale === 'es' ? 'Experiencia de Alejo de la Arena' : 'Alejo de la Arena Experience'}`
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', experience.summary)
  }, [experience, locale])
  if (!experience || !sourceExperience) return <ExperienceNotFound labels={labels} />
  const navigationItems = experience.type === 'freelance' && experience.slug !== 'freelance' ? independentWork : experiences
  const index = navigationItems.findIndex((item) => item.slug === experience.slug)
  const previous = navigationItems[index - 1]
  const next = navigationItems[index + 1]
  const contract = experience.type === 'empresa' ? labels.company : labels.freelance

  return <main className="overflow-x-hidden pb-20"><div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8"><Link to="/#experience" className="mt-10 inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground sm:mt-14"><ArrowLeft className="h-4 w-4" />{labels.back}</Link><header className="border-b border-border py-14 sm:py-20"><p className="eyebrow">{contract} · {experience.location}</p><h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-6xl">{experience.company}</h1><p className="mt-4 text-xl text-foreground-secondary sm:text-2xl">{experience.position}</p><div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm uppercase tracking-[0.15em] text-foreground-tertiary"><span>{formatExperiencePeriod(sourceExperience, locale)}</span><span>{contract}</span></div>{experience.companyUrl && <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover hover:underline underline-offset-4">{labels.companySite(experience.company)} <ExternalLink className="h-4 w-4" /></a>}<div className="mt-8 flex flex-wrap gap-2">{experience.stack.map((item) => <Badge key={item}>{item}</Badge>)}</div></header><section className="py-14 sm:py-20"><h2 className="font-display text-2xl font-bold sm:text-3xl">{labels.summary}</h2><p className="mt-6 max-w-[72ch] text-base leading-8 text-foreground-secondary sm:text-lg">{experience.summary}</p><ul className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">{experience.highlights.map((item) => <li key={item} className="border-l-2 border-accent pl-4 text-sm leading-6 text-foreground-secondary">{item}</li>)}</ul>{experience.slug === 'freelance' && <ol className="mt-8 border-l border-border pl-6">{experience.projects.map(project => <li key={project.id} className="pb-6 last:pb-0"><p className="text-xs text-foreground-tertiary">{project.period}</p><a href={`#${project.id}`} className="mt-1 inline-flex font-semibold text-accent">{project.name}</a><p className="mt-2 max-w-2xl text-sm text-foreground-secondary">{project.contribution}</p></li>)}</ol>}</section><section aria-labelledby="projects-title" className="pb-14 sm:pb-20"><div className="mb-10"><p className="eyebrow">{labels.work}</p><h2 id="projects-title" className="mt-3 font-display text-2xl font-bold sm:text-3xl">{labels.projects}</h2></div>{experience.projects.map((project, projectIndex) => <ExperienceProjectBlock key={project.id} project={project} index={projectIndex} labels={{ contribution: labels.contribution, impact: labels.impact, viewSite: labels.viewSite, openImage: labels.openImage, pendingCapture: labels.pending, lightboxClose: labels.closeImage, lightboxPrevious: labels.previousImage, lightboxNext: labels.nextImage, carousel: labels.carousel, previousView: labels.previousView, nextView: labels.nextView, goToView: labels.goToView, viewCounter: labels.counter }} />)}</section><footer className="border-t border-border py-12">{experience.companyUrl && <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover hover:underline underline-offset-4">{labels.visit(experience.company)} <ExternalLink className="h-4 w-4" /></a>}<nav aria-label={labels.navigation} className="mt-10 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">{previous ? <ExperienceNavigation experience={previous} direction="previous" labels={labels} /> : <span />}{next ? <ExperienceNavigation experience={next} direction="next" labels={labels} /> : <span />}</nav></footer></div></main>
}

function ExperienceNavigation({ experience, direction, labels }: { experience: Experience; direction: 'previous' | 'next'; labels: ReturnType<typeof pageLabels> }) {
  const isPrevious = direction === 'previous'
  return <Link to={`/experiencia/${experience.slug}`} className={`group border border-border p-5 transition-colors hover:border-border-light ${isPrevious ? 'sm:text-left' : 'sm:text-right'}`}><span className="text-xs uppercase tracking-[0.15em] text-foreground-tertiary">{isPrevious ? labels.previousExperience : labels.nextExperience}</span><span className={`mt-2 flex items-center gap-2 font-display text-lg font-semibold group-hover:text-accent ${isPrevious ? '' : 'sm:justify-end'}`}>{isPrevious && <ArrowLeft className="h-4 w-4" />}{experience.company}{!isPrevious && <ArrowRight className="h-4 w-4" />}</span></Link>
}

function ExperienceNotFound({ labels }: { labels: ReturnType<typeof pageLabels> }) {
  useEffect(() => { document.title = `${labels.notFound} | Alejo de la Arena` }, [labels.notFound])
  return <main className="mx-auto max-w-editorial px-4 py-28 sm:px-6 lg:px-8"><p className="eyebrow">404</p><h1 className="mt-4 font-display text-4xl font-bold">{labels.notFound}</h1><p className="mt-4 max-w-xl text-foreground-secondary">{labels.notFoundCopy}</p><Link to="/#experience" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"><ArrowLeft className="h-4 w-4" />{labels.back}</Link></main>
}
