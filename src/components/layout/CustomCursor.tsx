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
