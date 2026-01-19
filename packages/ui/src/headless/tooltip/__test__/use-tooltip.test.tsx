import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as React from 'react'
import {
  useTooltipState,
  useTooltipContext,
  TooltipContext,
  TooltipContextValue,
} from '../use-tooltip'

describe('useTooltipContext', () => {
  it('TooltipProvider 없이 사용하면 에러를 던진다', () => {
    expect(() => {
      renderHook(() => useTooltipContext())
    }).toThrow('Tooltip components must be used within TooltipProvider')
  })

  it('TooltipProvider 내에서 사용하면 context를 반환한다', () => {
    const mockContextValue: TooltipContextValue = {
      mode: 'hover',
      open: false,
      setOpen: vi.fn(),
    }

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TooltipContext.Provider value={mockContextValue}>{children}</TooltipContext.Provider>
    )

    const { result } = renderHook(() => useTooltipContext(), { wrapper })
    expect(result.current).toBe(mockContextValue)
  })
})

describe('useTooltipState', () => {
  describe('기본 동작 (Uncontrolled)', () => {
    it('초기 상태는 닫혀있다', () => {
      const { result } = renderHook(() => useTooltipState({}))
      expect(result.current.open).toBe(false)
    })

    it('defaultOpen 설정 시 초기 상태가 열려있다', () => {
      const { result } = renderHook(() => useTooltipState({ defaultOpen: true }))
      expect(result.current.open).toBe(true)
    })

    it('setOpen을 통해 상태를 변경할 수 있다', () => {
      const { result } = renderHook(() => useTooltipState({}))

      act(() => {
        result.current.setOpen(true)
      })
      expect(result.current.open).toBe(true)

      act(() => {
        result.current.setOpen(false)
      })
      expect(result.current.open).toBe(false)
    })

    it('onOpenChange 콜백이 호출된다', () => {
      const onOpenChange = vi.fn()
      const { result } = renderHook(() => useTooltipState({ onOpenChange }))

      act(() => {
        result.current.setOpen(true)
      })
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('제어 컴포넌트 (Controlled)', () => {
    it('props.open이 상태를 결정한다', () => {
      const { result, rerender } = renderHook(({ open }) => useTooltipState({ open }), {
        initialProps: { open: true },
      })
      expect(result.current.open).toBe(true)

      rerender({ open: false })
      expect(result.current.open).toBe(false)
    })

    it('setOpen 호출 시 내부 상태는 변하지 않고 onOpenChange가 호출된다', () => {
      const onOpenChange = vi.fn()
      const { result } = renderHook(() => useTooltipState({ open: false, onOpenChange }))

      act(() => {
        result.current.setOpen(true)
      })

      // Controlled 모드에서는 open 값이 props에 의존하므로 변하지 않음
      expect(result.current.open).toBe(false)
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Hover 모드', () => {
    it('radixOpen은 undefined여야 한다 (Radix 내부 상태 사용)', () => {
      const { result } = renderHook(() => useTooltipState({ mode: 'hover' }))
      expect(result.current.radixOpen).toBeUndefined()
    })

    it('radixOnOpenChange는 onOpenChange를 호출해야 한다', () => {
      const onOpenChange = vi.fn()
      const { result } = renderHook(() => useTooltipState({ mode: 'hover', onOpenChange }))

      act(() => {
        result.current.radixOnOpenChange(true)
      })

      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Click 모드', () => {
    it('radixOpen은 open 상태와 동기화되어야 한다', () => {
      const { result } = renderHook(() => useTooltipState({ mode: 'click', defaultOpen: true }))
      expect(result.current.radixOpen).toBe(true)
    })

    it('radixOpen이 false일 때(외부 클릭 등) 상태를 변경하지 않는다', () => {
      // Click 모드에서는 툴팁 닫기를 수동으로 제어하므로 (Close 버튼 등)
      // Radix의 onOpenChange(false)는 무시해야 함 (예: Trigger 클릭 시 토글 로직과 충돌 방지 등)
      // 하지만 구현을 보면 radixOnOpenChange에서 false일 때 아무것도 안함.
      const onOpenChange = vi.fn()
      const { result } = renderHook(() =>
        useTooltipState({ mode: 'click', open: true, onOpenChange }),
      )

      act(() => {
        result.current.radixOnOpenChange(false)
      })

      expect(onOpenChange).not.toHaveBeenCalled()
    })

    it('radixOpen이 true일 때 setOpen(true)를 호출한다', () => {
      const { result } = renderHook(() => useTooltipState({ mode: 'click' }))

      act(() => {
        result.current.radixOnOpenChange(true)
      })

      expect(result.current.open).toBe(true)
    })
  })
})
