## Why

当前组件文档站已经具备基础中文浏览能力，但组件页仍主要停留在“实时预览 + 少量示例”的层次，缺少 API 属性说明表、成体系的详细案例、源码说明与代码展开等能力，无法像 Ant Design 官方文档那样支持高效查阅与对比。随着组件数量持续增加，继续只靠零散 MDX 内容扩展会让页面结构、示例组织与维护方式越来越不统一，因此需要在现有 `standardize-component-documentation` 基础上进一步扩展需求边界，建立面向组件文档平台化演进的第一页能力模型。

本次讨论已进一步明确第一版边界：增强型组件页采用统一核心骨架；结构化示例元数据按未来全站复用标准设计；API 表按业务高频使用口径筛选；案例预览与源码展示必须共享单一真源；每个案例都需要提供接近官网风格的完整源码说明；Button 与 Progress 试点需要覆盖基础、变体、状态与组合场景；同时在模型接口层为第二阶段在线编辑能力预留扩展位。

## What Changes

- 在 `standardize-component-documentation` 的基础上扩展组件文档规范，明确第一版组件页需要支持多案例、API 表、源码说明、代码展开/复制等能力
- 定义一套增强型组件页核心必选骨架，用于统一承载组件定义、适用场景、案例区、API 表格与封装边界说明等关键区块
- 定义按未来全站复用设计的示例元数据模型，使组件案例不仅能渲染预览，还能关联标题、说明、源码与相关属性信息
- 定义第一版 API 表格策略，明确按业务高频使用口径筛选属性字段，并约束适合手写/半结构化维护的字段范围
- 定义案例源码与预览共享单一真源的组织方式，并要求每个案例提供完整的源码说明
- 定义代码编辑器的分级策略，将在线编辑预览能力留作第二阶段可选能力，但在第一版模型接口层预留扩展位
- 以 Progress 与 Button 作为第一批试点页面，按较完整案例层次验证统一文档骨架、案例组织与 API 展示方式
- **BREAKING**：无

## Capabilities

### New Capabilities

- `component-doc-page-enhancements`: 定义面向组件官网化页面的一阶能力，包括文档骨架、示例元数据模型、API 表格与代码展示分层策略

### Modified Capabilities

- `component-doc-standardization`: 将现有文档规范从“统一中文章节结构”扩展到“统一章节结构 + 结构化示例与 API 展示能力”的要求
- `progress-docs`: 将 Progress 文档页要求从模板试点扩展为包含多案例、API 表、源码说明与代码展开能力的试点页

## Impact

- Affected code:
  - `apps/sci-comp-documention/docs/components/*.mdx`
  - `apps/sci-comp-documention/doc-components/`
  - `apps/sci-comp-documention/docs/HomePage.tsx`
  - `apps/sci-comp-documention/rspress.config.ts`
  - `openspec/changes/enhance-doc-site-component-pages/`
  - `openspec/changes/standardize-component-documentation/`
  - `openspec/specs/`
- APIs:
  - 不修改 `@sci-comp/core` 运行时组件 API，但会新增文档层的结构化元数据与展示约定
- Dependencies:
  - 继续使用现有 React、Rspress、`@sci-comp/core` 与 OpenSpec 体系；第一版默认不引入新的在线代码执行依赖
- Systems:
  - 组件文档站的信息架构、示例组织方式、后续文档评审标准与 OpenSpec 文档规范都会受到影响
