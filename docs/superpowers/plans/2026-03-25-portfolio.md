# Portfolio Freelance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page developer portfolio with animated sections, custom cursor, particles background, and EmailJS contact form — deployable on Vercel.

**Architecture:** React 18 SPA scaffolded with Vite + TypeScript. All content lives in `src/data/` TypeScript files. Animations via Framer Motion (`whileInView`, `useScroll`), particles via `@tsparticles/slim`, contact via EmailJS (no backend).

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS 3, Framer Motion, @tsparticles/slim, @tsparticles/react, react-type-animation, @emailjs/browser, Vitest, @testing-library/react

---

## File Map

| File | Responsibility |
|---|---|
| `vite.config.ts` | Vite config |
| `tailwind.config.ts` | Custom colors, fonts, animations |
| `src/main.tsx` | App entry point |
| `src/App.tsx` | Root component — assembles all sections |
| `src/index.css` | Global styles, font imports |
| `src/types/index.ts` | Shared TypeScript types |
| `src/data/projects.ts` | Project data array |
| `src/data/services.ts` | Services data array |
| `src/data/stack.ts` | Tech stack data by category |
| `src/lib/emailjs.ts` | `sendEmail(data)` wrapper around @emailjs/browser |
| `src/test/setup.ts` | Vitest setup — imports @testing-library/jest-dom matchers |
| `src/hooks/useScrollDirection.ts` | Returns "up"/"down", hides navbar after 50px scroll down |
| `src/hooks/useCursor.ts` | Tracks mouse position + hover state, disabled on touch |
| `src/components/ui/Button.tsx` | Reusable button with variants |
| `src/components/ui/Badge.tsx` | Small label badge |
| `src/components/ui/Card.tsx` | Container card with glow hover |
| `src/components/layout/Navbar.tsx` | Fixed navbar, hide/show on scroll |
| `src/components/layout/Footer.tsx` | Simple footer |
| `src/components/layout/CustomCursor.tsx` | SVG cursor, disabled on touch devices |
| `src/components/sections/Hero.tsx` | Particles + parallax + typing + CTAs |
| `src/components/sections/About.tsx` | 2-col layout, stats |
| `src/components/sections/TechStack.tsx` | Badge grid by category, stagger |
| `src/components/sections/Projects.tsx` | Card grid |
| `src/components/sections/Services.tsx` | Service cards |
| `src/components/sections/Contact.tsx` | EmailJS form + honeypot |
| `src/components/sections/Contact.test.tsx` | Form validation tests |
| `src/lib/emailjs.test.ts` | sendEmail unit tests |
| `src/hooks/useScrollDirection.test.ts` | Hook logic tests |
| `.env.example` | Environment variable template |

---

## Task 1: Scaffold the project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`

- [ ] **Step 1: Init Vite project**

```bash
cd /Users/david/Documents/dev/portfolio
npm create vite@latest . -- --template react-ts
```

Answer: `y` to overwrite (only docs/ exists).

- [ ] **Step 2: Install core dependencies**

```bash
npm install framer-motion @tsparticles/slim @tsparticles/react react-type-animation @emailjs/browser
npm install -D tailwindcss@3 postcss autoprefixer vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Init Tailwind**

```bash
npx tailwindcss init -p
```

This creates `tailwind.config.js` and `postcss.config.js`.

- [ ] **Step 4: Rename tailwind config to TypeScript**

```bash
mv tailwind.config.js tailwind.config.ts
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: server on `http://localhost:5173`, no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold vite react-ts project"
```

---

## Task 2: Configure Tailwind + design tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/index.css`

- [ ] **Step 1: Write failing test** — skip (config, no logic to test)

- [ ] **Step 2: Update `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        'accent-primary': '#7c3aed',
        'accent-light': '#a78bfa',
        'accent-secondary': '#06b6d4',
        'text-primary': '#ffffff',
        'text-muted': '#94a3b8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #7c3aed, #a78bfa)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Update `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #0a0a0f;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    cursor: none;
  }
}

