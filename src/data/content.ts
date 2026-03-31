import type { Experience, Project } from '@/types'

export const personalInfo = {
  name: 'Alejo de la Arena',
  role: 'Full Stack Developer · Frontend Specialist',
  tagline: 'Interfaces sólidas, producto claro y ejecución técnica orientada a impacto.',
  valueLine: 'Construyo interfaces rápidas, claras y con obsesión por el detalle.',
  recruiterSummary: 'Construyo productos web de alto impacto, con foco en performance, UX y decisiones técnicas que mueven métricas.',
  deepDiveSummary:
    'Diseño y construyo experiencias frontend de alta complejidad para equipos de producto: desde arquitectura y design systems hasta optimización, observabilidad e iteración continua.',
  proof: ['Performance-first', 'UI craft', 'Product-minded'],
  bio: 'Desarrollador Full Stack con foco en Frontend, arquitectura de producto y experiencias digitales de alta calidad.',
  location: 'Buenos Aires, Argentina',
  email: 'alejo@example.com',
  availability: 'Disponible para proyectos freelance y roles remotos',
}

export const socialLinks = {
  github: 'https://github.com/tu-usuario',
  linkedin: 'https://linkedin.com/in/tu-perfil',
  whatsapp: 'https://wa.me/5491112345678',
}

export const sectionLinks = [
  { id: 'about', label: 'Sobre mí' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'contact', label: 'Contacto' },
] as const

export const modeLabels = {
  recruiter: 'Perfil rápido',
  deep: 'Detalle técnico',
}

export const projectSortLabels = {
  featured: 'Destacados',
  latest: 'Recientes',
  impact: 'Impacto',
}

export const about = {
  description:
    'Conecto diseño, ingeniería y objetivos de negocio para crear productos web elegantes, mantenibles y listos para escalar.',
  highlights: [
    'Arquitecturas frontend escalables con React, TypeScript y design tokens',
    'Optimización de performance con foco en Core Web Vitals y TTI',
    'Sistemas de UI accesibles con motion intencional y mantenible',
    'Integración de datos complejos con UX clara para producto',
    'Testing de flujos críticos con estándares de calidad altos',
  ],
  mindset: [
    'Cada interacción comunica calidad de producto.',
    'La accesibilidad no es opcional: es parte de la experiencia.',
    'El código debe permitir iterar rápido sin romper confianza.',
  ],
}

