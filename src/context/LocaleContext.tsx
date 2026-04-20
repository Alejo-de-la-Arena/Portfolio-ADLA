import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'es' | 'en'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  isSpanish: boolean
}

const STORAGE_KEY = 'portfolio_locale'

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'es' || stored === 'en') {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
    window.localStorage.setItem(STORAGE_KEY, nextLocale)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'es' ? 'en' : 'es')
  }, [locale, setLocale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      isSpanish: locale === 'es',
    }),
    [locale, setLocale, toggleLocale]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}
