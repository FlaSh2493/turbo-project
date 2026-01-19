import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import {
  PopoverPrimitiveRoot,
  PopoverPrimitiveTrigger,
  PopoverPrimitiveAnchor,
  PopoverPrimitiveContent,
  PopoverPrimitiveArrow,
  PopoverPrimitiveClose,
} from '../popover'

describe('PopoverPrimitives', () => {
  describe('렌더링', () => {
    it('Trigger를 렌더링한다', () => {
      render(
        <PopoverPrimitiveRoot>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()
    })

    it('기본 상태에서 Content를 렌더링하지 않는다', () => {
      render(
        <PopoverPrimitiveRoot>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('open이 true일 때 Content를 렌더링한다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('defaultOpen이 true일 때 Content를 렌더링한다', () => {
      render(
        <PopoverPrimitiveRoot defaultOpen={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByText('Content')).toBeInTheDocument()
    })
  })

  describe('Trigger', () => {
    it('data-slot="popover-trigger" 속성을 가진다', () => {
      render(
        <PopoverPrimitiveRoot>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute(
        'data-slot',
        'popover-trigger',
      )
    })

    it('className을 전달할 수 있다', () => {
      render(
        <PopoverPrimitiveRoot>
          <PopoverPrimitiveTrigger className="custom-class">Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByRole('button', { name: 'Trigger' })).toHaveClass('custom-class')
    })

    it('ref를 전달할 수 있다', () => {
      const ref = createRef<HTMLButtonElement>()
      render(
        <PopoverPrimitiveRoot>
          <PopoverPrimitiveTrigger ref={ref}>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('asChild를 사용하여 커스텀 요소를 렌더링할 수 있다', () => {
      render(
        <PopoverPrimitiveRoot>
          <PopoverPrimitiveTrigger asChild>
            <span data-testid="custom-trigger">Custom Trigger</span>
          </PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument()
      expect(screen.getByTestId('custom-trigger')).toHaveAttribute('data-slot', 'popover-trigger')
    })

    it('클릭 시 Content가 열린다', async () => {
      const user = userEvent.setup()
      render(
        <PopoverPrimitiveRoot>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )

      await user.click(screen.getByRole('button', { name: 'Trigger' }))
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument()
      })
    })
  })

  describe('Anchor', () => {
    it('data-slot="popover-anchor" 속성을 가진다', () => {
      render(
        <PopoverPrimitiveRoot>
          <PopoverPrimitiveAnchor data-testid="anchor">Anchor</PopoverPrimitiveAnchor>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByTestId('anchor')).toHaveAttribute('data-slot', 'popover-anchor')
    })

    it('className을 전달할 수 있다', () => {
      render(
        <PopoverPrimitiveRoot>
          <PopoverPrimitiveAnchor data-testid="anchor" className="anchor-class">
            Anchor
          </PopoverPrimitiveAnchor>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByTestId('anchor')).toHaveClass('anchor-class')
    })

    it('ref를 전달할 수 있다', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <PopoverPrimitiveRoot>
          <PopoverPrimitiveAnchor ref={ref}>Anchor</PopoverPrimitiveAnchor>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Content', () => {
    it('data-slot="popover-content" 속성을 가진다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByText('Content')).toHaveAttribute('data-slot', 'popover-content')
    })

    it('className을 전달할 수 있다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent className="content-class">Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByText('Content')).toHaveClass('content-class')
    })

    it('ref를 전달할 수 있다', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent ref={ref}>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('기본 side는 bottom이다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByText('Content')).toHaveAttribute('data-side', 'bottom')
    })

    it('sideOffset을 전달할 수 있다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent sideOffset={16}>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByText('Content')).toBeInTheDocument()
    })
  })


  describe('Arrow', () => {
    it('data-slot="popover-arrow" 속성을 가진다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>
            Content
            <PopoverPrimitiveArrow data-testid="arrow" />
          </PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByTestId('arrow')).toHaveAttribute('data-slot', 'popover-arrow')
    })

    it('className을 전달할 수 있다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>
            Content
            <PopoverPrimitiveArrow data-testid="arrow" className="arrow-class" />
          </PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByTestId('arrow')).toHaveClass('arrow-class')
    })

    it('ref를 전달할 수 있다', () => {
      const ref = createRef<SVGSVGElement>()
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>
            Content
            <PopoverPrimitiveArrow ref={ref} />
          </PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(ref.current).toBeInstanceOf(SVGSVGElement)
    })

    it('기본 width와 height가 적용된다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>
            Content
            <PopoverPrimitiveArrow data-testid="arrow" />
          </PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      const arrow = screen.getByTestId('arrow')
      expect(arrow).toHaveAttribute('width', '16')
      expect(arrow).toHaveAttribute('height', '12')
    })

    it('커스텀 width와 height를 전달할 수 있다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>
            Content
            <PopoverPrimitiveArrow data-testid="arrow" width={20} height={10} />
          </PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      const arrow = screen.getByTestId('arrow')
      expect(arrow).toHaveAttribute('width', '20')
      expect(arrow).toHaveAttribute('height', '10')
    })
  })

  describe('Close', () => {
    it('data-slot="popover-close" 속성을 가진다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>
            Content
            <PopoverPrimitiveClose data-testid="close">Close</PopoverPrimitiveClose>
          </PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByTestId('close')).toHaveAttribute('data-slot', 'popover-close')
    })

    it('className을 전달할 수 있다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>
            Content
            <PopoverPrimitiveClose data-testid="close" className="close-class">
              Close
            </PopoverPrimitiveClose>
          </PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByTestId('close')).toHaveClass('close-class')
    })

    it('ref를 전달할 수 있다', () => {
      const ref = createRef<HTMLButtonElement>()
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>
            Content
            <PopoverPrimitiveClose ref={ref}>Close</PopoverPrimitiveClose>
          </PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('클릭 시 Popover가 닫힌다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <PopoverPrimitiveRoot defaultOpen={true} onOpenChange={onOpenChange}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>
            Content
            <PopoverPrimitiveClose data-testid="close">Close</PopoverPrimitiveClose>
          </PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )

      await user.click(screen.getByTestId('close'))
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      })
    })

    it('children 없이도 렌더링된다', () => {
      render(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>
            Content
            <PopoverPrimitiveClose data-testid="close" />
          </PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )
      expect(screen.getByTestId('close')).toBeInTheDocument()
    })
  })

  describe('상호작용', () => {
    it('Trigger 클릭 후 다시 클릭하면 닫힌다', async () => {
      const user = userEvent.setup()
      render(
        <PopoverPrimitiveRoot>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )

      const trigger = screen.getByRole('button', { name: 'Trigger' })

      await user.click(trigger)
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument()
      })

      await user.click(trigger)
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
      })
    })

    it('onOpenChange 콜백이 호출된다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <PopoverPrimitiveRoot onOpenChange={onOpenChange}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )

      await user.click(screen.getByRole('button', { name: 'Trigger' }))
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true)
      })
    })

    it('Escape 키를 누르면 닫힌다', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <PopoverPrimitiveRoot defaultOpen={true} onOpenChange={onOpenChange}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )

      expect(screen.getByText('Content')).toBeInTheDocument()

      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('Controlled 모드', () => {
    it('open prop으로 상태를 제어할 수 있다', () => {
      const { rerender } = render(
        <PopoverPrimitiveRoot open={false}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )

      expect(screen.queryByText('Content')).not.toBeInTheDocument()

      rerender(
        <PopoverPrimitiveRoot open={true}>
          <PopoverPrimitiveTrigger>Trigger</PopoverPrimitiveTrigger>
          <PopoverPrimitiveContent>Content</PopoverPrimitiveContent>
        </PopoverPrimitiveRoot>,
      )

      expect(screen.getByText('Content')).toBeInTheDocument()
    })
  })

  describe('Export', () => {
    it('Primitive 컴포넌트들이 정상적으로 export 된다', () => {
      expect(PopoverPrimitiveRoot).toBeDefined()
      expect(PopoverPrimitiveTrigger).toBeDefined()
      expect(PopoverPrimitiveAnchor).toBeDefined()
      expect(PopoverPrimitiveContent).toBeDefined()
      expect(PopoverPrimitiveArrow).toBeDefined()
      expect(PopoverPrimitiveClose).toBeDefined()
    })
  })

  describe('displayName', () => {
    it('각 컴포넌트의 displayName이 설정되어 있다', () => {
      expect(PopoverPrimitiveRoot.displayName).toBe('PopoverPrimitiveRoot')
      expect(PopoverPrimitiveTrigger.displayName).toBe('PopoverPrimitiveTrigger')
      expect(PopoverPrimitiveAnchor.displayName).toBe('PopoverPrimitiveAnchor')
      expect(PopoverPrimitiveContent.displayName).toBe('PopoverPrimitiveContent')
      expect(PopoverPrimitiveArrow.displayName).toBe('PopoverPrimitiveArrow')
      expect(PopoverPrimitiveClose.displayName).toBe('PopoverPrimitiveClose')
    })
  })
})
