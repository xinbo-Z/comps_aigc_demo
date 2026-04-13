import { ConfigProvider } from 'antd'
import type { PropsWithChildren } from 'react'
import { createThemeTokens } from '../styles/theme'

export function TestProviders({ children }: PropsWithChildren) {
  const tokens = createThemeTokens()

  return <ConfigProvider theme={{ token: tokens }}>{children}</ConfigProvider>
}
