## ADDED Requirements

### Requirement: Foundational component set
The library SHALL provide the foundational business-facing components `Button`, `Form`, `Table`, and `Modal` as part of the MVP public API.

#### Scenario: Developer consumes foundational components
- **WHEN** a business frontend developer uses the MVP library
- **THEN** the developer MUST be able to import and render `Button`, `Form`, `Table`, and `Modal`

### Requirement: Ant Design-aligned usage model
Foundational components SHALL preserve a usage model familiar to Ant Design 6 users while allowing the library to define business-friendly defaults.

#### Scenario: Developer uses common button patterns
- **WHEN** a developer configures common button variants and states
- **THEN** the component behavior MUST remain understandable to a developer familiar with Ant Design button usage

#### Scenario: Developer uses common form, table, and modal patterns
- **WHEN** a developer configures standard form layout, data table display, or modal confirmation flows
- **THEN** the API model MUST remain consistent with common Ant Design mental models

### Requirement: Strongly typed public props
Each foundational component SHALL expose complete TypeScript props definitions without relying on `any` in its public API.

#### Scenario: Developer consumes component props in TypeScript
- **WHEN** a TypeScript project uses a foundational component
- **THEN** the component props MUST provide explicit type information for supported public usage

### Requirement: Business-friendly default states
Each foundational component SHALL provide usable default behavior for common business scenarios and SHALL support relevant boundary states.

#### Scenario: Developer renders a button in a loading or disabled state
- **WHEN** a developer configures a `Button` as loading or disabled
- **THEN** the visual and interaction behavior MUST clearly communicate that state

#### Scenario: Developer renders a table with no data
- **WHEN** a developer renders `Table` without rows
- **THEN** the component MUST present a clear empty state

#### Scenario: Developer renders a modal for confirmation
- **WHEN** a developer opens `Modal` for a business confirmation flow
- **THEN** the component MUST present a consistent title, content, and action area structure
