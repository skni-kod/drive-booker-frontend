import '@testing-library/jest-dom';
import { vitest } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vitest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vitest.fn(),
    removeListener: vitest.fn(),
    addEventListener: vitest.fn(),
    dispatchEvent: vitest.fn(),
  })),
});

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: vitest.fn().mockReturnValue({
    observe: vitest.fn(),
    unobserve: vitest.fn(),
    disconnect: vitest.fn(),
  }),
});
