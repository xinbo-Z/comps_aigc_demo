## Context

当前组件库已经覆盖 Button、Input、Table、Form、Modal、Tabs 等常用基础组件，并通过 `@sci-comp/core` 对外统一导出；文档站和测试工程分别消费该核心包完成展示与验证。但在进度反馈场景下，组件库仍缺少 Progress 组件，导致“状态反馈类基础组件”能力不完整。

现有仓库结构已经具备新增单个基础组件所需的全部支撑：

- 核心包通过 `packages/sci-comp-core/src/index.ts` 统一导出组件与类型
- 文档站通过 `apps/sci-comp-documention/rspress.config.ts` 维护组件导航与侧边栏
- 测试工程通过 `apps/sci-comp-test/vitest.config.ts` 直接联动核心包源码
- 项目已有明确约束：通用基础组件必须基于 Ant Design v6 官方组件进行封装开发

因此，本次变更应沿用现有 Button / Input / Table / Form / Modal / Tabs 的组织方式，在不新增依赖、不引入新架构的前提下，把 Progress 纳入现有组件体系。

## Goals / Non-Goals

**Goals:**
- 在 `@sci-comp/core` 中新增基于 Ant Design v6 Progress 的通用 Progress 组件
- 为 Progress 提供统一的类型导出与包级导出入口
- 在文档站中补充 Progress 组件文档页与导航入口
- 在测试工程中补充 Progress 组件的基础渲染与行为验证
- 保持组件新增方式与当前通用组件目录、导出结构和文档组织方式一致

**Non-Goals:**
- 不引入新的第三方依赖或新的构建方式
- 不重构现有组件目录结构或导出模式
- 不在本次变更中扩展超出基础封装范围的复杂业务能力
- 不修改已有组件的 API 设计，除非是为了与 Progress 文档导航整合所需的最小改动

## Decisions

### 1. 沿用现有“general 组件 + index 导出”的组织模式
**Decision:** Progress 组件应放入 `packages/sci-comp-core/src/components/general/progress/`，并通过该目录局部导出后，再在 `packages/sci-comp-core/src/index.ts` 中统一对外导出。

**Why:**
- 当前 Button / Input / Table / Form / Modal / Tabs 都采用相同模式，新增 Progress 继续沿用可以保持目录一致性与心智一致性。
- 这种方式对文档站和测试工程最友好，不需要引入额外的注册机制或特殊导入路径。

**Alternatives considered:**
- 直接把 Progress 写入某个已有目录：会破坏单组件单目录的边界。
- 新增单独的 feedback 分类目录：目前仓库没有采用按组件类型分层的结构，单独为 Progress 引入新目录会造成结构不统一。

### 2. 基于 antd Progress 做轻量 wrapper，而不是自定义实现
**Decision:** Progress 必须直接基于 Ant Design v6 的 Progress 组件封装，优先复用其原生能力与类型，而不是自定义一套进度条实现。

**Why:**
- 这符合当前项目的核心约束：通用基础组件必须基于 antd 官方组件进行封装开发。
- antd 的 Progress 已覆盖线性进度、圆形进度、状态展示等主流基础能力，轻量封装即可满足组件生态补全目标。

**Alternatives considered:**
- 自定义样式实现一套 Progress：不符合现有封装原则，也会增加维护与兼容成本。
- 直接透传 antd Progress 不做封装：虽然可用，但不利于统一组件库的导出入口、类型命名和后续文档/测试维护。

### 3. 文档站采用“新增组件页 + 更新 sidebar”的最小接入方式
**Decision:** 在 `apps/sci-comp-documention/docs/components/` 下新增 Progress 文档页，并在 `apps/sci-comp-documention/rspress.config.ts` 中补充 Progress 入口。

**Why:**
- 当前文档站组件页就是按单组件文档维护，导航由 `rspress.config.ts` 统一维护，新增 Progress 应沿用现有路径。
- 这样可以让 Progress 立即进入组件列表，与现有 Button / Input / Table / Form / Modal / Tabs 保持一致展示方式。

**Alternatives considered:**
- 只更新 README 或首页，不新增独立组件页：无法形成完整组件文档入口。
- 单独做聚合页介绍 Progress：不符合当前文档站“一个组件一个页面”的组织方式。

### 4. 测试工程沿用源码 alias 验证基础渲染能力
**Decision:** 在 `apps/sci-comp-test` 中新增 Progress 组件测试文件，继续通过现有 alias 直接验证核心包源码行为。

**Why:**
- `vitest.config.ts` 已将 `@sci-comp/core` 指向核心包源码入口，新增组件测试可以无缝复用现有测试模式。
- 对于单个基础组件新增，优先补齐渲染、基础状态和关键 props 显示逻辑的测试即可，覆盖范围与当前组件测试方式保持一致。

**Alternatives considered:**
- 仅靠文档站手动验证：不足以形成自动化回归保障。
- 为 Progress 引入更复杂的视觉回归测试：超出当前测试工作区既有模式，不适合作为本次首选方案。

## Risks / Trade-offs

- [Progress props 透传过多，导致封装边界不清晰] → Mitigation：优先复用 antd 类型，但只暴露当前组件库需要的最小封装语义，避免无边界扩展
- [文档站只补入口不补示例，导致组件可发现但不可理解] → Mitigation：组件页需至少提供基础示例和使用说明，保持与现有组件文档一致
- [测试覆盖不足，导致后续调整易回归] → Mitigation：至少补齐基础渲染、关键状态/类型场景和核心 props 显示相关测试
- [新增组件后导出遗漏，导致文档和测试无法正常消费] → Mitigation：实现时同步检查局部 index 与根 `src/index.ts` 的导出链路

## Migration Plan

1. 在核心包中新增 Progress 组件目录、类型与导出
2. 更新 `packages/sci-comp-core/src/index.ts`，将 Progress 纳入统一导出
3. 在文档站补充 Progress 文档页，并更新 `rspress.config.ts` 中的组件导航
4. 在测试工程补充 Progress 测试用例
5. 运行 typecheck、测试和必要的文档验证，确认 Progress 已进入组件生态

本次变更属于新增能力，不涉及历史数据迁移。
如需回滚，可删除 Progress 组件实现、导出、文档页和测试文件，并恢复文档导航配置。

## Open Questions

- Progress 首批是否只覆盖 antd 原生最常用能力，还是要同时加入项目级语义扩展（当前建议先以最小封装为主）
- 文档页是否需要同时展示线性进度与圆形进度两个基础示例（当前建议至少覆盖一种基础示例，并在实现阶段按现有文档模式补充）
