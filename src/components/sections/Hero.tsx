import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '../effects/MagneticButton'
import { SpotlightGrid } from '../effects/SpotlightGrid'
import { Container } from '../ui/Container'
import { scrollToSection } from '@/lib/utils'
import { modeLabels, personalInfo, socialLinks } from '@/data/content'
import { usePortfolioMode } from '@/context/PortfolioModeContext'

export function Hero() {
  const reduceMotion = useReducedMotion()
  const { isRecruiterMode } = usePortfolioMode()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-10">
      <SpotlightGrid />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent" />

      <Container width="editorial" className="relative z-10 py-20 sm:py-28 md:py-32">
        <div className="editorial-grid items-end gap-y-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="space-y-4 lg:sticky lg:top-28"
          >
            <p className="eyebrow">{personalInfo.location}</p>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-foreground-secondary">
                {isRecruiterMode ? modeLabels.recruiter : modeLabels.deep}
              </p>
              <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-foreground">
                Hola, soy
                <br />
                <span className="text-gradient">{personalInfo.name}</span>
              </h1>
            </div>

            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.19, 1, 0.22, 1] }}
              className="border-l border-border pl-4 text-sm text-foreground-secondary sm:text-base"
            >
              {personalInfo.role}
            </motion.div>
          </motion.div>

          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.08 }}
            className="space-y-8"
          >
            <p className="max-w-2xl text-base leading-relaxed text-foreground-secondary sm:text-lg">
              {isRecruiterMode ? personalInfo.recruiterSummary : personalInfo.deepDiveSummary}
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground sm:text-base">
              {personalInfo.valueLine}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton onClick={() => scrollToSection('projects')}>
                Ver proyectos <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton variant="outline" onClick={() => scrollToSection('contact')}>
                Hablemos
              </MagneticButton>
              <button
                type="button"
                onClick={() => scrollToSection('experience')}
                className="group inline-flex items-center gap-2 text-sm text-foreground-tertiary transition-colors hover:text-foreground"
              >
                Ver experiencia
                <span className="h-px w-8 bg-border transition-colors group-hover:bg-foreground-secondary" />
              </button>
            </div>

            <ul className="grid gap-2 sm:grid-cols-3">
              {personalInfo.proof.map((item) => (
                <li key={item} className="rounded-xl border border-border bg-background-secondary/60 px-3 py-2 text-xs text-foreground-secondary">
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-foreground-tertiary">
              <motion.button
                type="button"
                onClick={() => window.open(socialLinks.github, '_blank', 'noopener,noreferrer')}
                className="group inline-flex items-center transition-colors hover:text-foreground"
                aria-label="Abrir GitHub"
              >
                github
              </motion.button>
              <span>·</span>
              <motion.button
                type="button"
                onClick={() => window.open(socialLinks.linkedin, '_blank', 'noopener,noreferrer')}
                className="group inline-flex items-center transition-colors hover:text-foreground"
                aria-label="Abrir LinkedIn"
              >
                linkedin
              </motion.button>
              <span>·</span>
              <motion.button
                type="button"
                onClick={() => window.open(socialLinks.whatsapp, '_blank', 'noopener,noreferrer')}
                className="group inline-flex items-center transition-colors hover:text-foreground"
                aria-label="Abrir WhatsApp"
              >
                whatsapp
              </motion.button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