@layer utilities {
  .cursor-glow {
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.4);
  }
}
```

- [ ] **Step 4: Update `vite.config.ts` to include Vitest**

Use `vitest/config` (not `vite`) to get proper TypeScript types for the `test` key:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

- [ ] **Step 5: Create test setup file**

Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Update `tsconfig.json`** — add `"types": ["vitest/globals"]` under `compilerOptions`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: configure tailwind design tokens and vitest"
```

---

## Task 3: TypeScript types + data files

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/services.ts`
- Create: `src/data/stack.ts`

- [ ] **Step 1: Create `src/types/index.ts`**

```typescript
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
```

- [ ] **Step 2: Create `src/data/projects.ts`** with placeholder data

```typescript
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
```

- [ ] **Step 3: Create `src/data/services.ts`**

```typescript
import type { Service } from '../types'

export const services: Service[] = [
  {
    icon: '🖥️',
    title: 'Développement web sur mesure',
    description: 'Applications web modernes, performantes et accessibles, adaptées à vos besoins.',
    price: 'À partir de 1500€',
  },
  {
    icon: '🎨',
    title: 'Intégration UI/UX',
    description: 'Intégration pixel-perfect de maquettes Figma, animations et responsive design.',
    price: 'À partir de 800€',
  },
  {
    icon: '⚙️',
    title: 'API & Backend',
    description: 'Conception et développement d\'APIs REST ou GraphQL robustes et documentées.',
    price: 'À partir de 1200€',
  },
  {
    icon: '🔍',
    title: 'Audit & Conseil',
    description: 'Analyse de votre stack technique, recommandations d\'optimisation et de sécurité.',
  },
]
```

- [ ] **Step 4: Create `src/data/stack.ts`**

```typescript
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
```

- [ ] **Step 5: Commit**

```bash
git add src/types src/data
git commit -m "feat: add types and placeholder data files"
```

---

## Task 4: UI primitives — Button, Badge, Card

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Card.tsx`

These are pure presentational components. No unit tests needed — they have no logic.

- [ ] **Step 1: Create `src/components/ui/Button.tsx`**

```tsx
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const base = 'px-6 py-3 rounded-lg font-heading font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-gradient-accent text-white hover:opacity-90',
    outline: 'border border-accent-primary text-accent-light hover:bg-accent-primary/10',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
```

- [ ] **Step 2: Create `src/components/ui/Badge.tsx`**

```tsx
interface BadgeProps {
  label: string
  className?: string
}

export function Badge({ label, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-mono border border-accent-secondary/30 text-accent-secondary bg-accent-secondary/10 ${className}`}
    >
      {label}
    </span>
  )
}
```

- [ ] **Step 3: Create `src/components/ui/Card.tsx`**

```tsx
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden
        before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300
        before:bg-gradient-to-br before:from-accent-primary/20 before:to-accent-secondary/10
        hover:before:opacity-100 hover:border-accent-primary/40
        ${className}`}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui
git commit -m "feat: add Button, Badge, Card UI primitives"
```

---

## Task 5: Hooks — useScrollDirection + useCursor

**Files:**
- Create: `src/hooks/useScrollDirection.ts`
- Create: `src/hooks/useScrollDirection.test.ts`
- Create: `src/hooks/useCursor.ts`

- [ ] **Step 1: Write failing test for `useScrollDirection`**

Create `src/hooks/useScrollDirection.test.ts`:
```typescript
import { renderHook, act } from '@testing-library/react'
import { useScrollDirection } from './useScrollDirection'

describe('useScrollDirection', () => {
  // configurable: true is required so subsequent defineProperty calls don't throw
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
  })

  it('returns "up" initially', () => {
    const { result } = renderHook(() => useScrollDirection())
    expect(result.current).toBe('up')
  })

  it('returns "down" after scrolling down past 50px', () => {
    const { result } = renderHook(() => useScrollDirection())
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 60 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('down')
  })

  it('returns "up" when scrolling back up', () => {
    const { result } = renderHook(() => useScrollDirection())
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 60 })
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 30 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('up')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/hooks/useScrollDirection.test.ts
```

Expected: FAIL — `useScrollDirection` not found.

- [ ] **Step 3: Implement `src/hooks/useScrollDirection.ts`**

