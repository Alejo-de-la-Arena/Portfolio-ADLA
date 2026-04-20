import { useMemo } from 'react'
import { getLocalizedContent } from '@/data/localizedContent'
import { useLocale } from '@/context/LocaleContext'

export function useLocalizedContent() {
  const { locale } = useLocale()

  return useMemo(() => getLocalizedContent(locale), [locale])
}
