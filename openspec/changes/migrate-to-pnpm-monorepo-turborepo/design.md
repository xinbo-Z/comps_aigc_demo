> 当前仓库已按本设计完成 monorepo 迁移。下文中对“单包结构”的描述属于变更设计时的历史背景，用于说明迁移动机，不代表当前目录现状。

## Context

当前仓库仍是单包 React + Vite 组件工程，组件源码、测试、文档展示能力与工程化配置全部集中在一个 `package.json` 中。现状已经暴露出几个直接问题：

- 组件源码与文档/测试工程共享同一套依赖和脚本，无法独立演进。
- 当前 `build`、`test`、`lint` 仅面向单工程，无法表达“先构建组件库，再启动文档站或测试工程”的任务依赖。
- 文档承载方式仍偏向模板化 Vite/Storybook 组合，不适合后续沉淀组件说明、示例、设计约束与最佳实践。
- 后续组件库建设会继续扩展，单包结构会让依赖升级、规范治理、CI 编排和按包协作越来越困难。

本次设计需要在保留现有 React 19 + TypeScript + Ant Design v6 技术基线的前提下，将仓库升级为基于 pnpm workspace + turborepo 的 monorepo，并新增文档子项目与测试子项目，同时引入统一的代码规范和提交规范。该设计还需要为后续通用组件持续扩展提供稳定边界：组件库包只负责源码与构建输出，文档站只负责说明与演示，测试工程只负责验证。

约束如下：

- 当前已有组件实现和测试不能在迁移中失真，至少 Button / Input / Table / Form 的 antd wrapper 约束必须保留。
- 文档项目名称固定为 `sci-comp-documention`，测试项目名称固定为 `sci-comp-test`。
- 迁移后必须使用 pnpm 作为唯一包管理入口，turborepo 负责跨 package 任务编排。
- 本次改造聚焦仓库结构、开发流程和工程规范，不额外引入组件发布平台或设计 token 平台。

## Goals / Non-Goals

**Goals:**

- 建立可扩展的 monorepo 目录结构，明确组件库、文档站、测试工程之间的包边界。
- 使用 pnpm workspace 管理依赖，使用 turborepo 管理 `dev` / `build` / `test` / `lint` 等任务流水线。
- 拆分出纯组件库 package，仅保留组件源码、样式、类型、构建配置和对外导出。
- 建立 `sci-comp-documention` 文档项目，承载组件说明、示例、使用方法与面向官网式展示的页面结构。
- 建立 `sci-comp-test` 测试工程，集中承载组件行为测试、渲染工具和测试基座。
- 引入统一工程规范：ESLint、Prettier、Husky、lint-staged、commitlint、cz-git，并让它们在 monorepo 中按 package 生效。
- 为后续 Modal / Tabs 等通用组件继续接入同一仓库模式提供标准路径。

**Non-Goals:**

- 本次不设计 npm 私有源/公共源发布流程，也不处理版本发布自动化。
- 本次不新增与组件库无关的业务应用。
- 本次不重新设计现有通用组件 API，只迁移其所在工程边界与开发承载方式。
- 本次不将 Storybook 作为核心文档方案继续扩展；若保留，仅作为过渡资产处理，不作为目标文档主入口。
- 本次不处理 CI 平台的具体 YAML 细节，只定义仓库内可被 CI 直接调用的标准脚本与任务关系。

## Decisions

### 1. 仓库采用 apps + packages 双层结构

**决策**

目标结构采用：

- `apps/sci-comp-documention`：Rspress 文档站
- `apps/sci-comp-test`：Vitest + React Testing Library 测试工程
- `packages/sci-comp-core`：通用组件库 package
- `packages/config-*`：可选的共享工程配置包（eslint / tsconfig），如果在实施阶段发现共享配置不足再引入

根目录保留 workspace 级别配置文件，例如 `pnpm-workspace.yaml`、`turbo.json`、根 `package.json`、根级提交规范配置。

**原因**

- 文档站与测试工程更接近“应用/工作区”而不是可发布库，放在 `apps/` 下语义更清晰。
- 纯组件库是可构建、可导出的复用单元，放在 `packages/` 下能直接表达边界。
- apps/packages 双层结构是 turborepo 常见组织方式，后续增补 playground、示例站、内部验证应用时不会破坏当前布局。

**备选方案**

- 方案 A：所有子项目统一放在 `packages/` 下。优点是结构更平；缺点是文档站和测试工程的“应用语义”不清晰。
- 方案 B：使用 `docs/`、`tests/`、`packages/` 三层结构。优点是目录可读性高；缺点是 workspace 任务归类和通用脚本命名不如 apps/packages 统一。

