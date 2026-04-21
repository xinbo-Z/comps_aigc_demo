## Why

MVP 仪器组件已经建立了以展示为主的基础能力，但科学仪器应用还需要更高性能的可视化、更丰富的分析工作流，以及更强的专业控制界面来满足专业场景。现在需要定义一个 v1.1 扩展，用于补充这些高级能力，同时不破坏 MVP 已建立的清晰边界。

## What Changes

- 在现有 `hik-comps` MVP 之上，为面向仪器的组件新增一个 v1.1 专业扩展包。
- 为 `WaveformChart` 扩展高密度 Canvas 渲染、实时流集成钩子、导航交互、多通道叠加和导出能力。
- 引入 `SpectrumChart` 作为新的专业分析组件，用于支持多种谱图类型、峰值操作、叠加对比和基线校正工作流。
- 引入 `InstrumentPanel` 作为新的可配置控制面板组件，支持布局组合、实时状态指示、领域特定控件和报警阈值交互。
- 为 `ParamConfigForm` 扩展分组参数展示、参数联动与约束、模板支持，以及结构化配置导入/导出。
- 为 `RealtimeDataTable` 扩展流式追加行为、基于阈值的高亮、暂停/恢复控制，以及可配置缓冲。
- 通过要求专业 UI 与交互能力而不将设备协议实现、编排逻辑或完整算法平台嵌入组件本身，来保持清晰的组件边界。

## Capabilities

### New Capabilities

- `advanced-waveform-and-spectrum`: 定义 `WaveformChart` 和 `SpectrumChart` 的高级科学可视化要求，包括高密度渲染、分析交互、叠加展示和导出型工作流。
- `instrument-control-panel`: 定义 `InstrumentPanel` 的专业控制面板要求，包括布局组合、状态信号、交互控制和面向阈值的报警配置。
- `advanced-parameter-configuration`: 定义 `ParamConfigForm` 的高级参数配置要求，包括分组、约束、联动、模板和导入/导出行为。
- `streaming-instrument-data-table`: 定义 `RealtimeDataTable` 的流式表格要求，包括仅追加更新、高亮、暂停/恢复行为和有界缓冲。

### Modified Capabilities

- `instrument-display-components`: 细化 MVP 的以展示为主的仪器能力，使基础组件集保持精简，而高级行为则迁移到 v1.1 专业扩展中。

## Impact

- 影响 `WaveformChart`、`ParamConfigForm` 和 `RealtimeDataTable` 的公共要求及其未来实现形态。
- 在 instrument 层新增 `SpectrumChart` 和 `InstrumentPanel` 两个公共专业组件。
- 为面向仪器的组件引入新的性能、交互和导出预期，尤其聚焦于 Canvas 渲染、流式数据和分析工作流。
- 更清晰地区分组件级专业 UI 能力与设备通信协议、编排系统、后端订阅管理等范围外职责。
