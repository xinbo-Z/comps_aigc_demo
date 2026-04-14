## Why

The project needs a reusable frontend component library for scientific instrument applications that is approachable for business frontend developers and aligned with the Ant Design 6 ecosystem. A focused MVP is needed now to establish a stable engineering foundation, reduce repeated UI work, and standardize common instrument display scenarios before the library expands into more specialized control and analysis features.

## What Changes

- Establish the initial `hik-comps` MVP scope for a scientific-instrument-oriented React component library based on React 19, TypeScript 5.x, Ant Design 6.x, and Vite.
- Define the engineering foundation for the library, including build output, type declarations, theme customization, on-demand imports, CSS Modules styling, Vitest + React Testing Library tests, and Storybook 8 documentation.
- Introduce a first set of general-purpose components: `Button`, `Form`, `Table`, and `Modal`.
- Introduce a first set of scientific instrument display components: `WaveformChart`, `RealtimeDataTable`, and `ParamConfigForm`.
- Constrain the MVP to display-first use cases and exclude advanced instrument control workflows, heavy analytics, and algorithm-driven interactions.

## Capabilities

### New Capabilities
- `component-library-foundation`: Defines the packaging, export, typing, theming, testing, and documentation requirements for the `hik-comps` library MVP.
- `general-business-components`: Defines the MVP requirements for business-facing foundational UI components built in the style of Ant Design 6.
- `instrument-display-components`: Defines the MVP requirements for display-first scientific instrument components, including waveform, realtime table, and parameter configuration scenarios.

### Modified Capabilities
- None.

## Impact

- Affects the new `hik-comps` component library workspace and its source structure, build configuration, testing setup, Storybook setup, and public component exports.
- Defines the initial public component APIs and acceptance expectations for seven MVP components.
- Establishes the baseline technical constraints for future additions such as `SpectrumChart`, `PeakPicker`, and `InstrumentPanel`.
- Introduces documentation and testing obligations for all public components in the MVP.
