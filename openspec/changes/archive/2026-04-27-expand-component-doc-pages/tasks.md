## 1. 文档数据与结构扩展

- [x] 1.1 盘点 Input、Modal、Tabs、Table、Form 现有 mdx 页面与 demos 复用内容，明确每个页面的保留说明范围与案例层次
- [x] 1.2 在第一批页面迁移前按组件拆分或重组增强页数据源与预览组织方式，明确案例单一真源的落点，确保后续扩展不继续依赖单一膨胀文件
- [x] 1.3 保持统一 `ComponentDocPage` 骨架不变，补齐后续组件页需要复用的数据结构、说明字段职责与可选区块约定

## 2. 第一批页面：Input 与 Modal

- [x] 2.1 为 Input 设计结构化案例清单，覆盖基础输入、标签与辅助说明、错误态或校验态、禁用或只读等高频场景
- [x] 2.2 为 Modal 设计结构化案例清单，覆盖基础弹窗、全屏弹窗、承载表单或内容区场景，以及提交中或确认类交互场景，并明确 `fullscreen` 是同一 Modal 心智下的尺寸/布局语义扩展
- [x] 2.3 为 Input 与 Modal 编写高频优先 API 表、源码说明、wrapperNotes 与必要的 selectionTips，并区分选型分流说明与封装边界说明的职责
- [x] 2.4 重构 `docs/components/input.mdx` 与 `docs/components/modal.mdx`，接入增强型组件文档骨架并验证代码展开/复制能力正常
- [x] 2.5 复盘第一批页面产出的案例元数据、API 主表组织与说明字段职责，确认无需回调结构后再进入第二批

## 3. 第二批页面：Tabs 与 Table

- [x] 3.1 为 Tabs 设计结构化案例清单，覆盖基础切换、`lazy` 渲染、可编辑标签页，以及禁用项或默认激活项等高频场景，并明确 `lazy` 针对内容渲染时机而非复杂缓存系统
- [x] 3.2 为 Table 设计结构化案例清单，覆盖基础表格、分页列表、空态、滚动与虚拟滚动等高频业务场景，并优先保留基础列表搭建主路径案例
- [x] 3.3 为 Tabs 与 Table 编写高频优先 API 表、源码说明、wrapperNotes 与 selectionTips，并明确行为语义、透传能力边界以及非主路径能力的收敛方式
- [x] 3.4 重构 `docs/components/tabs.mdx` 与 `docs/components/table.mdx`，接入增强型组件文档骨架并验证页面范围保持收敛
- [x] 3.5 复盘第二批页面对高信息密度组件的案例模型、API 主表收敛规则与说明字段职责是否仍成立，再进入 Form 批次

## 4. 第三批页面：Form 边界化迁移

- [x] 4.1 盘点 `form.mdx` 与 `schema-form.mdx` 的现有内容，明确基础 Form 页保留范围与 SchemaForm 的能力边界
- [x] 4.2 为基础 Form 设计结构化案例清单，覆盖布局、校验、默认值与提交流程等高频场景，并排除 schema/config 驱动字段生成与复杂动态编排能力
- [x] 4.3 为基础 Form 编写高频优先 API 表、源码说明、wrapperNotes 与能力分流型 selectionTips，明确基础能力上限与 SchemaForm 分流口径
- [x] 4.4 重构 `docs/components/form.mdx`，接入增强型组件文档骨架，并在页面中明确复杂 schema 驱动能力不属于基础 Form 页范围

## 5. 全站复查与验证

- [x] 5.1 复查首页入口、组件导航与页面文案，确保新旧增强页在信息架构与入口描述上保持一致，且仅做与本次迁移直接相关的同步
- [x] 5.2 运行文档站相关检查与构建命令，验证新增页面在 typecheck、build、源码展开与复制体验上均正常工作
- [x] 5.3 复盘 Input、Modal、Tabs、Table 与 Form 的迁移结果，沉淀后续是否单独增强 SchemaForm 页的判断依据
