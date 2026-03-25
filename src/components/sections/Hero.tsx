import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { Button } from '../ui/Button'

// Singleton: engine init runs once per app lifetime
let engineInitPromise: Promise<void> | null = null

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const [particlesReady, setParticlesReady] = useState(false)

  useEffect(() => {
    if (!engineInitPromise) {
      engineInitPromise = initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      })
    }
    engineInitPromise.then(() => setParticlesReady(true))
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
