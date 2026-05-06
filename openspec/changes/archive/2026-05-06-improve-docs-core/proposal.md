## Why

当前组件文档页已经具备统一骨架、结构化案例和高频组件页基础，但仍缺少对 Rspress 原生目录友好的标题结构、稳定的章节与案例锚点，以及更强的决策型内容表达。随着 Button、Input、Table 等页面持续扩展，如果继续把标题树和导航能力封装在 React 组件内部，Rspress 无法稳定生成与 guide 页一致的右侧 On This Page，文档体验和后续维护成本都会快速恶化。

## What Changes

- 将组件文档页的目录职责从 `ComponentDoc.tsx` 内部迁回 `docs/components/*.mdx`，使用标准 `## / ###` 标题接入 Rspress 原生右侧 On This Page。
- 保留组件定义、适用场景、案例演示、常用属性 API、选型建议、封装说明及案例级稳定锚点，但不再渲染自定义左侧导航组件。
- 收敛共享文档展示层在亮色/暗色主题下的语义层次，统一章节卡片、示例卡片、说明面板、代码块和 API 表格的可读性与边界表现。
- 以 Button、Input、Table 三页为样板，补强选型建议、非适用场景、封装边界和组合能力说明，使高频组件页从“说明式页面”升级为“决策式页面”。
- 复用现有测试基座，为稳定锚点、主题注入和文档渲染补最小必要验证，避免升级结果完全依赖人工观察。

## Capabilities

### New Capabilities

- `component-doc-navigation`: 定义组件文档页基于 MDX 标题树的正式章节目录、案例子锚点和可定位阅读结构。
- `component-doc-display-theming`: 定义组件文档共享展示层在亮暗主题下的语义层次与一致性要求。
- `button-docs`: 定义 Button 组件文档页的高频决策信息、选型建议与封装边界要求。

### Modified Capabilities

- `component-doc-page-enhancements`: 扩展统一文档骨架要求，使其覆盖稳定锚点、更清晰的区块职责，以及与 MDX 标题层协同的内容渲染边界。
- `component-doc-standardization`: 扩展统一中文结构要求，使其覆盖 Rspress 原生 On This Page 友好的标题组织、封装边界强化露出和高频样板页的一致组织规则。
- `input-docs`: 调整 Input 文档页要求，补足字段状态语义、与 Form 的职责边界及更明确的选型建议。
- `table-docs`: 调整 Table 文档页要求，补足受控列配置、组合能力建议和基础 Table 与高阶业务表格的边界说明。

## Impact

- 主要影响 `apps/sci-comp-documention/doc-components/ComponentDoc.tsx`、`PreviewBlock.tsx`、`demos.tsx`、组件页 `docs/components/*.mdx`，以及 Button/Input/Table 对应的 `component-doc-data/*.tsx` 和 `component-doc-previews/*.tsx`。
- 影响组件文档页的标题组织、共享展示样式语义和高频页内容组织，但不新增 `@sci-comp/core` 运行时 API。
- 需要同步扩展 `apps/sci-comp-test` 下的文档渲染、主题注入和组件页验证测试。