最终选择 apps + packages，因为它更利于 turborepo 任务建模与后续扩展。

### 2. 组件库 package 保持纯净，只暴露组件源码、构建产物和导出入口

**决策**

`packages/sci-comp-core` 仅承载：

- `packages/sci-comp-core/src/` 组件源码、样式、类型与导出入口
- 组件库构建配置（Vite/Rollup 或等价打包配置）
- package 级 tsconfig
- 面向消费方的 `exports`、`main`、`module`、`types`

所有文档示例、测试工具、测试用例、站点页面均迁出该包，不再与组件源码混放。

**原因**

- 组件库 package 的职责必须稳定且最小化，便于构建、发布和外部消费。
- 当前单包项目里测试与文档依赖会污染组件库依赖面，迁出后可降低主包依赖复杂度。
- 与文档/测试分离后，可以在 turborepo 中表达“文档站依赖组件库构建结果”“测试工程依赖组件源码或导出”的关系。

**备选方案**

- 方案 A：保留测试文件与 stories 在组件包内，通过 glob 排除构建。优点是迁移成本低；缺点是包边界依旧不纯。
- 方案 B：将文档示例放在组件包内，测试迁出。优点是示例和源码就近；缺点是文档技术栈仍与组件包耦合。

最终选择彻底分离，以满足“纯组件库 package”的目标。

### 3. 文档主入口切换到 Rspress，并通过 workspace 依赖消费组件库

**决策**

`apps/sci-comp-documention` 使用 Rspress 作为文档站框架，直接依赖 `packages/sci-comp-core`。文档站内按组件类别组织页面，至少包含：组件总览、安装/使用、Button/Input/Table/Form 等组件示例页，以及后续 Modal/Tabs 的占位扩展结构。

**原因**

- Rspress 更适合承载类官网的信息架构：导航、侧边栏、Markdown/MDX 内容页、示例说明混排。
- 文档站通过 workspace 直接依赖组件库，可以保证示例与源码同版本联动，不需要额外发包。
- 相比继续把 Storybook 作为主入口，Rspress 更适合写“说明 + 约束 + 示例 + 使用方法”的完整文档站。

**备选方案**

- 方案 A：继续以 Storybook 作为主文档。优点是组件示例天然友好；缺点是内容型文档结构弱，不符合“官网式文档站”目标。
- 方案 B：使用 VitePress/Nextra。优点是生态成熟；缺点是本次需求已明确指定 Rspress。

最终选择 Rspress，并把 Storybook 视为迁移期资产，而不是目标方案核心。

### 4. 测试用例迁移到独立测试工作区，但继续使用 Vitest + RTL 技术栈

**决策**

`apps/sci-comp-test` 作为独立测试工程，负责：

- 组件行为测试文件
- 通用渲染工具与测试 providers
- jsdom / Vitest 配置
- 按组件分类的测试目录

测试工程通过 workspace 依赖消费 `packages/sci-comp-core`，并在需要时通过别名或源码映射覆盖到源码入口，以兼顾测试速度与调试体验。

**原因**

- 用户已明确要求使用 Vitest + React Testing Library，迁移只需要重组承载位置，不需要重写测试体系。
- 独立测试工程可以避免将测试运行时、测试工具和组件库构建职责混在同一个 package。
- 后续若要加入视觉回归、覆盖率汇总、跨组件集成测试，也更适合在独立工作区扩展。

**备选方案**

- 方案 A：保留测试文件在组件库包中。优点是就近；缺点是不符合“测试项目独立承载”的目标。
- 方案 B：引入 Playwright 作为统一测试方案。优点是可扩展 e2e；缺点是超出当前范围。

最终选择独立 `sci-comp-test` 工作区，并延续现有 Vitest + RTL。

### 5. 工程规范采用“根配置统一 + package 脚本透传”的治理模式

**决策**

在 monorepo 根目录统一放置：

- ESLint / Prettier 主配置
- commitlint 配置
- cz-git 配置
- Husky 钩子
- lint-staged 配置
- turborepo pipeline 配置

各 workspace package 仅保留最小脚本入口，例如 `lint`、`build`、`test`、`dev`，再由 turborepo 从根目录统一编排执行。

**原因**

- 提交规范和格式化规则天然属于仓库级约束，放在根目录便于统一治理。
- package 内只保留必要脚本，可减少重复配置与漂移。
- turborepo 通过统一 task 名称编排，能让本地与 CI 的执行模型保持一致。

