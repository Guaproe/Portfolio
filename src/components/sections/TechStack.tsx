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
