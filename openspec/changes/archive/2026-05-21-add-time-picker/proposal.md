## Why

项目组件库（@sci-comp/core）当前缺少时间选择类组件，表单场景中涉及时间输入的需求（如定时任务配置、考勤时间选择、预约时段设置等）只能直接使用 antd TimePicker，无法享受项目统一的样式收敛和主题 Token 体系。同时 SchemaForm 也不支持 timePicker / timeRangePicker 字段类型，导致 schema 驱动表单无法覆盖时间选择场景。

## What Changes

- 新增 `TimePicker` 组件，基于 antd TimePicker 封装，设置默认 format 为 `HH:mm:ss`，CSS Module 样式收敛，支持 forwardRef
- 新增 `TimeRangePicker` 组件，独立导出（非静态属性模式），同样默认 format 为 `HH:mm:ss`，CSS Module 样式收敛，支持 forwardRef
- 扩展 SchemaForm 的 `FormSchemaFieldComponent` 联合类型，新增 `'timePicker'` 和 `'timeRangePicker'` 两种字段类型
- 新增 `FormSchemaTimePickerField` 和 `FormSchemaTimeRangePickerField` 接口，精选常用 prop 透传
- 在 SchemaForm 的 `renderControl` 中新增对应 case，渲染 TimePicker / TimeRangePicker
- 在 `packages/sci-comp-core/src/index.ts` 中新增 TimePicker 和 TimeRangePicker 的导出

## Capabilities

### New Capabilities

- `time-picker-component`: TimePicker 和 TimeRangePicker 组件的 Props 定义、默认行为、样式收敛、ref 转发，以及 SchemaForm 集成

### Modified Capabilities

（无现有 capability 需要修改）

## Impact

- **packages/sci-comp-core/**: 新增 time-picker 组件目录及文件；修改 src/index.ts 新增导出；修改 form/types.ts 新增 schema 类型；修改 form/SchemaForm.tsx 新增渲染分支；修改 form/index.ts 新增类型导出
- **apps/sci-comp-test/**: 需新增 TimePicker / TimeRangePicker 的组件测试
- **apps/sci-comp-documention/**: 需新增 TimePicker / TimeRangePicker 的组件文档
- **API 影响**: 新增公开导出的 TimePicker、TimeRangePicker 组件及若干类型，无破坏性变更
- **依赖**: 无新增外部依赖，antd 已包含 TimePicker
