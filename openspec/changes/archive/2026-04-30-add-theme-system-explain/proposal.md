## Why

当前 `@sci-comp/core` 已经具备以 semantic token 为中心的主题系统实现，并且文档站快速开始页已经包含最小主题接入示例，但项目仍缺少一套完整、稳定、可维护的主题系统说明。开发者现在只能从零散 README、快速开始片段和源码导出中自行拼凑心智模型，难以快速理解单一主题源、双输出通道、兼容变量层与后续维护边界，也不利于业务项目正确进行主题覆盖与扩展。

## What Changes

- 为组件库新增一套面向开发者的主题系统说明方案，覆盖主题心智模型、单一主题源、AntD token 与 CSS variables 双输出机制、token 分层职责、业务接入方式、兼容层与维护规则。
- 在文档站新增权威主题指南页，沉淀当前主题系统的完整使用说明与后续维护约束。
- 调整快速开始和相关 README 内容分工：README 提供速览入口，快速开始保留最小接入示例，完整规则统一收敛到主题指南页。
- 为主题系统文档补充兼容变量映射、推荐/禁止做法、验证方式与常见业务改法，降低未来继续分裂变量体系的风险。

## Capabilities

### New Capabilities

- `theme-system-docs`: 定义组件库主题系统说明、接入路径、维护规则与兼容层文档契约

### Modified Capabilities

- `documentation-site`: 文档站新增主题系统指南入口，并将主题说明组织为稳定、可扩展的指南结构

## Impact

- 受影响代码与内容主要位于 `packages/sci-comp-core/README.md`
- `apps/sci-comp-documention/docs/guide/` 下的指南页面与导航配置将更新
- `apps/sci-comp-documention/README.md` 将补充文档维护分工与主题说明权威来源
- 不涉及组件运行时 API 变更，但会影响开发者接入主题系统、维护 CSS variable contract 与扩展主题能力的方式
