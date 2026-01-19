import { useState, useCallback, useRef, useLayoutEffect } from 'react'

interface UseSegmentControlOptions<T extends string> {
  /** 초기 선택 값 (uncontrolled) */
  defaultValue?: T
  /** 현재 선택 값 (controlled) */
  value?: T
  /** 값 변경 콜백 */
  onValueChange?: (value: T) => void
}

interface ItemRect {
  left: number
  width: number
}

interface UseSegmentControlReturn<T extends string> {
  /** 현재 선택된 값 */
  selectedValue: T | undefined
  /** 값 선택 핸들러 */
  selectValue: (value: T) => void
  /** 아이템 ref 등록 함수 */
  registerItem: (value: T, element: HTMLElement | null) => void
  /** 인디케이터 위치 및 크기 */
  indicatorStyle: ItemRect | null
  /** 컨테이너 ref 콜백 */
  containerRef: (element: HTMLDivElement | null) => void
  /** 위치 재계산 함수 */
  recalculate: () => void
}

export function useSegmentControl<T extends string>({
  defaultValue,
  value,
  onValueChange,
}: UseSegmentControlOptions<T> = {}): UseSegmentControlReturn<T> {
  // controlled vs uncontrolled 상태
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue)
  const selectedValue = isControlled ? value : internalValue

  // 값 선택 핸들러
  const selectValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange],
  )

  // 아이템 요소 참조 맵
  const itemsRef = useRef<Map<T, HTMLElement>>(new Map())
  const containerElementRef = useRef<HTMLDivElement | null>(null)

  // 컨테이너 ref 콜백
  const containerRef = useCallback((element: HTMLDivElement | null) => {
    containerElementRef.current = element
  }, [])

  // 인디케이터 스타일 상태
  const [indicatorStyle, setIndicatorStyle] = useState<ItemRect | null>(null)

  // 아이템 등록 함수
  const registerItem = useCallback((itemValue: T, element: HTMLElement | null) => {
    if (element) {
      itemsRef.current.set(itemValue, element)
    } else {
      itemsRef.current.delete(itemValue)
    }
  }, [])

  // 인디케이터 위치 계산
  const recalculate = useCallback(() => {
    if (!selectedValue || !containerElementRef.current) {
      setIndicatorStyle(null)
      return
    }

    const selectedElement = itemsRef.current.get(selectedValue)
    if (!selectedElement) {
      setIndicatorStyle(null)
      return
    }

    const containerRect = containerElementRef.current.getBoundingClientRect()
    const itemRect = selectedElement.getBoundingClientRect()

    setIndicatorStyle({
      left: itemRect.left - containerRect.left,
      width: itemRect.width,
    })
  }, [selectedValue])

  // 선택된 값이 변경될 때 위치 재계산
  useLayoutEffect(() => {
    recalculate()
  }, [recalculate])

  // 리사이즈 시 위치 재계산
  useLayoutEffect(() => {
    const handleResize = () => recalculate()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [recalculate])

  return {
    selectedValue,
    selectValue,
    registerItem,
    indicatorStyle,
    containerRef,
    recalculate,
  }
}
