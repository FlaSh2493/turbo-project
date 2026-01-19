import { useEffect, useState } from 'react'
import { ToastData, UseToastReturn } from './types'

import { defaultStore as store } from './toast-store'

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastData[]>(store.getSnapshot())

  useEffect(() => {
    // 현재 스토어의 초기 상태로 동기화 (필요 시)
    setToasts(store.getSnapshot())

    const unsubscribe = store.subscribe(newToasts => {
      setToasts([...newToasts])
    })

    return () => {
      unsubscribe()
    }
  }, [store])

  return {
    toasts,
    addToasts: store.add.bind(store),
    dismiss: store.dismiss.bind(store),
    dismissAll: store.dismissAll.bind(store),
    remove: store.remove.bind(store),
    removeAll: store.removeAll.bind(store),
  }
}
