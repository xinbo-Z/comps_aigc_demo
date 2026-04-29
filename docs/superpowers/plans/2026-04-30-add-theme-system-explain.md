# Add Theme System Explain Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为组件库补齐权威主题系统说明入口，并在文档站落地一个解释型 playground，帮助业务开发者理解接入方式，帮助维护者验证双输出通道与兼容层。

**Architecture:** 保持 `@sci-comp/core` 现有主题 API 为唯一事实来源，不新增平台化能力。文档站通过新增 `theme-system` 指南页与独立 `doc-components/theme-system/` 模块承载说明和交互演示；README、快速开始、主题系统页三者职责明确分工，测试与构建只验证现有主题主链路与文档集成。

**Tech Stack:** React 19、TypeScript、Rspress、Ant Design 6、@sci-comp/core、Vitest、React Testing Library

---

## File Map

### Existing files to modify

- `packages/sci-comp-core/README.md`
  - 精简为主题系统速览、最小接入示例、能力边界与文档入口。
- `apps/sci-comp-documention/README.md`
  - 补充主题系统说明来源与文档维护分工。
- `apps/sci-comp-documention/docs/guide/getting-started.md`
  - 保留最小接入示例，并将完整说明引导到主题系统页。
- `apps/sci-comp-documention/rspress.config.ts`
  - 接入 `theme-system` 导航与侧边栏入口。
- `apps/sci-comp-test/src/support/render.tsx`
  - 如需要，扩展 render 辅助以支持自定义 theme overrides 注入。
- `apps/sci-comp-test/src/styles/theme.test.ts`
  - 补充双输出摘要主链路测试。

### New files to create

- `apps/sci-comp-documention/docs/guide/theme-system.md`
  - 权威主题系统指南页。
- `apps/sci-comp-documention/doc-components/theme-system/ThemePlayground.tsx`
  - 顶层状态中心，统一管理 `themeOverrides` 与双输出结果。
- `apps/sci-comp-documention/doc-components/theme-system/ThemeControlPanel.tsx`
  - 核心主题输入项、预设主题、重置入口。
- `apps/sci-comp-documention/doc-components/theme-system/ThemePreviewWorkbench.tsx`
  - 业务化工作台预览区。
- `apps/sci-comp-documention/doc-components/theme-system/ThemePreviewBaseline.tsx`
  - Button / Input / Form / Modal 基准对照。
- `apps/sci-comp-documention/doc-components/theme-system/ThemeInspector.tsx`
  - overrides、AntD token 摘要、CSS variables 输出、兼容映射、推荐/禁止做法。
- `apps/sci-comp-documention/doc-components/theme-system/themePlaygroundData.ts`
  - 预设主题、兼容映射表、推荐/禁止做法等纯数据。
- `apps/sci-comp-test/src/styles/themePlayground.test.tsx`
  - 文档 playground 主链路测试。

### Existing patterns to reuse

- `apps/sci-comp-documention/doc-components/ComponentDoc.tsx`
  - 卡片式说明、代码/说明分区节奏。
- `apps/sci-comp-documention/doc-components/PreviewBlock.tsx`
  - 轻量预览容器。
- `apps/sci-comp-documention/doc-components/demos.tsx`
  - 业务化演示数据与组件组合方式。
- `apps/sci-comp-test/src/support/render.tsx`
  - ConfigProvider + CSS variables 注入模式。

---

### Task 1: 收敛指南结构与文档入口分工

**Files:**

- Modify: `packages/sci-comp-core/README.md`
- Modify: `apps/sci-comp-documention/README.md`
- Modify: `apps/sci-comp-documention/docs/guide/getting-started.md`
- Modify: `apps/sci-comp-documention/rspress.config.ts`
- Create: `apps/sci-comp-documention/docs/guide/theme-system.md`

- [ ] **Step 1: 先写出 theme-system 页面骨架草稿**

