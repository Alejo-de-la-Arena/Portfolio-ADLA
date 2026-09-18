import { useEntrance } from '@/hooks/useEntrance'
import { motionTokens, motionTransition } from '@/lib/motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { Github, Linkedin, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { BrandMark } from '../ui/BrandMark'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '@/lib/utils'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

export function Footer() {
  const entry = useEntrance()
  const reduceMotion = useReducedMotionPreference()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { personalInfo, sectionLinks, socialLinks, ui } = useLocalizedContent()
  const socials = [
    { icon: Github, href: socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: MessageCircle, href: socialLinks.whatsapp, label: 'WhatsApp' },
  ]

  return (
    <motion.footer {...entry} className="relative mt-32 border-t border-border bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-3" aria-label={personalInfo.name}><BrandMark footer /></div>
            <p className="text-foreground-secondary text-sm">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{ui.footer.navigation}</h4>
            <ul className="space-y-2">
              {sectionLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => pathname === '/' ? scrollToSection(link.id) : navigate(`/#${link.id}`)}
                    className="text-foreground-secondary hover:text-accent transition-none text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">{ui.footer.social}</h4>
            <div className="flex gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduceMotion ? undefined : { scale: motionTokens.interaction.hoverScale }}
                  whileTap={reduceMotion ? undefined : { scale: motionTokens.interaction.pressScale }}
                  transition={motionTransition(reduceMotion, 'fast', 'standard')}
                  className="w-10 h-10 rounded-lg bg-background-tertiary hover:bg-border-light flex items-center justify-center transition-none"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground-secondary text-sm">
            © {new Date().getFullYear()} Alejo de la Arena. {ui.footer.rights}
          </p>
          <p className="text-foreground-tertiary text-xs">
            {ui.footer.madeWith}
          </p>
        </div>

        {/* Subtle animation detail */}
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
      </div>
    </motion.footer>
  )
}
