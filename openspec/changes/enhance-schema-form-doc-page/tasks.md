## 1. SchemaForm 文档骨架与数据组织

- [x] 1.1 盘点 `schema-form.mdx` 现有内容与 `SchemaForm` 真实实现能力，确认第一版增强页保留的高频案例范围与说明边界
- [x] 1.2 为 SchemaForm 增加按组件拆分的文档数据文件与预览实现文件，并通过现有文档入口做轻量 re-export 接入
- [x] 1.3 复用现有 `ComponentDocPage` 骨架与说明字段职责约定，补齐 SchemaForm 页面需要的结构化案例元数据、API 主表与源码说明字段

## 2. SchemaForm 页面内容设计

- [x] 2.1 设计 Schema 驱动字段渲染案例，覆盖基础字段定义与常见表单提交路径
- [x] 2.2 设计动态显示或动态禁用规则案例，体现 `visibleWhen`、`itemPropsWhen` 等高阶配置能力
- [x] 2.3 设计列表项编排案例，覆盖 `list` 类型字段、`itemSchema` / `fields`、最小最大项约束或默认项逻辑
- [x] 2.4 为 SchemaForm 编写高频优先 API 表、wrapperNotes、selectionTips 与案例源码说明，明确其高阶能力定位与复杂 DSL 边界

## 3. 页面迁移与分层校验

- [x] 3.1 重构 `docs/components/schema-form.mdx`，接入增强型组件文档骨架并验证代码展开/复制能力正常
- [x] 3.2 复查基础 Form 页与 SchemaForm 页的分流表述，确保静态表单能力与配置驱动高阶能力的职责划分保持一致
- [x] 3.3 运行文档站相关检查与构建命令，验证 SchemaForm 页面在 typecheck、build 与主路径阅读体验上正常工作
