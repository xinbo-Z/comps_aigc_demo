## ADDED Requirements

### Requirement: 工作区布局与包发现
仓库必须基于 pnpm workspace 与 turborepo 建立 monorepo，并将应用与可复用包明确拆分。workspace 定义必须包含 `apps/*` 与 `packages/*`，根级任务流水线必须通过统一入口发现并编排所有工作区包。

#### Scenario: 根工作区完成初始化
- **WHEN** 开发者在仓库根目录安装依赖
- **THEN** pnpm 必须将 `apps/*` 与 `packages/*` 下的工作区包解析为同一个 monorepo 安装单元

#### Scenario: 根流水线运行包级任务
- **WHEN** 开发者执行根级 turborepo 任务，例如 build、test、lint、dev 或 typecheck
- **THEN** turborepo 必须只把任务分发给声明了对应脚本的工作区包，并遵循配置好的任务依赖关系

### Requirement: 根命令面统一暴露
仓库必须暴露统一的根命令面用于常见开发流程，贡献者不需要手动先进入某个子包才能完成基础操作。根 `package.json` 必须提供开发、构建、测试、校验，以及文档站和测试工作区入口脚本。

#### Scenario: 开发者从根目录启动仓库
- **WHEN** 贡献者克隆仓库后查看根脚本
- **THEN** 他们必须能够从根级入口发现组件库、文档站与测试工作流的统一启动方式

#### Scenario: CI 使用根命令
- **WHEN** CI 运行仓库校验流程
- **THEN** 它必须能够直接调用根级脚本，而不再依赖旧的单包命令入口

### Requirement: 任务命名约定统一
monorepo 必须在各工作区包之间统一任务命名，以保证本地开发与 CI 编排一致。工作区包在具备对应能力时必须使用 `dev`、`build`、`test`、`lint`、`typecheck` 这组标准脚本名。

#### Scenario: 工作区包参与构建流水线
- **WHEN** 某个工作区包支持构建产物或静态站点输出
- **THEN** 该包必须通过 `build` 脚本暴露该能力，以便 turborepo 统一编排

#### Scenario: 工作区包不支持某项能力
- **WHEN** 某个工作区包并不支持 `dev` 或 `build` 等任务
- **THEN** 该包可以省略对应脚本，turborepo 必须跳过它，而不是要求提供占位实现

### Requirement: 从单包布局迁移为工作区布局
monorepo 迁移必须用工作区结构替代当前单包根应用结构，作为仓库的主开发拓扑。旧的根级源码组织与任务组织在等价工作区能力落地后必须被删除，或降级为最小兼容胶水层。

#### Scenario: 新贡献者查看仓库布局
- **WHEN** 开发者在迁移完成后打开仓库
- **THEN** 主体源码归属必须通过 `apps/` 与 `packages/` 目录表达，而不是继续以单一根应用布局为主

#### Scenario: 迁移完成并切换主结构
- **WHEN** 新工作区已经恢复构建、测试与文档能力
- **THEN** 过时的单包入口必须被删除或重定向，使 monorepo 成为唯一的规范结构
