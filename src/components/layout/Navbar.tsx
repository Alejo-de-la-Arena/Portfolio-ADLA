import { motionTransition, staggerDelay } from '@/lib/motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { ModalSurface } from '../ui/ModalSurface'
import { useState, useEffect, useRef, type RefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Globe2, Menu, Moon, SlidersHorizontal, Sun, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { BrandMark } from '../ui/BrandMark'
import { scrollToSection } from '@/lib/utils'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useTheme } from '@/hooks/useTheme'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'
import { useLocale } from '@/context/LocaleContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export function Navbar() {
  const reduceMotion = useReducedMotionPreference()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsRef = useRef<HTMLDivElement | null>(null)
  const settingsButtonRef = useRef<HTMLButtonElement | null>(null)
  const { personalInfo, sectionLinks, ui } = useLocalizedContent()
  const activeSection = useScrollSpy(sectionLinks.map(link => link.id))
  const { theme, toggleTheme } = useTheme()
  const { locale, setLocale } = useLocale()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on Escape + close settings when clicking outside
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (
        !settingsRef.current?.contains(target) &&
        !settingsButtonRef.current?.contains(target)
      ) {
        setSettingsOpen(false)
      }
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && settingsOpen) {
        setSettingsOpen(false)
        settingsButtonRef.current?.focus()
      }
    }
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onEscape)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onEscape)
    }
  }, [settingsOpen])

  useEffect(() => {
    if (settingsOpen) settingsRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
  }, [settingsOpen])

  const handleNavClick = (sectionId: string) => {
    if (pathname !== '/') navigate(`/#${sectionId}`)
    else scrollToSection(sectionId)
    setMobileMenuOpen(false)
    setSettingsOpen(false)
  }

  return (
    <>
      {/* ── Fixed navbar ── */}
      <motion.nav
        initial={reduceMotion ? false : { y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-40 border-b border-border/60 backdrop-blur-md transition-none duration-[var(--motion-fast)] ${
          isScrolled ? 'bg-background/95' : 'bg-background/75'
        }`}
      >
        <div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 flex-nowrap items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" aria-label={locale === 'es' ? 'ADLA — Inicio' : 'ADLA — Home'} className="inline-flex shrink-0 items-center py-2 pr-2" onClick={() => { window.scrollTo({ top: 0, behavior: pathname === '/' && !reduceMotion ? 'smooth' : 'auto' }); setMobileMenuOpen(false); setSettingsOpen(false) }}>
              <BrandMark />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {sectionLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-none ${
                    activeSection === link.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-foreground-secondary hover:bg-background-tertiary hover:text-foreground'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop settings */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <HeaderControls
                ui={ui.navbar}
                locale={locale}
                setLocale={setLocale}
                theme={theme}
                toggleTheme={toggleTheme}
                settingsOpen={settingsOpen}
                setSettingsOpen={(open) => { setSettingsOpen(open); if (open) setMobileMenuOpen(false) }}
                settingsRef={settingsRef}
                settingsButtonRef={settingsButtonRef}
              />
              <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground-secondary transition-none hover:bg-background-tertiary hover:text-foreground lg:hidden"
              onClick={() => { setSettingsOpen(false); setMobileMenuOpen((prev) => !prev) }}
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
        </div>
      </motion.nav>

      {/* Spacer para compensar el nav fixed */}
      <div className="h-16" aria-hidden="true" />

      {/* ── Mobile Drawer — fuera del nav, z-index superior a todo ── */}

      {/* Drawer panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <ModalSurface onClose={() => setMobileMenuOpen(false)} label={ui.navbar.menuLabel}>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <motion.div
            id="mobile-drawer"
            key="mobile-drawer"
            initial={reduceMotion ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: '100%' }}
            transition={motionTransition(reduceMotion)}
            className="fixed right-0 top-0 z-[100] flex h-[100dvh] w-[75vw] flex-col border-l border-border bg-background shadow-2xl shadow-black/50"

          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <span className="text-xs font-display font-semibold uppercase tracking-[0.18em] text-foreground">
                {personalInfo.name}
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={locale === 'es' ? 'Cerrar menú' : 'Close menu'} data-dialog-initial-focus
                className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-secondary transition-none hover:bg-background-secondary hover:text-foreground"
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
                      initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...motionTransition(reduceMotion), delay: staggerDelay(idx, reduceMotion) }}
                      onClick={() => handleNavClick(link.id)}
                      className={`group flex w-full items-center justify-between rounded-xl px-4 py-4 text-left text-lg font-medium transition-none ${
                        activeSection === link.id
                          ? 'bg-accent/10 text-accent'
                          : 'text-foreground-secondary hover:bg-background-secondary hover:text-foreground'
                      }`}
                    >
                      {link.label}
                      <span className={`h-1.5 w-1.5 rounded-full transition-none ${
                        activeSection === link.id ? 'bg-accent' : 'bg-transparent'
                      }`} />
                    </motion.button>
                    {idx < sectionLinks.length - 1 && (
                      <div className="mx-4 h-px bg-border/40" />
                    )}
                  </li>
                ))}
              </ul>

            </nav>

          </motion.div>
          </ModalSurface>
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
        aria-label={ui.settingsTitle}
        aria-expanded={settingsOpen}
        onClick={() => setSettingsOpen(!settingsOpen)}
        className="h-11 w-11 gap-1.5 p-0 lg:w-auto lg:px-3"
      >
        <span className="hidden text-xs uppercase tracking-[0.12em] lg:inline">{ui.settingsTitle}</span>
        <SlidersHorizontal className="h-4 w-4" />
        <ChevronDown
          className={`hidden h-3.5 w-3.5 transition-transform lg:block ${settingsOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {settingsOpen && (
        <div
          ref={settingsRef}
          className="absolute -right-[3.25rem] top-12 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-border bg-background-secondary/95 p-4 shadow-2xl shadow-black/25 backdrop-blur-md lg:right-0"
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
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-xs transition-none ${
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


          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-foreground-tertiary">
              {ui.theme}
            </p>
            <Button variant="outline" size="sm" className="min-h-11" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === 'dark' ? ui.light : ui.dark}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
