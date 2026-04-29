# 主题系统

import { ThemePlayground } from '../../doc-components/theme-system/ThemePlayground'

本页用于说明 `@sci-comp/core` 的主题系统入口分工、双输出通道，以及当前开放的最小主题能力。

## 为什么需要统一主题入口

当前组件库的主题能力并不只作用于 Ant Design `ConfigProvider`，还会同时驱动组件内部消费的 CSS variables。为了避免业务侧只改一半、维护时只看一层，本页把主题输入、输出通道、兼容层和维护规则统一收敛到同一个入口。

## 当前入口分工

- `createThemeTokens`：基于默认 token 创建一份完整主题结果，适合查看统一主题对象
- `createAntdThemeTokens`：把同一份 overrides 映射为 Ant Design token
- `createThemeCssVariables`：把同一份 overrides 映射为组件内部使用的 CSS variables
- `defaultThemeTokens`：提供默认 seed token，适合作为覆盖时的参考基线
- `SciInstrumentThemeTokens`：约束主题对象字段结构，便于业务侧获得类型提示

## 最小接入示例

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

## 主题演示工作台

<ThemePlayground initialOverrides={{ colorPrimary: '#667eea', borderRadius: 10 }} />

## Token 分层

当前主题系统按照以下层次组织：

- seed token：主色、危险色、文本色、容器背景、圆角、控件高度等最小输入
- semantic token：文本、边框、表面、主操作、危险态等可复用语义层
- component token：Button、Input、Form 等组件的局部收敛结果

推荐优先改 seed token，让 semantic token 与 component token 自动联动，而不是直接绕过主题入口写局部样式。

## 兼容层与迁移规则

当前组件库在输出 `--sci-*` 规范变量的同时，仍会保留一层历史别名，方便渐进迁移：

- `--text-h` → `--sci-color-text-primary`
- `--text` → `--sci-color-text-secondary`
- `--bg` → `--sci-color-surface-base`
- `--border` → `--sci-color-border-base`
- `--accent` → `--sci-color-action-primary`
- `--danger` → `--sci-color-danger`

迁移时建议优先让新代码直接消费 `--sci-*`，旧变量只作为兼容输出，不再新增新的消费点。

## 维护规则

- 新增组件时优先复用现有 semantic token，不要直接硬编码颜色、圆角或尺寸
- 只有当多个组件都需要同一语义且现有 token 无法表达时，再考虑补充新的 token
- 修改主题 API、变量映射或推荐做法后，应同步检查 README、快速开始和本页是否一致
- 验证主题改动时，应同时观察 AntD wrapper 与 CSS variable 消费组件是否同步生效

## 常见问题

### 为什么不能只改 ConfigProvider？

因为当前组件库除了包装 AntD 组件，还包含消费 CSS variables 的样式层。只改 ConfigProvider 会导致一部分组件变了，另一部分维持旧样式。

### 应该优先覆盖 component token 还是 seed token？

优先覆盖 seed token。只有当某个组件确实需要局部收敛且无法通过现有语义层表达时，才考虑扩展 component token。

### 后续如果要做品牌换肤或暗色模式怎么办？

继续沿用同一份主题输入，再在 seed 与 semantic 层扩展映射规则即可，不需要重新发明新的主题入口。
