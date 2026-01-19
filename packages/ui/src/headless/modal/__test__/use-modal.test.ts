import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useModal } from '../use-modal'

describe('useModal', () => {
  describe('Uncontrolled mode', () => {
    it('should start with defaultOpen=false by default', () => {
      const { result } = renderHook(() => useModal())

      expect(result.current.open).toBe(false)
    })

    it('should start with defaultOpen=true when provided', () => {
      const { result } = renderHook(() => useModal({ defaultOpen: true }))

      expect(result.current.open).toBe(true)
    })

    it('should update open state when setOpen is called', () => {
      const { result } = renderHook(() => useModal())

      expect(result.current.open).toBe(false)

      act(() => {
        result.current.setOpen(true)
      })

      expect(result.current.open).toBe(true)

      act(() => {
        result.current.setOpen(false)
      })

      expect(result.current.open).toBe(false)
    })

    it('should call onOpenChange when setOpen is called', () => {
      const onOpenChange = vi.fn()
      const { result } = renderHook(() => useModal({ onOpenChange }))

      act(() => {
        result.current.setOpen(true)
      })

      expect(onOpenChange).toHaveBeenCalledWith(true)

      act(() => {
        result.current.setOpen(false)
      })

      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('Controlled mode', () => {
    it('should use controlled open value', () => {
      const { result } = renderHook(() => useModal({ open: true }))

      expect(result.current.open).toBe(true)
    })

    it('should not update internal state in controlled mode', () => {
      const { result, rerender } = renderHook(({ open }: { open: boolean }) => useModal({ open }), {
        initialProps: { open: false },
      })

      expect(result.current.open).toBe(false)

      // Try to set open internally (should not work in controlled mode)
      act(() => {
        result.current.setOpen(true)
      })

      // Should still be false because it's controlled
      expect(result.current.open).toBe(false)

      // Update controlled value
      rerender({ open: true })

      expect(result.current.open).toBe(true)
    })

    it('should call onOpenChange in controlled mode', () => {
      const onOpenChange = vi.fn()
      const { result } = renderHook(() => useModal({ open: false, onOpenChange }))

      act(() => {
        result.current.setOpen(true)
      })

      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('setOpen callback stability', () => {
    it('should maintain stable setOpen reference', () => {
      const { result, rerender } = renderHook(() => useModal())

      const firstSetOpen = result.current.setOpen

      rerender()

      expect(result.current.setOpen).toBe(firstSetOpen)
    })

    it('should update setOpen when onOpenChange changes', () => {
      const onOpenChange1 = vi.fn()
      const onOpenChange2 = vi.fn()

      const { result, rerender } = renderHook(({ onOpenChange }) => useModal({ onOpenChange }), {
        initialProps: { onOpenChange: onOpenChange1 },
      })

      const firstSetOpen = result.current.setOpen

      rerender({ onOpenChange: onOpenChange2 })

      expect(result.current.setOpen).not.toBe(firstSetOpen)
    })
  })
})
