## Context

当前 `apps/sci-comp-documention` 已经通过 `ComponentDocPage` + `component-doc-data/*.tsx` 的方式，把 Button、Input、Table 等组件页统一收敛到同一套结构化骨架中：组件定义、适用场景、案例演示、常用 API、选型建议和封装说明已经具备基本能力。但这套骨架仍停留在“React 组件内部自带标题与导航”的阶段，无法稳定接入 Rspress 原生右侧 On This Page，也因此难以与现有 guide 页保持一致的阅读体验。

随着高频组件页持续扩展，当前问题已经不是单页文案不够，而是共享文档展示层和标题组织方式都开始成为维护负担：

- 读者无法像 guide 页一样通过右侧原生目录快速定位“组件定义”“适用场景”“案例演示”等章节。
- 如果继续依赖 React 组件运行时产出的标题，Rspress 无法稳定在编译阶段提取完整目录树。
- 示例卡片、说明面板、代码块、API 表格在暗黑模式下语义层次不稳定，局部可读性下降。
- Button / Input / Table 已具备较丰富案例，但选型建议、非适用场景、封装边界与组合能力说明仍不够强，难以承担“决策型页面”职责。

本次变更只聚焦组件文档页内部的结构升级与展示语义收敛，不改造整站首页、全局 sidebar 或 `@sci-comp/core` 运行时 API。目标是在现有结构上做一次可控增强，让组件页像 guide 页一样使用 Rspress 原生右侧 On This Page，同时保持共享骨架与后续扩展样板。

### 组件层级图

```text
components/*.mdx
├── # ComponentName
├── ## 组件定义
│   └── <ComponentDocDefinition />
├── ## 适用场景
│   └── <ComponentDocScenarios />
├── ## 案例演示
│   ├── ### Example Title 1
│   │   └── <ComponentDocExampleBlock example=... />
│   ├── ### Example Title 2
│   │   └── <ComponentDocExampleBlock example=... />
│   └── ...
├── ## 常用属性 API
│   └── <ComponentDocApi />
├── ## 选型建议 (optional)
│   └── <ComponentDocSelectionTips />
└── ## 封装说明
    └── <ComponentDocWrapperNotes />
```

### 状态管理方案

本次不引入 Zustand 或新的全局状态中心，继续采用局部 `useState` + 派生数据的轻量方案：

- `ComponentDoc.tsx` 退回内容骨架渲染器，不再在内部维护章节目录或标题树。
- `ExampleCard` 继续使用局部 `useState` 管理代码展开 / 收起与复制反馈。
- 目录生成交给 MDX 标题树与 Rspress 编译期能力，不引入额外滚动同步状态机。
- 主题展示继续复用现有 `createThemeCssVariables()` 与 Rspress `--rp-c-*` 变量，不新增第二套主题状态入口。

## Goals / Non-Goals

**Goals:**

- 让组件文档页使用与 guide 页一致的 Rspress 原生右侧 On This Page，而不是继续维护自定义导航组件。
- 将组件定义、适用场景、案例演示、常用属性 API、选型建议与封装说明迁移为 MDX 顶层标准标题结构。
- 复用 `examples[].id` 为案例卡片保留稳定子锚点，使目录跳转与外部链接仍可稳定定位。
- 收敛共享文档展示层在亮色 / 暗色主题下的语义层次，统一章节卡片、示例卡片、说明面板、代码块与 API 表格的可读性。
- 以 Button、Input、Table 三页为样板，强化选型建议、适用边界、封装说明与组合建议，提升高频组件页的决策价值。
- 复用现有测试基座，为稳定锚点、主题注入和文档页基础结构渲染补最小必要验证。

**Non-Goals:**

- 不重构 `ComponentDocPageData` 为新的 schema engine 或多层配置系统。
- 不改造整站信息架构，不处理首页、guide 区或全局 Rspress sidebar 重构。
- 不新增 Button / Input / Table 的运行时 API，也不调整 `@sci-comp/core` 的组件实现能力。
- 不引入 FAQ、最佳实践、可访问性等新的大章节，避免页面结构继续膨胀。
- 不扩展为整站级暗黑视觉系统重做，仅处理组件文档共享展示层。

## Decisions

### 1. 把目录职责迁回 MDX 标题层，而不是继续在 `ComponentDoc.tsx` 内派生导航 UI

**Decision**

组件页目录由 `docs/components/*.mdx` 中的标准 `## / ###` 标题树定义，`ComponentDoc.tsx` 只负责渲染各区块内容体。

**Why**

Rspress 原生 On This Page 依赖静态标题结构。当前组件页主体虽由 React 数据驱动，但只要把标题上提到 MDX 层，就能稳定获得与 guide 页一致的编译期目录生成能力，同时保留现有共享骨架与案例数据结构。

**Alternatives considered**

- 继续在组件内部维护左侧导航：实现快，但与最新产品预期冲突，也无法复用 Rspress 原生目录能力。
- 依赖 React 组件运行时产出的标题被 Rspress 自动识别：实现表面更少，但稳定性不足，风险高。

### 2. 一级章节使用稳定语义 id，案例卡片继续复用 `example.id`

**Decision**

