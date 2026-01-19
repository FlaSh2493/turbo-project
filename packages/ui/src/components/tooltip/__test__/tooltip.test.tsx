import { describe, it, expect, vi } from 'vitest'
import { render, screen, within, renderHook } from '@testing-library/react'
import { useTooltipContext } from '../../../headless/tooltip/use-tooltip'
import userEvent from '@testing-library/user-event'
import { Tooltip } from '../tooltip'

// Helper to get visible tooltip content (excluding "ghost" duplicates from Radix)
const getVisibleContentText = (text: string) => {
  const elements = screen.queryAllByText(text)
  const visible = elements.filter(el => !el.closest('span[role="tooltip"]'))
  return visible.length > 0 ? visible[0] : null
}

const getVisibleCloseButton = () => {
  const elements = screen.queryAllByRole('button', { name: 'Close tooltip' })
  const visible = elements.filter(el => !el.closest('span[role="tooltip"]'))
  return visible.length > 0 ? visible[0] : null
}

describe('Tooltip Component', () => {
  describe('렌더링', () => {
    it('Trigger를 렌더링한다', () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>,
      )
      expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()
    })

    it('기본적으로 Content는 보이지 않는다 (Hover mode)', () => {
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>,
      )
      expect(document.querySelector('[data-slot="tooltip-content"]')).not.toBeInTheDocument()
    })

    it('defaultOpen이 true이면 Content가 보인다 (mode="click" required)', () => {
      render(
        <Tooltip content="Tooltip content" defaultOpen mode="click">
          <button>Trigger</button>
        </Tooltip>,
      )
      expect(getVisibleContentText('Tooltip content')).toBeInTheDocument()
    })
  })

  describe('Hover 모드', () => {
    it('마우스를 올리면 Content가 보인다', async () => {
      const user = userEvent.setup()
      render(
        <Tooltip content="Tooltip content">
          <button>Trigger</button>
        </Tooltip>,
      )

      const trigger = screen.getByRole('button', { name: 'Trigger' })
      await user.hover(trigger)

      // Wait and check
      await screen.findAllByText('Tooltip content')
      expect(getVisibleContentText('Tooltip content')).toBeInTheDocument()
    })
  })

  describe('Click 모드', () => {
    it('클릭하면 Content가 보인다', async () => {
      const user = userEvent.setup()
      render(
        <Tooltip content="Tooltip content" mode="click">
          <button>Trigger</button>
        </Tooltip>,
      )

      const trigger = screen.getByRole('button', { name: 'Trigger' })
      expect(document.querySelector('[data-slot="tooltip-content"]')).not.toBeInTheDocument()

      await user.click(trigger)

      await screen.findAllByText('Tooltip content')
      expect(getVisibleContentText('Tooltip content')).toBeInTheDocument()
    })
  })

  describe('Controlled 모드', () => {
    it('open prop에 따라 제어된다 (mode="click")', () => {
      const { rerender } = render(
        <Tooltip content="Tooltip content" open={false} mode="click">
          <button>Trigger</button>
        </Tooltip>,
      )
      expect(document.querySelector('[data-slot="tooltip-content"]')).not.toBeInTheDocument()

      rerender(
        <Tooltip content="Tooltip content" open={true} mode="click">
          <button>Trigger</button>
        </Tooltip>,
      )

      expect(getVisibleContentText('Tooltip content')).toBeInTheDocument()
    })

    it('상태 변경 시 onOpenChange가 호출된다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <Tooltip content="Tooltip content" mode="click" onOpenChange={onOpenChange}>
          <button>Trigger</button>
        </Tooltip>,
      )

      await user.click(screen.getByRole('button', { name: 'Trigger' }))
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('기타 옵션', () => {
    it('showClose가 true이면 닫기 버튼이 보인다', () => {
      render(
        <Tooltip content="Tooltip content" open showClose mode="click">
          <button>Trigger</button>
        </Tooltip>,
      )
      expect(getVisibleCloseButton()).toBeInTheDocument()
    })

    it('닫기 버튼을 클릭하면 onOpenChange(false)가 호출된다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(
        <Tooltip content="Tooltip content" open showClose mode="click" onOpenChange={onOpenChange}>
          <button>Trigger</button>
        </Tooltip>,
      )
      const closeButton = getVisibleCloseButton()
      expect(closeButton).toBeInTheDocument()
      await user.click(closeButton!)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('showArrow가 true이면 화살표가 렌더링된다', () => {
      render(
        <Tooltip content="Tooltip content" open showArrow mode="click">
          <button>Trigger</button>
        </Tooltip>,
      )
      // Arrow is direct child of content or wrapper, not inside span[role="tooltip"] (duplicate) usually.
      // Based on snapshot, duplicate span contains children div. Arrow is OUTSIDE that div?
      // Snapshot:
      // <div data-slot="tooltip-content">
      //    <div class="flex ...">...</div>
      //    <span data-slot="tooltip-arrow">...</span>
      //    <span role="tooltip">...</span>
      // </div>
      // The duplicate span is a SIBLING of the Arrow.
      // So Arrow is unique (unless Radix duplicates arrow too? Snapshot only shows Arrow in the main div, not inside duplicate span).
      // Wait, let's verify duplicate content.
      // Duplicate span: <span ...> <div class="flex"> ... </div> </span>.
      // It does NOT seem to contain Arrow.

      const arrows = document.querySelectorAll('[data-slot="tooltip-arrow"]')
      expect(arrows.length).toBeGreaterThan(0)
    })

    it('showArrow가 false이면 화살표가 렌더링되지 않는다', () => {
      render(
        <Tooltip content="Tooltip content" open showArrow={false} mode="click">
          <button>Trigger</button>
        </Tooltip>,
      )
      const arrow = document.querySelector('[data-slot="tooltip-arrow"]')
      expect(arrow).not.toBeInTheDocument()
    })
  })

  describe('useTooltipContext', () => {
    it('TooltipProvider 외부에서 사용하면 에러를 던진다', () => {
      // console.error를 mock하여 테스트 출력에 에러 로그가 남지 않도록 함 (선택 사항이지만 권장)
      const consoleSpy = vi.spyOn(console, 'error')
      consoleSpy.mockImplementation(() => {})

      expect(() => renderHook(() => useTooltipContext())).toThrow(
        'Tooltip components must be used within TooltipProvider',
      )

      consoleSpy.mockRestore()
    })
  })
})
