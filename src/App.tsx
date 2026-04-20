import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CommandPalette } from './components/layout/CommandPalette'
import { SpotlightCursor } from './components/effects/SpotlightCursor'
import { CinematicLoader } from './components/effects/CinematicLoader'
import { Toast } from './components/ui/Toast'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Contact } from './components/sections/Contact'
import { PortfolioModeProvider } from './context/PortfolioModeContext'
import { LocaleProvider } from './context/LocaleContext'

function App() {
  return (
    <LocaleProvider>
      <PortfolioModeProvider>
        <div className="relative min-h-screen scroll-smooth">
          <CinematicLoader />
          <SpotlightCursor />
          <Navbar />
          <CommandPalette />

          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>

          <Footer />
          <Toast />
        </div>
      </PortfolioModeProvider>
    </LocaleProvider>
  )
}

export default App
