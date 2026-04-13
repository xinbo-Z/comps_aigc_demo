## ADDED Requirements

### Requirement: 纯组件库包边界
仓库必须提供一个独立的组件库 package，该 package 只承载可复用组件源码、样式、类型定义、构建配置与公开导出。文档页面、应用脚手架与测试用例文件在迁移完成后不得继续保留在该 package 内。

#### Scenario: 开发者查看组件库 package
- **WHEN** 贡献者打开组件库工作区
- **THEN** 他们必须只看到组件实现资产与包级构建元信息，而不会看到混入其中的文档站页面或测试工作区测试套件

#### Scenario: 迁移移除混合职责
- **WHEN** 组件库 package 创建完成
- **THEN** 现有文档资产与测试资产必须迁移到各自独立的工作区，而不是继续留在组件 package 源码树下

### Requirement: 面向消费方的稳定公开导出
组件库 package 必须通过显式 package exports 暴露稳定入口，用于导出通用组件、相关类型以及后续新增组件。monorepo 内部消费者必须通过 package 边界导入，而不是深层引用任意内部文件。

#### Scenario: 文档站消费组件
- **WHEN** 文档站导入 Button、Input、Table 或 Form
- **THEN** 它必须通过组件库 package 的公开入口完成导入，而不是复制组件代码或继续从旧的根级源码目录直接导入

#### Scenario: 测试工作区消费组件
- **WHEN** 测试工作区执行组件测试
- **THEN** 它必须通过工作区 package 边界或批准的源码别名配置解析组件库

### Requirement: 现有 wrapper 组件在迁移后继续可用
组件库 package 必须保留当前阶段已经产出的通用组件集合，包括 Button、Input、Table 与 Form，并持续满足它们基于 Ant Design 的 wrapper 实现约束。

#### Scenario: 已有通用组件迁入组件库 package
- **WHEN** 组件库 package 完成组装
- **THEN** Button、Input、Table 与 Form 必须继续通过 package 公共 API 可用，并保留当前 wrapper 语义

#### Scenario: 后续 wrapper 组件沿用同一 package 模式
- **WHEN** 后续新增 Modal、Tabs 或其他通用组件
- **THEN** 它们必须在同一个组件库 package 中实现与导出，而不是落在并行的临时目录中

### Requirement: 组件库 package 负责构建输出
组件库 package 必须独立负责生成供消费者使用的 JavaScript 产物与类型产物。可复用库的构建配置必须随 package 一起维护，并可通过该工作区脚本直接执行。

#### Scenario: 在组件库 package 中执行构建
- **WHEN** 开发者或 CI 运行组件库构建任务
- **THEN** 该 package 必须从自身工作区输出约定的运行时代码与类型产物

#### Scenario: 下游工作区依赖组件库构建契约
- **WHEN** 文档站或校验流程需要使用组件库构建结果
- **THEN** 它们必须能够依赖组件库 package 的构建任务，而不是继续依赖旧的根级构建步骤
