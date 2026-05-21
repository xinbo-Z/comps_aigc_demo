## ADDED Requirements

### Requirement: TimePicker 组件基础封装

TimePicker 组件 SHALL 基于 antd TimePicker 封装，透传所有 antd TimePicker props，并通过 CSS Module 收敛样式。组件 MUST 支持 forwardRef 以便程序化调用 focus()/blur() 等方法。

#### Scenario: 基本渲染

- **WHEN** 使用 `<TimePicker />` 渲染组件
- **THEN** 组件正常渲染，视觉表现与 antd TimePicker 一致，并应用项目 CSS Module 样式

#### Scenario: antd props 透传

- **WHEN** 向 TimePicker 传入任意 antd TimePicker 支持的 prop（如 onChange、disabled、suffixIcon 等）
- **THEN** 该 prop SHALL 原样传递给底层 antd TimePicker

#### Scenario: ref 转发

- **WHEN** 通过 ref 访问 TimePicker 实例
- **THEN** SHALL 能调用 antd TimePicker 暴露的 focus()/blur() 等方法

#### Scenario: 自定义 className 合并

- **WHEN** 向 TimePicker 传入 className prop
- **THEN** 自定义 className SHALL 与 CSS Module 样式类名合并，而非覆盖

### Requirement: TimePicker 默认 format

TimePicker 组件 SHALL 将 `format` 默认值设为 `'HH:mm:ss'`。用户可通过 prop 覆盖此默认值。

#### Scenario: 使用默认 format

- **WHEN** 渲染 `<TimePicker />` 不传 format prop
- **THEN** 时间选择面板 SHALL 显示时、分、秒三列，format 为 `HH:mm:ss`

#### Scenario: 覆盖默认 format

- **WHEN** 渲染 `<TimePicker format="HH:mm" />`
- **THEN** 时间选择面板 SHALL 仅显示时、分两列，format 为 `HH:mm`

### Requirement: TimeRangePicker 独立组件

TimeRangePicker SHALL 作为独立组件导出，不通过 TimePicker.RangePicker 静态属性访问。组件基于 antd TimePicker.RangePicker 封装，透传所有 antd RangePicker props，CSS Module 样式收敛，支持 forwardRef。

#### Scenario: 独立导入

- **WHEN** 从 `@sci-comp/core` 导入 `TimeRangePicker`
- **THEN** SHALL 获得一个可独立使用的时间范围选择器组件

#### Scenario: 基本渲染

- **WHEN** 使用 `<TimeRangePicker />` 渲染组件
- **THEN** 组件正常渲染为时间范围选择器，视觉表现与 antd RangePicker 一致

#### Scenario: ref 转发

- **WHEN** 通过 ref 访问 TimeRangePicker 实例
- **THEN** SHALL 能调用 antd RangePicker 暴露的方法

#### Scenario: 默认 format

- **WHEN** 渲染 `<TimeRangePicker />` 不传 format prop
- **THEN** 时间选择面板 SHALL 显示时、分、秒三列，format 为 `HH:mm:ss`

### Requirement: 公共入口导出

TimePicker 和 TimeRangePicker 及其 Props 类型 SHALL 通过 `packages/sci-comp-core/src/index.ts` 统一导出。

#### Scenario: 组件导入

- **WHEN** 从 `@sci-comp/core` 导入 `TimePicker` 和 `TimeRangePicker`
- **THEN** SHALL 成功获得对应组件

#### Scenario: 类型导入

- **WHEN** 从 `@sci-comp/core` 导入 `TimePickerProps` 和 `TimeRangePickerProps` 类型
- **THEN** SHALL 成功获得对应 TypeScript 类型

### Requirement: SchemaForm timePicker 字段类型

SchemaForm SHALL 支持 `timePicker` 字段类型，在 schema 中声明 `type: 'timePicker'` 或 `component: 'timePicker'` 时，渲染 TimePicker 组件。

#### Scenario: schema 中使用 timePicker 类型

- **WHEN** SchemaForm 的 schema 包含 `{ name: 'startTime', type: 'timePicker', label: '开始时间' }`
- **THEN** SHALL 渲染 Form.Item 包裹的 TimePicker 组件

#### Scenario: timePickerProps 精选 prop 透传

- **WHEN** schema 字段包含 `timePickerProps: { hourStep: 2, minuteStep: 15, use12Hours: true }`
- **THEN** 这些 props SHALL 传递给底层 TimePicker 组件

#### Scenario: timePickerProps 完整精选列表

- **WHEN** 使用 timePickerProps
- **THEN** 支持的 prop SHALL 为: `format` | `hourStep` | `minuteStep` | `secondStep` | `use12Hours` | `disabled` | `placeholder` | `allowClear` | `showNow`

### Requirement: SchemaForm timeRangePicker 字段类型

SchemaForm SHALL 支持 `timeRangePicker` 字段类型，在 schema 中声明 `type: 'timeRangePicker'` 或 `component: 'timeRangePicker'` 时，渲染 TimeRangePicker 组件。

#### Scenario: schema 中使用 timeRangePicker 类型

- **WHEN** SchemaForm 的 schema 包含 `{ name: 'timeRange', type: 'timeRangePicker', label: '时间范围' }`
- **THEN** SHALL 渲染 Form.Item 包裹的 TimeRangePicker 组件

#### Scenario: timeRangePickerProps 精选 prop 透传

- **WHEN** schema 字段包含 `timeRangePickerProps: { order: false, minuteStep: 30 }`
- **THEN** 这些 props SHALL 传递给底层 TimeRangePicker 组件

#### Scenario: timeRangePickerProps 完整精选列表

- **WHEN** 使用 timeRangePickerProps
- **THEN** 支持的 prop SHALL 为: `format` | `hourStep` | `minuteStep` | `secondStep` | `use12Hours` | `disabled` | `placeholder` | `allowClear` | `order`

### Requirement: 主题 Token 使用

TimePicker 和 TimeRangePicker 的 CSS Module 样式 SHALL 使用项目主题 Token（`--sci-input-radius`、`--sci-input-height` 等），禁止硬编码颜色值。

#### Scenario: 样式使用主题变量

- **WHEN** 检查 TimePicker.module.css 中的样式规则
- **THEN** 所有颜色、圆角、尺寸 SHALL 使用 `var(--sci-*)` CSS 变量，不包含硬编码的 hex 或 rgba 值

### Requirement: TypeScript 类型完整性

TimePickerProps 和 TimeRangePickerProps SHALL 有完整的 TypeScript 类型定义，禁止使用 any 类型。

#### Scenario: Props 类型无 any

- **WHEN** 检查 types.ts 中的类型定义
- **THEN** SHALL 不包含 any 类型，所有属性均有明确类型

#### Scenario: Props 命名规范

- **WHEN** 检查类型命名
- **THEN** SHALL 遵循组件名 + "Props" 命名规范（TimePickerProps、TimeRangePickerProps）
