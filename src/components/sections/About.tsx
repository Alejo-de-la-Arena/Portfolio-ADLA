import { useEntrance } from '@/hooks/useEntrance'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

const projectLinks: Record<string, string> = {
  Solution: '/experiencia/freelance#solution',
  FORMAT: '/experiencia/freelance#format',
  'Don Teófilo': '/experiencia/freelance#don-teofilo-amoblamientos',
  Manantial: '/experiencia/zetenta#manantial',
  BOA: '/experiencia/freelance#boa',
  Zetenta: '/experiencia/zetenta',
  VYZON: '/#projects',
  'JobMatch Bot': '/#projects',
}

function ProjectEvidence({ text }: { text: string }) {
  return <>{text.split(/(Solution|FORMAT|Don Teófilo|Manantial|BOA|Zetenta|VYZON|JobMatch Bot)/g).map((part, index) => {
    const href = projectLinks[part]
    return href ? <Link key={index} to={href} className="rounded-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:text-foreground hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{part}</Link> : part
  })}</>
}

export function About() {
  const heading = useEntrance()
  const item = useEntrance('smallGroupItem')
  const { about, ui } = useLocalizedContent()
  return <section id="about" className="section-space scroll-mt-20">
    <div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
      <motion.header {...heading} className="mb-8 sm:mb-10">
        <p className="eyebrow">{ui.about.eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{ui.about.titleStart} <span className="text-accent">{ui.about.titleAccent}</span></h2>
      </motion.header>
      <ol className="divide-y divide-border border-y border-border">
        {about.paragraphs.map((paragraph, index) => <motion.li {...item} custom={index} key={about.titles[index]} className="grid items-start gap-5 py-7 sm:py-9 lg:grid-cols-[1.1fr_1.9fr] lg:gap-10">
          <div className="flex min-w-0 items-start gap-4 lg:gap-5">
            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 font-display text-sm font-semibold tabular-nums text-accent">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="min-w-0 pt-1 font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">{about.titles[index]}</h3>
          </div>
          <p className="min-w-0 max-w-[68ch] text-base leading-8 text-foreground-secondary"><ProjectEvidence text={paragraph} /></p>
        </motion.li>)}
      </ol>
    </div>
  </section>
}
