import type { Experience, Project } from '@/types'
import {
  about as aboutEs,
  experience as experienceEs,
  modeLabels as modeLabelsEs,
  optimizationFocus as optimizationFocusEs,
  personalInfo as personalInfoEs,
  projectSortLabels as projectSortLabelsEs,
  projects as projectsEs,
  sectionLinks as sectionLinksEs,
  skillExamples as skillExamplesEs,
  skills as skillsEs,
  socialLinks,
} from './content'
import type { Locale } from '@/context/LocaleContext'

const personalInfoEn = {
  ...personalInfoEs,
  role: 'Full Stack Developer · Frontend Specialist',
  tagline: 'Solid interfaces, clear product thinking, and impact-driven technical execution.',
  valueLine: 'I build fast, clear interfaces with obsessive attention to detail.',
  recruiterSummary:
    'I build high-impact web products with a focus on performance, UX, and technical decisions that move business metrics.',
  deepDiveSummary:
    'I design and build high-complexity frontend experiences for product teams: from architecture and design systems to optimization, observability, and continuous iteration.',
  bio: 'Full Stack Developer focused on frontend, product architecture, and high-quality digital experiences.',
  location: 'Buenos Aires, Argentina',
  availability: 'Available for freelance projects and remote roles',
}

const sectionLinksEn = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

const modeLabelsEn = {
  recruiter: 'Quick profile',
  deep: 'Deep dive',
}

const projectSortLabelsEn = {
  featured: 'Featured',
  latest: 'Latest',
  impact: 'Impact',
}

const aboutEn = {
  description:
    'I design and build interfaces with product criteria: fast, clear, and maintainable. I work closely with design and business so what ships gets used and scales.',
  highlights: [
    {
      title: 'End-to-end interfaces (UI/UX)',
      desc: 'I define structure, hierarchy, components, and states (empty/loading/error) for a consistent user experience.',
    },
    {
      title: 'Scalable frontend architecture',
      desc: 'Component systems, design tokens, routing, and state patterns that support growth without piling up technical debt.',
    },
    {
      title: 'Intentional motion (not decorative)',
      desc: 'Transitions, microinteractions, and scroll reveals that improve readability and feedback while protecting performance.',
    },
    {
      title: 'Product-backend integration',
      desc: 'Auth, APIs, and data models when the flow requires it, ensuring consistency between UI and business logic.',
    },
    {
      title: 'Quality in critical flows',
      desc: 'Validation, error handling, edge cases, and testing where it matters most: login, forms, checkout, and admin.',
    },
  ],
  mindset: [
    {
      title: 'Experience over visual noise',
      desc: 'Every interaction should be clear: immediate feedback, explicit states, and minimal friction.',
    },
    {
      title: 'Clear communication and trade-offs',
      desc: 'I align scope, priorities, and trade-offs with design/product/dev to avoid rework.',
    },
    {
      title: 'Maintainable code by default',
      desc: 'Good practices, clear naming, and reusable components so teams can iterate with confidence.',
    },
    {
      title: 'Accessibility and visual craft',
      desc: 'Contrast, keyboard support, focus states, and typographic hierarchy. Premium feel, usable for everyone.',
    },
    {
      title: 'Incremental and controlled delivery',
      desc: 'I iterate in small steps, validate early, and reduce risk with reversible changes.',
    },
  ],
}

