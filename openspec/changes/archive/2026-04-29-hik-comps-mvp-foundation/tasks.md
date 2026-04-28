## 1. 基础搭建

- [ ] 1.1 建立 `general`、`instrument`、`hooks`、`utils`、`types` 和 `styles` 的组件库源码结构
- [ ] 1.2 配置构建流水线，产出可供组件库使用的 JavaScript 模块和 TypeScript 声明文件
- [ ] 1.3 定义顶层导入与子路径导入的公共导出策略
- [ ] 1.4 建立与 Ant Design 6 概念对齐的共享主题 token 结构
- [ ] 1.5 配置 Storybook 8 与 Vitest + React Testing Library，用于公共组件开发

## 2. 基础组件

- [ ] 2.1 实现具备类型化 props 和核心视觉状态的 MVP `Button` 组件
- [ ] 2.2 实现具备业务友好布局默认值和类型化 props 的 MVP `Form` 组件
- [ ] 2.3 实现具备类型化 props 和清晰空状态处理的 MVP `Table` 组件
- [ ] 2.4 实现具备一致标题、内容和操作区结构的 MVP `Modal` 组件
- [ ] 2.5 为所有基础 MVP 组件添加 Storybook stories 和自动化测试

## 3. 仪器展示组件

- [ ] 3.1 实现具备类型化数据输入、主题化渲染和空状态/加载状态的 `WaveformChart`
- [ ] 3.2 实现具备类型化行输入、面向状态的展示和空状态处理的 `RealtimeDataTable`
- [ ] 3.3 实现具备类型化参数定义、分组展示、校验能力和只读模式的 `ParamConfigForm`
- [ ] 3.4 为所有仪器 MVP 组件添加 Storybook stories 和自动化测试

## 4. 集成与发布就绪

- [ ] 4.1 验证所有公共组件类型和导出都可从文档规定的入口获取
- [ ] 4.2 验证主题 token 定制能一致地影响基础组件和仪器组件
- [ ] 4.3 验证 Storybook 覆盖所有 MVP 组件的代表性使用场景和边界状态
- [ ] 4.4 运行完整的测试和构建验证流程，确认 MVP 组件库可用