在 `apps/sci-comp-documention/docs/guide/theme-system.md` 写出最小骨架，先只放标题和章节锚点，避免后续导航与挂载点反复调整。

```md
# 主题系统

## 为什么需要统一主题入口

## 最小接入示例

## 主题演示工作台

## Token 分层

## 兼容层与迁移规则

## 维护规则

## 常见问题
```

- [ ] **Step 2: 运行文档站 typecheck 预期失败或通过，确认新页面路径有效**

Run: `pnpm --filter sci-comp-documention typecheck`
Expected: 如果尚未接入导入组件，应该 PASS；如果 markdown 中引用了未创建组件，应该报出明确缺失路径错误。

- [ ] **Step 3: 修改 Rspress 导航接入新页面**

更新 `apps/sci-comp-documention/rspress.config.ts` 的 guide 导航项，移除把完整主题说明压在“主题配置”锚点里的做法。

```ts
nav: [
  { text: '指南', link: '/guide/getting-started' },
  { text: '组件', link: '/components/button' },
],
sidebar: {
  '/guide/': [
    {
      text: '指南',
      items: [
        { text: '快速开始', link: '/guide/getting-started#快速开始' },
        { text: '主题系统', link: '/guide/theme-system' },
        { text: '组件列表', link: '/guide/getting-started#组件列表' },
      ],
    },
  ],
}
```

- [ ] **Step 4: 运行 typecheck，确认导航配置无语法问题**

Run: `pnpm --filter sci-comp-documention typecheck`
Expected: PASS

- [ ] **Step 5: 更新 getting-started 的分工，只保留最小主题接入**

把 `apps/sci-comp-documention/docs/guide/getting-started.md` 收敛为 onboarding 页面，新增主题系统页跳转说明。

````md
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
````

完整的 token 分层、兼容变量映射、维护规则与交互式演示，请查看[主题系统](/guide/theme-system)。

````

- [ ] **Step 6: 更新 core README，只保留速览与文档入口**

在 `packages/sci-comp-core/README.md` 新增主题系统节，不写 FAQ、映射表或 playground 细节。

```md
## 主题系统

`@sci-comp/core` 通过统一主题源同时输出：

- Ant Design `ConfigProvider` token
- core 内部 CSS variables

最小接入示例：

```tsx
import { ConfigProvider } from 'antd'
import {
  createAntdThemeTokens,
  createThemeCssVariables,
} from '@sci-comp/core'

const themeOverrides = {
  colorPrimary: '#667eea',
  borderRadius: 10,
}

<ConfigProvider theme={{ token: createAntdThemeTokens(themeOverrides) }}>
  <div style={createThemeCssVariables(themeOverrides)}>{children}</div>
</ConfigProvider>
````

完整说明请查看文档站的“主题系统”页面。

````

- [ ] **Step 7: 更新文档站 README，写清主题说明来源与维护边界**

在 `apps/sci-comp-documention/README.md` 增加维护说明，强调分工。

```md
## 主题系统说明维护

主题系统相关内容按以下职责维护：

- `packages/sci-comp-core/README.md`：主题能力速览与最小入口
- `docs/guide/getting-started.md`：首次接入示例
- `docs/guide/theme-system.md`：权威主题说明、兼容映射、维护规则与 playground

如果主题 API、变量映射或推荐做法发生变化，应同步检查以上三个位置是否仍然一致。
````

- [ ] **Step 8: 提交这一批文档入口与导航改动**

```bash
git add packages/sci-comp-core/README.md apps/sci-comp-documention/README.md apps/sci-comp-documention/docs/guide/getting-started.md apps/sci-comp-documention/docs/guide/theme-system.md apps/sci-comp-documention/rspress.config.ts
git commit -m "docs: add theme system guide entry points"
```

---

### Task 2: 为 playground 先写失败测试并扩展测试基座

**Files:**

- Modify: `apps/sci-comp-test/src/support/render.tsx`
- Create: `apps/sci-comp-test/src/styles/themePlayground.test.tsx`
- Test: `apps/sci-comp-test/src/styles/themePlayground.test.tsx`

- [ ] **Step 1: 先写 playground 主链路失败测试**

新建 `apps/sci-comp-test/src/styles/themePlayground.test.tsx`，先测试“同一份 overrides 同时驱动按钮文案展示、AntD token 摘要、CSS 变量摘要”。

```tsx
import { describe, expect, it } from 'vitest'
import { render, screen } from '../support/render'
import { ThemePlayground } from '../../../sci-comp-documention/doc-components/theme-system/ThemePlayground'

