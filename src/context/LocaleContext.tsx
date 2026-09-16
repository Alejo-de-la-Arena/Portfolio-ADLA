import { createContext, useContext } from 'react'
export type Locale = 'es' | 'en'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  isSpanish: boolean
}



export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}
