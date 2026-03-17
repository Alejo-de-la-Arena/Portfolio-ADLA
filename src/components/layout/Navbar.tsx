import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { Button } from '../ui/Button'
import { MagneticButton } from '../effects/MagneticButton'
import { ModeToggle } from '../ui/ModeToggle'
import { scrollToSection } from '@/lib/utils'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useTheme } from '@/hooks/useTheme'
import { personalInfo } from '@/data/content'

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const activeSection = useScrollSpy(navLinks.map(link => link.id))
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors duration-300 ${
          isScrolled ? 'bg-background/92' : 'bg-background/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm sm:text-base font-display font-semibold tracking-[0.16em] uppercase text-foreground"
              whileHover={{ opacity: 0.8 }}
              whileTap={{ scale: 0.97 }}
            >
              {personalInfo.name}
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <ModeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
              <MagneticButton onClick={() => handleNavClick('contact')}>
                Hablemos
              </MagneticButton>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-2">
              <div className="pb-2">
                <ModeToggle />
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    activeSection === link.id
                      ? 'text-accent bg-accent/10'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                className="w-full mt-4"
                onClick={() => handleNavClick('contact')}
              >
                Hablemos
              </Button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Spacer */}
      <div className="h-16 sm:h-20" />
    </>
  )
}
