import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import * as React from 'react'
import { useModalContext, ModalContext } from '../modal.context'

describe('useModalContext', () => {
  it('should throw an error when used outside of Modal.Root', () => {
    const TestComponent = () => {
      useModalContext()
      return null
    }

    // Suppress console.error for expected error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow(
      'Modal components must be wrapped in <Modal.Root />',
    )

    spy.mockRestore()
  })

  it('should return context value when used within ModalContext.Provider', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let contextSize: any

    const TestComponent = () => {
      const { size } = useModalContext()
      contextSize = size
      return null
    }

    render(
      <ModalContext.Provider value={{ size: 'lg' }}>
        <TestComponent />
      </ModalContext.Provider>,
    )

    expect(contextSize).toBe('lg')
  })
})
