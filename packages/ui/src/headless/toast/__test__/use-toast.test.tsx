import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast } from '../use-toast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => <>{children}</>

  it('초기 상태는 비어있다', () => {
    const { result } = renderHook(() => useToast(), { wrapper })
    expect(result.current.toasts).toEqual([])
  })

  it('토스트를 추가할 수 있다', () => {
    const { result } = renderHook(() => useToast(), { wrapper })

    act(() => {
      result.current.addToasts({ message: '테스트' })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].message).toBe('테스트')
  })
})
