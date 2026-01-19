import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { Toaster } from '../toast'
import { useToast, toast } from '../../../headless/toast'

const TestComponent = () => {
  const toastFuncs = useToast()
  return (
    <button onClick={() => toastFuncs.addToasts({ message: 'Hook Toast' })}>Trigger Hook</button>
  )
}

describe('Toast Hybrid Usage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    toast.removeAll() // Ensure global state is clean
  })

  afterEach(() => {
    vi.useRealTimers()
    toast.removeAll()
  })

  it('Provider 없이 전역 toast 객체를 사용하여 토스트를 표시할 수 있다', () => {
    render(<Toaster />)

    act(() => {
      toast.add({ message: 'Global Toast' })
    })

    expect(screen.getByText('Global Toast')).toBeInTheDocument()
  })

  it('Provider 없이 useToast 훅을 사용하여 토스트를 표시할 수 있다', () => {
    render(
      <>
        <Toaster />
        <TestComponent />
      </>,
    )

    act(() => {
      fireEvent.click(screen.getByText('Trigger Hook'))
    })

    expect(screen.getByText('Hook Toast')).toBeInTheDocument()
  })

  it('Provider 내부에서는 전역 스토어와 격리된다', () => {
    render(
      <>
        <div data-testid="global-area">
          <Toaster />
        </div>
        <div data-testid="provider-area">
          <Toaster />
          <TestComponent />
        </div>
      </>,
    )

    // Provider 내부에서 토스트 발생
    act(() => {
      const button = screen.getByTestId('provider-area').querySelector('button')
      fireEvent.click(button!)
    })

    // Toaster는 Portal을 사용하므로 provider-area 내부에 텍스트가 없음
    // 화면 전체에서 텍스트를 찾아야 함
    expect(screen.getByText('Hook Toast')).toBeInTheDocument()

    // 격리 확인: 만약 격리되지 않았다면 Global Toaster와 Provider Toaster 두 곳에서 모두 렌더링되어 2개가 됨
    // 격리되었다면 Provider Toaster에서만 렌더링되어 1개만 존재해야 함
    expect(screen.getAllByText('Hook Toast')).toHaveLength(1)
  })

  it('전역 toast 호출이 정상 동작한다', () => {
    render(<Toaster />)

    act(() => {
      toast.add({ message: 'Global Message' })
    })

    expect(screen.queryByText('Global Message')).toBeInTheDocument()
  })
  it('동일한 스토어를 공유하는 Toaster가 여러 개여도 하나만 렌더링된다 (Manager Pattern)', () => {
    // 첫 번째 Toaster 렌더링 (Active)
    render(
      <>
        <div data-testid="wrapper-1">
          <Toaster />
        </div>
        <div data-testid="wrapper-2">
          <Toaster />
        </div>
      </>,
    )

    act(() => {
      toast.add({ message: 'Only One' })
    })

    // DOM에 'Only One' 텍스트는 하나만 존재해야 함 (Portal로 렌더링되더라도 1개만)
    // getAllByText가 1개를 반환해야 함
    const toasts = screen.getAllByText('Only One')
    expect(toasts).toHaveLength(1)
  })
})
