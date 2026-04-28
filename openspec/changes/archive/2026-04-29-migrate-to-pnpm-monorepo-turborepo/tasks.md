## 1. Monorepo 根结构搭建

- [ ] 1.1 将仓库根目录切换为 pnpm workspace，新增 `pnpm-workspace.yaml`、根 `package.json` 工作区脚本与 `turbo.json`
- [ ] 1.2 规划并创建 `apps/sci-comp-documention`、`apps/sci-comp-test`、`packages/sci-comp-core` 目录骨架
- [ ] 1.3 将根级脚本统一为 `dev`、`build`、`test`、`lint`、`typecheck` 等标准命名，并让 turborepo 能发现对应工作区任务
- [ ] 1.4 清理或降级旧单包根应用入口，确保新工作区结构成为主开发拓扑

## 2. 组件库 package 迁移

- [ ] 2.1 在 `packages/sci-comp-core` 中建立组件库 package 配置，补齐 package exports、构建入口与类型输出配置
- [ ] 2.2 将现有通用组件源码、样式、类型与导出入口迁移到 `packages/sci-comp-core/src`
- [ ] 2.3 保持 Button / Input / Table / Form 的 Ant Design wrapper 约束与公开 API 在迁移后继续可用
- [ ] 2.4 移除组件库 package 中混入的文档页、测试文件和其他非组件库职责内容

## 3. 测试工作区迁移

- [ ] 3.1 在 `apps/sci-comp-test` 中建立 Vitest + React Testing Library 测试工程配置
- [ ] 3.2 迁移现有测试文件、render 工具、setup 文件与测试环境配置到 `sci-comp-test`
- [ ] 3.3 恢复 Button / Input / Table / Form 的自动化测试，并确保测试从组件库 package 或批准的测试别名导入组件
- [ ] 3.4 为后续 Modal / Tabs 等组件预留统一测试目录结构和共享测试工具扩展方式

## 4. 文档工作区迁移

- [ ] 4.1 在 `apps/sci-comp-documention` 中建立 Rspress 站点骨架与基础导航结构
- [ ] 4.2 配置文档站通过工作区依赖消费 `packages/sci-comp-core`，禁止复制组件源码到文档站
- [ ] 4.3 迁移并补齐组件总览、安装/使用说明，以及 Button / Input / Table / Form 的组件文档页面和示例
- [ ] 4.4 设计可扩展的信息架构，为后续 Modal / Tabs 与更多通用组件保留分组导航与详情页结构

## 5. 工程规范与自动化接入

- [ ] 5.1 在 monorepo 根目录接入 ESLint 与 Prettier 共享配置，并让各工作区接入统一 lint / format 规则
- [ ] 5.2 接入 Husky 与 lint-staged，配置仅针对暂存文件执行提交前校验
- [ ] 5.3 接入 commitlint 与 cz-git，提供统一的提交信息规范与引导式提交流程
- [ ] 5.4 让根级自动化脚本同时适配本地开发与 CI 入口，避免继续依赖旧的单包命令组合

## 6. 验证与收尾

- [ ] 6.1 验证根级 `build`、`test`、`lint`、`typecheck` 命令可以正确编排各工作区
- [ ] 6.2 验证文档站开发流程与测试工作区流程都能解析最新的组件库实现
- [ ] 6.3 移除迁移完成后已废弃的旧目录、脚本与无效引用，避免仓库同时维护双套结构
- [ ] 6.4 更新仓库使用说明，明确开发者应从根目录进入安装、开发、测试与构建流程
