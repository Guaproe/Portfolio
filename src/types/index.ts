export interface Project {
  id: string
  title: string
  description: string
  image: string
  stack: string[]
  githubUrl?: string
  demoUrl?: string
}

export interface Service {
  icon: string
  title: string
  description: string
  price?: string
}

export interface TechItem {
  name: string
  icon: string
}

export interface TechCategory {
  category: string
  items: TechItem[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
}
