## ADDED Requirements

### Requirement: 仪器面板 SHALL 支持可配置布局组合

`InstrumentPanel` 应支持可配置的面板布局，并可通过拖拽交互重新排列。

#### Scenario: 操作员重排面板模块

- **WHEN** 用户将受支持的面板模块拖拽到新位置
- **THEN** `InstrumentPanel` 必须更新布局排列，以反映新的组合方式

### Requirement: 仪器面板 SHALL 支持实时状态指示

`InstrumentPanel` 应支持面向仪器操作状态的实时状态指示。

#### Scenario: 状态指示器发生变化

- **WHEN** 消费页面更新某个仪器信号或指示器的状态模型
- **THEN** 面板必须在 UI 中渲染对应的实时状态指示

### Requirement: 仪器面板 SHALL 支持领域特定控制输入

`InstrumentPanel` 应支持面向操作员的控制输入，包括旋钮式控件和滑块控件。

#### Scenario: 用户调整旋钮或滑块控件

- **WHEN** 用户与受支持的旋钮或滑块控件交互
- **THEN** 面板必须通过其强类型交互契约暴露变化后的控制值

### Requirement: 仪器面板 SHALL 支持报警阈值配置

`InstrumentPanel` 应支持查看和调整报警阈值的 UI 流程，但不在组件内部嵌入设备协议执行逻辑。

#### Scenario: 用户更新报警阈值

- **WHEN** 用户在面板中编辑已配置的报警阈值
- **THEN** 面板必须暴露更新后的阈值状态，供消费应用进一步处理
