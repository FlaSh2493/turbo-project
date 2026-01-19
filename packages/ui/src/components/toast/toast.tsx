import { createPortal } from 'react-dom'
import { useEffect, useState, useId } from 'react'
import { defaultStore as store, useToast } from '../../headless/toast'
import { ToastPrimitive } from '../../primitives/toast'
import { SmoothList } from '../smooth-list'

// ============================================
// Toaster Component
// ============================================

interface ToasterProps {
  /** Y축 오프셋 (px) - 기본값: 40 */
  offsetY?: number
}

/**
 * Toaster - 앱 루트에 배치하는 Toast 컨테이너
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { Toaster } from '@turbo-project/front-core-design'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <Toaster />
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export const Toaster = ({ offsetY = 40 }: ToasterProps) => {
  const { toasts, dismiss, remove } = useToast()

  // 고유 ID 생성 (React 18 useId 활용 or fallback)
  const id = useId()
  const [activeId, setActiveId] = useState<string | null>(null)

  // SSR 환경에서는 렌더링하지 않음
  /* istanbul ignore next -- @preserve SSR 환경은 jsdom에서 테스트 불가 */
  if (typeof document === 'undefined') {
    return null
  }

  useEffect(() => {
    // 매니저에게 등록하고, 현재 활성화된 ID를 구독
    return store.subscribeToaster(id, ownerId => {
      setActiveId(ownerId)
    })
  }, [store, id])

  // 내가 주인이 아니라면 렌더링하지 않음
  if (activeId !== id) {
    return null
  }

  return createPortal(
    <ToastPrimitive.Viewport data-slot="toaster-viewport" offsetY={offsetY}>
      <SmoothList data-slot="toaster-list" className="toast-list-base" duration={100}>
        {toasts.map(t => (
          <ToastPrimitive.Root
            key={t.id}
            open={t.open}
            onRemove={() => remove(t.id)}
            data-layout-id={t.id}
          >
            <ToastPrimitive.Content>
              <ToastPrimitive.Description>{t.message}</ToastPrimitive.Description>
            </ToastPrimitive.Content>
            {t.closable && <ToastPrimitive.Close onClick={() => dismiss(t.id)} />}
          </ToastPrimitive.Root>
        ))}
      </SmoothList>
    </ToastPrimitive.Viewport>,
    document.body,
  )
}
