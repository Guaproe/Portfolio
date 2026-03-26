import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Stockeo",
    description:
      "Application de gestion de stock pour particuliers et professionnels avec suivi des palettes, décrémentation automatique des articles, calcul des coûts d’achat, des ventes et des marges, ainsi qu’un historique détaillé et des filtres temporels pour piloter l’activité.",
    image: "/projects/project1.png",
    stack: ["Swift"],
    githubUrl: "https://github.com/Guaproe/Stockeo",
    demoUrl: "https://apps.apple.com/fr/app/gestionstockconnect/id6760645287",
  },
  {
    id: "2",
    title: "Mon Projet 2",
    description:
      "Description courte du projet. Technologies utilisées, problème résolu.",
    image: "/projects/project2.png",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/username/project2",
  },
];
