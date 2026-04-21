## Context

当前仓库中的 OpenSpec 内容存在明显的语言不一致问题：部分 proposal、design、tasks 与 spec 使用英文正文，部分变更与归档内容已经开始使用中文，导致整个 `openspec/` 目录难以形成统一的阅读与维护习惯。与此同时，项目级约束已经明确要求文档相关内容与回答统一使用中文，因此 OpenSpec 作为规范、设计和实施协作的核心媒介，也需要完成同样的语言统一。

这次变更并不是简单地逐文件翻译，而是要在保证 OpenSpec 工作流可继续使用的前提下，明确哪些内容可以转换为中文、哪些结构必须保持原有格式。例如：`## ADDED Requirements`、`### Requirement:`、`#### Scenario:`、`WHEN/THEN` 这类被工具依赖的结构化关键字仍需保留，而需求描述、场景正文、proposal / design / tasks 的自然语言部分则应转换为中文。除此之外，还要考虑活跃 change、主 specs 与已归档 change 三类内容之间的一致性，避免后续 apply、sync、archive 时再次出现中英文混杂。

## Goals / Non-Goals

**Goals:**

- 为 `openspec/` 目录建立统一的中文化规则，明确结构关键字与自然语言正文的边界
- 将活跃 change、主 specs 与归档 change 中应转换的 OpenSpec 内容统一为中文表达
- 保证转换后的 proposal、design、tasks 与 specs 仍兼容现有 OpenSpec schema、sync、apply 与 archive 流程
- 为后续新增 OpenSpec change 提供统一的中文编写基线

**Non-Goals:**

- 不修改 OpenSpec CLI、本地 schema 或工具解析逻辑
- 不将 Requirement / Scenario 等结构关键字改成中文，避免破坏工具识别
- 不在本次变更中调整组件实现、文档站运行时代码或业务逻辑
- 不重新设计 OpenSpec 目录结构，仅统一已有内容的语言与表达规范

## Decisions

### 1. 采用“结构关键字保留英文，正文内容统一中文”的翻译边界

**Decision:** 保留 OpenSpec 依赖的结构关键字与规范语法，例如 `## ADDED Requirements`、`### Requirement:`、`#### Scenario:`、`WHEN/THEN`，仅将这些结构下的说明文字、需求描述、场景正文与 proposal / design / tasks 的自然语言内容转换为中文。

**Why:**

- 这些关键字直接影响 OpenSpec 对 spec 增量的识别与同步，修改为中文会带来流程兼容性风险。
- 团队真正需要中文化的是“可读内容”，而不是破坏结构化语法本身。
- 这种边界最清晰，也最适合在后续新增 change 时长期执行。

**Alternatives considered:**

- 全量翻译所有关键字：可读性更统一，但可能破坏 OpenSpec 工具链。
- 完全不处理 specs，只翻译 proposal / design / tasks：无法真正实现 `openspec/` 目录整体中文化。

### 2. 范围覆盖活跃 change、主 specs 与归档 change，而不是只处理当前活跃内容

**Decision:** 中文化范围应覆盖 `openspec/changes/`、`openspec/specs/` 与 `openspec/changes/archive/` 中的相关 Markdown 内容，而不是仅处理当前活跃变更。

**Why:**

- 如果只翻译活跃 change，归档与主 specs 仍会保持英文，整体规范会继续碎片化。
- 主 specs 与归档 change 在后续回顾、sync 与历史追溯中都可能被读取，语言统一能降低维护成本。
- 归档内容虽然不再实施，但仍属于协作语境的一部分。

**Alternatives considered:**

- 仅处理活跃 change：改动小，但无法完成“OpenSpec 下内容都转换为中文”的目标。
- 仅处理主 specs：会忽略大量 proposal / design / tasks 语境信息。

### 3. 先定义中文化规范，再按能力与目录类型逐步实施

**Decision:** 先通过 specs 明确 OpenSpec 中文化规则，再在 tasks 中分层拆解为：翻译活跃 change、翻译主 specs、翻译归档 change、验证流程兼容性。

**Why:**

- 这次变更影响范围大，如果没有先定义规则，后续实际翻译容易出现风格与边界不一致。
- 将工作按目录类型拆分，更容易检查漏项，也利于后续 review。
- 规范先行可以让后续任何新增 change 自动遵循中文化基线。

**Alternatives considered:**

- 直接逐文件翻译：推进快，但质量难统一，且容易漏掉结构约束。
- 只写规则不落实现有文件：不能满足用户对现存内容中文化的要求。

## Risks / Trade-offs

- [部分 spec 结构被误译，导致 OpenSpec 工具无法识别] → Mitigation：明确保留结构关键字，并在实施后运行相关状态 / sync 校验
- [归档 change 数量增加后，人工翻译成本较高] → Mitigation：按目录分批处理，并优先统一规则与当前高频使用内容
- [活跃 change 与主 specs 翻译风格不一致] → Mitigation：在 design 与 specs 中先定义统一中文写作规范，再按同一基线执行
- [“全部中文化”目标与工具英文语法保留产生认知偏差] → Mitigation：在规则中明确“内容中文化，不等于结构关键字本地化”

## Migration Plan

1. 在 OpenSpec 中新增“OpenSpec 中文化”能力要求，定义哪些内容必须中文、哪些关键字必须保留英文
2. 更新已有主 specs 与相关 change specs，使内容正文符合中文化规则
3. 更新活跃 change 与归档 change 中的 proposal、design、tasks 与 spec 正文
4. 运行 OpenSpec 状态检查与必要流程验证，确认 apply / sync / archive 不受影响

本次变更不涉及运行时代码迁移。
如需回滚，可恢复被翻译的 Markdown 内容，但应优先保留已经验证通过的结构边界规则。

## Open Questions

- 是否要把 `openspec/config.yaml` 中的注释说明也一并中文化，还是仅处理流程产物
- 对归档 change 是否需要全部翻译，还是只翻译当前仍会被参考的归档条目
- 后续是否需要在项目根 `CLAUDE.md` 或 OpenSpec 使用说明中补充“OpenSpec 内容默认使用中文”的显式约束
