# sci-comp-documention

`sci-comp-documention` 是组件库文档站工作区，负责承载指南、组件说明与示例展示。

## 你可以从这里了解什么

- 如何接入 `@sci-comp/core`
- 去哪里查看组件文档与主题说明
- 文档站导航与内容入口位于哪里

## 快速入口

- 文档内容目录：`docs/`
- 指南首页：[`docs/guide/getting-started.md`](docs/guide/getting-started.md)
- 主题系统说明：[`docs/guide/theme-system.md`](docs/guide/theme-system.md)
- 站点配置：[`rspress.config.ts`](rspress.config.ts)

## 常用命令

推荐从仓库根目录执行：

```bash
pnpm docs:dev
pnpm docs:build
```

如果已经进入当前工作区，也可以执行：

```bash
pnpm dev
pnpm build
pnpm typecheck
```