```typescript
import { useState, useEffect, useRef } from 'react'

type ScrollDirection = 'up' | 'down'

export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('up')
  const prevScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 50) {
        setDirection('up')
      } else if (currentY > prevScrollY.current) {
        setDirection('down')
      } else {
        setDirection('up')
      }
      prevScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/hooks/useScrollDirection.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 5: Create `src/hooks/useCursor.ts`**

No tests — it wraps DOM event listeners, not logic.

```typescript
import { useState, useEffect } from 'react'

interface CursorState {
  x: number
  y: number
  hovering: boolean
  visible: boolean
}

export function useCursor(): CursorState {
  const isTouchDevice =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches

  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    hovering: false,
    visible: !isTouchDevice,
  })

  useEffect(() => {
    if (isTouchDevice) return

    const onMove = (e: MouseEvent) => {
      setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }))
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [data-hover]')) {
        setCursor((c) => ({ ...c, hovering: true }))
      }
    }

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [data-hover]')) {
        setCursor((c) => ({ ...c, hovering: false }))
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [isTouchDevice])

  return cursor
}
```

- [ ] **Step 6: Commit**

```bash
git add src/hooks
git commit -m "feat: add useScrollDirection and useCursor hooks"
```

---

## Task 6: EmailJS wrapper

**Files:**
- Create: `src/lib/emailjs.ts`
- Create: `src/lib/emailjs.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/lib/emailjs.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import emailjs from '@emailjs/browser'
import { sendEmail } from './emailjs'
import type { ContactFormData } from '../types'

vi.mock('@emailjs/browser')

const validData: ContactFormData = {
  name: 'Alice',
  email: 'alice@example.com',
  subject: 'Projet freelance',
  message: 'Bonjour, je souhaite vous contacter.',
}

