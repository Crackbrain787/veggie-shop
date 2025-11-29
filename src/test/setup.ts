import '@testing-library/jest-dom'

// Простой mock для matchMedia без vi/jest
const mockMatchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {}, 
  removeListener: () => {}, 
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true,
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia
})