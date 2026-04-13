# hik-comps Monorepo

该仓库已迁移为基于 `pnpm workspace + turborepo` 的多包结构，用于维护通用组件库、文档站和测试工程。

## 工作区结构

- `packages/sci-comp-core`：纯组件库 package，承载通用组件源码、样式、类型与构建配置
- `apps/sci-comp-test`：Vitest + React Testing Library 测试工程
- `apps/sci-comp-documention`：Rspress 文档站

## 常用命令

在仓库根目录执行：

```bash
pnpm install
pnpm build
pnpm test
pnpm lint
pnpm typecheck
pnpm docs:dev
```

## 组件约束

- 通用基础组件必须基于 Ant Design v6 官方组件进行封装开发
- 当前 Button / Input / Table / Form 已按该约束迁移到 `@sci-comp/core`
- 后续 Modal / Tabs 也必须继续沿用同样的 wrapper 模式

## 提交流程

- 提交前会通过 Husky + lint-staged 执行暂存文件校验
- 提交信息通过 commitlint 校验
- 可以使用 `pnpm commit` 启动 cz-git 引导式提交流程
