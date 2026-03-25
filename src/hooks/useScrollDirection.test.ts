import { renderHook, act } from '@testing-library/react'
import { useScrollDirection } from './useScrollDirection'

describe('useScrollDirection', () => {
  // configurable: true is required so subsequent defineProperty calls don't throw
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
  })

  it('returns "up" initially', () => {
    const { result } = renderHook(() => useScrollDirection())
    expect(result.current).toBe('up')
  })

  it('returns "down" after scrolling down past 50px', () => {
    const { result } = renderHook(() => useScrollDirection())
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 60 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('down')
  })

  it('returns "up" when scrolling back up', () => {
    const { result } = renderHook(() => useScrollDirection())
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 60 })
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 30 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('up')
  })
})
