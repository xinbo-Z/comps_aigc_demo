## ADDED Requirements

### Requirement: 仓库级代码规范与格式规范统一
monorepo 必须在根工作区统一提供 ESLint 与 Prettier 代码质量和格式化规范。贡献者必须能够从仓库根目录对所有相关工作区包执行一致的 lint 与格式检查。

#### Scenario: 开发者执行仓库级格式校验
- **WHEN** 开发者从仓库根目录运行 lint 或格式化相关流程
- **THEN** ESLint 与 Prettier 必须基于共享的仓库配置，对相关工作区文件执行统一校验

#### Scenario: 新工作区加入 monorepo
- **WHEN** 后续有新的 app 或 package 加入 workspace 范围
- **THEN** 它必须能够接入同一套根级 lint 与格式规则，而不是重新定义另一套仓库级规范

### Requirement: Git hooks 对暂存文件执行提交前校验
monorepo 必须使用 Husky 与 lint-staged 在提交前对暂存文件执行校验。pre-commit 流程必须只运行与暂存文件相关的必要检查，而不是直接跑完整仓库测试。

#### Scenario: 开发者提交前端改动
- **WHEN** 贡献者对仓库文件发起一次 commit
- **THEN** Husky 必须触发 lint-staged，并在 commit 完成前执行配置好的暂存文件校验

#### Scenario: 提交只包含局部变更
- **WHEN** 开发者本次 commit 只涉及少量文件
- **THEN** pre-commit hook 必须避免执行与这些改动无关的全仓库校验任务

### Requirement: 提交信息遵循统一约定
monorepo 必须使用 commitlint 校验提交信息，并通过 cz-git 提供引导式 commit 编写流程。贡献者必须拥有一条可执行、可理解的路径来生成符合仓库约定的提交信息。

#### Scenario: 开发者手动编写提交信息
- **WHEN** 提交信息在 commit 流程中被校验
- **THEN** commitlint 必须拒绝不符合仓库约定的提交信息

#### Scenario: 开发者使用引导式提交流程
- **WHEN** 开发者执行配置好的 commit helper 命令
- **THEN** cz-git 必须引导填写生成规范提交信息所需的字段

### Requirement: 工程自动化与工作区脚本体系集成
仓库级工程自动化必须与根命令面和 turborepo 编排方式兼容。根级校验命令必须同时适用于本地开发与 CI 入口。

#### Scenario: CI 执行根级校验命令
- **WHEN** CI 运行仓库的 lint、test 或 build 流程
- **THEN** 配置好的自动化与脚本命名必须允许这些流程通过根级命令直接执行，而不需要手动拼接包级命令

#### Scenario: pre-commit 与 CI 承担不同职责
- **WHEN** 开发者先本地提交，再进入 CI 验证阶段
- **THEN** 仓库必须同时支持轻量的暂存文件提交前校验，以及更完整的根级全量验证流程
