import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  TooltipPrimitiveRoot,
  TooltipPrimitiveTrigger,
  TooltipPrimitiveContent,
  TooltipPrimitiveArrow,
  TooltipPrimitiveClose,
} from '../tooltip'

describe('TooltipPrimitives', () => {
  describe('렌더링', () => {
    it('Trigger를 렌더링한다', () => {
      render(
        <TooltipPrimitiveRoot open={false} onOpenChange={() => {}}>
          <TooltipPrimitiveTrigger asChild mode="hover" open={false} setOpen={() => {}}>
            <span role="button" tabIndex={0}>
              Trigger
            </span>
          </TooltipPrimitiveTrigger>
          <TooltipPrimitiveContent>Tooltip content</TooltipPrimitiveContent>
        </TooltipPrimitiveRoot>,
      )
      expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()
    })

    it('open이 false일 때 Content를 렌더링하지 않는다', () => {
      render(
        <TooltipPrimitiveRoot open={false} onOpenChange={() => {}}>
          <TooltipPrimitiveTrigger asChild mode="hover" open={false} setOpen={() => {}}>
            <span role="button" tabIndex={0}>
              Trigger
            </span>
          </TooltipPrimitiveTrigger>
          <TooltipPrimitiveContent>Tooltip content</TooltipPrimitiveContent>
        </TooltipPrimitiveRoot>,
      )
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })

    it('open이 true일 때 Content를 렌더링한다', () => {
      render(
        <TooltipPrimitiveRoot open={true} onOpenChange={() => {}}>
          <TooltipPrimitiveTrigger asChild mode="hover" open={true} setOpen={() => {}}>
            <span role="button" tabIndex={0}>
              Trigger
            </span>
          </TooltipPrimitiveTrigger>
          <TooltipPrimitiveContent>Tooltip content</TooltipPrimitiveContent>
        </TooltipPrimitiveRoot>,
      )
      // Note: Radix UI sometimes renders multiple portals in test environment or due to React Strict Mode.
      // We check if at least one instance is present.
      const contents = screen.getAllByText('Tooltip content')
      expect(contents[0]).toBeInTheDocument()
    })
  })

  describe('Trigger', () => {
    it('data-slot="tooltip-trigger" 속성을 가진다', () => {
      render(
        <TooltipPrimitiveRoot open={false} onOpenChange={() => {}}>
          <TooltipPrimitiveTrigger asChild mode="hover" open={false} setOpen={() => {}}>
            <span role="button" tabIndex={0}>
              Trigger
            </span>
          </TooltipPrimitiveTrigger>
          <TooltipPrimitiveContent>Tooltip content</TooltipPrimitiveContent>
        </TooltipPrimitiveRoot>,
      )
      expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute(
        'data-slot',
        'tooltip-trigger',
      )
    })
  })

  describe('Click Mode', () => {
    it('click mode에서 Trigger 클릭 시 setOpen이 호출된다', async () => {
      const user = userEvent.setup()
      const setOpen = vi.fn()

      render(
        <TooltipPrimitiveRoot open={false} onOpenChange={() => {}}>
          <TooltipPrimitiveTrigger asChild mode="click" open={false} setOpen={setOpen}>
            <span role="button" tabIndex={0}>
              Trigger
            </span>
          </TooltipPrimitiveTrigger>
          <TooltipPrimitiveContent>Tooltip content</TooltipPrimitiveContent>
        </TooltipPrimitiveRoot>,
      )

      await user.click(screen.getByRole('button', { name: 'Trigger' }))
      expect(setOpen).toHaveBeenCalledWith(true)
    })

    it('click mode에서 open이 true일 때 Trigger 클릭 시 setOpen(false)가 호출된다', async () => {
      const user = userEvent.setup()
      const setOpen = vi.fn()

      render(
        <TooltipPrimitiveRoot open={true} onOpenChange={() => {}}>
          <TooltipPrimitiveTrigger asChild mode="click" open={true} setOpen={setOpen}>
            <span role="button" tabIndex={0}>
              Trigger
            </span>
          </TooltipPrimitiveTrigger>
          <TooltipPrimitiveContent>Tooltip content</TooltipPrimitiveContent>
        </TooltipPrimitiveRoot>,
      )

      await user.click(screen.getByRole('button', { name: 'Trigger' }))
      expect(setOpen).toHaveBeenCalledWith(false)
    })

    it('click mode에서 Close 버튼 클릭 시 setOpen(false)가 호출된다', async () => {
      const user = userEvent.setup()
      const setOpen = vi.fn()

      render(
        <TooltipPrimitiveRoot open={true} onOpenChange={() => {}}>
          <TooltipPrimitiveTrigger asChild mode="click" open={true} setOpen={setOpen}>
            <span role="button" tabIndex={0}>
              Trigger
            </span>
          </TooltipPrimitiveTrigger>
          <TooltipPrimitiveContent>
            Tooltip content
            <TooltipPrimitiveClose setOpen={setOpen} />
          </TooltipPrimitiveContent>
        </TooltipPrimitiveRoot>,
      )

      // Note: Radix UI sometimes renders multiple portals in test environment or due to React Strict Mode.
      const closeButtons = screen.getAllByRole('button', { name: 'Close tooltip' })
      await user.click(closeButtons[0])
      expect(setOpen).toHaveBeenCalledWith(false)
    })

    it('click mode에서 외부 onClick 핸들러도 함께 호출된다', async () => {
      const user = userEvent.setup()
      const setOpen = vi.fn()
      const onClick = vi.fn()

      render(
        <TooltipPrimitiveRoot open={false} onOpenChange={() => {}}>
          <TooltipPrimitiveTrigger
            asChild
            mode="click"
            open={false}
            setOpen={setOpen}
            onClick={onClick}
          >
            <span role="button" tabIndex={0}>
              Trigger
            </span>
          </TooltipPrimitiveTrigger>
          <TooltipPrimitiveContent>Tooltip content</TooltipPrimitiveContent>
        </TooltipPrimitiveRoot>,
      )

      await user.click(screen.getByRole('button', { name: 'Trigger' }))
      expect(setOpen).toHaveBeenCalledWith(true)
      expect(onClick).toHaveBeenCalled()
    })

    it('hover mode에서 Trigger 클릭 시 setOpen이 호출되지 않는다', async () => {
      const user = userEvent.setup()
      const setOpen = vi.fn()

      render(
        <TooltipPrimitiveRoot open={false} onOpenChange={() => {}}>
          <TooltipPrimitiveTrigger asChild mode="hover" open={false} setOpen={setOpen}>
            <span role="button" tabIndex={0}>
              Trigger
            </span>
          </TooltipPrimitiveTrigger>
          <TooltipPrimitiveContent>Tooltip content</TooltipPrimitiveContent>
        </TooltipPrimitiveRoot>,
      )

      await user.click(screen.getByRole('button', { name: 'Trigger' }))
      expect(setOpen).not.toHaveBeenCalled()
    })
  })

  describe('Export', () => {
    it('Primitive 컴포넌트들이 정상적으로 export 된다', () => {
      expect(TooltipPrimitiveRoot).toBeDefined()
      expect(TooltipPrimitiveTrigger).toBeDefined()
      expect(TooltipPrimitiveContent).toBeDefined()
      expect(TooltipPrimitiveArrow).toBeDefined()
      expect(TooltipPrimitiveClose).toBeDefined()
    })
  })
})
