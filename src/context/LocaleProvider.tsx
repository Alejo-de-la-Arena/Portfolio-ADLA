import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LocaleContext, type Locale } from './LocaleContext'

const STORAGE_KEY = 'portfolio_locale'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'es' || stored === 'en') {
      setLocaleState(stored)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

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

