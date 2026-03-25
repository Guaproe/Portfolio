import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'Mon Projet 1',
    description: 'Description courte du projet. Technologies utilisées, problème résolu.',
    image: '/projects/project1.png',
    stack: ['React', 'TypeScript', 'Node.js'],
    githubUrl: 'https://github.com/username/project1',
    demoUrl: 'https://project1.vercel.app',
  },
  {
    id: '2',
    title: 'Mon Projet 2',
    description: 'Description courte du projet. Technologies utilisées, problème résolu.',
    image: '/projects/project2.png',
    stack: ['Next.js', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/username/project2',
  },
]
