import type { ProjectMedia, Screenshot } from './experiences'

const screenshots = {
  'fefe-bakes-home': {
    src: '/images/experiencia/fefe-bakes/fefe-bakes-home.webp', width: 2530, height: 1274,
    alt: { es: 'Fefe Bakes: inicio con retrato de la pastelera y productos destacados, en escritorio.', en: 'Fefe Bakes: homepage with the baker’s portrait and featured products, on desktop.' },
  },
  'fefe-bakes-home-mobile': {
    src: '/images/experiencia/fefe-bakes/fefe-bakes-home-mobile.webp', width: 850, height: 1100,
    alt: { es: 'Fefe Bakes: inicio de la tienda de pastelería en móvil.', en: 'Fefe Bakes: bakery store homepage on mobile.' },
  },
  'vyzon-hero': {
    src: '/projects/vyzon/vyzon-hero.webp', width: 2560, height: 1266,
    alt: { es: 'VYZON: portada oscura con el mensaje «Tu visión. Nuestra ingeniería.» y acceso al briefing, en escritorio.', en: 'VYZON: dark homepage with the message “Tu visión. Nuestra ingeniería.” and a briefing call to action, on desktop.' },
  },
  'job-match-dashboard': {
    src: '/projects/job-match-bot/job-match-dashboard.webp', width: 2526, height: 1274,
    alt: { es: 'Job Match Bot: panel con vacantes, coincidencias y estado del perfil, en escritorio.', en: 'Job Match Bot: dashboard with jobs, matches and profile status, on desktop.' },
  },
  'job-match-dashboard-mobile': {
    src: '/projects/job-match-bot/job-match-dashboard-mobile.webp', width: 850, height: 1100,
    alt: { es: 'Job Match Bot: panel de vacantes y perfil en móvil.', en: 'Job Match Bot: jobs and profile dashboard on mobile.' },
  },
  'vyzon-hero-mobile': {
    src: '/projects/vyzon/vyzon-hero-mobile.webp', width: 850, height: 1100,
    alt: { es: 'VYZON: portada oscura con tipografía turquesa y acceso al briefing, en móvil.', en: 'VYZON: dark homepage with turquoise typography and a briefing call to action, on mobile.' },
  },
} satisfies Record<string, Screenshot>

export const screenshot = (name: keyof typeof screenshots): Screenshot => screenshots[name]
export const fefeBakesMedia: ProjectMedia = {
  desktop: screenshot('fefe-bakes-home'),
  mobile: screenshot('fefe-bakes-home-mobile'),
}
export const vyzonMedia: ProjectMedia = {
  desktop: screenshot('vyzon-hero'),
  mobile: screenshot('vyzon-hero-mobile'),
}
export const jobMatchMedia: ProjectMedia = {
  desktop: screenshot('job-match-dashboard'),
  mobile: screenshot('job-match-dashboard-mobile'),
}
