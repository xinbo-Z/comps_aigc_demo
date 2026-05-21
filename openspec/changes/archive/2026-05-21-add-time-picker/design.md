## Context

项目组件库 @sci-comp/core 已封装 Button、Input、Table、Form、Modal、Tabs、Progress 七个基础组件，均基于 antd v6 封装。当前缺少时间选择类组件，表单场景中时间输入只能直接使用 antd TimePicker，无法享受项目统一的样式收敛和主题 Token 体系。

现有组件封装层次从薄到厚依次为：Progress（纯透传）→ Modal（微增强）→ Button（语义映射）→ Input（结构增强）→ Table（功能增强）。TimePicker 定位为 Modal 模式（微增强），即 antd props 透传 + 少量默认行为 + CSS Module 样式收敛。

组件目录结构遵循 `packages/sci-comp-core/src/components/general/<component-name>/` 约定，每个组件包含 index.ts、types.ts、Component.tsx、Component.module.css 四个标准文件。

## Goals / Non-Goals

**Goals:**

- 新增 TimePicker 和 TimeRangePicker 两个独立组件，基于 antd TimePicker 封装
- 设置合理的默认行为（format 默认 `HH:mm:ss`）
- CSS Module 样式收敛，使用项目主题 Token
- 支持 forwardRef 以便程序化聚焦
- 扩展 SchemaForm 支持 `timePicker` 和 `timeRangePicker` 字段类型
- 在 @sci-comp/core 公共入口统一导出

**Non-Goals:**

- 不新增主题 Component Token，复用 `inputRadius` / `inputHeight`
- 不实现自定义时间面板或自定义 DSL
- 不改变 antd TimePicker 的核心交互行为
- 不支持 `TimePicker.RangePicker` 静态属性访问模式
- 不在本次变更中实现组件文档和测试（后续独立任务）

## Decisions

### 1. 封装层次选择：微增强（Modal 模式）

**选择**: 方案 B — antd props 透传 + 少量默认行为 + CSS Module

**备选方案**:

- A: 纯透传（Progress 模式）— 无增强，封装意义仅在于统一导出入口
- C: 结构增强（Input 模式）— 加 label/helperText 包裹层

**理由**: TimePicker 的 antd API 本身已经很干净，没有语义冲突的 prop 需要映射。默认 format 是最常见的增强需求，CSS Module 用于样式收敛。不需要像 Input 那样加 label/helperText 包裹层，因为表单场景由 Form.Item 承担标签职责。

### 2. RangePicker 独立导出

**选择**: 独立导出 `TimeRangePicker`，不使用 `TimePicker.RangePicker` 静态属性模式

**备选方案**:

- 静态属性模式: `TimePicker.RangePicker` — 与 antd 心智模型一致
- 独立导出: `import { TimeRangePicker } from '@sci-comp/core'`

**理由**: 项目中 Tabs 组件也采用了扁平化 API 设计（items 模式而非子组件模式），独立导出与项目风格一致。同时独立导出使 TypeScript 类型更清晰，SchemaForm 集成更自然。需在文档中说明与 antd 用法的差异。

### 3. SchemaForm props 粒度：精选常用 prop

**选择**: 与 FormSchemaNumberField 一致，精选常用 prop

**备选方案**:

- 全量透传（与 FormSchemaInputField 的 inputProps 一致）
- 精选常用 prop（与 FormSchemaNumberField 的 numberProps 一致）

**理由**: SchemaForm 的 schema 定义应保持简洁。TimePicker 在表单场景中常用的控制项有限（format、步长、12小时制、禁用、占位符、清除、此刻按钮），精选 prop 可以避免 schema 定义过于复杂。用户如需更细粒度控制，可使用 `passthroughProps` 或直接使用 TimePicker 组件。

精选 prop 列表:

- TimePicker: `format` | `hourStep` | `minuteStep` | `secondStep` | `use12Hours` | `disabled` | `placeholder` | `allowClear` | `showNow`
- TimeRangePicker: 同上 + `order`

### 4. 主题 Token 复用策略

**选择**: 复用 `inputRadius` / `inputHeight`，不新增 TimePicker 专属 Component Token

**理由**: TimePicker 视觉上与 Input 一致（同为控制元素），共享尺寸和圆角符合设计一致性。新增 Token 会增加维护成本且无实际收益。

### 5. 默认 format 行为

**选择**: 默认 `format='HH:mm:ss'`，步长保持 antd 默认值（均为 1）

**理由**: `HH:mm:ss` 是最常见的时间格式需求。步长保持 antd 默认值 1，不改变 antd 原有行为，避免用户困惑。用户可通过 props 覆盖 format 和步长。

## Risks / Trade-offs

- **[RangePicker 独立导出与 antd 心智模型不一致]** → 在组件文档中明确说明用法差异，提供从 antd 迁移的示例
- **[SchemaForm 中 TimePicker value 为 dayjs 对象]** → initialValue 类型为 unknown，dayjs 对象可正常传递给 antd Form.Item，无需特殊处理；但需在文档中提醒用户 initialValue 应传入 dayjs 对象
- **[CSS Module 必要性有限]** → antd v6 CSS-in-JS 已通过主题 Token 控制大部分样式，CSS Module 主要用于覆盖弹出面板的间距/圆角等细节，以及为未来样式扩展预留入口；初始版本 CSS Module 内容可能较少
- **[精选 props 可能不满足所有场景]** → 用户可通过 SchemaForm 的 `passthroughProps` 传递任意 antd TimePicker prop，不丧失灵活性
