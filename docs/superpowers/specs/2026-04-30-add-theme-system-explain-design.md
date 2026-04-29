# add-theme-system-explain 设计说明

## 背景

当前 `@sci-comp/core` 已经具备以 semantic token 为中心的主题系统实现，并通过 `createThemeTokens()`、`createAntdThemeTokens()` 与 `createThemeCssVariables()` 建立了单一主题源与双输出通道能力。但这些能力的说明仍然分散在 `README`、`getting-started` 片段和源码导出中，开发者难以快速建立统一心智模型，也缺少关于兼容变量、维护规则、推荐做法与验证方式的权威入口。

本次变更的目标不是扩展主题系统运行时能力，而是完善说明体系，让业务开发者能快速理解如何接入和覆盖主题，让维护者能理解 token 分层、兼容层与双输出 contract 的维护边界；同时通过一个解释型 playground 让这些规则变得可观察、可验证，而不是停留在静态文档层面。

## 目标

- 建立一个单一权威的主题系统说明入口，完整解释单一主题源、双输出通道、token 分层、兼容层与维护规则。
- 收敛 `README`、`getting-started` 与完整主题说明页的职责边界，避免内容重复与失真。
- 在文档站中提供一个主题 playground，让业务开发者可以直观看到主题覆盖效果，并让维护者查看 token / CSS variables 输出与兼容映射。
- 保持本次范围聚焦于“解释与验证现有主题系统”，而不是扩展为完整主题平台产品。

## 非目标

- 不新增或改变主题系统的运行时公开 API。
- 不在本次变更中承诺完整 dark mode、品牌多主题切换系统或主题导出能力。
- 不将 playground 扩展为独立工具产品，不实现 URL 持久化、localStorage 持久化、导入导出配置等重能力。
- 不重写所有组件文档页，仅在必要的入口位置补充主题系统说明的指引与分工。

## 信息架构设计

### 页面分工

#### 1. `packages/sci-comp-core/README.md`

只承担仓库级入口职责：

- 用一句话说明主题系统是什么
- 提供最小主题接入示例
- 引导用户前往文档站的完整主题系统说明

不在该 README 中承载完整兼容映射、维护规则或 FAQ，避免其膨胀成完整手册。

#### 2. `apps/sci-comp-documention/docs/guide/getting-started.md`

只承担 onboarding 职责：

- 安装
- 最小组件使用示例
- 最小主题接入示例
- 跳转到主题系统指南页

该页面不承载完整的 token 分层与维护规则，避免稀释“快速开始”的效率。

#### 3. `apps/sci-comp-documention/docs/guide/theme-system.md`

作为唯一权威来源，承载完整主题系统说明，并为两类受众提供分层阅读路径：

- 默认主路径：业务开发者
- 进阶路径：组件库维护者

该页面既要讲清楚主题系统的心智模型，也要通过 playground 让规则变得可观察与可验证。

### 导航结构

文档站指南导航应明确区分：

- 快速开始
- 主题系统
- 组件列表

“主题配置”不再单独承担完整主题系统说明职责，而是收敛为快速开始中的一个最小接入段落。开发者应能从稳定导航入口直接进入独立主题系统页。

## 主题系统页结构

### 1. 总览区

页面顶部先建立正确心智模型，回答三个问题：

- 这套主题系统解决什么问题
- 什么是单一主题源
- 为什么需要同时输出 AntD token 与 CSS variables

应通过简单流转图说明：
`themeOverrides -> createThemeTokens -> createAntdThemeTokens / createThemeCssVariables`

### 2. 快速接入区

紧接着提供最小可复制示例，展示：

- `ConfigProvider`
- `createAntdThemeTokens(themeOverrides)`
- `createThemeCssVariables(themeOverrides)`

并明确说明：同一份 `themeOverrides` 必须同时驱动两条通道，否则会导致 AntD wrapper 与 CSS Module wrapper 视觉结果分裂。

### 3. Playground 区

这是本次说明体系的核心增强部分。它不是独立产品，而是文档说明的一部分，用于解释和验证现有主题系统能力。

playground 默认服务业务开发者，展开后也能为维护者提供高级信息。布局采用“三段式”结构：

- 顶部说明条：说明 playground 正在演示统一 `themeOverrides` 如何同步影响双输出通道
- 中部双栏主工作区：左侧控制面板，右侧预览区
- 底部高级信息区：展示 token 输出、CSS variable 输出、兼容映射与使用建议

### 4. Token 分层说明区

说明 seed / semantic / component 三层 token 的职责边界，并围绕“什么时候改哪一层”组织内容，而不是简单罗列类型定义。

每层都应回答：

- 它负责什么
- 它不负责什么
- 常见修改场景是什么

### 5. 兼容层与迁移区

单独提供历史变量到规范化 `--sci-*` 变量的映射表，并明确：

- 旧变量仍然存在是为了迁移兼容
- 新代码默认只能消费 `--sci-*`
- 删除兼容层前必须确认存量样式已迁移完成

### 6. 维护规则区

面向维护者，说明：

- 何时新增 token
- 何时复用现有 semantic token
- 何时不应该把局部样式补丁纳入主题系统
- 调整主题映射后应如何验证

### 7. FAQ / 常见误区区

回答业务开发与维护中的高频问题，例如：

- 为什么只改 `ConfigProvider` 不够
- 为什么只改 CSS variables 不够
- 新组件应该使用旧变量还是新变量
- 什么时候才需要新增 component token

## Playground 详细设计

### 控制面板

控制面板只暴露最有解释力的最小主题输入集，不做全量 token 编辑器。

建议可编辑项：

