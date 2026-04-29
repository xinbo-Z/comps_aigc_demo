## Context

`sci-comp-core` 当前已经具备最小的主题输入能力：`createThemeTokens()` 可以基于少量 seed token 生成主题对象，并且测试工作区已经通过 Ant Design `ConfigProvider` 注入这些 token。但 core 内部同时存在一条独立的 CSS Modules 样式链，Button、Input、Form/SchemaForm、Modal 通过 `var(--text-h)`、`var(--bg)`、`var(--border)`、`var(--accent)`、`var(--danger)` 等历史变量名消费样式，而这条链路没有在 core 内部与 TypeScript token 建立稳定映射。

当前状态带来三个明显问题：一是 AntD token、CSS 变量和组件样式消费没有形成单一闭环；二是颜色、圆角、控件高度等能力同时以 token、历史变量和硬编码常量三种形式存在；三是后续如果引入 dark mode、品牌换肤或组件级主题覆写，将缺少一个稳定的样式变量 contract。由于当前组件体系已经可用，本次设计不能推倒重来，而需要在保留现有 wrapper 组件和对外 API 的前提下做渐进重构。

## Goals / Non-Goals

**Goals:**

- 建立以 semantic token 为中心的主题分层，让 seed/base token、semantic token 与组件消费职责清晰分离。
- 建立双输出桥接机制，使同一套主题输入能够同时映射到 Ant Design token 与 core 内部 CSS custom properties。
- 为当前依赖 CSS 变量的 Button、Input、Form/SchemaForm、Modal 建立稳定的迁移路径。
- 在迁移早期保留旧变量名兼容输出，降低对现有组件样式和外部宿主环境的破坏。
- 收敛硬编码的圆角、控件高度和运行时颜色派生写法，为后续更完整的主题能力打基础。

**Non-Goals:**

- 本次设计不追求一次性重写所有组件样式体系。
- 本次设计不在第一阶段完整实现 dark mode、品牌主题市场或复杂的组件级差异主题系统。
- 本次设计不要求立即删除所有旧 CSS 变量名，只要求建立新旧并存的过渡 contract。
- 本次设计不改变组件库现有以 Ant Design wrapper 为核心的基本实现路线。

## Decisions

### Decision: 采用“单一主题源 + 双输出通道”架构

主题系统将以 core 内部的主题对象为唯一来源，再分别输出到 Ant Design `ConfigProvider` token 与 CSS custom properties。这样可以避免当前主题逻辑一部分存在于 TS token、一部分存在于宿主 CSS 变量中的分裂状态。

**Why this over alternatives:**

- 相比“只继续扩展 AntD token”，该方案能覆盖 CSS Modules 组件。
- 相比“完全转向 CSS 变量驱动”，该方案可以保留 Ant Design wrapper 组件天然可用的 token 能力。
- 相比“一次性把所有组件改成纯 CSS-in-JS”，该方案对当前项目侵入更小、迁移更现实。

### Decision: 采用三层 token 结构

设计采用 seed/base token、semantic token、component token 三层结构。

- seed/base token：保留 `colorPrimary`、`colorDanger`、`colorText`、`colorBgContainer`、`borderRadius`、`controlHeight*` 等基础输入。
- semantic token：新增 text、surface、border、action、danger、radius、control size 等语义层，用作组件默认消费入口。
- component token：仅在组件确实需要偏离全局语义时引入，第一阶段只覆盖少量已知尺寸/圆角差异。

**Why this over alternatives:**

- 相比直接增加更多平铺字段，三层结构更适合后续 dark mode 和品牌换肤。
- 相比一开始就大量引入 component token，这种方式更克制，能先把闭环打通。

### Decision: 新旧 CSS 变量名并存一段兼容期

第一阶段将同时输出规范化的新变量命名和现有历史变量名。例如语义层可以输出 `--sci-color-text-primary`，同时兼容映射为 `--text-h`；`--sci-color-surface-base` 同时兼容 `--bg`。

**Why this over alternatives:**

- 相比立即全量替换 CSS Modules 里的旧变量名，这种方式可以先稳定 contract，再分批迁移组件。
- 相比继续只保留旧变量名，这种方式能为长期维护建立更清晰的命名边界。

### Decision: 先迁移 Button、Input，再迁移 Form/SchemaForm、Modal

第一阶段优先迁移 Button 和 Input，因为它们对颜色、边框、状态、尺寸的语义依赖最集中，最适合作为 semantic token 覆盖率验证样本。Form/SchemaForm 和 Modal 在第二批迁移，用于验证 CSS vars 外壳与 AntD 原生控件同源主题是否成立。

**Why this over alternatives:**

- Button / Input 能更早暴露 semantic token 是否足够表达 hover、focus、disabled、danger 等状态。
- Form/SchemaForm 内部大量继续依赖 Ant Design 控件，适合作为桥接能力的后续验证，而不是第一批复杂化主题设计。

### Decision: 将颜色派生从运行时 CSS 迁移到 token 构建阶段

像 `color-mix(in srgb, var(--danger) 15%, transparent)` 这类运行时颜色派生应收敛为语义 token，例如 `dangerSoft`，由主题构建阶段统一产出。

**Why this over alternatives:**

- 可以降低浏览器兼容性与运行时差异风险。
- 让 dark mode 与品牌主题下的状态色控制更可预测。
- 让测试验证可以直接断言 token 输出，而不是依赖浏览器渲染细节。

## Risks / Trade-offs

- **[旧变量可能被宿主环境直接依赖]** → 通过兼容期同时输出旧变量名和新变量名，避免立刻破坏外部样式约定。
- **[AntD token 与 CSS 变量语义无法完全一一对应]** → 以 semantic token 为中间层，而不是尝试让两套输出彼此直接映射。
- **[placeholder、helper、disabled 文本未来语义可能分化]** → 即使第一阶段使用相同初值，也先定义为独立 semantic token，保留后续拆分空间。
- **[组件迁移过程中同时维护两套变量名会增加短期复杂度]** → 只在过渡窗口内保留双写，待 Button、Input、Form、Modal 完成迁移后再逐步收口。
- **[主题桥接层增加实现复杂度]** → 通过把第一阶段范围限定在 `src/styles/` 与少量核心组件，避免在同一次 change 中扩散到整个组件库。
