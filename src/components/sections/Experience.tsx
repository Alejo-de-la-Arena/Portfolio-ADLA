import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { experiences, formatExperiencePeriod, localizeExperience } from '@/data/experiences'
import { useLocale } from '@/context/LocaleContext'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

export function Experience() {
  const reduceMotion = useReducedMotionPreference()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { ui } = useLocalizedContent()
  const { locale } = useLocale()

  return <section id="experience" className="section-space scroll-mt-20 border-y border-border bg-background-secondary/25">
    <div ref={ref} className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
      <header className="editorial-grid mb-12">
        <div>
          <p className="eyebrow mb-3">{ui.experience.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{ui.experience.titleStart} <span className="text-accent">{ui.experience.titleAccent}</span>
          </h2>
        </div>
        <p className="max-w-xl text-foreground-secondary">{ui.experience.recruiterIntro}</p>
      </header>
      <ol className="border-l border-border pl-6 sm:pl-8">{experiences.map((item, index) => {
        const experience = localizeExperience(item, locale)
        return <motion.li key={experience.slug} initial={reduceMotion ? false : { opacity: 0, x: -12 }} animate={reduceMotion || inView ? { opacity: 1, x: 0 } : {}} transition={reduceMotion ? { duration: 0 } : { delay: index * 0.07, duration: 0.45 }} className="relative pb-9 last:pb-0">
          <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background bg-accent sm:-left-[39px]" />
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
