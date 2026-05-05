import type { Experience, Project } from '@/types'

export const personalInfo = {
  name: 'Alejo de la Arena',
  role: 'Full Stack Developer',
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


export const about = { description: 'Diseño y construyo interfaces con criterio de producto: rápidas, claras y mantenibles. Trabajo cerca de diseño y negocio para que lo que se entrega se use y escale.', highlights: [{ title: 'Interfaces end-to-end (UI/UX)', desc: 'Defino estructura, jerarquía, componentes y estados (empty/loading/error) para una experiencia consistente.', }, { title: 'Arquitectura frontend escalable', desc: 'Sistemas de componentes, design tokens, routing y estado con patrones que soportan crecimiento sin deuda.', }, { title: 'Motion con intención (no decorativo)', desc: 'Transiciones, microinteracciones y scroll reveals que mejoran lectura y feedback, cuidando performance.', }, { title: 'Integración producto-backend', desc: 'Auth, APIs y modelos de datos cuando el flujo lo requiere, asegurando consistencia entre UI y lógica.', }, { title: 'Calidad en flujos críticos', desc: 'Validaciones, manejo de errores, edge cases y testing donde impacta: login, forms, checkout y admin.', },], mindset: [{ title: 'Experiencia antes que “efectos”', desc: 'Cada interacción debe ser clara: feedback inmediato, estados bien definidos y cero fricción.', }, { title: 'Comunicación con criterio', desc: 'Alineo alcance, prioridades y trade-offs con diseño/producto/dev para evitar retrabajo.', }, { title: 'Código mantenible por defecto', desc: 'Buenas prácticas, naming claro y componentes reutilizables para que el equipo pueda iterar sin miedo.', }, { title: 'Accesibilidad y detalle visual', desc: 'Contraste, teclado, focus, y jerarquía tipográfica. Se siente premium y funciona para todos.', }, { title: 'Entrega incremental y controlada', desc: 'Itero en pasos, valido temprano y reduzco riesgo con cambios chicos y reversibles.', },], }

export const experience: Experience[] = [
  {
    id: 1,
    type: 'freelance',
    role: 'Full-Stack Developer',
    company: 'Espacio BOA',
    period: 'sept. 2025 - nov. 2025 (3 meses)',
    year: 2025,
    location: 'Provincia de Buenos Aires, Argentina (remoto)',
    summary:
      'Diseñé y desarrollé la plataforma web de Espacio BOA (café de especialidad + centro holístico), unificando gastronomía, espacios y agenda de actividades/eventos en una experiencia única. Llevé el producto de cero a producción con un panel interno para operar contenido y ventas (incluyendo gift cards), y un recorrido de usuario claro para explorar, inscribirse y gestionar sus reservas.',
    websiteUrl: 'https://espacioboa.com/',
    images: [],
    accentColor: 'hsl(167 61% 30%)',
    achievements: [
      'Menú gastronómico interactivo + módulo de espacios con enfoque en navegación y lectura rápida.',
      'Calendario unificado de actividades y eventos (fechas/horarios/cupos/estado) con detalle completo.',
      'Inscripciones end-to-end con validaciones, control de cupo, confirmaciones y gestión desde cuenta de usuario.',
      'Gift Cards digitales con emisión, redención, trazabilidad y prevención de reutilización.',
      'Panel interno CRUD para operar actividades/eventos, contenidos y gift cards sin depender de desarrollo.',
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
      'HTML5',
      'CSS3',
    ],
    details: {
      built: [
        'Menú gastronómico interactivo (categorías, foco mobile, lectura rápida).',
        'Sección de espacios (ambientes/usos con contenido visual e información práctica).',
        'Sistema de actividades y eventos con estados operativos: visibilidad, cupos, fechas/horarios y contenido.',
        'Calendario completo que renderiza actividades y eventos activos con información clave (fecha, hora, cupos/participantes y detalle).',
        'Inscripciones con validaciones, control de cupo y confirmaciones.',
        'Panel del usuario para ver sus inscripciones (actividades/eventos), revisar detalle y cancelar cuando corresponde.',
        'Gift Cards digitales: emisión/administración, código único, validación/redención y trazabilidad por estado.',
        'Autenticación completa (login/registro/sesiones) y control de acceso.',
        'Panel interno CRUD (actividades/eventos/gift cards) pensado para operación diaria.',
      ],
      optimized: [
        'Consistencia front–back en estados, validaciones y manejo de errores para flujos críticos (inscripciones, cupos, redención).',
      ],
      decisions: [
        'Modelado de estados y reglas operativas para que el contenido se gestione con lógica real (cupo, visibilidad, fechas, cancelaciones).',
        'Arquitectura de UI orientada a exploración rápida: jerarquía, lectura y navegación mobile-first.',
        'Integración front–back con consistencia de datos y manejo predecible de errores.',
      ],
      results: [
        'Producto operativo en producción, con operación interna autónoma y flujos de usuario completos para explorar e inscribirse.',
      ],
      links: [{ label: 'Espacio BOA', href: 'https://espacioboa.com/' }],
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
      'Desarrollé front-ends pixel-perfect y sitios WordPress a medida (Gutenberg + ACF), liderando el flujo Figma -> código y creando componentes reutilizables. Priorizando performance, accesibilidad y SEO técnico, con pruebas en distintos dispositivos y entregas por etapas junto a el equipo de diseño.',
    websiteUrl: 'https://www.zetenta.com/web/es/portfolio/',
    images: [],
    achievements: [
      'Front-ends pixel-perfect desde Figma y componentes reutilizables.',
      'Sitios WordPress a medida (Gutenberg + ACF).',
      'Performance, accesibilidad y SEO técnico como parte del delivery.',
      'Enfoque mobile-first y responsive real (360 → desktop), con ajuste fino por breakpoint',
    ],
    technologies: ['WordPress', 'PHP', 'JavaScript (ES6)', 'Sass', 'Gulp', 'ACF', 'Gutenberg', 'HTML5', 'CSS3'],
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
    role: 'Full-Stack Developer',
    company: 'Solution',
    period: 'feb. 2026 - abr. 2026 · 3 meses (jornada parcial)',
    year: 2026,
    location: 'Provincia de Buenos Aires, Argentina · En remoto',
    summary:
      'Diseñé y desarrollé de punta a punta la plataforma e-commerce de Solution Perfumes, cubriendo canal minorista y canal mayorista en un mismo ecosistema digital. Implementé una experiencia completa de compra y un panel de administración para operar catálogo, pedidos, logística y flujo comercial mayorista sin dependencia constante de desarrollo.',
    websiteUrl: 'https://www.solutionperfumes.com/',
    images: [],
    achievements: [
      'Plataforma con 16 rutas activas (sitio publico + panel admin) y arquitectura separada frontend/backend.',
      'E-commerce retail completo: catalogo, detalle de producto, carrito persistente, checkout, confirmacion y seguimiento de pedido.',
      'Integracion de pagos online con Mercado Pago (wallet + tarjeta) y Nave/Naranja X, incluyendo validacion de estados y manejo por webhooks.',
      'Logica de envios nacional con Correo Argentino: cotizacion en checkout, opciones domicilio/sucursal, despacho desde admin y guardado de tracking.',
      'Flujo B2B mayorista: landing de programa, formulario de postulacion, login por rol, portal con precios por plan y circuito de aprobacion/rechazo.',
      'Autenticacion y autorizacion por roles (admin / mayorista aprobado) con guards de acceso y sesiones.',
      'Integraciones de comunicacion y marketing: emails transaccionales, eventos de analytics, Meta Pixel y GA4.',
      'Panel administrativo operativo para pedidos, mayoristas, productos y metricas de uso.',
    ],
    technologies: [
      'React + Vite',
      'React Router',
      'Tailwind CSS',
      'Node.js + Express',
      'Supabase (Auth/DB/Storage/Edge Functions)',
      'Mercado Pago SDK',
      'Nave API',
      'Correo Argentino API',
      'Resend',
      'Recharts',
      'Meta Pixel',
      'Google Analytics',
    ],
    details: {
      built: [
        'Arquitectura modular con 16 rutas activas distribuidas entre sitio publico y panel de administracion.',
        'Canal retail completo: catalogo, ficha de producto, carrito persistente, checkout, confirmacion y seguimiento de pedidos.',
        'Integracion de pagos con Mercado Pago y Nave/Naranja X, con validacion de estados y sincronizacion por webhooks.',
        'Integracion con Correo Argentino para cotizacion, seleccion de modalidad, despacho y tracking.',
        'Flujo B2B mayorista de punta a punta: landing, postulacion, evaluacion de cuenta, acceso por rol y portal con precios por plan.',
        'Panel administrativo para operacion diaria de catalogo, pedidos, logistica, mayoristas y contenido comercial.',
      ],
      optimized: [
        'Flujo de compra con estados explicitos y feedback en cada paso para reducir friccion y abandono.',
        'Validaciones en frontend y backend para asegurar consistencia antes de registrar pagos o despachos.',
        'Automatizaciones de comunicacion con emails transaccionales (pago, despacho, tracking y reembolso).',
      ],
      decisions: [
        'Separacion estricta de reglas entre canal minorista y mayorista para evitar colisiones y simplificar mantenimiento.',
        'Modelo de autenticacion y autorizacion por roles para proteger recursos operativos y comerciales sensibles.',
        'Estrategia de integraciones desacopladas (pagos, logistica, mensajeria y analitica) para evolucionar cada modulo sin afectar el resto del sistema.',
      ],
      results: [
        'Plataforma en produccion con operacion real en ambos canales (retail y mayorista) dentro de una sola infraestructura.',
        'Equipo con autonomia operativa para gestionar pedidos, envios, catalogo y cuentas mayoristas desde admin sin depender de tareas tecnicas recurrentes.',
        'Base tecnica preparada para escalar catalogo, volumen transaccional y nuevas iniciativas comerciales.',
      ],
      links: [{ label: 'Sitio', href: 'https://www.solutionperfumes.com/' }],
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
    role: 'Full-Stack Developer',
    company: 'Fefe Bakes',
    period: 'oct. 2024 - dic. 2024',
    year: 2024,
    location: 'Argentina (remoto)',
    summary:
      'E-commerce a medida para clienta. Frontend con ReactJS y backend con Node/Express + PostgreSQL (Sequelize).',
    websiteUrl: 'https://fefebakes.com/',
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
      links: [{ label: 'Sitio', href: 'https://fefebakes.com/' }],
    },
  },
  {
    id: 6,
    type: 'freelance',
    role: 'Full-Stack Developer',
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
    title: 'TaskFlow — Landing de producto (SaaS)',
    year: 2026,
    role: 'Desarrollador Frontend · Vyzon (agencia de servicios web)',
    scope: 'Marketing one-page · Hero → Pricing → FAQ · Motion · SEO',
    timeline: 'Desarrollo end-to-end de la landing',
    impact: 'Landing lista para producción · criterios de performance y a11y definidos en el repo',
    description:
      'Pieza desarrollada en Vyzon, mi agencia de servicios web, para poner en práctica arquitectura frontend, motion y contenido comercial sobre un brief ficticio: TaskFlow, un SaaS de gestión de tareas orientado a equipos remotos de 5–50 personas. Stack Next.js 14 + TypeScript + Tailwind; animación avanzada con GSAP (ScrollTrigger, prefers-reduced-motion) y copy centralizado en un solo archivo de datos.',
    problem:
      'El brief del producto ficticio planteaba que muchas herramientas de tareas se sienten genéricas y cargan de ruido a equipos distribuidos: TaskFlow debía comunicar en una sola página valor claro, foco y diferenciación, con tono directo y rápido de leer, y cerrar con pricing, prueba social y FAQ como haría un SaaS B2B real.',
    solution:
      'Construí una landing de marketing de una sola página con flujo Hero → problema/solución → features (cuatro pilares) → prueba social → pricing con toggle mensual/anual → FAQ en acordeón → CTA final; shell completo con barra de progreso de scroll, cursor personalizado, fondo reactivo, header con navegación ancla y footer multi-columna. El contenido comercial vive en un archivo de datos para iterar copy sin romper layout; el hero incluye un mock tipo tablero Kanban cargado con next/dynamic para no bloquear el primer paint; animaciones con GSAP y gsap.matchMedia respetando prefers-reduced-motion; capa SEO y sharing con metadata, Open Graph, Twitter card e imagen /og.',
    image: '/favicon.svg',
    tags: ['SaaS', 'Next.js', 'GSAP', 'Landing', 'Accesibilidad'],
    highlights: [
      'Shell de sitio: scroll progress, cursor, header/footer, navegación por anclas y estructura lista para marca.',
      'Hero avanzado: titular con reveal tipo máscara, mock de tablero con columnas/tarjetas e indicador de scroll en desktop.',
      'Motion “pro”: timelines y ScrollTrigger (parallax, reveals), quickTo para interacciones frecuentes (tilt 3D en cards/mock), degradación coherente con reduced-motion.',
      'Framer Motion en acordeón y toggles donde encaja; tokens Tailwind + variables CSS; iconos Lucide; tipografía Geist Sans/Mono self-hosted.',
    ],
    technologies: [
      'Next.js 14 (App Router)',
      'React 18',
      'TypeScript',
      'TailwindCSS',
      'GSAP',
      'ScrollTrigger',
      '@gsap/react',
      'Framer Motion',
      'Lucide React',
      'Geist Sans / Geist Mono',
      'clsx',
      'tailwind-merge',
    ],
    featured: true,
    metrics: [
      'Presupuesto de JS (~145 kB first load en README del proyecto; objetivo ~≤160 kB)',
      'Metas explícitas: Lighthouse performance ≥90 y a11y ≥95 (medir en entorno de producción)',
      'Typecheck estricto (tsc --noEmit) coherente con el código',
    ],
    decisions: [
      'GSAP + ScrollTrigger como motor principal de animación de producto; Framer Motion donde encaja mejor (acordeón, toggles con layout).',
      'Copy y datos centralizados (content.ts) para separar marketing de estructura de componentes y acelerar iteraciones con cliente o equipo.',
      'Carga diferida del mock pesado del hero; animaciones basadas en transform y opacity para mejor costo de render.',
      'SEO y sharing explícitos: metadataBase, OG, Twitter card, favicon y themeColor.',
    ],
    results: [
      'Base reutilizable para ofrecer landings SaaS/B2B desde Vyzon: narrativa comercial, componentes UI y motion acotado.',
      'Entregable desplegable en Vercel u host similar, con objetivos de performance y accesibilidad documentados para auditoría en prod.',
    ],
    caseStudy:
      'Lo encaré como proyecto interno de Vyzon: un SaaS ficticio (TaskFlow) me permitió trabajar extremo a extremo una landing de venta real — jerarquía de mensaje, prueba social, pricing y FAQ — con el mismo rigor que llevaría a un cliente. El foco para un reclutador es el stack (Next.js App Router, TypeScript, Tailwind), el criterio de motion accesible (GSAP + reduced-motion), la separación copy/componentes y el cuidado de performance percibida y SEO técnico; el producto no es real, pero el tipo de entrega sí es el de una agencia que vende sitios que convierten.',
  },
  {
    id: 2,
    title: 'AURA AI — Landing SaaS Enterprise',
    year: 2026,
    role: 'Arquitecto Frontend / Desarrollador Frontend · Vyzon',
    scope: 'Landing one-page de conversión (8 secciones) · Motion avanzado · Responsive · Accesibilidad · Performance',
    timeline: 'Proyecto de 5 días hábiles (desarrollo frontend principal: 2.5 días)',
    impact:
      'Landing de nivel producción para un SaaS B2B ficticio con enfoque enterprise: narrativa comercial clara, arquitectura reusable y criterios explícitos de calidad (Lighthouse y typecheck).',
    description:
      'Proyecto interno de Vyzon diseñado como caso real de mercado: una landing para AURA AI, una plataforma ficticia que integra LLMs en empresas medianas sin equipo de ML. Implementado con Next.js 14 (App Router), React 18, TypeScript estricto y TailwindCSS; animación principal con GSAP + ScrollTrigger, microinteracciones con Framer Motion y hero interactivo con Canvas 2D.',
    problem:
      'El desafío era resolver una fricción real del mercado B2B: muchas empresas quieren adoptar IA, pero se traban por complejidad técnica, compliance y falta de talento especializado. La landing debía comunicar valor en segundos, mostrar diferenciación frente a alternativas (más complejas o más limitadas) y guiar a conversión con estructura comercial completa.',
    solution:
      'Construí una experiencia one-page con flujo Hero → Problem → How it Works → Features → Metrics → Testimonials → Pricing → FAQ → CTA final. El hero combina entrada cinematográfica, panel demo con typewriter y fondo de partículas reactivo en canvas. En scroll se activan reveals y transiciones con GSAP; pricing incluye toggle mensual/anual con Framer Motion; FAQ funciona como acordeón animado. Se integró navegación fija, barra de progreso de scroll, layout completo con footer multi-columna y soporte responsive mobile-first.',
    image: '/images/projects/aura-ai-landing.webp',
    tags: ['SaaS', 'B2B', 'Next.js', 'GSAP', 'TypeScript', 'Landing'],
    highlights: [
      'Arquitectura de landing orientada a conversión con 8 bloques comerciales clave (mensaje, prueba social, pricing y objeciones).',
      'Sistema de animación híbrido: GSAP/ScrollTrigger para narrativa scroll-driven + Framer Motion para estados UI puntuales.',
      'Hero técnico de alto impacto: timeline de entrada, tilt 3D, typewriter multi-escenario y particle field en Canvas 2D.',
      'Implementación accesible: soporte consistente de prefers-reduced-motion, foco visible y semántica HTML correcta.',
      'Design tokens sólidos (Tailwind + CSS custom properties) para reutilizar estética dark-tech premium en futuros proyectos.',
    ],
    technologies: [
      'Next.js 14 (App Router)',
      'React 18',
      'TypeScript (strict)',
      'TailwindCSS',
      'GSAP',
      'ScrollTrigger',
      '@gsap/react',
      'Framer Motion',
      'Lucide React',
      'Geist Sans / Geist Mono',
      'Canvas 2D',
      'clsx',
      'tailwind-merge',
    ],
    featured: true,
    metrics: [
      'Objetivo de performance definido: Lighthouse Performance >= 90',
      'Objetivo de accesibilidad definido: Lighthouse Accessibility >= 95',
      'Presupuesto de JS definido en brief: First Load JS < 200 KB',
      'Typecheck estricto en pipeline: tsc --noEmit',
      'Responsive definido para 375 / 768 / 1280 / 1920',
    ],
    decisions: [
      'GSAP + ScrollTrigger como motor principal para storytelling visual; Framer Motion solo donde aporta simplicidad en UI (drawer, toggle, estados).',
      'Hook centralizado de reduced-motion para degradación elegante y consistente en GSAP, CSS y canvas.',
      'Canvas optimizado para mobile reduciendo densidad de nodos y evitando sobrecarga en dispositivos chicos.',
      'Separación por secciones y componentes reutilizables (layout, UI, hooks, lib) para escalar y mantener el proyecto.',
      'Copy orientado a ICP enterprise (CTOs, Ops leaders, founders) con foco en tiempo a valor, compliance y adopción sin equipo ML.',
    ],
    results: [
      'Se obtuvo un entregable sólido para presentar capacidad real de ejecución frontend end-to-end en contexto SaaS/B2B.',
      'La base técnica queda lista para clonar y adaptar en futuros proyectos comerciales de landing premium.',
      'El proyecto demuestra criterio de producto, no solo implementación visual: mensaje, objeciones, pricing, confianza y CTA.',
    ],
    caseStudy:
      'Este proyecto se planteó como simulación de encargo real para una startup B2B: no buscaba “mostrar efectos”, sino resolver cómo una empresa vendería una plataforma de IA compleja en una sola página clara y convincente. Para un recruiter, el valor está en la combinación de ejecución técnica (Next.js + TypeScript + motion robusto), criterio UX/comercial (estructura de conversión completa) y estándares de calidad (a11y, performance, responsive, mantenibilidad). Aunque el producto sea ficticio, el tipo de problema, el proceso y el nivel del entregable son equivalentes a un trabajo profesional con cliente real.',
  },
  {
    id: 3,
    title: 'Referencia — caso real (pendiente 2)',
    year: 2026,
    role: 'Por definir',
    scope: 'Por definir',
    timeline: '—',
    impact: 'Por documentar',
    description:
      'Segundo slot de referencia para otro proyecto real; sustituir cuando tengas el contexto y capturas listas.',
    problem: 'Este bloque se completará cuando agregues el segundo caso adicional.',
    solution: 'Misma estructura que el resto de proyectos: narrativa honesta y stack verificable.',
    image: '/favicon.svg',
    tags: ['Próximamente'],
    highlights: ['Reservado para futuro caso', 'Datos y métricas por agregar', 'Enlaces live/repo por definir'],
    technologies: ['Por definir'],
    featured: false,
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
  title: `Alejo de la Arena | Full-Stack Developer`,
  description: `Portfolio de Alejo de la Arena, Full-Stack Developer especializado en Frontend, con foco en producto, performance y experiencia de usuario.`,
  keywords: "full stack developer, frontend developer, react developer, typescript, next.js, portfolio",
  ogImage: "/og-image.jpg",
  twitterHandle: "@tuusuario",
}
