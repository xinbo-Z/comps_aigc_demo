## Why

The MVP instrument components establish a display-first baseline, but scientific instrument applications also need higher-performance visualization, richer analysis workflows, and more capable control surfaces for professional scenarios. A v1.1 expansion is needed now to define those advanced capabilities without collapsing the clean boundaries established by the MVP.

## What Changes

- Add a v1.1 professional expansion package for instrument-oriented components on top of the existing `hik-comps` MVP.
- Extend `WaveformChart` with high-density Canvas rendering, realtime stream integration hooks, navigation interactions, multi-channel overlays, and export capabilities.
- Introduce `SpectrumChart` as a new professional analysis component for multiple spectrum types, peak operations, overlay comparison, and baseline correction workflows.
- Introduce `InstrumentPanel` as a new configurable control-panel component with layout composition, realtime state indicators, domain-specific controls, and alarm-threshold interactions.
- Extend `ParamConfigForm` with grouped parameter presentation, parameter linkage and constraints, template support, and structured configuration import/export.
- Extend `RealtimeDataTable` with streaming append behavior, threshold-based highlighting, pause/resume controls, and configurable buffering.
- Preserve clear component boundaries by requiring professional UI and interaction capabilities without embedding device protocol implementations, orchestration logic, or full algorithm platforms into the components themselves.

## Capabilities

### New Capabilities
- `advanced-waveform-and-spectrum`: Defines advanced scientific visualization requirements for `WaveformChart` and `SpectrumChart`, including high-density rendering, analysis interactions, overlays, and export-oriented workflows.
- `instrument-control-panel`: Defines professional control-panel requirements for `InstrumentPanel`, including layout composition, status signaling, interaction controls, and threshold-oriented alarm configuration.
- `advanced-parameter-configuration`: Defines advanced parameter configuration requirements for `ParamConfigForm`, including grouping, constraints, linkage, templates, and import/export behavior.
- `streaming-instrument-data-table`: Defines streaming table requirements for `RealtimeDataTable`, including append-only updates, highlighting, pause/resume behavior, and bounded buffering.

### Modified Capabilities
- `instrument-display-components`: Refines the MVP display-first instrument capability so the base component set remains minimal while advanced behaviors move into the v1.1 professional expansion.

## Impact

- Affects the public requirements and future implementation shape of `WaveformChart`, `ParamConfigForm`, and `RealtimeDataTable`.
- Adds new public professional components `SpectrumChart` and `InstrumentPanel` to the instrument layer.
- Introduces new performance, interaction, and export expectations for instrument-oriented components, especially around Canvas rendering, streaming data, and analysis workflows.
- Establishes a clearer separation between component-level professional UI capabilities and out-of-scope concerns such as device communication protocols, orchestration systems, and backend subscription management.