describe('ThemePlayground', () => {
  it('renders unified theme outputs from one override source', () => {
    render(
      <ThemePlayground
        initialOverrides={{ colorPrimary: '#667eea', borderRadius: 10 }}
      />,
    )

    expect(screen.getByText('主题演示工作台')).toBeInTheDocument()
    expect(screen.getByText('#667eea')).toBeInTheDocument()
    expect(screen.getByText('--sci-color-action-primary')).toBeInTheDocument()
    expect(screen.getByText('--accent')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 运行新测试，确认它先失败**

Run: `pnpm --filter sci-comp-test test -- themePlayground.test.tsx`
Expected: FAIL，报错 `Cannot find module ... ThemePlayground` 或缺少导出

- [ ] **Step 3: 扩展 render 辅助，支持可选 theme overrides 注入**

修改 `apps/sci-comp-test/src/support/render.tsx`，让测试可注入自定义 overrides，而不是只能使用默认主题。

```tsx
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
```

- [ ] **Step 4: 运行 render 相关测试，确认基座改动不破坏现有行为**

Run: `pnpm --filter sci-comp-test test -- render.test.tsx`
Expected: PASS

- [ ] **Step 5: 提交测试基座改动**

```bash
git add apps/sci-comp-test/src/support/render.tsx apps/sci-comp-test/src/styles/themePlayground.test.tsx
git commit -m "test: prepare theme playground test harness"
```

---

### Task 3: 实现 playground 纯数据与输入面板

**Files:**

- Create: `apps/sci-comp-documention/doc-components/theme-system/themePlaygroundData.ts`
- Create: `apps/sci-comp-documention/doc-components/theme-system/ThemeControlPanel.tsx`
- Test: `apps/sci-comp-test/src/styles/themePlayground.test.tsx`

- [ ] **Step 1: 创建 playground 数据文件，集中放预设与映射表**

在 `themePlaygroundData.ts` 中定义预设主题、兼容变量映射和建议列表，避免把纯数据散落在多个 TSX 文件里。

```ts
import type { SciInstrumentThemeTokens } from '@sci-comp/core'

export interface ThemePreset {
  key: string
  label: string
  overrides: Partial<SciInstrumentThemeTokens>
}

export const themePresets: ThemePreset[] = [
  {
    key: 'default',
    label: '默认主题',
    overrides: {},
  },
  {
    key: 'brand',
    label: '品牌色',
    overrides: {
      colorPrimary: '#667eea',
      borderRadius: 10,
    },
  },
  {
    key: 'dense',
    label: '高密度',
    overrides: {
      controlHeightSM: 26,
      controlHeight: 32,
      controlHeightLG: 40,
    },
  },
  {
    key: 'rounded',
    label: '大圆角',
    overrides: {
      borderRadius: 16,
    },
  },
]

export const legacyVariableMappings = [
  ['--text-h', '--sci-color-text-primary'],
  ['--text', '--sci-color-text-secondary'],
  ['--bg', '--sci-color-surface-base'],
  ['--border', '--sci-color-border-base'],
  ['--accent', '--sci-color-action-primary'],
  ['--danger', '--sci-color-danger'],
] as const

export const usageGuidance = {
  recommended: [
    '优先复用同一份 themeOverrides 驱动 AntD token 与 CSS variables。',
    '新增组件时优先消费 `--sci-*` 语义变量。',
  ],
  caution: [
    '局部主题嵌套前先确认是否真的需要局部品牌差异。',
    '增加 component token 前先确认 semantic token 是否足够表达。',
  ],
  avoid: [
    '不要只改 ConfigProvider 而忽略 CSS variables。',
    '不要在新代码中继续新增历史变量消费点。',
  ],
}
```

- [ ] **Step 2: 创建输入面板组件，先只实现最小交互**

在 `ThemeControlPanel.tsx` 中实现颜色与数值输入，不做持久化。

```tsx
import { Button, Input } from '@sci-comp/core'
import type { SciInstrumentThemeTokens } from '@sci-comp/core'
import { themePresets } from './themePlaygroundData'

interface ThemeControlPanelProps {
  overrides: Partial<SciInstrumentThemeTokens>
  onChange: (patch: Partial<SciInstrumentThemeTokens>) => void
  onReset: () => void
  onPresetSelect: (key: string) => void
}

export function ThemeControlPanel({
  overrides,
  onChange,
  onReset,
  onPresetSelect,
}: ThemeControlPanelProps) {
  return (
    <section>
      <h3>主题输入</h3>
      <Input
        label="主色"
        value={overrides.colorPrimary ?? ''}
        onChange={(event) => onChange({ colorPrimary: event.target.value })}
      />
      <Input
        label="危险色"
        value={overrides.colorDanger ?? ''}
        onChange={(event) => onChange({ colorDanger: event.target.value })}
      />
      <Input
        label="圆角"
        value={String(overrides.borderRadius ?? '')}
        onChange={(event) =>
          onChange({ borderRadius: Number(event.target.value) })
        }
      />
      <div>
        {themePresets.map((preset) => (
          <Button
            key={preset.key}
            variant="secondary"
            onClick={() => onPresetSelect(preset.key)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
      <Button variant="ghost" onClick={onReset}>
        重置
      </Button>
    </section>
  )
}
```

- [ ] **Step 3: 运行 playground 测试，确认它仍然失败但失败原因前进到缺少顶层组件**

Run: `pnpm --filter sci-comp-test test -- themePlayground.test.tsx`
Expected: FAIL，但错误应从“找不到数据/输入面板”推进到“找不到 ThemePlayground 或未渲染预期内容”。

- [ ] **Step 4: 提交纯数据与输入面板实现**

```bash
git add apps/sci-comp-documention/doc-components/theme-system/themePlaygroundData.ts apps/sci-comp-documention/doc-components/theme-system/ThemeControlPanel.tsx
git commit -m "feat: add theme playground control panel"
```

---

### Task 4: 实现预览区与 inspector，并让顶层 playground 跑通

**Files:**

- Create: `apps/sci-comp-documention/doc-components/theme-system/ThemePreviewWorkbench.tsx`
- Create: `apps/sci-comp-documention/doc-components/theme-system/ThemePreviewBaseline.tsx`
- Create: `apps/sci-comp-documention/doc-components/theme-system/ThemeInspector.tsx`
- Create: `apps/sci-comp-documention/doc-components/theme-system/ThemePlayground.tsx`
- Test: `apps/sci-comp-test/src/styles/themePlayground.test.tsx`

- [ ] **Step 1: 实现业务化预览区**

```tsx
import { Button, Input, Progress } from '@sci-comp/core'

export function ThemePreviewWorkbench() {
  return (
    <section>
      <h3>业务工作台预览</h3>
      <div>
        <div>
          <strong>设备巡检工作台</strong>
          <span>统一主题覆盖实时生效</span>
        </div>
        <div>
          <Button variant="primary">创建任务</Button>
          <Button variant="secondary">保存筛选</Button>
        </div>
        <div>
          <Input label="关键词" placeholder="搜索任务名称" />
        </div>
        <div>
          <p>今日完成度</p>
          <Progress percent={72} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 实现基础组件基准对照区**

```tsx
import { Button, Form, Input, Modal } from '@sci-comp/core'

export function ThemePreviewBaseline() {
  return (
    <section>
      <h3>基础组件基准对照</h3>
      <div>
        <Button variant="primary">主按钮</Button>
        <Button variant="secondary">次按钮</Button>
        <Button variant="danger">危险按钮</Button>
        <Button variant="ghost" disabled>
          禁用按钮
        </Button>
      </div>
      <div style={{ maxWidth: 360 }}>
        <Input label="默认输入" placeholder="请输入内容" />
        <Input
          label="异常输入"
          placeholder="请输入内容"
          invalid
          helperText="请输入有效内容"
        />
      </div>
      <Form style={{ maxWidth: 360 }}>
        <Form.Item label="任务名称" name="name">
          <Input placeholder="请输入任务名称" />
        </Form.Item>
      </Form>
      <Modal open={false} title="确认发布" footer={null}>
        <div>这里展示弹窗结构基准。</div>
      </Modal>
    </section>
  )
}
```

- [ ] **Step 3: 实现 inspector 区，先渲染结构化文本**

```tsx
import type { SciInstrumentThemeTokens } from '@sci-comp/core'
import { legacyVariableMappings, usageGuidance } from './themePlaygroundData'

interface ThemeInspectorProps {
  overrides: Record<string, unknown>
  antdTokens: Record<string, unknown>
  cssVariables: Record<string, string>
}

export function ThemeInspector({
  overrides,
  antdTokens,
  cssVariables,
}: ThemeInspectorProps) {
  return (
    <section>
      <h3>高级信息</h3>
      <pre>{JSON.stringify(overrides, null, 2)}</pre>
      <pre>{JSON.stringify(antdTokens, null, 2)}</pre>
      <pre>{JSON.stringify(cssVariables, null, 2)}</pre>
      <table>
        <tbody>
          {legacyVariableMappings.map(([legacyName, nextName]) => (
            <tr key={legacyName}>
              <td>{legacyName}</td>
              <td>{nextName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h4>推荐做法</h4>
        <ul>
          {usageGuidance.recommended.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: 实现顶层 ThemePlayground，并用真实双通道 API 组装**

```tsx
import { ConfigProvider } from 'antd'
import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  createAntdThemeTokens,
  createThemeCssVariables,
  createThemeTokens,
  type SciInstrumentThemeTokens,
} from '@sci-comp/core'
import { ThemeControlPanel } from './ThemeControlPanel'
import { ThemePreviewWorkbench } from './ThemePreviewWorkbench'
import { ThemePreviewBaseline } from './ThemePreviewBaseline'
import { ThemeInspector } from './ThemeInspector'
import { themePresets } from './themePlaygroundData'

interface ThemePlaygroundProps {
  initialOverrides?: Partial<SciInstrumentThemeTokens>
}

export function ThemePlayground({
  initialOverrides = {},
}: ThemePlaygroundProps) {
  const [overrides, setOverrides] =
    useState<Partial<SciInstrumentThemeTokens>>(initialOverrides)

  const themeTokens = useMemo(() => createThemeTokens(overrides), [overrides])
  const antdTokens = useMemo(
    () => createAntdThemeTokens(overrides),
    [overrides],
  )
  const cssVariables = useMemo(
    () => createThemeCssVariables(overrides),
    [overrides],
  )

  const handleChange = (patch: Partial<SciInstrumentThemeTokens>) => {
    setOverrides((current) => ({ ...current, ...patch }))
  }

  const handlePresetSelect = (key: string) => {
    const preset = themePresets.find((item) => item.key === key)
    setOverrides(preset?.overrides ?? {})
  }

  return (
    <section>
      <h2>主题演示工作台</h2>
      <p>
        同一份 themeOverrides 会同时驱动 Ant Design token 与 CSS variables。
      </p>
      <div>
        <ThemeControlPanel
          overrides={overrides}
          onChange={handleChange}
          onReset={() => setOverrides({})}
          onPresetSelect={handlePresetSelect}
        />
        <ConfigProvider theme={{ token: antdTokens }}>
          <div style={cssVariables as CSSProperties}>
            <ThemePreviewWorkbench />
            <ThemePreviewBaseline />
          </div>
        </ConfigProvider>
      </div>
      <ThemeInspector
        overrides={overrides}
        antdTokens={antdTokens}
        cssVariables={cssVariables}
      />
      <pre>{JSON.stringify(themeTokens, null, 2)}</pre>
    </section>
  )
}
```

- [ ] **Step 5: 运行 playground 测试，确认主链路通过**

Run: `pnpm --filter sci-comp-test test -- themePlayground.test.tsx`
Expected: PASS

- [ ] **Step 6: 提交 playground 主体实现**

```bash
git add apps/sci-comp-documention/doc-components/theme-system/ThemePlayground.tsx apps/sci-comp-documention/doc-components/theme-system/ThemeControlPanel.tsx apps/sci-comp-documention/doc-components/theme-system/ThemePreviewWorkbench.tsx apps/sci-comp-documention/doc-components/theme-system/ThemePreviewBaseline.tsx apps/sci-comp-documention/doc-components/theme-system/ThemeInspector.tsx apps/sci-comp-documention/doc-components/theme-system/themePlaygroundData.ts apps/sci-comp-test/src/styles/themePlayground.test.tsx
git commit -m "feat: add theme system playground"
```

---

### Task 5: 把 playground 挂进 theme-system 指南页并补全文案

**Files:**

- Modify: `apps/sci-comp-documention/docs/guide/theme-system.md`
- Modify: `apps/sci-comp-documention/doc-components/theme-system/ThemeInspector.tsx`
- Test: `apps/sci-comp-documention/docs/guide/theme-system.md`

- [ ] **Step 1: 在指南页中挂载 ThemePlayground 组件**

````md
# 主题系统

import { ThemePlayground } from '../../doc-components/theme-system/ThemePlayground'

## 为什么需要统一主题入口

`@sci-comp/core` 通过一套统一主题输入同时驱动 Ant Design token 与组件库内部 CSS variables。

```text
themeOverrides
  -> createThemeTokens()
  -> createAntdThemeTokens()
  -> createThemeCssVariables()
```
````

## 最小接入示例

```tsx
import { ConfigProvider } from 'antd'
import { createAntdThemeTokens, createThemeCssVariables } from '@sci-comp/core'

const themeOverrides = {
  colorPrimary: '#667eea',
  borderRadius: 10,
}
```

## 主题演示工作台

<ThemePlayground />
```

- [ ] **Step 2: 把 token 分层说明写完整，但只围绕现有体系**

在 `theme-system.md` 填充文案，明确三层职责。

```md
## Token 分层

### Seed token

用于品牌基础输入，例如主色、危险色、基础圆角、控件高度。

### Semantic token

用于表达跨组件共享的视觉语义，例如文本、表面、边框、操作色与危险态。

### Component token

仅用于承接少量组件级派生值，不应替代全局语义层。
```

- [ ] **Step 3: 写出兼容映射、维护规则与 FAQ**

```md
## 兼容层与迁移规则

- 新代码默认使用 `--sci-*` 变量。
- 历史变量保留仅用于迁移兼容。
- 删除兼容层前必须确认存量样式已完成迁移。

## 维护规则

- 新增 token 前，先判断现有 semantic token 是否已足够表达。
- 修改主题映射后，必须同时检查 AntD token 与 CSS variables 结果。

## 常见问题

### 为什么只改 ConfigProvider 不够？

因为 core 内部仍存在依赖 CSS variables 的样式消费层。
```

- [ ] **Step 4: 运行文档站 typecheck，确保 markdown 与 TSX 挂载正确**

Run: `pnpm --filter sci-comp-documention typecheck`
Expected: PASS

- [ ] **Step 5: 提交指南页与文案完整化改动**

```bash
git add apps/sci-comp-documention/docs/guide/theme-system.md apps/sci-comp-documention/doc-components/theme-system/ThemeInspector.tsx
git commit -m "docs: add theme system guide content"
```

---

### Task 6: 补双输出摘要测试并做最终验证

**Files:**

- Modify: `apps/sci-comp-test/src/styles/theme.test.ts`
- Test: `apps/sci-comp-test/src/styles/theme.test.ts`
- Test: `apps/sci-comp-test/src/styles/themePlayground.test.tsx`

- [ ] **Step 1: 为 theme.ts 增加双输出摘要断言**

在 `apps/sci-comp-test/src/styles/theme.test.ts` 补充断言，验证同一份 overrides 同时影响 AntD token 与 CSS variables。

```ts
it('keeps antd tokens and css variables aligned for the same override source', () => {
  const overrides = {
    colorPrimary: '#667eea',
    borderRadius: 10,
    controlHeight: 40,
  }

  const antdTokens = createAntdThemeTokens(overrides)
  const cssVariables = createThemeCssVariables(overrides)

  expect(antdTokens.colorPrimary).toBe('#667eea')
  expect(antdTokens.borderRadius).toBe(10)
  expect(antdTokens.controlHeight).toBe(40)
  expect(cssVariables['--sci-color-action-primary']).toBe('#667eea')
  expect(cssVariables['--sci-radius-control']).toBe('10px')
  expect(cssVariables['--sci-size-control-md']).toBe('40px')
})
```

- [ ] **Step 2: 运行主题相关测试**

Run: `pnpm --filter sci-comp-test test -- theme.test.ts themePlayground.test.tsx render.test.tsx`
Expected: PASS

- [ ] **Step 3: 运行文档站 typecheck 和 build**

Run: `pnpm --filter sci-comp-documention typecheck && pnpm --filter sci-comp-documention build`
Expected: PASS

- [ ] **Step 4: 人工检查文档分工与 playground 联动**

手工检查以下点：

- `README` / `getting-started` / `theme-system` 是否各司其职
- 指南导航是否能直接进入“主题系统”
- playground 控制项修改 `colorPrimary`、`borderRadius`、`controlHeight` 后，工作台预览与基础组件对照是否同步变化
- inspector 是否能看到 `--sci-color-action-primary` 与 `--accent` 两类输出

Expected: 页面可访问、交互正常、文案清晰

- [ ] **Step 5: 提交最终验证与收尾改动**

```bash
git add apps/sci-comp-test/src/styles/theme.test.ts apps/sci-comp-test/src/styles/themePlayground.test.tsx apps/sci-comp-documention/docs/guide/theme-system.md apps/sci-comp-documention/rspress.config.ts
git commit -m "test: verify theme system documentation flow"
```

---

## Self-Review Checklist

- Spec coverage:
  - 主题系统权威入口 → Task 1 / Task 5
  - theme-system 指南页与导航 → Task 1 / Task 5
  - 解释型 playground → Task 3 / Task 4
  - README / getting-started 分工 → Task 1
  - 双输出验证 → Task 2 / Task 6
- Placeholder scan:
  - 无 `TODO` / `TBD`
  - 每个代码步骤都提供了实际片段
  - 每个验证步骤都提供了实际命令与预期
- Type consistency:
  - 统一使用 `ThemePlayground`、`ThemeControlPanel`、`ThemeInspector`
  - 统一使用 `themeOverrides` 命名
  - 统一复用 `createAntdThemeTokens()` 与 `createThemeCssVariables()`
