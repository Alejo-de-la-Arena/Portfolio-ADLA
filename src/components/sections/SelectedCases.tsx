import { useEntrance } from '@/hooks/useEntrance'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { selectedCases, type Localized } from '@/data/experiences'
import { useLocale } from '@/context/LocaleContext'

const signals: Record<string, { value: Localized; label: Localized }> = {
  solution: { value: { es: '80 → 300', en: '80 → 300' }, label: { es: 'Pedidos mensuales aproximados', en: 'Approximate monthly orders' } },
  'espacio-boa': { value: { es: 'De la pared a la web', en: 'From wall to web' }, label: { es: 'Agenda e inscripción previa', en: 'Calendar and advance registration' } },
  manantial: { value: { es: '45+ páginas', en: '45+ pages' }, label: { es: '100% editables por el equipo', en: '100% editable by the team' } },
}

export function SelectedCases() {
  const heading = useEntrance()
  const item = useEntrance('smallGroupItem')
  const { locale, isSpanish } = useLocale()
  return <section id="cases" className="section-space scroll-mt-20">
    <div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
      <motion.header {...heading} className="editorial-grid mb-10">
        <div><p className="eyebrow">{isSpanish ? 'Trabajo para clientes' : 'Client work'}</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{isSpanish ? 'Casos seleccionados' : 'Selected work'}</h2></div>
        <p className="max-w-2xl text-foreground-secondary">{isSpanish ? 'Una tienda que creció, un centro que empezó a organizar sus actividades y un equipo que ganó un sitio propio. Mirá qué decisiones sostienen cada sistema y cómo lo usan.' : 'A store that grew, a center that began organizing its activities, and a team that gained its own website. See the decisions behind each system and how it is used.'}</p>
      </motion.header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {selectedCases.map((study, index) => {
          const { desktop, mobile } = study.project.media[0]
          const signal = signals[study.id]
          return <motion.article {...item} custom={index} key={study.id} className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-background-secondary shadow-lg shadow-black/10 motion-card hover:border-accent/50 focus-within:border-accent">
            <div className="relative overflow-hidden border-b border-border bg-background-tertiary">
              <picture><source media="(min-width: 1024px)" srcSet={desktop.src} /><img src={mobile?.src ?? desktop.src} alt={(mobile ?? desktop).alt[locale]} width={(mobile ?? desktop).width} height={(mobile ?? desktop).height} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top " /></picture>
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="font-display text-xl font-semibold leading-snug"><Link to={study.href} className="after:absolute after:inset-0 after:rounded-2xl">{study.title}</Link></h3>
              <div className="my-5 border-l-2 border-accent pl-4">
                <p className="font-display text-2xl font-semibold tracking-tight text-accent">{signal.value[locale]}</p>
                <p className="mt-1 text-xs font-medium text-foreground-secondary">{signal.label[locale]}</p>
              </div>
              <p className="text-sm leading-relaxed text-foreground-secondary">{study.summary[locale]}</p>
              <span aria-hidden="true" className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm font-medium text-accent"><span className="pt-4">{isSpanish ? 'Leer caso' : 'Read case'}</span><ArrowUpRight className="mt-4 h-5 w-5" /></span>
            </div>
          </motion.article>
        })}
      </div>
    </div>
  </section>
}
