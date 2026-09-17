import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CommandPalette } from './components/layout/CommandPalette'
import { SpotlightCursor } from './components/effects/SpotlightCursor'
import { Toast } from './components/ui/Toast'
import { Hero } from './components/sections/Hero'
import { SelectedCases } from './components/sections/SelectedCases'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Contact } from './components/sections/Contact'
import { ExperienceDetailPage } from './components/experience/ExperienceDetailPage'
import { LocaleProvider } from './context/LocaleProvider'

function Home() {
  const { hash } = useLocation()
  useEffect(() => { if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })) }, [hash])
  return <main>
    <Hero />
    <SelectedCases />
    <Experience />
    <About />
    <Projects />
    <Skills />
    <Contact />
  </main>
}

function ExperienceRoute() {
  return <>
    <ExperienceDetailPage />
    <Footer />
  </>
}

function App() {
  useEffect(() => {
    // Remove the retired preference; the site now has one reading experience.
    try { window.localStorage.removeItem('portfolio_mode') } catch { /* Storage may be disabled. */ }
  }, [])
  return <BrowserRouter>
    <LocaleProvider>
        <div className="relative min-h-screen scroll-smooth">
          <SpotlightCursor />
          <Navbar />
          <CommandPalette />
          <Routes>
            <Route path="/" element={<>
              <Home />
              <Footer />
            </>} />
            <Route path="/experiencia/:slug" element={<ExperienceRoute />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Toast />
        </div>
    </LocaleProvider>
  </BrowserRouter>
}

export default App
