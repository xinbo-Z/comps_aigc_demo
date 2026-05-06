## Context

当前仓库使用 pnpm workspace 与 turborepo 编排多个工作区。根 `package.json` 提供统一命令面，`packages/sci-comp-core/package.json` 的 `dev` 脚本用于同时启动类型声明监听与 Vite bundle 监听。

现状中 `@sci-comp/core` 的 `dev` 脚本写为 `sh -c 'pnpm dev:types & pnpm dev:bundle & wait'`，依赖 Unix shell、后台执行符和 `wait`。该写法在 Windows 默认 shell 或部分 CI 环境中不可移植，因此需要改为跨平台脚本编排工具。

组件层级图：

```text
root package.json
└── turbo run dev --parallel
    └── packages/sci-comp-core/package.json
        └── dev
            ├── dev:types   (tsc --watch)
            └── dev:bundle  (vite build --watch)
```

本变更不涉及 React 组件状态或运行时状态管理；状态管理方案为“不引入应用状态”，仅调整 package scripts 与 devDependency。

## Goals / Non-Goals

**Goals:**

- 移除 package scripts 中对 `sh -c`、`&`、`wait` 的依赖。
- 使用 `concurrently` 保持 `dev:types` 与 `dev:bundle` 并行监听语义。
- 在根 workspace devDependencies 中声明 `concurrently`，并同步 `pnpm-lock.yaml`。
- 验证核心包脚本与仓库校验命令仍可执行。

**Non-Goals:**

- 不改变组件源码、文档页面或运行时 API。
- 不调整 turborepo pipeline 结构。
- 不将所有 `&&` 串行命令替换为 `concurrently`；串行构建脚本保留现状。
- 不引入新的脚本抽象层或自定义 Node runner。

## Decisions

### Decision 1: 使用 `concurrently` 替代 shell 后台编排

将 `packages/sci-comp-core/package.json` 的 `dev` 脚本改为调用 `concurrently`，并分别启动 `pnpm dev:types` 与 `pnpm dev:bundle`。

备选方案：

- 使用 `npm-run-all`：也能跨平台编排，但当前需求明确希望使用 `concurrently`。
- 编写 Node 脚本调用子进程：可控性更高，但对这个简单并行场景过度设计。
- 保留 `sh -c`：改动最小，但无法解决跨平台问题。

### Decision 2: 将 `concurrently` 放在根 devDependencies

该工具服务于 workspace 脚本编排，而不是 `@sci-comp/core` 的运行时代码。放在根 `package.json` 的 devDependencies 可以让所有工作区脚本复用同一个工具版本，并避免把脚本工具误归入组件包运行时依赖。

### Decision 3: 保持串行 build 脚本不变

`packages/sci-comp-core/package.json` 中 `build` 当前使用 `pnpm build:types && pnpm build:bundle` 表示类型产物与 bundle 产物的串行构建。该脚本不是长期并行任务，也没有依赖 `sh`，因此不纳入本次替换范围，避免扩大行为变化。

## Risks / Trade-offs

- `concurrently` 依赖新增会增加 lockfile 体积 → 通过根 devDependency 固定版本，并接受工具依赖的合理开销。
- `dev` 脚本的日志输出格式会变化 → 保持子命令不变，只接受并行编排工具带来的前缀和颜色差异。
- 监听命令是长期运行任务，完整自动化验证不适合等待其结束 → 使用短时启动验证确认命令能启动，另以 `typecheck` / `build` 验证基础脚本可执行。

## Migration Plan

1. 安装 `concurrently` 到根 devDependencies，并更新 `pnpm-lock.yaml`。
2. 将 `@sci-comp/core` 的 `dev` 脚本改为 `concurrently` 编排 `dev:types` 与 `dev:bundle`。
3. 搜索 package scripts，确认不再存在 `sh -c`、`& wait` 形式的并行脚本。
4. 运行核心验证命令，例如 `pnpm --filter @sci-comp/core typecheck` 和 `pnpm --filter @sci-comp/core build`。
5. 对 `pnpm --filter @sci-comp/core dev` 做短时启动验证，确认两个监听任务均能启动后停止。

回滚策略：恢复 package 脚本为原 `sh -c` 写法，并从根 devDependencies 与 lockfile 中移除 `concurrently`。

## Open Questions

无。当前仓库中已确认的目标脚本是 `packages/sci-comp-core/package.json` 的 `dev`。
