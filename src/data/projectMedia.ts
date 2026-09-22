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
  'job-match-login': {
    src: '/projects/job-match-login.png', width: 2560, height: 1278,
    alt: { es: 'JobSearchBot (JobMatch): acceso por enlace mágico con el campo de email vacío, en escritorio.', en: 'JobSearchBot (JobMatch): magic-link sign-in with an empty email field, on desktop.' },
  },
  'job-match-login-mobile': {
    src: '/projects/job-match-login-mobile.png', width: 850, height: 1100,
    alt: { es: 'JobSearchBot (JobMatch): acceso por enlace mágico con el campo de email vacío, en móvil.', en: 'JobSearchBot (JobMatch): magic-link sign-in with an empty email field, on mobile.' },
  },
} satisfies Record<string, Screenshot>

export const screenshot = (name: keyof typeof screenshots): Screenshot => screenshots[name]
export const fefeBakesMedia: ProjectMedia = {
  desktop: screenshot('fefe-bakes-home'),
  mobile: screenshot('fefe-bakes-home-mobile'),
}
export const jobSearchMedia: ProjectMedia = {
  desktop: screenshot('job-match-login'),
  mobile: screenshot('job-match-login-mobile'),
}
