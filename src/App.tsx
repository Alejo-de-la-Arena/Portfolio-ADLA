import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
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
import { ExperienceDetailPage } from './components/experience/ExperienceDetailPage'
import { PortfolioModeProvider } from './context/PortfolioModeProvider'
import { LocaleProvider } from './context/LocaleProvider'

function Home() {
  const { hash } = useLocation()
  useEffect(() => { if (hash === '#experience') requestAnimationFrame(() => document.getElementById('experience')?.scrollIntoView({ block: 'start' })) }, [hash])
  return <main><Hero /><About /><Experience /><Projects /><Skills /><Contact /></main>
}

function ExperienceRoute() {
  return <><ExperienceDetailPage /><Footer /></>
}

function App() {
  return <BrowserRouter><LocaleProvider><PortfolioModeProvider><div className="relative min-h-screen scroll-smooth"><CinematicLoader /><SpotlightCursor /><Navbar /><CommandPalette /><Routes><Route path="/" element={<><Home /><Footer /></>} /><Route path="/experiencia/:slug" element={<ExperienceRoute />} /><Route path="*" element={<Home />} /></Routes><Toast /></div></PortfolioModeProvider></LocaleProvider></BrowserRouter>
}

export default App
