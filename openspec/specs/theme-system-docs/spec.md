## Purpose

定义组件库主题系统说明文档的能力边界，确保开发者和维护者能够通过单一权威入口理解、接入并维护 `@sci-comp/core` 的主题系统。

## Requirements

### Requirement: 主题系统说明 SHALL 提供单一权威入口

组件库项目必须提供一套面向开发者的主题系统说明，并通过单一权威页面集中解释主题系统的核心心智模型、主题输入到双输出通道的流转关系、token 分层职责、业务接入方式、兼容层与维护规则，而不是继续让开发者依赖零散 README、快速开始片段和源码推断使用方式。

#### Scenario: 开发者首次了解主题系统

- **WHEN** 开发者需要理解 `@sci-comp/core` 的主题系统如何工作
- **THEN** 文档必须提供一个稳定入口，说明单一主题源如何同时驱动 AntD token 与 CSS variables，并解释开发者应从哪里开始阅读

#### Scenario: 维护者查阅主题规则

- **WHEN** 维护者需要判断应该修改 seed token、semantic token 还是 component token
- **THEN** 主题系统说明必须明确各层职责边界与常见判断规则，而不是仅罗列导出 API

### Requirement: 主题系统说明 SHALL 覆盖接入、兼容与维护约束

主题系统说明必须覆盖业务项目最小接入方式、同一份 theme override 同时影响 AntD wrapper 与 CSS Module wrapper 的使用约束、历史 CSS variable 兼容层映射、推荐/禁止做法以及修改后的验证要求，以帮助开发者正确接入并维持当前主题 contract 的一致性。

#### Scenario: 业务项目按统一入口接入主题

- **WHEN** 业务项目需要自定义主题主色、圆角或控件高度
- **THEN** 文档必须给出最小可复制示例，并明确要求共享同一份 theme override 来生成 AntD token 与 CSS variables

#### Scenario: 开发者处理历史变量迁移

- **WHEN** 开发者遇到旧变量名如 `--text-h`、`--bg` 或 `--accent`
- **THEN** 文档必须说明这些变量与规范化 `--sci-*` 变量之间的映射关系，并声明旧变量仅用于迁移兼容而不是新代码默认入口

#### Scenario: 维护者新增或调整主题 token

- **WHEN** 维护者准备新增 token 或调整现有主题映射
- **THEN** 文档必须提供维护规则、禁止事项与最低验证项，确保主题修改不会只影响双输出通道中的单侧结果
