## Why

当前 workspace 中存在依赖 `sh -c` 的 package 脚本，Windows 等非 Unix shell 环境下无法稳定运行。将并行脚本收敛到跨平台工具可以降低本地开发和 CI 在不同平台上的差异。

## What Changes

- 将依赖 `sh -c`、后台执行符 `&` 和 `wait` 的 package 脚本改为使用 `concurrently`。
- 在 workspace devDependencies 中引入 `concurrently` 作为跨平台并行脚本工具。
- 保持现有构建、开发监听和脚本语义不变，仅替换脚本编排方式。
- 回滚方案：如出现兼容问题，可恢复原脚本并移除 `concurrently` 依赖，回到当前 Unix shell 编排方式。

## Capabilities

### New Capabilities

- `cross-platform-package-scripts`: 定义 package 脚本应避免依赖平台特定 shell，并使用跨平台命令编排工具承载并行任务。

### Modified Capabilities

- `monorepo-workspace`: workspace 脚本约束需要补充跨平台可执行性要求，避免核心开发命令只在 Unix shell 下可用。

## Impact

- `package.json`: 增加 `concurrently` devDependency（如尚未存在）。
- `pnpm-lock.yaml`: 同步依赖锁文件。
- `packages/sci-comp-core/package.json`: 将 `dev` 脚本从 `sh -c 'pnpm dev:types & pnpm dev:bundle & wait'` 替换为 `concurrently` 编排。
- 受影响组件和路由：无运行时组件或文档路由变更，仅影响 package scripts 与依赖安装。
