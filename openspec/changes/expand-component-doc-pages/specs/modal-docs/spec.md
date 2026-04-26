## ADDED Requirements

### Requirement: Modal 文档页 SHALL 提供增强型使用指引

文档系统 SHALL 为 Modal 提供独立的增强型组件文档页，并以统一骨架组织中文定义、适用场景、结构化案例、常用属性 API 表、源码说明与代码展开/复制能力。

#### Scenario: Modal 页面采用统一增强骨架

- **WHEN** 用户打开 Modal 文档页
- **THEN** 页面 SHALL 以组件定义、适用场景、结构化案例区、常用属性 API 表与封装说明等核心区块组织内容

#### Scenario: Modal 页面展示高频弹窗场景

- **WHEN** 团队建设 Modal 增强型文档页
- **THEN** 页面 SHALL 至少覆盖基础弹窗、全屏弹窗、承载表单或内容区的常见场景，以及提交中或确认类交互场景

### Requirement: Modal 文档页 SHALL 明确 fullscreen 语义边界

文档系统 SHALL 在 Modal 文档页中明确 `fullscreen` 属于对 Ant Design Modal 的语义扩展，而不是独立的弹窗体系。

#### Scenario: Modal 页面解释 fullscreen 语义

- **WHEN** 用户阅读 Modal 页中的全屏弹窗案例与封装说明
- **THEN** 页面 SHALL 说明 `fullscreen` 主要表达基于同一 Modal 心智的尺寸与布局语义扩展，以及它与基础 Modal 行为的关系

#### Scenario: Modal 页面声明复杂工作台能力边界

- **WHEN** 用户阅读 Modal 页的封装说明
- **THEN** 页面 SHALL 明确复杂工作台式全屏交互不应默认由基础 Modal wrapper 承担

### Requirement: Modal 文档页 SHALL 提供高频优先 API 表与源码说明

文档系统 SHALL 在 Modal 文档页中提供覆盖高频属性的 API 表，并为每个结构化案例提供源码说明、代码展开与复制能力。

#### Scenario: Modal 页面展示高频属性主表

- **WHEN** 用户浏览 Modal 文档页
- **THEN** 页面 SHALL 提供覆盖 `open`、`title`、`fullscreen`、`onOk`、`onCancel`、`confirmLoading`、`width`、`footer` 或同等级高频字段的 API 表

#### Scenario: Modal 案例提供源码查阅能力

- **WHEN** 用户查看某个 Modal 案例
- **THEN** 页面 SHALL 提供完整源码说明，并允许用户展开和复制案例代码
