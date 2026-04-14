## Context

The existing `hik-comps` MVP establishes a display-first instrument component baseline centered on business frontend usability, typed APIs, and clean separation between UI components and backend/domain workflows. That baseline is intentionally limited: `WaveformChart`, `RealtimeDataTable`, and `ParamConfigForm` support representative instrument pages but avoid heavier realtime, analysis, and control concerns.

The new v1.1 change defines a professional expansion layer for instrument scenarios that demand higher data density, richer interaction, and more specialized operator-facing controls. This includes advanced charting (`WaveformChart`, `SpectrumChart`), control surfaces (`InstrumentPanel`), parameter management (`ParamConfigForm`), and streaming table behavior (`RealtimeDataTable`).

The design must preserve a key architectural rule from the MVP: components may support professional UI behavior and typed integration contracts, but they must not absorb device protocol logic, backend orchestration, or full scientific computation platforms. This makes the expansion powerful without turning the component library into an application framework.

## Goals / Non-Goals

**Goals:**
- Define a professional expansion package for instrument-oriented components on top of the MVP.
- Support high-density and streaming visualization requirements for waveform and spectrum scenarios.
- Support advanced instrument-facing interaction patterns such as zooming, panning, crosshairs, overlays, peak operations, templates, threshold alarms, and bounded streaming buffers.
- Clarify which responsibilities belong inside reusable components versus which remain in consuming applications or integration adapters.
- Preserve compatibility with the existing two-layer `general` and `instrument` component model.
- Keep the specification implementation-aware where needed, including Canvas-first rendering and extension from foundational `Form` and `Table` primitives.

**Non-Goals:**
- Defining device communication protocols, transport reconnection policies, or application-specific WebSocket lifecycle management.
- Building a full scientific analysis engine or generic algorithm platform inside the component library.
- Encoding orchestration workflows such as experiment execution, approval flows, safety interlocks, or permission systems.
- Guaranteeing desktop-native scientific workstation performance for every possible dataset shape.
- Collapsing the MVP display-first components and the v1.1 professional package into a single undifferentiated contract.

## Decisions

### Decision: Treat v1.1 as a professional expansion package, not an MVP rewrite
The v1.1 change will add advanced capabilities in separate capability specs while preserving the MVP as the baseline contract.

**Rationale:** This keeps the initial library approachable for business frontend developers while allowing a richer professional tier for advanced instrument use cases.

**Alternatives considered:**
- Rewrite the MVP capability directly: simpler on paper, but it erases the distinction between baseline and advanced behaviors.
- Split each component into a separate change: more incremental, but weaker as a coherent v1.1 package.

### Decision: Use Canvas-first rendering for high-density waveform scenarios
`WaveformChart` will be specified as Canvas-first for professional rendering scenarios, especially where datasets may reach millions of points. The specification will allow typed stream integration contracts without embedding transport management into the component.

**Rationale:** Canvas is the practical rendering path for dense waveform plotting and interactive navigation at this scale.

**Alternatives considered:**
- SVG-first rendering: easier DOM inspection, but not appropriate for million-point rendering.
- Force a specific chart engine in the spec: too implementation-specific for this stage.

### Decision: Keep advanced chart interactions inside the UI contract, not the data-source contract
Features such as zoom, pan, crosshair, overlays, peak operations, baseline correction, and export will be treated as component-level capabilities. Data transport, persistence, and domain computation orchestration remain outside the component boundary.

**Rationale:** These interactions define the reusable UI value of the professional package, while transport and orchestration differ significantly across deployments.

**Alternatives considered:**
- Push more logic into the app layer: reduces component complexity, but undermines reuse.
- Let charts fully own data subscription and analysis pipelines: increases convenience in narrow cases but creates brittle coupling.

### Decision: Compose advanced components from foundational primitives where possible
`ParamConfigForm` will explicitly build on the library’s `Form` capability, and `RealtimeDataTable` will build on the library’s `Table` capability. `InstrumentPanel` will compose reusable interaction primitives such as indicators, knobs, and sliders rather than acting as a monolith.

**Rationale:** This preserves consistency with the library architecture and reduces divergence between general and instrument layers.

**Alternatives considered:**
- Rebuild everything as isolated specialized widgets: faster for isolated features, but duplicates patterns and weakens consistency.
- Force all advanced behavior into generic foundational components: overcomplicates the base layer.

### Decision: Specify bounded streaming behavior instead of infinite live-state ownership
`RealtimeDataTable` and realtime `WaveformChart` scenarios will support append-oriented updates and configurable buffering, but the library will not be responsible for durable stream history, reconnect semantics, or upstream event guarantees.

**Rationale:** Reusable UI components can manage presentation buffers, but durable stream management belongs to the host application.

**Alternatives considered:**
- Infinite in-memory history inside components: unrealistic for long-running sessions.
- No internal buffering semantics: too vague for a professional streaming UI.

### Decision: Model professional controls as typed UI contracts with explicit state feedback
`InstrumentPanel` will support draggable layout composition, realtime status indicators, knob/slider interactions, and alarm-threshold configuration as part of the reusable UI contract, while leaving command dispatch and safety policy outside the component.

**Rationale:** Operator-facing control surfaces need reusable UI semantics, but transport and policy vary by instrument platform.

**Alternatives considered:**
- Keep `InstrumentPanel` display-only: too limited for the intended professional tier.
- Embed command execution and alarm policy engines: outside component-library scope.

## Risks / Trade-offs

- [Scope growth across multiple advanced components] A single v1.1 package may become too broad during implementation → Mitigation: keep capability boundaries explicit and allow implementation to phase within one change.
- [Performance expectations outrun practical browser limits] Million-point visualization and streaming workloads may differ by environment → Mitigation: specify required behavior and rendering strategy without promising universal workstation-grade guarantees.
- [Algorithm ambiguity in spectrum features] Peak picking, integration, and baseline correction can imply deep domain algorithms → Mitigation: specify stable user-facing behaviors and extension points rather than a full algorithm platform contract.
- [Control-panel responsibilities drift into orchestration] Consumers may expect protocol execution, interlocks, or workflow management inside `InstrumentPanel` → Mitigation: make UI-control versus system-orchestration boundaries explicit in specs.
- [Complexity leakage into base components] Advanced form and table behavior may pressure the foundational layer to absorb specialized logic → Mitigation: keep advanced capabilities specified as instrument-layer extensions on top of stable base components.

## Migration Plan

- Keep the existing MVP `instrument-display-components` capability as the baseline for display-first scenarios.
- Add new v1.1 professional capability specs for advanced visualization, control, parameter management, and streaming tables.
- Update the modified MVP instrument capability so that its requirements remain intentionally minimal and non-conflicting with the professional package.
- Implement advanced components and extensions behind the new capability boundaries without breaking baseline consumers.

## Open Questions

- Whether spectrum peak operations should require pluggable analysis adapters from the start or can begin with a smaller built-in interaction model.
- How much of `InstrumentPanel` layout persistence should be owned by the component versus the consuming application.
- Whether export behavior should share a common library-wide export abstraction across waveform and spectrum components.
