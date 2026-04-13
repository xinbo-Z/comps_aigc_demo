import '@testing-library/jest-dom'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
})

class ResizeObserverMock {
  observe() {
    return undefined
  }

  unobserve() {
    return undefined
  }

  disconnect() {
    return undefined
  }
}

globalThis.ResizeObserver = ResizeObserverMock

const originalGetComputedStyle = window.getComputedStyle.bind(window)

window.getComputedStyle = ((element: Element, pseudoElt?: string) => {
  if (pseudoElt) {
    return originalGetComputedStyle(element)
  }

  return originalGetComputedStyle(element)
}) as typeof window.getComputedStyle
