# SPEC

## 1. Objective

### 1.1 Primary Goal

本次变更目标是让 `apps/sci-comp-documention` 中文档项目的**组件展示部分**兼容 Rspress 暗黑模式。当前亮色模式展示正常，但在暗黑模式下组件预览区、示例卡片、说明文本、代码展示容器和相关控件出现样式异常；本次需要在**不改动 core 组件运行时主题能力**的前提下，修复文档展示层在明暗主题切换下的可读性与视觉一致性。

### 1.2 Target Users

本规范同时面向两类用户：

- **文档站使用者**：浏览组件文档、查看示例与预览区的业务开发者。
- **文档维护者**：负责维护组件展示容器、预览模块、说明区域与文档主题适配的组件库维护者。

### 1.3 Success Criteria

本次暗黑模式兼容只有在以下条件全部满足时才视为完成：

1. 文档项目中的通用组件展示区域在亮色/暗黑模式下都可正常阅读。
2. 预览卡片、示例区、说明文本、代码展示容器、按钮、输入框等典型元素在暗黑模式下不出现明显背景、边框、文字或对比度异常。
3. 修复范围控制在**文档展示层**，不擅自扩散为 core 组件主题系统重构。
4. 自动化验证命令通过，且补充了明暗主题切换下的人工验收路径。
5. 如发现修复必须改动 core 公共样式、主题 token 或主题 API，需先征得用户确认。

---

## 2. Commands

### 2.1 Common Development Commands

本次变更至少应围绕以下命令组织验证：

```bash
pnpm --filter sci-comp-documention typecheck
pnpm --filter sci-comp-documention build
pnpm --filter sci-comp-test test
```

### 2.2 Command Expectations

- **typecheck**：验证文档展示组件、预览容器、页面引用与主题适配逻辑的类型完整性。
- **build**：验证 Rspress 文档站在当前改动下可成功构建，暗黑模式适配不会破坏页面产物生成。
- **test**：若本次补充了文档展示层相关测试、主题切换测试或渲染测试，应运行与改动直接相关的测试集合。

### 2.3 Verification Rule

交付说明中必须写清：

1. 本次实际运行了哪些命令。
2. 为什么这些命令足以覆盖文档展示层暗黑模式修复。
3. 若未新增自动化测试，需说明原因，并以人工验收补足证据。

---

## 3. Project Structure

### 3.1 Relevant Scope

本次变更仅覆盖以下范围：

- `apps/sci-comp-documention/`
  - 组件展示页
  - doc-components
  - 预览卡片与示例容器
  - 指南页中的展示型模块
- `apps/sci-comp-test/`
  - 如需补充与文档展示层渲染相关的测试，可在此增加或更新测试

### 3.2 Out of Scope by Default

以下内容默认不在本次范围内，除非用户明确批准：

- `packages/sci-comp-core/` 中 core 组件运行时主题能力重构
- 新建一套独立于现有 token / CSS variables 的暗黑模式体系
- 顺手改造首页、导航或与暗黑展示异常无关的页面结构
- 扩展为完整品牌换肤、dark mode 平台化或主题系统升级项目

### 3.3 Ownership Rules

- **暗黑展示兼容逻辑** 应优先落在文档展示层。
- **通用展示容器样式** 应集中在文档展示组件，而不是零散分布到每个页面里。
- **测试补充** 只能落在测试工作区或现有文档测试路径中。

---

## 4. Code Style

### 4.1 Technology Baseline

本次实现继续沿用当前技术栈：

- React 19
- TypeScript 5.x
- Rspress
- Ant Design v6
- Vitest + React Testing Library

### 4.2 Theme and Styling Rules

- 优先复用现有主题 token、CSS variables、Rspress 暗黑模式上下文与现有展示层样式约束。
- 不新增与现有主题体系平行的独立暗黑样式系统。
- 暗黑模式修复应优先围绕：
  - 文本颜色
  - 背景色
  - 边框色
  - 代码容器表面色
  - 展示卡片/预览容器表面层级
- 若局部展示区存在硬编码亮色样式，应将其替换为可在明暗模式下工作的表达方式。

### 4.3 Scope Discipline

- 先修复通用展示区域，再视需要局部补丁，不从单页开始堆分散例外。
- 不顺手重构整站样式系统。
- 不删除现有展示组件、文档页面或导航结构。
- 若必须动到 core 组件公共样式、主题 token 或主题 API，必须先问。

---

## 5. Testing Strategy

### 5.1 Required Verification Dimensions

本次至少覆盖以下验证维度：

1. **静态检查**：文档站 typecheck 通过。
2. **构建验证**：文档站 build 通过。
3. **人工验收**：在明暗模式切换下检查关键展示路径。
4. **自动化测试（如适用）**：若补充了文档展示层测试，应验证渲染与样式适配的关键输出。

### 5.2 Manual Verification Requirements

人工验收至少要覆盖以下路径：

- 在 Rspress 中切换亮色 / 暗黑主题
- 检查组件文档页中的展示区域
- 检查指南页中的展示模块
- 检查典型元素：
  - 预览卡片
  - 说明文本
  - 代码块/代码展示容器
  - 按钮
  - 输入框
  - 边框与背景层级

### 5.3 Acceptance Criteria Format

实现前或交付时必须明确列出：

- 哪些展示区域属于“通用组件展示部分”
- 哪些页面被抽样或实际验证
- 修复完成后如何判断“样式无异常”
- 哪些问题若仍存在就视为未完成

### 5.4 Example Verification Set

最小验证集应接近：

```bash
pnpm --filter sci-comp-documention typecheck
pnpm --filter sci-comp-documention build
```

如果本次新增测试，再补充：

```bash
pnpm --filter sci-comp-test test
```

并配合人工检查：

- 切换亮/暗主题
- 检查组件页与指南页展示模块
- 检查按钮、输入框、代码块、说明文字等典型元素

---

## 6. Boundaries

### 6.1 Always Do

- 先明确哪些“组件展示部分”属于本次修复目标。
- 默认优先修通用展示容器，而不是逐页打补丁。
- 输出可核验的验证证据，包括 typecheck / build 与人工验收结果。
- 如新增测试，说明其与暗黑模式兼容问题的对应关系。

### 6.2 Ask First

以下情况必须先征得用户确认：

- 需要改动 `packages/sci-comp-core/` 中的公共样式、主题 token 或主题 API
- 需要改变组件展示层之外的站点结构或导航设计
- 需要删除或替换现有展示组件、页面内容或说明结构
- 需要引入新的依赖、修改 CI、修改全局主题机制或影响共享状态的设置

### 6.3 Never Do

- 不擅自把这次修复扩展成整个主题系统重构。
- 不新建一套与现有主题 token 平行的暗黑样式体系。
- 不删除无关页面、无关导航或无关展示组件。
- 不在没有 typecheck/build 与人工验收证据前宣称完成。
- 不在未确认前改动 core 组件主题能力来“顺手解决”文档层问题。
