## Purpose

定义基于 Vitest + React Testing Library 的 `sci-comp-test` 测试工程能力，包括组件测试组织与运行方式。

## Requirements

### Requirement: 独立的组件测试工作区 SHALL 存在

仓库必须提供一个名为 `sci-comp-test` 的独立测试应用，并使用 Vitest 与 React Testing Library 对组件库进行验证。该工作区在迁移完成后必须成为组件行为测试的规范承载位置。

#### Scenario: 开发者运行组件测试

- **WHEN** 贡献者执行仓库级测试流程
- **THEN** `sci-comp-test` 工作区必须通过 Vitest 运行组件测试，而不是继续依赖旧的根级单包测试布局

#### Scenario: 测试工作区在仓库结构中可识别

- **WHEN** 开发者查看迁移后的 monorepo
- **THEN** 组件验证资产必须位于独立的 `sci-comp-test` 工作区，而不是混在文档站或组件库 package 的职责中

### Requirement: 现有通用组件测试覆盖 SHALL 保留

测试工作区必须保留当前项目中已有的通用组件自动化验证覆盖，至少包括 Button、Input、Table 与 Form。

#### Scenario: 现有 wrapper 组件测试迁移完成

- **WHEN** 测试工作区完成内容迁移
- **THEN** Button、Input、Table 与 Form 必须分别在 `sci-comp-test` 中保留自动化测试覆盖

#### Scenario: 后续通用组件继续进入同一测试工作区

- **WHEN** 后续新增 Modal、Tabs 或其他通用组件
- **THEN** 它们的自动化测试必须继续落在 `sci-comp-test` 中，而不是分散到临时测试目录

### Requirement: 共享测试工具 SHALL 归属于测试工作区

测试工作区必须持有共享 render 工具、providers、setup 文件以及测试所需的 Vitest 环境配置，以保证组件库测试方式一致。

#### Scenario: 组件测试需要共享渲染工具

- **WHEN** 某个组件测试需要公共渲染包装器或全局测试初始化能力
- **THEN** 这些能力必须由 `sci-comp-test` 工作区内维护的文件提供

#### Scenario: 新增测试文件接入公共能力

- **WHEN** 贡献者新增一个组件测试文件
- **THEN** 该测试必须能够直接使用测试工作区中的共享测试工具，而不需要从组件库 package 源码目录导入这些工具

### Requirement: 测试工作区 SHALL 与组件库 package 边界集成

测试工作区必须通过工作区 package 边界或仅用于测试的明确源码别名来消费组件库。测试验证的必须是迁移后的组件库实现，而不是陈旧的重复副本。

#### Scenario: 测试文件导入组件

- **WHEN** 测试文件引用 Button、Input、Table 或 Form
- **THEN** 导入路径必须解析到迁移后的组件库工作区 package，或其批准的测试别名

#### Scenario: 组件库行为变化后重新验证

- **WHEN** 组件库 package 中的实现发生变化
- **THEN** 重新运行测试工作区时，必须直接验证更新后的实现，而不需要任何手动同步步骤
