import { caseStudies } from './caseStudies'
import { fefeBakesMedia } from './projectMedia'
import type { Locale } from '@/context/LocaleContext'

export type Localized = { es: string; en: string }
export type LocalizedList = { es: string[]; en: string[] }
export type Screenshot = { src: string; alt: Localized; width: number; height: number }
export type ProjectMedia = { desktop: Screenshot; mobile?: Screenshot }
export type LocalizedScreenshot = Omit<Screenshot, 'alt'> & { alt: string }
export type LocalizedProjectMedia = { desktop: LocalizedScreenshot; mobile?: LocalizedScreenshot }

// Structured case study: headed sections made of paragraphs and bullet lists.
// A bullet can open with a bold lead sentence.
export type CaseBullet = { lead?: Localized; text: Localized }
export type CaseBlock = { type: 'paragraph'; text: Localized } | { type: 'list'; items: CaseBullet[] }
export type CaseSection = { heading: Localized; blocks: CaseBlock[] }
export type CaseSections = { title?: Localized; meta?: Localized; sections: CaseSection[] }

export type LocalizedCaseBlock = { type: 'paragraph'; text: string } | { type: 'list'; items: Array<{ lead?: string; text: string }> }
export type LocalizedCaseSections = { title?: string; meta?: string; sections: Array<{ heading: string; blocks: LocalizedCaseBlock[] }> }

export type ExperienceProject = {
  body?: LocalizedList; caseSections?: CaseSections; period?: Localized
  id: string; name: Localized; subtitle: Localized; role: Localized; contribution: Localized; impact: Localized
  stack: string[]; liveUrl?: string; media: ProjectMedia[]
}

export type LocalizedExperienceProject = Omit<ExperienceProject, 'name' | 'subtitle' | 'role' | 'contribution' | 'impact' | 'media' | 'body' | 'caseSections' | 'period'> & {
  body?: string[]; caseSections?: LocalizedCaseSections; period?: string; name: string; subtitle: string; role: string; contribution: string; impact: string; media: LocalizedProjectMedia[]
}

export type Experience = {
  slug: string; company: string; companyUrl?: string; position: Localized; type: 'empresa' | 'freelance'
  startDate: DateValue | null; endDate: DateValue | null; period?: Localized; displayName?: Localized; location: Localized; summary: Localized; highlights: LocalizedList
  stack: string[]; projects: ExperienceProject[]
}

export type LocalizedExperience = Omit<Experience, 'position' | 'location' | 'summary' | 'highlights' | 'projects'> & {
  position: string; location: string; summary: string; highlights: string[]; projects: LocalizedExperienceProject[]
}

type DateValue = { month: number; year: number }
const text = <T extends string | string[]>(value: { es: T; en: T }, locale: Locale): T => value[locale] || value.es

