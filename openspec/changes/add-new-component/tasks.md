## 1. 核心组件实现

- [ ] 1.1 在 `packages/sci-comp-core/src/components/general/progress/` 下创建 Progress 组件模块
- [ ] 1.2 基于 Ant Design v6 Progress 实现 Progress wrapper，并定义导出的 Progress 类型
- [ ] 1.3 为 Progress 组件添加局部 index 导出，并更新 `packages/sci-comp-core/src/index.ts` 以暴露 `Progress` 及其类型

## 2. 文档接入

- [ ] 2.1 在 `apps/sci-comp-documention/docs/components/` 下新增 Progress 文档页面
- [ ] 2.2 更新 `apps/sci-comp-documention/rspress.config.ts`，将 Progress 加入组件导航
- [ ] 2.3 确保 Progress 文档页至少包含一个使用示例和简要的组件说明

## 3. 测试覆盖与验证

- [ ] 3.1 在 `apps/sci-comp-test/src/components/general/` 中新增 Progress 组件测试
- [ ] 3.2 验证测试覆盖成功渲染以及 wrapper 的关键状态或 props
- [ ] 3.3 运行相关的 typecheck 和测试命令，确认新的 Progress 能力已在核心包、文档和测试工作区中完成集成
