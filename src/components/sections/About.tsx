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
