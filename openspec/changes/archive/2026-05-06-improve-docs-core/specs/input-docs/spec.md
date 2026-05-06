## MODIFIED Requirements

### Requirement: Input 文档页 SHALL 提供增强型使用指引

文档系统 SHALL 为 Input 提供独立的增强型组件文档页，并以统一骨架组织中文定义、适用场景、结构化案例、常用属性 API 表、源码说明与代码展开/复制能力；页面 SHALL 同时补足字段状态语义、与 Form 的职责边界以及轻量选型建议，使其能够承担高频输入组件的决策型说明职责。

#### Scenario: Input 页面采用统一增强骨架

- **WHEN** 用户打开 Input 文档页
- **THEN** 页面 SHALL 以组件定义、适用场景、结构化案例区、常用属性 API 表与封装说明等核心区块组织内容

#### Scenario: Input 页面展示高频输入场景

- **WHEN** 团队建设 Input 增强型文档页
- **THEN** 页面 SHALL 至少覆盖基础输入、标签与辅助说明、错误态或校验态、禁用或只读等高频场景

#### Scenario: Input 页面说明字段状态语义

- **WHEN** 用户比较 `invalid`、`disabled`、`readOnly` 或同等级状态字段
- **THEN** 页面 SHALL 说明这些状态在输入语义、交互能力与反馈目的上的差异，而不是仅罗列属性名

### Requirement: Input 文档页 SHALL 提供高频优先 API 表

文档系统 SHALL 在 Input 文档页中提供覆盖高频属性的 API 表，并明确该表格用于帮助理解 wrapper 的常用能力，而不是 Ant Design Input 的全量参数镜像。

#### Scenario: Input 页面展示高频属性主表

- **WHEN** 用户浏览 Input 文档页
- **THEN** 页面 SHALL 提供覆盖 `label`、`helperText`、`invalid`、`status`、`placeholder`、`disabled` 或同等级高频字段的 API 表

#### Scenario: Input 页面说明透传能力边界

- **WHEN** 用户阅读 Input 页的封装说明与 API 主表
- **THEN** 页面 SHALL 明确未纳入主表的其他输入能力仍遵循 Ant Design 原生能力或透传规则

### Requirement: Input 文档页 SHALL 提供完整源码说明

文档系统 SHALL 为 Input 文档页中的每个结构化案例提供源码说明、展开代码与复制能力，以帮助用户快速理解实现方式与使用边界。

#### Scenario: Input 案例提供源码说明

- **WHEN** 用户查看某个 Input 案例
- **THEN** 该案例 SHALL 提供用途、实现要点与适用边界等完整源码说明

#### Scenario: Input 页面支持代码展开与复制

- **WHEN** 用户浏览 Input 文档页中的案例
- **THEN** 页面 SHALL 允许用户展开案例代码并复制源码内容

### Requirement: Input 文档页 SHALL 保持说明字段职责稳定

文档系统 SHALL 在 Input 文档页中保持 `wrapperNotes`、可选的 `selectionTips` 与案例源码说明的职责分离，以延续增强型组件页的统一写法，并明确 Input 自身与 Form 容器之间的职责边界。

#### Scenario: Input 页面用 wrapperNotes 说明封装边界

- **WHEN** 页面维护 Input 的 `wrapperNotes`
- **THEN** 该区块 SHALL 主要用于说明封装边界、透传规则与未纳入主表的输入能力，而不是重复案例说明

#### Scenario: Input 页面按需使用 selectionTips 做轻量分流

- **WHEN** 页面启用 Input 的 `selectionTips`
- **THEN** 该区块 SHALL 主要用于表达轻量选型建议或分流提示，而不是替代整页封装说明

#### Scenario: Input 页面说明与 Form 的职责边界

- **WHEN** 用户评估校验、布局、字段编排等能力应放在 Input 还是 Form 层
- **THEN** 页面 SHALL 明确 Input 负责字段输入与局部状态表达，Form 或更高阶容器负责整体验证、编排与提交流程
