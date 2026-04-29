## MODIFIED Requirements

### Requirement: 基础组件集合 SHALL 可用

组件库应将 `Button`、`Form`、`Table` 和 `Modal` 作为 MVP 公共 API 的基础业务组件提供；其中已经依赖自定义样式变量的基础组件在后续演进中 MUST 能逐步迁移到以 semantic token 为中心的样式消费体系，而不是继续绑定历史变量名和零散硬编码样式值。

#### Scenario: 开发者使用基础组件

- **WHEN** 业务前端开发者使用 MVP 组件库
- **THEN** 开发者必须能够导入并渲染 `Button`、`Form`、`Table` 和 `Modal`

#### Scenario: 基础组件迁移到统一语义主题体系

- **WHEN** Button、Form 或 Modal 的样式继续演进
- **THEN** 组件默认样式 MUST 以统一的 semantic token 为消费入口，而不是继续依赖历史变量名或硬编码圆角、尺寸和状态色

### Requirement: 使用模型 SHALL 与 Ant Design 对齐

基础组件应保持对 Ant Design 6 用户来说熟悉的使用模型，同时允许组件库定义更适合业务场景的默认行为；在此基础上，组件样式的主题表达 MUST 通过统一主题系统完成，而不是让相同交互状态在不同组件间使用分裂的样式变量来源。

#### Scenario: 开发者使用常见按钮模式

- **WHEN** 开发者配置常见的按钮变体和状态
- **THEN** 对熟悉 Ant Design 按钮用法的开发者而言，组件行为必须保持可理解

#### Scenario: 开发者使用常见表单、表格和弹窗模式

- **WHEN** 开发者配置标准表单布局、数据表格展示或弹窗确认流程
- **THEN** API 模型必须与常见的 Ant Design 心智模型保持一致

#### Scenario: 交互状态样式来自统一主题语义

- **WHEN** 组件渲染 hover、focus、disabled 或 danger 等常见状态
- **THEN** 这些状态的样式 MUST 由统一主题语义驱动，而不是在不同组件里各自使用不一致的变量命名和派生方式
