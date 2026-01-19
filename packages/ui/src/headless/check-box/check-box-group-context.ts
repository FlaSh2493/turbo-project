import { createContext, useContext } from 'react'
import type { UseCheckBoxGroupReturn } from './use-check-box-group'

export type CheckBoxGroupContextValue = UseCheckBoxGroupReturn<string>

export const CheckBoxGroupContext = createContext<CheckBoxGroupContextValue | null>(null)

export const useCheckBoxGroupContext = () => {
  return useContext(CheckBoxGroupContext)
}
