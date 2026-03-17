import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { about } from '@/data/content'
import { CheckCircle2 } from 'lucide-react'
import { usePortfolioMode } from '@/context/PortfolioModeContext'

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { isRecruiterMode } = usePortfolioMode()

  return (
    <section id="about" className="section-space">
      <div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="editorial-grid mb-12">
            <div className="space-y-4">
              <p className="eyebrow">About</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold">
                Senior mindset, <span className="text-accent">product execution</span>
              </h2>
            </div>
            <p className="text-foreground-secondary max-w-2xl">{about.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-border bg-background-secondary/70 p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Lo que mejor ejecuto
              </h3>
              <ul className="space-y-4">
                {about.highlights.slice(0, isRecruiterMode ? 3 : about.highlights.length).map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground-secondary text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-background-secondary/70 p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Principios de trabajo
              </h3>
              <ul className="space-y-4">
                {about.mindset.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground-secondary text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
