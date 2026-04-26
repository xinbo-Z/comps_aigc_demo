## Why

当前文档站已经在 Button 与 Progress 页面验证了增强型组件文档页模式，包括统一骨架、结构化案例、常用属性 API 表、源码说明与代码展开/复制能力。但 Input、Modal、Tabs、Table 与 Form 仍停留在旧的 `PreviewBlock + demos.tsx` 模式，导致不同组件页的信息密度、阅读路径与查阅体验不一致。

现在继续推进这项工作是合适的，因为增强型文档模式已经过首批试点验证，后续组件页迁移的主要问题不再是骨架是否成立，而是如何按组件复杂度分批推广，并在推广过程中持续守住“高频优先”“边界清晰”和“基础 wrapper 不承载高阶 DSL”的文档原则。

## What Changes

- 将 Input、Modal、Tabs、Table 与 Form 文档页逐步迁移到增强型组件文档骨架。
- 为上述组件补齐结构化案例元数据、常用属性 API 表、源码说明以及代码展开/复制能力。
- 按组件复杂度分批推进迁移：先处理轻量 wrapper（Input、Modal），再处理范围更易失控的 Tabs、Table，最后处理边界最敏感的 Form；批次用于实施顺序与分段 review，不改变本 change 仍以全部批次完成为最终收口口径。
- 在文档设计中明确基础 Form 与 SchemaForm 的职责边界，避免将高阶 schema 驱动能力混入基础 Form 页面；本次变更仅要求在基础 Form 页中完成边界表达与分流提示，不默认纳入 `schema-form.mdx` 的增强改造。
- 在第一批页面迁移前完成文档数据源与预览组织方式的收口，避免 `componentDocData.tsx` 与 `componentDocPreviews.tsx` 随页面增多而持续膨胀。
- 对首页入口、组件导航与页面文案仅做与增强页推广直接相关的一致性同步，不将本次变更扩展为全站信息架构重构。

## Capabilities

### New Capabilities

- `input-docs`: 定义 Input 增强型文档页的案例层次、API 主表、源码说明与页面结构要求。
- `modal-docs`: 定义 Modal 增强型文档页的案例层次、API 主表、源码说明与页面结构要求。
- `tabs-docs`: 定义 Tabs 增强型文档页的案例层次、`lazy` 行为说明、API 主表与页面结构要求。
- `table-docs`: 定义 Table 增强型文档页的案例层次、高频优先 API 主表、源码说明与页面范围约束。
- `form-docs`: 定义基础 Form 增强型文档页的案例层次、API 主表、源码说明与基础 Form / SchemaForm 边界要求。

### Modified Capabilities

- `component-doc-page-enhancements`: 将增强型组件页能力从 Button / Progress 试点扩展到更多组件类型，并补充面向持续推广的数据组织、说明职责划分与页面适配要求。
- `component-doc-standardization`: 将统一中文文档结构规范推广到 Input、Modal、Tabs、Table 与 Form 页面，并明确复杂组件页在统一骨架下表达边界的要求。

## Impact

- 受影响文档页面主要位于 `apps/sci-comp-documention/docs/components/`，包括 `input.mdx`、`modal.mdx`、`tabs.mdx`、`table.mdx` 与 `form.mdx`。
- 受影响文档骨架与数据组织主要位于 `apps/sci-comp-documention/doc-components/`，可能涉及增强页数据源、预览组件与复用结构的调整。
- 需要补充或修改 OpenSpec specs 以覆盖 Input、Modal、Tabs、Table、Form 及增强型文档页推广策略。
- `schema-form.mdx` 本次不默认纳入实现，但会受到基础 Form 页边界说明的间接影响。
