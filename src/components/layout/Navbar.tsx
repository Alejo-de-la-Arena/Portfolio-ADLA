import { useState, useEffect, useRef, type RefObject } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Globe2, Menu, Moon, SlidersHorizontal, Sun, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { MagneticButton } from '../effects/MagneticButton'
import { ModeToggle } from '../ui/ModeToggle'
import { scrollToSection } from '@/lib/utils'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useTheme } from '@/hooks/useTheme'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'
import { useLocale } from '@/context/LocaleContext'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsRef = useRef<HTMLDivElement | null>(null)
  const settingsButtonRef = useRef<HTMLButtonElement | null>(null)
  const { personalInfo, sectionLinks, ui } = useLocalizedContent()
  const activeSection = useScrollSpy(sectionLinks.map(link => link.id))
  const { theme, toggleTheme } = useTheme()
  const { locale, setLocale } = useLocale()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      const panelContainsTarget = settingsRef.current?.contains(target)
      const buttonContainsTarget = settingsButtonRef.current?.contains(target)
      if (!panelContainsTarget && !buttonContainsTarget) {
        setSettingsOpen(false)
      }
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSettingsOpen(false)
      }
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onEscape)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onEscape)
    }
  }, [])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setMobileMenuOpen(false)
    setSettingsOpen(false)
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
              {sectionLinks.map((link) => (
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

            {/* CTA + Controls */}
            <div className="hidden md:flex items-center gap-3">
              <HeaderControls
                ui={ui.navbar}
                locale={locale}
                setLocale={setLocale}
                theme={theme}
                toggleTheme={toggleTheme}
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
                settingsRef={settingsRef}
                settingsButtonRef={settingsButtonRef}
              />
              <MagneticButton onClick={() => handleNavClick('contact')}>
                {ui.navbar.talk}
              </MagneticButton>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSettingsOpen(false)
                  setMobileMenuOpen(!mobileMenuOpen)
                }}
                aria-label={ui.navbar.menuLabel}
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden fixed inset-x-0 top-16 sm:top-[4.5rem] bottom-0 border-t border-border bg-background/95 backdrop-blur-md overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-2">
              <div className="rounded-2xl border border-border bg-background-secondary/70 p-4 space-y-4 mb-4">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-foreground-tertiary">{ui.navbar.language}</p>
                  <div className="inline-flex items-center rounded-full border border-border bg-background p-1">
                    <button
                      type="button"
                      onClick={() => setLocale('es')}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors ${locale === 'es' ? 'bg-accent/15 text-foreground' : 'text-foreground-secondary hover:text-foreground'}`}
                      aria-pressed={locale === 'es'}
                    >
                      <Globe2 className="h-3.5 w-3.5" />
                      ES
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocale('en')}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors ${locale === 'en' ? 'bg-accent/15 text-foreground' : 'text-foreground-secondary hover:text-foreground'}`}
                      aria-pressed={locale === 'en'}
                    >
                      <Globe2 className="h-3.5 w-3.5" />
                      EN
                    </button>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-foreground-tertiary">{ui.navbar.readingMode}</p>
                  <ModeToggle />
                </div>

                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-foreground-tertiary">{ui.navbar.theme}</p>
                  <Button variant="outline" size="sm" onClick={toggleTheme}>
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {theme === 'dark' ? ui.navbar.light : ui.navbar.dark}
                  </Button>
                </div>
              </div>

              {sectionLinks.map((link) => (
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
                {ui.navbar.talk}
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

type HeaderControlsProps = {
  ui: {
    openSettings: string
    settingsTitle: string
    language: string
    readingMode: string
    theme: string
    light: string
    dark: string
  }
  locale: 'es' | 'en'
  setLocale: (value: 'es' | 'en') => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
  settingsOpen: boolean
  setSettingsOpen: (open: boolean) => void
  settingsRef: RefObject<HTMLDivElement>
  settingsButtonRef: RefObject<HTMLButtonElement>
}

function HeaderControls({
  ui,
  locale,
  setLocale,
  theme,
  toggleTheme,
  settingsOpen,
  setSettingsOpen,
  settingsRef,
  settingsButtonRef,
}: HeaderControlsProps) {
  return (
    <div className="relative">
      <Button
        ref={settingsButtonRef}
        variant="ghost"
        size="sm"
        aria-label={ui.openSettings}
        aria-expanded={settingsOpen}
        onClick={() => setSettingsOpen(!settingsOpen)}
        className="gap-1.5"
      >
        <span className="text-xs uppercase tracking-[0.12em]">{ui.settingsTitle}</span>
        <SlidersHorizontal className="h-4 w-4" />
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
      </Button>

      {settingsOpen && (
        <div
          ref={settingsRef}
          className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-border bg-background-secondary/95 p-4 shadow-2xl shadow-black/25 backdrop-blur-md"
        >
          <div className="mb-4">
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-foreground-tertiary">{ui.language}</p>
            <div className="inline-flex items-center rounded-full border border-border bg-background p-1">
              <button
                type="button"
                onClick={() => setLocale('es')}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors ${locale === 'es' ? 'bg-accent/15 text-foreground' : 'text-foreground-secondary hover:text-foreground'}`}
                aria-pressed={locale === 'es'}
              >
                <Globe2 className="h-3.5 w-3.5" />
                ES
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors ${locale === 'en' ? 'bg-accent/15 text-foreground' : 'text-foreground-secondary hover:text-foreground'}`}
                aria-pressed={locale === 'en'}
              >
                <Globe2 className="h-3.5 w-3.5" />
                EN
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-foreground-tertiary">{ui.readingMode}</p>
            <ModeToggle />
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-foreground-tertiary">{ui.theme}</p>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === 'dark' ? ui.light : ui.dark}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
