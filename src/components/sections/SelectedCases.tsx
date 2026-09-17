import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { selectedCases } from '@/data/experiences'
import { useLocale } from '@/context/LocaleContext'
import { Card } from '../ui/Card'

export function SelectedCases() {
  const { locale, isSpanish } = useLocale()
  return <section id="cases" className="section-space scroll-mt-20">
    <div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
      <header className="editorial-grid mb-8">
        <div><p className="eyebrow">{isSpanish ? 'Trabajo para clientes' : 'Client work'}</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{isSpanish ? 'Casos seleccionados' : 'Selected work'}</h2></div>
        <p className="max-w-2xl text-foreground-secondary">{isSpanish ? 'El punto de partida, las decisiones y lo que cambió después.' : 'The starting point, the decisions, and what changed afterward.'}</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {selectedCases.map(study => {
          const { desktop, mobile } = study.project.media[0]
          return <Card key={study.id} className="h-full overflow-hidden">
            <picture><source media="(min-width: 1024px)" srcSet={desktop.src} /><img src={mobile?.src ?? desktop.src} alt={(mobile ?? desktop).alt[locale]} width={(mobile ?? desktop).width} height={(mobile ?? desktop).height} loading="lazy" decoding="async" className="mb-5 aspect-video w-full object-cover object-top" /></picture>
            <h3 className="font-display text-xl font-semibold"><Link to={study.href} className="hover:text-accent">{study.title}<ArrowUpRight className="ml-2 inline h-4 w-4" /></Link></h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">{study.summary[locale]}</p>
            <Link to={study.href} className="mt-4 inline-flex text-sm font-medium text-accent">{isSpanish ? 'Leer caso' : 'Read case'}<span className="sr-only">: {study.title}</span></Link>
          </Card>
        })}
      </div>
    </div>
  </section>
}
