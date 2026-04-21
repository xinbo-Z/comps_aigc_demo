## Purpose

定义 OpenSpec 面向人阅读内容的中文化规则与结构兼容约束。

## Requirements

### Requirement: OpenSpec 内容 SHALL 对面向人阅读的内容使用中文

系统 SHALL 在 `openspec/` 目录下对面向人阅读的正文内容统一使用中文表达，包括 proposal、design、tasks，以及 specs 中的需求说明与场景描述。

#### Scenario: proposal 与 design 内容使用中文

- **WHEN** 用户或协作者阅读 `openspec/changes/` 下的 proposal、design 与 tasks 文件
- **THEN** 这些文件中的自然语言正文 SHALL 使用中文表达

#### Scenario: spec 描述使用中文

- **WHEN** 用户或协作者阅读 `openspec/specs/` 或 change delta specs 中的 requirement 描述与 scenario 正文
- **THEN** 这些结构化条目中的说明文字 SHALL 使用中文表达

### Requirement: OpenSpec 结构语法 SHALL 与工具链兼容

系统 SHALL 保留 OpenSpec 依赖的结构化关键字与语法格式，以确保中文化后的内容仍可被当前工具链识别。

#### Scenario: Requirement 与 Scenario 语法保持有效

- **WHEN** specs 或 delta specs 被 OpenSpec CLI 读取、同步或校验
- **THEN** `## ADDED Requirements`、`### Requirement:`、`#### Scenario:` 以及 `WHEN/THEN` 等结构关键字 SHALL 保持工具兼容格式

#### Scenario: 中文化不会破坏工作流

- **WHEN** 用户继续执行 apply、sync、archive 或 status 等 OpenSpec 工作流
- **THEN** 中文化后的 OpenSpec 内容 SHALL 不破坏现有工作流的正常运行