const experienceEn: Experience[] = [
  {
    ...experienceEs[0],
    period: 'Sep 2025 - Nov 2025 (3 months)',
    location: 'Buenos Aires Province, Argentina (remote)',
    summary:
      'I designed and developed Espacio BOA’s web platform (specialty coffee + holistic center), unifying gastronomy, spaces, and activities/events scheduling into a single product experience. I delivered the product from zero to production, including an internal panel to operate content and sales (gift cards included), plus a clear user journey to explore, register, and manage bookings.',
    achievements: [
      'Interactive food menu + spaces module with navigation and readability-first UX.',
      'Unified activities/events calendar (date/time/capacity/status) with complete detail.',
      'End-to-end registrations with validations, capacity control, confirmations, and user-account management.',
      'Digital Gift Cards with issuance, redemption, traceability, and reuse prevention.',
      'Internal CRUD panel to operate activities/events, content, and gift cards without developer dependency.',
    ],
    details: {
      ...experienceEs[0].details,
      built: [
        'Interactive food menu (categorized, mobile-first reading).',
        'Spaces section (environments/use cases with practical information).',
        'Activities/events system with operational states: visibility, capacity, schedules, and content.',
        'Complete calendar rendering active activities/events with key context (date, time, capacity/participants, detail).',
        'Registrations with validations, capacity control, and confirmations.',
        'User panel to review registrations (activities/events), inspect details, and cancel when applicable.',
        'Digital Gift Cards: issuance/administration, unique code, validation/redemption, and state traceability.',
        'Complete authentication (login/register/sessions) and access control.',
        'Internal CRUD panel (activities/events/gift cards) tailored for day-to-day operations.',
      ],
      optimized: [
        'Front-back consistency in states, validations, and error handling for critical flows (registrations, capacity, redemption).',
      ],
      decisions: [
        'Operational-state modeling and rule design for real content management logic (capacity, visibility, dates, cancellations).',
        'UI architecture focused on fast exploration, hierarchy, and mobile-first navigation.',
        'Front-back integration with data consistency and predictable error handling.',
      ],
      results: ['Production-ready product with autonomous internal operations and complete user registration flows.'],
      links: [{ label: 'Espacio BOA', href: 'https://espacioboa.com/' }],
    },
  },
  {
    ...experienceEs[1],
    role: 'Web Developer',
    period: 'Apr 2025 - Oct 2025 (7 months)',
    location: 'Buenos Aires Province, Argentina (hybrid)',
    summary:
      'I delivered pixel-perfect frontends and custom WordPress websites (Gutenberg + ACF), leading the Figma-to-code workflow and building reusable components. I prioritized performance, accessibility, and technical SEO, testing across breakpoints and devices with phased deliveries together with design.',
    achievements: [
      'Pixel-perfect frontends from Figma and reusable components.',
      'Custom WordPress sites with Gutenberg + ACF.',
      'Performance, accessibility, and technical SEO integrated into delivery.',
      'Mobile-first and true responsive implementation (360px to desktop) with fine breakpoint tuning.',
    ],
    details: {
      ...experienceEs[1].details,
      built: [
        'Custom WordPress websites using Gutenberg + ACF.',
        'Reusable components and scalable templates.',
      ],
      optimized: ['Performance, accessibility, and technical SEO in production environments.'],
      decisions: ['Figma-to-code flow with visual precision and maintainability as first-class goals.'],
      results: ['Component reuse accelerated new page delivery and post-launch iteration.'],
      links: [{ label: 'Zetenta Portfolio', href: 'https://www.zetenta.com/web/es/portfolio/' }],
    },
  },
  {
    ...experienceEs[2],
    period: 'Feb 2026 - Apr 2026',
    location: 'Argentina · Remote',
    summary:
      'Design and implementation of a complete e-commerce system integrated into SOLUTION’s existing website, an Argentine fragrance brand. Scope includes product catalog, checkout with NAVE payments, dual shipping logic by region (AMBA + Correo Argentino), and a wholesale portal with access levels by plan. Project completed and pending publication.',
    achievements: [
      'End-to-end purchase flow (catalog -> cart -> checkout) integrated with NAVE payment gateway.',
      'Dual shipping logic: internal delivery for AMBA and Correo Argentino for the rest of the country.',
      'Wholesale portal with account request/approval and plan-based dashboard (Starter / Pro / Elite).',
      'Strict separation between retail and wholesale business rules to avoid logic collisions.',
    ],
    details: {
      ...experienceEs[2].details,
      built: [
        'Product catalog with filters, item detail, and stock handling for shopping UX.',
        'Persistent cart with quantities, variants, and real-time order summary.',
        'Checkout with native NAVE integration: payment preference generation, state handling, and user feedback.',
        'Region-based shipping selection and cost logic (AMBA internal delivery vs Correo Argentino).',
        'Wholesale portal end-to-end: request form, approval workflow, authentication, and plan-specific dashboard.',
      ],
      optimized: [
        'Checkout states explicitly modeled to reduce friction and abandonment.',
        'Client/server validations to ensure data consistency before order processing.',
        'Error recovery with clear messaging without losing cart context.',
      ],
      decisions: [
        'Strict business separation for retail vs wholesale flows, pricing, and shipping rules.',
        'NAVE selected for local market fit and clear integration documentation.',
        'Wholesale plan system designed to be extensible with minimal structural changes.',
      ],
      results: [
        'Production-ready system covering the full purchasing cycle for retail and wholesale customers.',
        'Client receives operational capability at launch: catalog, payments, shipping, and wholesale management.',
      ],
      links: [{ label: 'Website (coming soon)', href: 'https://' }],
    },
  },
  {
    ...experienceEs[3],
    role: 'WordPress Developer',
    period: 'Nov 2024 - Apr 2025 (part-time)',
    location: 'Argentina (remote)',
    summary:
      'Website optimization (performance, SEO, and best practices), structural and functional updates for better UX/UI, and campaign landing pages focused on conversion.',
    achievements: [
      'Site optimization across performance, SEO, and best practices.',
      'Structural/functional updates to improve user experience and interface quality.',
      'Landing pages for marketing campaigns focused on conversion.',
    ],
    details: {
      ...experienceEs[3].details,
      built: [
        'Campaign landing pages focused on conversion.',
        'Structural and functional updates improving UX/UI.',
      ],
      optimized: ['Performance, SEO, and best practices.'],
      decisions: ['Short iteration cycles to validate quickly without breaking production.'],
      results: ['Sustained quality improvements for campaigns and daily navigation.'],
      links: [{ label: 'Website', href: 'https://' }],
    },
  },
  {
    ...experienceEs[4],
    period: 'Oct 2024 - Dec 2024',
    location: 'Argentina (remote)',
    summary:
      'Custom e-commerce for a client. Frontend with ReactJS and backend with Node/Express + PostgreSQL (Sequelize).',
    achievements: [
      'Frontend: ReactJS + HTML/CSS + Axios + Redux.',
      'Backend: NodeJS + Express + PostgreSQL + Sequelize.',
      'Custom full-stack e-commerce implementation.',
    ],
    details: {
      ...experienceEs[4].details,
      built: [
        'Frontend: ReactJS + HTML/CSS + Axios + Redux.',
        'Backend: NodeJS + Express + PostgreSQL + Sequelize.',
        'Custom e-commerce for client requirements.',
      ],
      optimized: ['State and request structure to keep UI interactions fluid.'],
      decisions: ['Clear frontend/backend separation of responsibilities.'],
      results: ['Functional base ready to evolve catalog, orders, and content.'],
      links: [{ label: 'Website (pending)', href: 'https://' }],
    },
  },
  {
    ...experienceEs[5],
    period: 'In development (near production)',
    location: 'Argentina (remote)',
    summary:
      'Project for MDV: full CRUD to manage projects (images + info) with private admin-only login. Near production, not published yet.',
    achievements: [
      'Full CRUD for projects with images and metadata.',
      'Private admin-only authentication flow.',
      'Final stage before production release.',
    ],
    details: {
      ...experienceEs[5].details,
      built: [
        'Full CRUD to manage projects (images + information).',
        'Private login restricted to admin users.',
      ],
      optimized: ['Create/edit workflow designed for daily operational usage.'],
      decisions: ['Separation between public website and private admin panel for clarity and security.'],
      results: ['Project is near production (not publicly published yet).'],
      links: [{ label: 'Website (pending)', href: 'https://' }],
    },
  },
]

