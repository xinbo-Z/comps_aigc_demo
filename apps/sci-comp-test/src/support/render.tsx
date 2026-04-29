import { ConfigProvider } from 'antd'
import {
  render as testingLibraryRender,
  type RenderOptions,
} from '@testing-library/react'
import type { CSSProperties, PropsWithChildren, ReactElement } from 'react'
import {
  createAntdThemeTokens,
  createThemeCssVariables,
  type SciInstrumentThemeTokens,
} from '@sci-comp/core'

interface TestProvidersProps extends PropsWithChildren {
  overrides?: Partial<SciInstrumentThemeTokens>
}

export function TestProviders({ children, overrides }: TestProvidersProps) {
  const themeTokens = createAntdThemeTokens(overrides)
  const themeCssVariables = createThemeCssVariables(overrides)

  return (
    <ConfigProvider theme={{ token: themeTokens }}>
      <div style={themeCssVariables as CSSProperties}>{children}</div>
    </ConfigProvider>
  )
}

export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    themeOverrides?: Partial<SciInstrumentThemeTokens>
  },
) {
  const { themeOverrides, ...rest } = options ?? {}

  return testingLibraryRender(ui, {
    wrapper: ({ children }) => (
      <TestProviders overrides={themeOverrides}>{children}</TestProviders>
    ),
    ...rest,
  })
}

export * from '@testing-library/react'