export const experience: Experience[] = [
  {
    id: 1,
    type: 'freelance',
    role: 'Full-stack Developer',
    company: 'Espacio BOA',
    period: 'sept. 2025 - nov. 2025 (3 meses)',
    year: 2025,
    location: 'Provincia de Buenos Aires, Argentina (remoto)',
    summary:
      'Diseñé y desarrollé la plataforma web de Espacio BOA (gastronomía + espacios + actividades) de cero a producción, con panel interno para que el equipo gestione contenido y operaciones sin depender de desarrollo.',
    websiteUrl: 'https://',
    images: [],
    accentColor: 'hsl(167 61% 30%)',
    achievements: [
      'Menú gastronómico interactivo + módulo de espacios y actividades/eventos.',
      'Inscripciones con validaciones, control de cupo y confirmaciones.',
      'Gift Cards digitales con emisión, redención y trazabilidad.',
      'Panel interno CRUD para operar contenido y operaciones.',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Radix UI',
      'Supabase (Auth/DB)',
      'Resend',
      'Vercel',
      'Zod + React Hook Form',
      'Framer Motion',
    ],
    details: {
      built: [
        'Menú gastronómico interactivo (categorías, UX mobile, lectura rápida).',
        'Espacios (ambientes, usos, contenido visual, foco conversión).',
        'Actividades y eventos con cupos/fechas/estados/visibilidad.',
        'Inscripciones con validaciones + control de cupo + confirmaciones.',
        'Gift Cards digitales: emisión/administración, código único, validación/redención, trazabilidad.',
        'Autenticación completa (login/registro/sesiones).',
        'Admin panel CRUD (actividades/eventos/giftcards).',
      ],
      optimized: ['Consistencia front-back en estados, validaciones y manejo de errores.'],
      decisions: [
        'Integración front–back con consistencia de datos, manejo de errores y validaciones.',
        'UX moderna alineada a identidad del espacio.',
      ],
      results: ['Plataforma operativa en producción de punta a punta.'],
      links: [{ label: 'Sitio principal', href: 'https://' }],
    },
  },
  {
    id: 2,
    type: 'employment',
    role: 'Web Developer',
    company: 'Zetenta',
    period: 'abr. 2025 - oct. 2025 (7 meses)',
    year: 2025,
    location: 'Provincia de Buenos Aires, Argentina (híbrido)',
    summary:
      'Desarrollé front-ends pixel-perfect y sitios WordPress a medida (Gutenberg + ACF), liderando el flujo Figma -> código y creando componentes reutilizables. Priorizando performance, accesibilidad y SEO técnico, con QA cross-device y releases iterativos.',
    websiteUrl: 'https://www.zetenta.com/web/es/portfolio/',
    images: [],
    achievements: [
      'Front-ends pixel-perfect desde Figma y componentes reutilizables.',
      'Sitios WordPress a medida (Gutenberg + ACF) y páginas de servicio/portfolio.',
      'Performance, accesibilidad y SEO técnico como parte del delivery.',
      'QA cross-device y releases iterativos.',
    ],
    technologies: ['WordPress', 'PHP', 'JavaScript (ES6)', 'Sass', 'Gulp', 'ACF', 'Gutenberg'],
    details: {
      built: [
        'Desarrollo de sitios WordPress a medida con Gutenberg + ACF.',
        'Componentes reutilizables y plantillas escalables.',
      ],
      optimized: ['Performance, accesibilidad y SEO técnico en producción.'],
      decisions: ['Flujo Figma -> código con foco en precisión visual y mantenibilidad.'],
      results: ['Reutilización de componentes para acelerar nuevas páginas y ajustes.'],
      links: [{ label: 'Portfolio Zetenta', href: 'https://www.zetenta.com/web/es/portfolio/' }],
    },
    subProjects: [
      {
        title: 'Manantial — Full site (+45 pages)',
        role: 'Desarrollo completo WordPress (Gutenberg + ACF)',
        contribution:
          'Tema custom, headers/footers dinámicos (home vs internas), formularios, pixel-perfect desde Figma y plantillas reutilizables por departamento.',
        impact: 'Sitio 100% editable, consistencia visual y publicación más rápida.',
        stack: ['WordPress', 'Gutenberg', 'ACF', 'PHP', 'JavaScript', 'Sass'],
        websiteUrl: 'https://',
        images: [],
      },
      {
        title: 'Bajó de precio — Yacoub',
        role: 'Front-End + PHP (API)',
        contribution:
          'Backend PHP para consumir API externa basada en Excel, normalizar y render server-side; filtros integrados en WordPress preservando diseño.',
        impact: 'Datos siempre actualizados y navegación fluida.',
        stack: ['WordPress', 'PHP', 'JavaScript'],
        websiteUrl: 'https://',
        images: [],
      },
      {
        title: 'Corporativos — Madero Walk',
        role: 'Front-End (Elementor)',
        contribution:
          'Landings enfocadas en conversión; componentes específicos HTML/CSS/JS; responsive y SEO on-page.',
        impact: 'Mensajes claros por sector y mejor captura de leads.',
        websiteUrl: 'https://maderowalk.com/corporativos-madero-walk/',
        relatedLinks: [
          'https://maderowalk.com/casamientos-madero-walk/',
          'https://maderowalk.com/fiesta-de-15-madero-walk/',
        ],
        images: [],
      },
      {
        title: 'Exagon Impact — Portfolio',
        role: 'WordPress Developer',
        contribution: 'Creación de /portfolio + update home + “Conoce al equipo”.',
        websiteUrl: 'https://exagonimpact.com/portfolio/',
        images: [],
      },
      {
        title: 'Aeroclub Capitán Sarmiento — Performance optimization',
        role: 'Web Performance',
        contribution: 'Auditoría y optimización (imágenes, lazy, CSS crítico, fuentes).',
        impact: '~95% de performance (según medición).',
        websiteUrl: 'https://aeroclubcapitansarmiento.com/',
        images: [],
      },
      {
        title: 'Zetenta.com — Service Pages + Portfolio',
        role: 'Front-End Developer',
        contribution: '2 landings + contribución a portfolio.',
        websiteUrl: 'https://www.zetenta.com/web/es/service/desarrollo-web-ecommerce/',
        relatedLinks: [
          'https://www.zetenta.com/web/es/service/redes-sociales-y-generacion-de-contenidos/',
          'https://www.zetenta.com/web/es/portfolio/',
        ],
        images: [],
      },
      {
        title: 'Go Building — 2 Landing Pages + Kommo CRM',
        role: 'Front-End + Integración CRM',
        contribution: '2 landings + form integrado a Kommo (creación de leads pipeline/status_id).',
        websiteUrl: 'https://go-building.com/',
        images: [],
      },
    ],
  },
  {
    id: 3,
    type: 'freelance',
    role: 'Full Stack Developer',
    company: 'SOLUTION',
    period: 'feb. 2026 - abr. 2026 (en desarrollo, casi listo)',
    year: 2026,
    location: 'Argentina (remoto)',
    summary:
      'Integración de compras dentro de la web: catálogo + carrito + checkout con pasarela de pago NAVE. Envíos para Buenos Aires/AMBA y Correo Argentino para interior del país. Portal mayorista con aplicación, login y panel por plan (Starter/Pro/Elite). Proyecto casi terminado, aún no publicado.',
    websiteUrl: 'https://',
    images: [],
    achievements: [
      'Catálogo + carrito + checkout con pagos NAVE.',
      'Envíos: AMBA/Buenos Aires + Correo Argentino (interior).',
      'Portal mayorista con planes y beneficios por nivel.',
      'Proyecto en desarrollo, cerca de producción.',
    ],
    technologies: ['NAVE (pagos)', 'E-commerce', 'Shipping'],
    details: {
      built: [
        'Catálogo + carrito + checkout integrado con pasarela de pago NAVE.',
        'Envíos de perfumes: gestión AMBA/Buenos Aires y Correo Argentino para interior del país.',
        'Portal mayorista: aplicación, login y panel con plan (Starter / Pro / Elite).',
      ],
      optimized: ['Checkout con estados claros, validaciones y manejo de errores.'],
      decisions: ['Separación de reglas retail vs mayorista para mantener flujos consistentes.'],
      results: ['Proyecto casi listo para publicar (todavía no en producción).'],
      links: [{ label: 'Sitio (pendiente)', href: 'https://' }],
    },
  },
  {
    id: 4,
    type: 'freelance',
    role: 'Desarrollador WordPress',
    company: 'MDVproyectos',
    period: 'nov. 2024 - abr. 2025 (jornada parcial)',
    year: 2025,
    location: 'Argentina (remoto)',
    summary:
      'Optimización del sitio (rendimiento, SEO y buenas prácticas), cambios en estructura y funcionalidad para mejorar la experiencia/interfaz, y landings para campañas orientadas a conversión.',
    websiteUrl: 'https://',
    images: [],
    achievements: [
      'Optimización del sitio: rendimiento, SEO y buenas prácticas.',
      'Cambios en estructura y funcionalidad para mejorar experiencia/interfaz.',
      'Landings para campañas de marketing orientadas a conversión.',
    ],
    technologies: ['WordPress', 'SEO', 'Performance'],
    details: {
      built: [
        'Landings para campañas orientadas a conversión.',
        'Cambios en estructura y funcionalidad para mejorar UX/UI.',
      ],
      optimized: ['Rendimiento, SEO y buenas prácticas.'],
      decisions: ['Iteración por entregas cortas para validar sin romper producción.'],
      results: ['Mejoras sostenidas en calidad del sitio para campañas y navegación diaria.'],
      links: [{ label: 'Sitio', href: 'https://' }],
    },
  },
  {
    id: 5,
    type: 'freelance',
    role: 'Desarrollador full stack',
    company: 'Fefe Bakes',
    period: 'oct. 2024 - dic. 2024',
    year: 2024,
    location: 'Argentina (remoto)',
    summary:
      'E-commerce a medida para clienta. Frontend con ReactJS y backend con Node/Express + PostgreSQL (Sequelize).',
    websiteUrl: 'https://',
    images: [],
    accentColor: '#f2e8d5',
    achievements: [
      'Frontend: ReactJS + HTML/CSS + Axios + Redux.',
      'Backend: NodeJS + Express + PostgreSQL + Sequelize.',
      'E-commerce a medida con integración full stack.',
    ],
    technologies: ['ReactJS', 'Redux', 'Axios', 'NodeJS', 'Express', 'PostgreSQL', 'Sequelize', 'HTML/CSS'],
    details: {
      built: [
        'Frontend: ReactJS + HTML/CSS + Axios + Redux.',
        'Backend: NodeJS + Express + PostgreSQL + Sequelize.',
        'E-commerce a medida para clienta.',
      ],
      optimized: ['Estructura de estados y llamadas para mantener la UI fluida.'],
      decisions: ['Separación clara de responsabilidades entre frontend y backend.'],
      results: ['Base funcional lista para evolucionar catálogo, pedidos y contenido.'],
      links: [{ label: 'Sitio (pendiente)', href: 'https://' }],
    },
  },
  {
    id: 6,
    type: 'freelance',
    role: 'Full Stack Developer',
    company: 'Renová tu Cocina',
    period: 'en desarrollo (cerca de producción)',
    year: 2025,
    location: 'Argentina (remoto)',
    summary:
      'Proyecto para la empresa de MDV: CRUD completo para añadir proyectos (imágenes + información) con login privado solo para administradores. Cerca de producción, todavía no publicado.',
    websiteUrl: 'https://',
    images: [],
    accentColor: '#96291c',
    achievements: [
      'CRUD completo para proyectos con imágenes e información.',
      'Login privado solo para administradores.',
      'Proyecto en etapa final, cerca de producción.',
    ],
    technologies: ['CRUD', 'Login privado', 'Panel admin'],
    details: {
      built: [
        'CRUD completo para añadir proyectos (imágenes + información).',
        'Login privado solo para administradores.',
      ],
      optimized: ['Flujo de carga/edición pensado para uso diario.'],
      decisions: ['Separación zona pública vs panel privado para seguridad y claridad.'],
      results: ['Proyecto cerca de producción (todavía no publicado).'],
      links: [{ label: 'Sitio (pendiente)', href: 'https://' }],
    },
  },
]

