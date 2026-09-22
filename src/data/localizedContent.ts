import type { Project } from '@/types'
import {
  about as aboutEs,
  personalInfo as personalInfoEs,
  projects as projectsEs,
  sectionLinks as sectionLinksEs,
  skills as skillsEs,
  socialLinks,
  enProfile,
} from './content'
import type { Locale } from '@/context/LocaleContext'

import { ownProjects } from './personalProjects'
const { personalInfo: personalInfoEn, about: aboutEn, sectionLinks: sectionLinksEn } = enProfile
const projectsEn = ownProjects.en

const EN_CARD_META: Record<string, { label: string; description: string }> = {
  frontend: { label: 'Frontend', description: 'Interfaces, animation and user experience' },
  backend: { label: 'Backend & APIs', description: 'Servers, REST APIs and integrations' },
  devops: { label: 'DevOps & Tooling', description: 'Version control, deployment and workflow' },
  cms: { label: 'CMS & Platforms', description: 'Content managers and e-commerce platforms' },
  ai: { label: 'AI & Automation', description: 'AI tools applied to professional development' },
  exploring: { label: 'Exploring', description: 'Technologies I\'m actively investing time in' },
}

const skillNamesEn: Record<string, string> = { 'CI/CD básico': 'Basic CI/CD', 'Docker (básico)': 'Docker (basic)', 'Agentes IA': 'AI agents', 'RAG básico': 'Basic RAG', 'LangChain (básico)': 'LangChain (basic)' }
const skillsEn = {
  cards: skillsEs.cards.map(card => ({
    ...card,
    ...(EN_CARD_META[card.id] ?? {}),
    ...Object.fromEntries((['core', 'strong', 'familiar'] as const).map(level => [level, card[level].map(item => ({ ...item, name: skillNamesEn[item.name] ?? item.name }))])),
  })),
}

interface LocalizedContent {
  personalInfo: typeof personalInfoEs
  socialLinks: typeof socialLinks
  sectionLinks: ReadonlyArray<{ id: string; label: string }>
  about: typeof aboutEs
  projects: Project[]
  skills: typeof skillsEs
  ui: {
    navbar: {
      talk: string
      menuLabel: string
      openSettings: string
      settingsTitle: string
      language: string
      theme: string
      light: string
      dark: string
    }
    hero: {
      viewProjects: string
      viewExperience: string
    }
    about: {
      eyebrow: string
      titleStart: string
      titleAccent: string
      highlights: string
      mindset: string
    }
    experience: {
      eyebrow: string
      titleStart: string
      titleAccent: string
      intro: string

      filters: { all: string; employment: string; freelance: string }
      sortBy: string
      sort: { default: string; relevant: string; recent: string; oldest: string; az: string }
      detail: string
      closePanel: string
      closeDetails: string
      viewSite: string
      built: string
      optimized: string
      decisions: string
      results: string
      links: string
      deliveredProjects: string
      contribution: string
      impact: string
      extraLink: string
      gallery: string
      previousImage: string
      nextImage: string
      goToImage: string
    }
    projects: {
      eyebrow: string
      titleStart: string
      titleAccent: string
      intro: string
      problem: string
      solution: string
      highlights: string
      stack: string
      metrics: string
      caseStudy: string
      role: string
      scope: string
      duration: string
      impact: string
      viewDemo: string
      viewCode: string
    }
    skills: {
      eyebrow: string
      titleStart: string
      titleAccent: string
      intro: string

      optimizeTitle: string
      showFamiliar: string
      hideFamiliar: string
    }
    contact: {
      titleStart: string
      titleAccent: string
      intro: string
      sendMessage: string
      name: string
      namePlaceholder: string
      email: string
      message: string
      messagePlaceholder: string
      sending: string
      otherWays: string
      openProfile: string
      sendWhatsApp: string
      sentOk: string
      sentError: string
      copied: string
    }
    footer: {
      availability: string
      copyEmail: string
      copyError: string
      backToTop: string
      navigation: string
      social: string
      rights: string
      madeWith: string
    }
    command: {
      title: string
      placeholder: string
      empty: string
      navigation: string
      social: string
      openGithub: string
      openLinkedin: string
      openWhatsapp: string
      tip: string
      navigate: string
      select: string
    }
    loader: {
      subtitle: string
      skip: string
    }
    modal: {
      close: string
    }
  }
}

