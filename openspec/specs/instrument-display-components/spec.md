## Purpose

定义以展示为主的科学仪器组件 MVP 要求，涵盖波形图、实时表格和参数配置场景。

## Requirements

### Requirement: 以展示为主的仪器组件集合 SHALL 可用

组件库应提供 `WaveformChart`、`RealtimeDataTable` 和 `ParamConfigForm`，作为 MVP 科学仪器组件集合。

#### Scenario: 开发者构建仪器相关页面

- **WHEN** 业务前端开发者使用 MVP 组件库创建仪器相关页面
- **THEN** 开发者必须能够将 `WaveformChart`、`RealtimeDataTable` 和 `ParamConfigForm` 作为公共组件使用

### Requirement: 以数据输入驱动的组件契约 SHALL 成立

仪器展示组件应通过类型化 props 接收显式的输入数据和配置，并且不应要求内建的传输、订阅或工作流编排逻辑。

#### Scenario: 页面传入波形数据

- **WHEN** 页面将波形数据传入 `WaveformChart`
- **THEN** 组件必须基于提供的数据契约进行渲染，而不依赖内部数据源

#### Scenario: 页面传入实时表格行数据

- **WHEN** 页面将当前记录传入 `RealtimeDataTable`
- **THEN** 组件必须渲染这些记录，而不拥有上游刷新机制

#### Scenario: 页面传入参数 schema 和数值

- **WHEN** 页面将参数定义和当前值传入 `ParamConfigForm`
- **THEN** 组件必须基于这些输入 props 渲染并管理输入体验

### Requirement: 波形可视化状态 SHALL 清晰可见

`WaveformChart` 应支持面向展示的波形可视化，用于业务页面，包括基础图表渲染，以及对加载中或空数据状态的清晰可见处理。

#### Scenario: 存在波形数据

- **WHEN** `WaveformChart` 接收到有效的波形数据
- **THEN** 它必须以组件库的主题风格渲染波形可视化

#### Scenario: 缺少波形数据

- **WHEN** `WaveformChart` 没有可渲染的数据
- **THEN** 它必须展示清晰的空状态或占位状态

### Requirement: 实时表格展示状态 SHALL 清晰可见

`RealtimeDataTable` 应支持面向实时场景的表格展示，包括记录展示、面向状态的单元格，以及对空数据或刷新相关状态的清晰可见处理。

#### Scenario: 当前记录可用

- **WHEN** `RealtimeDataTable` 接收到一条或多条当前记录
- **THEN** 它必须以适合业务用户监控实时数据的表格形式渲染这些记录

#### Scenario: 当前没有记录

- **WHEN** `RealtimeDataTable` 没有接收到任何记录
- **THEN** 它必须展示清晰的空状态

### Requirement: 参数配置表单行为 SHALL 可用

`ParamConfigForm` 应支持可配置仪器参数的展示与输入，包括分组展示、默认值、校验反馈，以及在配置时的只读展示能力。

#### Scenario: 提供可编辑参数

- **WHEN** `ParamConfigForm` 接收到可编辑的参数定义和参数值
- **THEN** 它必须为这些参数渲染一个可用的输入表单

#### Scenario: 提供只读参数

- **WHEN** `ParamConfigForm` 被配置为只读展示模式
- **THEN** 它必须在不提供可编辑控件的情况下展示参数值

#### Scenario: 提交无效输入

- **WHEN** 用户提交违反配置校验规则的参数输入
- **THEN** 表单必须在成功提交前展示校验反馈
