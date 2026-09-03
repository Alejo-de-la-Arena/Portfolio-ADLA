export type ProjectImage = {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

export type ExperienceProject = {
  id: string
  name: string
  subtitle: string
  role: string
  contribution: string
  impact: string
  stack: string[]
  liveUrl?: string
  images: ProjectImage[]
}

export type Experience = {
  slug: string
  company: string
  companyUrl?: string
  position: string
  type: 'empresa' | 'freelance'
  startDate: string
  endDate: string | 'actualidad'
  location?: string
  summary: string
  highlights: string[]
  stack: string[]
  cover?: ProjectImage
  projects: ExperienceProject[]
}

const image = (slug: string, project: string, alt: string): ProjectImage => ({
  src: `/images/experiencia/${slug}/${project}-01.webp`,
  alt,
  width: 1600,
  height: 1000,
})

export const experiences: Experience[] = [
  {
    slug: 'solution', company: 'SOLUTION', position: 'Full-Stack Developer', type: 'freelance',
    startDate: 'feb. 2026', endDate: 'abr. 2026', location: 'Argentina · Remoto',
    summary: 'E-commerce en producción para una marca argentina de fragancias, con catálogo, checkout y una operación mayorista independiente. El producto integra pagos locales, envíos por zona y reglas de negocio separadas para retail y B2B.',
    highlights: ['Checkout completo con Mercado Pago y Nave / Naranja X.', 'Envíos propios en AMBA y Correo Argentino para el interior.', 'Portal mayorista con aprobación de cuenta y planes Starter, Pro y Elite.', 'Separación de reglas retail y mayoristas para evitar colisiones.'],
    stack: ['React', 'Node.js', 'Mercado Pago', 'Nave / Naranja X', 'REST API', 'Correo Argentino', 'Auth'],
    projects: [{ id: 'ecommerce', name: 'E-commerce y portal mayorista', subtitle: 'Catálogo, checkout y operación B2B', role: 'Full-Stack Developer', contribution: 'Desarrollé catálogo, carrito persistente, checkout con estados explícitos de pago, logística diferenciada por zona y un portal mayorista con registro, aprobación y panel por plan.', impact: 'El negocio opera venta minorista y mayorista en un mismo producto, con flujos y reglas aisladas.', stack: ['React', 'Node.js', 'Mercado Pago', 'Nave / Naranja X', 'Correo Argentino'], images: [image('solution', 'ecommerce', 'Checkout y portal mayorista de SOLUTION')] }],
  },
  {
    slug: 'zetenta', company: 'Zetenta', companyUrl: 'https://www.zetenta.com/web/es/portfolio/', position: 'Web Developer', type: 'empresa',
    startDate: 'abr. 2025', endDate: 'oct. 2025', location: 'Provincia de Buenos Aires, Argentina · Híbrido',
    summary: 'Desarrollé frontends pixel-perfect y sitios WordPress a medida con Gutenberg y ACF, liderando el flujo de Figma a código. Performance, accesibilidad y SEO técnico formaron parte del delivery desde el inicio.',
    highlights: ['Frontends pixel-perfect y componentes reutilizables.', 'Sitios WordPress editables con Gutenberg y ACF.', 'Responsive real, desde 360 px hasta desktop.', 'Performance, accesibilidad y SEO técnico en producción.'],
    stack: ['WordPress', 'PHP', 'JavaScript', 'Sass', 'Gutenberg', 'ACF', 'HTML5', 'CSS3'],
    projects: [
      { id: 'manantial', name: 'Manantial', subtitle: 'Full site (+45 páginas)', role: 'Desarrollo completo WordPress', contribution: 'Construí un tema custom, headers y footers dinámicos, formularios, implementación pixel-perfect desde Figma y plantillas reutilizables por departamento.', impact: 'Sitio 100% editable, consistencia visual y publicación más rápida.', stack: ['WordPress', 'Gutenberg', 'ACF', 'PHP', 'JavaScript', 'Sass'], images: [image('zetenta', 'manantial', 'Sitio institucional Manantial desarrollado para Zetenta')] },
      { id: 'yacoub', name: 'Bajó de precio', subtitle: 'Yacoub · Front-End + PHP (API)', role: 'Front-End + PHP', contribution: 'Desarrollé un backend PHP para consumir una API externa basada en Excel, normalizar datos y renderizar del lado del servidor. Integré filtros en WordPress preservando el diseño.', impact: 'Datos actualizados y navegación fluida para la búsqueda de propiedades.', stack: ['WordPress', 'PHP', 'JavaScript'], images: [image('zetenta', 'yacoub', 'Buscador Bajó de precio de Yacoub')] },
      { id: 'madero-walk', name: 'Corporativos', subtitle: 'Madero Walk · Landings por segmento', role: 'Front-End (Elementor)', contribution: 'Implementé landings orientadas a conversión, con componentes específicos en HTML, CSS y JavaScript, responsive y SEO on-page.', impact: 'Mensajes claros por sector y mejor captura de leads.', stack: ['WordPress', 'Elementor', 'HTML', 'CSS', 'JavaScript'], liveUrl: 'https://maderowalk.com/corporativos-madero-walk/', images: [image('zetenta', 'madero-walk', 'Landing corporativa de Madero Walk')] },
      { id: 'exagon-impact', name: 'Exagon Impact', subtitle: 'Portfolio y actualizaciones de home', role: 'WordPress Developer', contribution: 'Creé la sección de portfolio, actualicé la home y desarrollé el bloque “Conocé al equipo”.', impact: 'Una presentación de trabajo y equipo más clara para la agencia.', stack: ['WordPress', 'PHP', 'JavaScript', 'Sass'], liveUrl: 'https://exagonimpact.com/portfolio/', images: [image('zetenta', 'exagon-impact', 'Portfolio de Exagon Impact')] },
      { id: 'aeroclub', name: 'Aeroclub Capitán Sarmiento', subtitle: 'Optimización de performance', role: 'Web Performance', contribution: 'Realicé auditoría y optimización de imágenes, lazy loading, CSS crítico y fuentes.', impact: 'Aproximadamente 95% de performance según la medición realizada.', stack: ['Performance', 'WordPress', 'CSS', 'Lazy loading'], liveUrl: 'https://aeroclubcapitansarmiento.com/', images: [image('zetenta', 'aeroclub', 'Sitio optimizado de Aeroclub Capitán Sarmiento')] },
      { id: 'zetenta-site', name: 'Zetenta.com', subtitle: 'Service pages y portfolio', role: 'Front-End Developer', contribution: 'Construí dos landing pages de servicios y contribuí al portfolio del sitio de Zetenta.', impact: 'Páginas de servicios consistentes con la comunicación y el sistema visual de la agencia.', stack: ['WordPress', 'PHP', 'JavaScript', 'Sass'], liveUrl: 'https://www.zetenta.com/web/es/service/desarrollo-web-ecommerce/', images: [image('zetenta', 'zetenta-site', 'Página de servicios de Zetenta')] },
      { id: 'go-building', name: 'Go Building', subtitle: 'Dos landing pages + Kommo CRM', role: 'Front-End + integración CRM', contribution: 'Desarrollé dos landings e integré el formulario con Kommo para crear leads con pipeline y status definidos.', impact: 'Captura de consultas directamente conectada al proceso comercial.', stack: ['WordPress', 'JavaScript', 'Kommo CRM', 'HTML', 'CSS'], liveUrl: 'https://go-building.com/', images: [image('zetenta', 'go-building', 'Landing e integración CRM de Go Building')] },
    ],
  },
  {
    slug: 'espacio-boa', company: 'Espacio BOA', companyUrl: 'https://espacioboa.com/', position: 'Full-Stack Developer', type: 'freelance',
    startDate: 'sept. 2025', endDate: 'nov. 2025', location: 'Provincia de Buenos Aires, Argentina · Remoto',
    summary: 'Diseñé y desarrollé desde cero una plataforma que unifica gastronomía, espacios, agenda de actividades y eventos. El equipo cuenta con un panel interno para operar contenido, ventas y gift cards.',
    highlights: ['Menú interactivo y módulo de espacios.', 'Calendario unificado con fechas, horarios, cupos y estados.', 'Inscripciones end-to-end y gestión desde la cuenta del usuario.', 'Gift cards digitales con trazabilidad y prevención de reutilización.'],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase', 'Resend', 'Vercel', 'Framer Motion'],
    projects: [{ id: 'platform', name: 'Plataforma Espacio BOA', subtitle: 'Reservas, agenda y operación interna', role: 'Full-Stack Developer', contribution: 'Construí el menú, las secciones de espacios, el sistema de actividades y eventos, las inscripciones, autenticación, gift cards y el CRUD interno para operación diaria.', impact: 'Producto operativo en producción, con flujos completos para usuarios y autonomía del equipo interno.', stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind', 'Resend'], liveUrl: 'https://espacioboa.com/', images: [image('espacio-boa', 'platform', 'Plataforma de reservas y actividades de Espacio BOA')] }],
  },
  {
    slug: 'renova-tu-cocina', company: 'Renová Tu Cocina', companyUrl: 'https://www.renovatucocina.com.ar', position: 'Full-Stack Developer', type: 'freelance',
    startDate: 'mar. 2026', endDate: 'ago. 2026', location: 'Argentina · Remoto',
    summary: 'Diseño y desarrollo end-to-end de una plataforma editorial de cocinas a medida y reformas, con panel propio para gestionar obras. La conversión se resuelve por WhatsApp y la infraestructura incluye dominios, DNS y correo corporativo.',
    highlights: ['Panel CRUD con imágenes, SEO, visibilidad, destacados y orden.', 'Formularios multi-paso que preparan consultas contextualizadas por WhatsApp.', 'Fallback estático ante indisponibilidad de Supabase.', 'Deploy, dominios, DNS, redirecciones canónicas y correo corporativo.'],
    stack: ['Next.js 15', 'React', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'PostgreSQL', 'Server Actions', 'Vercel'],
    projects: [{ id: 'platform', name: 'Plataforma editorial y panel', subtitle: 'Portfolio de obras y gestión autónoma', role: 'Full-Stack Developer', contribution: 'Desarrollé 13 rutas públicas y privadas, filtros de proyectos, detalle editorial, comparador antes/después, formulario multi-paso, auth y panel CRUD con upload a Storage.', impact: 'El cliente publica y ordena obras sin intervención de desarrollo; el sitio se mantiene disponible incluso ante una falla de base de datos.', stack: ['Next.js 15', 'Supabase', 'PostgreSQL', 'Server Actions', 'Vercel'], liveUrl: 'https://www.renovatucocina.com.ar', images: [image('renova-tu-cocina', 'platform', 'Portfolio editorial de Renová Tu Cocina')] }],
  },
  {
    slug: 'mdvproyectos', company: 'MDVproyectos', position: 'Desarrollador WordPress', type: 'freelance',
    startDate: 'nov. 2024', endDate: 'abr. 2025', location: 'Argentina · Remoto',
    summary: 'Optimización continua del sitio, mejoras de estructura y funcionalidad, y desarrollo de landings de campaña orientadas a conversión.',
    highlights: ['Optimización de rendimiento, SEO y buenas prácticas.', 'Mejoras de estructura y experiencia de interfaz.', 'Landings para campañas de marketing y conversión.'],
    stack: ['WordPress', 'SEO', 'Performance'],
    projects: [{ id: 'website', name: 'Sitio y landings de campaña', subtitle: 'Optimización y conversión', role: 'Desarrollador WordPress', contribution: 'Implementé cambios de estructura y funcionalidad, mejoras de UX/UI y landings para campañas, con iteraciones cortas sobre producción.', impact: 'Mejoras sostenidas para las campañas y la navegación diaria del sitio.', stack: ['WordPress', 'SEO', 'Performance'], images: [image('mdvproyectos', 'website', 'Sitio y landing de MDVproyectos')] }],
  },
  {
    slug: 'fefe-bakes', company: 'Fefe Bakes', position: 'Full-Stack Developer', type: 'freelance',
    startDate: 'oct. 2024', endDate: 'dic. 2024', location: 'Argentina · Remoto',
    summary: 'E-commerce a medida, construido con frontend en React y backend Node/Express sobre PostgreSQL y Sequelize.',
    highlights: ['Frontend en React, Axios y Redux.', 'Backend Node.js, Express, PostgreSQL y Sequelize.', 'Arquitectura full stack preparada para catálogo, pedidos y contenido.'],
    stack: ['React', 'Redux', 'Axios', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize'],
    projects: [{ id: 'ecommerce', name: 'E-commerce Fefe Bakes', subtitle: 'Tienda a medida', role: 'Full-Stack Developer', contribution: 'Construí el frontend con React, HTML/CSS, Axios y Redux, junto con un backend Node/Express conectado a PostgreSQL mediante Sequelize.', impact: 'Base funcional lista para evolucionar catálogo, pedidos y contenido.', stack: ['React', 'Redux', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize'], images: [image('fefe-bakes', 'ecommerce', 'E-commerce desarrollado para Fefe Bakes')] }],
  },
]

export const getExperienceBySlug = (slug: string | undefined) =>
  experiences.find((experience) => experience.slug === slug)