const projectsEn: Project[] = [
  {
    ...projectsEs[0],
    title: 'TaskFlow - Product Landing (SaaS)',
    role: 'Frontend Developer · Vyzon (web services agency)',
    scope: 'Marketing one-page · Hero -> Pricing -> FAQ · Motion · SEO',
    timeline: 'End-to-end landing implementation',
    impact: 'Production-ready landing · performance and accessibility criteria defined in repository',
    description:
      'Built at Vyzon, my web services agency, to practice frontend architecture, motion, and conversion-oriented copy over a fictitious brief: TaskFlow, a task-management SaaS for remote teams of 5-50 people.',
    problem:
      'The fictitious product brief required positioning against generic task tools through a one-page narrative with clear value, differentiation, social proof, pricing, FAQ, and a strong closing CTA.',
    solution:
      'I built a complete marketing one-page flow with Hero -> problem/solution -> features -> social proof -> pricing toggle -> FAQ accordion -> CTA, plus full shell (scroll progress, reactive background, anchor header, multi-column footer), dynamic hero mock loading, GSAP motion with reduced-motion handling, and SEO/social metadata.',
    tags: ['SaaS', 'Next.js', 'GSAP', 'Landing', 'Accessibility'],
    highlights: [
      'Site shell with scroll progress, custom cursor, anchor navigation, and structured footer.',
      'Advanced hero with masked heading reveal, board-style mock, and desktop scroll cue.',
      'Production-oriented motion: timelines, ScrollTrigger, quickTo interactions, and reduced-motion fallback.',
      'Reusable Tailwind token system plus Framer Motion where lightweight interactions fit best.',
    ],
    metrics: [
      'JavaScript budget documented in README (~145 kB first load, target ~<=160 kB).',
      'Explicit quality goals: Lighthouse performance >=90 and accessibility >=95 (validated in production).',
      'Strict TypeScript check (`tsc --noEmit`) aligned with current code state.',
    ],
    decisions: [
      'GSAP + ScrollTrigger for premium motion; Framer Motion for simpler interaction patterns.',
      'Marketing copy separated from UI structure to accelerate content iteration.',
      'Deferred hero-heavy component and transform/opacity-first animations for render efficiency.',
      'SEO/social setup with metadataBase, OG, Twitter card, favicon, and themeColor.',
    ],
    results: [
      'Reusable baseline for SaaS/B2B landing delivery at agency level.',
      'Deploy-ready deliverable for Vercel-like platforms with clear performance and a11y validation targets.',
    ],
    caseStudy:
      'Built as an internal Vyzon project to simulate a real SaaS commercial landing workflow end-to-end. The product is fictitious, but the implementation standards (architecture, motion quality, accessibility, and technical SEO) match real client delivery.',
  },
  {
    ...projectsEs[1],
    title: 'Reference - real case (pending 1)',
    role: 'To be defined',
    scope: 'To be defined',
    timeline: '-',
    impact: 'To be documented',
    description: 'Reserved slot for the next real project case with full narrative and validated metrics.',
    problem: 'This section will be completed once the next real case is ready.',
    solution: 'Replace title, narrative, highlights, and tech stack with verified project information.',
    tags: ['Coming soon'],
    highlights: ['Reserved for future case', 'Metrics and links pending', 'Live/repo references to be added'],
    technologies: ['To be defined'],
  },
  {
    ...projectsEs[2],
    title: 'Reference - real case (pending 2)',
    role: 'To be defined',
    scope: 'To be defined',
    timeline: '-',
    impact: 'To be documented',
    description: 'Second reserved slot for another real project case ready to replace later.',
    problem: 'This section will be completed once the second additional case is ready.',
    solution: 'Use the same structure as the rest of projects: clear problem, solution, stack, and outcomes.',
    tags: ['Coming soon'],
    highlights: ['Reserved for future case', 'Metrics and links pending', 'Live/repo references to be added'],
    technologies: ['To be defined'],
  },
]

