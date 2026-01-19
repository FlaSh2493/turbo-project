import { act } from 'react-dom/test-utils'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { toast, defaultStore } from '../../../headless/toast'

describe('Toast Order & Dismissal Stagger (FIFO)', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    toast.removeAll()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('토스트는 추가된 순서대로 아래로 쌓인다 (Oldest at Top, Newest at Bottom)', () => {
    act(() => {
      toast.add({ message: 'First' })
      toast.add({ message: 'Second' })
    })

    const snapshots = defaultStore.getSnapshot()
    expect(snapshots[0].message).toBe('First') // Top (index 0)
    expect(snapshots[1].message).toBe('Second') // Bottom (index 1)
  })

  it('시간이 지나면 먼저 추가된 토스트부터 사라진다 (Staggered FIFO)', () => {
    act(() => {
      toast.add({ message: 'First', duration: 1000 })
      // 100ms 뒤 추가 (First의 삭제 시점을 1100ms로 연장)
      vi.advanceTimersByTime(100)
      toast.add({ message: 'Second', duration: 1000 })
    })

    // 보호 기간 (1100ms) 경과
    act(() => {
      vi.advanceTimersByTime(1001)
    })

    // First (가장 오래된 것)가 먼저 사라짐 (0ms stagger)
    expect(defaultStore.getSnapshot().find(t => t.message === 'First')?.open).toBe(false)
    // Second는 200ms stagger 적용되어 아직 open
    expect(defaultStore.getSnapshot().find(t => t.message === 'Second')?.open).toBe(true)

    // 200ms 경과
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(defaultStore.getSnapshot().find(t => t.message === 'Second')?.open).toBe(false)
  })

  it('dismissAll은 가장 오래된 토스트부터 200ms 간격으로 순차적으로 닫는다 (FIFO)', () => {
    act(() => {
      toast.add({ message: 'First' })
      toast.add({ message: 'Second' })
      toast.add({ message: 'Third' })
    })

    act(() => {
      toast.dismissAll()
    })

    // First (Oldest)는 즉시 closed
    expect(defaultStore.getSnapshot().find(t => t.message === 'First')?.open).toBe(false)
    // Second, Third는 아직 open
    expect(defaultStore.getSnapshot().find(t => t.message === 'Second')?.open).toBe(true)
    expect(defaultStore.getSnapshot().find(t => t.message === 'Third')?.open).toBe(true)

    // 100ms 경과
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(defaultStore.getSnapshot().find(t => t.message === 'Second')?.open).toBe(false)
    expect(defaultStore.getSnapshot().find(t => t.message === 'Third')?.open).toBe(true)

    // 다시 100ms 경과 (총 200ms)
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(defaultStore.getSnapshot().find(t => t.message === 'Third')?.open).toBe(false)
  })
})
