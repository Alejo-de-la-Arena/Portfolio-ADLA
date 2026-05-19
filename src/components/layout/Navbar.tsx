import { useState, useEffect, useRef, type RefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Github, Globe2, Linkedin, Menu, MessageCircle, Moon, SlidersHorizontal, Sun, X } from 'lucide-react'
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
  const { personalInfo, sectionLinks, socialLinks, ui } = useLocalizedContent()
  const activeSection = useScrollSpy(sectionLinks.map(link => link.id))
  const { theme, toggleTheme } = useTheme()
  const { locale, setLocale } = useLocale()

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Body scroll lock when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  // Close on Escape + close settings when clicking outside
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (
        !settingsRef.current?.contains(target) &&
        !settingsButtonRef.current?.contains(target)
      ) {
        setSettingsOpen(false)
      }
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSettingsOpen(false)
        setMobileMenuOpen(false)
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

  const socials = [
    { icon: Github, href: socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: MessageCircle, href: socialLinks.whatsapp, label: 'WhatsApp' },
  ]

  return (
    <>
      {/* ── Fixed navbar ── */}
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-40 border-b border-border/60 backdrop-blur-md transition-colors duration-300 ${
          isScrolled ? 'bg-background/95' : 'bg-background/75'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-display font-semibold uppercase tracking-[0.16em] text-foreground"
              whileTap={{ scale: 0.97 }}
            >
              {personalInfo.name}
            </motion.button>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {sectionLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-foreground-secondary hover:bg-background-tertiary hover:text-foreground'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA + settings */}
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

            {/* Hamburger — visible solo en mobile */}
            <button
              type="button"
              className="flex md:hidden items-center justify-center rounded-lg p-2 text-foreground-secondary transition-colors hover:bg-background-tertiary hover:text-foreground"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={ui.navbar.menuLabel}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Spacer para compensar el nav fixed */}
      <div className="h-16" aria-hidden="true" />

      {/* ── Mobile Drawer — fuera del nav, z-index superior a todo ── */}

      {/* Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Drawer panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            key="mobile-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 z-[100] flex h-[100dvh] w-[75vw] flex-col border-l border-border bg-background shadow-2xl shadow-black/50"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <span className="text-xs font-display font-semibold uppercase tracking-[0.18em] text-foreground">
                {personalInfo.name}
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
              <ul className="space-y-0.5">
                {sectionLinks.map((link, idx) => (
                  <li key={link.id}>
                    <motion.button
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.05, duration: 0.24 }}
                      onClick={() => handleNavClick(link.id)}
                      className={`group flex w-full items-center justify-between rounded-xl px-4 py-4 text-left text-lg font-medium transition-colors ${
                        activeSection === link.id
                          ? 'bg-accent/10 text-accent'
                          : 'text-foreground-secondary hover:bg-background-secondary hover:text-foreground'
                      }`}
                    >
                      {link.label}
                      <span className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        activeSection === link.id ? 'bg-accent' : 'bg-transparent'
                      }`} />
                    </motion.button>
                    {idx < sectionLinks.length - 1 && (
                      <div className="mx-4 h-px bg-border/40" />
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Button className="w-full" onClick={() => handleNavClick('contact')}>
                  {ui.navbar.talk}
                </Button>
              </motion.div>

              {/* Settings compactos */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-5 space-y-4 rounded-xl border border-border/60 bg-background-secondary/50 p-4"
              >
                {/* Idioma */}
                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-foreground-tertiary">
                    {ui.navbar.language}
                  </p>
                  <div className="inline-flex rounded-full border border-border bg-background p-1">
                    {(['es', 'en'] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setLocale(lang)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          locale === lang
                            ? 'bg-accent/15 text-foreground'
                            : 'text-foreground-secondary hover:text-foreground'
                        }`}
                      >
                        <Globe2 className="h-3 w-3" />
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modo de lectura */}
                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-foreground-tertiary">
                    {ui.navbar.readingMode}
                  </p>
                  <ModeToggle />
                </div>

                {/* Tema */}
                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-foreground-tertiary">
                    {ui.navbar.theme}
                  </p>
                  <Button variant="outline" size="sm" onClick={toggleTheme}>
                    {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                    {theme === 'dark' ? ui.navbar.light : ui.navbar.dark}
                  </Button>
                </div>
              </motion.div>
            </nav>

            {/* Social footer */}
            <div className="border-t border-border/60 px-5 py-4">
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-foreground-secondary transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Desktop Settings Dropdown ──────────────────────────────────────────────

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
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${settingsOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {settingsOpen && (
        <div
          ref={settingsRef}
          className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-border bg-background-secondary/95 p-4 shadow-2xl shadow-black/25 backdrop-blur-md"
        >
          <div className="mb-4">
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-foreground-tertiary">
              {ui.language}
            </p>
            <div className="inline-flex rounded-full border border-border bg-background p-1">
              {(['es', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLocale(lang)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors ${
                    locale === lang
                      ? 'bg-accent/15 text-foreground'
                      : 'text-foreground-secondary hover:text-foreground'
                  }`}
                  aria-pressed={locale === lang}
                >
                  <Globe2 className="h-3.5 w-3.5" />
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-foreground-tertiary">
              {ui.readingMode}
            </p>
            <ModeToggle />
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-foreground-tertiary">
              {ui.theme}
            </p>
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