export const clientExperiences: Experience[] = [
  {
    "slug": "solution",
    "company": "Solution Perfumes",
    "companyUrl": "https://solution-topaz.vercel.app/",
    "position": {
      "es": "Full-Stack Developer",
      "en": "Full-Stack Developer"
    },
    "type": "freelance",
    "startDate": {
      "month": 2,
      "year": 2026
    },
    "endDate": {
      "month": 9,
      "year": 2026
    },
    "location": {
      "es": "Argentina · Remoto",
      "en": "Argentina · Remote"
    },
    "summary": {
      "es": "Desarrollé la plataforma de e-commerce propia de Solution, que entró en producción a principios de abril de 2026. La marca pasó de unos 80 pedidos mensuales en Tienda Nube a unos 300, y al 14 de septiembre de 2026 la plataforma había procesado 1.086 pedidos de 1.006 compradores únicos. Estuvo en producción hasta el 5 de octubre de 2026, cuando el cliente migró a Shopify para simplificar las integraciones con sus proveedores logísticos.",
      "en": "I built Solution’s custom e-commerce platform, which went live in early April 2026. The brand went from around 80 monthly orders on Tienda Nube to around 300, and as of September 14, 2026, the platform had processed 1,086 orders from 1,006 unique buyers. It ran in production until October 5, 2026, when the client moved to Shopify to simplify integrations with its logistics providers."
    },
    "highlights": {
      "es": [
        "Mercado Pago como única pasarela.",
        "Envíos nacionales mediante Correo Argentino.",
        "Checkout con estados explícitos de pago.",
        "Portal mayorista con aprobación de cuenta y acceso por plan."
      ],
      "en": [
        "Mercado Pago as the sole payment provider.",
        "Nationwide shipping through Correo Argentino.",
        "Checkout with explicit payment states.",
        "Wholesale portal with account approval and plan-based access."
      ]
    },
    "stack": [
      "React",
      "Node.js",
      "Mercado Pago",
      "REST API",
      "Correo Argentino",
      "Auth"
    ],
    "projects": [
      {
        "id": "ecommerce",
        "name": {
          "es": "E-commerce y portal mayorista",
          "en": "E-commerce and wholesale portal"
        },
        "subtitle": {
          "es": "Desarrollo propio de e-commerce completo",
          "en": "Custom end-to-end e-commerce platform"
        },
        "role": {
          "es": "Full-Stack Developer",
          "en": "Full-Stack Developer"
        },
        "contribution": {
          "es": "Desarrollé la tienda con Mercado Pago y Correo Argentino. Modelé estados de pago explícitos y separé las reglas minoristas de las mayoristas para mantener condiciones distintas por canal.",
          "en": "I developed the store with Mercado Pago and Correo Argentino. I modeled explicit payment states and separated retail from wholesale rules to maintain distinct terms for each channel."
        },
        "impact": {
          "es": "En producción de abril a octubre de 2026. La marca pasó de unos 80 a unos 300 pedidos mensuales; al 14 de septiembre de 2026, la plataforma había procesado 1.086 pedidos de 1.006 compradores únicos.",
          "en": "In production from April to October 2026. The brand went from around 80 to around 300 monthly orders; as of September 14, 2026, the platform had processed 1,086 orders from 1,006 unique buyers."
        },
        "stack": [
          "React",
          "Node.js",
          "Mercado Pago",
          "Correo Argentino"
        ],
        "liveUrl": "https://solution-topaz.vercel.app/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/solution/solution-home.webp",
              "width": 2532,
              "height": 1266,
              "alt": {
                "es": "Portada de Solution Perfumes en escritorio: presentación de fragancias y acceso al carrito.",
                "en": "Solution Perfumes desktop homepage: fragrance introduction and cart access."
              }
            },
            "mobile": {
              "src": "/images/experiencia/solution/solution-home-mobile.webp",
              "width": 850,
              "height": 1100,
              "alt": {
                "es": "Vista mobile de SOLUTION: interfaz del e-commerce adaptada a pantalla pequeña.",
                "en": "SOLUTION mobile view: e-commerce interface adapted for small screens."
              }
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "zetenta",
    "company": "Zetenta",
    "companyUrl": "https://www.zetenta.com/web/es/portfolio/",
    "position": {
      "es": "Web Developer",
      "en": "Web Developer"
    },
    "type": "empresa",
    "startDate": {
      "month": 4,
      "year": 2025
    },
    "endDate": {
      "month": 10,
      "year": 2025
    },
    "location": {
      "es": "Provincia de Buenos Aires, Argentina · Híbrido",
      "en": "Buenos Aires Province, Argentina · Hybrid"
    },
    "summary": {
      "es": "Trabajé en relación de dependencia entre abril y octubre de 2025. Participé en más de 7 proyectos, desde sitios WordPress editables hasta integraciones con APIs y CRM.",
      "en": "I worked as an employee from April to October 2025. I contributed to seven projects, from editable WordPress sites to API and CRM integrations."
    },
    "highlights": {
      "es": [
        "Siete proyectos dentro del equipo de Zetenta.",
        "Implementación de diseños de Figma en WordPress.",
        "Gutenberg y ACF para edición de contenido.",
        "Integraciones con datos externos y Kommo CRM."
      ],
      "en": [
        "Seven projects within the Zetenta team.",
        "Implementation of Figma designs in WordPress.",
        "Gutenberg and ACF for content editing.",
        "External data and Kommo CRM integrations."
      ]
    },
    "stack": [
      "WordPress",
      "PHP",
      "JavaScript",
      "Sass",
      "Gutenberg",
      "ACF",
      "HTML5",
      "CSS3"
    ],
    "projects": [
      {
        "id": "manantial",
        "name": {
          "es": "Manantial",
          "en": "Manantial"
        },
        "subtitle": {
          "es": "Sitio completo (+45 páginas)",
          "en": "Full website (+45 pages)"
        },
        "role": {
          "es": "Desarrollo completo WordPress",
          "en": "Full WordPress development"
        },
        "contribution": {
          "es": "Desarrollé el sitio completo desde Figma con Gutenberg y ACF. Separé contenido y estructura visual mediante campos editables, variantes de encabezados y pies, y plantillas por departamento.",
          "en": "I developed the complete site from Figma using Gutenberg and ACF. I separated content from visual structure with editable fields, header and footer variants, and department templates."
        },
        "impact": {
          "es": "Más de 45 páginas que el equipo administra desde WordPress; todas son editables sin tocar código.",
          "en": "More than 45 pages managed by the team in WordPress; every page is editable without touching code."
        },
        "stack": [
          "WordPress",
          "Gutenberg",
          "ACF",
          "PHP",
          "JavaScript",
          "Sass"
        ],
        "liveUrl": "https://www.manantialghumano.com.ar/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/zetenta/manantial-home.webp",
              "width": 2530,
              "height": 1268,
              "alt": {
                "es": "Portada de Manantial en escritorio: presentación del servicio gerontológico sobre una imagen de una persona mayor y cinco accesos circulares a sus áreas.",
                "en": "Manantial desktop homepage: gerontology service introduction over an image of an older person and five circular links to its departments."
              }
            },
            "mobile": {
              "src": "/images/experiencia/zetenta/manantial-home-mobile.webp",
              "width": 850,
              "height": 1100,
              "alt": {
                "es": "Portada de Manantial en mobile: logo, menú hamburguesa, presentación del servicio gerontológico y accesos circulares a Edificio y Residencia.",
                "en": "Manantial mobile homepage: logo, hamburger menu, gerontology service introduction, and circular links to Building and Residence."
              }
            }
          }
        ]
      },
      {
        "id": "yacoub",
        "name": {
          "es": "Bajó de precio",
          "en": "Price reductions"
        },
        "subtitle": {
          "es": "Yacoub · Front-End + PHP (API)",
          "en": "Yacoub · Front-End + PHP (API)"
        },
        "role": {
          "es": "Front-End + PHP",
          "en": "Front-End + PHP"
        },
        "contribution": {
          "es": "Desarrollé un backend PHP para consumir una API externa basada en Excel y normalizar los datos antes de renderizarlos en el servidor. Integré filtros en WordPress para consultar propiedades dentro del diseño existente.",
          "en": "I developed a PHP backend to consume an external Excel-based API and normalize its data before server rendering. I integrated WordPress filters to search properties within the existing design."
        },
        "impact": {
          "es": "La búsqueda reúne filtros y datos de la API en una misma página.",
          "en": "The search combines filters and API data on one page."
        },
        "stack": [
          "WordPress",
          "PHP",
          "JavaScript"
        ],
        "liveUrl": "https://yacoub.com.ar/bajo-de-precio/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/zetenta/yacoub-bajo-de-precio.webp",
              "width": 2511,
              "height": 1260,
              "alt": {
                "es": "Vista de escritorio de Bajó de precio: buscador de propiedades con filtros y resultados actualizados.",
                "en": "Price reductions desktop view: property search with filters and current results."
              }
            },
            "mobile": {
              "src": "/images/experiencia/zetenta/yacoub-bajo-de-precio-mobile.webp",
              "width": 827,
              "height": 1088,
              "alt": {
                "es": "Vista mobile de Bajó de precio: buscador de propiedades adaptado a pantalla pequeña.",
                "en": "Price reductions mobile view: property search adapted for small screens."
              }
            }
          }
        ]
      },
      {
        "id": "madero-walk",
        "name": {
          "es": "Corporativos",
          "en": "Corporate events"
        },
        "subtitle": {
          "es": "Madero Walk · Landings por segmento",
          "en": "Madero Walk · Segment-specific landing pages"
        },
        "role": {
          "es": "Front-End (Elementor)",
          "en": "Front-End (Elementor)"
        },
        "contribution": {
          "es": "Implementé landings por segmento en Elementor y componentes específicos con HTML, CSS y JavaScript. Separé las propuestas por tipo de evento para organizar el contenido y las consultas de cada público.",
          "en": "I implemented segment-specific Elementor landing pages and custom HTML, CSS, and JavaScript components. I separated event propositions to organize content and inquiries for each audience."
        },
        "impact": {
          "es": "La entrega incluyó adaptación responsive y configuración de SEO on-page.",
          "en": "The delivery included responsive layouts and on-page SEO configuration."
        },
        "stack": [
          "WordPress",
          "Elementor",
          "HTML",
          "CSS",
          "JavaScript"
        ],
        "liveUrl": "https://maderowalk.com/corporativos-madero-walk/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/zetenta/madero-walk.webp",
              "width": 2516,
              "height": 1257,
              "alt": {
                "es": "Vista de escritorio de Madero Walk: landing corporativa orientada a consultas de eventos.",
                "en": "Madero Walk desktop view: corporate landing page for event inquiries."
              }
            },
            "mobile": {
              "src": "/images/experiencia/zetenta/madero-walk-mobile.webp",
              "width": 824,
              "height": 1083,
              "alt": {
                "es": "Vista mobile de Madero Walk: landing corporativa adaptada a pantalla pequeña.",
                "en": "Madero Walk mobile view: corporate landing page adapted for small screens."
              }
            }
          }
        ]
      },
      {
        "id": "exagon-impact",
        "name": {
          "es": "Exagon Impact",
          "en": "Exagon Impact"
        },
        "subtitle": {
          "es": "Portfolio y actualizaciones de home",
          "en": "Portfolio and homepage updates"
        },
        "role": {
          "es": "WordPress Developer",
          "en": "WordPress Developer"
        },
        "contribution": {
          "es": "Creé la sección de portfolio, actualicé la home y desarrollé el bloque “Conocé al equipo”. Organicé proyectos y presentación institucional en secciones diferenciadas dentro del sitio WordPress.",
          "en": "I created the portfolio section, updated the homepage, and developed the “Meet the team” block. I organized projects and company information into distinct sections within the WordPress site."
        },
        "impact": {
          "es": "Quedaron implementadas las secciones de proyectos y equipo.",
          "en": "The project and team sections were implemented."
        },
        "stack": [
          "WordPress",
          "PHP",
          "JavaScript",
          "Sass"
        ],
        "liveUrl": "https://exagonimpact.com/portfolio/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/zetenta/exagon-impact.webp",
              "width": 2530,
              "height": 1278,
              "alt": {
                "es": "Portfolio de Exagon Impact en escritorio: presentación de inversiones y logos de SALA y SunRoof.",
                "en": "Exagon Impact desktop portfolio: investment introduction and SALA and SunRoof logos."
              }
            },
            "mobile": {
              "src": "/images/experiencia/zetenta/exagon-impact-mobile.webp",
              "width": 850,
              "height": 1100,
              "alt": {
                "es": "Portfolio de Exagon Impact en mobile: presentación de inversiones y logo de SALA.",
                "en": "Exagon Impact mobile portfolio: investment introduction and SALA logo."
              }
            }
          }
        ]
      },
      {
        "id": "aeroclub",
        "name": {
          "es": "Aeroclub Capitán Sarmiento",
          "en": "Aeroclub Capitán Sarmiento"
        },
        "subtitle": {
          "es": "Optimización de performance",
          "en": "Performance optimization"
        },
        "role": {
          "es": "Web Performance",
          "en": "Web Performance"
        },
        "contribution": {
          "es": "Audité la carga del sitio y trabajé sobre imágenes, lazy loading, CSS crítico y fuentes. Prioricé los recursos del primer render y diferí imágenes fuera de la vista inicial.",
          "en": "I audited site loading and worked on images, lazy loading, critical CSS, and fonts. I prioritized initial-render resources and deferred images outside the initial viewport."
        },
        "impact": {
          "es": "La intervención cubrió la carga de recursos y su prioridad de descarga.",
          "en": "The work covered resource loading and download priority."
        },
        "stack": [
          "Performance",
          "WordPress",
          "CSS",
          "Lazy loading"
        ],
        "liveUrl": "https://aeroclubcapitansarmiento.com/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/zetenta/aeroclub-capitan-sarmiento.webp",
              "width": 2517,
              "height": 1250,
              "alt": {
                "es": "Vista de escritorio de Aeroclub Capitán Sarmiento: sitio institucional optimizado para carga rápida.",
                "en": "Aeroclub Capitán Sarmiento desktop view: institutional website optimized for fast loading."
              }
            },
            "mobile": {
              "src": "/images/experiencia/zetenta/aeroclub-capitan-sarmiento-mobile.webp",
              "width": 850,
              "height": 1100,
              "alt": {
                "es": "Vista mobile de Aeroclub Capitán Sarmiento: sitio institucional adaptado a pantalla pequeña.",
                "en": "Aeroclub Capitán Sarmiento mobile view: institutional website adapted for small screens."
              }
            }
          }
        ]
      },
      {
        "id": "zetenta-site",
        "name": {
          "es": "Zetenta.com",
          "en": "Zetenta.com"
        },
        "subtitle": {
          "es": "Páginas de servicios y portfolio",
          "en": "Service pages and portfolio"
        },
        "role": {
          "es": "Front-End Developer",
          "en": "Front-End Developer"
        },
        "contribution": {
          "es": "Construí dos landings de servicios y contribuí al portfolio del sitio de Zetenta. Reutilicé la estructura visual del sitio para integrar las páginas nuevas con el contenido existente.",
          "en": "I built two service landing pages and contributed to Zetenta’s portfolio. I reused the site’s visual structure to integrate the new pages with existing content."
        },
        "impact": {
          "es": "Páginas de desarrollo web, redes y marketing, junto con aportes al portfolio.",
          "en": "Web development, social media, and marketing pages, alongside portfolio contributions."
        },
        "stack": [
          "WordPress",
          "PHP",
          "JavaScript",
          "Sass"
        ],
        "liveUrl": "https://www.zetenta.com/web/es/service/desarrollo-web-ecommerce/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/zetenta/01-zetenta-web-portfolio.webp",
              "width": 2520,
              "height": 1251,
              "alt": {
                "es": "Vista de escritorio de Zetenta: portfolio de proyectos y servicios de la agencia.",
                "en": "Zetenta desktop view: agency project and service portfolio."
              }
            },
            "mobile": {
              "src": "/images/experiencia/zetenta/01-zetenta-web-portfolio-mobile.webp",
              "width": 850,
              "height": 1100,
              "alt": {
                "es": "Vista mobile de Zetenta: portfolio de la agencia adaptado a pantalla pequeña.",
                "en": "Zetenta mobile view: agency portfolio adapted for small screens."
              }
            }
          },
          {
            "desktop": {
              "src": "/images/experiencia/zetenta/02-zetenta-web-servicios-desarrollo-web.webp",
              "width": 2507,
              "height": 1253,
              "alt": {
                "es": "Vista de escritorio de Zetenta: landing del servicio de desarrollo web y e-commerce.",
                "en": "Zetenta desktop view: web development and e-commerce service landing page."
              }
            }
          },
          {
            "desktop": {
              "src": "/images/experiencia/zetenta/03-zetenta-web-servicios-redes-y-marketing.webp",
              "width": 2516,
              "height": 1257,
              "alt": {
                "es": "Vista de escritorio de Zetenta: landing del servicio de redes sociales y marketing.",
                "en": "Zetenta desktop view: social media and marketing service landing page."
              }
            }
          }
        ]
      },
      {
        "id": "go-building",
        "name": {
          "es": "Go Building",
          "en": "Go Building"
        },
        "subtitle": {
          "es": "Dos landing pages + Kommo CRM",
          "en": "Two landing pages + Kommo CRM"
        },
        "role": {
          "es": "Front-End + integración CRM",
          "en": "Front-End + CRM integration"
        },
        "contribution": {
          "es": "Desarrollé dos landings e integré sus formularios con Kommo CRM. Definí el pipeline y el estado de los leads para que cada consulta ingresara al proceso comercial correspondiente.",
          "en": "I developed two landing pages and integrated their forms with Kommo CRM. I defined lead pipelines and statuses so each inquiry entered the appropriate sales process."
        },
        "impact": {
          "es": "Los formularios crean leads en Kommo con pipeline y estado definidos.",
          "en": "The forms create Kommo leads with defined pipelines and statuses."
        },
        "stack": [
          "WordPress",
          "JavaScript",
          "Kommo CRM",
          "HTML",
          "CSS"
        ],
        "liveUrl": "https://go-building.com/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/zetenta/go-building.webp",
              "width": 2518,
              "height": 1258,
              "alt": {
                "es": "Vista de escritorio de Go Building: landing de captación conectada al CRM.",
                "en": "Go Building desktop view: lead-generation landing page connected to the CRM."
              }
            },
            "mobile": {
              "src": "/images/experiencia/zetenta/go-building-mobile.webp",
              "width": 850,
              "height": 1100,
              "alt": {
                "es": "Vista mobile de Go Building: landing de captación adaptada a pantalla pequeña.",
                "en": "Go Building mobile view: lead-generation landing page adapted for small screens."
              }
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "espacio-boa",
    "company": "Espacio BOA",
    "companyUrl": "https://espacioboa.com/",
    "position": {
      "es": "Full-Stack Developer",
      "en": "Full-Stack Developer"
    },
    "type": "freelance",
    "startDate": {
      "month": 9,
      "year": 2025
    },
    "endDate": {
      "month": 11,
      "year": 2025
    },
    "location": {
      "es": "Provincia de Buenos Aires, Argentina · Remoto",
      "en": "Buenos Aires Province, Argentina · Remote"
    },
    "summary": {
      "es": "En BOA, las actividades del centro holístico se descubrían leyendo un calendario colgado en el café. Desarrollé una plataforma que reúne ambos espacios, publica la agenda y permite inscribirse con anticipación. Hoy funciona en producción y uno de los dueños administra las actividades desde el panel.",
      "en": "At BOA, discovering the holistic center’s activities meant reading a calendar on the café wall. I built a platform that brings both spaces together, publishes the schedule, and supports advance registration. It’s now live, with one of the owners managing activities through the dashboard."
    },
    "highlights": {
      "es": [
        "Agenda web para el café y el centro holístico.",
        "Inscripción previa con control de cupos.",
        "Panel administrado por uno de los dueños."
      ],
      "en": [
        "Web schedule for the café and holistic center.",
        "Advance registration with capacity limits.",
        "Dashboard managed by one of the owners."
      ]
    },
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "Resend",
      "Vercel",
      "Framer Motion"
    ],
    "projects": [
      {
        "id": "platform",
        "name": {
          "es": "Plataforma Espacio BOA",
          "en": "Espacio BOA platform"
        },
        "subtitle": {
          "es": "Reservas, agenda y operación interna",
          "en": "Bookings, schedule, and internal operations"
        },
        "role": {
          "es": "Full-Stack Developer",
          "en": "Full-Stack Developer"
        },
        "contribution": {
          "es": "Reuní el café y el centro holístico en una plataforma con agenda e inscripciones. Modelé fechas, visibilidad y cupos para vincular la publicación con la participación. El panel incluye gift cards con códigos únicos y estados de canje.",
          "en": "I brought the café and holistic center into a platform with scheduling and registration. I modeled dates, visibility, and capacity to connect publishing with participation. The dashboard includes gift cards with unique codes and redemption states."
        },
        "impact": {
          "es": "La programación pasó del calendario de pared a la web. Uno de los dueños administra las actividades y las personas pueden inscribirse antes de ir.",
          "en": "The schedule moved from a wall calendar to the web. One of the owners manages activities, and people can register before visiting."
        },
        "stack": [
          "Next.js",
          "TypeScript",
          "Supabase",
          "Tailwind",
          "Resend"
        ],
        "liveUrl": "https://espacioboa.com/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/espacio-boa/espacio-boa.webp",
              "width": 2530,
              "height": 1270,
              "alt": {
                "es": "Vista de escritorio de Espacio BOA: plataforma con agenda, reservas y actividades.",
                "en": "Espacio BOA desktop view: platform with schedules, bookings, and activities."
              }
            },
            "mobile": {
              "src": "/images/experiencia/espacio-boa/espacio-boa-mobile.webp",
              "width": 850,
              "height": 1100,
              "alt": {
                "es": "Vista mobile de Espacio BOA: agenda y reservas adaptadas a pantalla pequeña.",
                "en": "Espacio BOA mobile view: schedules and bookings adapted for small screens."
              }
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "renova-tu-cocina",
    "company": "Renová Tu Cocina",
    "companyUrl": "https://www.renovatucocina.com.ar",
    "position": {
      "es": "Full-Stack Developer",
      "en": "Full-Stack Developer"
    },
    "type": "freelance",
    "startDate": {
      "month": 3,
      "year": 2026
    },
    "endDate": {
      "month": 3,
      "year": 2026
    },
    "location": {
      "es": "Argentina · Remoto",
      "en": "Argentina · Remote"
    },
    "summary": {
      "es": "Desarrollé en un mes el portfolio de obras y su panel de gestión con Next.js y Supabase. Los formularios preparan consultas por WhatsApp con el contexto del proyecto.",
      "en": "I developed the project portfolio and management dashboard in one month using Next.js and Supabase. Forms prepare WhatsApp inquiries with project context."
    },
    "highlights": {
      "es": [
        "Panel para publicar, ordenar y destacar obras.",
        "Carga de imágenes y comparador antes/después.",
        "Formulario por pasos conectado con WhatsApp.",
        "Contenido estático de respaldo ante fallos de lectura de Supabase."
      ],
      "en": [
        "Dashboard to publish, order, and feature projects.",
        "Image uploads and before-and-after comparison.",
        "Multi-step form connected to WhatsApp.",
        "Static fallback content when Supabase reads fail."
      ]
    },
    "stack": [
      "Next.js 15",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Supabase",
      "PostgreSQL",
      "Server Actions",
      "Vercel"
    ],
    "projects": [
      {
        "id": "platform",
        "name": {
          "es": "Plataforma editorial y panel",
          "en": "Editorial platform and dashboard"
        },
        "subtitle": {
          "es": "Portfolio de obras y gestión autónoma",
          "en": "Project portfolio and self-service management"
        },
        "role": {
          "es": "Full-Stack Developer",
          "en": "Full-Stack Developer"
        },
        "contribution": {
          "es": "Construí filtros, detalle de obras, comparador antes/después y un panel con autenticación y carga de imágenes. Elegí consultas contextualizadas por WhatsApp para conectar el recorrido web con el canal comercial. Incorporé contenido estático de respaldo para las lecturas cubiertas cuando Supabase no responde.",
          "en": "I built filters, project pages, a before-and-after comparison, and a dashboard with authentication and image uploads. I used contextual WhatsApp inquiries to connect the website journey with the sales channel. I added static fallback content for covered reads when Supabase is unavailable."
        },
        "impact": {
          "es": "El panel permite publicar y ordenar obras. El fallback cubre contenido de consulta, no las escrituras ni la disponibilidad completa del sistema.",
          "en": "The dashboard supports publishing and ordering projects. The fallback covers read-only content, not writes or full system availability."
        },
        "stack": [
          "Next.js 15",
          "Supabase",
          "PostgreSQL",
          "Server Actions",
          "Vercel"
        ],
        "liveUrl": "https://www.renovatucocina.com.ar",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/renova-tu-cocina/renova-tu-cocina.webp",
              "width": 2528,
              "height": 1272,
              "alt": {
                "es": "Vista de escritorio de Renová Tu Cocina: portfolio editorial de obras y reformas.",
                "en": "Renová Tu Cocina desktop view: editorial portfolio of projects and renovations."
              }
            },
            "mobile": {
              "src": "/images/experiencia/renova-tu-cocina/renova-tu-cocina-mobile.webp",
              "width": 850,
              "height": 1100,
              "alt": {
                "es": "Vista mobile de Renová Tu Cocina: portfolio de obras adaptado a pantalla pequeña.",
                "en": "Renová Tu Cocina mobile view: project portfolio adapted for small screens."
              }
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "mdvproyectos",
    "companyUrl": "https://mdvproyectos.com.ar/",
    "company": "MDVproyectos",
    "position": {
      "es": "Desarrollador WordPress",
      "en": "WordPress Developer"
    },
    "type": "freelance",
    "startDate": {
      "month": 11,
      "year": 2024
    },
    "endDate": {
      "month": 4,
      "year": 2025
    },
    "location": {
      "es": "Argentina · Remoto",
      "en": "Argentina · Remote"
    },
    "summary": {
      "es": "Trabajé sobre el sitio WordPress existente y desarrollé landings para campañas. Organicé las mejoras en entregas cortas para revisar cada cambio dentro del sitio en uso.",
      "en": "I worked on the existing WordPress site and developed campaign landing pages. I organized improvements into small deliveries to review each change within the running site."
    },
    "highlights": {
      "es": [
        "Cambios de estructura y funcionalidad.",
        "Landings para campañas de marketing.",
        "Trabajo sobre rendimiento y configuración de SEO."
      ],
      "en": [
        "Structural and functional changes.",
        "Marketing campaign landing pages.",
        "Work on performance and SEO configuration."
      ]
    },
    "stack": [
      "WordPress",
      "SEO",
      "Performance"
    ],
    "projects": [
      {
        "liveUrl": "https://mdvproyectos.com.ar/",
        "id": "website",
        "name": {
          "es": "Sitio y landings de campaña",
          "en": "Website and campaign landing pages"
        },
        "subtitle": {
          "es": "Optimización y conversión",
          "en": "Optimization and conversion"
        },
        "role": {
          "es": "Desarrollador WordPress",
          "en": "WordPress Developer"
        },
        "contribution": {
          "es": "Trabajé sobre el sitio WordPress existente y desarrollé landings para campañas. Organicé las mejoras en entregas cortas para revisar cada cambio dentro del sitio en uso.",
          "en": "I worked on the existing WordPress site and developed campaign landing pages. I organized improvements into small deliveries to review each change within the running site."
        },
        "impact": {
          "es": "La entrega incluyó ajustes del sitio y páginas específicas para campañas.",
          "en": "The delivery included site updates and dedicated campaign pages."
        },
        "stack": [
          "WordPress",
          "SEO",
          "Performance"
        ],
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/mdvproyectos/mdvproyectos.webp",
              "width": 2528,
              "height": 1270,
              "alt": {
                "es": "Vista de escritorio de MDVproyectos: sitio y landing orientados a conversión.",
                "en": "MDVproyectos desktop view: website and conversion-oriented landing page."
              }
            },
            "mobile": {
              "src": "/images/experiencia/mdvproyectos/mdvproyectos-mobile.webp",
              "width": 850,
              "height": 1100,
              "alt": {
                "es": "Vista mobile de MDVproyectos: landing de campaña adaptada a pantalla pequeña.",
                "en": "MDVproyectos mobile view: campaign landing page adapted for small screens."
              }
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "fefe-bakes",
    "companyUrl": "https://fefebakes.com/",
    "company": "Fefe Bakes",
    "position": {
      "es": "Full-Stack Developer",
      "en": "Full-Stack Developer"
    },
    "type": "freelance",
    "startDate": {
      "month": 10,
      "year": 2024
    },
    "endDate": {
      "month": 12,
      "year": 2024
    },
    "location": {
      "es": "Argentina · Remoto",
      "en": "Argentina · Remote"
    },
    "summary": {
      "es": "Desarrollé el frontend de la tienda con React y un backend Node.js/Express conectado a PostgreSQL. Separé interfaz y persistencia para mantener las responsabilidades de cada parte del sistema.",
      "en": "I developed the store frontend with React and a Node.js/Express backend connected to PostgreSQL. I separated the interface from persistence to keep each part’s responsibilities distinct."
    },
    "highlights": {
      "es": [
        "React, Axios y Redux para la interfaz.",
        "Node.js y Express para el backend.",
        "PostgreSQL y Sequelize para persistencia."
      ],
      "en": [
        "React, Axios, and Redux for the interface.",
        "Node.js and Express for the backend.",
        "PostgreSQL and Sequelize for persistence."
      ]
    },
    "stack": [
      "React",
      "Redux",
      "Axios",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Sequelize"
    ],
    "projects": [
      {
        "liveUrl": "https://fefebakes.com/",
        "id": "ecommerce",
        "name": {
          "es": "E-commerce Fefe Bakes",
          "en": "Fefe Bakes e-commerce"
        },
        "subtitle": {
          "es": "Tienda a medida",
          "en": "Custom online store"
        },
        "role": {
          "es": "Full-Stack Developer",
          "en": "Full-Stack Developer"
        },
        "contribution": {
          "es": "Desarrollé el frontend de la tienda con React y un backend Node.js/Express conectado a PostgreSQL. Separé interfaz y persistencia para mantener las responsabilidades de cada parte del sistema.",
          "en": "I developed the store frontend with React and a Node.js/Express backend connected to PostgreSQL. I separated the interface from persistence to keep each part’s responsibilities distinct."
        },
        "impact": {
          "es": "Implementación de frontend y backend para la tienda.",
          "en": "Frontend and backend implementation for the store."
        },
        "stack": [
          "React",
          "Redux",
          "Node.js",
          "Express",
          "PostgreSQL",
          "Sequelize"
        ],
        "media": [fefeBakesMedia]
      }
    ]
  },
  {
    "slug": "kyriazis",
    "companyUrl": "https://kyriazislawyer.com/",
    "company": "Laura Kyriazis Law Group",
    "position": {
      "es": "Desarrollador web",
      "en": "Web Developer"
    },
    "type": "freelance",
    "startDate": {
      "month": 4,
      "year": 2024
    },
    "endDate": null,
    "period": {
      "es": "Primer trabajo profesional · abril de 2024",
      "en": "First professional project · April 2024"
    },
    "location": {
      "es": "San Francisco, Estados Unidos · Remoto",
      "en": "San Francisco, United States · Remote"
    },
    "summary": {
      "es": "Mi primer trabajo profesional fue un sitio para una abogada de planificación patrimonial en San Francisco. Tras la baja de la versión en Framer por falta de pago, lo reconstruí con desarrollo propio.",
      "en": "My first professional project was a website for an estate planning attorney in San Francisco. After the Framer version went offline due to nonpayment, I rebuilt it with custom code."
    },
    "highlights": {
      "es": [
        "Primera versión en Framer.",
        "Reconstrucción con desarrollo propio.",
        "Sitio simple, sin dependencia de la suscripción de Framer."
      ],
      "en": [
        "First version built in Framer.",
        "Rebuilt with custom code.",
        "A simple site without dependence on a Framer subscription."
      ]
    },
    "stack": [],
    "projects": [
      {
        "liveUrl": "https://kyriazislawyer.com/",
        "id": "website",
        "name": {
          "es": "Laura Kyriazis Law Group",
          "en": "Laura Kyriazis Law Group"
        },
        "subtitle": {
          "es": "Reconstrucción de sitio institucional",
          "en": "Business website rebuild"
        },
        "role": {
          "es": "Desarrollo web",
          "en": "Web development"
        },
        "contribution": {
          "es": "Construí la primera versión en Framer. Cuando se dio de baja por falta de pago de la suscripción, rehice el sitio desde cero con desarrollo propio. Elegí sacar esa dependencia para evitar que la continuidad del sitio dependiera nuevamente de Framer.",
          "en": "I built the first version in Framer. When it went offline due to an unpaid subscription, I rebuilt the site from scratch with custom code. I removed that dependency so the site’s continuity would no longer depend on Framer."
        },
        "impact": {
          "es": "Un sitio simple para presentar los servicios de la abogada, sin depender de la suscripción de Framer.",
          "en": "A simple site presenting the attorney’s services without depending on a Framer subscription."
        },
        "stack": [],
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/kyriazis-lawyer/kyriazis-lawyer-home.png",
              "width": 1906,
              "height": 918,
              "alt": {
                "es": "Portada de Laura Kyriazis Law Group: planificación patrimonial sobre una fotografía de un olivo. Vista de escritorio.",
                "en": "Laura Kyriazis Law Group homepage: estate planning introduction over an olive tree photograph. Desktop view."
              }
            },
            "mobile": {
              "src": "/images/experiencia/kyriazis-lawyer/kyriazis-lawyer-home-mobile.png",
              "width": 850,
              "height": 1660,
              "alt": {
                "es": "Portada de Laura Kyriazis Law Group: planificación patrimonial sobre una fotografía de un olivo. Vista móvil.",
                "en": "Laura Kyriazis Law Group homepage: estate planning introduction over an olive tree photograph. Mobile view."
              }
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "don-teofilo-amoblamientos",
    "company": "Don Teófilo Amoblamientos",
    "companyUrl": "https://www.donteofiloamoblamientos.com/",
    "position": {
      "es": "Diseñador y desarrollador full-stack",
      "en": "Designer & full-stack developer"
    },
    "type": "freelance",
    "startDate": {
      "month": 7,
      "year": 2026
    },
    "endDate": {
      "month": 10,
      "year": 2026
    },
    "location": {
      "es": "Buenos Aires, Argentina",
      "en": "Buenos Aires, Argentina"
    },
    "summary": {
      "es": "Don Teófilo mostraba su trabajo solo por WhatsApp. Diseñé la identidad visual y desarrollé el sitio y su panel de administración: un lenguaje tomado de los planos de carpintería, reglas de publicación aplicadas en la base de datos y consultas por WhatsApp según la sección.",
      "en": "Don Teófilo only showed its work through WhatsApp. I designed the visual identity and built the website and its admin panel: a visual language drawn from carpentry plans, publishing rules enforced in the database, and WhatsApp inquiries tailored to each section."
    },
    "highlights": {
      "es": [
        "Identidad visual «Al milímetro», tomada del lenguaje de los planos de taller.",
        "Ilustraciones SVG generadas desde datos en milímetros, nítidas en cualquier pantalla.",
        "Reglas de visibilidad aplicadas en la base de datos con RLS y un trigger."
      ],
      "en": [
        "“Al milímetro” visual identity, drawn from the language of workshop plans.",
        "SVG illustrations generated from millimeter data, crisp on any screen.",
        "Visibility rules enforced in the database with RLS and a trigger."
      ]
    },
    "stack": [
      "React",
      "Vite",
      "JavaScript",
      "React Router",
      "Framer Motion",
      "Supabase",
      "PostgreSQL",
      "RLS",
      "SVG",
      "CSS Modules"
    ],
    "projects": [
      {
        "id": "website",
        "name": {
          "es": "Don Teófilo Amoblamientos",
          "en": "Don Teófilo Amoblamientos"
        },
        "subtitle": {
          "es": "Identidad visual, sitio y panel de administración",
          "en": "Visual identity, website and admin panel"
        },
        "role": {
          "es": "Diseñador y desarrollador full-stack",
          "en": "Designer & full-stack developer"
        },
        "contribution": {
          "es": "Don Teófilo mostraba su trabajo solo por WhatsApp. Diseñé la identidad visual y desarrollé el sitio y su panel de administración: un lenguaje tomado de los planos de carpintería, reglas de publicación aplicadas en la base de datos y consultas por WhatsApp según la sección.",
          "en": "Don Teófilo only showed its work through WhatsApp. I designed the visual identity and built the website and its admin panel: a visual language drawn from carpentry plans, publishing rules enforced in the database, and WhatsApp inquiries tailored to each section."
        },
        "impact": {
          "es": "En producción con dominio propio, con identidad de marca, catálogo y archivo de obras.",
          "en": "Live on its own domain, with a brand identity, a catalog and a project archive."
        },
        "caseSections": {
          "title": {
            "es": "Don Teófilo Amoblamientos: marca, sitio y panel para una carpintería a medida",
            "en": "Don Teófilo Amoblamientos: brand, website and admin panel for a custom carpentry shop"
          },
          "meta": {
            "es": "Diseñador y desarrollador full-stack",
            "en": "Designer & full-stack developer"
          },
          "sections": [
            {
              "heading": { "es": "Contexto", "en": "Context" },
              "blocks": [
                {
                  "type": "paragraph",
                  "text": {
                    "es": "Don Teófilo hace muebles a medida en Buenos Aires y Tandil. Sus ventas pasaban enteramente por WhatsApp: no había dónde ver el catálogo ni los trabajos terminados antes de escribir. El pedido era abierto (mostrar el trabajo y conseguir más clientes), sin especificaciones detalladas. Definí el alcance, la identidad visual y las funcionalidades, y los ajusté en dos reuniones de revisión con el cliente. Entregué una primera versión con catálogo y panel en julio y agosto, y en octubre rediseñé todo el sitio alrededor de una nueva identidad.",
                    "en": "Don Teófilo builds custom furniture in Buenos Aires and Tandil. Their sales ran entirely through WhatsApp: there was nowhere to see the catalog or finished work before reaching out. The brief was open (show the work, bring in more clients), with no detailed spec. I defined the scope, the visual identity and the features, and refined them across two review sessions with the client. I shipped a first version with the catalog and admin panel in July and August, then redesigned the whole site in October around a new identity."
                  }
                }
              ]
            },
            {
              "heading": { "es": "Qué construí", "en": "What I built" },
              "blocks": [
                {
                  "type": "paragraph",
                  "text": {
                    "es": "La identidad visual, «Al milímetro», además del sitio y su panel de administración. React y Vite en el frontend, conectado directamente a Supabase (Postgres, Auth, Storage), con las reglas de acceso aplicadas en la base mediante RLS. Un catálogo filtrable por categoría, material, precio y búsqueda; páginas de obras con antes y después y galería; una sección del taller; y botones de WhatsApp que llevan el contexto del producto u obra que se estaba viendo. Las fotos se redimensionan y se convierten a WebP en el navegador antes de subirse, así el cliente puede publicar directo desde el celular.",
                    "en": "The visual identity, “Al milímetro” (“down to the millimeter”), plus the website and its admin panel. React and Vite on the front end, talking directly to Supabase (Postgres, Auth, Storage), with access rules enforced in the database through row-level security. A catalog filterable by category, material, price and search; project pages with before-and-after views and a gallery; a workshop section; and WhatsApp buttons that carry the context of the product or project being viewed. Photos are resized and converted to WebP in the browser before upload, so the client can publish straight from a phone."
                  }
                }
              ]
            },
            {
              "heading": { "es": "Decisiones que importaron", "en": "Decisions that mattered" },
              "blocks": [
                {
                  "type": "list",
                  "items": [
                    {
                      "lead": { "es": "Una identidad tomada del taller.", "en": "An identity taken from the workshop." },
                      "text": {
                        "es": "Los carpinteros trabajan con planos, así que la interfaz habla ese idioma: cotas, medidas, dibujos técnicos. Diferencia al sitio de un catálogo genérico de muebles y refleja cómo funciona el oficio.",
                        "en": "Carpenters work from plans, so the interface speaks that language: dimension lines, measurements, technical drawings. It sets the site apart from a generic furniture catalog and reflects how the trade actually works."
                      }
                    },
                    {
                      "lead": { "es": "Ilustraciones generadas desde datos, no exportadas.", "en": "Illustrations generated from data, not exported." },
                      "text": {
                        "es": "Cada categoría del catálogo tiene un alzado de una pieza típica, descrito en milímetros, módulo por módulo: puertas, cajones, estantes. El componente mide su contenedor, calcula una escala uniforme de milímetros a píxeles y dibuja el SVG al tamaño real del contenedor, así los trazos y las cotas se ven nítidos en cualquier pantalla. Las aristas ocultas van punteadas, como en un plano real, y una categoría nueva armada con tipos de módulo existentes es solo datos. La página «Cómo trabajamos» aplica la misma idea a una vista isométrica de un bajo mesada, con su propia proyección.",
                        "en": "Each catalog category has a front-elevation drawing of a typical piece, described in millimeters, module by module: doors, drawers, shelves. The component measures its container, computes a uniform millimeter-to-pixel scale, and draws the SVG at the container’s real size, so lines and dimension labels stay crisp on any screen. Hidden edges are dashed, like on a real plan, and a new category built from existing module types is just data. The “How we work” page applies the same idea to an isometric view of a base cabinet, with its own projection math."
                      }
                    },
                    {
                      "lead": { "es": "Dos antes y después para dos problemas distintos.", "en": "Two before-and-after components for two different problems." },
                      "text": {
                        "es": "En la portada, la transición sigue el scroll dentro de una sección fijada, sin arrastre, para no competir con el desplazamiento en el celular. En cada obra hay un comparador arrastrable: en pantallas táctiles, al arrastrar sobre la imagen espera 8 px para leer la dirección del gesto y solo toma los horizontales, así la página se sigue pudiendo scrollear. Actualiza el DOM directamente en lugar de pasar por el estado de React y se puede usar con teclado. Con movimiento reducido, ambos pasan a una comparación estática.",
                        "en": "On the homepage, the transition follows the scroll inside a pinned section, with no dragging, so it never fights with scrolling on a phone. On project pages there’s a draggable comparator: on touch, a drag over the image waits 8 px to read the gesture’s direction and only takes horizontal moves, so the page still scrolls. It updates the DOM directly instead of going through React state, and works with the keyboard. With reduced motion, both fall back to a static comparison."
                      }
                    },
                    {
                      "lead": { "es": "Las reglas de visibilidad viven en la base de datos, no en la interfaz.", "en": "Visibility rules live in the database, not the UI." },
                      "text": {
                        "es": "Las políticas RLS solo dejan que los visitantes lean productos y obras publicados, y la galería y la ficha de cada obra heredan el estado de su proyecto. Cuando se destaca una obra nueva en la portada, un trigger desmarca la anterior.",
                        "en": "Row-level security only lets visitors read published products and projects, and each project’s gallery and details inherit their parent’s status. When a new project is featured on the homepage, a database trigger unsets the previous one."
                      }
                    }
                  ]
                }
              ]
            },
            {
              "heading": { "es": "Resultado", "en": "Outcome" },
              "blocks": [
                {
                  "type": "paragraph",
                  "text": {
                    "es": "En producción con dominio propio, con identidad de marca, catálogo y archivo de obras. El cliente puede publicar productos, obras y publicaciones del taller por su cuenta, y ordenar obras y publicaciones del taller, sin depender de un desarrollador ni de un nuevo deploy.",
                    "en": "Live on its own domain, with a brand identity, a catalog and a project archive. The client can publish products, projects and workshop posts on their own and reorder projects and workshop posts, without depending on a developer or a redeploy."
                  }
                }
              ]
            },
            {
              "heading": { "es": "Qué haría distinto", "en": "What I’d do differently" },
              "blocks": [
                {
                  "type": "paragraph",
                  "text": { "es": "Mirando el código hoy:", "en": "Looking at the code today:" }
                },
                {
                  "type": "list",
                  "items": [
                    { "text": { "es": "Las reglas de acceso deberían verificar un rol de administrador, no solo que haya un usuario logueado, tanto en las tablas como en el almacenamiento de imágenes.", "en": "Access rules should check for an admin role, not just a logged-in user, for both tables and image storage." } },
                    { "text": { "es": "Todo el esquema de la base debería estar versionado en migraciones. Algunos campos que usa la app se agregaron por fuera, así que la base no se puede reconstruir solo desde el repo.", "en": "The full database schema should be versioned in migrations. Some fields the app relies on were added outside them, so the database can’t be rebuilt from the repo alone." } },
                    { "text": { "es": "Las consultas públicas deberían pedir columnas explícitas en vez de *, para que un precio que el cliente decidió ocultar no llegue igual al navegador.", "en": "Public queries should request explicit columns instead of *, so a price the client chose to hide isn’t still sent to the browser." } },
                    { "text": { "es": "Crear un producto u obra con imágenes lleva varios pasos separados. Deberían completarse todos o limpiarse, en vez de dejar registros a medias o archivos huérfanos.", "en": "Creating a product or project with images takes several separate steps. They should either all succeed or clean up after themselves, instead of leaving partial records or orphaned files." } },
                    { "text": { "es": "Las especificaciones de los dibujos merecen validación y tests: hoy un tipo de módulo desconocido se ignora sin avisar.", "en": "The drawing specs deserve validation and tests: today an unknown module type is skipped silently." } },
                    { "text": { "es": "El panel necesita subidas operables con teclado y una forma de reordenar que no dependa del arrastre.", "en": "The admin panel needs keyboard-accessible uploads and a non-drag way to reorder." } }
                  ]
                }
              ]
            }
          ]
        },
        "stack": [
          "React",
          "Vite",
          "JavaScript",
          "React Router",
          "Framer Motion",
          "Supabase",
          "PostgreSQL",
          "RLS",
          "SVG",
          "CSS Modules"
        ],
        "liveUrl": "https://www.donteofiloamoblamientos.com/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/donteofilo-amoblamientos/donteofilo-amoblamientos-home.png",
              "width": 2516,
              "height": 1257,
              "alt": {
                "es": "Portada de Don Teófilo: cocina a medida, lema «Medimos dos veces, cortamos una.», accesos a presupuesto y proyectos, controles del carrusel y WhatsApp. Vista de escritorio.",
                "en": "Don Teófilo homepage: custom kitchen, “Medimos dos veces, cortamos una.” headline, quote and project links, carousel controls and WhatsApp. Desktop view."
              }
            },
            "mobile": {
              "src": "/images/experiencia/donteofilo-amoblamientos/donteofilo-amoblamientos-home-mobile.png",
              "width": 850,
              "height": 1100,
              "alt": {
                "es": "Portada de Don Teófilo: menú móvil, cocina a medida, lema «Medimos dos veces, cortamos una.», accesos a presupuesto y proyectos, controles del carrusel y WhatsApp. Vista móvil.",
                "en": "Don Teófilo homepage: mobile menu, custom kitchen, “Medimos dos veces, cortamos una.” headline, quote and project links, carousel controls and WhatsApp. Mobile view."
              }
            }
          }
        ]
      }
    ]
  },
  {
    "slug": "format",
    "company": "FORMAT",
    "companyUrl": "https://productions-format.com/",
    "position": {
      "es": "Diseñador y desarrollador full-stack",
      "en": "Designer & full-stack developer"
    },
    "type": "freelance",
    "startDate": { "month": 8, "year": 2026 },
    "endDate": null,
    "location": {
      "es": "Buenos Aires, Argentina",
      "en": "Buenos Aires, Argentina"
    },
    "summary": {
      "es": "FORMAT necesitaba reunir la próxima fecha, su lineup y flyer, sin perder el archivo de ediciones anteriores. Organicé el contenido en Seasons mensuales que también definen la identidad visual, con publicación desde el panel sin redeploy.",
      "en": "FORMAT needed to bring together its next event, lineup and flyer while preserving an archive of past editions. I organized the content into monthly Seasons that also define the visual identity, with publishing through the admin panel without redeployment."
    },
    "highlights": {
      "es": [
        "Identidad visual por Season, derivada de los datos de forma y paleta.",
        "Shader GLSL halftone con Three.js que responde a la Season activa.",
        "Panel autogestionado con Server Actions que publica sin redeploy."
      ],
      "en": [
        "Per-season visual identity derived from shape and palette data.",
        "Halftone GLSL shader built with Three.js, driven by the active season.",
        "Self-managed admin panel with Server Actions, publishing without a redeploy."
      ]
    },
    "stack": [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Supabase",
      "Three.js",
      "GLSL",
      "Playwright"
    ],
    "projects": [
      {
        "id": "website",
        "name": {
          "es": "FORMAT",
          "en": "FORMAT"
        },
        "subtitle": {
          "es": "Desarrollo web para cliente",
          "en": "Web development for a client"
        },
        "role": {
          "es": "Diseñador y desarrollador full-stack",
          "en": "Designer & full-stack developer"
        },
        "contribution": {
          "es": "FORMAT necesitaba reunir la próxima fecha, su lineup y flyer, sin perder el archivo de ediciones anteriores. Organicé el contenido en Seasons mensuales que también definen la identidad visual, con publicación desde el panel sin redeploy.",
          "en": "FORMAT needed to bring together its next event, lineup and flyer while preserving an archive of past editions. I organized the content into monthly Seasons that also define the visual identity, with publishing through the admin panel without redeployment."
        },
        "impact": {
          "es": "Los organizadores manejan el sitio por su cuenta: crean Seasons, fechas, lineups y horarios, y publican un aftermovie nuevo cada mes.",
          "en": "The organizers run the site themselves: they create seasons, dates, lineups and schedules, and publish a new aftermovie every month."
        },
        "caseSections": {
          "title": {
            "es": "FORMAT: un sitio donde cada edición mensual trae su propia identidad visual",
            "en": "FORMAT: a website where every monthly edition brings its own visual identity"
          },
          "meta": {
            "es": "Diseñador y desarrollador full-stack",
            "en": "Designer & full-stack developer"
          },
          "sections": [
            {
              "heading": { "es": "Contexto", "en": "Context" },
              "blocks": [
                {
                  "type": "paragraph",
                  "text": {
                    "es": "FORMAT es un ciclo de música electrónica de Buenos Aires, organizado en Seasons mensuales de fechas los viernes. Cada Season tiene su nombre, su paleta y su forma. Los organizadores necesitaban un sitio que explicara qué es FORMAT, que mostrara las próximas fechas con su lineup y flyer, que conservara un archivo de ediciones anteriores, y que les permitiera gestionar todo por su cuenta: Seasons, fechas, lineups, horarios y fotos. Tenían un manual de marca; sobre esa base diseñé el lenguaje visual del sitio.",
                    "en": "FORMAT is an electronic music event series in Buenos Aires, organized in monthly seasons of Friday events. Each season has its own name, palette and shape. The organizers needed a site that explained what FORMAT is, made upcoming dates easy to find with their lineup and flyer, kept an archive of past editions, and let them manage all of it on their own: seasons, dates, lineups, schedules and photos. They had a brand manual; I designed the website’s visual language on top of it."
                  }
                }
              ]
            },
            {
              "heading": { "es": "Qué construí", "en": "What I built" },
              "blocks": [
                {
                  "type": "paragraph",
                  "text": {
                    "es": "Un sitio en Next.js 15 (App Router) con React 19 y TypeScript estricto, sobre Supabase (Postgres, Auth, Storage). Páginas públicas con próximas fechas, eventos con su lineup y un archivo, más un panel de administración desde el que los organizadores manejan todo. El núcleo lo construí en agosto de 2026, y sigo trabajando con ellos todos los meses: mejoras del panel, optimización de imágenes, aftermovies mensuales y formas nuevas para cada Season.",
                    "en": "A Next.js 15 (App Router) site with React 19 and strict TypeScript, backed by Supabase (Postgres, Auth, Storage). Public pages for upcoming dates, events with their lineup, and an archive, plus an admin panel where the organizers run everything. I built the core in August 2026 and keep working with them monthly: panel improvements, image optimization, monthly aftermovies, and new shapes for new seasons."
                  }
                }
              ]
            },
            {
              "heading": { "es": "Decisiones que importaron", "en": "Decisions that mattered" },
              "blocks": [
                {
                  "type": "list",
                  "items": [
                    {
                      "lead": { "es": "El contenido decide la estética.", "en": "The content decides the look." },
                      "text": {
                        "es": "Una Season guarda su forma y su paleta, y el sitio deriva de esos datos sus acentos, stickers y fondos. Los colores se propagan como variables CSS definidas en la raíz de la página y expuestas a Tailwind; las páginas de evento las vuelven a aplicar con su propia Season, y cada tarjeta lleva la identidad de su Season por props, así mantiene su estética dentro de una página con otro tema. El texto sobre colores de acento alterna entre papel y tinta automáticamente según el contraste. Una Season que reutiliza una forma existente es solo datos; cuando los organizadores quieren una geometría nueva, la agrego al set compartido de formas en SVG y GLSL.",
                        "en": "A season stores its shape and palette, and the site derives its accents, stickers and backgrounds from that data. Colors propagate as CSS custom properties set at the page root and exposed to Tailwind; event pages reapply them for their own season, and each card carries its season’s identity through props, so it keeps its look inside a page themed by another season. Text over accent colors switches between paper and ink automatically for contrast. A season that reuses an existing shape is just data; when the organizers want a new geometry, I add it to the shared set of SVG and GLSL shapes."
                      }
                    },
                    {
                      "lead": { "es": "Un shader en el hero que responde a la Season activa.", "en": "A hero shader driven by the active season." },
                      "text": {
                        "es": "Three.js renderiza un único plano a pantalla completa con un shader GLSL propio. Dibuja la forma de la Season con funciones de distancia firmada, la deforma en el tiempo con ruido simplex (de dominio público) y la muestrea por celdas en una trama de puntos halftone con el color de la Season. Se pausa fuera de pantalla o con la pestaña oculta, muestra un único frame estático con movimiento reducido, limita el pixel ratio en mobile y, si WebGL falla, quedan el fondo CSS y el contenido.",
                        "en": "Three.js renders a single full-screen plane with a custom GLSL shader. It draws the season’s shape with signed distance functions, warps it over time with (public-domain) simplex noise, and samples it per cell into a halftone dot pattern in the season’s color. It pauses when off-screen or in a hidden tab, renders a single static frame with reduced motion, caps the pixel ratio on mobile, and if WebGL fails, the CSS background and content stay in place."
                      }
                    },
                    {
                      "lead": { "es": "Un panel pensado para organizadores, no para desarrolladores.", "en": "An admin panel built for organizers, not developers." },
                      "text": {
                        "es": "Fue lo más difícil: las Seasons contienen fechas, las fechas contienen lineups y horarios, y todo tiene que mantenerse consistente mientras lo editan personas sin perfil técnico. Las fotos se comprimen a WebP en el navegador antes de subirse, así pueden publicar directo desde el celular. Los cambios pasan por Server Actions de Next.js que guardan en Supabase y revalidan las páginas afectadas, así se publican sin redeploy. La Season activa se calcula en hora de Buenos Aires: la que incluye el día de hoy; si no hay, la próxima; si no, la más reciente.",
                        "en": "This was the hardest part: seasons contain dates, dates contain lineups and schedules, and all of it has to stay consistent while non-technical people edit it. Photos are compressed to WebP in the browser before upload, so organizers can publish straight from a phone. Edits go through Next.js Server Actions that save to Supabase and revalidate the affected pages, so changes go live without a redeploy. The active season is resolved in Buenos Aires time: the one whose dates include today, otherwise the next one, otherwise the most recent."
                      }
                    },
                    {
                      "lead": { "es": "La escritura está restringida en dos capas, y está testeada.", "en": "Writes are restricted at two layers, and tested." },
                      "text": {
                        "es": "Cualquiera puede leer; solo los usuarios con rol de administrador en su token pueden escribir. Eso lo aplican las políticas RLS de Postgres y se vuelve a verificar en cada Server Action. Una suite de Playwright corre contra un Supabase local para verificar roles, borrados cuando falla Storage y qué pasa si un administrador pierde su rol; las páginas públicas se prueban en desktop y mobile.",
                        "en": "Anyone can read; only users with an admin role in their auth token can write. That’s enforced by row-level security in Postgres and checked again in every server action. A Playwright suite runs against a local Supabase stack to verify roles, deletions when storage fails, and what happens when an admin loses their role; the public pages are tested on desktop and mobile viewports."
                      }
                    }
                  ]
                }
              ]
            },
            {
              "heading": { "es": "Resultado", "en": "Outcome" },
              "blocks": [
                {
                  "type": "paragraph",
                  "text": {
                    "es": "Los organizadores manejan el sitio por su cuenta: crean Seasons, fechas, lineups y horarios, y publican un aftermovie nuevo cada mes. Sigo trabajando con ellos mensualmente en el panel y en nuevas identidades visuales.",
                    "en": "The organizers run the site themselves: they create seasons, dates, lineups and schedules, and publish a new aftermovie every month. I keep working with them monthly on the panel and on new visual identities."
                  }
                }
              ]
            },
            {
              "heading": { "es": "Qué haría distinto", "en": "What I’d do differently" },
              "blocks": [
                {
                  "type": "paragraph",
                  "text": { "es": "Mirando el código hoy:", "en": "Looking at the code today:" }
                },
                {
                  "type": "list",
                  "items": [
                    { "text": { "es": "Validar la paleta de cada Season al guardarla: el esquema permite una vacía, y partes del sitio asumen que hay al menos un color.", "en": "Validate a season’s palette when it’s saved: the schema allows an empty one, and parts of the site assume there’s at least one color." } },
                    { "text": { "es": "Hacer que la revalidación siga las dependencias reales: editar un lineup no actualiza la home, aunque la home usa datos del lineup.", "en": "Make revalidation follow real dependencies: editing a lineup doesn’t refresh the homepage, even though the homepage uses lineup data." } },
                    { "text": { "es": "Distinguir “no hay datos” de “falló la carga”: hoy una caída de la base se vería como un calendario vacío.", "en": "Tell “no data” apart from “data failed to load”: today a database outage would look like an empty calendar." } },
                    { "text": { "es": "Aplicar los límites de subida en el servidor, no solo con la compresión en el navegador.", "en": "Enforce upload limits on the server, not just through compression in the browser." } },
                    { "text": { "es": "Aplicar los mismos resguardos a todos los efectos WebGL. El fondo de las páginas de evento no tiene el manejo de movimiento reducido ni de errores que tiene el hero, y ninguno de los dos se recupera si se pierde el contexto WebGL.", "en": "Apply the same safeguards to every WebGL effect. The event-page background lacks the reduced-motion handling and error handling the hero has, and neither one recovers from a lost WebGL context." } }
                  ]
                }
              ]
            }
          ]
        },
        "stack": [
          "Next.js 15",
          "React 19",
          "TypeScript",
          "Supabase",
          "Three.js",
          "GLSL",
          "Playwright"
        ],
        "liveUrl": "https://productions-format.com/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/format/format-home-hero.png",
              "width": 1904,
              "height": 912,
              "alt": {
                "es": "Portada de FORMAT: identidad ASCENT, trama violeta y lema del ciclo. Vista de escritorio.",
                "en": "FORMAT homepage: ASCENT identity, purple pattern and event series tagline. Desktop view."
              }
            },
            "mobile": {
              "src": "/images/experiencia/format/format-home-hero-mobile.png",
              "width": 850,
              "height": 1660,
              "alt": {
                "es": "Portada de FORMAT: identidad ASCENT, trama violeta y lema del ciclo. Vista móvil.",
                "en": "FORMAT homepage: ASCENT identity, purple pattern and event series tagline. Mobile view."
              }
            }
          }
        ]
      }
    ]
  }
]

