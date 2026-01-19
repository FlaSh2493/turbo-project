import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ReactElement } from 'react'
import { Toaster } from '../toast'

export const CustomRenderer = (ui: ReactElement, options?: RenderOptions): RenderResult => {
  return render(
    <>
      {ui}
      <Toaster />
    </>,
    options,
  )
}
