## Why

当前 `SchemaForm` 文档页仍停留在旧的 `PreviewBlock + 单一示例` 形态，无法像 Button、Input、Modal、Tabs、Table 与基础 Form 那样系统化表达组件定义、适用场景、结构化案例、API 主表、源码说明与边界约束。由于 `SchemaForm` 承担的是高阶 schema 驱动表单能力，若继续沿用旧文档形式，用户很难判断它与基础 `Form` 的职责差异，也难以建立对动态字段、显示规则和列表编排能力的正确预期。

## What Changes

- 将 `docs/components/schema-form.mdx` 迁移到统一的增强型组件文档骨架，补齐中文定义、适用场景、结构化案例区、常用属性 API 表、源码说明与代码展开/复制能力。
- 围绕 `SchemaForm` 的高阶能力设计结构化案例，重点覆盖 schema 驱动字段定义、动态显示或禁用规则、列表项编排、默认值与提交流程等高频场景。
- 在文档中明确 `SchemaForm` 与基础 `Form` 的职责分层，强调配置驱动与动态编排属于 `SchemaForm` 主路径能力，而静态字段布局与基础校验仍优先归属于基础 `Form`。
- 沿用当前增强型组件页的数据组织方式，为 `SchemaForm` 增加按组件拆分的文档数据与预览实现，避免回退到集中式维护。
- 为 `SchemaForm` 页面补充 wrapperNotes、selectionTips 与案例源码说明，明确其高阶能力边界、适用前提与不在第一版主案例中展开的复杂 DSL 范围。

## Capabilities

### New Capabilities

- `schema-form-docs`: 定义 SchemaForm 增强型文档页的内容结构、案例范围、API 主表与边界说明要求

### Modified Capabilities

- `component-doc-standardization`: 将统一中文文档结构扩展到 SchemaForm 页面，保持基础 Form 与高阶表单页在同一模板下清晰分层
- `component-doc-page-enhancements`: 将增强型组件页骨架、结构化案例元数据、源码说明与高频优先 API 表的约束扩展到 SchemaForm 文档页
- `form-docs`: 明确基础 Form 文档页与 SchemaForm 文档页之间的分流关系与职责边界表述

## Impact

- 受影响文档页面：`apps/sci-comp-documention/docs/components/schema-form.mdx`
- 受影响文档组件组织：`apps/sci-comp-documention/doc-components/componentDocData.tsx`、`componentDocPreviews.tsx` 及对应的按组件拆分数据/预览目录
- 可能新增 SchemaForm 专属的增强页数据文件与预览实现文件
- 受影响 OpenSpec 规范：`component-doc-standardization`、`component-doc-page-enhancements`、`form-docs`，以及新增 `schema-form-docs`