const months = { es: ['ENE.', 'FEB.', 'MAR.', 'ABR.', 'MAY.', 'JUN.', 'JUL.', 'AGO.', 'SEPT.', 'OCT.', 'NOV.', 'DIC.'], en: ['JAN.', 'FEB.', 'MAR.', 'APR.', 'MAY.', 'JUN.', 'JUL.', 'AUG.', 'SEP.', 'OCT.', 'NOV.', 'DEC.'] }
export const formatExperiencePeriod = (experience: Experience, locale: Locale) => {
  if (experience.period) return text(experience.period, locale)
  if (!experience.startDate) return locale === 'es' ? '[NECESITO: fechas de inicio y fin]' : '[NEEDED: start and end dates]'
  const format = (date: DateValue) => `${months[locale][date.month - 1]} ${date.year}`
  if (!experience.endDate) return `${format(experience.startDate)} — ${locale === 'es' ? 'ACTUALIDAD' : 'PRESENT'}`
  const duration = (experience.endDate.year - experience.startDate.year) * 12 + experience.endDate.month - experience.startDate.month + 1
  return `${format(experience.startDate)} — ${format(experience.endDate)} (${duration} ${locale === 'es' ? duration === 1 ? 'MES' : 'MESES' : duration === 1 ? 'MONTH' : 'MONTHS'})`
}

