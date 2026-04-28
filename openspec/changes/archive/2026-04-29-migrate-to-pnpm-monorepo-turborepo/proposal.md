## Why

当前项目仍是单包结构，组件源码、文档站点、测试工程和工程化配置耦合在同一应用中，已经无法支撑组件库持续扩展、独立发布、规范治理和自动化协作。现在需要将项目升级为基于 pnpm + monorepo + turborepo 的多包架构，并同步引入统一代码规范、提交规范和文档/测试子项目，为后续组件库规模化建设打下基础。

## What Changes

- **BREAKING**：将当前单包项目改造为 `pnpm workspace + turborepo` 的 monorepo，多包统一管理依赖、任务和构建流程。
- **BREAKING**：将当前通用组件库内容拆分为一个纯组件库 package，仅保留组件源码、构建配置和对外导出。
- 新增 `sci-comp-documention` 文档项目，使用 Rspress 搭建，承载组件说明、示例、使用方法和类似 Ant Design 官网风格的文档站结构。
- 新增 `sci-comp-test` 测试项目，使用 Vitest + React Testing Library，承载通用组件库的测试用例验证。
- 引入统一工程规范与自动化工作流：ESLint + Prettier、Husky + lint-staged、commitlint + cz-git。
- 重组仓库目录、包边界、脚本命令和任务流水线，使组件库、文档站和测试工程可以独立开发并通过 turborepo 协同运行。

## Capabilities

### New Capabilities

- `monorepo-workspace`: 定义基于 pnpm workspace 与 turborepo 的多包仓库结构、任务编排和包边界。
- `component-library-package`: 定义纯组件库 package 的源码组织、构建输出、依赖边界和导出约束。
- `documentation-site`: 定义基于 Rspress 的 `sci-comp-documention` 文档站能力，包括组件文档、示例和使用说明承载方式。
- `component-test-workspace`: 定义基于 Vitest + React Testing Library 的 `sci-comp-test` 测试工程能力，包括组件测试组织与运行方式。
- `engineering-automation`: 定义统一代码规范、提交规范和自动化校验工作流，包括 ESLint、Prettier、Husky、lint-staged、commitlint 和 cz-git。

### Modified Capabilities

- None.

## Impact

- 受影响代码：仓库根目录结构、包管理配置、构建脚本、组件库源码位置、文档内容位置、测试用例位置。
- 受影响系统：本地开发流程、CI 任务编排、依赖安装方式、组件构建与验证流程。
- 受影响依赖：从现有 npm 单包模式迁移到 pnpm workspace，引入 turborepo、Rspress、ESLint、Prettier、Husky、lint-staged、commitlint、cz-git。
- 受影响 API/使用方式：开发者将通过 monorepo 中不同 package 分别维护组件库、文档站与测试工程，原有单项目目录和脚本命令会发生变化。
