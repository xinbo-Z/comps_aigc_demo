## ADDED Requirements

### Requirement: Form 文档页 SHALL 提供增强型使用指引

文档系统 SHALL 为基础 Form 提供独立的增强型组件文档页，并以统一骨架组织中文定义、适用场景、结构化案例、常用属性 API 表、源码说明与代码展开/复制能力。

#### Scenario: Form 页面采用统一增强骨架

- **WHEN** 用户打开基础 Form 文档页
- **THEN** 页面 SHALL 以组件定义、适用场景、结构化案例区、常用属性 API 表与封装说明等核心区块组织内容

#### Scenario: Form 页面展示基础表单场景

- **WHEN** 团队建设基础 Form 增强型文档页
- **THEN** 页面 SHALL 至少覆盖基础布局、横向或纵向差异、必填与校验反馈、默认值或提交流程等高频场景

### Requirement: Form 文档页 SHALL 明确基础 Form 与 SchemaForm 边界

文档系统 SHALL 在基础 Form 文档页中明确高阶 schema 驱动能力不属于当前页面范围，以保持基础 wrapper 与高阶能力分层一致。

#### Scenario: Form 页面说明高阶能力边界

- **WHEN** 用户阅读 Form 页的封装说明与选型建议
- **THEN** 页面 SHALL 明确复杂 schema 驱动、动态字段编排与 DSL 能力不属于基础 Form 页范围

#### Scenario: Form 页面保留能力分流指引

- **WHEN** 用户评估基础 Form 是否适合复杂业务场景
- **THEN** 页面 SHALL 提示配置驱动或高阶编排需求应由独立的 SchemaForm 能力承载

#### Scenario: Form 页面限定基础能力上限

- **WHEN** 团队维护基础 Form 的案例与 API 主表
- **THEN** 静态字段布局、基础校验反馈、默认值与提交流程 SHALL 作为本页主路径能力，而依赖 schema/config 生成字段、动态编排字段结构或面向复杂业务 DSL 的能力 SHALL 默认不进入本页主案例与主 API 表

### Requirement: Form 文档页 SHALL 提供高频优先 API 表与源码说明

文档系统 SHALL 在基础 Form 文档页中提供覆盖高频属性的 API 表，并为每个结构化案例提供源码说明、代码展开与复制能力。

#### Scenario: Form 页面展示高频属性主表

- **WHEN** 用户浏览基础 Form 文档页
- **THEN** 页面 SHALL 提供覆盖 `layout`、`colon`、`requiredMark`、`initialValues`、`onFinish`、`onFinishFailed`、`disabled` 或同等级高频字段的 API 表

#### Scenario: Form 案例提供源码查阅能力

- **WHEN** 用户查看某个基础 Form 案例
- **THEN** 页面 SHALL 提供完整源码说明，并允许用户展开和复制案例代码
