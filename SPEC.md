# SPEC

## 1. Objective

### 1.1 Primary Goal

本仓库的后续功能迭代应围绕 `@sci-comp/core` 组件库、`sci-comp-documention` 文档站、`sci-comp-test` 测试工作区与配套工程流程建立统一规范，确保每次变更都具备清晰目标、明确验收条件、可执行验证命令与稳定收口路径。

### 1.2 Target Users

本规范同时面向两类用户：

- **组件库维护者**：负责组件、主题系统、文档与工程流程的设计、实现、验证与发布。
- **业务接入方**：在业务项目中消费组件库，需要通过稳定的 API、主题契约、文档与示例完成接入。

### 1.3 Success Criteria

一项非平凡变更只有在以下条件全部满足时，才视为完成：

1. 需求目标、范围、验收标准与边界约束已明确。
2. 变更实现遵循当前技术栈与架构约束。
3. 自动化验证命令通过，包括至少与变更直接相关的 test、typecheck、build。
4. 若涉及前端、文档站、主题系统或交互变化，已完成关键路径人工验收。
5. 若涉及高风险动作，已在执行前取得用户确认。

---

## 2. Commands

### 2.1 Common Development Commands

以下命令是本仓库常见的验证与开发入口，后续变更应按需选用并在验收中明确列出：

```bash
pnpm install
pnpm --filter sci-comp-test test
pnpm --filter sci-comp-documention typecheck
pnpm --filter sci-comp-documention build
```

### 2.2 Command Expectations

- **测试命令**：用于验证组件行为、主题系统链路与文档侧测试辅助能力。
- **typecheck**：用于验证 TypeScript 类型完整性，尤其是组件 props、主题 token、文档示例与测试辅助类型。
- **build**：用于验证文档站可以稳定构建，新增页面、导航与 doc-components 不会破坏产物生成。

### 2.3 Verification Rule

每项非平凡变更的交付说明中必须写清：

1. 运行了哪些命令。
2. 这些命令为什么足以覆盖本次改动。
3. 如果有未运行的命令，为什么本次可以不运行。

---

## 3. Project Structure

### 3.1 Core Workspaces

- `packages/sci-comp-core/`
  - 通用组件库 package。
  - 承载组件源码、类型、样式、主题系统与对外导出。
- `apps/sci-comp-documention/`
  - 基于 Rspress 的文档站。
  - 承载快速开始、主题系统说明、组件文档、交互示例与 doc-components。
- `apps/sci-comp-test/`
  - 组件测试工作区。
  - 承载 Vitest / React Testing Library 测试、主题验证与文档侧辅助测试。
- `openspec/`
  - 变更提案、任务拆解、delta spec、主 spec 与归档目录。
- 根目录工程配置
  - 统一维护 pnpm workspace、turbo、lint、format、typecheck、hooks 与仓库级约束。

### 3.2 Ownership Rules

- **组件实现与主题运行时逻辑** 只能落在 `packages/sci-comp-core/`。
- **文档内容、指南页、主题解释型组件与站点导航** 只能落在 `apps/sci-comp-documention/`。
- **测试辅助、测试用例、双通道验证** 只能落在 `apps/sci-comp-test/`。
- **规格、提案、任务与归档** 只能落在 `openspec/`。

### 3.3 Documentation Responsibility Split

- `packages/sci-comp-core/README.md`
  - 提供 package 级速览与入口说明。
  - 不承载完整主题系统规则。
- `apps/sci-comp-documention/docs/guide/getting-started.md`
  - 只保留最小接入路径与跳转入口。
- `apps/sci-comp-documention/docs/guide/theme-system.md`
  - 作为主题系统的单一权威说明入口。
- 组件文档页
  - 承载组件级说明、示例与消费方式。

---

## 4. Code Style

### 4.1 Technology Baseline

后续实现默认沿用当前技术栈：

- React 19
- TypeScript 5.x
- Ant Design v6
- pnpm workspace + turborepo
- Vitest + React Testing Library
- Rspress

### 4.2 Component Rules

- 基础组件必须继续基于 **Ant Design v6 wrapper** 实现。
- 不允许为了视觉或局部便利退回原生自实现，替代已有 AntD 封装约束。
- Button / Input / Table / Form 当前必须满足该封装基线，后续同类基础组件应继续遵循。

### 4.3 Theme and Styling Rules

- 颜色、圆角、尺寸等样式能力必须优先通过 **token / 主题系统** 表达。
- 禁止在组件实现中新增硬编码颜色值。
- 主题能力应继续围绕“单一主题输入 + 双输出通道”组织：
  - 一侧映射 AntD token
  - 一侧映射 CSS variables
- 新增或修改主题能力时，优先复用 seed / semantic / component token 分层，不要绕过主题入口写零散样式规则。

### 4.4 Scope Discipline

- 只修改与当前任务直接相关的文件和行为。
- 不顺手清理无关代码、无关文档、无关 worktree 或无关工程项。
- 不增加未被要求的新能力、抽象或流程。

---

## 5. Testing Strategy

### 5.1 Required Verification Dimensions

每项非平凡变更必须至少覆盖以下三个维度中的相关部分：

1. **自动化测试**：验证行为、数据映射或主题链路。
2. **静态检查**：验证类型、导出与站点配置完整性。
3. **构建验证**：验证文档站或相关产物可成功构建。

### 5.2 Minimum Acceptance Requirements

每项非平凡变更都必须写清：

- acceptance criteria
- 命令级验证步骤
- 人工验收路径（如适用）

### 5.3 Manual Verification Expectations

以下类型的变更必须补充人工检查：

- 文档站导航调整
- 主题系统说明页调整
- playground / 交互式说明组件调整
- 组件视觉或交互行为变化

人工检查至少应说明：

- 入口是否可达
- 关键路径是否可操作
- 主题或样式是否双通道同步生效
- README / 快速开始 / 指南页之间是否职责清晰、无明显冲突

### 5.4 Example Verification Sets

- **组件库主题改动**
  - `pnpm --filter sci-comp-test test`
  - 相关主题测试或组件测试
- **文档站结构或主题说明改动**
  - `pnpm --filter sci-comp-documention typecheck`
  - `pnpm --filter sci-comp-documention build`
  - 人工检查导航与页面内容
- **跨 workspace 改动**
  - 组合执行 test + typecheck + build，并说明覆盖面

---

## 6. Boundaries

### 6.1 Always Do

- 先明确目标、范围、验收标准与影响面，再开始非平凡实现。
- 输出可核验的验证证据，不以“看起来没问题”代替完成标准。
- 前端与文档改动默认补人工验收路径。
- 主题与样式相关改动默认检查双输出通道是否一致。

### 6.2 Ask First

以下高风险动作必须先征得用户确认：

- 删除文件、目录、分支、worktree 或归档内容
- 覆盖用户现有未提交修改
- push、创建 PR、修改远端可见状态
- 修改依赖、CI/CD、hooks、settings 或权限配置
- 执行可能影响共享状态或难以回滚的仓库操作

### 6.3 Never Do

- 不擅自删除用户未明确要求清理的旧代码、旧文档或旧流程资产。
- 不在基础组件中绕过 AntD 封装基线搞大幅自实现替代。
- 不在组件中新增硬编码颜色值，破坏主题 token 契约。
- 不在没有验证证据的情况下声称任务完成。
- 不把 README、快速开始、主题系统指南和组件文档的职责重新混淆。
