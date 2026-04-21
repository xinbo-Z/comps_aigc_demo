## Why

当前通用组件库已经具备 Button、Input、Table、Form、Modal、Tabs 等基础组件，但缺少 Progress 这类常见反馈型组件，导致组件生态在进度展示场景下仍不完整。现在补充 Progress 组件，可以让文档站、测试工程和核心组件库在状态反馈类场景下形成更完整的基础能力集合。

## What Changes

- 在 `@sci-comp/core` 中新增 Progress 通用组件，补齐进度展示能力
- 为 Progress 组件定义统一的封装语义、类型接口和对外导出方式
- 在文档站中补充 Progress 组件文档与示例说明
- 在测试工程中补充 Progress 组件的基础渲染与行为验证

## Capabilities

### New Capabilities

- `progress-component`: 提供基于 Ant Design v6 Progress 组件封装的通用进度展示能力，覆盖组件导出、文档说明和测试验证

### Modified Capabilities

- 无

## Impact

- Affected code:
  - `packages/sci-comp-core`
  - `apps/sci-comp-documention`
  - `apps/sci-comp-test`
- APIs:
  - `@sci-comp/core` 将新增 Progress 组件及相关类型导出
- Dependencies:
  - 继续复用现有 `antd`、React、TypeScript、Rspress、Vitest 依赖，不计划新增第三方依赖
- Systems:
  - 文档站组件目录、核心包导出入口、测试工作区覆盖范围将同步扩展
