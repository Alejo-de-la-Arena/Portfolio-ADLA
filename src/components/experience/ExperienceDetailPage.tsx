import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { experiences, getExperienceBySlug } from '@/data/experiences'
import { Badge } from '@/components/ui/Badge'
import { ExperienceProjectBlock } from './ExperienceProjectBlock'

export function ExperienceDetailPage() {
  const { slug } = useParams()
  const experience = getExperienceBySlug(slug)
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [slug])
  useEffect(() => { if (!experience) return; document.title = `${experience.company} | Experiencia de Alejo de la Arena`; const description = document.querySelector('meta[name="description"]'); if (description) description.setAttribute('content', experience.summary) }, [experience])
  if (!experience) return <ExperienceNotFound />
  const index = experiences.findIndex((item) => item.slug === experience.slug)
  const previous = experiences[index - 1]
  const next = experiences[index + 1]
  return <main className="overflow-x-hidden pb-20"><div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8"><Link to="/#experience" className="mt-10 inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground sm:mt-14"><ArrowLeft className="h-4 w-4" />Volver a experiencia</Link><header className="border-b border-border py-14 sm:py-20"><p className="eyebrow">{experience.type} · {experience.location}</p><h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-6xl">{experience.company}</h1><p className="mt-4 text-xl text-foreground-secondary sm:text-2xl">{experience.position}</p><div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm uppercase tracking-[0.15em] text-foreground-tertiary"><span>{experience.startDate} - {experience.endDate}</span><span>{experience.type}</span></div>{experience.companyUrl && <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover hover:underline underline-offset-4">Sitio de {experience.company} <ExternalLink className="h-4 w-4" /></a>}<div className="mt-8 flex flex-wrap gap-2">{experience.stack.map((item) => <Badge key={item}>{item}</Badge>)}</div></header><section className="py-14 sm:py-20"><h2 className="font-display text-2xl font-bold sm:text-3xl">Resumen</h2><p className="mt-6 max-w-[72ch] text-base leading-8 text-foreground-secondary sm:text-lg">{experience.summary}</p><ul className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">{experience.highlights.map((item) => <li key={item} className="border-l-2 border-accent pl-4 text-sm leading-6 text-foreground-secondary">{item}</li>)}</ul></section><section aria-labelledby="projects-title" className="pb-14 sm:pb-20"><div className="mb-10"><p className="eyebrow">Trabajo realizado</p><h2 id="projects-title" className="mt-3 font-display text-2xl font-bold sm:text-3xl">Proyectos</h2></div>{experience.projects.map((project, projectIndex) => <ExperienceProjectBlock key={project.id} project={project} index={projectIndex} />)}</section><footer className="border-t border-border py-12">{experience.companyUrl && <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover hover:underline underline-offset-4">Visitar {experience.company} <ExternalLink className="h-4 w-4" /></a>}<nav aria-label="Navegación entre experiencias" className="mt-10 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">{previous ? <ExperienceNavigation experience={previous} direction="previous" /> : <span />}{next ? <ExperienceNavigation experience={next} direction="next" /> : <span />}</nav></footer></div></main>
}

function ExperienceNavigation({ experience, direction }: { experience: (typeof experiences)[number]; direction: 'previous' | 'next' }) {
  const isPrevious = direction === 'previous'
  return <Link to={`/experiencia/${experience.slug}`} className={`group border border-border p-5 transition-colors hover:border-border-light ${isPrevious ? 'sm:text-left' : 'sm:text-right'}`}><span className="text-xs uppercase tracking-[0.15em] text-foreground-tertiary">{isPrevious ? 'Experiencia anterior' : 'Experiencia siguiente'}</span><span className={`mt-2 flex items-center gap-2 font-display text-lg font-semibold group-hover:text-accent ${isPrevious ? '' : 'sm:justify-end'}`}>{isPrevious && <ArrowLeft className="h-4 w-4" />}{experience.company}{!isPrevious && <ArrowRight className="h-4 w-4" />}</span></Link>
}

function ExperienceNotFound() {
  useEffect(() => { document.title = 'Experiencia no encontrada | Alejo de la Arena' }, [])
  return <main className="mx-auto max-w-editorial px-4 py-28 sm:px-6 lg:px-8"><p className="eyebrow">404</p><h1 className="mt-4 font-display text-4xl font-bold">Experiencia no encontrada</h1><p className="mt-4 max-w-xl text-foreground-secondary">La experiencia que buscás no está disponible o la dirección es incorrecta.</p><Link to="/#experience" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"><ArrowLeft className="h-4 w-4" />Volver a experiencia</Link></main>
}
