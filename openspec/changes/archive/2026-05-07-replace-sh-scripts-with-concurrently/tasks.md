## 1. 依赖与脚本改造

- [x] 1.1 在根 `package.json` 中加入 `concurrently` devDependency，并同步 `pnpm-lock.yaml`
- [x] 1.2 将 `packages/sci-comp-core/package.json` 的 `dev` 脚本从 `sh -c 'pnpm dev:types & pnpm dev:bundle & wait'` 改为 `concurrently` 并行执行 `pnpm dev:types` 与 `pnpm dev:bundle`
- [x] 1.3 搜索 workspace 内 package scripts，确认不再存在依赖 `sh -c`、`& wait` 的并行脚本

## 2. 验证

- [x] 2.1 运行 `pnpm --filter @sci-comp/core typecheck`，确认核心包类型检查通过
- [x] 2.2 运行 `pnpm --filter @sci-comp/core build`，确认核心包构建通过
- [x] 2.3 对 `pnpm --filter @sci-comp/core dev` 做短时启动验证，确认 `dev:types` 与 `dev:bundle` 均能被 `concurrently` 启动

## 3. OpenSpec 校验

- [x] 3.1 运行 `openspec validate replace-sh-scripts-with-concurrently --strict`，确认 proposal、specs、design、tasks 可通过校验
