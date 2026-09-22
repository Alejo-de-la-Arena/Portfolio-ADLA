import { vyzonMedia } from './projectMedia'
import type { Locale } from '@/context/LocaleContext'
import type { Project } from '@/types'

export const ownProjects: Record<Locale, Project[]> = {
  "es": [
    {
      "id": "job-match-bot",
      "title": "Job Match Bot",
      "year": 2026,
      "role": "Desarrollo full-stack",
      "scope": "MVP de alertas laborales para LATAM",
      "timeline": "MVP en desarrollo",
      "impact": "Carga y análisis de CV, embeddings e ingesta de vacantes implementados. Matching y envío por WhatsApp pendientes.",
      "description": "Estoy buscando trabajo y construyo una herramienta para organizar esa búsqueda. El MVP ya analiza CVs e ingiere vacantes; todavía no conecta el circuito de alertas.",
      "problem": "Buscar oportunidades implica revisar fuentes y relacionar cada vacante con el propio perfil. Empecé Job Match Bot a partir de mi búsqueda laboral.",
      "solution": "Separé el acceso y la carga de CV del procesamiento en segundo plano. Supabase gestiona sesiones y almacenamiento; un worker con BullMQ ingiere vacantes de Remotive.",
      "tags": [
        "Full-stack",
        "IA / AI"
      ],
      "featured": true,
      "technologies": [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "PostgreSQL",
        "Gemini 2.5 Flash",
        "gemini-embedding-001",
        "Redis",
        "BullMQ",
        "ioredis",
        "Remotive API",
        "Zod",
        "Docker",
        "Railway"
      ],
      "highlights": [
        "Autenticación por magic link y sesiones SSR.",
        "CVs en Storage privado con acceso mediante URLs firmadas.",
        "Extracción de habilidades, nivel de experiencia, trayectoria, idiomas y educación con Gemini 2.5 Flash.",
        "Embeddings de perfiles y vacantes con gemini-embedding-001: 1.024 dimensiones.",
        "Ingesta de Remotive cada 6 horas, con normalización y deduplicación por URL.",
        "Scheduler configurado en la zona horaria de Argentina."
      ],
      "decisions": [
        "Storage privado y URLs firmadas para controlar el acceso a los CVs.",
        "Zod como contrato compartido para validar los datos entre partes del sistema.",
        "Redis y BullMQ para separar el trabajo del worker de las solicitudes web.",
        "Docker y Railway para ejecutar el worker fuera del frontend."
      ],
      "results": [
        "Funcionan el acceso, la carga y análisis de CV, los embeddings y la ingesta de Remotive.",
        "Las colas match y send existen, pero sus workers son stubs. El matching y el envío de alertas todavía no funcionan."
      ],
      "roadmap": [
        "Matching semántico real.",
        "Envío de alertas por WhatsApp.",
        "Más fuentes de vacantes.",
        "Vista de resultados e historial.",
        "Migraciones versionadas.",
        "Tests."
      ]
    },
    {
      "id": "vyzon",
      "title": "VYZON",
      "year": 2026,
      "role": "Orquestación y desarrollo",
      "scope": "Laboratorio personal de desarrollo web con IA agéntica",
      "timeline": "Laboratorio personal",
      "impact": "Laboratorio personal de desarrollo web con IA agéntica. No es una agencia con clientes.",
      "description": "Laboratorio personal de desarrollo web con IA agéntica. No es una agencia con clientes. Incluye Briefing IA y las demos TaskFlow, AURA AI y OBSIDIAN, creadas con briefs ficticios.",
      "problem": "Quería organizar el trabajo con agentes en un proceso que pudiera revisar por etapas. VYZON es el laboratorio donde documento y pruebo ese proceso.",
      "solution": "Definí roles y una cadena de entrega: discovery, diseño, desarrollo, QA, entrega y soporte. Cada etapa deja un artefacto revisable; yo decido cómo continuar.",
      "image": vyzonMedia.desktop.src,
      media: vyzonMedia,
      "liveUrl": "https://vyzon-agency.vercel.app/",
      "tags": [
        "IA / AI",
        "Frontend"
      ],
      "featured": true,
      "technologies": [
        "Next.js",
        "TypeScript",
        "Gemini 2.5 Flash",
        "React",
        "GSAP",
        "Three.js"
      ],
      "highlights": [
        "Siete roles documentados: Project Manager, Director Creativo, Estratega de Contenido, Arquitecto Frontend, Ingeniero Backend, Especialista en Automatización y QA/Revisor.",
        "Briefing IA valida un brief y devuelve una propuesta técnica estructurada en JSON, en español o inglés.",
        "TaskFlow, AURA AI y OBSIDIAN son demos de briefs ficticios dentro del laboratorio."
      ],
      "decisions": [
        "Roles separados para distinguir planificación, implementación y revisión.",
        "Artefactos por etapa para revisar las propuestas antes de avanzar.",
        "Route Handler con validación y Gemini 2.5 Flash para estructurar la propuesta del briefing.",
        "Rate limiting para limitar la frecuencia de solicitudes al módulo de IA."
      ],
      "results": [
        "Proceso documentado y módulo Briefing IA implementado.",
        "La decisión final sigue siendo humana: reviso el trabajo de los agentes antes de incorporarlo."
      ],
      "demos": [
        {
          "id": 1,
          "title": "TaskFlow",
          "description": "Demo de una landing SaaS con brief ficticio. Separé el copy de los componentes para poder revisar el contenido sin cambiar la estructura.",
          "decisions": [
            "GSAP y ScrollTrigger para secuencias; Framer Motion para acordeones y cambios de layout.",
            "Carga diferida del mock del hero y animaciones con transform y opacity."
          ],
          "status": "Performance y accesibilidad: objetivos pendientes de medición en producción.",
          "liveUrl": "https://task-flow-opal-eight.vercel.app/",
          "image": "https://res.cloudinary.com/dasch1s5i/image/upload/v1782240666/taskflow-screen-desktop_t3ll5t.png",
          "technologies": [
            "Next.js 14 (App Router)",
            "React 18",
            "TypeScript",
            "TailwindCSS",
            "GSAP",
            "ScrollTrigger",
            "@gsap/react",
            "Framer Motion",
            "Lucide React",
            "Geist Sans / Geist Mono",
            "clsx",
            "tailwind-merge"
          ],
          "label": "Demo · brief ficticio"
        },
        {
          "id": 2,
          "title": "AURA AI",
          "description": "Demo de una landing de IA con brief ficticio. Implementé el campo de partículas con Canvas 2D para resolver ese efecto sin incorporar una escena WebGL.",
          "decisions": [
            "GSAP para secuencias de scroll y Framer Motion para estados de componentes.",
            "Hook compartido de movimiento reducido para centralizar esa preferencia.",
            "Cantidad de partículas adaptada al dispositivo: decisión de implementación, no medición de rendimiento."
          ],
          "status": "Demo de interfaz. No representa un servicio de IA con clientes.",
          "liveUrl": "https://aura-ai-4p5r.vercel.app/",
          "image": "https://res.cloudinary.com/dasch1s5i/image/upload/v1782240694/AuraAI-screen-desktop_jp95tb.png",
          "technologies": [
            "Next.js 14.2.29 (App Router)",
            "React 18",
            "TypeScript 5",
            "GSAP 3.12.7",
            "@gsap/react 2.1.2",
            "Framer Motion 11.11.17",
            "TailwindCSS 3.4.17",
            "Canvas 2D API",
            "Geist 1.3.1",
            "Lucide React 0.469.0",
            "clsx 2.1.1",
            "tailwind-merge 2.5.5"
          ],
          "label": "Demo · brief ficticio"
        },
        {
          "id": 3,
          "title": "OBSIDIAN",
          "description": "Demo de una landing de relojes con brief ficticio. Integré una escena Three.js y separé las variantes desktop y mobile para adaptar el recorrido del producto.",
          "decisions": [
            "Lenis integrado al ticker de GSAP para compartir el ciclo de animación.",
            "Modelos GLTF cargados una vez y clonados por consumidor para aislar sus modificaciones.",
            "Pixel ratio limitado y partículas adaptativas como decisiones técnicas, sin métricas de rendimiento atribuidas."
          ],
          "status": "Demo visual. Los productos, precios y disponibilidad del brief son ficticios.",
          "liveUrl": "https://obsidian-5vra.vercel.app/",
          "image": "https://res.cloudinary.com/dasch1s5i/image/upload/v1782240673/Obsidian-screen-desktop_ozjg5g.png",
          "technologies": [
            "Next.js 14.2.29 (App Router)",
            "React 18.3.1",
            "TypeScript 5.6.3 (strict mode)",
            "GSAP 3.12.7",
            "@gsap/react 2.1.1",
            "Three.js 0.170.0",
            "@studio-freight/lenis 1.0.42",
            "Framer Motion 11.11.0",
            "TailwindCSS 3.4.14",
            "Geist 1.3.1",
            "clsx 2.1.1",
            "tailwind-merge 2.5.4"
          ],
          "label": "Demo · brief ficticio"
        }
      ]
    }
  ],
  "en": [
    {
      "id": "job-match-bot",
      "title": "Job Match Bot",
      "year": 2026,
      "role": "Full-stack development",
      "scope": "Job alert MVP for LATAM",
      "timeline": "MVP in development",
      "impact": "CV upload and analysis, embeddings, and job ingestion implemented. Matching and WhatsApp delivery remain on the roadmap.",
      "description": "I’m looking for work and building a tool to organize that search. The MVP already analyzes CVs and ingests jobs; the alert pipeline is not connected yet.",
      "problem": "Finding opportunities involves checking sources and relating each job to your profile. I started Job Match Bot during my own job search.",
      "solution": "I separated sign-in and CV uploads from background processing. Supabase handles sessions and storage; a BullMQ worker ingests jobs from Remotive.",
      "tags": [
        "Full-stack",
        "IA / AI"
      ],
      "featured": true,
      "technologies": [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "PostgreSQL",
        "Gemini 2.5 Flash",
        "gemini-embedding-001",
        "Redis",
        "BullMQ",
        "ioredis",
        "Remotive API",
        "Zod",
        "Docker",
        "Railway"
      ],
      "highlights": [
        "Magic-link authentication and SSR sessions.",
        "CVs in private Storage accessed through signed URLs.",
        "Skills, seniority, work history, languages, and education extracted with Gemini 2.5 Flash.",
        "Profile and job embeddings using gemini-embedding-001: 1,024 dimensions.",
        "Remotive ingestion every 6 hours, with normalization and URL deduplication.",
        "Scheduler configured for Argentina’s time zone."
      ],
      "decisions": [
        "Private Storage and signed URLs to control access to CVs.",
        "Shared Zod contracts to validate data across system boundaries.",
        "Redis and BullMQ to separate worker tasks from web requests.",
        "Docker and Railway to run the worker separately from the frontend."
      ],
      "results": [
        "Sign-in, CV upload and analysis, embeddings, and Remotive ingestion work.",
        "The match and send queues exist, but their workers are stubs. Matching and alert delivery are not working yet."
      ],
      "roadmap": [
        "Working semantic matching.",
        "WhatsApp alert delivery.",
        "More job sources.",
        "Results and history views.",
        "Versioned migrations.",
        "Tests."
      ]
    },
    {
      "id": "vyzon",
      "title": "VYZON",
      "year": 2026,
      "role": "Orchestration and development",
      "scope": "Personal web development lab using agentic AI",
      "timeline": "Personal lab",
      "impact": "A personal web development lab using agentic AI. It is not an agency with clients.",
      "description": "A personal web development lab using agentic AI. It is not an agency with clients. It includes AI Briefing and the TaskFlow, AURA AI, and OBSIDIAN demos, built from fictional briefs.",
      "problem": "I wanted to organize agent work into a process I could review in stages. VYZON is the lab where I document and test that process.",
      "solution": "I defined roles and a delivery sequence: discovery, design, development, QA, delivery, and support. Each stage produces a reviewable artifact; I decide how to proceed.",
      "image": vyzonMedia.desktop.src,
      media: vyzonMedia,
      "liveUrl": "https://vyzon-agency.vercel.app/",
      "tags": [
        "IA / AI",
        "Frontend"
      ],
      "featured": true,
      "technologies": [
        "Next.js",
        "TypeScript",
        "Gemini 2.5 Flash",
        "React",
        "GSAP",
        "Three.js"
      ],
      "highlights": [
        "Seven documented roles: Project Manager, Creative Director, Content Strategist, Frontend Architect, Backend Engineer, Automation Specialist, and QA/Reviewer.",
        "AI Briefing validates a brief and returns a structured technical proposal as JSON, in Spanish or English.",
        "TaskFlow, AURA AI, and OBSIDIAN are fictional-brief demos within the lab."
      ],
      "decisions": [
        "Separate roles to distinguish planning, implementation, and review.",
        "Artifacts at each stage to review proposals before moving forward.",
        "A Route Handler with validation and Gemini 2.5 Flash to structure briefing proposals.",
        "Rate limiting to restrict request frequency to the AI module."
      ],
      "results": [
        "A documented process and an implemented AI Briefing module.",
        "The final decision remains human: I review agent work before incorporating it."
      ],
      "demos": [
        {
          "id": 1,
          "title": "TaskFlow",
          "description": "SaaS landing demo based on a fictional brief. I separated copy from components so content could be reviewed without changing the structure.",
          "decisions": [
            "GSAP and ScrollTrigger for sequences; Framer Motion for accordions and layout changes.",
            "Deferred loading of the hero mock and animations using transform and opacity."
          ],
          "status": "Performance and accessibility: targets awaiting production measurement.",
          "liveUrl": "https://task-flow-opal-eight.vercel.app/",
          "image": "https://res.cloudinary.com/dasch1s5i/image/upload/v1782240666/taskflow-screen-desktop_t3ll5t.png",
          "technologies": [
            "Next.js 14 (App Router)",
            "React 18",
            "TypeScript",
            "TailwindCSS",
            "GSAP",
            "ScrollTrigger",
            "@gsap/react",
            "Framer Motion",
            "Lucide React",
            "Geist Sans / Geist Mono",
            "clsx",
            "tailwind-merge"
          ],
          "label": "Demo · fictional brief"
        },
        {
          "id": 2,
          "title": "AURA AI",
          "description": "AI landing demo based on a fictional brief. I implemented its particle field with Canvas 2D to create the effect without adding a WebGL scene.",
          "decisions": [
            "GSAP for scroll sequences and Framer Motion for component states.",
            "A shared reduced-motion hook to centralize that preference.",
            "Device-dependent particle counts: an implementation decision, not a performance measurement."
          ],
          "status": "Interface demo. It does not represent an AI service with customers.",
          "liveUrl": "https://aura-ai-4p5r.vercel.app/",
          "image": "https://res.cloudinary.com/dasch1s5i/image/upload/v1782240694/AuraAI-screen-desktop_jp95tb.png",
          "technologies": [
            "Next.js 14.2.29 (App Router)",
            "React 18",
            "TypeScript 5",
            "GSAP 3.12.7",
            "@gsap/react 2.1.2",
            "Framer Motion 11.11.17",
            "TailwindCSS 3.4.17",
            "Canvas 2D API",
            "Geist 1.3.1",
            "Lucide React 0.469.0",
            "clsx 2.1.1",
            "tailwind-merge 2.5.5"
          ],
          "label": "Demo · fictional brief"
        },
        {
          "id": 3,
          "title": "OBSIDIAN",
          "description": "Watch landing demo based on a fictional brief. I integrated a Three.js scene and separated desktop and mobile variants to adapt the product presentation.",
          "decisions": [
            "Lenis integrated into the GSAP ticker to share the animation cycle.",
            "GLTF models loaded once and cloned per consumer to isolate modifications.",
            "Capped pixel ratio and adaptive particles as technical decisions, without claimed performance measurements."
          ],
          "status": "Visual demo. The brief’s products, prices, and availability are fictional.",
          "liveUrl": "https://obsidian-5vra.vercel.app/",
          "image": "https://res.cloudinary.com/dasch1s5i/image/upload/v1782240673/Obsidian-screen-desktop_ozjg5g.png",
          "technologies": [
            "Next.js 14.2.29 (App Router)",
            "React 18.3.1",
            "TypeScript 5.6.3 (strict mode)",
            "GSAP 3.12.7",
            "@gsap/react 2.1.1",
            "Three.js 0.170.0",
            "@studio-freight/lenis 1.0.42",
            "Framer Motion 11.11.0",
            "TailwindCSS 3.4.14",
            "Geist 1.3.1",
            "clsx 2.1.1",
            "tailwind-merge 2.5.4"
          ],
          "label": "Demo · fictional brief"
        }
      ]
    }
  ]
}
