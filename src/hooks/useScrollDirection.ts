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