const localizeCaseSections = (study: CaseSections, locale: Locale): LocalizedCaseSections => ({
  title: study.title && text(study.title, locale),
  meta: study.meta && text(study.meta, locale),
  sections: study.sections.map(section => ({
    heading: text(section.heading, locale),
    blocks: section.blocks.map((block): LocalizedCaseBlock => block.type === 'paragraph'
      ? { type: 'paragraph', text: text(block.text, locale) }
      : { type: 'list', items: block.items.map(item => ({ lead: item.lead && text(item.lead, locale), text: text(item.text, locale) })) }),
  })),
})

export const localizeExperience = (experience: Experience, locale: Locale): LocalizedExperience => ({
  ...experience, company: experience.displayName ? text(experience.displayName, locale) : experience.company,
  position: text(experience.position, locale), location: text(experience.location, locale), summary: text(experience.summary, locale), highlights: text(experience.highlights, locale),
  projects: experience.projects.map(project => ({ ...project, name: text(project.name, locale), subtitle: text(project.subtitle, locale), role: text(project.role, locale), contribution: text(project.contribution, locale), impact: text(project.impact, locale), body: project.body && text(project.body, locale), caseSections: project.caseSections && localizeCaseSections(project.caseSections, locale), period: project.period && text(project.period, locale), media: project.media.map(media => ({ desktop: { ...media.desktop, alt: text(media.desktop.alt, locale) }, mobile: media.mobile && { ...media.mobile, alt: text(media.mobile.alt, locale) } })) })),
})

