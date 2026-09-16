import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { PortfolioModeContext, type PortfolioMode } from './PortfolioModeContext'

const STORAGE_KEY = 'portfolio_mode'

export function PortfolioModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>('recruiter')

  useEffect(() => {
    const savedMode = window.localStorage.getItem(STORAGE_KEY)
    if (savedMode === 'recruiter' || savedMode === 'deep') {
      setModeState(savedMode)
    }
  }, [])

  const setMode = useCallback((nextMode: PortfolioMode) => {
    setModeState(nextMode)
    window.localStorage.setItem(STORAGE_KEY, nextMode)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === 'recruiter' ? 'deep' : 'recruiter')
  }, [mode, setMode])

  const value = useMemo(
    () => ({
      mode,
      isRecruiterMode: mode === 'recruiter',
      isDeepDiveMode: mode === 'deep',
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode]
  )

  return <PortfolioModeContext.Provider value={value}>{children}</PortfolioModeContext.Provider>
}