**备选方案**

- 方案 A：每个包维护独立 ESLint/Prettier 配置。优点是灵活；缺点是规则容易漂移。
- 方案 B：抽成单独 `packages/configs` 并强制所有包继承。优点是最规范；缺点是当前规模下实施成本更高。

最终先采用根配置统一；如果后续 package 数量继续增长，再抽离共享配置包。

### 6. 迁移采取“先搭骨架，再搬源码，再恢复验证”的分阶段策略

**决策**

实施顺序定义为：

1. 建立 workspace 与 turbo 骨架。
2. 创建 `packages/sci-comp-core`、`apps/sci-comp-documention`、`apps/sci-comp-test`。
3. 迁移现有组件源码和入口到组件库包。
4. 迁移测试到测试工作区并恢复通过。
5. 建立 Rspress 文档站并迁入组件说明。
6. 接入 lint / format / commit hooks。
7. 清理旧单包残留脚本与目录。

**原因**

- 先搭骨架再搬内容可以降低路径大规模变更时的混乱度。
- 测试恢复要早于文档细化，这样可以先验证组件迁移未破坏功能。
- 最后再清理旧目录，可保留迁移缓冲，减少一次性切断导致的回滚困难。

**备选方案**

- 方案 A：先直接搬源码和测试，再补 workspace。缺点是路径与脚本同时变化，调试成本高。
- 方案 B：一次性重建新仓库再复制代码。缺点是历史与差异不连续。

最终采用渐进迁移，以控制风险。

## Risks / Trade-offs

- **[路径迁移导致导入失效]** → 先迁移组件库入口，再批量修复测试与文档引用；用 TypeScript 与 Vitest 作为回归校验。
- **[文档站与组件库构建链不一致]** → 文档站只通过 workspace 依赖消费组件库公开入口，不直接复制组件代码。
- **[turborepo pipeline 配置不当导致本地/CI 脚本不一致]** → 所有标准任务统一命名为 `dev/build/test/lint/typecheck`，避免各包自定义命名漂移。
- **[提交钩子过重影响开发体验]** → pre-commit 只运行 lint-staged 范围内检查，完整测试放到手动命令或 CI 中执行。
- **[Storybook 资产残留引发双轨文档维护]** → 在迁移计划中明确 Storybook 仅做过渡资产，文档主入口收敛到 Rspress。
- **[测试工程独立后运行入口变复杂]** → 在根目录提供统一脚本别名，例如 `pnpm test`、`pnpm lint`、`pnpm docs:dev`，降低使用门槛。
- **[包边界初期过于保守，后续仍需拆配置]** → 先用根配置统一治理，观察实际重复度，再决定是否抽离共享配置包。

## Migration Plan

1. 在仓库根目录引入 `pnpm-workspace.yaml`、`turbo.json` 和新的根 `package.json`，建立 monorepo 任务入口。
2. 创建 `packages/sci-comp-core`，迁移现有 `src` 中通用组件源码、样式、导出与构建配置。
3. 创建 `apps/sci-comp-test`，迁移当前组件测试、render 工具和 Vitest 配置，恢复 Button / Input / Table / Form 测试。
4. 创建 `apps/sci-comp-documention`，基于 Rspress 建立站点骨架，接入组件库依赖并迁移说明文档。
5. 在根目录接入 ESLint、Prettier、Husky、lint-staged、commitlint、cz-git，并让所有 workspace 共享同一套仓库规则。
6. 移除旧单包脚本与无效目录引用，确保开发者通过根目录命令即可完成安装、开发、测试和构建。
7. 以根目录 `pnpm build`、`pnpm test`、`pnpm lint` 作为验收基线。

**回滚策略**

- 在迁移未完成前，保留旧目录内容直至对应新 workspace 验证通过，再删除旧入口。
- 若某阶段失败，可回退到前一提交，恢复单包结构；由于迁移分阶段进行，不依赖不可逆的数据变更。

## Open Questions

- `sci-comp-core` 最终包名是否需要与未来发布名完全一致，还是先使用内部 workspace 名称即可？当前设计按内部名推进，不阻塞迁移。
- Storybook 是立即移除，还是在过渡期保留只读示例能力？当前设计倾向于过渡期保留、但不再作为主文档入口。
- 文档站是否需要在首期就加入在线 playground/代码预览增强能力？当前设计默认先完成静态文档 + 基础示例展示，增强能力留待后续迭代。