const zetenta = clientExperiences.find(item => item.slug === 'zetenta')!
export const independentWork = clientExperiences.filter(item => item.type === 'freelance').sort((a, b) => {
  if (!a.startDate) return b.startDate ? -1 : 0
  if (!b.startDate) return 1
  return b.startDate.year - a.startDate.year || b.startDate.month - a.startDate.month
})
for (const [slug, study] of Object.entries(caseStudies)) {
  const project = slug === 'manantial' ? zetenta.projects.find(item => item.id === slug)! : clientExperiences.find(item => item.slug === slug)!.projects[0]
  if (study.body) project.body = study.body
  if (study.caseSections) project.caseSections = study.caseSections
}
const freelance: Experience = {
  slug: 'freelance', company: 'Trabajo independiente', displayName: { es: 'Trabajo independiente', en: 'Independent work' }, position: { es: 'Desarrollo web', en: 'Web development' }, type: 'freelance',
  startDate: { month: 4, year: 2024 }, endDate: null, location: { es: 'Buenos Aires · Remoto', en: 'Buenos Aires · Remote' },
  summary: { es: 'Desde abril de 2024, desarrollo sitios y aplicaciones para clientes. Ocho trabajos documentados.', en: 'Since April 2024, I have developed websites and applications for clients. Eight documented projects.' },
  highlights: { es: [], en: [] }, stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'WordPress', 'Supabase'],
  projects: independentWork.map(item => ({ ...item.projects[0], id: item.slug === 'espacio-boa' ? 'boa' : item.slug, name: { es: item.company, en: item.company }, period: { es: formatExperiencePeriod(item, 'es'), en: formatExperiencePeriod(item, 'en') } })),
}
export const experiences: Experience[] = [zetenta, freelance]
export const getExperienceBySlug = (slug: string | undefined) => experiences.find(item => item.slug === slug) ?? clientExperiences.find(item => item.slug === slug)

export const selectedCases = [
  { id: 'solution', title: 'Solution Perfumes', href: '/experiencia/freelance#solution', project: clientExperiences.find(item => item.slug === 'solution')!.projects[0], ...caseStudies.solution },
  { id: 'espacio-boa', title: 'Espacio BOA', href: '/experiencia/freelance#boa', project: clientExperiences.find(item => item.slug === 'espacio-boa')!.projects[0], ...caseStudies['espacio-boa'] },
  { id: 'manantial', title: 'Manantial · Zetenta', href: '/experiencia/zetenta#manantial', project: zetenta.projects.find(item => item.id === 'manantial')!, ...caseStudies.manantial },
]
