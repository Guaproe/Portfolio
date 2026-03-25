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
