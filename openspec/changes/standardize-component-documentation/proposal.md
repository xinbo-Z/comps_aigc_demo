## Why

当前组件文档页已经具备基础可浏览能力，但不同组件页面的章节结构、信息层次和封装边界表达并不统一，导致用户很难快速判断“组件是什么、何时使用、与 antd 原生能力相比有什么差异”。现在推进组件文档规范化，可以把 Progress 页沉淀为试点模板，并逐步形成整站统一的中文组件文档结构。

## What Changes

- 建立统一的中文组件文档结构规范，明确组件定义、组件定位、适用场景、实时预览、基础用法、关键示例、常用属性、选型建议、封装说明等章节的适用范围
- 以 Progress 组件页作为首个规范化试点，补齐适合其能力边界的信息层次
- 识别哪些组件适合补“常用属性”轻量摘要，哪些组件更适合强调使用模式与封装边界
- 约束后续组件文档优化方向，避免页面粒度失衡或重复抄写 Ant Design 官方 API
- **BREAKING**：无

## Capabilities

### New Capabilities

- `component-doc-standardization`: 定义组件文档页的统一中文结构、章节层次和适用规则，覆盖通用模板与不同组件类型的落点建议

### Modified Capabilities

- `progress-docs`: 将 Progress 文档要求从“具备基础入口与示例”扩展为“符合统一中文模板的规范化组件页”，补充组件定位、常用属性摘要、选型建议与封装说明等要求

## Impact

- Affected code:
  - `apps/sci-comp-documention/docs/components/*.mdx`
  - `apps/sci-comp-documention/docs/HomePage.tsx`
  - `apps/sci-comp-documention/doc-components/`
  - `openspec/changes/standardize-component-documentation/`
  - `openspec/specs/`
- APIs:
  - 不新增运行时组件 API，主要变更文档结构、文档要求与组件页内容组织方式
- Dependencies:
  - 继续复用现有 React、Rspress、`@sci-comp/core` 与 OpenSpec 体系，不新增第三方依赖
- Systems:
  - 组件文档页内容规范、OpenSpec 中文产物、后续文档评审标准将受到影响
