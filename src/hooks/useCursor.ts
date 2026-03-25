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
