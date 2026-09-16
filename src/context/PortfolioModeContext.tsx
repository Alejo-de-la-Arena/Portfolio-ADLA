import { createContext, useContext } from 'react'
export type PortfolioMode = 'recruiter' | 'deep'

interface PortfolioModeContextValue {
  mode: PortfolioMode
  isRecruiterMode: boolean
  isDeepDiveMode: boolean
  setMode: (mode: PortfolioMode) => void
  toggleMode: () => void
}



export const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(null)

export function usePortfolioMode() {
  const context = useContext(PortfolioModeContext)

  if (!context) {
    throw new Error('usePortfolioMode must be used within PortfolioModeProvider')
  }

  return context
}
