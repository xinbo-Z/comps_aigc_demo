## Context

`hik-comps` 正在被建立为一个面向科学仪器应用的可复用前端组件库，其 MVP 的目标用户是业务前端开发者，而不是高度专业化的仪器软件团队。当前项目上下文已经明确了核心技术栈与编码约定：React 19、TypeScript 5.x、Ant Design 6.x 作为设计参考、Vite 作为构建工具、CSS Modules 作为样式方案、Vitest + React Testing Library 作为测试方案，以及 Storybook 8 作为文档方案。

这个 MVP 需要同时完成两件事：为组件库提供稳定的工程基础，并交付一组规模较小但具有代表性的通用组件与仪器导向组件。选定的 MVP 范围有意保持“以展示为主”。它包含基础 UI wrapper（`Button`、`Form`、`Table`、`Modal`）以及三个面向仪器的组件（`WaveformChart`、`RealtimeDataTable`、`ParamConfigForm`），同时明确排除复杂的仪器控制工作流、高级分析能力和重算法交互。

由于这是该组件库首个以 spec 驱动的提案，设计需要在不过度工程化首个版本的前提下，尽量优化一致性、降低接入成本，并保留未来扩展能力。

## Goals / Non-Goals

**Goals:**

- 为 `hik-comps` MVP 建立清晰的组件库架构。
- 定义组件库如何打包、导出、编写文档、管理主题以及测试公共组件。
- 保持公共 API 风格对 Ant Design 用户足够熟悉，同时加入更适合业务场景的默认行为。
- 以明确的职责边界区分通用组件与科学仪器展示组件。
- 确保每个公共组件都具备强类型、测试覆盖和 Storybook 文档。
- 构建一个可在后续扩展到 `SpectrumChart`、`PeakPicker` 和 `InstrumentPanel` 等组件的基础。

**Non-Goals:**

- 设计完整的科学仪器平台架构。
- 在 MVP 组件中实现高级图表分析、峰值检测或领域算法。
- 在首个版本中支持复杂的命令控制型仪器工作流。
- 为完整的 Ant Design 组件面构建穷尽式 wrapper。
- 在 MVP 中解决极端实时渲染或虚拟化需求。

## Decisions

### Decision: 使用双层组件模型

组件库将公共组件组织为 `general` 和 `instrument` 两层。`general` 层包含面向业务场景、对齐 Ant Design 使用模式的基础 wrapper；`instrument` 层包含以展示为主的科学仪器组件，这些组件复用相同的 token、样式规则和交互约定。

**Rationale:** 这与产品目标一致：通用组件应保持广泛可用，而仪器特有行为应保持隔离，以便后续更容易演进。

**Alternatives considered:**

- 单一扁平组件命名空间：初期更简单，但会削弱概念边界，也让未来扩展更困难。
- 深度领域优先分层：对专业团队更清晰，但对 MVP 来说过重，也不利于业务前端开发者使用。

### Decision: 公共 API 保持贴近 Ant Design，而不是与其完全一致

基础组件会在可行范围内遵循 Ant Design 6 的心智模型，但 MVP 不会追求一对一兼容。每个组件可以加入更适合业务场景的默认行为，并减少不必要的配置面。

**Rationale:** 目标用户已经能从 Ant Design 的熟悉感中受益，但完全对齐会带来不必要的实现负担，也会限制有价值的简化。

**Alternatives considered:**

- 完全 API 对齐：可降低迁移成本，但会显著增加范围和维护成本。
- 完全自定义 API：灵活性最高，但会提高接入成本和文档负担。

### Decision: 统一采用 CSS Modules 加主题 token

组件局部样式使用 CSS Modules，而颜色、间距、圆角、排版等视觉值则通过与 Ant Design 6 主题概念对齐的 token 系统解析。

**Rationale:** CSS Modules 提供清晰的样式隔离和可预测的编写方式，而 token 则能保持视觉一致性和主题可定制性。

**Alternatives considered:**

- 仅使用内联样式：某些场景更简单，但不利于可扩展的样式组织。
- 全面使用 CSS-in-JS：更接近 Ant Design 内部实现，但不符合项目偏好的样式约定。

### Decision: 通过导出入口与 Storybook 实现双重可发现性

每个公共组件都将提供类型化导出，并至少带有一个展示代表性状态的 Storybook story。公共入口同时支持顶层导入与子路径导入，以便实现更友好的接入体验和按需加载模式。

**Rationale:** MVP 面向业务前端开发者，因此可发现性和低摩擦使用体验与实现正确性同样重要。

**Alternatives considered:**

- 仅提供顶层导出：打包更简单，但对按需消费支持较弱。
- 只有文档示例而不使用 Storybook：搭建成本更低，但开发者体验会明显变差。

### Decision: 保持仪器组件以展示为主、以数据输入驱动

`WaveformChart`、`RealtimeDataTable` 和 `ParamConfigForm` 将接收结构化输入数据和配置 props，但不会拥有传输、订阅、工作流或控制平面相关职责。

**Rationale:** 这能让组件在业务页面中保持可复用，也避免将不稳定的领域工作流嵌入组件库契约中。

**Alternatives considered:**

- 在组件内嵌入数据拉取和订阅：对部分页面更方便，但会把 UI 与后端及协议选择耦合在一起。
- 现在就建模完整控制工作流：能力更强，但明确超出了 MVP 范围。

### Decision: 将测试和文档设为每个公共组件的强制要求

所有公共组件都必须包含针对核心渲染和关键边界状态的测试，并提供 Storybook 示例，覆盖默认、禁用、加载、空数据等常见使用状态（如适用）。

**Rationale:** 组件库的价值依赖于可靠性和复用性。强制测试与文档是支撑后续扩展的最低质量门槛。

**Alternatives considered:**

- 只测试共享基础设施：对于公共组件库来说过于薄弱。
- 只为复杂组件编写文档：会造成不一致，也让接入方更难使用。

## Risks / Trade-offs

- [Wrapper 范围漂移] 基础组件可能逐步扩展到接近完整 Ant Design 对齐 → Mitigation: 明确 MVP 边界，并将新增 API 视为后续提案。
- [图表依赖频繁变化] `WaveformChart` 可能需要一个会影响性能和 API 形态的图表实现选择 → Mitigation: 让 spec 聚焦行为要求，避免在提案阶段绑定到重量级分析契约。
- [业务与仪器职责分离不清] 使用方可能要求在仪器组件中加入领域工作流逻辑 → Mitigation: 在 spec 中明确数据输入与展示职责边界。
- [按需加载复杂度] 若导出结构和样式设计不当，选择性导入可能很脆弱 → Mitigation: 在基础能力中明确定义打包和导出要求，并在实现时验证。
- [文档滞后] Storybook 与测试可能落后于组件代码 → Mitigation: 将文档和测试纳入每个公共组件的验收标准。