export const projects: Project[] = [
  {
    id: 1,
    title: 'Pulse Commerce Replatform',
    year: 2025,
    role: 'Frontend Engineer',
    scope: 'Checkout + Account + Search',
    timeline: '5 meses',
    impact: '+23% conversion en mobile',
    description: 'Modernicé un e-commerce legacy y logramos +23% de conversión mobile en 5 meses.',
    problem: 'El stack legacy no soportaba crecimiento, campañas rápidas ni experimentación segura.',
    solution: 'Arquitectura por dominios + design tokens + estrategia de experimentación controlada.',
    image: '/projects/project-1.jpg',
    tags: ['E-Commerce', 'Frontend Architecture', 'Performance'],
    highlights: ['Checkout composable', 'Feature flags de producto', 'Search UX optimizado', 'CWV estabilizados'],
    technologies: ['Next.js', 'TypeScript', 'GraphQL', 'Tailwind', 'Storybook'],
    featured: true,
    metrics: ['FCP -38%', 'AOV +11%', 'Checkout drop-off -37%'],
    decisions: ['Dominio por bounded context', 'Pre-fetch según intención', 'Reglas de motion con budget'],
      results: ['Deploys semanales sin incidentes críticos', 'Mayor autonomía del equipo de Growth'],
    liveUrl: 'https://ejemplo-ecommerce.vercel.app',
    githubUrl: 'https://github.com/tu-usuario/proyecto',
    caseStudy: 'La clave fue atacar fricción transaccional primero y luego escalar con experimentación.',
  },
  {
    id: 2,
    title: 'Nexa Analytics Suite',
    year: 2026,
    role: 'Full Stack Developer (Frontend Focus)',
    scope: 'Data dashboards + alerting',
    timeline: '4 meses',
    impact: '80k eventos renderizados a 60fps',
    description: 'Rediseñé la suite analítica para hacerla confiable y clara, con 80k eventos a 60fps.',
    problem: 'Usuarios no confiaban en datos por latencia y UI confusa.',
    solution: 'Virtualización, estado por prioridades y narrativa visual para insights.',
    image: '/projects/project-2.jpg',
    tags: ['SaaS', 'Data Visualization', 'Realtime'],
    highlights: ['Streaming resiliente', 'Filtros avanzados', 'Export inteligente', 'Modo focus para decisiones'],
    technologies: ['React', 'TypeScript', 'D3', 'WebSocket', 'TanStack Query'],
    featured: true,
    metrics: ['TTV -29%', 'Adopción semanal +34%'],
    decisions: ['Virtualización primero', 'Render por prioridad', 'Feedback explícito de estados'],
    results: ['Mejor precisión operativa', 'Caída de tickets por interpretación de datos'],
    liveUrl: 'https://ejemplo-dashboard.vercel.app',
    githubUrl: 'https://github.com/tu-usuario/proyecto',
    caseStudy: 'Diseñé un sistema de decisiones visuales para que la data no compita con la atención.',
  },
  {
    id: 3,
    title: 'Atlas Design Platform',
    year: 2024,
    role: 'Design System Engineer',
    scope: 'Tokens + components + docs',
    timeline: '3 meses',
    impact: '50% menos tiempo de implementación UI',
    description: 'Construí un Design System compartido y bajamos 50% el tiempo de implementación UI.',
    problem: 'Inconsistencia visual y deuda de UI en crecimiento continuo.',
    solution: 'Foundation de tokens + componentes accesibles + guías de adopción.',
    image: '/projects/project-3.jpg',
    tags: ['Design System', 'Accessibility', 'DX'],
    highlights: ['40+ componentes', 'Documentación viva', 'Testing visual', 'Theming dinámico'],
    technologies: ['React', 'TypeScript', 'Radix', 'Storybook', 'Playwright'],
    metrics: ['Bugs visuales -41%', 'Entrega UI +50%'],
    decisions: ['API de componentes por composición', 'Contratos a11y testables'],
    results: ['Mayor consistencia cross-product', 'Onboarding técnico más rápido'],
    liveUrl: 'https://ejemplo-designsystem.vercel.app',
    githubUrl: 'https://github.com/tu-usuario/proyecto',
    caseStudy: 'Construí el sistema con objetivos de adopción reales, no solo biblioteca bonita.',
  },
  {
    id: 4,
    title: 'Signal Narrative Site',
    year: 2025,
    role: 'Frontend Developer',
    scope: 'Brand storytelling',
    timeline: '6 semanas',
    impact: '2.1x tiempo promedio en sitio',
    description: 'Creé una experiencia editorial de marca y elevamos 2.1x el tiempo promedio en sitio.',
    problem: 'La marca necesitaba diferenciarse en una categoría saturada.',
    solution: 'Narrativa por capas con motion controlado y degradación progresiva.',
    image: '/projects/project-4.jpg',
    tags: ['Creative Dev', 'Motion', 'Brand'],
    highlights: ['Scroll sequencing', 'Fallback mobile', 'Semántica accesible', 'Cierre con CTA medible'],
    technologies: ['React', 'Framer Motion', 'Tailwind', 'Vite'],
    metrics: ['Engagement +110%', 'Bounce -26%'],
    decisions: ['Motion budgets estrictos', 'SSR de contenido crítico'],
    results: ['Mayor exploración de features', 'Más demos solicitadas'],
    liveUrl: 'https://ejemplo-portfolio.vercel.app',
    githubUrl: 'https://github.com/tu-usuario/proyecto',
    caseStudy: 'El resultado vino de equilibrar impacto visual con lectura rápida para negocio.',
  },
  {
    id: 5,
    title: 'Ops Console Internal',
    year: 2023,
    role: 'Frontend Consultant',
    scope: 'Internal tooling',
    timeline: '2 meses',
    impact: '-31% errores operativos',
    description: 'Diseñé una consola interna para reducir errores críticos y mejorar trazabilidad operativa.',
    problem: 'Errores humanos frecuentes en procesos con interfaces dispersas.',
    solution: 'Workflow guiado, validaciones en línea y visualización de riesgo.',
    image: '/projects/project-5.jpg',
    tags: ['Internal Tools', 'UX', 'Reliability'],
    highlights: ['Wizard inteligente', 'Audit trail', 'Permisos por rol', 'Observabilidad UI'],
    technologies: ['React', 'Zod', 'Node.js', 'PostgreSQL', 'Tailwind'],
    metrics: ['Errores operativos -31%', 'Training time -22%'],
    decisions: ['Patrones de confirmación anti-error', 'Estados explícitos por etapa'],
    results: ['Menos retrabajo', 'Más trazabilidad'],
    liveUrl: 'https://ejemplo-console.vercel.app',
    githubUrl: 'https://github.com/tu-usuario/proyecto',
    caseStudy: 'Priorizamos claridad operativa por sobre densidad visual para equipos de alto estrés.',
  },
]

