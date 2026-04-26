## ADDED Requirements

### Requirement: SchemaForm 文档页 SHALL 提供增强型使用指引

文档系统 SHALL 为 SchemaForm 提供独立的增强型组件文档页，并以统一骨架组织中文定义、适用场景、结构化案例、常用属性 API 表、源码说明与代码展开/复制能力。

#### Scenario: SchemaForm 页面采用统一增强骨架

- **WHEN** 用户打开 SchemaForm 文档页
- **THEN** 页面 SHALL 以组件定义、适用场景、结构化案例区、常用属性 API 表与封装说明等核心区块组织内容

#### Scenario: SchemaForm 页面展示高阶配置驱动场景

- **WHEN** 团队建设 SchemaForm 增强型文档页
- **THEN** 页面 SHALL 至少覆盖 schema 驱动字段渲染、动态显示或动态禁用规则、列表项编排，以及默认值或提交流程等高频场景

### Requirement: SchemaForm 文档页 SHALL 明确高阶能力定位

文档系统 SHALL 在 SchemaForm 文档页中明确其高阶配置驱动能力定位，并帮助用户区分何时应使用基础 Form、何时应使用 SchemaForm。

#### Scenario: SchemaForm 页面说明与基础 Form 的分流关系

- **WHEN** 用户阅读 SchemaForm 页的定义、选型建议与封装说明
- **THEN** 页面 SHALL 明确静态字段布局与基础校验优先属于基础 Form，而配置驱动字段生成、动态字段编排与列表 schema 组合属于 SchemaForm 主路径能力

#### Scenario: SchemaForm 页面保留复杂 DSL 边界说明

- **WHEN** 用户阅读 SchemaForm 页的封装说明
- **THEN** 页面 SHALL 明确当前 SchemaForm 主要承载已有 schema 驱动能力，而不是任意业务 DSL 设计器或无限扩展的规则引擎

### Requirement: SchemaForm 文档页 SHALL 提供高频优先 API 表与源码说明

文档系统 SHALL 在 SchemaForm 文档页中提供覆盖高频能力的 API 表，并为每个结构化案例提供源码说明、代码展开与复制能力。

#### Scenario: SchemaForm 页面展示高频属性主表

- **WHEN** 用户浏览 SchemaForm 文档页
- **THEN** 页面 SHALL 提供覆盖 `schema`、`schemaOnly`、`children`、`layout`、`initialValues`、`onFinish`，以及 `visibleWhen`、`itemPropsWhen`、`itemSchema`、`minItems`、`maxItems` 或同等级高频字段语义的 API 表

#### Scenario: SchemaForm 案例提供源码查阅能力

- **WHEN** 用户查看某个 SchemaForm 案例
- **THEN** 页面 SHALL 提供完整源码说明，并允许用户展开和复制案例代码
