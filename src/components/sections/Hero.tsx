import { motionTokens, motionTransition, createMotionVariants } from '@/lib/motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, MessageCircle } from 'lucide-react'
import { MagneticButton } from '../effects/MagneticButton'
import { HeroAurora } from '../effects/HeroAurora'
import { scrollToSection } from '@/lib/utils'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

/* ========== PILL CTA ========== */

function PillCTA({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode
  onClick: () => void
  primary?: boolean
}) {
  return (
    <MagneticButton onClick={onClick} variant={primary ? 'primary' : 'outline'}>
      <span className="inline-flex items-center gap-3">
        <span>{children}</span>
        <span
          className={`grid h-7 w-7 place-items-center rounded-full transition-transform duration-[var(--motion-fast)] group-hover:rotate-45 ${primary ? 'bg-background/15' : 'bg-foreground/10'}`}
        >
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
        </span>
      </span>
    </MagneticButton>
  )
}

/* ========== HEADLINE STAGGERED ========== */

function StaggeredHeadline({ name, reduceMotion }: { name: string; reduceMotion: boolean }) {
  const parts = name.split(' ')
  const first = parts[0]
  const rest = parts.slice(1).join(' ')
  const variants = createMotionVariants(Boolean(reduceMotion)).smallGroupItem

  return (
    <h1 className="hero-name text-foreground">
      <span className="block">
        <motion.span
          className="block"
          variants={variants}
          initial={false}
          animate="visible"
          custom={0}
        >
          {first}
        </motion.span>
      </span>
      <span className="block">
        <motion.span
          className="hero-name-gradient block hero-name-rest"
          variants={variants}
          initial={false}
          animate="visible"
          custom={1}
        >
          {rest}
        </motion.span>
      </span>
    </h1>
  )
}

/* ========== HERO ========== */

export function Hero() {
  const reduceMotion = useReducedMotionPreference()
  const { personalInfo, socialLinks, ui } = useLocalizedContent()
  const entry = (index: number) => ({
    initial: false as const,
    animate: 'visible',
    variants: createMotionVariants(reduceMotion).smallGroupItem,
    custom: index,
  })

  const socials = [
    { icon: Github, href: socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: MessageCircle, href: socialLinks.whatsapp, label: 'WhatsApp' },
  ]

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-background pt-0"
    >
      <HeroAurora />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent" />

      <div
        className="relative z-10 mx-auto w-full max-w-editorial px-4 pt-6 pb-4 sm:px-6 sm:py-16 lg:px-8"
      >
        {/* Main content grid */}
        <div className="grid items-center gap-8 sm:gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20">

          {/* CONTENIDO */}
          <div className="min-w-0 space-y-6 text-left lg:order-first">
            <div className="space-y-4 sm:space-y-5">
              <StaggeredHeadline name={personalInfo.name} reduceMotion={reduceMotion} />
            </div>

            <motion.div {...entry(2)} className="!mt-3 w-full max-w-xl">
              <p className="max-w-lg font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">{personalInfo.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
                {personalInfo.summary}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-accent-on-subtle">
                {personalInfo.location.split(' · ').map(item => <li key={item}>{item}</li>)}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-foreground-secondary">{personalInfo.availability}</p>
            </motion.div>

            <motion.div
              {...entry(3)}
              className="flex flex-wrap items-center justify-start gap-3"
            >
              <PillCTA primary onClick={() => scrollToSection('cases')}>
                {ui.hero.viewProjects}
              </PillCTA>
              <PillCTA onClick={() => scrollToSection('contact')}>{ui.navbar.talk}</PillCTA>
              <button
                type="button"
                onClick={() => scrollToSection('experience')}
                className="inline-flex group items-center gap-2 text-sm text-foreground-secondary transition-none hover:text-foreground"
              >
                {ui.hero.viewExperience}
                <span className="h-px w-8 bg-border transition-transform origin-left group-hover:scale-x-125 group-hover:bg-foreground-secondary" />
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              {...entry(4)}
              className="!mt-5"
            >
              <div className="flex items-center justify-start gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={reduceMotion ? undefined : { scale: motionTokens.interaction.hoverScale }}
                    transition={motionTransition(reduceMotion, 'fast', 'standard')}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-background-secondary/40 text-foreground-secondary transition-none hover:border-accent/50 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>


      </div>
    </section>
  )
}
