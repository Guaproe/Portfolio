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
