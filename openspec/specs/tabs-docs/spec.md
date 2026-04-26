## Purpose

定义 Tabs 组件文档页的增强型使用指引与 lazy 行为语义。

## Requirements

### Requirement: Tabs 文档页 SHALL 提供增强型使用指引

文档系统 SHALL 为 Tabs 提供独立的增强型组件文档页，并以统一骨架组织中文定义、适用场景、结构化案例、常用属性 API 表、源码说明与代码展开/复制能力。

#### Scenario: Tabs 页面采用统一增强骨架

- **WHEN** 用户打开 Tabs 文档页
- **THEN** 页面 SHALL 以组件定义、适用场景、结构化案例区、常用属性 API 表与封装说明等核心区块组织内容

#### Scenario: Tabs 页面展示高频标签页场景

- **WHEN** 团队建设 Tabs 增强型文档页
- **THEN** 页面 SHALL 至少覆盖基础标签切换、`lazy` 渲染、可编辑标签页，以及禁用项或默认激活项等高频场景

### Requirement: Tabs 文档页 SHALL 明确 lazy 行为语义

文档系统 SHALL 在 Tabs 文档页中明确 `lazy` 对内容渲染时机的影响，并避免将其简化为纯视觉差异。

#### Scenario: Tabs 页面解释 lazy 行为

- **WHEN** 用户阅读 Tabs 页中的 `lazy` 相关案例与源码说明
- **THEN** 页面 SHALL 说明 `lazy` 开启时未激活面板的内容延后到激活后再渲染，以及关闭时内容可按默认方式参与渲染的语义差异

#### Scenario: Tabs 页面保留行为边界说明

- **WHEN** 用户阅读 Tabs 页的封装说明与选型建议
- **THEN** 页面 SHALL 明确 `lazy` 解决的是内容渲染时机问题，而不是复杂页面缓存系统

### Requirement: Tabs 文档页 SHALL 提供高频优先 API 表与源码说明

文档系统 SHALL 在 Tabs 文档页中提供覆盖高频属性的 API 表，并为每个结构化案例提供源码说明、代码展开与复制能力。

#### Scenario: Tabs 页面展示高频属性主表

- **WHEN** 用户浏览 Tabs 文档页
- **THEN** 页面 SHALL 提供覆盖 `items`、`defaultActiveKey`、`activeKey`、`onChange`、`type`、`lazy` 或同等级高频字段的 API 表

#### Scenario: Tabs 页面保持第一版范围收敛

- **WHEN** 团队维护 Tabs 增强型文档页
- **THEN** 深度自定义 tab bar、复杂页面缓存策略或同等级非主路径能力 SHALL 默认不进入第一版主案例与主 API 表

#### Scenario: Tabs 案例提供源码查阅能力

- **WHEN** 用户查看某个 Tabs 案例
- **THEN** 页面 SHALL 提供完整源码说明，并允许用户展开和复制案例代码
