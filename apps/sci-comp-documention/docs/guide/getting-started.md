## 快速开始

本页用于说明如何在业务项目中接入 `@sci-comp/core`，并完成最小主题配置。

## 安装

在业务项目中安装组件库及其基础依赖：

```bash
pnpm add @sci-comp/core antd react react-dom
```

## 最小接入示例

下面示例演示如何用同一份主题输入同时驱动 Ant Design token 与组件库内部 CSS variables。

```tsx
import { ConfigProvider } from 'antd'
import {
  Button,
  createAntdThemeTokens,
  createThemeCssVariables,
} from '@sci-comp/core'

const themeOverrides = {
  colorPrimary: '#0052d9',
  borderRadius: 10,
}

export function App() {
  return (
    <ConfigProvider theme={{ token: createAntdThemeTokens(themeOverrides) }}>
      <div style={createThemeCssVariables(themeOverrides)}>
        <Button variant="primary">自定义主题</Button>
      </div>
    </ConfigProvider>
  )
}
```

如果你想继续了解主题 token 的职责划分、兼容映射、维护规则和交互式演示，请前往：[主题系统](/guide/theme-system)。

## 下一步

- 查看[主题系统](/guide/theme-system)，了解主题入口分工、双输出通道与 token 约束
- 查看[组件导航](/guide/components)，了解所有可用组件并选择需要接入的组件
