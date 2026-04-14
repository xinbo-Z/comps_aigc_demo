# sci-comp-documention

`sci-comp-documention` 是组件库文档站工作区，负责展示项目指南、组件说明和实际使用示例。

该工作区不承载组件实现源码，文档中的示例统一消费 `@sci-comp/core`，确保文档内容与核心组件实现保持一致。

## 项目职责

该工作区主要负责：

- 展示组件库的快速开始说明
- 提供各组件文档页与示例预览
- 维护文档导航、侧边栏和指南内容
- 作为核心组件库的对外说明入口

## 技术栈

- Rspress
- React
- TypeScript
- `@sci-comp/core` workspace 依赖

## 常用命令

推荐从仓库根目录执行：

```bash
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
```

如果已经进入当前工作区，也可以执行：

```bash
pnpm dev
pnpm build
pnpm preview
pnpm typecheck
pnpm lint
```

## 目录结构

```text
apps/sci-comp-documention/
├── docs/                # Rspress 文档内容
│   ├── guide/           # 指南页
│   └── components/      # 组件文档页
├── doc-components/      # 文档辅助组件与演示组件
├── rspress.config.ts    # 导航、侧边栏与站点配置
├── package.json
└── tsconfig.json
```

## 文档维护方式

### 1. 页面内容目录

- `docs/guide/`：放置使用说明、快速开始、开发指引
- `docs/components/`：放置组件文档页面
- `doc-components/`：放置文档预览容器和 demo 组件，避免把大段 demo 逻辑直接写进文档页

### 2. 导航与侧边栏

站点导航与侧边栏定义在：

- [rspress.config.ts](rspress.config.ts)

当前已配置：

- 指南入口：`/guide/getting-started`
- 组件入口：`/components/button`
- 组件侧边栏：Button / Input / Table / Form / Modal / Tabs

### 3. 文档编写原则

文档内容应遵循以下规则：

- 示例直接使用 `@sci-comp/core` 暴露出来的组件与类型
- 不复制核心组件源码到文档工作区
- 组件文档优先说明：用途、使用方式、示例、封装边界
- 与 antd 包装约束相关的说明应保持与核心库实现一致

## 与核心包的关系

该工作区通过 workspace 依赖使用 `@sci-comp/core`。

在根目录执行：

```bash
pnpm docs:dev
```

会先构建 `@sci-comp/core`，再启动文档站，因此这是本地联调文档与组件的推荐入口。

如果核心组件发生调整，文档站应同步更新：

- 组件说明
- 示例代码
- 演示内容
- 快速开始与约束描述

## 维护建议

- 新增组件时，同步补充 `docs/components/*.mdx` 页面
- 更新 [rspress.config.ts](rspress.config.ts) 的 sidebar / nav
- 如页面需要复杂预览逻辑，优先放到 `doc-components/` 中复用
- 保持文档示例与 `@sci-comp/core` 的导出能力一致

## 相关文档

- [../../README.md](../../README.md)
- [../../packages/sci-comp-core/README.md](../../packages/sci-comp-core/README.md)
- [../sci-comp-test/README.md](../sci-comp-test/README.md)
