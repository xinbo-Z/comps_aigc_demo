## 快速开始

欢迎使用 SCI Comp 组件库！这是一个基于 Ant Design v6 封装的通用组件库，旨在帮助开发者快速构建高质量的企业级应用。

### 安装

使用 npm 或 yarn 安装：

```bash
npm install sci-comp
# 或
yarn add sci-comp
```

## 快速上手

在你的项目中引入组件：

```tsx
import { Button } from 'sci-comp'

function App() {
  return <Button type="primary">点击我</Button>
}
```

### 主题配置

SCI Comp 支持通过统一主题源同时驱动 Ant Design token 与组件库内部 CSS 变量：

```tsx
import { ConfigProvider } from 'antd'
import {
  Button,
  createAntdThemeTokens,
  createThemeCssVariables,
} from '@sci-comp/core'

const themeOverrides = {
  colorPrimary: '#667eea',
  borderRadius: 10,
}

function App() {
  return (
    <ConfigProvider theme={{ token: createAntdThemeTokens(themeOverrides) }}>
      <div style={createThemeCssVariables(themeOverrides)}>
        <Button variant="primary">自定义主题</Button>
      </div>
    </ConfigProvider>
  )
}
```

## 组件列表

- **Button** - 按钮组件
- **Input** - 输入框组件
- **Table** - 表格组件
- **Form** - 表单组件
- **Modal** - 模态框组件
- **Tabs** - 标签页组件
- **Progress** - 进度条组件

查看左侧导航栏了解更多组件详情。
