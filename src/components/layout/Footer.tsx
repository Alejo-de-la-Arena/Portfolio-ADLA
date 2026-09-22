import { useEffect, useState } from 'react'
import { useEntrance } from '@/hooks/useEntrance'
import { motionTokens, motionTransition } from '@/lib/motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { ArrowUp, Copy, Github, Linkedin, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { BrandMark } from '../ui/BrandMark'
import { Container } from '../ui/Container'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '@/lib/utils'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

const buenosAiresTime = new Intl.DateTimeFormat('es-AR', {
  timeZone: 'America/Argentina/Buenos_Aires',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
})

export function Footer() {
  const entry = useEntrance()
  const reduceMotion = useReducedMotionPreference()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { personalInfo, sectionLinks, socialLinks, ui } = useLocalizedContent()
  const [localTime, setLocalTime] = useState(() => buenosAiresTime.format(new Date()))

  useEffect(() => {
    const timer = window.setInterval(() => setLocalTime(buenosAiresTime.format(new Date())), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      toast.success(ui.contact.copied)
    } catch {
      toast.error(ui.footer.copyError)
    }
  }

  const socials = [
    { icon: Github, href: socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: MessageCircle, href: socialLinks.whatsapp, label: 'WhatsApp' },
  ]

  return (
    <motion.footer {...entry} className="relative mt-32 border-t border-border bg-background-secondary">
      <Container width="editorial" className="py-12">
        <div className="mb-8 grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_0.7fr_1fr] md:items-baseline md:gap-8">
          <div className="min-w-0">
            <h2 aria-label={personalInfo.name}><BrandMark footer /></h2>
            <p className="mt-5 flex items-baseline gap-2 text-sm leading-6 text-foreground-secondary">
              <motion.span
                aria-hidden="true"
                className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent"
                animate={{ opacity: reduceMotion ? 1 : [...motionTokens.availability.opacity] }}
                transition={reduceMotion ? motionTransition(true) : {
                  duration: motionTokens.availability.duration,
                  ease: motionTokens.ease.standard,
                  repeat: Infinity,
                }}
              />
              {ui.footer.availability}
            </p>
            <p className="mt-3 text-sm tabular-nums text-foreground-tertiary">
              Buenos Aires · <time>{localTime}</time> (UTC−3)
            </p>
          </div>

          <nav aria-label={ui.footer.navigation}>
            <h2 className="font-semibold">{ui.footer.navigation}</h2>
            <ul className="mt-5 space-y-3">
              {sectionLinks.map(link => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => pathname === '/' ? scrollToSection(link.id) : navigate('/#' + link.id)}
                    className="text-sm leading-6 text-foreground-secondary transition-none hover:text-accent"
                  >{link.label}</button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className="font-semibold">{ui.footer.social}</h2>
            <div className="mt-5 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={reduceMotion ? undefined : { scale: motionTokens.interaction.hoverScale }}
                  whileTap={reduceMotion ? undefined : { scale: motionTokens.interaction.pressScale }}
                  transition={motionTransition(reduceMotion, 'fast', 'standard')}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-tertiary transition-none hover:bg-border-light hover:text-accent"
                ><Icon className="h-5 w-5" aria-hidden="true" /></motion.a>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <a href={'mailto:' + personalInfo.email} className="break-all text-sm leading-6 text-foreground-secondary hover:text-accent">{personalInfo.email}</a>
              <button type="button" onClick={copyEmail} aria-label={ui.footer.copyEmail + ': ' + personalInfo.email} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-foreground-secondary hover:text-accent">
                <Copy className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })} className="mt-3 inline-flex items-center gap-2 py-2 text-sm text-accent hover:text-accent-hover">
              {ui.footer.backToTop}<ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-baseline">
          <p className="text-sm text-foreground-secondary">© {new Date().getFullYear()} Alejo de la Arena. {ui.footer.rights}</p>
          <p className="text-xs text-foreground-tertiary">{ui.footer.madeWith}</p>
        </div>
      </Container>
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 h-1 w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
    </motion.footer>
  )
}
