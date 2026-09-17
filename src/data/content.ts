import type { SkillsData } from '@/types'
import { ownProjects } from './personalProjects'

export const personalInfo = {
  "name": "Alejo de la Arena",
  "role": "Desarrollador full-stack con foco en frontend",
  "tagline": "Desarrollo web desde abril de 2024.",
  "valueLine": "React, Next.js, TypeScript y Node.js.",
  "recruiterSummary": "Desarrollo productos web con React, Next.js, TypeScript y Node.js. Trabajo profesionalmente desde abril de 2024.",
  "deepDiveSummary": "Desarrollo productos web con React, Next.js, TypeScript y Node.js. Trabajo profesionalmente desde abril de 2024.",
  "proof": [
    "React · Next.js",
    "TypeScript · Node.js",
    "Inglés B2"
  ],
  "bio": "Desarrollador full-stack con foco en frontend. Trabajo profesionalmente desde abril de 2024.",
  "location": "Buenos Aires, Argentina · UTC−3 · Inglés B2",
  "email": "alejodelaarenaa@gmail.com",
  "availability": "Mi prioridad es un puesto full-time remoto. También considero propuestas part-time y posiciones híbridas o presenciales en Buenos Aires. Estoy disponible para proyectos freelance."
}
export const socialLinks = {
  "github": "https://github.com/Alejo-de-la-Arena",
  "linkedin": "https://www.linkedin.com/in/alejo-de-la-arena/",
  "whatsapp": "https://wa.me/5491170961318"
}
export const sectionLinks = [
  {
    "id": "cases",
    "label": "Casos"
  },
  {
    "id": "experience",
    "label": "Trayectoria"
  },
  {
    "id": "about",
    "label": "Sobre mí"
  },
  {
    "id": "projects",
    "label": "Proyectos"
  },
  {
    "id": "skills",
    "label": "Habilidades"
  },
  {
    "id": "contact",
    "label": "Contacto"
  }
]
export const modeLabels = {
  "recruiter": "Perfil rápido",
  "deep": "Detalle técnico"
}
export const projectSortLabels = { featured: 'Destacados', latest: 'Recientes', impact: 'Descripción' }
export const about = {
  "paragraphs": [
    "Antes de escribir código, ordeno los requerimientos: qué necesita el cliente, qué herramientas hacen falta y cómo voy a preparar el proyecto. Dejo el entorno listo y desarrollo tomando el pedido y el diseño como referencia; después paso a producción y ajusto sobre el sitio en vivo.",
    "Modelo el dominio antes de resolver las pantallas. En Solution, iniciar un pago y confirmar una compra son estados distintos; en FORMAT, las Seasons determinan la identidad visual de cada fecha. Las reglas también tienen un lugar: en Don Teófilo, las políticas RLS de la base separan lo público de lo privado.",
    "Pienso en quién va a operar el sistema después de la entrega. En Manantial elegí Gutenberg y ACF para que el equipo edite contenido dentro de una estructura de diseño definida. En BOA y Don Teófilo, el panel pone la gestión en manos de personas no técnicas."
  ]
}
export const projects = ownProjects.es
export const skills: SkillsData = {
  "cards": [
    {
      "id": "frontend",
      "label": "Frontend",
      "icon": "Monitor",
      "description": "Interfaces, animación y experiencia de usuario",
      "core": [
        {
          "name": "JavaScript",
          "devicon": "javascript/javascript-original"
        },
        {
          "name": "TypeScript",
          "devicon": "typescript/typescript-original"
        },
        {
          "name": "React",
          "devicon": "react/react-original"
        },
        {
          "name": "Next.js",
          "devicon": "nextjs/nextjs-original",
          "darkBg": true
        },
        {
          "name": "Tailwind CSS",
          "devicon": "tailwindcss/tailwindcss-original"
        }
      ],
      "strong": [
        {
          "name": "GSAP",
          "fallback": "GSAP",
          "fallbackColor": "#88CE02"
        },
        {
          "name": "Framer Motion",
          "fallback": "FM",
          "fallbackColor": "accent"
        },
        {
          "name": "CSS3 / SCSS",
          "devicon": "sass/sass-original"
        },
        {
          "name": "Three.js",
          "devicon": "threejs/threejs-original",
          "darkBg": true
        }
      ],
      "familiar": [
        {
          "name": "VueJS",
          "devicon": "vuejs/vuejs-original"
        },
        {
          "name": "Canvas 2D",
          "lucide": "Layers"
        },
        {
          "name": "Webpack",
          "devicon": "webpack/webpack-original"
        }
      ]
    },
    {
      "id": "backend",
      "label": "Backend & APIs",
      "icon": "Server",
      "description": "Servidores, APIs REST e integraciones",
      "core": [
        {
          "name": "Node.js",
          "devicon": "nodejs/nodejs-original"
        },
        {
          "name": "Express",
          "devicon": "express/express-original",
          "darkBg": true
        },
        {
          "name": "Supabase",
          "devicon": "supabase/supabase-original"
        },
        {
          "name": "PostgreSQL",
          "devicon": "postgresql/postgresql-original"
        },
        {
          "name": "REST APIs",
          "lucide": "Zap"
        }
      ],
      "strong": [
        {
          "name": "PHP",
          "devicon": "php/php-original"
        },
        {
          "name": "MongoDB",
          "devicon": "mongodb/mongodb-original"
        },
        {
          "name": "MySQL",
          "devicon": "mysql/mysql-original"
        },
        {
          "name": "Webhooks",
          "lucide": "Webhook"
        }
      ],
      "familiar": [
        {
          "name": "NestJS",
          "devicon": "nestjs/nestjs-original"
        },
        {
          "name": "Python",
          "devicon": "python/python-original"
        },
        {
          "name": "Firebase",
          "devicon": "firebase/firebase-plain"
        }
      ]
    },
    {
      "id": "devops",
      "label": "DevOps & Tooling",
      "icon": "GitBranch",
      "description": "Control de versiones, deploy y flujo de trabajo",
      "core": [
        {
          "name": "Git",
          "devicon": "git/git-original"
        },
        {
          "name": "GitHub",
          "devicon": "github/github-original",
          "invert": true
        },
        {
          "name": "Vercel",
          "devicon": "vercel/vercel-original",
          "invert": true
        }
      ],
      "strong": [
        {
          "name": "CI/CD básico",
          "lucide": "RefreshCw"
        },
        {
          "name": "npm / pnpm",
          "devicon": "npm/npm-original-wordmark"
        },
        {
          "name": "Linux / Bash",
          "devicon": "linux/linux-original"
        }
      ],
      "familiar": [
        {
          "name": "GitHub Actions",
          "devicon": "githubactions/githubactions-original"
        },
        {
          "name": "Docker (básico)",
          "devicon": "docker/docker-original"
        },
        {
          "name": "Cloudinary",
          "fallback": "CDN",
          "fallbackColor": "accent"
        }
      ]
    },
    {
      "id": "cms",
      "label": "CMS & Plataformas",
      "icon": "Globe",
      "description": "Gestores de contenido y plataformas de e-commerce",
      "core": [
        {
          "name": "WordPress",
          "devicon": "wordpress/wordpress-plain"
        }
      ],
      "strong": [
        {
          "name": "Tiendanube",
          "fallback": "TN",
          "fallbackColor": "accent"
        },
        {
          "name": "Mercado Pago",
          "fallback": "MP",
          "fallbackColor": "#009ee3"
        },
        {
          "name": "EmailJS",
          "fallback": "EJS",
          "fallbackColor": "accent"
        }
      ],
      "familiar": [
        {
          "name": "Shopify (Liquid)",
          "fallback": "SF",
          "fallbackColor": "#96bf48"
        },
        {
          "name": "Strapi",
          "devicon": "strapi/strapi-original"
        }
      ]
    },
    {
      "id": "ai",
      "label": "AI & Automatización",
      "icon": "Bot",
      "description": "Herramientas de IA aplicadas al desarrollo profesional",
      "core": [
        {
          "name": "Claude API",
          "fallback": "CL",
          "fallbackColor": "accent"
        },
        {
          "name": "OpenAI API",
          "fallback": "AI",
          "fallbackColor": "#10a37f"
        },
        {
          "name": "Cursor",
          "fallback": "CR",
          "fallbackColor": "accent"
        },
        {
          "name": "Claude Code",
          "fallback": "CC",
          "fallbackColor": "accent"
        }
      ],
      "strong": [
        {
          "name": "Prompt Engineering",
          "lucide": "MessageSquare"
        },
        {
          "name": "Agentes IA",
          "lucide": "Bot"
        },
        {
          "name": "RAG básico",
          "lucide": "Database"
        },
        {
          "name": "v0 / Lovable",
          "fallback": "v0",
          "fallbackColor": "accent"
        }
      ],
      "familiar": [
        {
          "name": "LangChain (básico)",
          "fallback": "LC",
          "fallbackColor": "#1c3c6e"
        },
        {
          "name": "Embeddings",
          "lucide": "Braces"
        },
        {
          "name": "MCP Servers",
          "fallback": "MCP",
          "fallbackColor": "accent"
        }
      ]
    },
    {
      "id": "exploring",
      "label": "Explorando",
      "icon": "Compass",
      "description": "Tecnologías en las que estoy invirtiendo tiempo activamente",
      "core": [],
      "strong": [
        {
          "name": "React Native",
          "devicon": "react/react-original"
        },
        {
          "name": "Three.js / WebGL",
          "devicon": "threejs/threejs-original",
          "darkBg": true
        },
        {
          "name": "GLSL Shaders",
          "lucide": "Triangle"
        },
        {
          "name": "Testing (Vitest)",
          "devicon": "vitest/vitest-original"
        }
      ],
      "familiar": [
        {
          "name": "N8N",
          "fallback": "n8n",
          "fallbackColor": "accent"
        },
        {
          "name": "Playwright",
          "devicon": "playwright/playwright-original"
        },
        {
          "name": "tRPC",
          "fallback": "tRPC",
          "fallbackColor": "accent"
        },
        {
          "name": "Turborepo",
          "fallback": "TB",
          "fallbackColor": "accent"
        }
      ]
    }
  ]
}
export const enProfile = {
  "personalInfo": {
    "name": "Alejo de la Arena",
    "role": "Full-stack developer focused on frontend",
    "tagline": "Building for the web since April 2024.",
    "valueLine": "React, Next.js, TypeScript, and Node.js.",
    "recruiterSummary": "I build web products with React, Next.js, TypeScript, and Node.js. I’ve been working professionally since April 2024.",
    "deepDiveSummary": "I build web products with React, Next.js, TypeScript, and Node.js. I’ve been working professionally since April 2024.",
    "proof": [
      "React · Next.js",
      "TypeScript · Node.js",
      "B2 English"
    ],
    "bio": "Full-stack developer focused on frontend. Working professionally since April 2024.",
    "location": "Buenos Aires, Argentina · UTC−3 · B2 English",
    "email": "alejodelaarenaa@gmail.com",
    "availability": "My priority is a full-time remote role. I’m also open to part-time opportunities and hybrid or on-site roles in Buenos Aires. I’m available for freelance projects."
  },
  "about": {
  "paragraphs": [
    "Before writing code, I organize the requirements: what the client needs, which tools it calls for, and how I will set up the project. I prepare the environment and develop against the brief and design, then move to production and refine the live site.",
    "I model the domain before working out the screens. In Solution, starting a payment and confirming a purchase are different states; in FORMAT, Seasons determine each event’s visual identity. Rules also belong in a specific place: in Don Teófilo, database RLS policies separate public and private content.",
    "I think about who will operate the system after delivery. In Manantial, I chose Gutenberg and ACF so the team can edit content within a defined design structure. In BOA and Don Teófilo, the panel puts management in the hands of nontechnical users."
  ]
},
  "sectionLinks": [
    {
      "id": "cases",
      "label": "Work"
    },
    {
      "id": "experience",
      "label": "Experience"
    },
    {
      "id": "about",
      "label": "About"
    },
    {
      "id": "projects",
      "label": "Projects"
    },
    {
      "id": "skills",
      "label": "Skills"
    },
    {
      "id": "contact",
      "label": "Contact"
    }
  ]
}

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string,
}

export const seoMetadata = {
  title: `Alejo de la Arena | Full-Stack Developer · Frontend Specialist`,
  description: `Portfolio de Alejo de la Arena, Full-Stack Developer especializado en Frontend, con foco en producto, performance y experiencia de usuario.`,
  keywords: "full stack developer, frontend developer, react developer, typescript, next.js, portfolio",
  ogImage: "/og-image.jpg",
  twitterHandle: "@tuusuario",
}
