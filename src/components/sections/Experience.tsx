import { useEntrance } from '@/hooks/useEntrance'
import { motionTokens, motionTransition } from '@/lib/motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { experiences, formatExperiencePeriod, localizeExperience } from '@/data/experiences'
import { useLocale } from '@/context/LocaleContext'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

export function Experience() {
  const heading = useEntrance()
  const entry = useEntrance('smallGroupItem')
  const reduceMotion = useReducedMotionPreference()
  const { ui } = useLocalizedContent()
  const { locale } = useLocale()

  return <section id="experience" className="section-space scroll-mt-20 border-y border-border bg-background-secondary/25">
    <div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
      <motion.header {...heading} className="editorial-grid mb-12">
        <div>
          <p className="eyebrow mb-3">{ui.experience.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{ui.experience.titleStart} <span className="text-accent">{ui.experience.titleAccent}</span>
          </h2>
        </div>
        <p className="max-w-xl text-foreground-secondary">{ui.experience.intro}</p>
      </motion.header>
      <ol className="border-l border-border pl-6 sm:pl-8">{experiences.map((item, index) => {
        const experience = localizeExperience(item, locale)
        return <motion.li key={experience.slug} {...entry} custom={index} className="relative pb-9 last:pb-0">
          <motion.span aria-hidden="true" initial={reduceMotion ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={motionTokens.viewport} transition={motionTransition(reduceMotion, 'slow')} className="absolute -left-[25px] bottom-0 top-1 w-px origin-top bg-accent/70 sm:-left-[33px]" />
          <motion.span aria-hidden="true" initial={reduceMotion ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={motionTokens.viewport} transition={motionTransition(reduceMotion)} className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background bg-accent sm:-left-[39px]" />
          <p className="text-xs uppercase tracking-[0.15em] text-foreground-tertiary">{formatExperiencePeriod(item, locale)}</p>
          <Link to={`/experiencia/${experience.slug}`} className="group mt-2 block focus-visible:rounded-lg">
            <h3 className="text-lg font-semibold group-hover:text-accent">{experience.position} <span className="font-normal text-foreground-secondary">· {experience.company}</span>
              <ArrowUpRight className="ml-1 inline h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-foreground-secondary">{experience.summary}</p>
            <span className="mt-3 inline-flex text-sm font-medium text-accent">{ui.experience.detail}</span>
          </Link>
        </motion.li>
      })}</ol>
    </div>
  </section>
}
