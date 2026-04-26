## Context

当前文档站已经将 Button、Progress、Input、Modal、Tabs、Table 与基础 Form 迁移到统一的增强型组件文档骨架，但 `SchemaForm` 仍停留在旧的 `PreviewBlock + 单一示例` 模式。这导致高阶表单能力缺少统一的信息组织方式，用户无法像查看其他组件页一样，系统理解组件定义、适用场景、结构化案例、API 主表、源码说明与边界约束。

与基础 Form 不同，`SchemaForm` 的核心价值并不在静态字段布局，而在 schema 驱动字段定义、`visibleWhen` / `itemPropsWhen` 等动态规则、`list` 类型字段的编排能力，以及 `schemaOnly` 等更偏配置化的使用方式。因此本次设计不能简单复用基础 Form 页的案例边界，而要在统一骨架下把“高阶配置驱动能力”作为主路径表达清楚，同时保持与基础 Form 页的分层关系稳定。

当前代码侧已经具备支持文档设计的真实能力基础：`packages/sci-comp-core/src/components/general/form/SchemaForm.tsx` 实现了 input / textarea / select / number / list 五类 schema 字段渲染，以及动态显示、动态 item props、列表项默认值和 schemaOnly 等能力；`packages/sci-comp-core/src/components/general/form/types.ts` 也给出了完整类型模型。因此这次变更重点不是扩展组件能力，而是将现有能力重新整理为统一增强页表达。

## Goals / Non-Goals

**Goals:**

- 将 `docs/components/schema-form.mdx` 迁移到统一的增强型组件文档骨架。
- 为 `SchemaForm` 设计一组能够反映高阶配置驱动能力的结构化案例。
- 在文档中清晰表达基础 Form 与 SchemaForm 的职责分层与适用场景分流。
- 为 SchemaForm 页面补齐高频优先 API 表、源码说明、代码展开/复制能力，以及 `wrapperNotes` / `selectionTips` 的稳定职责划分。
- 沿用现有按组件拆分的数据与预览组织方式，为 SchemaForm 新增独立文档数据文件与预览实现。

**Non-Goals:**

- 不扩展 `SchemaForm` 运行时能力本身，不新增新的字段类型、规则引擎或 DSL。
- 不将 `SchemaForm` 页面改造成完整配置手册或覆盖所有组合可能的百科式文档。
- 不回退到集中式 `componentDocData.tsx` / `componentDocPreviews.tsx` 承载所有内容。
- 不在本次变更中同时重写基础 Form 页，只补充分流关系所需的文档口径。
- 不在第一版引入在线编辑、即时执行或复杂 playground 编排。

## Decisions

### Decision: 在统一骨架下将 SchemaForm 作为“高阶能力页”处理

`SchemaForm` 页面继续使用与其他增强型页面一致的 `ComponentDocPage` 骨架，但内容组织上明确它不是基础 wrapper 页，而是高阶配置驱动能力页。

- 这样可以保持整站阅读习惯一致。
- 同时允许页面在统一骨架下更强调能力边界、适用前提与复杂场景分流。

备选方案：

- 保持旧 `PreviewBlock` 轻量页：实现最省事，但无法承载结构化案例、API 主表与稳定说明字段职责。
- 为 SchemaForm 单独设计特殊页面模板：能更贴合高阶能力，但会破坏已有增强型页面的一致性，并增加维护成本。

### Decision: 结构化案例围绕“配置驱动主路径”而非基础表单心智展开

SchemaForm 的案例不再以“布局 / 校验 / 默认值”作为唯一中心，而是围绕更能体现高阶能力的主路径组织：

- 基础 schema 驱动字段渲染
- 动态显示或动态禁用规则
- `list` 字段与列表项编排
- 默认值、提交与 `schemaOnly` 等配置化用法

备选方案：

- 直接复用基础 Form 页案例框架：会削弱 SchemaForm 与基础 Form 的区别，让用户误以为二者只是写法不同。
- 只保留一个大而全的综合案例：信息密度过高，不利于建立逐步理解路径。

### Decision: API 主表保持高频优先，但聚焦 SchemaForm 的独有语义

SchemaForm 页的 API 主表优先覆盖 `schema`、`schemaOnly`、`children`、`layout`、`initialValues`、`onFinish`，以及 `visibleWhen`、`itemPropsWhen`、`itemSchema` / `fields`、`minItems` / `maxItems` 等最影响理解的 schema 字段语义。

- 主表重点解释配置驱动能力，而不是镜像所有 antd Form props。
- 更细的字段配置和复杂组合保留给源码说明、wrapperNotes 或后续增强。

备选方案：

- 仅展示 `SchemaFormProps` 顶层 props：会遗漏真正影响使用理解的 schema 字段语义。
- 展示完整 schema 类型全量字段：会使第一版页面过重，失去高频优先策略。

### Decision: 使用 selectionTips 和 wrapperNotes 明确基础 Form / SchemaForm 分流

- `selectionTips` 主要负责帮助用户判断何时应从基础 Form 转向 SchemaForm。
- `wrapperNotes` 主要负责说明 SchemaForm 的边界，例如它是配置驱动的高阶能力，不承担任意 DSL 设计器或复杂业务流程编排。
- 单个案例的源码说明只聚焦该案例本身，不承担整页分流说明。

备选方案：

- 仅在基础 Form 页说明分流：会让用户在进入 SchemaForm 页后仍看不到清晰定位。
- 把全部分层说明压进案例说明：会导致案例区承担过多整页职责，破坏说明字段稳定性。

### Decision: 继续按组件拆分 SchemaForm 文档数据与预览实现

本次沿用现有的组件级拆分方式，为 SchemaForm 增加独立的数据文件与预览文件，并通过轻量 re-export 接入现有入口。

- 这样与此前 Input / Modal / Tabs / Table / Form 的扩展方式保持一致。
- 避免把高阶表单案例重新塞回集中式文件。

备选方案：

- 将 SchemaForm 数据直接内联到 `schema-form.mdx`：局部可行，但不利于复用统一骨架的数据契约。
- 放回集中式数据文件：会让已经完成的结构收口失效。

## Risks / Trade-offs

- [高阶能力过重] → 通过限制第一版案例数量，只覆盖最能建立心智的主路径能力，避免退化为完整配置手册。
- [与基础 Form 边界再次混淆] → 在 proposal、specs、selectionTips 与 wrapperNotes 中重复固定分层口径，保证页面内外一致。
- [案例代码过长影响可读性] → 将综合能力拆为多个结构化案例，每个案例只承担一个核心主题。
- [API 主表过浅或过深] → 采用“顶层 props + 高频 schema 字段语义”的折中方式，避免两端失衡。