describe('sendEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls emailjs.send with correct params', async () => {
    vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200, text: 'OK' })
    await sendEmail(validData)
    expect(emailjs.send).toHaveBeenCalledOnce()
  })

  it('silently rejects when honeypot is filled', async () => {
    const dataWithHoneypot = { ...validData, honeypot: 'bot' }
    await sendEmail(dataWithHoneypot)
    expect(emailjs.send).not.toHaveBeenCalled()
  })

  it('throws when emailjs.send rejects', async () => {
    vi.mocked(emailjs.send).mockRejectedValueOnce(new Error('Network error'))
    await expect(sendEmail(validData)).rejects.toThrow('Network error')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/lib/emailjs.test.ts
```

Expected: FAIL — `sendEmail` not found.

- [ ] **Step 3: Implement `src/lib/emailjs.ts`**

```typescript
import emailjs from '@emailjs/browser'
import type { ContactFormData } from '../types'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

export async function sendEmail(data: ContactFormData): Promise<void> {
  if (data.honeypot) return

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    },
    PUBLIC_KEY
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/lib/emailjs.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib
git commit -m "feat: add sendEmail wrapper with honeypot guard"
```

---

## Task 7: Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Create `src/components/layout/Navbar.tsx`**

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollDirection } from '../../hooks/useScrollDirection'

const links = [
  { label: 'À propos', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projets', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const direction = useScrollDirection()

  return (
    <AnimatePresence>
      {direction === 'up' && (
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-background/70 border-b border-white/5"
        >
          <a href="#" className="font-heading font-bold text-xl text-accent-light">
            {'<Dev />'}
          </a>
          <ul className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
```

**Note on mobile nav:** The spec is mobile-first but does not require a hamburger menu. Links are hidden on mobile (`hidden md:flex`) — the CTAs in the Hero and the natural scroll cover navigation on small screens. This is a deliberate simplification; add a mobile menu later if needed.

**Note on `useScrollAnimation`:** The spec's file map lists this hook, but this plan uses inline Framer Motion `whileInView` props directly on each section. This achieves the same result with less abstraction. The hook is intentionally omitted.

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add Navbar with hide-on-scroll behavior"
```

---

## Task 8: CustomCursor + Footer

**Files:**
- Create: `src/components/layout/CustomCursor.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create `src/components/layout/CustomCursor.tsx`**

```tsx
import { motion } from 'framer-motion'
import { useCursor } from '../../hooks/useCursor'

export function CustomCursor() {
  const { x, y, hovering, visible } = useCursor()

  if (!visible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      animate={{
        x: x - (hovering ? 20 : 8),
        y: y - (hovering ? 20 : 8),
        width: hovering ? 40 : 16,
        height: hovering ? 40 : 16,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div
        className={`w-full h-full rounded-full border-2 border-accent-primary transition-colors duration-200 ${
          hovering ? 'bg-accent-primary/20' : 'bg-transparent'
        }`}
      />
    </motion.div>
  )
}
```

- [ ] **Step 2: Create `src/components/layout/Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="py-8 px-6 text-center border-t border-white/5">
      <p className="text-text-muted text-sm font-mono">
        {'// '} Conçu & développé avec passion — {new Date().getFullYear()}
      </p>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/CustomCursor.tsx src/components/layout/Footer.tsx
git commit -m "feat: add CustomCursor and Footer components"
```

---

## Task 9: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create `src/components/sections/Hero.tsx`**

Note: `@tsparticles/react` v3 uses `initParticlesEngine` (called once in a `useEffect`) + `<Particles>` component. The old `init` prop does not exist in v3.

```tsx
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { Button } from '../ui/Button'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const [particlesReady, setParticlesReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setParticlesReady(true))
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particles background */}
      {particlesReady && (
      <Particles
        id="tsparticles"
        className="absolute inset-0"
        options={{
          background: { color: { value: 'transparent' } },
          particles: {
            number: { value: 60, density: { enable: true, width: 1200 } },
            color: { value: ['#7c3aed', '#06b6d4'] },
            links: { enable: true, color: '#7c3aed', opacity: 0.2, distance: 150 },
            move: { enable: true, speed: 0.8 },
            opacity: { value: 0.4 },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />
      )}

      {/* Parallax gradient blob */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-accent-primary/10 blur-[120px]" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <p className="font-mono text-accent-secondary text-sm mb-4 tracking-widest uppercase">
          Disponible pour des missions freelance
        </p>

        <h1 className="font-heading font-bold text-5xl md:text-7xl text-text-primary mb-4 leading-tight">
          <TypeAnimation
            sequence={[
              'Développeur Fullstack',
              2000,
              'Développeur React',
              2000,
              'Développeur Node.js',
              2000,
            ]}
            repeat={Infinity}
            cursor={true}
            className="text-gradient bg-gradient-accent bg-clip-text text-transparent"
          />
        </h1>

        <p className="text-text-muted text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Je transforme vos idées en produits web performants et élégants.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => scrollTo('projects')}>Voir mes projets</Button>
          <Button variant="outline" onClick={() => scrollTo('contact')}>Me contacter</Button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent-light rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser** — `npm run dev`, check Hero section renders.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with particles, parallax, and typing effect"
```

---

## Task 10: About section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create `src/components/sections/About.tsx`**

```tsx
import { motion } from 'framer-motion'

const stats = [
  { value: '3+', label: 'Années d\'expérience' },
  { value: '20+', label: 'Projets livrés' },
  { value: '10+', label: 'Clients satisfaits' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        {...fadeInUp}
      >
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative w-64 h-64 rounded-2xl overflow-hidden border border-accent-primary/30">
            <div className="w-full h-full bg-gradient-to-br from-accent-primary/30 to-accent-secondary/20 flex items-center justify-center">
              <span className="text-8xl">👨‍💻</span>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-accent-primary/20" />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="font-mono text-accent-secondary text-sm mb-3 tracking-widest uppercase">
            À propos
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-6">
            Développeur passionné par la qualité
          </h2>
          <p className="text-text-muted leading-relaxed mb-8">
            Je suis développeur freelance spécialisé en React, Node.js et TypeScript.
            J'accompagne startups et entreprises dans la conception et le développement
            de leurs produits web — du prototype à la mise en production.
            J'attache une importance particulière à la qualité du code, à la performance
            et à l'expérience utilisateur.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl border border-white/10 bg-white/5">
                <p className="font-heading font-bold text-2xl text-accent-light">{stat.value}</p>
                <p className="text-text-muted text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: add About section"
```

---

## Task 11: TechStack section

**Files:**
- Create: `src/components/sections/TechStack.tsx`

- [ ] **Step 1: Create `src/components/sections/TechStack.tsx`**

```tsx
import { motion } from 'framer-motion'
import { techStack } from '../../data/stack'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
}

export function TechStack() {
  return (
    <section id="stack" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-accent-secondary text-sm mb-3 tracking-widest uppercase text-center">
          Technologies
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-12 text-center">
          Ma stack technique
        </h2>

        <div className="space-y-10">
          {techStack.map((category) => (
            <div key={category.category}>
              <h3 className="font-mono text-text-muted text-sm mb-4 uppercase tracking-wider">
                // {category.category}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {category.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={item}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5
                      hover:border-accent-primary/40 hover:bg-accent-primary/10 transition-colors duration-200 cursor-default"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
                    <span className="font-mono text-sm text-text-primary">{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/TechStack.tsx
git commit -m "feat: add TechStack section with stagger animation"
```

---

## Task 12: Projects section

**Files:**
- Create: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Create `src/components/sections/Projects.tsx`**

```tsx
import { motion } from 'framer-motion'
import { projects } from '../../data/projects'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-accent-secondary text-sm mb-3 tracking-widest uppercase text-center">
          Réalisations
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-12 text-center">
          Mes projets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-0 h-full flex flex-col">
                {/* Image */}
                <div className="w-full h-48 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech) => (
                      <Badge key={tech} label={tech} />
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-accent-light hover:text-white transition-colors"
                      >
                        GitHub →
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-accent-secondary hover:text-white transition-colors"
                      >
                        Demo →
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: add Projects section with card grid"
```

---

## Task 13: Services section

**Files:**
- Create: `src/components/sections/Services.tsx`

- [ ] **Step 1: Create `src/components/sections/Services.tsx`**

```tsx
import { motion } from 'framer-motion'
import { services } from '../../data/services'
import { Card } from '../ui/Card'

export function Services() {
  return (
    <section id="services" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-accent-secondary text-sm mb-3 tracking-widest uppercase text-center">
          Prestations
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-12 text-center">
          Ce que je propose
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-heading font-semibold text-xl text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                {service.price && (
                  <p className="font-mono text-accent-secondary text-sm">
                    {service.price}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Services.tsx
git commit -m "feat: add Services section"
```

---

## Task 14: Contact section + form

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Create: `src/components/sections/Contact.test.tsx`

- [ ] **Step 1: Write failing tests for form validation**

Create `src/components/sections/Contact.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Contact } from './Contact'
import { vi } from 'vitest'
import * as emailjsLib from '../../lib/emailjs'

vi.mock('../../lib/emailjs')

describe('Contact form', () => {
  it('renders all form fields', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText(/Votre nom/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/votre@email.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Sujet/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Votre message/i)).toBeInTheDocument()
  })

  it('shows error if required fields are empty on submit', async () => {
    render(<Contact />)
    const submitButton = screen.getByRole('button', { name: /envoyer/i })
    await userEvent.click(submitButton)
    expect(emailjsLib.sendEmail).not.toHaveBeenCalled()
  })

  it('calls sendEmail with form data when form is valid', async () => {
    vi.mocked(emailjsLib.sendEmail).mockResolvedValueOnce(undefined)
    render(<Contact />)

    await userEvent.type(screen.getByPlaceholderText(/Votre nom/i), 'Alice')
    await userEvent.type(screen.getByPlaceholderText(/votre@email.com/i), 'alice@example.com')
    await userEvent.type(screen.getByPlaceholderText(/Sujet/i), 'Test')
    await userEvent.type(screen.getByPlaceholderText(/Votre message/i), 'Hello world')

    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }))

    expect(emailjsLib.sendEmail).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
      subject: 'Test',
      message: 'Hello world',
      honeypot: '',
    })
  })

  it('shows success message after successful send', async () => {
    vi.mocked(emailjsLib.sendEmail).mockResolvedValueOnce(undefined)
    render(<Contact />)

    await userEvent.type(screen.getByPlaceholderText(/Votre nom/i), 'Alice')
    await userEvent.type(screen.getByPlaceholderText(/votre@email.com/i), 'alice@example.com')
    await userEvent.type(screen.getByPlaceholderText(/Sujet/i), 'Test')
    await userEvent.type(screen.getByPlaceholderText(/Votre message/i), 'Hello world')
    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }))

    expect(await screen.findByText(/message envoyé/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/sections/Contact.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Implement `src/components/sections/Contact.tsx`**

```tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { sendEmail } from '../../lib/emailjs'
import type { ContactFormData } from '../../types'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder-text-muted text-sm outline-none focus:border-accent-primary/60 transition-colors duration-200'

export function Contact() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const validate = (): boolean => {
    const e: Partial<ContactFormData> = {}
    if (!form.name.trim()) e.name = 'Requis'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
    if (!form.subject.trim()) e.subject = 'Requis'
    if (!form.message.trim()) e.message = 'Requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      await sendEmail(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-accent-secondary text-sm mb-3 tracking-widest uppercase text-center">
          Contact
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-4 text-center">
          Travaillons ensemble
        </h2>
        <p className="text-text-muted text-center mb-12">
          Un projet en tête ? Écrivez-moi, je réponds sous 24h.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            aria-hidden="true"
            tabIndex={-1}
            style={{ display: 'none' }}
            value={form.honeypot}
            onChange={(e) => setForm((f) => ({ ...f, honeypot: e.target.value }))}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Votre nom"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Sujet"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              className={inputClass}
            />
            {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div>
            <textarea
              placeholder="Votre message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className={`${inputClass} resize-none`}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={status === 'loading'}
            className="w-full"
          >
            {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
          </Button>

          {status === 'success' && (
            <p className="text-green-400 text-sm text-center">
              ✓ Message envoyé ! Je vous répondrai sous 24h.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">
              Une erreur est survenue. Réessayez ou écrivez directement par email.
            </p>
          )}
        </form>

        {/* Social links */}
        <div className="flex justify-center gap-6 mt-10">
          <a
            href="https://github.com/username"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-text-muted hover:text-accent-light transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/username"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-text-muted hover:text-accent-light transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/sections/Contact.test.tsx
```

Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Contact.tsx src/components/sections/Contact.test.tsx
git commit -m "feat: add Contact section with EmailJS form and validation"
```

---

## Task 15: App assembly

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`
- Create: `.env.example`

- [ ] **Step 1: Update `src/App.tsx`**

```tsx
import { Navbar } from './components/layout/Navbar'
import { CustomCursor } from './components/layout/CustomCursor'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { TechStack } from './components/sections/TechStack'
import { Projects } from './components/sections/Projects'
import { Services } from './components/sections/Services'
import { Contact } from './components/sections/Contact'

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Update `src/main.tsx`** — ensure `import './index.css'` is present.

- [ ] **Step 3: Create `.env.example`**

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

- [ ] **Step 4: Add `.env.local` to `.gitignore`** — verify `.gitignore` already ignores `.env*.local`.

- [ ] **Step 5: Run all tests**

```bash
npx vitest run
```

Expected: all tests PASS.

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: `dist/` created, no TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx src/main.tsx .env.example
git commit -m "feat: assemble app with all sections, add env example"
```

---

## Task 16: Deployment setup

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create `vercel.json`**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

- [ ] **Step 2: Initialize git main branch**

```bash
git branch -m master main
```

- [ ] **Step 3: Instructions to deploy on Vercel**

1. Push the repo to GitHub: `git remote add origin <your-repo-url> && git push -u origin main`
2. Go to vercel.com → Import project → select the repo
3. Add environment variables in Vercel dashboard:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Deploy

- [ ] **Step 4: Commit**

```bash
git add vercel.json
git commit -m "chore: add vercel deployment config"
```

---

## Task 17: Personalize content

> This task is for the human developer — it cannot be automated.

- [ ] Replace placeholder text in `src/data/projects.ts` with real projects (title, description, images, links)
- [ ] Update `src/data/services.ts` with your actual services and prices
- [ ] Update `src/data/stack.ts` with your actual tech stack
- [ ] Replace `"<Dev />"` in Navbar with your own logo or initials
- [ ] Update `About` section text and stats with real numbers
- [ ] Update `Hero` typing animation terms to match your actual specialties
- [ ] Update GitHub and LinkedIn URLs in `Contact.tsx`
- [ ] Replace the `👨‍💻` emoji avatar with a real photo
- [ ] Register on emailjs.com, create a service + template, fill in `.env.local`
