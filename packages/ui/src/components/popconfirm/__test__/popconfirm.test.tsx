import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PopConfirm } from '../popconfirm'

describe('PopConfirm Component', () => {
  describe('렌더링', () => {
    it('Trigger를 렌더링한다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?">
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument()
    })

    it('기본 상태에서 Content는 보이지 않는다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?">
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.queryByText('정말 삭제하시겠습니까?')).not.toBeInTheDocument()
    })

    it('defaultOpen이 true이면 Content가 보인다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.getByText('정말 삭제하시겠습니까?')).toBeInTheDocument()
    })

    it('open이 true이면 Content가 보인다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" open>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.getByText('정말 삭제하시겠습니까?')).toBeInTheDocument()
    })
  })

  describe('title', () => {
    it('title을 렌더링한다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.getByText('정말 삭제하시겠습니까?')).toBeInTheDocument()
    })

    it('title에 ReactNode를 전달할 수 있다', () => {
      render(
        <PopConfirm
          title={
            <span>
              <strong>경고:</strong> 삭제하시겠습니까?
            </span>
          }
          defaultOpen
        >
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.getByText('경고:')).toBeInTheDocument()
      expect(screen.getByText('삭제하시겠습니까?')).toBeInTheDocument()
    })

    it('title에 data-slot="popconfirm-title" 속성이 있다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(document.querySelector('[data-slot="popconfirm-title"]')).toBeInTheDocument()
    })
  })

  describe('버튼 텍스트', () => {
    it('기본 confirmText는 "네"이다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.getByRole('button', { name: '네' })).toBeInTheDocument()
    })

    it('기본 cancelText는 "아니요"이다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.getByRole('button', { name: '아니요' })).toBeInTheDocument()
    })

    it('커스텀 confirmText를 설정할 수 있다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" confirmText="확인" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument()
    })

    it('커스텀 cancelText를 설정할 수 있다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" cancelText="취소" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument()
    })
  })

  describe('상호작용', () => {
    it('Trigger 클릭 시 열린다', async () => {
      const user = userEvent.setup()
      render(
        <PopConfirm title="정말 삭제하시겠습니까?">
          <button>삭제</button>
        </PopConfirm>,
      )

      await user.click(screen.getByRole('button', { name: '삭제' }))

      await waitFor(() => {
        expect(screen.getByText('정말 삭제하시겠습니까?')).toBeInTheDocument()
      })
    })

    it('확인 버튼 클릭 시 onConfirm이 호출되고 닫힌다', async () => {
      const user = userEvent.setup()
      const onConfirm = vi.fn()

      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen onConfirm={onConfirm}>
          <button>삭제</button>
        </PopConfirm>,
      )

      await user.click(screen.getByRole('button', { name: '네' }))

      expect(onConfirm).toHaveBeenCalled()
      await waitFor(() => {
        expect(screen.queryByText('정말 삭제하시겠습니까?')).not.toBeInTheDocument()
      })
    })

    it('취소 버튼 클릭 시 onCancel이 호출되고 닫힌다', async () => {
      const user = userEvent.setup()
      const onCancel = vi.fn()

      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen onCancel={onCancel}>
          <button>삭제</button>
        </PopConfirm>,
      )

      await user.click(screen.getByRole('button', { name: '아니요' }))

      expect(onCancel).toHaveBeenCalled()
      await waitFor(() => {
        expect(screen.queryByText('정말 삭제하시겠습니까?')).not.toBeInTheDocument()
      })
    })

    it('onOpenChange가 호출된다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <PopConfirm title="정말 삭제하시겠습니까?" onOpenChange={onOpenChange}>
          <button>삭제</button>
        </PopConfirm>,
      )

      await user.click(screen.getByRole('button', { name: '삭제' }))

      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Controlled 모드', () => {
    it('open prop으로 상태를 제어할 수 있다', () => {
      const { rerender } = render(
        <PopConfirm title="정말 삭제하시겠습니까?" open={false}>
          <button>삭제</button>
        </PopConfirm>,
      )

      expect(screen.queryByText('정말 삭제하시겠습니까?')).not.toBeInTheDocument()

      rerender(
        <PopConfirm title="정말 삭제하시겠습니까?" open={true}>
          <button>삭제</button>
        </PopConfirm>,
      )

      expect(screen.getByText('정말 삭제하시겠습니까?')).toBeInTheDocument()
    })
  })

  describe('side and align', () => {
    it('side="right", align="start"가 올바르게 적용된다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" side="right" align="start" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      const content = document.querySelector('[data-slot="popover-content"]')
      expect(content).toHaveAttribute('data-side', 'right')
      expect(content).toHaveAttribute('data-align', 'start')
    })

    it('기본 side는 top, align은 center이다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      const content = document.querySelector('[data-slot="popover-content"]')
      expect(content).toHaveAttribute('data-side', 'top')
      expect(content).toHaveAttribute('data-align', 'center')
    })
  })

  describe('showArrow', () => {
    it('기본적으로 화살표가 표시된다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(document.querySelector('[data-slot="popover-arrow"]')).toBeInTheDocument()
    })

    it('showArrow가 false이면 화살표가 표시되지 않는다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" showArrow={false} defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(document.querySelector('[data-slot="popover-arrow"]')).not.toBeInTheDocument()
    })
  })

  describe('비동기 확인', () => {
    it('비동기 onConfirm 실행 중 버튼이 비활성화된다', async () => {
      const user = userEvent.setup()
      let resolvePromise: () => void
      const onConfirm = vi.fn(
        () =>
          new Promise<void>(resolve => {
            resolvePromise = resolve
          }),
      )

      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen onConfirm={onConfirm}>
          <button>삭제</button>
        </PopConfirm>,
      )

      const confirmButton = screen.getByRole('button', { name: '네' })
      const cancelButton = screen.getByRole('button', { name: '아니요' })

      await user.click(confirmButton)

      expect(confirmButton).toBeDisabled()
      expect(cancelButton).toBeDisabled()

      await waitFor(async () => {
        resolvePromise!()
      })

      await waitFor(() => {
        expect(screen.queryByText('정말 삭제하시겠습니까?')).not.toBeInTheDocument()
      })
    })

    it('loadingText가 설정되면 로딩 중 텍스트가 변경된다', async () => {
      const user = userEvent.setup()
      let resolvePromise: () => void
      const onConfirm = vi.fn(
        () =>
          new Promise<void>(resolve => {
            resolvePromise = resolve
          }),
      )

      render(
        <PopConfirm
          title="정말 삭제하시겠습니까?"
          defaultOpen
          onConfirm={onConfirm}
          loadingText="처리 중..."
        >
          <button>삭제</button>
        </PopConfirm>,
      )

      await user.click(screen.getByRole('button', { name: '네' }))

      expect(screen.getByRole('button', { name: '처리 중...' })).toBeInTheDocument()

      await waitFor(async () => {
        resolvePromise!()
      })
    })
  })

  describe('버튼 비활성화', () => {
    it('confirmDisabled가 true이면 확인 버튼이 비활성화된다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" confirmDisabled defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.getByRole('button', { name: '네' })).toBeDisabled()
    })

    it('cancelDisabled가 true이면 취소 버튼이 비활성화된다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" cancelDisabled defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(screen.getByRole('button', { name: '아니요' })).toBeDisabled()
    })
  })

  describe('className', () => {
    it('className을 전달할 수 있다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" className="custom-popconfirm" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(document.querySelector('[data-slot="popover-content"]')).toHaveClass(
        'custom-popconfirm',
      )
    })
  })

  describe('data-slot 속성', () => {
    it('버튼 영역에 data-slot="popconfirm-button-area" 속성이 있다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(document.querySelector('[data-slot="popconfirm-button-area"]')).toBeInTheDocument()
    })

    it('확인 버튼에 data-slot="popconfirm-confirm-button" 속성이 있다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(document.querySelector('[data-slot="popconfirm-confirm-button"]')).toBeInTheDocument()
    })

    it('취소 버튼에 data-slot="popconfirm-cancel-button" 속성이 있다', () => {
      render(
        <PopConfirm title="정말 삭제하시겠습니까?" defaultOpen>
          <button>삭제</button>
        </PopConfirm>,
      )
      expect(document.querySelector('[data-slot="popconfirm-cancel-button"]')).toBeInTheDocument()
    })
  })

  describe('displayName', () => {
    it('PopConfirm의 displayName이 설정되어 있다', () => {
      expect(PopConfirm.displayName).toBe('PopConfirm')
    })
  })

  describe('Export', () => {
    it('PopConfirm이 정상적으로 export 된다', () => {
      expect(PopConfirm).toBeDefined()
    })
  })
})
