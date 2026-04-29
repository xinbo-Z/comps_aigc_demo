import { ConfigProvider } from 'antd'
import {
  render as testingLibraryRender,
  type RenderOptions,
} from '@testing-library/react'
import type { CSSProperties, PropsWithChildren, ReactElement } from 'react'
import { createAntdThemeTokens, createThemeCssVariables } from '@sci-comp/core'

const themeTokens = createAntdThemeTokens()
const themeCssVariables = createThemeCssVariables()

export function TestProviders({ children }: PropsWithChildren) {
  return (
    <ConfigProvider theme={{ token: themeTokens }}>
      <div style={themeCssVariables as CSSProperties}>{children}</div>
    </ConfigProvider>
  )
}

export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return testingLibraryRender(ui, {
    wrapper: TestProviders,
    ...options,
  })
}

export * from '@testing-library/react'
