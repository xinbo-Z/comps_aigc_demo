## Context

`hik-comps` is being established as a reusable frontend component library for scientific instrument applications, with the MVP aimed at business frontend developers rather than deeply specialized instrument software teams. The current project context already defines the core stack and coding conventions: React 19, TypeScript 5.x, Ant Design 6.x as the design reference, Vite for build tooling, CSS Modules for styling, Vitest + React Testing Library for tests, and Storybook 8 for documentation.

The MVP must do two things at once: provide a stable engineering foundation for a component library and deliver a small but representative set of general and instrument-oriented components. The selected MVP scope is intentionally display-first. It covers foundational UI wrappers (`Button`, `Form`, `Table`, `Modal`) and three instrument-facing components (`WaveformChart`, `RealtimeDataTable`, `ParamConfigForm`) while explicitly excluding complex instrument control workflows, advanced analytics, and algorithm-heavy interactions.

Because this is the library’s initial spec-driven proposal, the design needs to optimize for consistency, low adoption cost, and future extensibility without over-engineering the first release.

## Goals / Non-Goals

**Goals:**
- Establish a clear component-library architecture for the `hik-comps` MVP.
- Define how the library will package, export, document, theme, and test public components.
- Keep the public API style familiar to Ant Design users while adding business-friendly defaults.
- Separate general-purpose components from scientific instrument display components with clear ownership boundaries.
- Ensure every public component has strong typing, test coverage, and Storybook documentation.
- Create a foundation that can be extended later with components such as `SpectrumChart`, `PeakPicker`, and `InstrumentPanel`.

**Non-Goals:**
- Designing a full scientific instrument platform architecture.
- Implementing advanced chart analytics, peak detection, or domain algorithms in MVP components.
- Supporting complex command-and-control instrument workflows in the first release.
- Building exhaustive wrappers for the full Ant Design component surface.
- Solving extreme realtime rendering or virtualization requirements in the MVP.

## Decisions

### Decision: Use a two-layer component model
The library will organize public components into `general` and `instrument` layers. The `general` layer contains business-facing foundational wrappers aligned with Ant Design usage patterns. The `instrument` layer contains display-first scientific instrument components that compose the same tokens, styling rules, and interaction conventions.

**Rationale:** This mirrors the product goal: general components should remain broadly usable, while instrument-specific behavior stays isolated and easier to evolve.

**Alternatives considered:**
- Single flat component namespace: simpler initially, but weakens conceptual boundaries and makes future expansion harder.
- Deep domain-first segmentation: clearer for specialized teams, but too heavy for the MVP and less friendly for business frontend developers.

### Decision: Keep public APIs Ant Design-adjacent, not Ant Design-identical
Foundational components will follow Ant Design 6 mental models where practical, but the MVP will not attempt one-to-one compatibility. Each component may add business-friendly defaults and reduce unnecessary configuration surface.

**Rationale:** The target user already benefits from Ant Design familiarity, but exact parity would create unnecessary implementation burden and constrain useful simplifications.

**Alternatives considered:**
- Full API parity: lowers migration friction but increases scope and maintenance cost.
- Entirely custom APIs: maximizes flexibility but raises adoption cost and documentation burden.

### Decision: Standardize on CSS Modules plus theme tokens
Component-local styles will use CSS Modules, while visual values such as color, spacing, radius, and typography will resolve from a token system aligned to Ant Design 6 theming concepts.

**Rationale:** CSS Modules provide clear style isolation and predictable authoring, while tokens preserve visual consistency and theme customization.

**Alternatives considered:**
- Inline styling only: simpler in some cases, but weaker for scalable style organization.
- CSS-in-JS everywhere: closer to Ant Design internals, but not aligned with the project’s preferred styling convention.

### Decision: Require dual discoverability through exports and Storybook
Each public component will ship with typed exports and at least one Storybook story showing representative states. Public entry points will support both top-level and subpath imports to enable ergonomic adoption and on-demand loading patterns.

**Rationale:** The MVP is aimed at business frontend developers, so discoverability and low-friction usage matter as much as implementation correctness.

**Alternatives considered:**
- Top-level exports only: simpler packaging, but weaker support for selective consumption.
- Documentation-only examples without Storybook: lower setup effort, but much worse developer experience.

### Decision: Keep instrument components display-first and data-input-driven
`WaveformChart`, `RealtimeDataTable`, and `ParamConfigForm` will accept structured input data and configuration props, but they will not own transport, subscription, workflow, or control-plane concerns.

**Rationale:** This keeps the components reusable across business pages and prevents the MVP from embedding unstable domain workflows into the library contract.

**Alternatives considered:**
- Embed data fetching and subscriptions in components: convenient for some pages, but couples UI to backend and protocol choices.
- Model full control workflows now: more powerful, but explicitly outside the MVP scope.

### Decision: Make testing and documentation mandatory for every public component
All public components must include tests for core rendering and key boundary states, plus Storybook examples for common usage states such as default, disabled, loading, and empty data where applicable.

**Rationale:** The library’s value depends on reliability and reuse. Mandatory tests and docs create the minimum quality bar for future expansion.

**Alternatives considered:**
- Test only shared infrastructure: too weak for a public component library.
- Document only complex components: inconsistent and harder for adopters.

## Risks / Trade-offs

- [Wrapper scope drift] Foundational components may expand toward full Ant Design parity over time → Mitigation: define explicit MVP boundaries and treat additional API surface as later proposals.
- [Charting dependency churn] `WaveformChart` may need a chart implementation choice that affects performance and API shape → Mitigation: keep the spec focused on behavioral requirements and avoid locking the proposal to a heavyweight analytics contract.
- [Weak separation between business and instrument concerns] Consumers may request domain-specific workflow logic inside instrument components → Mitigation: keep data input and presentation responsibilities explicit in specs.
- [On-demand loading complexity] Export structure and styles can make selective imports fragile if not designed carefully → Mitigation: define packaging/export requirements in the foundation capability and validate them during implementation.
- [Documentation lag] Storybook and tests can fall behind component code → Mitigation: make docs and tests part of acceptance criteria for every public component.
