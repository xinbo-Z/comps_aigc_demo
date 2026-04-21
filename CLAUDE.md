# 项目: hik-comps

## 技术栈

- React 19 + TypeScript 5.x
- Ant Design 6.x（组件封装基准）
- pnpm workspace + turborepo
- Vitest + React Testing Library（组件测试）
- Rspress（组件文档）

## 项目结构

- `packages/sci-comp-core/`：通用组件库 package，承载组件源码、样式、类型与对外导出
- `apps/sci-comp-test/`：组件测试工作区
- `apps/sci-comp-documention/`：组件文档工作区
- 根目录：统一维护 workspace、turbo、lint、format、typecheck、commit hooks 等工程配置

## 编码规范

- 组件使用函数式组件 + Hooks
- 所有组件必须有完整的 TypeScript 类型定义
- Props 接口以组件名 + "Props" 命名（如 ButtonProps）
- 组件文件使用 PascalCase 命名
- 样式使用 CSS Modules 或 Ant Design 的 CSS-in-JS
- 遵循 Ant Design v6 的 API 设计风格和交互模式
- 通用基础组件必须基于 Ant Design v6 官方组件进行封装开发，不允许仅参考其视觉风格而使用原生 HTML 或完全自定义实现替代
- Button / Input / Table / Form 当前必须满足该封装约束，后续 Modal / Tabs 也必须遵循同样原则
- 基础 wrapper 允许的增强仅限于：antd props 透传、少量语义映射、样式收敛、a11y 增强、少量默认行为
- 基础 wrapper 禁止承载：自定义 DSL、复杂运行时规则引擎、动态表单编排、业务流程逻辑、明显偏离 antd 心智模型的大量新增 API
- 高阶能力必须以独立组件承载，不能继续堆积在基础 wrapper 中；例如 schema 驱动表单能力应放在独立的 SchemaForm 中，而不是基础 Form 中
- 组件文档放在 `apps/sci-comp-documention/`，组件测试放在 `apps/sci-comp-test/`

## 禁止事项

- 禁止使用 class 组件
- 禁止使用 any 类型
- 禁止直接修改 DOM（使用 React ref 除外）
- 禁止在组件中硬编码颜色值，必须使用主题 Token
- 生成的文档相关内容必须使用中文，且回答问题时也要用中文
