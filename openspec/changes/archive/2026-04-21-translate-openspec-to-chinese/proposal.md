## Why

当前 `openspec/` 目录下的 proposal、design、tasks 与 spec 内容仍以英文为主，而项目明确要求文档相关内容与协作输出统一使用中文，这会导致 OpenSpec 产物与项目文档语言不一致，增加后续评审、维护与协作成本。现在将 OpenSpec 内容统一转换为中文，可以让规范、设计和任务表达更贴近团队阅读习惯，也能与文档站的中文体系保持一致。

## What Changes

- 将 `openspec/changes/` 下活跃变更中的 proposal、design、tasks 与 delta specs 内容统一转换为中文表达
- 将 `openspec/specs/` 下主 specs 内容统一转换为中文表达，同时保留规范关键字与结构要求
- 统一 OpenSpec 中文书写规则，明确哪些结构字段应保留英文规范格式，哪些正文内容应使用中文
- 校验转换后的 OpenSpec 内容仍满足现有 schema 与归档 / apply / sync 工作流要求
- **BREAKING**：无

## Capabilities

### New Capabilities

- `openspec-chinese-localization`: 定义 OpenSpec 产物的中文化规则，覆盖变更文档、主 specs 与 delta specs 的正文表达方式，并约束结构兼容性

### Modified Capabilities

- `component-doc-standardization`: 将该变更下的 OpenSpec proposal、design、tasks 与后续 specs 内容统一切换为中文表达，以符合新的 OpenSpec 中文化规则
- `progress-docs`: 将主 spec 与归档变更中的相关 spec 正文统一为中文表达，同时保持 Requirement / Scenario 结构可被 OpenSpec 正常识别

## Impact

- Affected code:
  - `openspec/changes/**/*.md`
  - `openspec/specs/**/*.md`
  - `openspec/changes/archive/**/*.md`
- APIs:
  - 不新增运行时 API，主要影响 OpenSpec 文档内容与协作规范
- Dependencies:
  - 不新增第三方依赖，继续复用现有 OpenSpec CLI 与当前 schema
- Systems:
  - OpenSpec proposal / design / specs / tasks 的编写、评审、apply、sync、archive 流程将统一按中文内容运行
