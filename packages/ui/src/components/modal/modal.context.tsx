import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { modalContentVariants } from './modal.css'

export interface ModalContextValue {
  size: VariantProps<typeof modalContentVariants>['size']
}

export const ModalContext = React.createContext<ModalContextValue | undefined>(undefined)

export const useModalContext = () => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error('Modal components must be wrapped in <Modal.Root />')
  }
  return context
}
