import { ToastData, ToastListener, ToastOptions } from './types'

export class ToastStore {
  listeners: Set<ToastListener> = new Set()
  toasts: ToastData[] = []

  // Toaster Manager State
  activeToasterId: string | null = null
  toasterListeners: Map<string, (activeId: string | null) => void> = new Map()

  /**
   * 전역 삭제 일시정지 임계점 (Timestamp)
   * 새로운 자동 삭제 토스트가 추가될 때마다 해당 토스트의 duration만큼 미래로 갱신됩니다.
   */
  private globalPauseUntil: number = 0

  /**
   * 중앙 집중식 큐 관리를 위한 마스터 타이머
   */
  private masterTimer: NodeJS.Timeout | null = null

  constructor() {}

  /** 큐 스케줄링 헬퍼 */
  private scheduleQueue = (delay: number) => {
    if (this.masterTimer) {
      clearTimeout(this.masterTimer)
    }
    this.masterTimer = setTimeout(this.processQueue, delay)
  }

  /**
   * 중앙 큐 프로세서
   * 전역 일시정지 상태를 체크하고, 가장 오래된 토스트부터 순차적으로(staggered) 삭제합니다.
   */
  private processQueue = () => {
    const now = Date.now()

    // [STEP 1] 전역 일시정지 체크
    if (now < this.globalPauseUntil) {
      this.scheduleQueue(Math.max(this.globalPauseUntil - now, 0))
      return
    }

    // [STEP 2] 삭제할 대상 찾기 (열려있는 자동 삭제 토스트 중 가장 오래된 것)
    const nextToDismiss = this.toasts.find(t => t.open && !t.closable)

    if (nextToDismiss) {
      // 삭제 처리
      this.toasts = this.toasts.map(t => (t.id === nextToDismiss.id ? { ...t, open: false } : t))
      this.notifyListeners()

      // 다음 토스트가 있다면 간격(200ms)을 두고 다시 프로세서 실행
      const hasMore = this.toasts.some(t => t.open && !t.closable)
      if (hasMore) {
        this.scheduleQueue(100)
      }
    }
  }

  getSnapshot = () => this.toasts

  notifyListeners = () => {
    this.listeners.forEach(listener => listener(this.toasts))
  }

  subscribeToaster = (id: string, callback: (activeId: string | null) => void) => {
    if (this.activeToasterId === null) {
      this.activeToasterId = id
    }
    this.toasterListeners.set(id, callback)
    callback(this.activeToasterId)
    return () => {
      this.toasterListeners.delete(id)
      if (this.activeToasterId === id) {
        const nextId = this.toasterListeners.keys().next().value || null
        this.activeToasterId = nextId
        this.toasterListeners.forEach(cb => cb(this.activeToasterId))
      }
    }
  }

  subscribe = (listener: ToastListener) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  /**
   * 토스트 삭제(닫기 애니메이션 시작)
   * @param id 삭제할 토스트 ID (생략 시 모든 자동 삭제 토스트 프로세스 트리거)
   */
  dismiss = (id?: string) => {
    if (id) {
      const toast = this.toasts.find(t => t.id === id)
      if (!toast || !toast.open) return

      // 개별 삭제 (보통 닫기 버튼 클릭)
      this.toasts = this.toasts.map(t => (t.id === id ? { ...t, open: false } : t))
      this.notifyListeners()
    } else {
      // 전체 삭제 요청 시 큐 프로세서 즉시 실행
      this.globalPauseUntil = 0
      this.processQueue()
    }
  }

  dismissAll = () => {
    this.dismiss()
  }

  remove = (id: string) => {
    this.toasts = this.toasts.filter(t => t.id !== id)
    this.notifyListeners()
  }

  removeAll = () => {
    if (this.masterTimer) {
      clearTimeout(this.masterTimer)
      this.masterTimer = null
    }
    this.toasts = []
    this.notifyListeners()
  }

  add = ({ closable = false, offsetY, message = '', duration = 1000 }: ToastOptions): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    const newToast: ToastData = {
      id,
      message,
      closable,
      duration,
      offsetY,
      open: true,
      createdAt: Date.now(),
    }

    // 새 토스트를 배열 끝에 추가 (뒤가 최신)
    this.toasts = [...this.toasts, newToast]

    // 자동 삭제 토스트인 경우에만 보호 기간(전역 일시정지)을 현재부터 duration 뒤로 설정/연장합니다.
    if (!closable) {
      this.globalPauseUntil = Date.now() + duration
    }

    this.notifyListeners()

    // 자동 삭제 토스트라면 바로 삭제 프로세스 시작 (로직 내에서 duration 대기 발생)
    if (!closable && duration >= 0) {
      this.scheduleQueue(duration)
    }

    return id
  }
}

export const defaultStore = new ToastStore()

export const toast = {
  add: defaultStore.add.bind(defaultStore),
  dismiss: defaultStore.dismiss.bind(defaultStore),
  dismissAll: defaultStore.dismissAll.bind(defaultStore),
  remove: defaultStore.remove.bind(defaultStore),
  removeAll: defaultStore.removeAll.bind(defaultStore),
}