一级章节统一使用固定 id，如 `definition`、`scenarios`、`examples`、`api`、`selection-tips`、`wrapper-notes`；案例卡片继续以 `ComponentDocExample.id` 作为锚点 id。

**Why**

即使目录标题迁移到 MDX，稳定 id 仍是跳转、测试和外部链接的真锚点。一级章节数量稳定、命名固定，显式语义 id 更利于测试和长期链接稳定性；示例卡片已具备唯一 id，直接复用可以避免重复命名和映射层。

**Alternatives considered**

- 根据中文标题动态 slug 化：实现简单，但标题未来若有调整会影响链接稳定性。
- 为示例再单独生成 `example-${index}`：避免 id 约束，但会弱化文档数据的可读性，也不利于跨版本链接保持稳定。

### 3. `ComponentDoc.tsx` 拆成按区块导出的内容组件，而不是继续作为整页黑盒

**Decision**

`ComponentDoc.tsx` 导出 `ComponentDocDefinition`、`ComponentDocScenarios`、`ComponentDocExamples`、`ComponentDocApi`、`ComponentDocSelectionTips`、`ComponentDocWrapperNotes` 等区块组件，让 MDX 可按标题树逐段组装。

**Why**

这样可以最小化改动现有数据结构与示例交互逻辑，同时把标题责任与内容责任明确分层：MDX 负责目录与标题，React 组件负责卡片、代码展开/复制、API 表、主题样式。

**Alternatives considered**

- 保留单个 `ComponentDocPage` 黑盒输出全部内容：复用高，但无法与 MDX 标题树协同。
- 完全改成手写 MDX 正文：目录最稳，但会造成内容与数据源分裂，维护成本更高。

### 4. MDX 仅渲染当前页面实际存在的可选章节

**Decision**

组件页 MDX 按固定顺序定义章节，但 `selectionTips` 等可选区块只有在页面数据存在时才输出对应 `##` 标题和内容。

**Why**

这能保持统一骨架与最小噪音之间的平衡：页面结构对读者稳定，但不展示空章节，避免“目录有、正文无”的割裂体验。

**Alternatives considered**

- 永远展示全部章节：一致性高，但会引入空跳转和信息噪音。
- 完全按页面自定义：灵活，但会削弱样板页和后续扩展的一致性。

### 5. 暗黑模式展示层优先收敛共享 surface 语义，而不是逐页补丁

**Decision**

优先在 `ComponentDoc.tsx`、`PreviewBlock.tsx`、`demos.tsx` 中统一调整 surface token 的使用方式，明确页面容器、章节卡片、示例卡片、预览区、说明块、代码块与表格的层级关系。

**Why**

当前暗黑问题不是单个组件页的局部错误，而是共享展示层在不同 surface 上的语义使用不够稳定。若逐页打补丁，后续新增组件页仍会复制问题。

**Alternatives considered**

- 只修 Button / Input / Table 页：交付快，但无法建立稳定样板。
- 修改 `@sci-comp/core` 主题变量生成逻辑：影响面过大，超出本次文档展示层范围。

### 6. 高频组件页采用“决策增强”而非“继续堆案例”

**Decision**

Button、Input、Table 三页优先补强选型建议、非适用场景、封装边界与组合能力说明，而不是继续无边界增加 demo 数量。

**Why**

这三页已经具备基础案例覆盖。当前缺的不是更多“怎么写”，而是“何时该用、何时不该用、与相邻方案如何取舍”。继续堆案例只会增加阅读长度，不会显著提升决策效率。

**Alternatives considered**

- 每页新增更多 demo：直观，但会进一步拉长页面并稀释重点。
- 额外新增 FAQ / 最佳实践章节：信息更全，但超出本轮范围，也会破坏当前统一骨架的克制性。

### 7. 测试改为验证内容骨架与稳定锚点，不再验证旧导航结构

**Decision**

本轮测试主要验证：稳定章节/案例锚点、代码展开、主题变量注入、文档页基础结构渲染与关键决策内容；删除对自定义导航 link 和组件内部 heading 的旧假设。

**Why**

导航职责已迁到 MDX 层，组件测试继续绑定旧导航结构会误报并阻碍后续演进。本轮目标是建立“最小必要保护网”，保护共享骨架与数据驱动内容，而不是重新引入视觉快照体系。

**Alternatives considered**

- 完全依赖人工验收：成本低，但无法为后续扩展提供稳定保护。
- 直接引入视觉回归测试：覆盖更强，但超出当前变更的性价比边界。

## Risks / Trade-offs

- **MDX 标题与 doc data 可能漂移** → 优先直接复用现有 `page.examples[].title` 与统一章节顺序，减少手写差异。
- **章节 id 一旦对外稳定，后续命名调整空间变小** → 使用语义化英文 id 而不是中文标题 slug，降低后续变更频率。
- **暗黑语义收敛可能影响已有亮色层次** → 优先在共享 token 使用层调整，并通过亮 / 暗主题下的渲染测试与人工检查双重验证。
- **Button / Input / Table 内容增强若尺度失控，页面会再次膨胀** → 严格限制为决策信息增强，不新增新的大章节类型。
- **不引入滚动同步高亮，目录交互会相对克制** → 这是有意取舍；本轮优先保证结构稳定与低复杂度，后续如确有需求再演进。
