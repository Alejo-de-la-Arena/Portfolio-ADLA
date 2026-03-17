import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

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
