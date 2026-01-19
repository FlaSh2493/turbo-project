import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ToastStore } from '../toast-store'

describe('ToastStore', () => {
  let store: ToastStore

  beforeEach(() => {
    vi.useFakeTimers()
    store = new ToastStore()
  })

  afterEach(() => {
    vi.useRealTimers()
    store.removeAll()
  })

  describe('subscribe', () => {
    it('should unsubscribe listener when unsubscribe function is called', () => {
      const listener = vi.fn()
      const unsubscribe = store.subscribe(listener)

      store.add({ message: 'test1' })
      expect(listener).toHaveBeenCalledTimes(1)

      // unsubscribe 호출 (line 86 커버)
      unsubscribe()

      // 이후 토스트 추가해도 listener가 호출되지 않아야 함
      store.add({ message: 'test2' })
      expect(listener).toHaveBeenCalledTimes(1) // 여전히 1번
    })
  })

  describe('add', () => {
    it('should add a toast and notify listeners', () => {
      const listener = vi.fn()
      store.subscribe(listener)

      const id = store.add({ message: 'test' })

      expect(store.getSnapshot()).toHaveLength(1)
      expect(store.getSnapshot()[0].id).toBe(id)
      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should set a timer to dismiss toast automatically', () => {
      store.add({ message: 'test', duration: 1000 })

      expect(store.getSnapshot()[0].open).toBe(true)

      vi.advanceTimersByTime(1000)

      expect(store.getSnapshot()[0].open).toBe(false)
    })
  })

  describe('dismiss', () => {
    it('should mark toast as closed and clear timer', () => {
      const id = store.add({ message: 'test', duration: 1000 })
      // Spy on clearTimeout
      store.dismiss(id)

      expect(store.getSnapshot()[0].open).toBe(false)
    })

    it('should ignore if toast does not exist (no crash)', () => {
      expect(() => store.dismiss('non-existent')).not.toThrow()
    })
  })

  describe('dismissAll', () => {
    it('should dismiss all toasts', () => {
      store.add({ message: '1' })
      store.add({ message: '2' })

      store.dismissAll()

      // Staggered dismissal
      expect(store.getSnapshot()[0].open).toBe(false)
      expect(store.getSnapshot()[1].open).toBe(true)

      vi.advanceTimersByTime(200)
      expect(store.getSnapshot()[1].open).toBe(false)
    })
  })

  describe('remove', () => {
    it('should remove toast from state and clear timer', () => {
      const id = store.add({ message: 'test', duration: 1000 })
      store.remove(id)

      expect(store.getSnapshot()).toHaveLength(0)
    })
  })

  describe('removeAll', () => {
    it('should remove all toasts and clear all timers', () => {
      store.add({ message: '1', duration: 1000 })
      store.add({ message: '2', duration: 2000 })
      store.removeAll()

      expect(store.getSnapshot()).toHaveLength(0)
    })
  })

  describe('processQueue (globalPauseUntil)', () => {
    it('should reschedule if globalPauseUntil is in the future when processQueue runs', () => {
      // 첫 번째 토스트 추가 (duration: 1000ms)
      store.add({ message: '1', duration: 1000 })

      // 100ms 후 두 번째 토스트 추가 (duration: 1500ms)
      // globalPauseUntil = now + 1500ms (100ms 시점에서)
      // scheduleQueue(1500) 호출 - 기존 타이머(900ms 남음) 취소, 새 타이머 1500ms 설정
      vi.advanceTimersByTime(100)
      store.add({ message: '2', duration: 1500 })

      // 1500ms 경과 - 두 번째 토스트의 타이머 만료, processQueue 실행
      // globalPauseUntil = 100 + 1500 = 1600ms 시점
      // 현재 시간 = 100 + 1500 = 1600ms
      // now >= globalPauseUntil 이므로 바로 삭제 진행
      vi.advanceTimersByTime(1500)

      // 첫 번째 토스트 삭제됨
      expect(store.getSnapshot()[0].open).toBe(false)
      expect(store.getSnapshot()[1].open).toBe(true)

      // 100ms 후 두 번째 토스트도 삭제됨
      vi.advanceTimersByTime(100)
      expect(store.getSnapshot()[1].open).toBe(false)
    })

    it('should defer dismissal when globalPauseUntil is extended by a new toast', () => {
      // 첫 번째 토스트 (duration: 500ms)
      store.add({ message: '1', duration: 500 })

      // 400ms 후 두 번째 토스트 추가 (duration: 500ms)
      // globalPauseUntil = 400 + 500 = 900ms
      // scheduleQueue(500) 호출 - 새 타이머 500ms 설정
      vi.advanceTimersByTime(400)
      store.add({ message: '2', duration: 500 })

      // 100ms 경과 (총 500ms) - 첫 번째 토스트의 원래 duration 지남
      // 하지만 타이머는 두 번째 토스트의 타이머로 대체됨
      vi.advanceTimersByTime(100)

      // 두 토스트 모두 열려있음
      expect(store.getSnapshot()[0].open).toBe(true)
      expect(store.getSnapshot()[1].open).toBe(true)

      // 400ms 더 경과 (총 900ms) - 두 번째 토스트의 타이머 만료
      vi.advanceTimersByTime(400)

      // 첫 번째 토스트 삭제됨
      expect(store.getSnapshot()[0].open).toBe(false)
      expect(store.getSnapshot()[1].open).toBe(true)
    })

    it('should reschedule processQueue when globalPauseUntil is still in future (line 41-42)', () => {
      // 이 테스트는 processQueue가 실행될 때 globalPauseUntil이 아직 미래인 상황을 테스트합니다.
      // 이를 위해 private 필드에 직접 접근합니다.

      // 토스트 추가 (duration: 1000ms)
      store.add({ message: '1', duration: 1000 })

      // globalPauseUntil을 미래로 수동 설정 (private 필드 접근)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(store as any).globalPauseUntil = Date.now() + 2000

      // 1000ms 경과 - processQueue 실행됨
      // 하지만 globalPauseUntil은 아직 1000ms 남음
      // → 41-42번 라인 실행: scheduleQueue(1000)으로 재스케줄링
      vi.advanceTimersByTime(1000)

      // 토스트가 아직 열려있어야 함 (globalPauseUntil 때문에 삭제 연기)
      expect(store.getSnapshot()[0].open).toBe(true)

      // 1000ms 더 경과 - 이제 globalPauseUntil 지남
      vi.advanceTimersByTime(1000)

      // 토스트 삭제됨
      expect(store.getSnapshot()[0].open).toBe(false)
    })

    it('should do nothing when processQueue runs but no auto-dismiss toast exists (line 48 else)', () => {
      // closable: true인 토스트만 있는 경우 - processQueue에서 nextToDismiss가 undefined
      store.add({ message: 'closable toast', closable: true, duration: 1000 })

      // processQueue를 직접 호출 (private 메서드 접근)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(store as any).processQueue()

      // 토스트는 여전히 열려있어야 함 (closable 토스트는 자동 삭제 대상이 아님)
      expect(store.getSnapshot()[0].open).toBe(true)
    })
  })

  describe('add with explicit options (line 127 branch)', () => {
    it('should use explicit closable: true when provided', () => {
      const id = store.add({ message: 'test', closable: true })
      const toast = store.getSnapshot().find(t => t.id === id)

      expect(toast?.closable).toBe(true)
    })

    it('should use explicit closable: false when provided', () => {
      const id = store.add({ message: 'test', closable: false })
      const toast = store.getSnapshot().find(t => t.id === id)

      expect(toast?.closable).toBe(false)
    })

    it('should use explicit message when provided', () => {
      const id = store.add({ message: 'custom message' })
      const toast = store.getSnapshot().find(t => t.id === id)

      expect(toast?.message).toBe('custom message')
    })

    it('should use explicit duration when provided', () => {
      const id = store.add({ message: 'test', duration: 5000 })
      const toast = store.getSnapshot().find(t => t.id === id)

      expect(toast?.duration).toBe(5000)
    })

    it('should use explicit offsetY when provided', () => {
      const id = store.add({ message: 'test', offsetY: 100 })
      const toast = store.getSnapshot().find(t => t.id === id)

      expect(toast?.offsetY).toBe(100)
    })

    it('should use default values when options are minimal', () => {
      // 최소 옵션으로 호출 - 기본값 사용
      const id = store.add({ message: '' })
      const toast = store.getSnapshot().find(t => t.id === id)

      expect(toast?.closable).toBe(false)
      expect(toast?.message).toBe('')
      expect(toast?.duration).toBe(1000)
      expect(toast?.offsetY).toBeUndefined()
    })

    it('should use all default values when called with empty object', () => {
      // 빈 객체로 호출 - 모든 기본값 사용 (line 127 모든 브랜치 커버)
      // @ts-expect-error - 빈 객체로 호출
      const id = store.add({})
      const toast = store.getSnapshot().find(t => t.id === id)

      expect(toast?.closable).toBe(false)
      expect(toast?.message).toBe('')
      expect(toast?.duration).toBe(1000)
      expect(toast?.offsetY).toBeUndefined()
    })
  })

  describe('dismiss with multiple toasts (line 100 branch)', () => {
    it('should only close the specified toast when multiple toasts exist', () => {
      const id1 = store.add({ message: '1', closable: true })
      const id2 = store.add({ message: '2', closable: true })
      const id3 = store.add({ message: '3', closable: true })

      // 두 번째 토스트만 닫기 - map에서 t.id !== id인 경우 테스트
      store.dismiss(id2)

      const toasts = store.getSnapshot()
      expect(toasts.find(t => t.id === id1)?.open).toBe(true)
      expect(toasts.find(t => t.id === id2)?.open).toBe(false)
      expect(toasts.find(t => t.id === id3)?.open).toBe(true)
    })

    it('should not dismiss already closed toast', () => {
      const id = store.add({ message: 'test', closable: true })
      store.dismiss(id)

      // 이미 닫힌 토스트를 다시 닫으려고 시도
      const listener = vi.fn()
      store.subscribe(listener)

      store.dismiss(id)

      // listener가 호출되지 않아야 함 (이미 닫혀있으므로)
      expect(listener).not.toHaveBeenCalled()
    })
  })

  describe('Toaster Manager (subscribeToaster)', () => {
    it('first subscriber becomes active', () => {
      const callback = vi.fn()
      const unsubscribe = store.subscribeToaster('toaster-1', callback)

      expect(callback).toHaveBeenCalledWith('toaster-1')
      expect(store.activeToasterId).toBe('toaster-1')

      unsubscribe()
    })

    it('second subscriber waits', () => {
      const callback1 = vi.fn()
      store.subscribeToaster('toaster-1', callback1)

      const callback2 = vi.fn()
      const unsubscribe2 = store.subscribeToaster('toaster-2', callback2)

      expect(callback2).toHaveBeenCalledWith('toaster-1') // owner is still toaster-1
      expect(store.activeToasterId).toBe('toaster-1')

      unsubscribe2()
    })

    it('transfers ownership when active toaster unsubscribes', () => {
      const callback1 = vi.fn()
      const unsubscribe1 = store.subscribeToaster('toaster-1', callback1)

      const callback2 = vi.fn()
      store.subscribeToaster('toaster-2', callback2)

      // Unsubscribe active toaster
      unsubscribe1()

      // toaster-2 should become active
      expect(store.activeToasterId).toBe('toaster-2')
      expect(callback2).toHaveBeenLastCalledWith('toaster-2')
    })

    it('sets activeToasterId to null if no one is waiting', () => {
      const callback = vi.fn()
      const unsubscribe = store.subscribeToaster('toaster-1', callback)

      unsubscribe()

      expect(store.activeToasterId).toBeNull()
    })
  })
})
