import { caseStudies } from './caseStudies'
import type { Locale } from '@/context/LocaleContext'

export type Localized = { es: string; en: string }
export type LocalizedList = { es: string[]; en: string[] }
export type Screenshot = { src: string; alt: Localized; width: number; height: number }
export type ProjectMedia = { desktop: Screenshot; mobile?: Screenshot }
export type LocalizedScreenshot = Omit<Screenshot, 'alt'> & { alt: string }
export type LocalizedProjectMedia = { desktop: LocalizedScreenshot; mobile?: LocalizedScreenshot }

export type ExperienceProject = {
  body?: LocalizedList; period?: Localized
  id: string; name: Localized; subtitle: Localized; role: Localized; contribution: Localized; impact: Localized
  stack: string[]; liveUrl?: string; media: ProjectMedia[]
}

export type LocalizedExperienceProject = Omit<ExperienceProject, 'name' | 'subtitle' | 'role' | 'contribution' | 'impact' | 'media' | 'body' | 'period'> & {
  body?: string[]; period?: string; name: string; subtitle: string; role: string; contribution: string; impact: string; media: LocalizedProjectMedia[]
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
    "position": {
      "es": "Full-Stack Developer",
      "en": "Full-Stack Developer"
    },
    "type": "freelance",
    "startDate": {
      "month": 8,
      "year": 2026
    },
    "endDate": null,
    "location": {
      "es": "Argentina · Remoto",
      "en": "Argentina · Remote"
    },
    "summary": {
      "es": "Solution pasó de unos 80 pedidos mensuales en Tienda Nube a unos 300 con su plataforma propia, que desarrollé. Acumula 1.086 pedidos de 1.006 compradores únicos al 14 de septiembre de 2026.",
      "en": "Solution went from around 80 monthly orders on Tienda Nube to around 300 on the custom platform I built. It processed 1,086 orders from 1,006 unique buyers as of September 14, 2026."
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
          "es": "Migración de Tienda Nube a plataforma propia",
          "en": "Migration from Tienda Nube to a custom platform"
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
          "es": "De unos 80 a unos 300 pedidos mensuales. Al 14 de septiembre de 2026: 1.086 pedidos y 1.006 compradores únicos.",
          "en": "From around 80 to around 300 monthly orders. As of September 14, 2026: 1,086 orders and 1,006 unique buyers."
        },
        "stack": [
          "React",
          "Node.js",
          "Mercado Pago",
          "Correo Argentino"
        ],
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
    ],
    "period": {
      "es": "En producción desde el 6 de agosto de 2026",
      "en": "Live since August 6, 2026"
    }
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
      "es": "Trabajé en relación de dependencia entre abril y octubre de 2025. Participé en siete proyectos, desde sitios WordPress editables hasta integraciones con APIs y CRM.",
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
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/zetenta/manantial-home.webp",
              "width": 2526,
              "height": 1274,
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
        "media": []
      }
    ]
  },
  {
    "slug": "kyriazis",
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
    "companyUrl": "https://don-teofilo-amoblamientos.vercel.app/",
    "position": {
      "es": "Desarrollador web",
      "en": "Web Developer"
    },
    "type": "freelance",
    "startDate": { "month": 7, "year": 2026 },
    "endDate": { "month": 7, "year": 2026 },
    "location": {
      "es": "Buenos Aires, Argentina",
      "en": "Buenos Aires, Argentina"
    },
    "summary": {
      "es": "Don Teófilo trabajaba solo por WhatsApp, sin un lugar donde mostrar su catálogo y trabajos terminados. Desarrollé un sitio que el cliente puede actualizar desde un panel, con permisos de publicación en la base de datos y consultas contextualizadas por WhatsApp.",
      "en": "Don Teófilo worked entirely through WhatsApp, with nowhere to display its catalog and completed work. I built a website the client can update through an admin panel, with publication permissions enforced in the database and contextual WhatsApp inquiries."
    },
    "highlights": {
      "es": [],
      "en": []
    },
    "stack": [
      "React",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "RLS"
    ],
    "projects": [
      {
        "id": "website",
        "name": {
          "es": "Don Teófilo Amoblamientos",
          "en": "Don Teófilo Amoblamientos"
        },
        "subtitle": {
          "es": "Entregado y desplegado; a la espera del dominio del cliente.",
          "en": "Delivered and deployed; awaiting the client’s domain."
        },
        "role": {
          "es": "Desarrollo web",
          "en": "Web development"
        },
        "contribution": {
          "es": "Don Teófilo trabajaba solo por WhatsApp, sin un lugar donde mostrar su catálogo y trabajos terminados. Desarrollé un sitio que el cliente puede actualizar desde un panel, con permisos de publicación en la base de datos y consultas contextualizadas por WhatsApp.",
          "en": "Don Teófilo worked entirely through WhatsApp, with nowhere to display its catalog and completed work. I built a website the client can update through an admin panel, with publication permissions enforced in the database and contextual WhatsApp inquiries."
        },
        "impact": {
          "es": "",
          "en": ""
        },
        "body": {
          "es": [
            "Don Teófilo realiza carpintería a medida en Buenos Aires y Tandil. El contacto ocurría por WhatsApp, pero faltaba un lugar donde consultar productos y ver trabajos terminados antes de preguntar. El sitio reúne ese material y mantiene WhatsApp como canal de consulta, con mensajes preparados según la sección.",
            "Separé contenido público y privado mediante políticas RLS de Supabase. El visitante solo puede leer registros publicados, incluidas sus imágenes y detalles relacionados. Elegí aplicar esa regla en la base de datos para que ocultar un borrador no dependa de lo que muestre el frontend.",
            "Para comparar el antes y el después de una obra, implementé un control que actualiza el DOM durante el arrastre sin pasar por el estado de React. Así evité un render de React por cada movimiento. El comparador también expone un slider operable por teclado, para que la interacción no dependa del mouse.",
            "El cliente puede cargar y publicar el catálogo y los proyectos desde el panel, sin tocar código ni pedir un nuevo despliegue. Pasó de compartir todo por chat a tener una referencia pública para sus consultas. El sitio está entregado y desplegado; queda a la espera del dominio del cliente."
          ],
          "en": [
            "Don Teófilo builds custom furniture in Buenos Aires and Tandil. Customers contacted the business through WhatsApp, but had nowhere to browse products and completed work before asking. The website brings that material together and keeps WhatsApp as the inquiry channel, with messages prepared for each section.",
            "I separated public and private content through Supabase RLS policies. Visitors can only read published records, including their related images and details. I enforced this rule in the database so keeping a draft private does not depend on what the frontend displays.",
            "For before-and-after project comparisons, I built a control that updates the DOM during dragging without going through React state. This avoids a React render for each movement. The comparator also exposes a keyboard-operated slider, so the interaction does not depend on a mouse.",
            "The client can upload and publish catalog items and projects through the panel without editing code or requesting another deployment. The business moved from sharing everything in chats to having a public reference for inquiries. The site is delivered and deployed, awaiting the client’s domain."
          ]
        },
        "stack": [
          "React",
          "Vite",
          "Supabase",
          "PostgreSQL",
          "RLS"
        ],
        "liveUrl": "https://don-teofilo-amoblamientos.vercel.app/",
        "media": [
          {
            "desktop": {
              "src": "/images/experiencia/donteofilo-amoblamientos/donteofilo-amoblamientos-home.png",
              "width": 1902,
              "height": 916,
              "alt": {
                "es": "Portada de Don Teófilo: cocina a medida y accesos a productos, proyectos y WhatsApp. Vista de escritorio.",
                "en": "Don Teófilo homepage: custom kitchen and links to products, projects and WhatsApp. Desktop view."
              }
            },
            "mobile": {
              "src": "/images/experiencia/donteofilo-amoblamientos/donteofilo-amoblamientos-home-mobile.png",
              "width": 850,
              "height": 1660,
              "alt": {
                "es": "Portada de Don Teófilo: cocina a medida y accesos a productos, proyectos y WhatsApp. Vista móvil.",
                "en": "Don Teófilo homepage: custom kitchen and links to products, projects and WhatsApp. Mobile view."
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
      "es": "Desarrollador web",
      "en": "Web Developer"
    },
    "type": "freelance",
    "startDate": { "month": 8, "year": 2026 },
    "endDate": { "month": 8, "year": 2026 },
    "location": {
      "es": "Buenos Aires, Argentina",
      "en": "Buenos Aires, Argentina"
    },
    "summary": {
      "es": "FORMAT necesitaba reunir la próxima fecha, su lineup y flyer, sin perder el archivo de ediciones anteriores. Organicé el contenido en Seasons mensuales que también definen la identidad visual, con publicación desde el panel sin redeploy.",
      "en": "FORMAT needed to bring together its next event, lineup and flyer while preserving an archive of past editions. I organized the content into monthly Seasons that also define the visual identity, with publishing through the admin panel without redeployment."
    },
    "highlights": {
      "es": [],
      "en": []
    },
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Server Actions",
      "Three.js",
      "GLSL"
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
          "es": "Desarrollo web",
          "en": "Web development"
        },
        "contribution": {
          "es": "FORMAT necesitaba reunir la próxima fecha, su lineup y flyer, sin perder el archivo de ediciones anteriores. Organicé el contenido en Seasons mensuales que también definen la identidad visual, con publicación desde el panel sin redeploy.",
          "en": "FORMAT needed to bring together its next event, lineup and flyer while preserving an archive of past editions. I organized the content into monthly Seasons that also define the visual identity, with publishing through the admin panel without redeployment."
        },
        "impact": {
          "es": "",
          "en": ""
        },
        "body": {
          "es": [
            "FORMAT es un ciclo de música electrónica en Buenos Aires. El sitio debía permitir encontrar la próxima fecha, su lineup y flyer, y recorrer las ediciones anteriores desde una misma identidad de marca. Esa necesidad guio la relación entre agenda, calendario y archivo.",
            "Modelé el contenido en Seasons mensuales que agrupan varios viernes. Cada Season define colores, formas, stickers y fondos que se trasladan a sus páginas y componentes. Así, una nueva edición puede tener identidad propia sin construir otra interfaz desde cero: el contenido determina su presentación.",
            "El hero usa Three.js y un shader GLSL propio para dibujar una trama halftone animada que responde a la Season activa. Elegí vincular ese recurso al mismo modelo de contenido para que la portada forme parte de la identidad de cada edición.",
            "La gestión se resuelve con Server Actions y revalidación de rutas: al publicar desde el panel, las páginas afectadas incorporan los cambios sin redeploy. Quedó un canal que reúne lo que viene y conserva lo que ya pasó, con una estructura que permite al administrador actualizar cada edición."
          ],
          "en": [
            "FORMAT is an electronic music event series in Buenos Aires. The website needed to make the next event, lineup and flyer easy to find while presenting past editions within the same brand identity. That need guided the relationship between the event listings, calendar and archive.",
            "I modeled the content as monthly Seasons grouping several Fridays. Each Season defines colors, shapes, stickers and backgrounds used across its pages and components. A new edition can therefore have its own identity without building another interface from scratch: the content determines its presentation.",
            "The hero uses Three.js and a custom GLSL shader to draw an animated halftone pattern that responds to the active Season. I connected that visual element to the same content model so the homepage belongs to each edition’s identity.",
            "Content management uses Server Actions and route revalidation: publishing through the panel updates the affected pages without redeployment. The result is a channel that brings together upcoming events and preserves past editions, with a structure the administrator can update for each edition."
          ]
        },
        "stack": [
          "Next.js",
          "React",
          "TypeScript",
          "Supabase",
          "Server Actions",
          "Three.js",
          "GLSL"
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

export const localizeExperience = (experience: Experience, locale: Locale): LocalizedExperience => ({
  ...experience, company: experience.displayName ? text(experience.displayName, locale) : experience.company,
  position: text(experience.position, locale), location: text(experience.location, locale), summary: text(experience.summary, locale), highlights: text(experience.highlights, locale),
  projects: experience.projects.map(project => ({ ...project, name: text(project.name, locale), subtitle: text(project.subtitle, locale), role: text(project.role, locale), contribution: text(project.contribution, locale), impact: text(project.impact, locale), body: project.body && text(project.body, locale), period: project.period && text(project.period, locale), media: project.media.map(media => ({ desktop: { ...media.desktop, alt: text(media.desktop.alt, locale) }, mobile: media.mobile && { ...media.mobile, alt: text(media.mobile.alt, locale) } })) })),
})

const zetenta = clientExperiences.find(item => item.slug === 'zetenta')!
export const independentWork = clientExperiences.filter(item => item.type === 'freelance').sort((a, b) => {
  if (!a.startDate) return b.startDate ? -1 : 0
  if (!b.startDate) return 1
  return b.startDate.year - a.startDate.year || b.startDate.month - a.startDate.month
})
for (const [slug, study] of Object.entries(caseStudies)) {
  const project = slug === 'manantial' ? zetenta.projects.find(item => item.id === slug)! : clientExperiences.find(item => item.slug === slug)!.projects[0]
  project.body = study.body
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
