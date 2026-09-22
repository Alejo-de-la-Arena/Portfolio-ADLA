import type { SkillsData } from '@/types'
import { ownProjects } from './personalProjects'

export const personalInfo = {
  "name": "Alejo de la Arena",
  "role": "Desarrollador full-stack con foco en frontend",
  "tagline": "Desarrollo web desde abril de 2024.",
  "valueLine": "React, Next.js, TypeScript y Node.js.",
  "summary": "Desarrollo productos web con React, Next.js, TypeScript y Node.js. Trabajo profesionalmente desde abril de 2024.",
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
export const about = {
  titles: ['Cómo arranco un proyecto', 'Comunicación y equipo', 'IA con criterio'],
  "paragraphs": [
    "Antes de escribir código, ordeno los requerimientos: qué necesita el cliente, qué herramientas hacen falta y cómo voy a preparar el proyecto. Dejo el entorno listo y desarrollo tomando el pedido y el diseño como referencia; después paso a producción y ajusto sobre el sitio en vivo.",
    "En Zetenta implementé Figma junto al equipo de diseño, probando en distintos dispositivos y entregando por etapas. Como freelance, traduzco necesidades de los dueños en decisiones técnicas y explico alternativas y costos sin jerga. En BOA y Don Teófilo, esa colaboración terminó en paneles que usan personas no técnicas a diario.",
    "Uso agentes de IA para acelerar el desarrollo: reviso cada resultado, tomo las decisiones técnicas y verifico antes de entregar. En VYZON probé cómo coordinar agentes especializados con decisión humana final. En Job Match Bot, la IA también es parte del producto: Gemini analiza CVs y genera embeddings para comparar perfiles y vacantes."
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
          "name": "WebGL",
          "lucide": "Triangle"
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
          "name": "WebGL",
          "lucide": "Triangle"
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
    "summary": "I build web products with React, Next.js, TypeScript, and Node.js. I’ve been working professionally since April 2024.",
    "bio": "Full-stack developer focused on frontend. Working professionally since April 2024.",
    "location": "Buenos Aires, Argentina · UTC−3 · B2 English",
    "email": "alejodelaarenaa@gmail.com",
    "availability": "My priority is a full-time remote role. I’m also open to part-time opportunities and hybrid or on-site roles in Buenos Aires. I’m available for freelance projects."
  },
  "about": {
    titles: ['How I start a project', 'Communication and teamwork', 'AI with judgment'],
    "paragraphs": [
      "Before writing code, I organize the requirements: what the client needs, which tools it calls for, and how I will set up the project. I prepare the environment and develop against the brief and design, then move to production and refine the live site.",
      "At Zetenta, I implemented Figma designs alongside the design team, testing across devices and delivering in stages. As a freelancer, I turn business owners’ needs into technical decisions and explain options and costs without jargon. At BOA and Don Teófilo, that collaboration led to admin panels used daily by nontechnical people.",
      "I use AI agents to speed up development: I review every result, make the technical decisions, and verify before delivery. In VYZON, I explored coordinating specialized agents with a human making the final call. In Job Match Bot, AI is also part of the product: Gemini analyzes CVs and generates embeddings for comparing profiles and jobs."
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
  twitterHandle: "@tuusuario",
}