const skillsEn = {
  frontend: {
    ...skillsEs.frontend,
    label: 'Frontend Development',
  },
  backend: {
    ...skillsEs.backend,
    label: 'Backend & APIs',
  },
  devops: {
    ...skillsEs.devops,
    label: 'DevOps & Tooling',
  },
  testing: {
    ...skillsEs.testing,
    label: 'Testing & Quality',
  },
}

const skillExamplesEn: Record<string, string> = {
  React: 'Domain-driven UI architecture, predictable state, and optimized rendering.',
  TypeScript: 'Strict contracts to scale teams and reduce regressions.',
  'Framer Motion': 'Narrative transitions with intent and progressive degradation.',
  GraphQL: 'Data normalization patterns for complex, low-latency perceived UIs.',
  Playwright: 'Critical flow coverage for high-confidence releases.',
  TailwindCSS: 'Consistent interface systems that are fast to iterate and maintain.',
}

const optimizationFocusEn = [
  {
    icon: '⚡',
    title: 'Performance',
    description: 'Core Web Vitals, lazy loading, code splitting, and image optimization',
  },
  {
    icon: '♿',
    title: 'Accessibility',
    description: 'WCAG 2.1, semantic HTML, keyboard navigation, and screen readers',
  },
  {
    icon: '🛠️',
    title: 'Developer Experience',
    description: 'Type safety, maintainable code, documentation, and productivity focus',
  },
  {
    icon: '🎨',
    title: 'UI/UX',
    description: 'Microinteractions, responsive design, and intentional motion',
  },
]

