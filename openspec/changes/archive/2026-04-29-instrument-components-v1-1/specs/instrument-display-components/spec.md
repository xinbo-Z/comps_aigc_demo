## MODIFIED Requirements

### Requirement: 以展示为主的仪器组件集合 SHALL 可用

组件库应提供 `WaveformChart`、`RealtimeDataTable` 和 `ParamConfigForm`，作为 MVP 科学仪器组件集合，同时允许在独立的专业扩展包中定义额外的高级能力。

#### Scenario: 开发者使用 MVP 组件构建仪器相关页面

- **WHEN** 业务前端开发者使用 MVP 组件库创建仪器相关页面
- **THEN** 开发者必须能够将 `WaveformChart`、`RealtimeDataTable` 和 `ParamConfigForm` 作为公共组件使用，而不依赖专业扩展特性

### Requirement: 以数据输入驱动的组件契约 SHALL 成立

在 MVP 基线中，仪器展示组件应通过类型化 props 接收显式的输入数据和配置，并且不应要求内建的传输、订阅、工作流编排或设备协议所有权。

#### Scenario: 页面传入波形数据

- **WHEN** 页面将波形数据传入 `WaveformChart`
- **THEN** 组件必须基于提供的数据契约进行渲染，而不依赖内部数据源

#### Scenario: 页面传入实时表格行数据

- **WHEN** 页面将当前记录传入 `RealtimeDataTable`
- **THEN** 组件必须渲染这些记录，而不拥有上游刷新机制

#### Scenario: 页面传入参数 schema 和数值

- **WHEN** 页面将参数定义和当前值传入 `ParamConfigForm`
- **THEN** 组件必须基于这些输入 props 渲染并管理输入体验
