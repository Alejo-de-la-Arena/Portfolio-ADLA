import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type PortfolioMode = 'recruiter' | 'deep'

interface PortfolioModeContextValue {
  mode: PortfolioMode
  isRecruiterMode: boolean
  isDeepDiveMode: boolean
  setMode: (mode: PortfolioMode) => void
  toggleMode: () => void
}

const STORAGE_KEY = 'portfolio_mode'

const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(null)

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

export function usePortfolioMode() {
  const context = useContext(PortfolioModeContext)

  if (!context) {
    throw new Error('usePortfolioMode must be used within PortfolioModeProvider')
  }

  return context
}
