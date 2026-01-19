import { expect, vi } from 'vitest'

export const expectToThrowSilent = (renderFn: () => void, message: string) => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  const errorHandler = (e: ErrorEvent) => e.preventDefault()
  window.addEventListener('error', errorHandler)

  try {
    expect(renderFn).toThrow(message)
  } finally {
    errorSpy.mockRestore()
    window.removeEventListener('error', errorHandler)
  }
}
