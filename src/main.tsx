import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { motionTokens } from './lib/motion'

// CSS micro-interactions and Motion share the same source of truth.
for (const [name, seconds] of Object.entries(motionTokens.duration)) {
  document.documentElement.style.setProperty(`--motion-${name}`, `${seconds}s`)
}
for (const [name, curve] of Object.entries(motionTokens.ease)) {
  document.documentElement.style.setProperty(`--motion-${name}`, `cubic-bezier(${curve.join(',')})`)
}
document.documentElement.style.setProperty('--motion-hover', String(motionTokens.interaction.hoverScale))
document.documentElement.style.setProperty('--motion-press', String(motionTokens.interaction.pressScale))

// Inicializar EmailJS
import { init } from '@emailjs/browser'
import { emailConfig } from './data/content'

// Inicializar con public key de EmailJS
init(emailConfig.publicKey)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
