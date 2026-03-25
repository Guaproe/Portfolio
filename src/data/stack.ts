import type { TechCategory } from '../types'

export const techStack: TechCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
      { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
      { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'Prisma', icon: 'https://cdn.simpleicons.org/prisma/ffffff' },
    ],
  },
  {
    category: 'Outils',
    items: [
      { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
    ],
  },
]