- `colorPrimary`
- `colorDanger`
- `colorText`
- `colorBgContainer`
- `borderRadius`
- `controlHeightSM`
- `controlHeight`
- `controlHeightLG`

控件形式建议：

- 颜色：color picker + 文本输入
- 数值：slider + number input
- 预设主题按钮：默认主题、品牌色、高密度、大圆角、深色预演

其中“深色预演”仅作为说明当前体系具备扩展能力的视觉预设，不代表本次变更交付完整 dark mode。

### 预览区

预览区分为上下两层：

#### 业务化预览区

用于展示主题改动在真实业务工作台风格片段中的效果，建议包含：

- 顶部标题 / 状态区
- 主次按钮操作区
- 筛选输入区
- 信息卡片或结果区
- 进度反馈
- Modal 打开入口

其主要目标是帮助业务开发者感知品牌色、圆角和密度变化如何影响整体气质。

#### 基础组件基准对照区

用于精确展示主题变化对核心组件的影响，建议固定展示：

- Button：primary / secondary / danger / disabled
- Input：default / focused / disabled / invalid
- Form：基础表单块或列表项容器
- Modal：静态结构预览或可触发弹窗

业务化预览负责“真实感”，基准对照负责“准确性”。

### 高级信息区

底部以 tabs 或折叠区形式提供维护者视角信息：

1. `Theme overrides`
   - 展示当前正在编辑的统一输入对象，便于理解和复制。
2. `AntD token 输出`
   - 展示 `createAntdThemeTokens(themeOverrides)` 的关键结果摘要。
3. `CSS variables 输出`
   - 展示 `createThemeCssVariables(themeOverrides)` 的结果，并区分规范变量与兼容变量。
4. `变量映射说明`
   - 通过映射表说明历史变量到 `--sci-*` 变量的关系。
5. `使用建议`
   - 展示推荐、谨慎、不推荐做法，帮助团队统一使用方式。

## 模块拆分设计

不应把所有 playground 逻辑堆进文档 markdown 页面。文档内容层与演示逻辑层必须分离。

### 文档内容层

- `apps/sci-comp-documention/docs/guide/theme-system.md`

职责：

- 组织文案结构
- 定义章节顺序
- 挂载演示组件
- 提供最小代码块

### 演示逻辑层

建议在 `apps/sci-comp-documention/doc-components/theme-system/` 下拆分：

- `ThemePlayground.tsx`
- `ThemeControlPanel.tsx`
- `ThemePreviewWorkbench.tsx`
- `ThemePreviewBaseline.tsx`
- `ThemeInspector.tsx`

### 组件职责

#### `ThemePlayground.tsx`

- 维护 `themeOverrides` 状态
- 调用 `createThemeTokens()`、`createAntdThemeTokens()`、`createThemeCssVariables()`
- 将结果分发给控制区、预览区与高级信息区

#### `ThemeControlPanel.tsx`

- 负责颜色 / 数值输入
- 负责预设主题切换
- 负责重置默认值

#### `ThemePreviewWorkbench.tsx`

- 负责业务化预览结构
- 不承载复杂状态中心职责

#### `ThemePreviewBaseline.tsx`

- 负责基础组件标准对照展示
- 用于观察主题变化的准确性

#### `ThemeInspector.tsx`

- 负责展示 overrides、AntD token 摘要、CSS variables 输出、兼容映射与使用建议

## 主题应用方式

playground 顶层统一采用真实公开 API：

- 外层 `ConfigProvider` 使用 `createAntdThemeTokens(themeOverrides)`
- 内层预览容器使用 `createThemeCssVariables(themeOverrides)`

这样文档中的交互演示本身就能证明“双输出通道同步生效”，并与业务接入模型保持一致。

## 范围控制

本次 playground 明确不做：

- 任意 token schema 编辑器
- 主题导入 / 导出
- URL / localStorage 持久化
- 完整 dark mode 切换系统
- 所有组件的全量状态矩阵

这些能力会把说明页扩展成主题平台产品，超出本次 `add-theme-system-explain` 的目标边界。

## 测试与验收标准

### 内容验收

- 文档站存在独立主题系统指南页
- 指南导航可稳定进入该页
- README、getting-started、theme-system 三者的职责边界清晰且无明显重复冲突
- `apps/sci-comp-documention/README.md` 明确主题系统说明来源与维护分工

### Playground 验收

- 控制面板支持核心主题输入项调整
- 同时存在业务化预览区与基础组件基准对照区
- 高级信息区可查看 overrides、AntD token 输出、CSS variables 输出与兼容映射

### 双输出一致性验收

- 修改 `colorPrimary` 后，业务化预览与基准组件同步变化，AntD token 与 CSS variables 输出也同步更新
- 修改 `borderRadius` 后，Button / Input / Form / Modal 与工作台容器的圆角变化保持一致
- 修改 `controlHeight*` 后，密度变化能同时体现在预览区与基础组件区

### 兼容层验收

- 文档明确存在旧变量到新变量的映射表
- 文档明确声明旧变量仅用于迁移兼容，而不是新代码默认入口
- 高级信息区能清楚区分规范变量与兼容变量

### 工程验收

- `pnpm --filter sci-comp-documention typecheck`
- `pnpm --filter sci-comp-documention build`
- 人工操作 playground，确认控制项、预览区与高级信息区可正常联动

## 结论

推荐采用“单一权威说明入口 + 嵌入式解释型 playground”的方案。该方案既能帮助业务开发者快速理解和试用主题覆盖，也能为组件库维护者提供 token、变量映射与双输出一致性的观察界面；同时通过清晰的信息架构，把 README、快速开始和完整主题说明页的职责收敛到长期可维护的状态。
