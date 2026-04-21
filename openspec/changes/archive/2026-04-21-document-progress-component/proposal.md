## Why

`@sci-comp/core` 中已经新增了 Progress 组件，但 `apps/sci-comp-documention` 的首页组件入口与 Progress 组件页内容还没有同步补全，导致用户在文档站中难以发现该组件，也无法快速理解它的典型使用方式。现在补全文档站展示与说明，可以让新增组件真正进入可浏览、可理解、可复用的状态。

## What Changes

- 在文档站首页新增 Progress 组件入口，使其与现有基础组件一起展示
- 补充 Progress 组件文档页内容，完善组件定位、适用场景与更完整的使用示例
- 明确首页与组件页之间的浏览路径，让用户可以从首页进入 Progress 详细文档
- 保持现有 Rspress 结构与组件文档组织方式，不引入新的文档系统或交互模式

## Capabilities

### New Capabilities

- `progress-docs`: 提供 Progress 组件在文档站中的完整展示能力，覆盖首页入口、组件说明与典型示例补全

### Modified Capabilities

- None

## Impact

- Affected code:
  - `apps/sci-comp-documention/docs/HomePage.tsx`
  - `apps/sci-comp-documention/docs/components/progress.mdx`
  - `apps/sci-comp-documention/docs/index.mdx`
- APIs:
  - 不新增组件库运行时 API，仅补全文档站内容与入口
- Dependencies:
  - 继续复用现有 React、Rspress 与 `@sci-comp/core` 依赖，不新增第三方依赖
- Systems:
  - 文档站首页组件入口与 Progress 组件文档页内容将保持同步更新
