## 1. 组件文档目录与锚点结构

- [x] 1.1 在 `apps/sci-comp-documention/doc-components/ComponentDoc.tsx` 中为组件定义、适用场景、案例演示、常用属性 API、选型建议、封装说明建立稳定章节 id
- [x] 1.2 在 `apps/sci-comp-documention/docs/components/*.mdx` 中基于现有 `ComponentDocPageData` 上提 `## / ###` 标题树，使组件页接入 Rspress 原生 On This Page
- [x] 1.3 在 `apps/sci-comp-documention/docs/components/*.mdx` 中实现“仅渲染当前页实际存在章节标题”的过滤逻辑，避免出现空目录项
- [x] 1.4 在 `apps/sci-comp-documention/docs/components/*.mdx` 中为案例演示区接入三级标题，并直接复用 `examples[].title` 与 `examples[].id` 作为目录项与子锚点落点
- [x] 1.5 在 `apps/sci-comp-test/src/styles/componentDoc.test.tsx` 中调整到新的职责边界，覆盖稳定章节锚点、可选章节过滤和案例子锚点定位
- [x] 1.6 运行 `pnpm --filter sci-comp-test test -- componentDoc.test.tsx`，验证目录与锚点相关回归通过

## 2. 共享展示层亮暗主题语义收敛

- [x] 2.1 在 `apps/sci-comp-documention/doc-components/ComponentDoc.tsx` 中统一页面容器、章节卡片、示例卡片、预览区、说明面板、代码块与 API 表格的 surface 语义使用
- [x] 2.2 在 `apps/sci-comp-documention/doc-components/PreviewBlock.tsx` 中收敛预览区域的亮/暗主题背景、边界和文本层次，使其与组件文档页共享展示语义一致
- [x] 2.3 在 `apps/sci-comp-documention/doc-components/demos.tsx` 中收敛说明面板、辅助块等共享 demo 展示区域的亮/暗主题层次
- [x] 2.4 在 `apps/sci-comp-test/src/styles/theme.test.ts` 或相关主题测试中补充共享展示层消费主题变量的验证，覆盖亮色 / 暗色变量注入后的基本可读性语义
- [x] 2.5 在 `apps/sci-comp-test/src/support/render.test.tsx` 中补充 `ComponentDocPage` 在主题环境下的基础渲染验证，确保共享展示层继续复用现有主题入口
- [x] 2.6 运行 `pnpm --filter sci-comp-test test -- theme.test.ts render.test.tsx`，验证主题注入与共享展示层回归通过

## 3. Button / Input / Table 决策型文档页增强

- [x] 3.1 在 `apps/sci-comp-documention/doc-components/component-doc-data/buttonDoc.tsx` 中补强主次操作层级、danger 边界与 Button / Link / Dropdown 的分流说明
- [x] 3.2 在 `apps/sci-comp-documention/doc-components/component-doc-data/inputDoc.tsx` 中补强 `invalid`、`disabled`、`readOnly` 的状态语义，以及 Input 与 Form 的职责边界说明
- [x] 3.3 在 `apps/sci-comp-documention/doc-components/component-doc-data/tableDoc.tsx` 中补强受控列配置、`scroll` / `virtualScroll` / `rowSelection` / `columnResize` 的组合建议，以及基础 Table 与高阶业务表格的边界说明
- [x] 3.4 如现有案例信息不足以承载新增说明，在对应 `apps/sci-comp-documention/doc-components/component-doc-previews/*.tsx` 中做最小必要补充，但不新增运行时 API
- [x] 3.5 在 `apps/sci-comp-test/src/styles/componentDoc.test.tsx` 中补充 Button / Input / Table 页面内容渲染断言，验证选型建议、封装说明与关键决策信息可见
- [x] 3.6 在 `apps/sci-comp-documention/docs/components/button.mdx`、`input.mdx`、`table.mdx` 中接入样板页标题树，确保关键决策内容进入原生目录
- [x] 3.7 运行 `pnpm --filter sci-comp-test test -- componentDoc.test.tsx`，验证高频样板页文档增强回归通过

## 4. 最终类型检查、构建与人工验收

- [x] 4.1 运行 `pnpm --filter sci-comp-documention typecheck`，确认文档工作区类型检查通过
- [x] 4.2 运行 `pnpm --filter sci-comp-documention build`，确认文档站构建通过
- [x] 4.3 运行 `pnpm --filter sci-comp-test test`，确认本次相关测试未引入新的回归
- [x] 4.4 人工检查 Button、Input、Table 页面，确认右侧为 Rspress 原生 On This Page，章节跳转与案例子锚点可用
- [x] 4.5 人工切换亮色 / 暗色主题，确认章节卡片、示例卡片、说明面板、代码块与 API 表格保持可读且层次稳定
- [x] 4.6 根据实现结果回看 `openspec/changes/improve-docs-core/` 下 proposal、design、specs 与 tasks 的一致性，确保实现范围未超出“不重构整站 IA、不新增运行时 API”的约束
