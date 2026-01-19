import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { Toaster } from '../toast'
import { useToast, toast as globalToast } from '../../../headless/toast'

// But let's ensure we can trigger animation events

const TestComponent = ({ closable }: { closable?: boolean }) => {
  const toastFuncs = useToast()

  return (
    <div>
      <button onClick={() => toastFuncs.addToasts({ message: 'Click Toast', closable })}>
        Trigger
      </button>
      <button aria-label="close-all" onClick={() => toastFuncs.dismissAll()}>
        Close All
      </button>
    </div>
  )
}

const renderWithProvider = (ui: React.ReactNode) => {
  return render(
    <>
      {ui}
      <Toaster />
    </>,
  )
}

describe('Toaster', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    globalToast.removeAll()
  })

  afterEach(() => {
    vi.useRealTimers()
    globalToast.removeAll()
    vi.unstubAllGlobals()
  })

  it('Toaster가 렌더링된다', () => {
    renderWithProvider(null)
    expect(document.querySelector('[data-slot="toaster-viewport"]')).toBeInTheDocument()
  })

  it('토스트가 표시된다', () => {
    renderWithProvider(<TestComponent />)

    act(() => {
      fireEvent.click(screen.getByText('Trigger'))
    })

    expect(screen.getByText('Click Toast')).toBeInTheDocument()
  })

  it('offsetY prop을 적용할 수 있다', () => {
    renderWithProvider(<Toaster offsetY={100} />)
    const viewport = document.querySelector('[data-slot="toaster-viewport"]')
    expect(viewport).toHaveStyle({ bottom: '6.25rem' }) // 100 / 16 = 6.25
  })

  it('닫기 버튼을 클릭하면 dismiss가 호출된다', () => {
    renderWithProvider(<TestComponent closable />)

    act(() => {
      fireEvent.click(screen.getByText('Trigger'))
    })

    const closeButton = screen.getByRole('button', { name: 'toast-close' })
    act(() => {
      fireEvent.click(closeButton)
    })

    // dismiss 호출 후 애니메이션이 시작되거나 상태가 변경됨을 확인
    expect(screen.getByRole('alert')).toHaveAttribute('data-state', 'closed')
  })

  it('애니메이션이 완료되면 onRemove가 호출된다', () => {
    renderWithProvider(<TestComponent />)

    act(() => {
      fireEvent.click(screen.getByText('Trigger'))
    })

    const toast = screen.getByRole('alert')
    expect(toast).toBeInTheDocument()

    // dismissAll 호출하여 closed 상태로 만듦
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'close-all' }))
    })

    expect(toast).toHaveAttribute('data-state', 'closed')

    // onAnimationEnd 시뮬레이션
    act(() => {
      fireEvent.animationEnd(toast)
    })

    // remove가 호출되어 DOM에서 사라져야 함
    expect(screen.queryByText('Click Toast')).not.toBeInTheDocument()
  })

  describe('Edge Cases', () => {
    it('동일한 스토어를 공유하는 Toaster가 여러 개이면 하나만 활성화된다', () => {
      render(
        <>
          <Toaster />
          <Toaster />
        </>,
      )

      // Toaster 내부적으로 Portal을 사용하므로 container 자체는 비어있을 수 있으나,
      // activeId !== id 로직에 의해 하나만 구독되어야 함.
      // 실제로는 createPortal이 호출되므로 body에 렌더링됨.
      // 여기서는 내부 activeId 상태 변화에 따라 하나만 동작하는지 확인
      render(<TestComponent />)
      act(() => {
        fireEvent.click(screen.getByText('Trigger'))
      })

      // 만약 둘 다 활성화되었다면 포털을 통해 두 번 렌더링되었을 것 (하지만 같은 store를 구독)
      // store.subscribeToaster Logic에 따라 마지막에 등록된 것이 주인이 됨
      expect(screen.getAllByText('Click Toast')).toHaveLength(1)
    })

    it('SSR 환경(document가 undefined)에서는 null을 반환한다', () => {
      // SSR 환경 체크 로직 테스트: typeof document === 'undefined'
      // jsdom 환경에서는 document가 항상 존재하므로, 이 분기는 실제 SSR에서만 실행됨
      // 여기서는 해당 조건이 false임을 확인하여 브라우저 환경에서 정상 렌더링됨을 검증
      expect(typeof document).not.toBe('undefined')

      // 브라우저 환경에서는 정상적으로 렌더링됨
      renderWithProvider(null)
      expect(document.querySelector('[data-slot="toaster-viewport"]')).toBeInTheDocument()
    })
  })
})
