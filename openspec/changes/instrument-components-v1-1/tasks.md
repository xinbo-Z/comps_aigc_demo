## 1. Professional Instrument Foundation

- [ ] 1.1 Define shared advanced instrument types and extension contracts for streaming data, export modes, threshold rules, and layout state
- [ ] 1.2 Establish the internal module structure for advanced charting, control-panel primitives, parameter templates, and streaming-table state
- [ ] 1.3 Define how advanced instrument components are exported from the instrument layer without breaking MVP consumers

## 2. Advanced Waveform and Spectrum Components

- [ ] 2.1 Implement Canvas-first rendering infrastructure for high-density `WaveformChart` datasets
- [ ] 2.2 Add realtime stream update handling, zoom, pan, crosshair inspection, multi-channel overlays, and export behavior to `WaveformChart`
- [ ] 2.3 Implement the new `SpectrumChart` component with support for multiple spectrum types and overlay comparison
- [ ] 2.4 Add peak annotation, peak integration, peak picking, and baseline-correction interactions to `SpectrumChart`
- [ ] 2.5 Add stories and automated tests covering dense-data, interaction, overlay, and export scenarios for advanced chart components

## 3. Instrument Control Panel

- [ ] 3.1 Implement `InstrumentPanel` layout composition with drag-based rearrangement support
- [ ] 3.2 Implement realtime status indicators and reusable knob and slider control primitives for the panel
- [ ] 3.3 Implement alarm-threshold configuration flows and typed control-output contracts for `InstrumentPanel`
- [ ] 3.4 Add stories and automated tests covering layout, status, control interaction, and threshold scenarios for `InstrumentPanel`

## 4. Advanced Parameter Configuration

- [ ] 4.1 Extend `ParamConfigForm` with grouped collapsible parameter sections
- [ ] 4.2 Implement parameter linkage and constraint handling for dependent validation scenarios
- [ ] 4.3 Implement parameter template application and configuration import/export in JSON and YAML formats
- [ ] 4.4 Add stories and automated tests covering grouping, dependency rules, templates, and import/export scenarios for `ParamConfigForm`

## 5. Streaming Realtime Data Table

- [ ] 5.1 Extend `RealtimeDataTable` with append-oriented streaming update behavior and bounded buffering
- [ ] 5.2 Implement threshold-based highlighting and pause/resume controls for visible streaming updates
- [ ] 5.3 Add stories and automated tests covering append flow, buffering, highlighting, and pause/resume scenarios for `RealtimeDataTable`

## 6. Integration and Verification

- [ ] 6.1 Verify the modified MVP instrument-display capability remains usable without requiring professional expansion behaviors
- [ ] 6.2 Verify advanced instrument components preserve typed boundaries and do not own transport protocols or orchestration logic
- [ ] 6.3 Validate Storybook coverage and test coverage for all v1.1 professional expansion components
- [ ] 6.4 Run the full build and test verification flow for the v1.1 instrument component expansion
