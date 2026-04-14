## ADDED Requirements

### Requirement: Instrument panel supports configurable layout composition
`InstrumentPanel` SHALL support configurable panel layouts that can be rearranged through drag-based interactions.

#### Scenario: Operator rearranges panel modules
- **WHEN** a user drags supported panel modules to new positions
- **THEN** `InstrumentPanel` MUST update the layout arrangement to reflect the new composition

### Requirement: Instrument panel supports realtime status indication
`InstrumentPanel` SHALL support realtime status indicators for instrument-facing operational states.

#### Scenario: Status indicator changes state
- **WHEN** a consuming page updates the status model for an instrument signal or indicator
- **THEN** the panel MUST render the corresponding realtime status indication in the UI

### Requirement: Instrument panel supports domain-specific control inputs
`InstrumentPanel` SHALL support operator-facing control inputs including knob-style controls and slider controls.

#### Scenario: User adjusts a knob or slider control
- **WHEN** a user interacts with a supported knob or slider control
- **THEN** the panel MUST surface the changed control value through its typed interaction contract

### Requirement: Instrument panel supports alarm-threshold configuration
`InstrumentPanel` SHALL support UI flows for viewing and adjusting alarm thresholds without embedding device-protocol execution inside the component.

#### Scenario: User updates an alarm threshold
- **WHEN** a user edits a configured alarm threshold in the panel
- **THEN** the panel MUST expose the updated threshold state for the consuming application to process
