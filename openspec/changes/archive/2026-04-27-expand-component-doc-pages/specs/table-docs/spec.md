## ADDED Requirements

### Requirement: Table 文档页 SHALL 提供增强型使用指引

文档系统 SHALL 为 Table 提供独立的增强型组件文档页，并以统一骨架组织中文定义、适用场景、结构化案例、常用属性 API 表、源码说明与代码展开/复制能力。

#### Scenario: Table 页面采用统一增强骨架

- **WHEN** 用户打开 Table 文档页
- **THEN** 页面 SHALL 以组件定义、适用场景、结构化案例区、常用属性 API 表与封装说明等核心区块组织内容

#### Scenario: Table 页面展示高频列表场景

- **WHEN** 团队建设 Table 增强型文档页
- **THEN** 页面 SHALL 至少覆盖基础表格、分页列表、空态、滚动以及虚拟滚动或大数据量等高频场景

### Requirement: Table 文档页 SHALL 保持高频优先范围收敛

文档系统 SHALL 在 Table 文档页中优先表达 wrapper 的高频能力与业务常见场景，而不是扩展为 Ant Design Table 的全量教程页。

#### Scenario: Table 页面展示高频属性主表

- **WHEN** 用户浏览 Table 文档页
- **THEN** 页面 SHALL 提供覆盖 `columns`、`dataSource`、`pagination`、`scroll`、`virtualScroll`、`rowSelection` 或同等级高频字段的 API 表

#### Scenario: Table 页面说明透传能力边界

- **WHEN** 用户阅读 Table 页的封装说明与 API 主表
- **THEN** 页面 SHALL 明确排序、筛选、展开行或其他未纳入主表的能力仍遵循 Ant Design 原生能力或透传规则

#### Scenario: Table 页面避免退化为全量镜像

- **WHEN** 团队维护 Table 增强型文档页
- **THEN** 页面 SHALL 以高频业务场景与 wrapper 语义为主，而不是追求覆盖 Ant Design Table 的完整参数面

#### Scenario: Table 页面优先保留主路径案例

- **WHEN** 团队在 Table 页面中面对多个都可视为高频的能力候选
- **THEN** 页面 SHALL 优先保留最能帮助用户完成基础列表搭建的案例与字段，并将排序、筛选、展开行等非主路径能力优先收敛到封装说明或透传边界说明中

### Requirement: Table 文档页 SHALL 提供完整源码说明

文档系统 SHALL 为 Table 文档页中的每个结构化案例提供源码说明、展开代码与复制能力，以帮助用户理解表格 wrapper 的高频使用方式与边界。

#### Scenario: Table 案例提供源码说明

- **WHEN** 用户查看某个 Table 案例
- **THEN** 该案例 SHALL 提供用途、实现要点与适用边界等完整源码说明

#### Scenario: Table 页面支持代码展开与复制

- **WHEN** 用户浏览 Table 文档页中的案例
- **THEN** 页面 SHALL 允许用户展开案例代码并复制源码内容
