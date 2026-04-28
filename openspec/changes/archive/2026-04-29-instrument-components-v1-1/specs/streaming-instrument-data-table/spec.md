## ADDED Requirements

### Requirement: 实时数据表格 SHALL 扩展基础表格行为

`RealtimeDataTable` 应在组件库 `Table` 能力之上扩展流式数据展示行为，以满足仪器监控工作流。

#### Scenario: 页面使用流式数据表格

- **WHEN** 消费页面在实时监控工作流中渲染 `RealtimeDataTable`
- **THEN** 组件必须在基础表格模型之上提供基于表格的展示能力

### Requirement: 实时数据表格 SHALL 支持追加式流更新

`RealtimeDataTable` 应支持通过追加新记录来处理数据流更新，而不要求采用整表刷新式交互模型。

#### Scenario: 新的流式记录到达

- **WHEN** 消费页面向表格提供增量新记录
- **THEN** `RealtimeDataTable` 必须通过追加式行为更新可见数据集，而不是要求用户重新打开或重新初始化表格视图

### Requirement: 实时数据表格 SHALL 支持基于阈值的高亮

`RealtimeDataTable` 应支持对超过设定阈值的行或单元格进行可配置高亮。

#### Scenario: 新到达的数据值超过阈值

- **WHEN** 某条流式记录中的数值超过已配置阈值
- **THEN** 表格必须根据配置的强调规则高亮对应的行或单元格

### Requirement: 实时数据表格 SHALL 支持暂停和恢复控制

`RealtimeDataTable` 应支持暂停和恢复可见的流式更新。

#### Scenario: 操作员暂停可见更新

- **WHEN** 用户暂停实时表格数据流
- **THEN** 表格必须停止应用新的可见更新，直到用户恢复数据流

#### Scenario: 操作员恢复可见更新

- **WHEN** 用户恢复实时表格数据流
- **THEN** 表格必须根据其已配置的缓冲行为恢复应用传入更新

### Requirement: 实时数据表格 SHALL 支持有界缓冲

`RealtimeDataTable` 应支持对保留的流式记录配置缓冲区大小。

#### Scenario: 达到缓冲上限

- **WHEN** 已保留记录数量达到配置的缓冲区大小上限
- **THEN** 表格必须对流式记录执行已配置的保留边界策略
