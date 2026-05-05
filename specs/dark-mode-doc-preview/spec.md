# 文档项目组件展示暗黑模式兼容规格

## 1. Objective

### 1.1 Primary Goal

为 `apps/sci-comp-documention` 的组件展示部分补齐 Rspress 暗黑模式兼容能力。当前文档项目在常规模式下展示正常，但切换到暗黑模式后，组件展示区域中的预览卡片、说明文本、代码容器、背景层级、边框和典型交互控件会出现样式异常；本次需求要求在不改动 core 组件运行时主题体系的前提下，让文档展示层在亮色与暗黑模式下都保持可读、稳定且一致。

### 1.2 Target Users

- **文档站使用者**：浏览组件文档、查看示例、对比组件表现的业务开发者。
- **文档维护者**：维护组件展示容器、doc-components、指南页展示模块与文档视觉一致性的组件库维护者。

### 1.3 Success Criteria

本次规格的完成标准如下：

1. 文档项目中通用组件展示区域在亮色与暗黑模式下都可正常阅读。
2. 组件展示区域中的预览卡片、说明文本、代码展示容器、背景、边框与典型控件不出现明显对比度问题或视觉异常。
3. 修复范围覆盖文档项目里的**通用展示区域**，而不是只修单一页面的局部样式。
4. 本次改动限制在文档展示层；若必须改动 `packages/sci-comp-core/` 的公共样式、主题 token 或主题 API，必须先确认。
5. 交付时必须附带 typecheck、build 和必要人工验收结果；如补充自动化测试，也要提供测试结果。

---

## 2. Commands

### 2.1 Common Development Commands

本次需求至少需要围绕以下命令组织开发与验收：

```bash
pnpm --filter sci-comp-documention typecheck
pnpm --filter sci-comp-documention build
pnpm --filter sci-comp-test test
```

### 2.2 Command Expectations

- **typecheck**：验证文档展示组件、预览容器、页面引用、主题适配逻辑与相关类型定义的正确性。
- **build**：验证 Rspress 文档站在当前改动下可成功构建，暗黑模式兼容不会破坏页面生成。
- **test**：若本次新增或更新了文档展示层相关测试，应运行与改动直接相关的测试集合。

### 2.3 Verification Rule

交付说明中必须明确：

1. 本次运行了哪些命令。
2. 为什么这些命令足以覆盖组件展示暗黑模式兼容的影响面。
3. 如果某个常规命令未运行，为什么本次可以不运行，并通过什么方式补足证据。

---

## 3. Project Structure

### 3.1 Relevant Scope

本次需求默认涉及以下路径：

- `apps/sci-comp-documention/`
  - 组件文档页中的展示区域
  - 指南页中的展示型模块
  - `doc-components/` 下的通用展示容器、预览区、说明区、代码容器等
  - 与明暗模式切换相关的展示层样式入口
- `apps/sci-comp-test/`
  - 如需补充文档展示层渲染或主题切换相关测试，可在此增加或更新测试

### 3.2 Out of Scope by Default

以下内容默认不在本次范围内：

- `packages/sci-comp-core/` 运行时主题系统重构
- 建立一套独立于现有 token / CSS variables 的暗黑模式体系
- 扩展为整站大规模视觉重设计
- 把本次需求升级为完整品牌换肤或 dark mode 平台化工程

### 3.3 Ownership Rules

- **暗黑模式兼容逻辑** 优先落在文档展示层。
- **通用展示区域样式修复** 应优先集中在可复用展示组件中，而不是零散分布到每个页面。
- **测试补充** 应放入测试工作区或文档相关测试路径中，保持验证路径可复用。

---

## 4. Code Style

### 4.1 Technology Baseline

继续沿用当前项目技术栈：

- React 19
- TypeScript 5.x
- Rspress
- Ant Design v6
- pnpm workspace + turborepo
- Vitest + React Testing Library

### 4.2 Theme and Styling Rules

- 优先复用现有主题 token、CSS variables、Rspress 暗黑模式上下文与文档展示层现有样式机制。
- 不新增与现有主题体系平行的独立暗黑样式系统。
- 修复时应重点关注：
  - 文本颜色
  - 背景色
  - 边框色
  - 代码容器与展示卡片的表面层级
  - 典型控件在展示区中的视觉可读性
- 如果文档展示区存在硬编码亮色样式，应将其替换为可在明暗模式下正常工作的表达方式。

### 4.3 Scope Discipline

- 先识别通用展示区域的共性问题，再做集中修复。
- 不顺手重构无关页面、导航或首页结构。
- 不擅自删除现有展示组件、说明页面或导航项。
- 若必须改 core 组件公共样式、主题 token 或主题 API，必须先问。

---

## 5. Testing Strategy

### 5.1 Required Verification Dimensions

本次需求至少覆盖以下验证维度：

1. **静态检查**：文档站 typecheck 通过。
2. **构建验证**：文档站 build 通过。
3. **人工验收**：在亮色 / 暗黑模式切换下验证关键展示路径。
4. **自动化测试（如适用）**：若补充测试，应验证展示层关键区域在渲染与主题切换场景下的稳定性。

### 5.2 Manual Verification Expectations

人工验收至少应覆盖：

- 在 Rspress 中切换亮色 / 暗黑主题
- 检查组件文档页中的展示区域
- 检查指南页中的展示模块
- 检查以下典型元素：
  - 预览卡片
  - 说明文本
  - 代码块 / 代码展示容器
  - 按钮
  - 输入框
  - 边框与背景层级

### 5.3 Acceptance Criteria Format

实现前或交付时必须明确列出：

- 哪些区域被视为“通用组件展示部分”
- 哪些页面被抽样或完整检查
- 如何判定“暗黑模式下样式无异常”
- 哪些问题若仍存在则视为未完成

### 5.4 Example Verification Set

最小验收集应接近：

```bash
pnpm --filter sci-comp-documention typecheck
pnpm --filter sci-comp-documention build
```

若本次新增测试，再补充：

```bash
pnpm --filter sci-comp-test test
```

并配合人工验收：

- 切换亮 / 暗主题
- 检查组件页与指南页展示模块
- 检查按钮、输入框、代码块、说明文字等典型元素

---

## 6. Boundaries

### 6.1 Always Do

- 先明确哪些展示区域属于本次修复目标。
- 默认优先修通用展示容器，而不是逐页堆局部补丁。
- 输出可核验的 typecheck / build / 人工验收结果。
- 如新增测试，说明测试与暗黑模式问题之间的对应关系。

### 6.2 Ask First

以下情况必须先征得用户确认：

- 需要改动 `packages/sci-comp-core/` 中的公共样式、主题 token 或主题 API
- 需要改变组件展示层之外的站点结构或导航设计
- 需要删除或替换现有展示组件、页面内容或说明结构
- 需要引入新依赖、修改 CI、修改共享主题机制或影响共享状态的设置

### 6.3 Never Do

- 不擅自把本次需求扩展成整个主题系统重构。
- 不新建一套与现有主题 token 平行的暗黑样式体系。
- 不删除无关页面、无关导航或无关展示组件。
- 不在没有验证证据的情况下声称完成。
- 不在未确认前通过修改 core 组件主题能力来顺手解决文档层问题。
