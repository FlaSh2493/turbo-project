import * as React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { cn } from '../../lib/utils'
import { modalOverlayVariants, modalContentVariants, modalBodyVariants } from './modal.css'
import { ScrollArea } from '../scroll-area'
import { ModalContext, useModalContext } from './modal.context'
import { VariantProps } from 'class-variance-authority'

// ============================================
// Root
// ============================================

export interface ModalPrimitiveRootProps extends RadixDialog.DialogProps {
  size?: VariantProps<typeof modalContentVariants>['size']
}

/**
 * Modal Root Component
 * 사용자 인터랙션을 위해 현재 화면 위에 오버라이드되는 대화 상자 컨테이너입니다.
 */
export const ModalPrimitiveRoot = ({ size = 'sm', ...props }: ModalPrimitiveRootProps) => {
  return (
    <ModalContext.Provider value={{ size }}>
      <RadixDialog.Root {...props} />
    </ModalContext.Provider>
  )
}

ModalPrimitiveRoot.displayName = 'ModalPrimitiveRoot'

// ============================================
// Trigger
// ============================================

export interface ModalPrimitiveTriggerProps extends React.ComponentPropsWithoutRef<
  typeof RadixDialog.Trigger
> {
  children: React.ReactNode
}

/**
 * Modal Trigger Component
 * 모달 대화 상자를 여는 버튼입니다.
 */
export const ModalPrimitiveTrigger = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Trigger>,
  ModalPrimitiveTriggerProps
>(({ children, className, ...props }, ref) => {
  return (
    <RadixDialog.Trigger ref={ref} data-slot="modal-trigger" className={className} {...props}>
      {children}
    </RadixDialog.Trigger>
  )
})

ModalPrimitiveTrigger.displayName = 'ModalPrimitiveTrigger'

// ============================================
// Portal
// ============================================

export interface ModalPrimitivePortalProps extends RadixDialog.DialogPortalProps {
  children: React.ReactNode
}

/**
 * Modal Portal Component
 * 모달 컨텐츠를 DOM의 다른 위치(기본적으로 body)로 렌더링합니다.
 */
export const ModalPrimitivePortal = ({ children, ...props }: ModalPrimitivePortalProps) => {
  return <RadixDialog.Portal {...props}>{children}</RadixDialog.Portal>
}

ModalPrimitivePortal.displayName = 'ModalPrimitivePortal'

// ============================================
// Overlay
// ============================================

export type ModalPrimitiveOverlayProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>

/**
 * Modal Overlay Component
 * 모달 뒷배경을 어둡게 처리하여 배경을 차단하는 레이어입니다.
 */
export const ModalPrimitiveOverlay = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  ModalPrimitiveOverlayProps
>(({ className, ...props }, ref) => {
  return (
    <RadixDialog.Overlay
      ref={ref}
      data-slot="modal-overlay"
      className={cn(modalOverlayVariants(), className)}
      {...props}
    />
  )
})

ModalPrimitiveOverlay.displayName = 'ModalPrimitiveOverlay'

// ============================================
// Content
// ============================================

export interface ModalPrimitiveContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>,
  'size'
> {
  children: React.ReactNode
}

/**
 * Modal Content Component
 * 모달의 실제 내용이 담기는 컨테이너입니다.
 */
export const ModalPrimitiveContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  ModalPrimitiveContentProps
>(({ className, children, ...props }, ref) => {
  const { size } = useModalContext()

  return (
    <RadixDialog.Content
      ref={ref}
      data-slot="modal-content"
      data-size={size}
      className={cn(modalContentVariants({ size, className }))}
      {...props}
    >
      {children}
    </RadixDialog.Content>
  )
})

ModalPrimitiveContent.displayName = 'ModalPrimitiveContent'

// ============================================
// Header
// ============================================

export interface ModalPrimitiveHeaderProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode
}

/**
 * Modal Header Component
 * 모달 상단의 제목 영역 컨테이너입니다.
 */
export const ModalPrimitiveHeader = React.forwardRef<HTMLDivElement, ModalPrimitiveHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="modal-header"
        className={cn('modal-header-base', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

ModalPrimitiveHeader.displayName = 'ModalPrimitiveHeader'

// ============================================
// Title
// ============================================

export interface ModalPrimitiveTitleProps extends React.ComponentPropsWithoutRef<
  typeof RadixDialog.Title
> {
  children: React.ReactNode
}

/**
 * Modal Title Component
 * 모달의 제목 텍스트를 표시합니다.
 */
export const ModalPrimitiveTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  ModalPrimitiveTitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <RadixDialog.Title
      ref={ref}
      data-slot="modal-title"
      className={cn('modal-title-base', className)}
      {...props}
    >
      {children}
    </RadixDialog.Title>
  )
})

ModalPrimitiveTitle.displayName = 'ModalPrimitiveTitle'

// ============================================
// Body
// ============================================

export interface ModalPrimitiveBodyProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'dir'
> {
  children: React.ReactNode
}

/**
 * Modal Body Component
 * 모달의 메인 컨텐츠 영역으로, 내용이 길어질 경우 스크롤을 지원합니다.
 */
export const ModalPrimitiveBody = React.forwardRef<
  React.ElementRef<typeof ScrollArea>,
  ModalPrimitiveBodyProps
>(({ className, children, ...props }, ref) => {
  const { size } = useModalContext()

  return (
    <ScrollArea
      ref={ref}
      data-slot="modal-body"
      data-size={size}
      className={cn(modalBodyVariants({ size, className }))}
      viewportClassName="modal-body-viewport [&>div]:flex-1 [&>div]:flex [&>div]:flex-col"
      {...props}
    >
      {children}
    </ScrollArea>
  )
})

ModalPrimitiveBody.displayName = 'ModalPrimitiveBody'

// ============================================
// Footer
// ============================================

export interface ModalPrimitiveFooterProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode
}

/**
 * Modal Footer Component
 * 모달 하단의 버튼이나 액션 영역 컨테이너입니다.
 */
export const ModalPrimitiveFooter = React.forwardRef<HTMLDivElement, ModalPrimitiveFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="modal-footer"
        className={cn('modal-footer-base', className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

ModalPrimitiveFooter.displayName = 'ModalPrimitiveFooter'

// ============================================
// Close
// ============================================

export interface ModalPrimitiveCloseProps extends React.ComponentPropsWithoutRef<
  typeof RadixDialog.Close
> {
  children?: React.ReactNode
}

/**
 * Modal Close Component
 * 모달을 닫는 기능이 포함된 대화 상자 닫기 요소입니다.
 */
export const ModalPrimitiveClose = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Close>,
  ModalPrimitiveCloseProps
>(({ children, className, ...props }, ref) => {
  return (
    <RadixDialog.Close
      ref={ref}
      data-slot="modal-close"
      className={cn('modal-close-base', className)}
      {...props}
    >
      {children}
    </RadixDialog.Close>
  )
})

ModalPrimitiveClose.displayName = 'ModalPrimitiveClose'

// ============================================
// Export
// ============================================

export const Modal = {
  Root: ModalPrimitiveRoot,
  Trigger: ModalPrimitiveTrigger,
  Portal: ModalPrimitivePortal,
  Overlay: ModalPrimitiveOverlay,
  Content: ModalPrimitiveContent,
  Header: ModalPrimitiveHeader,
  Title: ModalPrimitiveTitle,
  Body: ModalPrimitiveBody,
  Footer: ModalPrimitiveFooter,
  Close: ModalPrimitiveClose,
}