export const skills = {
  frontend: {
    label: "Desarrollo Frontend",
    core: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5/CSS3"],
    strong: ["TailwindCSS", "Framer Motion", "React Query", "Zustand", "React Hook Form"],
    familiar: ["Vue.js", "Svelte", "GSAP", "Three.js", "WebGL"],
  },
  backend: {
    label: "Backend y APIs",
    core: ["Node.js", "Express", "REST APIs", "PostgreSQL"],
    strong: ["Prisma", "Supabase", "MongoDB", "Auth (JWT, OAuth)"],
    familiar: ["GraphQL", "tRPC", "Redis", "Socket.io"],
  },
  devops: {
    label: "DevOps & Tooling",
    core: ["Git/GitHub", "Vercel", "CI/CD", "npm/pnpm"],
    strong: ["Docker", "GitHub Actions", "AWS S3", "Optimización de performance"],
    familiar: ["Kubernetes", "Terraform", "Monitoring (Sentry)"],
  },
  testing: {
    label: "Testing y calidad",
    core: ["Vitest", "Testing Library", "Playwright", "ESLint/Prettier"],
    strong: ["Lighthouse", "Web Vitals", "Auditorías de accesibilidad"],
    familiar: ["Cypress", "Storybook", "Chromatic"],
  },
}

