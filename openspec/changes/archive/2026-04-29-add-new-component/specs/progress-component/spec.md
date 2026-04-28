## ADDED Requirements

### Requirement: Progress 组件 SHALL 从核心组件包导出

系统应在 `@sci-comp/core` 中提供 Progress 组件，并通过包的公共导出入口暴露它，以便消费方工作区能够像现有通用组件一样一致地导入。

#### Scenario: 可从包入口获取 Progress

- **WHEN** 消费方从 `@sci-comp/core` 导入 `Progress`
- **THEN** 该包应通过公共导出入口解析到 Progress 组件

#### Scenario: 可从包入口获取 Progress 类型

- **WHEN** 消费方从 `@sci-comp/core` 导入 Progress 组件类型
- **THEN** 该包应通过同一个公共入口暴露对应的 TypeScript 类型

### Requirement: Progress 组件 SHALL 封装 Ant Design Progress

系统应将 Progress 实现为对 Ant Design v6 Progress 组件的封装，而不是自定义进度条实现。

#### Scenario: Wrapper 使用 Ant Design Progress 行为

- **WHEN** 在核心包中渲染 Progress 组件
- **THEN** 它应将进度展示行为委托给 Ant Design Progress 组件

#### Scenario: Wrapper 保留常见进度用法

- **WHEN** 消费方使用线性进度或圆形进度等常见进度展示场景
- **THEN** Progress 组件应通过 wrapper API 支持这些场景

### Requirement: 文档站 SHALL 包含 Progress 组件页面

文档系统应包含独立的 Progress 组件页面，并能从组件导航中发现该页面。

#### Scenario: Progress 出现在组件导航中

- **WHEN** 用户浏览文档站的组件侧边栏
- **THEN** 导航中应包含 Progress 条目，并与现有通用组件并列展示

#### Scenario: Progress 页面包含使用指引

- **WHEN** 用户打开 Progress 文档页面
- **THEN** 页面应说明组件用途，并至少包含一个使用示例

### Requirement: 测试工作区 SHALL 验证 Progress 组件

测试系统应在 `sci-comp-test` 工作区中包含针对 Progress 组件的自动化测试。

#### Scenario: 在测试中验证 Progress 渲染

- **WHEN** 核心组件的测试套件运行时
- **THEN** 它应至少包含一个测试，用于验证 Progress 组件能够成功渲染

#### Scenario: Progress 行为由回归测试覆盖

- **WHEN** Progress 组件通过 wrapper 暴露关键显示状态或 props
- **THEN** 测试工作区应包含针对这些状态或 props 的断言，以便自动发现回归问题
