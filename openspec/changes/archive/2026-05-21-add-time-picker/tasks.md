## 1. TimePicker 类型定义

- [x] 1.1 创建 `packages/sci-comp-core/src/components/general/time-picker/types.ts`，定义 `TimePickerProps`（extends AntTimePickerProps）和 `TimeRangePickerProps`（extends antd TimePicker.RangePicker 的 Props），确保无 any 类型
- [x] 1.2 验证：运行 `pnpm typecheck` 确认类型定义无报错

## 2. TimePicker 组件实现

- [x] 2.1 创建 `packages/sci-comp-core/src/components/general/time-picker/TimePicker.tsx`，实现 forwardRef 包裹 antd TimePicker，设置默认 format 为 `HH:mm:ss`，合并 CSS Module className
- [x] 2.2 创建 `packages/sci-comp-core/src/components/general/time-picker/TimePicker.module.css`，使用 `var(--sci-input-radius)` 和 `var(--sci-input-height)` 等主题变量，不硬编码颜色值
- [x] 2.3 验证：在 sci-comp-test 中渲染 TimePicker，确认默认 format 为 HH:mm:ss、className 合并正确、ref 可调用 focus()/blur()

## 3. TimeRangePicker 组件实现

- [x] 3.1 创建 `packages/sci-comp-core/src/components/general/time-picker/TimeRangePicker.tsx`，实现 forwardRef 包裹 antd TimePicker.RangePicker，设置默认 format 为 `HH:mm:ss`，合并 CSS Module className
- [x] 3.2 验证：在 sci-comp-test 中渲染 TimeRangePicker，确认默认 format 为 HH:mm:ss、独立导入可用、ref 转发正常

## 4. 组件导出

- [x] 4.1 创建 `packages/sci-comp-core/src/components/general/time-picker/index.ts`，导出 TimePicker、TimeRangePicker 及其 Props 类型
- [x] 4.2 修改 `packages/sci-comp-core/src/index.ts`，新增 TimePicker、TimeRangePicker、TimePickerProps、TimeRangePickerProps 的导出
- [x] 4.3 验证：从 `@sci-comp/core` 导入 TimePicker 和 TimeRangePicker，确认组件和类型均可正常导入

## 5. SchemaForm 类型扩展

- [x] 5.1 修改 `packages/sci-comp-core/src/components/general/form/types.ts`，在 `FormSchemaFieldComponent` 和 `FormSchemaFieldType` 中新增 `'timePicker'` 和 `'timeRangePicker'`
- [x] 5.2 新增 `FormSchemaTimePickerField` 接口，包含 `timePickerProps` 精选 prop（format、hourStep、minuteStep、secondStep、use12Hours、disabled、placeholder、allowClear、showNow）
- [x] 5.3 新增 `FormSchemaTimeRangePickerField` 接口，包含 `timeRangePickerProps` 精选 prop（同上 + order）
- [x] 5.4 在 `FormSchemaField` 联合类型中新增两个成员
- [x] 5.5 修改 `packages/sci-comp-core/src/components/general/form/index.ts`，新增 FormSchemaTimePickerField 和 FormSchemaTimeRangePickerField 的类型导出
- [x] 5.6 验证：运行 `pnpm typecheck` 确认所有类型变更无报错

## 6. SchemaForm 渲染扩展

- [x] 6.1 修改 `packages/sci-comp-core/src/components/general/form/SchemaForm.tsx`，在 `renderControl` 函数中新增 `'timePicker'` 和 `'timeRangePicker'` 两个 case，分别渲染 TimePicker 和 TimeRangePicker 组件
- [x] 6.2 验证：在 sci-comp-test 中使用 SchemaForm 渲染包含 timePicker 和 timeRangePicker 字段的表单，确认组件正常渲染、timePickerProps/timeRangePickerProps 透传正确

## 7. 整体验证

- [x] 7.1 运行 `pnpm typecheck` 确认全项目类型检查通过
- [ ] 7.2 运行 `pnpm build` 确认构建成功
