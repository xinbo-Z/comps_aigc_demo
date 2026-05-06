## ADDED Requirements

### Requirement: Package scripts SHALL avoid platform-specific shell orchestration

仓库中的 package scripts 若承担通用开发、构建、监听或 CI 入口职责，必须避免依赖 `sh -c`、Unix 后台执行符 `&`、`wait` 或同等级平台特定 shell 编排。需要并行执行多个长期任务时，系统 SHALL 使用跨平台命令编排工具承载该能力。

#### Scenario: 并行开发脚本跨平台运行

- **WHEN** 工作区包需要在一个脚本中同时启动类型声明监听和 bundle 监听
- **THEN** 脚本 SHALL 使用跨平台并行编排工具启动两个任务
- **AND** 脚本 SHALL NOT 依赖 `sh -c`、`&` 或 `wait`

#### Scenario: 单任务脚本保持简单命令

- **WHEN** package script 只需要运行单个命令
- **THEN** 脚本 SHALL 保持现有直接命令形式
- **AND** 脚本 SHALL NOT 为无需并行的命令引入额外编排层

### Requirement: Concurrent script dependency SHALL be declared at workspace level

当 package scripts 使用 `concurrently` 作为跨平台并行编排工具时，仓库 SHALL 在根级开发依赖中声明该工具，并通过 pnpm lockfile 固化版本，以保证本地开发与 CI 安装结果一致。

#### Scenario: 安装依赖后可执行 concurrently

- **WHEN** 开发者在仓库根目录完成 pnpm install
- **THEN** 使用 `concurrently` 的 package script SHALL 能通过 workspace 依赖解析正常执行

#### Scenario: 依赖变更可复现

- **WHEN** `concurrently` 被加入或更新
- **THEN** `package.json` 与 `pnpm-lock.yaml` SHALL 同步反映该依赖变更
