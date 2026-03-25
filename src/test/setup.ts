import '@testing-library/jest-dom'

class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