interface LocalizedContent {
  personalInfo: typeof personalInfoEs
  socialLinks: typeof socialLinks
  sectionLinks: ReadonlyArray<{ id: string; label: string }>
  modeLabels: typeof modeLabelsEs
  projectSortLabels: typeof projectSortLabelsEs
  about: typeof aboutEs
  experience: Experience[]
  projects: Project[]
  skills: typeof skillsEs
  skillExamples: Record<string, string>
  optimizationFocus: typeof optimizationFocusEs
  ui: {
    navbar: {
      talk: string
      menuLabel: string
      openSettings: string
      settingsTitle: string
      language: string
      readingMode: string
      theme: string
      light: string
      dark: string
    }
    hero: {
      move: string
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
      recruiterIntro: string
      deepIntro: string
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
      recruiterIntro: string
      deepIntro: string
      featuredProject: string
      searchPlaceholder: string
      searchAria: string
      allTags: string
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
      recruiterIntro: string
      deepIntro: string
      optimizeTitle: string
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
    modeToggle: {
      recruiter: string
      deep: string
      aria: string
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
    modeLabels: modeLabelsEs,
    projectSortLabels: projectSortLabelsEs,
    about: aboutEs,
    experience: experienceEs,
    projects: projectsEs,
    skills: skillsEs,
    skillExamples: skillExamplesEs,
    optimizationFocus: optimizationFocusEs,
    ui: {
      navbar: {
        talk: 'Hablemos',
        menuLabel: 'Abrir menú',
        openSettings: 'Abrir configuraciones',
        settingsTitle: 'Preferencias',
        language: 'Idioma',
        readingMode: 'Modo de lectura',
        theme: 'Tema',
        light: 'Claro',
        dark: 'Oscuro',
      },
      hero: {
        move: 'Move',
        viewProjects: 'Ver proyectos',
        viewExperience: 'Ver experiencia',
      },
      about: {
        eyebrow: 'Sobre mí',
        titleStart: 'Visión de producto,',
        titleAccent: 'ejecución técnica',
        highlights: 'Lo que mejor ejecuto',
        mindset: 'Principios de trabajo',
      },
      experience: {
        eyebrow: 'Experiencia',
        titleStart: 'Experiencia',
        titleAccent: 'profesional',
        recruiterIntro:
          'Construyo productos web de punta a punta con foco en experiencia de usuario y calidad de ejecución: UI prolija, buenas prácticas y flows que cierran.',
        deepIntro:
          'Mi recorrido mezcla freelance y trabajo en equipo en empresa. Cuando el contexto lo requiere, cubro proceso completo: interfaz, estados, implementación y escalabilidad.',
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
        impact: 'Impacto',
        extraLink: 'Link adicional',
        gallery: 'Galería',
        previousImage: 'Imagen anterior',
        nextImage: 'Imagen siguiente',
        goToImage: 'Ir a imagen',
      },
      projects: {
        eyebrow: 'Proyectos',
        titleStart: 'Proyectos con',
        titleAccent: 'impacto medible',
        recruiterIntro: 'Vista compacta para validar impacto, rol y stack en segundos.',
        deepIntro: 'Vista de análisis: problema, solución, decisiones de arquitectura y resultados por proyecto.',
        featuredProject: 'Proyecto destacado',
        searchPlaceholder: 'Buscar por nombre, tag, año o rol...',
        searchAria: 'Buscar proyecto',
        allTags: 'Todos',
        problem: 'Problema',
        solution: 'Solución',
        highlights: 'Puntos clave',
        stack: 'Stack',
        metrics: 'Métricas',
        caseStudy: 'Caso',
        role: 'Rol',
        scope: 'Alcance',
        duration: 'Duración',
        impact: 'Impacto',
        viewDemo: 'Ver demo',
        viewCode: 'Ver código',
      },
      skills: {
        eyebrow: 'Mapa de habilidades',
        titleStart: 'Capacidades por',
        titleAccent: 'nivel de profundidad',
        recruiterIntro: 'Core, strong y familiar para validar encaje de stack rápidamente.',
        deepIntro: 'Vista técnica para entender cómo aplico cada tecnología en producto real.',
        optimizeTitle: 'Qué optimizo en cada proyecto',
      },
      contact: {
        titleStart: 'Trabajemos',
        titleAccent: 'juntos',
        intro: 'Si tenés un proyecto en mente, escribime. Te respondo rápido y con propuesta concreta.',
        sendMessage: 'Enviar mensaje',
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        email: 'Email',
        message: 'Mensaje',
        messagePlaceholder: 'Contame en qué te puedo ayudar...',
        sending: 'Enviando...',
        otherWays: 'Otras formas de contacto',
        openProfile: 'Abrir perfil',
        sendWhatsApp: 'Enviar mensaje',
        sentOk: '¡Mensaje enviado! Te responderé pronto.',
        sentError: 'Error al enviar. Por favor intentá de nuevo.',
        copied: 'Email copiado al portapapeles',
      },
      footer: {
        navigation: 'Navegación',
        social: 'Redes',
        rights: 'Todos los derechos reservados.',
        madeWith: 'Hecho con React, TypeScript, Tailwind y Three.js',
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
      modeToggle: {
        recruiter: 'Reclutador',
        deep: 'Detalle',
        aria: 'Selector de modo de lectura del portfolio',
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
    modeLabels: modeLabelsEn,
    projectSortLabels: projectSortLabelsEn,
    about: aboutEn,
    experience: experienceEn,
    projects: projectsEn,
    skills: skillsEn,
    skillExamples: skillExamplesEn,
    optimizationFocus: optimizationFocusEn,
    ui: {
      navbar: {
        talk: "Let's talk",
        menuLabel: 'Open menu',
        openSettings: 'Open settings',
        settingsTitle: 'Preferences',
        language: 'Language',
        readingMode: 'Reading mode',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
      },
      hero: {
        move: 'Move',
        viewProjects: 'View projects',
        viewExperience: 'View experience',
      },
      about: {
        eyebrow: 'About',
        titleStart: 'Product vision,',
        titleAccent: 'technical execution',
        highlights: 'What I execute best',
        mindset: 'Working principles',
      },
      experience: {
        eyebrow: 'Experience',
        titleStart: 'Professional',
        titleAccent: 'experience',
        recruiterIntro:
          'I build web products end to end with focus on user experience and execution quality: polished UI, sound practices, and complete flows.',
        deepIntro:
          'My path combines freelance projects and in-company teamwork. Depending on context, I cover the full process: interface definition, state modeling, implementation, and scalability readiness.',
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
        impact: 'Impact',
        extraLink: 'Additional link',
        gallery: 'Gallery',
        previousImage: 'Previous image',
        nextImage: 'Next image',
        goToImage: 'Go to image',
      },
      projects: {
        eyebrow: 'Projects',
        titleStart: 'Projects with',
        titleAccent: 'measurable impact',
        recruiterIntro: 'Compact view to validate impact, role, and stack in seconds.',
        deepIntro: 'Analysis view: problem, solution, architectural decisions, and outcomes per project.',
        featuredProject: 'Featured project',
        searchPlaceholder: 'Search by name, tag, year, or role...',
        searchAria: 'Search project',
        allTags: 'All',
        problem: 'Problem',
        solution: 'Solution',
        highlights: 'Key points',
        stack: 'Stack',
        metrics: 'Metrics',
        caseStudy: 'Case',
        role: 'Role',
        scope: 'Scope',
        duration: 'Duration',
        impact: 'Impact',
        viewDemo: 'View demo',
        viewCode: 'View code',
      },
      skills: {
        eyebrow: 'Skills map',
        titleStart: 'Capabilities by',
        titleAccent: 'depth level',
        recruiterIntro: 'Core, strong, and familiar levels to validate stack fit quickly.',
        deepIntro: 'Technical view to understand how I apply each technology in real products.',
        optimizeTitle: 'What I optimize in every project',
      },
      contact: {
        titleStart: "Let's work",
        titleAccent: 'together',
        intro: 'If you have a project in mind, send me a message. I reply quickly with a concrete proposal.',
        sendMessage: 'Send message',
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        message: 'Message',
        messagePlaceholder: 'Tell me how I can help...',
        sending: 'Sending...',
        otherWays: 'Other contact options',
        openProfile: 'Open profile',
        sendWhatsApp: 'Send message',
        sentOk: 'Message sent! I will get back to you soon.',
        sentError: 'Error sending message. Please try again.',
        copied: 'Email copied to clipboard',
      },
      footer: {
        navigation: 'Navigation',
        social: 'Social',
        rights: 'All rights reserved.',
        madeWith: 'Built with React, TypeScript, Tailwind, and Three.js',
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
      modeToggle: {
        recruiter: 'Recruiter',
        deep: 'Detail',
        aria: 'Portfolio reading mode selector',
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
