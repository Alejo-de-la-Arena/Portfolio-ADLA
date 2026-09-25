import { motionTokens, motionTransition } from '@/lib/motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Github, Linkedin, MessageCircle } from 'lucide-react'
import { MagneticButton } from '../effects/MagneticButton'
import { HeroHalftone } from '../effects/HeroHalftone'
import { scrollToSection } from '@/lib/utils'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

function PillCTA({ children, onClick, primary = false }: { children: React.ReactNode; onClick: () => void; primary?: boolean }) {
  return <MagneticButton onClick={onClick} variant={primary ? 'primary' : 'outline'}>
    <span className="inline-flex items-center gap-3"><span>{children}</span><span className={`grid h-7 w-7 place-items-center rounded-full transition-transform duration-[var(--motion-fast)] ${primary ? 'bg-background/15 group-hover:translate-y-0.5' : 'bg-foreground/10 group-hover:rotate-45'}`}>{primary ? <ArrowDown className="h-3.5 w-3.5" strokeWidth={2.4} /> : <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />}</span></span>
  </MagneticButton>
}

/** Uses the shared 400ms entrance and 90ms small-group cadence: complete at 0.94s. */
const heroEntry = (reduceMotion: boolean, index: number) => ({
  initial: reduceMotion ? false : { opacity: 0.82, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { ...motionTransition(reduceMotion, 'slow'), delay: reduceMotion ? 0 : index * motionTokens.smallGroup.step },
})

function StaggeredHeadline({ name, reduceMotion }: { name: string; reduceMotion: boolean }) {
  const [first, ...rest] = name.split(' ')
  return <h1 className="hero-name text-foreground">
    <span className="block"><motion.span className="block" {...heroEntry(reduceMotion, 0)}>{first}</motion.span></span>
    <span className="block"><motion.span className="hero-name-gradient block hero-name-rest" {...heroEntry(reduceMotion, 0)}>{rest.join(' ')}</motion.span></span>
  </h1>
}

export function Hero() {
  const reduceMotion = useReducedMotionPreference()
  const { personalInfo, socialLinks, ui } = useLocalizedContent()
  const socials = [
    { icon: Github, href: socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: MessageCircle, href: socialLinks.whatsapp, label: 'WhatsApp' },
  ]

  return <section id="hero" className="relative flex min-h-[calc(100dvh-4rem)] w-full flex-col justify-start overflow-hidden bg-background lg:min-h-[100dvh] lg:justify-center">
    <HeroHalftone />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent" />
    <div className="relative z-10 mx-auto w-full max-w-editorial px-4 pb-4 pt-2 sm:px-6 sm:py-16 lg:px-8">
      <div className="grid items-center gap-4 sm:gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20">
        <div className="min-w-0 space-y-6 text-left lg:order-first">
          <StaggeredHeadline name={personalInfo.name} reduceMotion={reduceMotion} />
          <motion.p {...heroEntry(reduceMotion, 1)} className="!mt-3 max-w-lg font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">{personalInfo.role}</motion.p>
          <motion.p {...heroEntry(reduceMotion, 2)} className="!mt-4 max-w-lg text-sm leading-relaxed text-foreground-secondary sm:text-base">{personalInfo.summary}</motion.p>
          <motion.ul {...heroEntry(reduceMotion, 3)} className="!mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-accent-on-subtle">
            {personalInfo.location.split(' · ').map(item => <li key={item}>{item}</li>)}
          </motion.ul>
          <motion.p {...heroEntry(reduceMotion, 4)} className="!mt-5 text-sm leading-relaxed text-foreground-secondary">{personalInfo.availability}</motion.p>
          <motion.div {...heroEntry(reduceMotion, 5)} className="flex flex-wrap items-center justify-start gap-3">
            <PillCTA primary onClick={() => scrollToSection('cases')}>{ui.hero.viewProjects}</PillCTA>
            <PillCTA onClick={() => scrollToSection('contact')}>{ui.navbar.talk}</PillCTA>
            <button type="button" onClick={() => scrollToSection('experience')} className="inline-flex group items-center gap-2 text-sm text-foreground-secondary transition-none hover:text-foreground">
              {ui.hero.viewExperience}<span className="h-px w-8 origin-left bg-border transition-transform group-hover:scale-x-125 group-hover:bg-foreground-secondary" />
            </button>
          </motion.div>
          <motion.div {...heroEntry(reduceMotion, 6)} className="!mt-5">
            <div className="flex items-center justify-start gap-3">{socials.map(({ icon: Icon, href, label }) => <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} whileHover={reduceMotion ? undefined : { scale: motionTokens.interaction.hoverScale }} transition={motionTransition(reduceMotion, 'fast', 'standard')} className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-background-secondary/40 text-foreground-secondary transition-none hover:border-accent/50 hover:text-foreground"><Icon className="h-4 w-4" /></motion.a>)}</div>
          </motion.div>
        </div>
        <motion.figure {...heroEntry(reduceMotion, 0)} className="hero-portrait relative order-first mx-auto h-[min(83vw,330px)] w-[min(88vw,340px)] overflow-hidden sm:h-[360px] sm:w-[360px] lg:order-none lg:mx-0 lg:aspect-[407/612] lg:h-auto lg:w-full lg:max-w-[407px] lg:justify-self-end">
          <img src="/images/experiencia/portfolio-profile-photo.webp" alt={ui.hero.portraitAlt} width={407} height={612} fetchPriority="high" decoding="async" className="h-full w-full object-cover object-top lg:object-center" />
        </motion.figure>
      </div>
    </div>
  </section>
}
