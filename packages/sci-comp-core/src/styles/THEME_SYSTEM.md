# 主题系统开发说明

本文档详细说明了主题系统的架构、使用方法以及如何扩展主题系统。

## 目录

1. [架构概览](#架构概览)
2. [业务使用](#业务使用)
3. [新增 Token](#新增-token)
4. [新增组件](#新增组件)
5. [维护规范](#维护规范)

---

## 架构概览

### 三层 Token 架构

主题系统采用三层 Token 架构，提供了清晰的抽象层次：

```
Seed Tokens (种子层)
    ↓
Semantic Tokens (语义层)
    ↓
Component Tokens (组件层)
```

#### 1. Seed Tokens（种子 Token）

最基础的设计变量，业务可以直接配置。

**包含的 Token：**

| Token 名称       | 说明         | 类型   |
| ---------------- | ------------ | ------ |
| colorPrimary     | 主色调       | string |
| colorDanger      | 危险色       | string |
| colorText        | 文本颜色     | string |
| colorBgContainer | 容器背景色   | string |
| borderRadius     | 通用圆角     | number |
| controlHeightSM  | 小号控制高度 | number |
| controlHeight    | 默认控制高度 | number |
| controlHeightLG  | 大号控制高度 | number |

#### 2. Semantic Tokens（语义 Token）

基于 Seed Tokens 自动计算，具有明确的语义含义，直接被组件使用。

**包含的 Token：**

- 颜色类：colorTextPrimary, colorTextSecondary, colorTextDisabled, colorTextInverse
- 表面色：colorSurfaceBase, colorSurfaceMuted, colorSurfaceElevated
- 边框色：colorBorderBase, colorBorderFocus
- 操作色：colorActionPrimary, colorActionPrimaryHover, colorActionPrimarySoft, colorActionPrimaryText
- 危险色：colorDangerSoft, colorDangerText
- 尺寸：radiusControl, sizeControlSm, sizeControlMd, sizeControlLg

#### 3. Component Tokens（组件 Token）

针对特定组件的局部配置，直接映射到具体组件的样式。

**包含的 Token：**

- 按钮：buttonRadius, buttonHeightSm, buttonHeightMd, buttonHeightLg
- 输入框：inputRadius, inputHeight
- 表单：formListItemRadius

### 双输出通道

主题系统采用"单一主题源，双输出通道"的架构：

```
业务配置 (overrides)
    ↓
createThemeTokens()
    ├→ createAntdThemeTokens() → Ant Design 组件
    └→ createThemeCssVariables() → 自定义 CSS 组件
```

这种架构确保了：

1. Ant Design 组件和自定义 CSS 组件使用同一份主题配置
2. 视觉风格高度一致
3. 修改一处配置，全系统生效

---

## 业务使用

### 最小接入示例

```tsx
import { ConfigProvider } from 'antd'
import {
  Button,
  createAntdThemeTokens,
  createThemeCssVariables,
} from '@sci-comp/core'

// 定义主题覆盖配置
const themeOverrides = {
  colorPrimary: '#667eea', // 可以使用命名颜色，如 'blue'
  borderRadius: 12,
}

export function App() {
  return (
    {/* 通道1：配置 Ant Design */}
    <ConfigProvider theme={{ token: createAntdThemeTokens(themeOverrides) }}>
      {/* 通道2：应用 CSS 变量 */}
      <div style={createThemeCssVariables(themeOverrides)}>
        <Button variant="primary">自定义主题按钮</Button>
      </div>
    </ConfigProvider>
  )
}
```

### 支持的颜色格式

主题系统支持多种颜色格式：

```tsx
const theme = {
  // 命名颜色（推荐，可读性好）
  colorPrimary: 'blue',
  colorDanger: 'red',

  // 十六进制颜色（标准）
  colorText: '#1f1f1f',

  // 三位简写
  colorBgContainer: '#fff',

  // RGB 格式
  colorBorder: 'rgb(0, 100, 200)',

  // RGBA 格式
  colorShadow: 'rgba(0, 0, 0, 0.1)',
}
```

### 覆盖任意层级的 Token

除了覆盖 Seed Tokens，还可以直接覆盖 Semantic Tokens 或 Component Tokens：

```tsx
const themeOverrides = {
  colorPrimary: 'blue', // Seed Token

  // 直接覆盖 Semantic Token
  colorActionPrimaryHover: '#5568d3',

  // 直接覆盖 Component Token
  buttonRadius: 16,
}
```

### 在 CSS 中使用主题变量

自定义组件的 CSS 中使用 `--sci-` 前缀的变量：

```css
.button {
  border-radius: var(--sci-button-radius);
  background-color: var(--sci-color-action-primary);
  color: var(--sci-color-action-primary-text);
  min-height: var(--sci-button-height-md);
}

.button:hover {
  background-color: var(--sci-color-action-primary-hover);
}
```

---

## 新增 Token

### 新增 Seed Token

步骤1：更新类型定义（`tokens.ts`）

```typescript
export interface SciInstrumentThemeSeedTokens {
  // ... 现有 token
  colorSuccess: string // 新增：成功色
}
```

步骤2：设置默认值（`tokens.ts`）

```typescript
export const defaultThemeSeedTokens: SciInstrumentThemeSeedTokens = {
  // ... 现有默认值
  colorSuccess: '#10b981', // 新增：成功色默认值
}
```

步骤3：更新 `pickSeedOverrides` 函数（`theme.ts`）

```typescript
function pickSeedOverrides(
  overrides: Partial<SciInstrumentThemeTokens>,
): Partial<SciInstrumentThemeSeedTokens> {
  const {
    // ... 现有 token
    colorSuccess, // 新增
  } = overrides

  return {
    // ... 现有返回值
    ...(colorSuccess !== undefined ? { colorSuccess } : {}), // 新增
  }
}
```

步骤4：计算 Semantic Token（`theme.ts`）

```typescript
function createSemanticTokens(
  seedTokens: SciInstrumentThemeSeedTokens,
): SciInstrumentThemeSemanticTokens {
  return {
    // ... 现有 token
    colorSuccess: seedTokens.colorSuccess, // 新增：直接使用 seed
    colorSuccessSoft: withAlpha(seedTokens.colorSuccess, 0.14), // 新增：计算柔和色
  }
}
```

步骤5：添加到 CSS 变量映射（`theme.ts`）

```typescript
const variableMap: Record<string, ThemeTokenKey> = {
  // ... 现有变量
  '--sci-color-success': 'colorSuccess',
  '--sci-color-success-soft': 'colorSuccessSoft',
}
```

步骤6：添加到 Ant Design 映射（`theme.ts`）（如需要）

```typescript
export function createAntdThemeTokens(
  overrides: Partial<SciInstrumentThemeTokens> = {},
): AntdThemeTokens {
  const tokens = createThemeTokens(overrides)

  return {
    // ... 现有映射
    colorSuccess: tokens.colorSuccess,
  }
}
```

### 新增 Semantic Token

步骤1：更新类型定义（`tokens.ts`）

```typescript
export interface SciInstrumentThemeSemanticTokens {
  // ... 现有 token
  colorWarn: string // 新增：警告色
}
```

步骤2：计算 Token（`theme.ts`）

```typescript
function createSemanticTokens(
  seedTokens: SciInstrumentThemeSeedTokens,
): SciInstrumentThemeSemanticTokens {
  return {
    // ... 现有 token
    colorWarn: mixColors(seedTokens.colorPrimary, seedTokens.colorDanger, 0.5), // 新增：混合计算
  }
}
```

步骤3：添加到 CSS 变量映射（`theme.ts`）

```typescript
const variableMap: Record<string, ThemeTokenKey> = {
  // ... 现有变量
  '--sci-color-warn': 'colorWarn',
}
```

---

## 新增组件

### 步骤1：新增 Component Tokens

在 `tokens.ts` 中添加新组件的 token：

```typescript
export interface SciInstrumentThemeComponentTokens {
  // ... 现有 token

  // 新增：标签组件
  tagRadius: number
  tagHeightSm: number
  tagHeightMd: number
  tagHeightLg: number
}
```

### 步骤2：计算 Component Tokens

在 `theme.ts` 中实现计算逻辑：

```typescript
function createComponentTokens(
  semanticTokens: SciInstrumentThemeSemanticTokens,
): SciInstrumentThemeComponentTokens {
  return {
    // ... 现有 token

    // 新增：标签组件
    tagRadius: semanticTokens.radiusControl,
    tagHeightSm: semanticTokens.sizeControlSm,
    tagHeightMd: semanticTokens.sizeControlMd,
    tagHeightLg: semanticTokens.sizeControlLg,
  }
}
```

### 步骤3：添加到 CSS 变量映射

在 `theme.ts` 中添加变量映射：

```typescript
const variableMap: Record<string, ThemeTokenKey> = {
  // ... 现有变量

  // 新增：标签组件
  '--sci-tag-radius': 'tagRadius',
  '--sci-tag-height-sm': 'tagHeightSm',
  '--sci-tag-height-md': 'tagHeightMd',
  '--sci-tag-height-lg': 'tagHeightLg',
}
```

### 步骤4：实现组件

创建新组件并使用主题变量：

```tsx
import * as React from 'react'
import styles from './Tag.module.css'

interface TagProps {
  children: React.ReactNode
}

export function Tag({ children }: TagProps) {
  return <span className={styles.tag}>{children}</span>
}
```

```css
.tag {
  border-radius: var(--sci-tag-radius);
  background-color: var(--sci-color-surface-muted);
  min-height: var(--sci-tag-height-md);
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  font-size: 14px;
}
```

---

## 维护规范

### Token 命名规范

#### 颜色 Token

使用 `color` + `语义` 的格式：

```typescript
// ✅ 推荐
colorPrimary
colorSuccess
colorTextPrimary
colorBgContainer
colorBorderBase

// ❌ 不推荐
primaryColor
successColor
textMain
```

#### 尺寸 Token

使用 `radius`/`size`/`height` + `组件` + `修饰` 的格式：

```typescript
// ✅ 推荐
radiusControl
buttonHeightSm
inputHeight

// ❌ 不推荐
controlRadius
smallButtonHeight
heightOfInput
```

### 新增修改检查清单

在修改主题系统前，请确认以下清单：

- [ ] 在 `tokens.ts` 中更新了类型定义
- [ ] 在 `defaultThemeSeedTokens` 中设置了默认值
- [ ] 在 `createSemanticTokens` 中实现了计算逻辑（如需要）
- [ ] 在 `createComponentTokens` 中实现了计算逻辑（如需要）
- [ ] 在 `variableMap` 中添加了 CSS 变量映射
- [ ] 在 `createAntdThemeTokens` 中添加了 Ant Design 映射（如需要）
- [ ] 在 `pickSeedOverrides` 中添加了提取逻辑（如需要）
- [ ] 更新了相关文档
- [ ] 添加或更新了单元测试

### 测试要求

每个新功能都需要添加对应的单元测试：

```typescript
import { describe, expect, it } from 'vitest'
import { createThemeTokens, createThemeCssVariables } from '@sci-comp/core'

describe('新增功能', () => {
  it('应正确计算新 token', () => {
    const tokens = createThemeTokens({ colorSuccess: 'green' })
    expect(tokens.colorSuccess).toBe('green')
    expect(tokens.colorSuccessSoft).toBe('rgba(0, 128, 0, 0.14)')
  })

  it('应正确生成 CSS 变量', () => {
    const variables = createThemeCssVariables({ colorSuccess: 'green' })
    expect(variables['--sci-color-success']).toBe('green')
  })
})
```

---

## 常见问题

### Q1: 为什么需要三层 Token 架构？

三层架构提供了清晰的抽象层次：

- **Seed Token** 让业务可以简单配置，不需要关心细节
- **Semantic Token** 让系统内部使用统一的语义，避免重复
- **Component Token** 让每个组件可以有自己的特定配置，灵活度高

### Q2: 如何预览主题效果？

使用文档中的主题预览功能：

1. 访问文档网站
2. 导航到"主题系统"页面
3. 在侧边栏的控制面板中调整主题参数
4. 实时查看预览效果

### Q3: 如何从旧版本升级？

旧版本使用 `--accent`, `--text` 等变量，新版本仍然兼容这些变量名。
推荐逐步迁移到 `--sci-` 前缀的新变量名。

### Q4: 深色模式如何实现？

深色模式可以通过覆盖 seed token 来实现：

```typescript
const darkThemeOverrides = {
  colorText: '#ffffff',
  colorBgContainer: '#1f1f1f',
  colorPrimary: '#667eea',
}
```

---

## 相关文件

- `tokens.ts` - Token 类型定义和默认值
- `theme.ts` - 主题系统核心逻辑
- `THEME_SYSTEM.md` - 本文件，开发说明文档

## 更新历史

- 2026-05-05 - 新增完整的主题系统开发文档
- 2026-04-30 - 新增对命名颜色、RGB 格式的支持
- 2026-04-28 - 完成基础三层 Token 架构
