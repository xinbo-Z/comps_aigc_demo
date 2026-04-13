import { createElement } from 'react'
import type { Preview } from '@storybook/react'
import { ConfigProvider } from 'antd'
import { createThemeTokens } from '../src/styles/theme'

const preview: Preview = {
  decorators: [
    (Story) =>
      createElement(
        ConfigProvider,
        { theme: { token: createThemeTokens() } },
        createElement(Story),
      ),
  ],
}

export default preview
