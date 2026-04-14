## ADDED Requirements

### Requirement: Waveform chart supports high-density rendering
`WaveformChart` SHALL support high-density waveform visualization using a Canvas-based rendering path suitable for professional instrument scenarios with very large datasets.

#### Scenario: Million-point waveform dataset is rendered
- **WHEN** `WaveformChart` receives a waveform dataset containing up to millions of data points
- **THEN** the component MUST render through a Canvas-oriented path rather than requiring DOM-scale point rendering

### Requirement: Waveform chart supports realtime stream integration
`WaveformChart` SHALL support realtime waveform updates through typed stream-oriented input contracts compatible with WebSocket-driven applications, without requiring the component to own connection lifecycle management.

#### Scenario: Realtime waveform updates arrive from an external stream
- **WHEN** a consuming application supplies incremental waveform updates sourced from a WebSocket-driven data flow
- **THEN** `WaveformChart` MUST update the rendered waveform without requiring the component to establish or manage the WebSocket connection itself

### Requirement: Waveform chart supports navigation and inspection interactions
`WaveformChart` SHALL support zooming, panning, and crosshair-based inspection for professional waveform analysis workflows.

#### Scenario: User inspects waveform details
- **WHEN** a user zooms, pans, or activates crosshair inspection on a rendered waveform
- **THEN** the component MUST update the viewport or inspection state to support detailed review of the waveform

### Requirement: Waveform chart supports multi-channel overlays and export
`WaveformChart` SHALL support multi-channel overlay display and SHALL allow waveform output export in PNG, SVG, and CSV formats.

#### Scenario: Multiple channels are displayed together
- **WHEN** a consuming page supplies multiple waveform channels for comparison
- **THEN** `WaveformChart` MUST render those channels in an overlay visualization with distinguishable presentation

#### Scenario: User exports waveform output
- **WHEN** a user triggers waveform export
- **THEN** the component MUST provide export output in PNG, SVG, or CSV according to the selected export mode

### Requirement: Spectrum chart supports multiple spectrum workflows
`SpectrumChart` SHALL support professional spectrum visualization for infrared, ultraviolet, mass spectrum, and similarly structured spectral data types.

#### Scenario: Spectrum type changes by domain
- **WHEN** a consuming page configures `SpectrumChart` for a supported spectrum type
- **THEN** the component MUST render the supplied spectral data within a consistent interaction model

### Requirement: Spectrum chart supports peak-oriented analysis interactions
`SpectrumChart` SHALL support peak annotation, peak integration, and peak picking as user-facing spectrum analysis interactions.

#### Scenario: User marks or analyzes peaks
- **WHEN** a user performs a supported peak annotation, integration, or picking interaction
- **THEN** the component MUST surface the resulting peak-oriented state within the chart interaction model

### Requirement: Spectrum chart supports overlays and baseline correction
`SpectrumChart` SHALL support multi-spectrum overlay comparison and baseline-correction workflows suitable for professional analysis views.

#### Scenario: Multiple spectra are compared
- **WHEN** a consuming page supplies multiple spectra for comparison
- **THEN** `SpectrumChart` MUST render an overlay comparison view that preserves distinguishable series presentation

#### Scenario: Baseline correction is applied
- **WHEN** a user applies a supported baseline-correction action
- **THEN** the component MUST update the spectrum presentation to reflect the corrected baseline state
