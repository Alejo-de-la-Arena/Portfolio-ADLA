import type { ProjectMedia } from '@/data/experiences'

export interface Project {
  id: string
  title: string
  year: number
  role: string
  scope: string
  timeline: string
  impact: string
  description: string
  problem: string
  solution: string
  image?: string
  media?: ProjectMedia
  tags: string[]
  highlights: string[]
  technologies: string[]
  featured?: boolean
  metrics?: string[]
  decisions?: string[]
  results?: string[]
  liveUrl?: string
  githubUrl?: string
  roadmap?: string[]
  demos?: Array<{ id: number; title: string; label: string; description: string; decisions: string[]; status: string; image: string; liveUrl?: string; technologies: string[] }>
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

export interface SkillItem {
  name: string
  devicon?: string
  darkBg?: boolean
  invert?: boolean
  lucide?: string
  fallback?: string
  fallbackColor?: string
}

export interface SkillCard {
  id: string
  label: string
  icon: string
  description: string
  core: SkillItem[]
  strong: SkillItem[]
  familiar: SkillItem[]
}

export interface SkillsData {
  cards: SkillCard[]
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
