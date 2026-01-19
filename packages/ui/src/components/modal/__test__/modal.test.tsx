import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal as ModalPrimitive } from '../modal'

describe('ModalPrimitive', () => {
  describe('Root', () => {
    it('should render children when open', () => {
      render(
        <ModalPrimitive.Root open={true}>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content>
              <div>Modal Content</div>
            </ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })

    it('should not render children when closed', () => {
      render(
        <ModalPrimitive.Root open={false}>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content>
              <div>Modal Content</div>
            </ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
    })
  })

  describe('Trigger', () => {
    it('should render trigger button with correct data-slot', () => {
      render(
        <ModalPrimitive.Root>
          <ModalPrimitive.Trigger data-testid="modal-trigger">Open Modal</ModalPrimitive.Trigger>
        </ModalPrimitive.Root>,
      )

      const trigger = screen.getByTestId('modal-trigger')
      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveAttribute('data-slot', 'modal-trigger')
      expect(trigger).toHaveTextContent('Open Modal')
    })

    it('should open modal when trigger is clicked', async () => {
      const user = userEvent.setup()

      render(
        <ModalPrimitive.Root>
          <ModalPrimitive.Trigger data-testid="modal-trigger">Open Modal</ModalPrimitive.Trigger>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content data-testid="modal-content">
              Modal Content
            </ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      const trigger = screen.getByTestId('modal-trigger')
      expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument()

      await user.click(trigger)

      expect(screen.getByTestId('modal-content')).toBeInTheDocument()
    })

    it('should apply custom className to trigger', () => {
      render(
        <ModalPrimitive.Root>
          <ModalPrimitive.Trigger data-testid="modal-trigger" className="custom-class">
            Open Modal
          </ModalPrimitive.Trigger>
        </ModalPrimitive.Root>,
      )

      const trigger = screen.getByTestId('modal-trigger')
      expect(trigger).toHaveClass('custom-class')
    })
  })

  describe('Overlay', () => {
    it('should render overlay with correct data-slot', () => {
      render(
        <ModalPrimitive.Root open={true}>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Overlay data-testid="modal-overlay" />
            <ModalPrimitive.Content>Content</ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      const overlay = screen.getByTestId('modal-overlay')
      expect(overlay).toBeInTheDocument()
      expect(overlay).toHaveAttribute('data-slot', 'modal-overlay')
    })
  })

  describe('Content', () => {
    it('should render with correct data-slot', () => {
      render(
        <ModalPrimitive.Root open={true}>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content data-testid="modal-content">Content</ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      const content = screen.getByTestId('modal-content')
      expect(content).toHaveAttribute('data-slot', 'modal-content')
    })

    it('should apply size variants', () => {
      const { rerender } = render(
        <ModalPrimitive.Root open={true} size="sm">
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content data-testid="modal-content">Content</ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      let content = screen.getByTestId('modal-content')
      expect(content).toHaveAttribute('data-size', 'sm')

      rerender(
        <ModalPrimitive.Root open={true} size="lg">
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content data-testid="modal-content">Content</ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      content = screen.getByTestId('modal-content')
      expect(content).toHaveAttribute('data-size', 'lg')
    })
  })

  describe('Header', () => {
    it('should render with correct data-slot', () => {
      render(
        <ModalPrimitive.Root open={true}>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content>
              <ModalPrimitive.Header data-testid="modal-header">
                Header Content
              </ModalPrimitive.Header>
            </ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      const header = screen.getByTestId('modal-header')
      expect(header).toHaveAttribute('data-slot', 'modal-header')
      expect(header).toHaveTextContent('Header Content')
    })
  })

  describe('Title', () => {
    it('should render with correct data-slot', () => {
      render(
        <ModalPrimitive.Root open={true}>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content>
              <ModalPrimitive.Title data-testid="modal-title">Modal Title</ModalPrimitive.Title>
            </ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      const title = screen.getByTestId('modal-title')
      expect(title).toHaveAttribute('data-slot', 'modal-title')
      expect(title).toHaveTextContent('Modal Title')
    })
  })

  describe('Body', () => {
    it('should render with correct data-slot', () => {
      render(
        <ModalPrimitive.Root open={true}>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content>
              <ModalPrimitive.Body data-testid="modal-body">Body Content</ModalPrimitive.Body>
            </ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      const body = screen.getByTestId('modal-body')
      expect(body).toHaveAttribute('data-slot', 'modal-body')
      expect(body).toHaveTextContent('Body Content')
    })
  })

  describe('Footer', () => {
    it('should render with correct data-slot', () => {
      render(
        <ModalPrimitive.Root open={true}>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content>
              <ModalPrimitive.Footer data-testid="modal-footer">
                Footer Content
              </ModalPrimitive.Footer>
            </ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      const footer = screen.getByTestId('modal-footer')
      expect(footer).toHaveAttribute('data-slot', 'modal-footer')
      expect(footer).toHaveTextContent('Footer Content')
    })
  })

  describe('Close', () => {
    it('should render close button', () => {
      render(
        <ModalPrimitive.Root open={true}>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content>
              <ModalPrimitive.Close data-testid="modal-close">Close</ModalPrimitive.Close>
            </ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      const closeButton = screen.getByTestId('modal-close')
      expect(closeButton).toHaveAttribute('data-slot', 'modal-close')
      expect(closeButton).toHaveTextContent('Close')
    })

    it('should close modal when clicked', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()

      render(
        <ModalPrimitive.Root open={true} onOpenChange={onOpenChange}>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content>
              <ModalPrimitive.Close data-testid="modal-close">Close</ModalPrimitive.Close>
            </ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      const closeButton = screen.getByTestId('modal-close')
      await user.click(closeButton)

      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <ModalPrimitive.Root open={true}>
          <ModalPrimitive.Portal>
            <ModalPrimitive.Content data-testid="modal-content">
              <ModalPrimitive.Title>Modal Title</ModalPrimitive.Title>
              <ModalPrimitive.Body>Modal Body</ModalPrimitive.Body>
            </ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      const content = screen.getByTestId('modal-content')
      expect(content).toHaveAttribute('role', 'dialog')
    })
  })

  describe('Full Modal Structure', () => {
    it('should render complete modal structure', () => {
      render(
        <ModalPrimitive.Root open={true} size="md">
          <ModalPrimitive.Portal>
            <ModalPrimitive.Overlay data-testid="overlay" />
            <ModalPrimitive.Content data-testid="content">
              <ModalPrimitive.Header data-testid="header">
                <ModalPrimitive.Title data-testid="title">Test Modal</ModalPrimitive.Title>
              </ModalPrimitive.Header>
              <ModalPrimitive.Body data-testid="body">Modal body content</ModalPrimitive.Body>
              <ModalPrimitive.Footer data-testid="footer">
                <ModalPrimitive.Close data-testid="close">Close</ModalPrimitive.Close>
              </ModalPrimitive.Footer>
            </ModalPrimitive.Content>
          </ModalPrimitive.Portal>
        </ModalPrimitive.Root>,
      )

      expect(screen.getByTestId('overlay')).toBeInTheDocument()
      expect(screen.getByTestId('content')).toBeInTheDocument()
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('title')).toHaveTextContent('Test Modal')
      expect(screen.getByTestId('body')).toHaveTextContent('Modal body content')
      expect(screen.getByTestId('footer')).toBeInTheDocument()
      expect(screen.getByTestId('close')).toHaveTextContent('Close')
    })
  })
})
