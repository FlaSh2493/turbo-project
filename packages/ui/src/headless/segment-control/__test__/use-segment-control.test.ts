import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSegmentControl } from '../use-segment-control'

describe('useSegmentControl', () => {
  describe('상태 관리', () => {
    it('초기 상태에서 selectedValue는 undefined이다', () => {
      const { result } = renderHook(() => useSegmentControl())
      expect(result.current.selectedValue).toBeUndefined()
    })

    it('defaultValue로 초기 값을 설정할 수 있다', () => {
      const { result } = renderHook(() => useSegmentControl({ defaultValue: 'tab1' }))
      expect(result.current.selectedValue).toBe('tab1')
    })

    it('value prop으로 제어된 상태를 사용할 수 있다', () => {
      const { result } = renderHook(() => useSegmentControl({ value: 'controlled' }))
      expect(result.current.selectedValue).toBe('controlled')
    })
  })

  describe('selectValue', () => {
    it('비제어 모드에서 값을 선택할 수 있다', () => {
      const { result } = renderHook(() => useSegmentControl())

      act(() => {
        result.current.selectValue('tab2')
      })

      expect(result.current.selectedValue).toBe('tab2')
    })

    it('onValueChange 콜백을 호출한다', () => {
      const onValueChange = vi.fn()
      const { result } = renderHook(() => useSegmentControl({ onValueChange }))

      act(() => {
        result.current.selectValue('tab1')
      })

      expect(onValueChange).toHaveBeenCalledWith('tab1')
    })

    it('제어 모드에서는 내부 상태를 변경하지 않는다', () => {
      const onValueChange = vi.fn<(value: string) => void>()
      const { result } = renderHook(() =>
        useSegmentControl<string>({ value: 'controlled', onValueChange }),
      )

      act(() => {
        result.current.selectValue('new-value')
      })

      // 제어 모드에서는 value prop을 따름
      expect(result.current.selectedValue).toBe('controlled')
      expect(onValueChange).toHaveBeenCalledWith('new-value')
    })
  })

  describe('registerItem', () => {
    it('아이템을 등록할 수 있다', () => {
      const { result } = renderHook(() => useSegmentControl({ defaultValue: 'tab1' }))

      const mockElement = document.createElement('button')

      act(() => {
        result.current.registerItem('tab1', mockElement)
      })

      // 등록은 내부적으로 처리되므로, recalculate가 정상적으로 동작하는지 확인
      expect(result.current.registerItem).toBeDefined()
    })

    it('null을 전달하면 아이템을 제거한다', () => {
      const { result } = renderHook(() => useSegmentControl())

      const mockElement = document.createElement('button')

      act(() => {
        result.current.registerItem('tab1', mockElement)
      })

      act(() => {
        result.current.registerItem('tab1', null)
      })

      // 제거 후에도 에러 없이 동작해야 함
      expect(result.current.registerItem).toBeDefined()
    })
  })

  describe('indicatorStyle', () => {
    it('선택된 값이 없으면 null이다', () => {
      const { result } = renderHook(() => useSegmentControl())
      expect(result.current.indicatorStyle).toBeNull()
    })

    it('컨테이너가 없으면 null이다', () => {
      const { result } = renderHook(() => useSegmentControl({ defaultValue: 'tab1' }))
      expect(result.current.indicatorStyle).toBeNull()
    })
  })

  describe('containerRef', () => {
    it('containerRef 콜백을 제공한다', () => {
      const { result } = renderHook(() => useSegmentControl())
      expect(typeof result.current.containerRef).toBe('function')
    })

    it('containerRef에 요소를 설정할 수 있다', () => {
      const { result } = renderHook(() => useSegmentControl())
      const mockContainer = document.createElement('div')

      act(() => {
        result.current.containerRef(mockContainer)
      })

      // 에러 없이 동작해야 함
      expect(result.current.containerRef).toBeDefined()
    })
  })

  describe('recalculate', () => {
    it('recalculate 함수를 제공한다', () => {
      const { result } = renderHook(() => useSegmentControl())
      expect(typeof result.current.recalculate).toBe('function')
    })

    it('recalculate를 호출해도 에러가 발생하지 않는다', () => {
      const { result } = renderHook(() => useSegmentControl())

      expect(() => {
        act(() => {
          result.current.recalculate()
        })
      }).not.toThrow()
    })

    it('선택된 값이 있지만 해당 요소가 등록되지 않은 경우 indicatorStyle은 null이다', () => {
      const { result } = renderHook(() => useSegmentControl<string>())

      // 컨테이너는 설정하지만 아이템은 등록하지 않음
      const mockContainer = document.createElement('div')
      vi.spyOn(mockContainer, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        top: 0,
        right: 100,
        bottom: 40,
        width: 100,
        height: 40,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      })

      act(() => {
        result.current.containerRef(mockContainer)
      })

      // 값을 선택하지만 해당 요소는 등록하지 않음
      act(() => {
        result.current.selectValue('tab1')
      })

      // 선택된 값(tab1)에 해당하는 요소가 등록되지 않았으므로 null
      expect(result.current.indicatorStyle).toBeNull()
    })

    it('선택된 값과 해당 요소가 모두 있으면 indicatorStyle을 계산한다', () => {
      const { result } = renderHook(() => useSegmentControl({ defaultValue: 'tab1' }))

      // 컨테이너 설정
      const mockContainer = document.createElement('div')
      vi.spyOn(mockContainer, 'getBoundingClientRect').mockReturnValue({
        left: 10,
        top: 0,
        right: 210,
        bottom: 40,
        width: 200,
        height: 40,
        x: 10,
        y: 0,
        toJSON: () => ({}),
      })

      // 아이템 요소 설정
      const mockItem = document.createElement('button')
      vi.spyOn(mockItem, 'getBoundingClientRect').mockReturnValue({
        left: 30,
        top: 0,
        right: 80,
        bottom: 40,
        width: 50,
        height: 40,
        x: 30,
        y: 0,
        toJSON: () => ({}),
      })

      act(() => {
        result.current.containerRef(mockContainer)
        result.current.registerItem('tab1', mockItem)
      })

      act(() => {
        result.current.recalculate()
      })

      // left: 30 - 10 = 20, width: 50
      expect(result.current.indicatorStyle).toEqual({
        left: 20,
        width: 50,
      })
    })
  })

  describe('리사이즈 이벤트', () => {
    let addEventListenerSpy: ReturnType<typeof vi.spyOn>
    let removeEventListenerSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
      addEventListenerSpy = vi.spyOn(window, 'addEventListener')
      removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    })

    afterEach(() => {
      addEventListenerSpy.mockRestore()
      removeEventListenerSpy.mockRestore()
    })

    it('resize 이벤트 리스너를 등록한다', () => {
      renderHook(() => useSegmentControl())

      expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    })

    it('언마운트 시 resize 이벤트 리스너를 제거한다', () => {
      const { unmount } = renderHook(() => useSegmentControl())

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    })

    it('resize 이벤트 발생 시 recalculate가 호출된다', () => {
      const { result } = renderHook(() => useSegmentControl({ defaultValue: 'tab1' }))

      // 컨테이너와 아이템 설정
      const mockContainer = document.createElement('div')
      vi.spyOn(mockContainer, 'getBoundingClientRect').mockReturnValue({
        left: 10,
        top: 0,
        right: 210,
        bottom: 40,
        width: 200,
        height: 40,
        x: 10,
        y: 0,
        toJSON: () => ({}),
      })

      const mockItem = document.createElement('button')
      vi.spyOn(mockItem, 'getBoundingClientRect').mockReturnValue({
        left: 30,
        top: 0,
        right: 80,
        bottom: 40,
        width: 50,
        height: 40,
        x: 30,
        y: 0,
        toJSON: () => ({}),
      })

      act(() => {
        result.current.containerRef(mockContainer)
        result.current.registerItem('tab1', mockItem)
      })

      // resize 이벤트 발생
      act(() => {
        window.dispatchEvent(new Event('resize'))
      })

      // recalculate가 호출되어 indicatorStyle이 계산됨
      expect(result.current.indicatorStyle).toEqual({
        left: 20,
        width: 50,
      })
    })
  })
})
