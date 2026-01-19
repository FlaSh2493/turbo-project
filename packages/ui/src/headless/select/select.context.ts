import * as React from 'react'
import type { SelectContextValue } from './use-select'

export const SelectContext = React.createContext<SelectContextValue | null>(null)

export const useSelectContext = () => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error('Select components must be used within SelectProvider')
  }
  return context
}
