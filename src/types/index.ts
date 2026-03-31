export interface Project {
  id: number
  title: string
  year: number
  role: string
  scope: string
  timeline: string
  impact: string
  description: string
  problem: string
  solution: string
  image: string
  tags: string[]
  highlights: string[]
  technologies: string[]
  featured?: boolean
  metrics?: string[]
  decisions?: string[]
  results?: string[]
  liveUrl?: string
  githubUrl?: string
  caseStudy?: string
}

export interface Experience {
  id: number
  type: 'employment' | 'freelance'
  role: string
  company: string
  period: string
  year: number
  location: string
  summary: string
  achievements: string[]
  technologies: string[]
  websiteUrl?: string
  images?: string[]
  accentColor?: string
  subProjects?: Array<{
    title: string
    role: string
    context?: string
    contribution: string
    impact?: string
    stack?: string[]
    websiteUrl: string
    images?: string[]
    relatedLinks?: string[]
  }>
  details: {
    built: string[]
    optimized: string[]
    decisions: string[]
    results: string[]
    links?: Array<{ label: string; href: string }>
  }
}

export interface SkillCategory {
  label: string
  core: string[]
  strong: string[]
  familiar: string[]
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
