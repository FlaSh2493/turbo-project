export interface ToastData {
  /** 고유 ID */
  id: string
  /** 메시지 */
  message: React.ReactNode
  /** 닫기 버튼 표시 여부 (true: Type 2, false: Type 1) */
  closable?: boolean
  /** 아이콘 표시 여부 */
  showIcon?: boolean
  /** 지속 시간 (ms) - 기본값: 3000 */
  duration?: number
  /** Y축 오프셋 (px) */
  offsetY?: number
  /** 열림 상태 */
  open: boolean
  /** 생성 시간 (ms) */
  createdAt: number
}

export interface ToastOptions {
  /** 메시지 */
  message: string
  /** 닫기 버튼 표시 여부 (true: Type 2, false: Type 1) */
  closable?: boolean
  /** 아이콘 표시 여부 - 기본값: !closable */
  showIcon?: boolean
  /** 지속 시간 (ms) - 기본값: closable ? 10000 : 4000 */
  duration?: number
  /** Y축 오프셋 (px) */
  offsetY?: number
}

export interface UseToastReturn {
  /** 현재 토스트 목록 */
  toasts: ToastData[]
  /** 토스트 추가 */
  addToasts: (options: ToastOptions) => string
  /** 토스트 닫기 (애니메이션 시작) */
  dismiss: (id: string) => void
  /** 모든 토스트 닫기 */
  dismissAll: () => void
  /** 토스트 언마운트 */
  remove: (id: string) => void
  /** 모든 토스트 언마운트 */
  removeAll: () => void
}

export type ToastListener = (toasts: ToastData[]) => void
