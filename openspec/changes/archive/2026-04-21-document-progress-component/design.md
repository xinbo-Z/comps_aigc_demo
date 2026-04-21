## Context

`packages/sci-comp-core` 中的 Progress 组件已经新增，但文档站还没有同步补齐首页入口与足够完整的组件说明，因此当前问题不在组件实现本身，而在文档可发现性与使用指导不足。现有文档站采用 `docs/index.mdx` 作为首页入口，并由 `docs/HomePage.tsx` 承担首页内容渲染；单个组件文档则放在 `docs/components/*.mdx` 下，以静态说明 + `PreviewBlock` 演示的方式组织。

这意味着本次变更应完全沿用已有 Rspress 结构：在首页组件列表中加入 Progress，并在 `docs/components/progress.mdx` 中继续扩展文案、示例与使用场景说明，而不是新增新的首页区块、动态检索能力或独立的组件发现机制。

## Goals / Non-Goals

**Goals:**

- 在文档首页的组件入口中加入 Progress，使其能被首页直接发现
- 补全 Progress 组件页的说明内容，让用户能快速理解其用途与典型使用方式
- 保持 Progress 文档页与已有 Button / Input / Modal / Tabs 等页面的组织方式一致
- 让首页与 Progress 文档页形成清晰的跳转与浏览路径

**Non-Goals:**

- 不修改 `@sci-comp/core` 中 Progress 组件的运行时实现与类型设计
- 不引入新的文档框架能力、组件搜索系统或交互式 playground
- 不重构首页整体布局，仅做围绕 Progress 的最小必要补全
- 不在本次变更中新增与 Progress 无关的其他组件文档调整

## Decisions

### 1. 首页通过现有 `components` 列表补入 Progress，而不是新增独立推荐区

**Decision:** 在 `apps/sci-comp-documention/docs/HomePage.tsx` 的 `components` 数据源中新增 Progress 项，并复用现有组件卡片渲染逻辑展示。

**Why:**

- 首页当前已经以统一卡片列表承担“组件入口”职责，直接补入 Progress 可保持视觉与信息结构一致。
- 这是改动最小且可维护性最高的接入方式，不需要增加新的样式、组件或额外的首页逻辑。

**Alternatives considered:**

- 新增“最新组件”或“反馈类组件”专区：会放大首页信息层级，且当前只有单个 Progress 组件，不值得单独建区。
- 仅在 quick links 中补充链接：可发现性不如直接纳入组件主列表。

### 2. Progress 文档页继续沿用“概述 + 多个预览块 + 示例代码”的页面模式

**Decision:** 在 `apps/sci-comp-documention/docs/components/progress.mdx` 中保留现有预览结构，并补充更完整的组件定位、适用场景和常见用法示例。

**Why:**

- 当前组件文档普遍采用说明文案配合 demo 的方式，Progress 已有基础 demo，继续在此模式上扩展最符合现有文档风格。
- 这类文档结构能同时满足“快速浏览效果”和“复制示例代码”的需求，不必引入额外 API 表格或复杂章节结构。

**Alternatives considered:**

- 改造成以 API 清单为主的页面：当前文档站并未统一采用这种模式，会造成风格不一致。
- 只保留 demo，不补充场景说明：用户仍然难以判断何时使用 line、circle、dashboard 三种展示方式。

### 3. 文档补全聚焦“发现 + 理解”，不扩展到导航体系重构

**Decision:** 本次只补首页组件入口和 Progress 页面内容，不重构文档首页的 quick links、分类方式或站点导航结构。

**Why:**

- 用户需求明确聚焦于首页补齐组件和组件页内容补充，超出范围的导航重构会增加不必要改动。
- 现有首页结构已能承载组件发现，只需保证 Progress 与其他组件一致接入即可。

**Alternatives considered:**

- 顺手统一调整所有组件入口顺序或分组：收益有限，且容易引入与当前任务无关的变更。

## Risks / Trade-offs

- [首页只补入口但文案过于简略，用户仍不清楚 Progress 的典型用途] → Mitigation：在组件页补充适用场景与三类常见展示形态说明
- [Progress 页面示例增加后与现有 demo 导出不匹配] → Mitigation：优先复用现有 `doc-components/demos.tsx` 中已存在的 Progress demos，文档补充以说明和代码示例为主
- [首页描述与组件页描述不一致，造成认知偏差] → Mitigation：首页仅保留一句组件定位，详细差异统一在 Progress 文档页展开

## Migration Plan

1. 更新 `docs/HomePage.tsx`，将 Progress 纳入首页组件卡片列表
2. 更新 `docs/components/progress.mdx`，补充组件定位、适用场景与更完整的示例说明
3. 校验首页入口可跳转至 Progress 组件文档页，且文档内容与当前 demo 一致

本次变更仅涉及静态文档内容，无数据迁移需求。
如需回滚，移除首页中的 Progress 卡片并恢复 `progress.mdx` 的原有内容即可。

## Open Questions

- Progress 页面是否还需要补充 API 属性表（当前建议先不加，保持与现有组件页风格一致）
- 首页组件卡片顺序是否需要按新增时间调整，还是继续按现有基础组件顺序追加（当前建议按现有顺序直接补入）
