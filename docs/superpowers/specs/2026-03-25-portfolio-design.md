# Portfolio Freelance — Design Spec

**Date:** 2026-03-25
**Statut:** Approuvé

---

## Objectif

Portfolio single-page pour un développeur freelance. Vitrine créative, originale et élégante permettant aux clients potentiels de découvrir le profil, les projets, les services proposés, et de prendre contact.

---

## Stack technique

| Outil | Usage |
|---|---|
| React 18 + Vite + TypeScript | SPA, bundler rapide |
| Tailwind CSS | Styling utilitaire |
| Framer Motion | Animations scroll-triggered, transitions |
| tsParticles | Canvas particules en background Hero |
| EmailJS | Envoi email depuis le formulaire de contact (pas de backend) |
| Vercel | Déploiement (branche main → prod) |

---

## Architecture

### Structure des fichiers

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation fixe, hide-on-scroll-down
│   │   ├── Footer.tsx
│   │   └── CustomCursor.tsx    # Cursor custom avec effet hover
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── TechStack.tsx
│   │   ├── Projects.tsx
│   │   ├── Services.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Badge.tsx
├── data/
│   ├── projects.ts             # Tableau de projets (titre, description, stack, liens)
│   ├── services.ts             # Tableau de services freelance
│   └── stack.ts                # Tableau de technos par catégorie
├── hooks/
│   ├── useScrollAnimation.ts   # Hook Framer Motion scroll-triggered
│   └── useCursor.ts            # Hook position/état du cursor custom
└── lib/
    └── emailjs.ts              # Config EmailJS (serviceId, templateId)
```

**Pas de CMS, pas de backend.** Tout le contenu est défini dans les fichiers `data/`. Modification du contenu = édition d'un fichier TypeScript.

---

## Design System

### Palette de couleurs

| Token | Valeur | Usage |
|---|---|---|
| `background` | `#0a0a0f` | Fond global (noir profond bleuté) |
| `accent-primary` | `#7c3aed` → `#a78bfa` | Gradient violet/indigo |
| `accent-secondary` | `#06b6d4` | Cyan — highlights, badges code |
| `text-primary` | `#ffffff` | Titres |
| `text-muted` | `#94a3b8` | Corps de texte |

### Typographie

| Usage | Police |
|---|---|
| Titres | Space Grotesk |
| Corps | Inter |
| Code / accents | JetBrains Mono |

---

## Sections

### 1. Navbar
- Fixe en haut, `backdrop-blur`, fond semi-transparent
- Logo/initiales à gauche, liens anchor à droite (About, Stack, Projects, Services, Contact)
- Masquée au scroll vers le bas, réapparaît au scroll vers le haut (via `useScrollDirection`)

### 2. Hero
- Canvas tsParticles en background (particules connectées, mouvement lent, subtil)
- Parallax léger : le background se déplace plus lentement que le contenu au scroll
- Effet typing animé sur le titre/rôle (ex : `"Développeur Fullstack"`)
- Sous-titre court : accroche freelance (1 ligne)
- Deux CTA : `Voir mes projets` (scroll vers #projects) + `Me contacter` (scroll vers #contact)

### 3. À propos
- Layout deux colonnes : photo/avatar à gauche, texte à droite
- Paragraphe de présentation (3-4 lignes)
- Quelques chiffres clés (années d'expérience, projets livrés, clients satisfaits)
- Animation d'entrée : fade-in + slide-up au scroll

### 4. Stack technique
- Grille de badges : logo + nom de la techno
- Regroupés par catégorie : Frontend, Backend, Outils/DevOps
- Hover animation sur chaque badge (scale + glow)
- Animation d'entrée : stagger (badges apparaissent les uns après les autres)

### 5. Projets
- Cards en grille (2 colonnes desktop, 1 mobile)
- Chaque card : screenshot/image, titre, description courte, badges stack, liens (GitHub + demo)
- Hover : gradient glow derrière la card
- Données dans `data/projects.ts`

### 6. Services
- 3-4 cards : Développement web sur mesure, Intégration UI/UX, API & Backend, Audit & conseil
- Chaque card : icône, titre, description courte
- Prix indicatif optionnel
- Données dans `data/services.ts`

### 7. Contact
- Formulaire : Nom, Email, Sujet, Message + bouton Envoyer
- Envoi via EmailJS (serviceId + templateId en variables d'environnement Vite)
- Feedback visuel : état de chargement sur le bouton, message success/error après envoi
- Validation basique côté client (champs requis, format email)
- Liens sociaux en dessous : GitHub, LinkedIn (icônes)

---

## Animations & Interactions

| Effet | Librairie | Détail |
|---|---|---|
| Scroll-triggered fade/slide | Framer Motion | `whileInView` sur chaque section |
| Effet typing | Framer Motion ou lib custom | Hero — titre/rôle |
| Parallax Hero | Framer Motion `useScroll` | Background se déplace à 0.3x |
| Canvas particules | tsParticles | Hero background, particules connectées |
| Cursor custom | Hook maison | Cercle SVG, scale au hover |
| Stagger badges | Framer Motion | Section Stack |
| Card glow hover | Tailwind + CSS | Pseudo-élément gradient |

---

## Formulaire de contact — Flux

1. Utilisateur remplit le formulaire
2. Validation côté client (HTML5 + contrôle JS)
3. Appel `emailjs.send()` avec les données
4. Bouton en état loading pendant l'envoi
5. Succès → message de confirmation + reset du formulaire
6. Erreur → message d'erreur, formulaire intact

**Variables d'environnement requises :**
```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

---

## Déploiement

- Hébergement : Vercel
- Build command : `vite build`
- Output dir : `dist`
- Variables d'environnement configurées dans le dashboard Vercel
- Domaine custom à configurer selon disponibilité

---

## Ce qui est hors scope

- Blog / articles
- CMS ou back-office
- Authentification
- Témoignages clients
- Multi-langue
- Mode clair