const localizedContent: Record<Locale, LocalizedContent> = {
  es: {
    personalInfo: personalInfoEs,
    socialLinks,
    sectionLinks: sectionLinksEs,
    about: aboutEs,
    projects: projectsEs,
    skills: skillsEs,
    ui: {
      navbar: {
        talk: 'Hablemos',
        menuLabel: 'Abrir menú',
        openSettings: 'Abrir configuraciones',
        settingsTitle: 'Preferencias',
        language: 'Idioma',
        theme: 'Tema',
        light: 'Claro',
        dark: 'Oscuro',
      },
      hero: {
        viewProjects: 'Ver casos',
        viewExperience: 'Ver experiencia',
      },
      about: {
        eyebrow: 'Sobre mí',
        titleStart: 'Cómo',
        titleAccent: 'trabajo',
        highlights: 'Decisiones en proyectos',
        mindset: 'Principios de trabajo',
      },
      experience: {
        eyebrow: 'Trayectoria',
        titleStart: 'Trayectoria',
        titleAccent: 'profesional',
        intro:
          'Trabajo profesionalmente desde abril de 2024, combinando proyectos independientes y experiencia dentro de una agencia de servicios web: Zetenta.',

        filters: { all: 'Todo', employment: 'Empresa', freelance: 'Freelance' },
        sortBy: 'Ordenar por',
        sort: {
          default: 'Predeterminado',
          relevant: 'Más relevantes',
          recent: 'Más recientes',
          oldest: 'Más antiguas',
          az: 'A-Z',
        },
        detail: 'Ver detalle',
        closePanel: 'Cerrar panel de experiencia',
        closeDetails: 'Cerrar detalles',
        viewSite: 'Ver sitio',
        built: 'Qué construí',
        optimized: 'Qué optimicé',
        decisions: 'Decisiones técnicas',
        results: 'Resultados',
        links: 'Enlaces',
        deliveredProjects: 'Proyectos realizados',
        contribution: 'Contribución',
        impact: 'Estado y alcance',
        extraLink: 'Link adicional',
        gallery: 'Galería',
        previousImage: 'Imagen anterior',
        nextImage: 'Imagen siguiente',
        goToImage: 'Ir a imagen',
      },
      projects: {
        eyebrow: 'Proyectos propios',
        titleStart: 'Proyectos',
        titleAccent: 'propios',
        intro: 'Construyo herramientas para necesidades propias y pruebo ideas con briefs ficticios. En Job Match Bot y VYZON podés ver qué está implementado, cómo lo resolví y qué sigue abierto.',
        problem: 'Problema',
        solution: 'Solución',
        highlights: 'Puntos clave',
        stack: 'Stack',
        metrics: 'Decisiones de implementación',
        caseStudy: 'Caso',
        role: 'Rol',
        scope: 'Alcance',
        duration: 'Duración',
        impact: 'Estado y alcance',
        viewDemo: 'Ver proyecto',
        viewCode: 'Ver código',
      },
      skills: {
        eyebrow: 'Mapa de habilidades',
        titleStart: 'Capacidades por',
        titleAccent: 'nivel de profundidad',
        intro: 'Tecnologías que uso y otras que estoy explorando.',

        optimizeTitle: 'Qué optimizo en cada proyecto',
        showFamiliar: 'Ver más',
        hideFamiliar: 'Ver menos',
      },
      contact: {
        titleStart: 'Trabajemos',
        titleAccent: 'juntos',
        intro: 'Si buscás sumar un desarrollador a tu equipo, escribime con el rol y la modalidad. También podemos conversar sobre un proyecto freelance.',
        sendMessage: 'Enviar mensaje',
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        email: 'Email',
        message: 'Mensaje',
        messagePlaceholder: 'Contame sobre el puesto, el equipo o el proyecto...',
        sending: 'Enviando...',
        otherWays: 'Otras formas de contacto',
        openProfile: 'Abrir perfil',
        sendWhatsApp: 'Enviar mensaje',
        sentOk: '¡Mensaje enviado! Te responderé pronto.',
        sentError: 'Error al enviar. Por favor intentá de nuevo.',
        copied: 'Email copiado al portapapeles',
      },
      footer: {
        availability: 'Disponible para nuevas oportunidades',
        copyEmail: 'Copiar email',
        copyError: 'No se pudo copiar. Podés seleccionar el email y copiarlo manualmente.',
        backToTop: 'Volver arriba',
        navigation: 'Navegación',
        social: 'Redes',
        rights: 'Todos los derechos reservados.',
        madeWith: 'Hecho con React, TypeScript, Tailwind y OGL',
      },
      command: {
        title: 'Menú de comandos',
        placeholder: 'Buscar secciones o links...',
        empty: 'No se encontraron resultados',
        navigation: 'Navegación',
        social: 'Redes',
        openGithub: 'Abrir GitHub',
        openLinkedin: 'Abrir LinkedIn',
        openWhatsapp: 'Abrir WhatsApp',
        tip: 'Tip: Presioná Ctrl+K para abrir',
        navigate: 'navegar',
        select: 'seleccionar',
      },
      loader: {
        subtitle: 'Full Stack con foco en Frontend',
        skip: 'Omitir',
      },
      modal: {
        close: 'Cerrar modal',
      },
    },
  },
  en: {
    personalInfo: personalInfoEn,
    socialLinks,
    sectionLinks: sectionLinksEn,
    about: aboutEn,
    projects: projectsEn,
    skills: skillsEn,
    ui: {
      navbar: {
        talk: "Let's talk",
        menuLabel: 'Open menu',
        openSettings: 'Open settings',
        settingsTitle: 'Preferences',
        language: 'Language',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
      },
      hero: {
        viewProjects: 'View selected work',
        viewExperience: 'View experience',
      },
      about: {
        eyebrow: 'About',
        titleStart: 'How I',
        titleAccent: 'work',
        highlights: 'Project decisions',
        mindset: 'Working principles',
      },
      experience: {
        eyebrow: 'Experience',
        titleStart: 'Professional',
        titleAccent: 'experience',
        intro:
          'I have worked professionally since April 2024, combining independent projects with experience at a web services agency: Zetenta.',

        filters: { all: 'All', employment: 'Company', freelance: 'Freelance' },
        sortBy: 'Sort by',
        sort: {
          default: 'Default',
          relevant: 'Most relevant',
          recent: 'Most recent',
          oldest: 'Oldest',
          az: 'A-Z',
        },
        detail: 'View details',
        closePanel: 'Close experience panel',
        closeDetails: 'Close details',
        viewSite: 'View site',
        built: 'What I built',
        optimized: 'What I optimized',
        decisions: 'Technical decisions',
        results: 'Results',
        links: 'Links',
        deliveredProjects: 'Delivered projects',
        contribution: 'Contribution',
        impact: 'Status and scope',
        extraLink: 'Additional link',
        gallery: 'Gallery',
        previousImage: 'Previous image',
        nextImage: 'Next image',
        goToImage: 'Go to image',
      },
      projects: {
        eyebrow: 'Personal projects',
        titleStart: 'Personal',
        titleAccent: 'projects',
        intro: 'I build tools for my own needs and test ideas through fictional briefs. In Job Match Bot and VYZON, you can see what is implemented, how I built it, and what remains open.',
        problem: 'Problem',
        solution: 'Solution',
        highlights: 'Key points',
        stack: 'Stack',
        metrics: 'Implementation decisions',
        caseStudy: 'Case',
        role: 'Role',
        scope: 'Scope',
        duration: 'Duration',
        impact: 'Status and scope',
        viewDemo: 'View demo',
        viewCode: 'View code',
      },
      skills: {
        eyebrow: 'Skills map',
        titleStart: 'Capabilities by',
        titleAccent: 'depth level',
        intro: 'Technologies I use and others I’m exploring.',

        optimizeTitle: 'What I optimize in every project',
        showFamiliar: 'See more',
        hideFamiliar: 'See less',
      },
      contact: {
        titleStart: "Let's work",
        titleAccent: 'together',
        intro: 'If you’re hiring a developer, send me the role and working arrangement. I’m also available to discuss freelance projects.',
        sendMessage: 'Send message',
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        message: 'Message',
        messagePlaceholder: 'Tell me about the role, team, or project...',
        sending: 'Sending...',
        otherWays: 'Other contact options',
        openProfile: 'Open profile',
        sendWhatsApp: 'Send message',
        sentOk: 'Message sent! I will get back to you soon.',
        sentError: 'Error sending message. Please try again.',
        copied: 'Email copied to clipboard',
      },
      footer: {
        availability: 'Open to new opportunities',
        copyEmail: 'Copy email',
        copyError: 'Could not copy. You can select the email and copy it manually.',
        backToTop: 'Back to top',
        navigation: 'Navigation',
        social: 'Social',
        rights: 'All rights reserved.',
        madeWith: 'Built with React, TypeScript, Tailwind, and OGL',
      },
      command: {
        title: 'Command menu',
        placeholder: 'Search sections or links...',
        empty: 'No results found',
        navigation: 'Navigation',
        social: 'Social',
        openGithub: 'Open GitHub',
        openLinkedin: 'Open LinkedIn',
        openWhatsapp: 'Open WhatsApp',
        tip: 'Tip: Press Ctrl+K to open',
        navigate: 'navigate',
        select: 'select',
      },
      loader: {
        subtitle: 'Full Stack focused on Frontend',
        skip: 'Skip',
      },
      modal: {
        close: 'Close modal',
      },
    },
  },
}

export function getLocalizedContent(locale: Locale) {
  return localizedContent[locale]
}
