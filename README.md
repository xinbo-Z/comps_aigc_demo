# hik-comps Monorepo

基于 `pnpm workspace + turborepo` 组织的通用组件库 Monorepo，用于统一维护核心组件库、组件文档站和测试工程。

项目当前以 **Ant Design v6 官方组件封装** 为基础约束，围绕 React 19、TypeScript、文档展示与测试验证构建完整的组件开发链路。

## 项目架构

仓库采用多工作区拆分，每个目录只负责一类职责：

- `packages/sci-comp-core`：核心组件库，承载组件源码、样式、类型、主题能力与构建产物
- `apps/sci-comp-documention`：组件文档站，基于 Rspress 展示指南、组件说明和使用示例
- `apps/sci-comp-test`：测试工程，基于 Vitest + React Testing Library 验证组件行为

workspace 由 [pnpm-workspace.yaml](pnpm-workspace.yaml) 统一管理，turbo 负责在根目录调度所有工作区任务。

## 目录功能说明

```text
.
├── apps/
│   ├── sci-comp-documention/   # 文档站
│   └── sci-comp-test/          # 测试工程
├── packages/
│   └── sci-comp-core/          # 核心组件库
├── package.json                # 根脚本、提交规范、工程工具入口
├── turbo.json                  # Turbo 任务编排配置
├── pnpm-workspace.yaml         # workspace 范围定义
├── commitlint.config.cjs       # commit message 规范
└── .husky/                     # git hooks
```

## 技术栈

- React 19
- TypeScript 6
- Ant Design 6
- pnpm workspace
- turborepo
- Rspress
- Vitest + React Testing Library
- Husky + lint-staged + commitlint + cz-git

## 快速开始

在仓库根目录执行：

```bash
pnpm install
```

常用入口命令：

```bash
pnpm docs:dev
pnpm test
pnpm build
pnpm typecheck
pnpm lint
```

如果你主要是在看组件文档，推荐优先使用：

```bash
pnpm docs:dev
```

如果你主要是在验证组件行为，推荐使用：

```bash
pnpm test
pnpm test:watch
```

## Turbo 构建与开发步骤

根目录通过 [package.json](package.json) + [turbo.json](turbo.json) 统一调度各工作区：

### 1. 启动开发任务

```bash
pnpm dev
```

等价于：

```bash
turbo run dev --parallel
```

适合同时启动多个声明了 `dev` 脚本的工作区。

### 2. 构建所有工作区

```bash
pnpm build
```

等价于：

```bash
turbo run build
```

`build` 会按照 turbo 依赖关系先构建上游包，再构建下游工作区。

### 3. 运行测试

```bash
pnpm test
```

等价于：

```bash
turbo run test
```

如果要持续监听测试变化：

```bash
pnpm test:watch
```

### 4. 运行静态检查

```bash
pnpm lint
pnpm typecheck
```

分别对应：

```bash
turbo run lint
turbo run typecheck
```

### 5. 文档站专用命令

```bash
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
```

其中 `pnpm docs:dev` 会先构建 `@sci-comp/core`，再启动文档站，适合作为本地查看组件文档的主入口。

## Git 提交规范

仓库已经接入完整的 git 提交流程：

- `Husky`：负责触发 hooks
- `lint-staged`：只校验暂存区文件
- `commitlint`：校验提交信息格式
- `cz-git`：提供引导式提交命令

### 提交前会发生什么

- `.husky/pre-commit` 会执行 `pnpm exec lint-staged`
- 暂存区中的代码文件会自动执行 `eslint --fix`
- 暂存区中的代码/文档/配置文件会自动执行 `prettier --write`
- `.husky/commit-msg` 会执行 `pnpm exec commitlint --edit "$1"`

### 推荐提交流程

```bash
pnpm commit
```

这会启动 `cz-git`，按提示生成符合规范的 commit message。

### 提交信息规范

提交信息遵循 Conventional Commits，常用类型包括：

- `feat`：新功能
- `fix`：问题修复
- `docs`：文档变更
- `refactor`：重构
- `test`：测试相关
- `chore`：工程或杂项维护

示例：

```text
feat: add modal and tabs wrappers
fix: align Button className and danger styling
docs: improve monorepo readme structure
```

## 组件封装约束

所有通用基础组件必须遵循以下原则：

- 必须基于 **Ant Design v6 官方组件** 进行封装开发
- 不允许仅参考 antd 的视觉风格而重新实现同名原生组件
- 必须提供完整 TypeScript 类型定义
- 文档与测试应分别在独立工作区内维护

当前重点组件包括：

- Button
- Input
- Table
- Form
- Modal
- Tabs

## 各工作区文档入口

如果你需要更细的工作区说明，可以继续阅读：

- [apps/sci-comp-documention/README.md](apps/sci-comp-documention/README.md)
- [packages/sci-comp-core/README.md](packages/sci-comp-core/README.md)
- [apps/sci-comp-test/README.md](apps/sci-comp-test/README.md)
