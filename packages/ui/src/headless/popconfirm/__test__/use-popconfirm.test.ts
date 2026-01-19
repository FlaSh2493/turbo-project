import { describe, it, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { usePopconfirm } from '../use-popconfirm'

describe('usePopconfirm', () => {
  describe('초기 상태', () => {
    it('기본 상태에서 open은 false이다', () => {
      const { result } = renderHook(() => usePopconfirm())
      expect(result.current.open).toBe(false)
    })

    it('defaultOpen으로 초기 값을 설정할 수 있다', () => {
      const { result } = renderHook(() => usePopconfirm({ defaultOpen: true }))
      expect(result.current.open).toBe(true)
    })

    it('기본 상태에서 isLoading은 false이다', () => {
      const { result } = renderHook(() => usePopconfirm())
      expect(result.current.isLoading).toBe(false)
    })

    it('인자 없이 호출해도 에러가 발생하지 않는다', () => {
      expect(() => renderHook(() => usePopconfirm())).not.toThrow()
    })
  })

  describe('Uncontrolled 모드', () => {
    it('setOpen으로 상태를 변경할 수 있다', () => {
      const { result } = renderHook(() => usePopconfirm())

      act(() => {
        result.current.setOpen(true)
      })

      expect(result.current.open).toBe(true)
    })

    it('setOpen(false)로 닫을 수 있다', () => {
      const { result } = renderHook(() => usePopconfirm({ defaultOpen: true }))

      act(() => {
        result.current.setOpen(false)
      })

      expect(result.current.open).toBe(false)
    })
  })

  describe('Controlled 모드', () => {
    it('open prop으로 상태를 제어할 수 있다', () => {
      const { result } = renderHook(() => usePopconfirm({ open: true }))
      expect(result.current.open).toBe(true)
    })

    it('open prop이 false이면 open은 false이다', () => {
      const { result } = renderHook(() => usePopconfirm({ open: false }))
      expect(result.current.open).toBe(false)
    })

    it('제어 모드에서 setOpen은 내부 상태를 변경하지 않는다', () => {
      const { result } = renderHook(() => usePopconfirm({ open: false }))

      act(() => {
        result.current.setOpen(true)
      })

      // 제어 모드에서는 open prop을 따름
      expect(result.current.open).toBe(false)
    })

    it('제어 모드에서 open prop 변경 시 상태가 업데이트된다', () => {
      const { result, rerender } = renderHook(({ open }) => usePopconfirm({ open }), {
        initialProps: { open: false },
      })

      expect(result.current.open).toBe(false)

      rerender({ open: true })

      expect(result.current.open).toBe(true)
    })
  })

  describe('onOpenChange 콜백', () => {
    it('setOpen 호출 시 onOpenChange가 호출된다', () => {
      const onOpenChange = vi.fn()
      const { result } = renderHook(() => usePopconfirm({ onOpenChange }))

      act(() => {
        result.current.setOpen(true)
      })

      expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('setOpen(false) 호출 시 onOpenChange(false)가 호출된다', () => {
      const onOpenChange = vi.fn()
      const { result } = renderHook(() => usePopconfirm({ defaultOpen: true, onOpenChange }))

      act(() => {
        result.current.setOpen(false)
      })

      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('제어 모드에서도 onOpenChange가 호출된다', () => {
      const onOpenChange = vi.fn()
      const { result } = renderHook(() => usePopconfirm({ open: false, onOpenChange }))

      act(() => {
        result.current.setOpen(true)
      })

      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('handleConfirm', () => {
    it('동기 onConfirm 호출 후 닫힌다', () => {
      const onConfirm = vi.fn()
      const { result } = renderHook(() => usePopconfirm({ defaultOpen: true, onConfirm }))

      act(() => {
        result.current.handleConfirm()
      })

      expect(onConfirm).toHaveBeenCalled()
      expect(result.current.open).toBe(false)
    })

    it('onConfirm이 없어도 에러 없이 닫힌다', () => {
      const { result } = renderHook(() => usePopconfirm({ defaultOpen: true }))

      act(() => {
        result.current.handleConfirm()
      })

      expect(result.current.open).toBe(false)
    })

    it('비동기 onConfirm 호출 시 isLoading이 true가 된다', async () => {
      let resolvePromise: () => void
      const onConfirm = vi.fn(
        () =>
          new Promise<void>(resolve => {
            resolvePromise = resolve
          }),
      )
      const { result } = renderHook(() => usePopconfirm({ defaultOpen: true, onConfirm }))

      act(() => {
        result.current.handleConfirm()
      })

      expect(result.current.isLoading).toBe(true)

      await act(async () => {
        resolvePromise!()
      })

      expect(result.current.isLoading).toBe(false)
    })

    it('비동기 onConfirm 완료 후 닫힌다', async () => {
      const onConfirm = vi.fn(() => Promise.resolve())
      const { result } = renderHook(() => usePopconfirm({ defaultOpen: true, onConfirm }))

      await act(async () => {
        result.current.handleConfirm()
      })

      await waitFor(() => {
        expect(result.current.open).toBe(false)
        expect(result.current.isLoading).toBe(false)
      })
    })

    it('비동기 onConfirm 에러 시 isLoading은 false가 되고 열린 상태 유지', async () => {
      const onConfirm = vi.fn(() => Promise.reject(new Error('test error')))
      const { result } = renderHook(() => usePopconfirm({ defaultOpen: true, onConfirm }))

      await act(async () => {
        result.current.handleConfirm()
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
        expect(result.current.open).toBe(true)
      })
    })

    it('동기 onConfirm은 isLoading을 변경하지 않는다', () => {
      const onConfirm = vi.fn()
      const { result } = renderHook(() => usePopconfirm({ defaultOpen: true, onConfirm }))

      act(() => {
        result.current.handleConfirm()
      })

      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('handleCancel', () => {
    it('onCancel 호출 후 닫힌다', () => {
      const onCancel = vi.fn()
      const { result } = renderHook(() => usePopconfirm({ defaultOpen: true, onCancel }))

      act(() => {
        result.current.handleCancel()
      })

      expect(onCancel).toHaveBeenCalled()
      expect(result.current.open).toBe(false)
    })

    it('onCancel이 없어도 에러 없이 닫힌다', () => {
      const { result } = renderHook(() => usePopconfirm({ defaultOpen: true }))

      act(() => {
        result.current.handleCancel()
      })

      expect(result.current.open).toBe(false)
    })
  })

  describe('반환값', () => {
    it('open을 반환한다', () => {
      const { result } = renderHook(() => usePopconfirm())
      expect(typeof result.current.open).toBe('boolean')
    })

    it('setOpen 함수를 반환한다', () => {
      const { result } = renderHook(() => usePopconfirm())
      expect(typeof result.current.setOpen).toBe('function')
    })

    it('isLoading을 반환한다', () => {
      const { result } = renderHook(() => usePopconfirm())
      expect(typeof result.current.isLoading).toBe('boolean')
    })

    it('handleConfirm 함수를 반환한다', () => {
      const { result } = renderHook(() => usePopconfirm())
      expect(typeof result.current.handleConfirm).toBe('function')
    })

    it('handleCancel 함수를 반환한다', () => {
      const { result } = renderHook(() => usePopconfirm())
      expect(typeof result.current.handleCancel).toBe('function')
    })
  })

  describe('콜백 안정성', () => {
    it('setOpen은 안정적인 참조를 유지한다', () => {
      const { result, rerender } = renderHook(() => usePopconfirm())
      const firstSetOpen = result.current.setOpen

      rerender()

      expect(result.current.setOpen).toBe(firstSetOpen)
    })

    it('handleConfirm은 onConfirm 변경 시 업데이트된다', () => {
      const onConfirm1 = vi.fn()
      const onConfirm2 = vi.fn()

      const { result, rerender } = renderHook(({ onConfirm }) => usePopconfirm({ onConfirm }), {
        initialProps: { onConfirm: onConfirm1 },
      })

      const firstHandleConfirm = result.current.handleConfirm

      rerender({ onConfirm: onConfirm2 })

      expect(result.current.handleConfirm).not.toBe(firstHandleConfirm)
    })

    it('handleCancel은 onCancel 변경 시 업데이트된다', () => {
      const onCancel1 = vi.fn()
      const onCancel2 = vi.fn()

      const { result, rerender } = renderHook(({ onCancel }) => usePopconfirm({ onCancel }), {
        initialProps: { onCancel: onCancel1 },
      })

      const firstHandleCancel = result.current.handleCancel

      rerender({ onCancel: onCancel2 })

      expect(result.current.handleCancel).not.toBe(firstHandleCancel)
    })
  })
})