export const skillExamples: Record<string, string> = {
  React: 'Arquitecturas por dominio, estado predecible y rendering optimizado.',
  TypeScript: 'Contratos estrictos para escalar equipos y evitar regresiones.',
  'Framer Motion': 'Transiciones narrativas con intención y degradación progresiva.',
  GraphQL: 'Normalización de datos para UI complejas con baja latencia percibida.',
  Playwright: 'Cobertura de flujos críticos para releases con alta confianza.',
  'TailwindCSS': 'Sistemas de interfaz consistentes, rápidos de iterar y mantenibles.',
}

export const optimizationFocus = [
  {
    icon: "⚡",
    title: "Performance",
    description: "Core Web Vitals, lazy loading, code splitting y optimización de imágenes",
  },
  {
    icon: "♿",
    title: "Accesibilidad",
    description: "WCAG 2.1, HTML semántico, navegación por teclado y screen readers",
  },
  {
    icon: "🛠️",
    title: "Developer Experience",
    description: "Type safety, código mantenible, documentación y foco en productividad",
  },
  {
    icon: "🎨",
    title: "UI/UX",
    description: "Microinteracciones, responsive design y motion con intención",
  },
]

// Configuración EmailJS (obtener en emailjs.com)
export const emailConfig = {
  serviceId: "TU_SERVICE_ID",
  templateId: "TU_TEMPLATE_ID",
  publicKey: "TU_PUBLIC_KEY",
}

export const seoMetadata = {
  title: `Alejo de la Arena | Full Stack Developer · Frontend Specialist`,
  description: `Portfolio de Alejo de la Arena, Full Stack Developer especializado en Frontend, con foco en producto, performance y experiencia de usuario.`,
  keywords: "full stack developer, frontend developer, react developer, typescript, next.js, portfolio",
  ogImage: "/og-image.jpg",
  twitterHandle: "@tuusuario",
}
