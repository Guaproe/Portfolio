import { motion, AnimatePresence } from 'framer-motion'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import logoUrl from '../../assets/logo-entreprise.png'

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
          <a href="#" className="flex items-center">
            <img
              src={logoUrl}
              alt="Logo"
              className="h-9 w-auto object-contain"
            />
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
