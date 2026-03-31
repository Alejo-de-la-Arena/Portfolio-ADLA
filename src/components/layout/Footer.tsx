import { Github, Linkedin, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { personalInfo, sectionLinks, socialLinks } from '@/data/content'
import { scrollToSection } from '@/lib/utils'

const socials = [
  { icon: Github, href: socialLinks.github, label: 'GitHub' },
  { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
  { icon: MessageCircle, href: socialLinks.whatsapp, label: 'WhatsApp' },
]

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                {personalInfo.name.split(' ').map(w => w[0]).join('')}
              </span>
            </h3>
            <p className="text-foreground-secondary text-sm">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              {sectionLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-foreground-secondary hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Redes</h4>
            <div className="flex gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-background-tertiary hover:bg-border-light flex items-center justify-center transition-colors"
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
            © {new Date().getFullYear()} Alejo de la Arena. Todos los derechos reservados.
          </p>
          <p className="text-foreground-tertiary text-xs">
            Hecho con React, TypeScript, Tailwind y Three.js
          </p>
        </div>

        {/* Subtle animation detail */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </footer>
  )
}
