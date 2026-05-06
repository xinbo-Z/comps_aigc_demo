## MODIFIED Requirements

### Requirement: 根命令面 SHALL 统一暴露

仓库 SHALL 暴露统一的根命令面用于常见开发流程，贡献者不需要手动先进入某个子包才能完成基础操作。根 `package.json` SHALL 提供开发、构建、测试、校验，以及文档站和测试工作区入口脚本；这些入口及其调用的工作区脚本 SHALL 避免依赖单一操作系统 shell 能力，以保证常见开发命令在不同平台上保持可执行。

#### Scenario: 开发者从根目录启动仓库

- **WHEN** 贡献者克隆仓库后查看根脚本
- **THEN** 他们必须能够从根级入口发现组件库、文档站与测试工作流的统一启动方式

#### Scenario: CI 使用根命令

- **WHEN** CI 运行仓库校验流程
- **THEN** 它必须能够直接调用根级脚本，而不再依赖旧的单包命令入口

#### Scenario: 根入口调用跨平台工作区脚本

- **WHEN** 根级任务通过 turborepo 或 pnpm filter 调用工作区包的 `dev`、`build`、`test`、`lint` 或 `typecheck` 脚本
- **THEN** 被调用的工作区脚本 SHALL 避免依赖 `sh`、`bash` 或 Unix-only shell 控制符
- **AND** 在需要并行执行多个长期任务时 SHALL 使用跨平台脚本工具
