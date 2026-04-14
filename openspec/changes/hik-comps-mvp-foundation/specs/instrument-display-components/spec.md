## ADDED Requirements

### Requirement: Display-first instrument component set
The library SHALL provide `WaveformChart`, `RealtimeDataTable`, and `ParamConfigForm` as the MVP scientific instrument component set.

#### Scenario: Developer builds an instrument-facing page
- **WHEN** a business frontend developer creates an instrument-related page with the MVP library
- **THEN** the developer MUST be able to use `WaveformChart`, `RealtimeDataTable`, and `ParamConfigForm` as public components

### Requirement: Data-input-driven component contracts
Instrument display components SHALL accept explicit input data and configuration through typed props and SHALL NOT require built-in transport, subscription, or workflow orchestration logic.

#### Scenario: Page supplies waveform data
- **WHEN** a page passes waveform data into `WaveformChart`
- **THEN** the component MUST render based on the supplied data contract without requiring an internal data source

#### Scenario: Page supplies realtime table rows
- **WHEN** a page passes current records into `RealtimeDataTable`
- **THEN** the component MUST render those records without owning the upstream refresh mechanism

#### Scenario: Page supplies parameter schema and values
- **WHEN** a page passes parameter definitions and current values into `ParamConfigForm`
- **THEN** the component MUST render and manage the input experience based on those supplied props

### Requirement: Waveform visualization states
`WaveformChart` SHALL support display-oriented waveform visualization for business pages, including baseline chart rendering and visible handling of loading or empty data states.

#### Scenario: Waveform data is present
- **WHEN** `WaveformChart` receives valid waveform data
- **THEN** it MUST render a waveform visualization in the library’s themed style

#### Scenario: Waveform data is absent
- **WHEN** `WaveformChart` has no data to render
- **THEN** it MUST present a clear empty or placeholder state

### Requirement: Realtime table presentation states
`RealtimeDataTable` SHALL support realtime-oriented tabular display, including record presentation, status-oriented cells, and visible handling of empty data or refresh-related states.

#### Scenario: Current records are available
- **WHEN** `RealtimeDataTable` receives one or more current records
- **THEN** it MUST render them in a table presentation suitable for business users monitoring live data

#### Scenario: No records are available
- **WHEN** `RealtimeDataTable` receives no records
- **THEN** it MUST present a clear empty state

### Requirement: Parameter configuration form behavior
`ParamConfigForm` SHALL support display and input of configurable instrument parameters, including grouped presentation, default values, validation feedback, and read-only presentation where configured.

#### Scenario: Editable parameters are provided
- **WHEN** `ParamConfigForm` receives editable parameter definitions and values
- **THEN** it MUST render a usable input form for those parameters

#### Scenario: Read-only parameters are provided
- **WHEN** `ParamConfigForm` is configured for read-only presentation
- **THEN** it MUST display parameter values without editable controls

#### Scenario: Invalid input is submitted
- **WHEN** a user submits parameter input that violates configured validation rules
- **THEN** the form MUST present validation feedback before successful submission
