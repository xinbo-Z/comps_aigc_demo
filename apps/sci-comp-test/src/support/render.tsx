import { ConfigProvider } from 'antd'
import {
  render as testingLibraryRender,
  type RenderOptions,
} from '@testing-library/react'
import type { PropsWithChildren, ReactElement } from 'react'
import { createThemeTokens } from '@sci-comp/core'

const themeTokens = createThemeTokens()

export function TestProviders({ children }: PropsWithChildren) {
  return (
    <ConfigProvider theme={{ token: themeTokens }}>{children}</ConfigProvider>
  )
}

export function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return testingLibraryRender(ui, {
    wrapper: TestProviders,
    ...options,
  })
}

export * from '@testing-library/react'
