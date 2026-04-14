## MODIFIED Requirements

### Requirement: Display-first instrument component set
The library SHALL provide `WaveformChart`, `RealtimeDataTable`, and `ParamConfigForm` as the MVP scientific instrument component set, while allowing additional advanced capabilities to be defined separately in a professional expansion package.

#### Scenario: Developer builds an instrument-facing page with MVP components
- **WHEN** a business frontend developer creates an instrument-related page with the MVP library
- **THEN** the developer MUST be able to use `WaveformChart`, `RealtimeDataTable`, and `ParamConfigForm` as public components without requiring the professional expansion features

### Requirement: Data-input-driven component contracts
Instrument display components SHALL accept explicit input data and configuration through typed props and SHALL NOT require built-in transport, subscription, workflow orchestration, or device-protocol ownership in the MVP baseline.

#### Scenario: Page supplies waveform data
- **WHEN** a page passes waveform data into `WaveformChart`
- **THEN** the component MUST render based on the supplied data contract without requiring an internal data source

#### Scenario: Page supplies realtime table rows
- **WHEN** a page passes current records into `RealtimeDataTable`
- **THEN** the component MUST render those records without owning the upstream refresh mechanism

#### Scenario: Page supplies parameter schema and values
- **WHEN** a page passes parameter definitions and current values into `ParamConfigForm`
- **THEN** the component MUST render and manage the input experience based on those supplied props
