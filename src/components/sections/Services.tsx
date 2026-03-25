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
