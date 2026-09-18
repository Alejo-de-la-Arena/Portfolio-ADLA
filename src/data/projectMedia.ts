import type { ProjectMedia, Screenshot } from './experiences'

const screenshots = {
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
export const jobSearchMedia: ProjectMedia = {
  desktop: screenshot('job-match-login'),
  mobile: screenshot('job-match-login-mobile'),
}
